# RFC：为 Zola 主站接入多语言同步与语言切换

## 背景 / 问题

当前主站仍按单语言运行：`config.toml:9` 仍是 `default_language = "zh"`，根 `content/` 只有默认语言文件，而 `.czon/src/{zh-Hans,en-US,ja-JP,es-ES,de-DE}/content/` 已经存在成体系的多语言内容。与此同时，`themes/cone-scroll/templates/header.html:7`、`themes/cone-scroll/templates/footer.html:7`、`themes/cone-scroll/templates/page.html:4`、`themes/cone-scroll/templates/blog-page.html:4` 等模板仍以 `current_lang == "en"` 作为唯一分支，并直接写死 `/blog`、`/about`、`/tags` 等链接；`.github/workflows/pages.yaml:42` 也在 `zola build` 前缺少任何翻译同步步骤。

结果是：仓库内已有翻译资产无法进入主站构建，主题壳层也无法随着当前语言正确切换。

风险分级：**Medium**。理由是该变更会同时影响 Zola 路由配置、模板渲染、构建前脚本与 Pages CI，但不涉及线上数据迁移、权限模型变更或不可逆外部副作用，且可以通过回退配置/模板/生成文件整体回滚。

## 目标与非目标

### 目标

- 将主站默认语言固定为 `zh-Hans`，并注册 `en-US`、`ja-JP`、`es-ES`、`de-DE`。
- 将 `.czon/src/<lang>/content/**/*.md` 同步为 Zola 识别的 `content/**/*.<lang>.md`。
- 在 `themes/cone-scroll/` 内以最小改动接入语言感知导航、标签链接、RSS 与一个简单语言下拉。
- 在 `.github/workflows/pages.yaml` 中把同步脚本接到 `zola build` 之前。
- 固化本仓库最小可用的 Zola 多语言能力使用面：`default_language`、`[languages.*]`、`[translations]`、`get_url(..., lang=...)`、`get_taxonomy_url(..., lang=...)`、`page.translations` / `section.translations` / `current_path`。

### 非目标

- 不修改 `.czon/src/` 的内容组织与产出方式。
- 不为默认语言 `zh-Hans` 生成或覆盖 `content/**/*.md`。
- 不重做 `cone-scroll` 的整体信息架构或新增前端依赖。
- 不解决本任务 scope 外的 SEO、全文搜索、评论系统国际化，也不扩展 Admin 功能；本轮只修正非默认语言派生页的 edit 入口，避免编辑产物文件。

## 术语 / 假设

- **默认语言**：`zh-Hans`，对应根路径 `/` 下的现有手写内容。
- **生成翻译文件**：由同步脚本写入的 `content/**/*.<lang>.md`，其中 `<lang>` 仅限 `en-US`、`ja-JP`、`es-ES`、`de-DE`。
- **手写默认语言文件**：根 `content/**/*.md` 中未带语言后缀的现有文件，例如 `content/about.md`、`content/blog/_index.md`。
- **翻译真源**：`.czon/src/<lang>/content/**/*.md`；脚本产物不接受人工手改。

## 设计概览

本方案分四层落地：

1. `config.toml` 切到 `zh-Hans` 默认语言，并显式登记四个附加语言与模板文案翻译。
2. `scripts/sync-zola-i18n.ts` 在 Node 24 下直接运行，负责把 `.czon/src` 的非默认语言内容镜像到 `content/`，并清理已失效生成文件。
3. `themes/cone-scroll/templates/` 从“中文 + 英文特判”升级为“当前语言驱动”：内部链接统一通过 `get_url(..., lang=...)` / `get_taxonomy_url(..., lang=...)` 生成；页面/section 只在拥有一手翻译元数据时做精确切换，taxonomy 与壳层页只跳转到目标语言的稳定入口，不做同 term 猜测。
4. `.github/workflows/pages.yaml` 在 `zola build` 前执行同步脚本，确保 CI 与本地构建输入一致。

## 详细设计

### 1. 配置方案

`config.toml` 采用以下最小配置策略：

- 将 `default_language` 从 `zh` 改为 `zh-Hans`。
- 保留根级 `taxonomies = [{ name = "tags", feed = true }]` 作为默认语言配置；所有非默认语言也都显式声明同名 taxonomy，避免把继承行为留到实现阶段判断。
- 新增 `[languages."en-US"]`、`[languages."ja-JP"]`、`[languages."es-ES"]`、`[languages."de-DE"]`，只放本任务实际需要的多语言项：`title` / `description`（如需）、`generate_feeds`、`taxonomies`、`translations`。
- 新增根级 `[translations]` 作为默认语言文案源；新增 `[languages.<lang>.translations]` 作为主题壳层文案源。文案仅覆盖导航、分页、返回、编辑、主题按钮、语言名称等壳层字符串，不把正文内容塞进配置。
- `config.extra.header_nav` 从“硬编码 URL + 局部中文名”改为“内部目标 + 文案 key”。推荐结构：`{ path = "@/blog/_index.md", label_key = "nav_blog" }`、`{ path = "@/about.md", label_key = "nav_about" }`；标签页不继续放在该数组里，而在模板中固定用 taxonomy URL 生成。
- `feed_filenames` 继续复用根级配置；本轮只保证站点 / section feed 的语言隔离，taxonomy term feed 若由 Zola 自动生成则被动保留，但不为其额外增加切换 UI。

这样可以把 URL 与文案解耦：URL 由 Zola 路由能力决定，文案由 `trans()` 与当前语言决定。

一个最小 TOML 形态如下：

```toml
default_language = "zh-Hans"
taxonomies = [{ name = "tags", feed = true }]

[languages."en-US"]
title = "c1's Blog"
generate_feeds = true
taxonomies = [{ name = "tags", feed = true }]

[languages."en-US".translations]
nav_blog = "blog"
```

### 2. 同步脚本方案

新增 `scripts/sync-zola-i18n.ts`，通过 `node scripts/sync-zola-i18n.ts` 直接运行，不引入任何第三方依赖，只使用 `node:fs/promises`、`node:path`、`node:url`。

#### 输入与输出

- 输入根：`.czon/src/<lang>/content/**/*.md`
- 输出根：`content/**/*.<lang>.md`
- 管理语言：`en-US`、`ja-JP`、`es-ES`、`de-DE`

#### 路径映射

- `.czon/src/en-US/content/about.md` -> `content/about.en-US.md`
- `.czon/src/ja-JP/content/blog/_index.md` -> `content/blog/_index.ja-JP.md`
- 目录结构完全跟随 `.czon/src/<lang>/content/` 的相对路径。

#### 如何区分“生成文件”和“手写默认语言文件”

- 默认语言文件永远是不带语言后缀的 `content/**/*.md`；脚本不扫描、不覆盖、不删除这些文件。
- 生成文件永远带非默认语言后缀 `.<lang>.md`，且 `<lang>` 只允许落在管理语言集合内。
- 本轮直接把“白名单语言后缀文件”定义为派生产物：`content/**/*.en-US.md`、`content/**/*.ja-JP.md`、`content/**/*.es-ES.md`、`content/**/*.de-DE.md` 均由脚本全权管理。

#### 是否清理失效生成文件

**需要，且默认开启。**

原因：`.czon/src` 是非默认语言真源，如果上游删除或重命名了某篇翻译，保留旧的 `content/**/*.<lang>.md` 会让 Zola 继续发布过期页面，产生内容漂移。清理规则如下：

- 先扫描本次期望输出集合。
- 再扫描 `content/` 中所有命中白名单语言后缀的现有翻译文件。
- 删除“现有受管文件里存在、但本次期望集合里不存在”的目标文件。

由于默认语言文件不带语言后缀，且白名单语言固定，本策略不需要额外 manifest 也能稳定区分可删产物与手写源文件。

#### 写入与幂等

- 输出内容默认覆盖写入，重复执行应得到相同文件集合与相同文件内容。
- 遇到源文件不可读、目标路径越界、语言目录缺失等结构性错误时，脚本退出非零。
- 单篇翻译缺失不视为错误；它只意味着该页面在对应语言下没有翻译，语言下拉将走页面级兜底策略。

### 3. 主题模板 / 前端方案

#### 文案与链接

- 将 `themes/cone-scroll/templates/header.html`、`footer.html`、`page.html`、`blog-page.html`、`section.html`、`tags/list.html`、`tags/single.html`、`index.html`、`partials/page-outline.html`、`head.html` 中的 `current_lang == "en"` 替换为统一 `lang + trans()` 方案，避免每个模板重复推导语言。
- Header、footer、RSS、logo、博客/日志/关于链接统一改为 `get_url(path=..., lang=lang)`。
- 标签入口统一改为 `get_taxonomy_url(kind="tags", lang=lang)`；标签项链接改为 `get_taxonomy_url(kind="tags", name=tag, lang=lang)`，不再手写 `/tags/{{ tag | slugify }}`。
- `base.html` 继续输出 `<html lang="...">`，但统一取全局 `lang`，保持和 `zh-Hans` / `en-US` 等真实代码一致。
- `head.html` 中的 `<link rel="alternate" type="application/atom+xml">` 必须切到当前语言 feed，而不是始终指向默认语言。
- `index.html` 中的 recent posts 必须按当前语言读取博客 section，例如 `get_section(path="blog/_index.md", lang=lang)` 或等价方案；`[posts]` 等壳层标题也转为 `trans()`。
- `partials/page-outline.html` 的 `outline / 目录 / table of contents` 文案一并切到 `trans()`。

#### 语言下拉

- 在 `themes/cone-scroll/templates/header.html` 的 theme toggle 旁增加一个低干扰度 `<select>`，展示 `zh-Hans / en-US / ja-JP / es-ES / de-DE` 的本地化名称。
- 交互保持最简单：用户切换选项后直接跳转到目标 URL，不引入新框架或新依赖。

#### 语言切换 URL 如何生成

本轮只提供两类能力，不在模板层实现“半个路由器”：

1. **有一手翻译元数据的页面**：
   - `page` 存在时，只使用 `page.translations` 做精确切换；
   - `section` 存在时，只使用 `section.translations` 做精确切换。
2. **没有一手翻译元数据的壳层页**：
   - 首页与 section/list 页面跳转到目标语言的对应稳定入口；
   - taxonomy list 与 taxonomy term 页面一律跳转到目标语言的 tags 首页 `get_taxonomy_url(kind="tags", lang=target_lang)`；
   - 不尝试在 taxonomy term 上做“同 term 精确切换”，也不保留当前分页页码。

目标内容不存在时的行为也同步降级：

- page 若没有目标语言翻译，则按最小硬规则回退：博客文章回目标语言 `blog` 列表页，日志文章回目标语言 `diary` 列表页，其余独立 page 一律回目标语言首页；
- section 若缺失目标语言版本，则回退到目标语言首页；
- taxonomy 页面统一回到目标语言 tags 首页。

这样语言切换的行为边界清晰：有翻译元数据就精确跳转，没有就回到稳定入口，不依赖 `current_path` 猜测 term 或分页 slug 是否存在。

#### 其他模板点

- `blog-page.html` 中的返回链接从硬编码 `/blog` / `/diary` 改为对应 section 的 language-aware URL。
- `blog-page.html:56` 的 `giscus` `data-lang` 需要按站点语言做有限映射：`zh-Hans -> zh-CN`、`en-US -> en`、`ja-JP -> ja`、`es-ES -> es`、`de-DE -> de`；若第三方组件不支持站点语言，则回退到英文。
- `page.html` / `blog-page.html` 的 admin edit 行为在非默认语言生成页上默认隐藏，避免把用户导向派生文件；默认语言页面继续保留原有编辑入口。

### 4. CI 接入方案

`.github/workflows/pages.yaml` 在 `Setup Node.js` 之后、`Build Zola site` 之前新增一步：

```yaml
- name: Sync translated Zola content
  run: node scripts/sync-zola-i18n.ts
```

这样 `zola build` 与本地开发共享同一套输入，避免 CI 产物依赖手工预生成文件。

## 替代方案

### 方案 A：手工维护 `content/**/*.<lang>.md`

放弃内容：不写同步脚本，直接把翻译长期提交到 `content/`。

不选原因：`.czon/src/` 已是现成真源，手工双写会让源头分裂；一旦 `.czon/src` 更新，主站文件极易漂移，CI 也无法证明同步是否完整。

### 方案 B：构建时直接让 Zola 读取 `.czon/src`，不落地到 `content/`

放弃内容：通过临时拷贝到构建目录、软链接或改写工作目录，让 `zola build` 直接消费 `.czon/src`。

不选原因：会把内容输入变成“运行期拼装”，本地调试、编辑器预览、Git diff 与 CI 可复现性都更差；同时软链接/临时目录在 GitHub Actions 与本地系统上更脆弱，不符合“约定大于配置”的目标。

## 数据模型 / 接口

### 配置接口

- `config.toml`
  - `default_language = "zh-Hans"`
  - `[translations]`：默认语言壳层文案
  - `[languages.<lang>]`：多语言注册与各语言翻译文案
  - `[[extra.header_nav]]`：`path` + `label_key`

### 脚本接口

- 命令：`node scripts/sync-zola-i18n.ts`
- 输入：`.czon/src/<lang>/content/**/*.md`
- 输出：`content/**/*.<lang>.md`
- 受管集合：所有命中白名单语言后缀的 `content/**/*.<lang>.md`

## 错误语义

- **结构性错误，失败退出**：源目录缺失、非法语言代码、路径穿越、写文件失败。
- **内容缺口，可恢复**：某篇文章没有对应语言翻译；站点仍可构建，只是该语言下拉跳不到同一篇内容。
- **重试语义**：脚本为纯文件同步，修复源内容或目录问题后可直接重跑；CI 失败不需要人工清理中间状态。

## 安全考虑

- 脚本只接受固定语言白名单，不从外部输入动态拼路径。
- 所有源/目标路径在写入前都必须 `resolve` 到仓库根内，拒绝 `..` 越界与符号链接逃逸。
- 只复制 Markdown 文本，不执行 `.czon/src` 中任何代码或 front matter 表达式。
- 清理逻辑仅基于固定语言白名单后缀与 `content/` 目录，避免误删手写默认语言内容或 scope 外文件。

## 向后兼容、发布与回滚

### 向后兼容

- 默认语言仍发布在根路径 `/`，不会把现有中文 URL 整体搬到 `/zh-Hans/`。
- 新增语言只会增加 `/{lang}/...` 页面，不影响现有中文链接可用性。
- 默认语言代码从 `zh` 改为 `zh-Hans` 会改变模板内语言判断，但不会改变根路径站点结构。

### 发布顺序

1. 落地 `config.toml` 多语言配置与模板文案 key。
2. 落地 `scripts/sync-zola-i18n.ts`，本地生成首批 `content/**/*.<lang>.md`。
3. 改造 `themes/cone-scroll/templates/` 的链接与语言下拉。
4. 在 `.github/workflows/pages.yaml` 中接入同步步骤。
5. 运行本地 `zola build` 验证后再合并。

### 回滚方案

若上线后发现多语言行为异常，按以下顺序整体回退：

1. 从 workflow 中移除同步步骤。
2. 回退 `config.toml` 的 `[languages.*]`、`[translations]` 与 `default_language = "zh-Hans"` 变更。
3. 回退 `themes/cone-scroll/templates/` 的多语言链接与语言下拉。
4. 删除 `content/**/*.<lang>.md`。

回滚后主站恢复为当前单语言形态。

## 验证计划

- 配置验证：`config.toml` 改完后运行 `zola build`，确认无“unknown language”或 taxonomy 配置错误。
- 同步验证：运行 `node scripts/sync-zola-i18n.ts` 两次，确认第二次无额外 diff，且删除 `.czon/src/<lang>/content/...` 某个测试文件后能清理对应 `content/**/*.<lang>.md`。
- 内容验证：抽查 `content/about.en-US.md`、`content/blog/_index.ja-JP.md`、`content/diary/_index.es-ES.md` 等是否按规则生成。
- 路由验证：本地构建后确认 `/`、`/en-US/`、`/ja-JP/`、`/es-ES/`、`/de-DE/` 均有首页，且 `/tags/` 与对应语言 tags 页存在。
- 模板验证：检查 `header.html`、`footer.html`、`head.html`、`index.html`、`partials/page-outline.html`、`page.html`、`blog-page.html`、`section.html`、`tags/list.html`、`tags/single.html` 不再出现硬编码 `/blog`、`/about`、`/tags` 造成的跨语言串链。
- 语言切换验证：在首页、博客列表、文章详情、关于页、标签列表、标签详情页分别切换语言，确认跳转目标符合“有翻译则同页，无翻译则回到稳定入口”。
- 编辑入口验证：确认非默认语言页不再暴露会指向派生文件的 edit 链接。
- CI 验证：在 Pages workflow 中确认同步步骤先于 `zola build`，且最终 artifact 包含非默认语言输出目录。

## 开放问题

- `get_taxonomy_url(kind="tags", name=tag, lang=...)` 在当前仓库的混合语言标签上应能工作，但仍需在实现时实际验证带特殊字符或中文标签的 term URL 是否与现有 slug 行为一致。

## 落地计划

- 修改 `config.toml`：切换默认语言，登记 `[languages.*]`、`[translations]`，重构 `extra.header_nav`。
- 新增 `scripts/sync-zola-i18n.ts`：实现扫描、生成、白名单清理与错误退出。
- 修改 `themes/cone-scroll/templates/header.html`：增加语言下拉，导航/RSS/language-aware URL。
- 修改 `themes/cone-scroll/templates/footer.html`、`head.html`、`index.html`、`partials/page-outline.html`、`page.html`、`blog-page.html`、`section.html`、`tags/list.html`、`tags/single.html`、`base.html`：去掉 `current_lang == "en"`，切到通用多语言渲染，并隐藏非默认语言派生页 edit 链接。
- 更新 `content/` 下生成产物：写入 `*.en-US.md`、`*.ja-JP.md`、`*.es-ES.md`、`*.de-DE.md`。
- 修改 `.github/workflows/pages.yaml`：在 `zola build` 前执行同步脚本。
- 验证步骤：执行 `node scripts/sync-zola-i18n.ts`、`zola build`，并人工抽查 header/footer/tags/文章详情的语言切换行为。
