# RFC: 将 Cone Scroll 主题抽取为独立 `themes/cone-scroll/` 目录

## 摘要

本 RFC 提议将当前散落在站点根目录的 Cone Scroll 主题资产抽取到独立的 `themes/cone-scroll/` 目录，并在根级 `config.toml` 中显式启用 `theme = "cone-scroll"`。本次变更只重组主题边界，不重做视觉、不调整内容模型、不迁移内容级静态资源。

目标是让主题元数据、模板、主题级静态资源与站点内容分层清晰，组织方式对齐 `Speyll/anemone`，同时保持当前 Cone Scroll 视觉与交互基线不变。该任务为 Medium 风险的结构重组：影响模板加载路径与静态资源来源，但不改变对外 URL、内容路径或页面语义，且可通过目录回退和配置回退恢复。

## 背景 / 问题

- 当前站点尚未启用 Zola 标准 theme folder；根级 `config.toml` 未声明 `theme`，模板与主题静态资源直接位于仓库根目录。
- 根级 `theme.toml` 仍声明 `anemone` 元数据，与当前实际使用的 Cone Scroll 实现不一致，容易误导后续维护者。
- 当前主题资产跨越 `templates/`、`static/css/`、`static/js/` 以及若干根级静态文件，主题边界和站点边界混杂，不利于复用、评审与后续演进。
- `.legion/tasks/granda/plan.md` 与 `.legion/playbook.md` 已把现有 Cone Scroll 实现和现有截图定义为视觉 source of truth，因此本次只能做结构性抽取，不能顺手改视觉。

## 动机

- 让仓库拓扑符合 Zola 主题约定，降低后续维护和新协作者理解成本。
- 让主题元信息与真实实现一致，避免继续以 `anemone` 元数据承载已经明显分叉的主题实现。
- 为后续主题复用、单独分发或独立迭代建立清晰边界。
- 在不影响内容资源与对外 URL 的前提下，清理当前“主题代码在站点根目录横向扩散”的状态。

## 目标与非目标

### 目标

- 建立可工作的 `themes/cone-scroll/` 目录，包含 `theme.toml`、`templates/`、`static/`。
- 根级 `config.toml` 显式配置 `theme = "cone-scroll"`，站点构建改由主题目录提供模板和主题级静态资源。
- 将当前属于主题实现的模板、CSS、JS、`icons.svg` 从根目录迁入 `themes/cone-scroll/`。
- 保持页面 URL、资源 URL、视觉基线、交互行为、文案语义不变。
- 明确哪些资源必须留在站点根目录，避免误迁内容级资源。

### 非目标

- 不调整页面视觉层级、配色、版式、动效或组件语义。
- 不重写模板逻辑，不新增功能，不移除现有短代码或第三方脚本。
- 不迁移内容资源，例如 `static/images/**`、`static/CNAME`、Markdown 内容、taxonomy 数据。
- 不把本仓库改造成独立发布的主题仓库；本次仅在当前站点仓库内建立 theme folder。

## 范围 / 越界边界

### 本次范围

- `/Users/c1/Work/blog/config.toml`
- `/Users/c1/Work/blog/theme.toml`
- `/Users/c1/Work/blog/templates/`
- `/Users/c1/Work/blog/static/css/`
- `/Users/c1/Work/blog/static/js/`
- `/Users/c1/Work/blog/static/icons.svg`
- `/Users/c1/Work/blog/themes/cone-scroll/`

### 明确越界

- 任何 `content/**` 文件。
- 任何 `static/images/**` 文件。
- `static/CNAME`。
- 与主题无关的部署、域名、分析或评论服务配置。
- `.legion` 三文件和既有任务记录。

## 定义

- `theme-level 资产`：仅为主题渲染服务、可随主题整体搬迁的模板与静态资源，例如 `templates/**`、`static/css/**`、`static/js/script.js`、`static/icons.svg`。
- `site-level 资产`：由站点配置、站点身份或部署环境直接引用，默认留在根目录，可覆盖主题默认值但不与本次主题抽取强绑定，例如 `static/favicon.ico`、`static/CNAME`。
- `content-level 资产`：由文章、页面内容直接引用的资源，不能因为主题抽取而改变归属的位置，例如 `static/images/**`。
- `视觉基线`：以当前仓库实际渲染结果、`.legion/tasks/granda/plan.md` 中定义的 Granda 收口结果、以及 `.legion/playbook.md` 中的设计约束为准。

## 当前资产盘点

### 配置与元数据

| 路径 | 当前状态 | 结论 |
| --- | --- | --- |
| `config.toml` | 未声明 `theme`；站点直接使用根级模板与静态资源 | 需要切换到 `theme = "cone-scroll"` |
| `theme.toml` | 仍为 `anemone` 元数据 | 应迁入主题目录并改为 `cone-scroll` 元数据 |

### 模板资产

当前根级模板目录包含：

- 页面骨架：`templates/base.html`、`templates/head.html`、`templates/header.html`、`templates/footer.html`
- 页面模板：`templates/index.html`、`templates/page.html`、`templates/blog-page.html`、`templates/section.html`
- 复用模板：`templates/macros/page_outline.html`、`templates/macros/post_list.html`
- 局部模板：`templates/partials/page-outline.html`
- tags 页面：`templates/tags/list.html`、`templates/tags/single.html`
- shortcodes：`templates/shortcodes/img.html`、`mark.html`、`mermaid.html`、`slideshow.html`、`webring.html`、`youtube.html`

这些文件均属于主题渲染层，应整体迁入 `themes/cone-scroll/templates/`。

### 静态资产

| 路径 | 当前用途 | 归类 |
| --- | --- | --- |
| `static/css/reset.css` | 页面 reset 样式 | theme-level |
| `static/css/style.css` | 主站核心视觉样式 | theme-level |
| `static/css/suCSS.css` | 辅助样式资源 | theme-level |
| `static/css/LICENSE` | 样式许可证文件 | theme-level |
| `static/js/script.js` | 主题切换、giscus 同步、Embla 初始化 | theme-level |
| `static/icons.svg` | 主题/界面资源 | theme-level |
| `static/favicon.ico` | 站点 favicon，由 `config.extra.favicon` 指向 | site-level，留根目录 |
| `static/click.ogg` | 当前仓库未找到运行时引用 | 不纳入本次 scope |
| `static/images/**` | 文章与页面内容资源 | content-level，必须留根目录 |
| `static/CNAME` | 部署级资源 | site-level，必须留根目录 |

## 提议目录结构

```text
.
├── config.toml
├── content/
├── static/
│   ├── CNAME
│   └── images/
└── themes/
    └── granda/
        ├── theme.toml
        ├── templates/
        │   ├── base.html
        │   ├── head.html
        │   ├── header.html
        │   ├── footer.html
        │   ├── index.html
        │   ├── page.html
        │   ├── blog-page.html
        │   ├── section.html
        │   ├── macros/
        │   ├── partials/
        │   ├── shortcodes/
        │   └── tags/
        └── static/
            ├── css/
            ├── js/
            ├── icons.svg
```

设计约束：

- 根目录保留站点配置、内容与内容级静态资源。
- 主题目录只承载主题元数据、模板、主题级静态资源。
- 不在根目录和主题目录同时保留一份同名主题模板或主题入口资源，避免双入口漂移。

## 提议设计

### 端到端流程

1. 在 `themes/cone-scroll/` 下创建标准主题目录。
2. 将当前根级 `theme.toml` 内容改写为 Cone Scroll 元数据后放入 `themes/cone-scroll/theme.toml`。
3. 将根级 `templates/**` 原样迁移到 `themes/cone-scroll/templates/**`，保持相对路径不变。
4. 将主题级静态资源迁移到 `themes/cone-scroll/static/**`，保持站点运行时 URL 不变。
5. 在根级 `config.toml` 加入 `theme = "cone-scroll"`，其余配置尽量保持不变。
6. 删除根级重复主题入口文件，确保渲染来源唯一。
7. 保留根级 `static/favicon.ico` 作为站点级 branding 资产，不与主题目录绑定。
8. 运行构建与页面比对，确认视觉、导航、TOC、主题切换、评论区主题同步等行为不变。

### 组件边界

- 根级 `config.toml`：站点唯一配置入口，负责选择主题与保留站点级 `extra` 配置。
- `themes/cone-scroll/theme.toml`：主题元数据入口，描述主题身份和最低 Zola 版本。
- `themes/cone-scroll/templates/**`：主题模板边界，统一承载页面布局、宏、局部组件、shortcodes。
- `themes/cone-scroll/static/**`：主题静态资产边界，统一承载样式、脚本与主题小资源。
- 根级 `static/favicon.ico`、`static/CNAME`：站点身份/部署边界，不参与本次迁移。
- 根级 `static/images/**`：站点内容边界，不参与本次迁移。

### 关键假设

- Zola 在启用 `theme = "cone-scroll"` 后，会按标准规则加载 `themes/cone-scroll/templates/**` 与 `themes/cone-scroll/static/**`。
- 运行时资源 URL 仍可沿用 `get_url(path='css/style.css')`、`get_url(path='js/script.js')`、`get_url(path=config.extra.favicon)` 等现有写法，因此无需批量改模板引用。
- 当前仓库没有其它根级模板需要覆盖 `granda` 主题；若存在遗漏文件，构建结果会立即暴露。

## 迁移矩阵

| 当前路径 | 目标路径 | 动作 | 说明 |
| --- | --- | --- | --- |
| `theme.toml` | `themes/cone-scroll/theme.toml` | move + edit | 改写元数据为 `cone-scroll`，不再保留根级误导性主题元数据 |
| `templates/base.html` | `themes/cone-scroll/templates/base.html` | move | 保持模板结构不变 |
| `templates/head.html` | `themes/cone-scroll/templates/head.html` | move | 保持资源引用与 meta 逻辑不变 |
| `templates/header.html` | `themes/cone-scroll/templates/header.html` | move | 保持导航与主题切换文案不变 |
| `templates/footer.html` | `themes/cone-scroll/templates/footer.html` | move | 保持页脚文案不变 |
| `templates/index.html` | `themes/cone-scroll/templates/index.html` | move | 保持首页结构不变 |
| `templates/page.html` | `themes/cone-scroll/templates/page.html` | move | 保持普通页结构不变 |
| `templates/blog-page.html` | `themes/cone-scroll/templates/blog-page.html` | move | 保持博客页、giscus 注入不变 |
| `templates/section.html` | `themes/cone-scroll/templates/section.html` | move | 保持列表页结构不变 |
| `templates/macros/**` | `themes/cone-scroll/templates/macros/**` | move | 保持导入路径不变 |
| `templates/partials/**` | `themes/cone-scroll/templates/partials/**` | move | 保持 include 路径不变 |
| `templates/shortcodes/**` | `themes/cone-scroll/templates/shortcodes/**` | move | 保持 shortcode 名称不变 |
| `templates/tags/**` | `themes/cone-scroll/templates/tags/**` | move | 保持 tags 页面不变 |
| `static/css/reset.css` | `themes/cone-scroll/static/css/reset.css` | move | URL 预期保持 `/css/reset.css` |
| `static/css/style.css` | `themes/cone-scroll/static/css/style.css` | move | 视觉基线核心文件 |
| `static/css/suCSS.css` | `themes/cone-scroll/static/css/suCSS.css` | move | 附属样式文件 |
| `static/css/LICENSE` | `themes/cone-scroll/static/css/LICENSE` | move | 与样式资源同归档 |
| `static/js/script.js` | `themes/cone-scroll/static/js/script.js` | move | 保持主题切换/Embla/giscus 行为 |
| `static/icons.svg` | `themes/cone-scroll/static/icons.svg` | move | 主题静态资源 |
| `config.toml` | `config.toml` | edit in place | 新增 `theme = "cone-scroll"`，其余配置尽量不动 |
| `static/favicon.ico` | `static/favicon.ico` | keep | 站点级 branding 资源，继续由 `config.extra.favicon` 引用 |
| `static/images/**` | `static/images/**` | keep | 内容级资源，禁止迁移 |
| `static/CNAME` | `static/CNAME` | keep | 部署级资源，禁止迁移 |

## 数据模型 / 接口

### 配置接口

- `config.toml`
  - 新增：`theme = "cone-scroll"`
  - 保持：`[extra]` 下 `favicon = "favicon.ico"`、`google_analytics`、`header_nav` 等字段不改名不改值。
  - 兼容性：模板继续读取 `config.extra.*`，不引入新的必须配置项。
  - 覆盖策略：站点未来若要更换 favicon，继续修改根级 `static/favicon.ico` 或 `config.extra.favicon`，无需编辑主题目录。

### 主题元数据接口

- `themes/cone-scroll/theme.toml`
  - 必填字段：`name`、`description`、`license`、`min_version`
  - 建议字段：`homepage`、`demo`、`[author]`
  - 兼容策略：允许保留已有字段结构，但语义必须从 `anemone` 改为 `granda`，避免误导。

### 模板接口

- 模板名、macro 路径、shortcode 名、include/import 路径全部保持相对路径稳定。
- 页面调用方式不变；不修改内容文件中的模板依赖名称。

### 静态资源接口

- 外部可见 URL 保持不变，例如 `/css/style.css`、`/js/script.js`、`/favicon.ico`。
- 兼容策略依赖 Zola 主题静态目录合并机制；因此迁移时不得同时保留根级同名版本，以免出现覆盖优先级不清。

## 错误语义

### 可恢复错误

- `themes/cone-scroll/` 目录缺文件导致构建失败：可通过补齐遗漏文件恢复。
- `config.toml` 未正确声明 `theme = "cone-scroll"`：修正配置后可恢复。
- 单个模板迁移遗漏导致页面 404、渲染错误或 shortcode 丢失：补迁文件即可恢复。

### 不可接受错误

- 误迁 `static/images/**` 或 `static/CNAME`，导致内容资源路径变化。
- 根目录与主题目录同时保留冲突模板/静态文件，造成行为漂移却难以定位来源。
- 改动过程中顺带更改 CSS/模板语义，导致视觉基线偏移。

### 重试语义

- 构建失败时优先根据错误信息补齐遗漏文件，再重跑 `zola build`。
- 页面行为异常时按“模板 -> 静态资源 -> 配置”顺序定位；每次修复后重新构建验证。
- 若在验证阶段发现广泛回归，直接执行回滚而不是在半迁移状态上持续打补丁。

## 安全性考虑

- 本次不引入新的外部依赖、服务账号或权限模型；风险主要来自资源边界误判。
- 必须限制迁移范围，防止将内容资源或部署资源误移入主题目录，造成内容丢失或部署异常。
- 模板和静态资源路径变更后，仍需保持已有输入渲染逻辑不变，避免因为错误 include/import 引入空白页或未转义输出。
- 不新增可执行脚本入口；现有 `static/js/script.js` 仅搬迁，不扩展能力。
- 保持资源数量与大小基本不变，避免通过重复拷贝导致构建产物膨胀。

## 替代方案

### 方案 A：继续维持根级组织，不做主题抽取

不选原因：

- 无法解决主题边界模糊与元数据失真问题。
- 后续任何主题级迭代仍会继续污染站点根目录。
- 与任务目标“切换到标准 `themes/cone-scroll/` 组织方式”直接冲突。

### 方案 B：在根目录保留一份模板/静态资源副本，同时复制到 `themes/cone-scroll/`

不选原因：

- 会制造双入口和覆盖优先级不清的问题，后续维护容易发生只改一边的漂移。
- 无法形成“主题目录是唯一主题来源”的清晰约束。
- 验证时即使页面看似正常，也难以确认实际生效来源。

### 方案 C：把整个 `static/` 都迁入 `themes/cone-scroll/static/`

不选原因：

- 会误伤 `static/images/**` 和 `static/CNAME` 等明确属于内容/部署层的资源。
- 与本任务约束“不得把内容级资源误归到主题”冲突。

## 向后兼容、迁移与发布

### 向后兼容

- 页面 URL 不变。
- 站点可见静态资源 URL 不变。
- `config.toml` 中现有 `extra` 字段保持兼容。
- 主题模板文件名与 shortcode 名称不变。

### 迁移策略

- 采用一次性目录迁移 + 配置切换。
- 先创建 `themes/cone-scroll/` 并完成文件迁移，再修改 `config.toml` 启用主题，最后删除根级重复主题入口。
- 迁移完成后必须做全量构建与关键页面冒烟验证，确认根目录仅保留站点级资产。

### 发布 / 灰度

- 本地先执行 `zola build` 验证。
- 若有预览环境，优先在预览环境比对首页、博客列表、文章页、About、Tags 页面。
- 因为不涉及数据迁移，灰度重点是页面结构和静态资源可达性，而非数据一致性。

### 迁移前清单

实施前先记录以下清单，回滚时按清单逐项恢复，不依赖人工回忆：

- 根级将被移走的主题模板：`templates/**`
- 根级将被移走的主题静态资源：`static/css/**`、`static/js/script.js`、`static/icons.svg`
- 根级保留资产：`config.toml`、`static/favicon.ico`、`static/images/**`、`static/CNAME`
- 根级 `theme.toml` 将迁入 `themes/cone-scroll/theme.toml`

### 回滚方式

满足以下任一条件应回滚：

- 构建无法稳定通过。
- 任一关键页面出现模板缺失、静态资源 404、明显视觉回退。
- 无法在短时间内确认实际渲染来源。

回滚步骤：

1. 删除或忽略 `config.toml` 中新增的 `theme = "cone-scroll"`。
2. 按“迁移前清单”将 `themes/cone-scroll/templates/**` 和 `themes/cone-scroll/static/**` 中本次迁移的文件恢复到根级原路径。
3. 将 `themes/cone-scroll/theme.toml` 迁回根级 `theme.toml`（若需要保留旧状态）。
4. 重新执行 `zola build` 验证已恢复至迁移前行为。

## 验证计划

| 关键行为 | 验证方式 | 通过标准 |
| --- | --- | --- |
| 站点可以通过主题目录构建 | `zola build` | 构建成功，无缺模板/缺资源错误 |
| 首页视觉不变 | 对照 `.legion/tasks/granda/docs/playwright-home-desktop.png`、`.legion/tasks/granda/docs/playwright-home-mobile.png` | logo、导航、recent posts、正文层级一致 |
| 列表页视觉不变 | 对照 `.legion/tasks/granda/docs/playwright-blog-list-desktop.png`、`.legion/tasks/granda/docs/playwright-blog-list-mobile.png`，并核对 `/blog`、`/diary`、`/tags` | 列表结构、日期/分隔线/摘要气味一致 |
| 文章页行为不变 | 对照 `.legion/tasks/granda/docs/playwright-article-desktop.png`、`.legion/tasks/granda/docs/playwright-article-mobile.png`、`.legion/tasks/granda/docs/playwright-article-dark.png`，并验证 1 篇带 TOC 长文 | TOC rail、返回链接、作者/发布日期、评论区正常 |
| 主题切换不变 | 手动触发主题切换 | `data-theme`、按钮文案、giscus 同步正常 |
| 静态资源路径不变 | 检查 `/css/style.css`、`/js/script.js`、`/favicon.ico` | 资源可访问，无 404 |
| site/content 级资源未误迁 | 检查 `static/favicon.ico`、`static/images/**`、`static/CNAME` 仍在根目录 | 路径不变，内容引用与站点 branding 不受影响 |
| 根级主题重复入口已清理 | 检查根目录 `templates/` 和主题级静态文件 | 不再保留重复主题来源 |

建议最小验收样本：

- 首页 `/`
- 博客列表 `/blog`
- 日志列表 `/diary`
- About `/about`
- Tags `/tags`
- 1 篇带 TOC 的长文章
- 1 个包含 shortcode 或多图轮播的页面（优先 `content/embla-test.md` 或 `content/gcores-talks.md`）

## 开放问题

- 当前无阻塞性开放问题。
- 实施时若发现根级存在未纳入迁移矩阵、但看似属于站点专属覆盖的模板或静态资源，应停止实施、先补 RFC/迁移矩阵，再继续；禁止边搬边判。

## 风险

### 主要风险

- 迁移遗漏单个模板或 shortcode，导致页面在运行时失败。
- 根级和主题级同时存在同名资源，造成实际加载来源不透明。
- 误判资产归属，把 site/content 级资源移入主题。
- `theme.toml` 元数据改写不完整，继续保留 `anemone` 身份残留。

### 风险缓解

- 按迁移矩阵逐项执行，不做“整目录盲搬”。
- 构建前后分别检查根级与主题级目录，确认无重复入口。
- 把 `static/favicon.ico`、`static/images/**`、`static/CNAME` 明确列为 keep，不进入搬迁脚本或手工清单。
- 验证时以 `.legion/playbook.md` 约束和既有 Granda 页面为基线，不接受“结构改对了但视觉悄悄变了”。

## 落地计划

### 文件变更点

- `config.toml`：新增 `theme = "cone-scroll"`。
- `theme.toml` -> `themes/cone-scroll/theme.toml`：完成元数据迁移与校正。
- `templates/**` -> `themes/cone-scroll/templates/**`：整体迁移。
- `static/css/**`、`static/js/script.js`、`static/icons.svg` -> `themes/cone-scroll/static/**`：按矩阵迁移。
- 根目录：清理重复主题模板与主题级静态入口，仅保留内容/部署级静态资源。

### 实施步骤

1. 创建 `themes/cone-scroll/`、`themes/cone-scroll/templates/`、`themes/cone-scroll/static/` 基础结构。
2. 迁移并改写 `theme.toml` 为 Cone Scroll 元数据。
3. 按迁移矩阵搬迁模板目录，保持相对路径不变。
4. 按迁移矩阵搬迁主题级静态资源，确认 `static/favicon.ico`、`static/images/**` 与 `static/CNAME` 留在根目录。
5. 修改 `config.toml` 启用 `theme = "cone-scroll"`。
6. 清理根级重复主题入口。
7. 执行构建和关键页面验证。
8. 若验证失败且无法快速定位，执行回滚步骤。

### 验证步骤

1. 运行 `zola build`。
2. 检查生成站点中 `/css/style.css`、`/js/script.js`、`/favicon.ico` 可访问。
3. 手动检查首页、列表页、文章页、About、Tags 页面。
4. 手动验证主题切换、TOC rail、giscus 主题同步、短代码页面。
5. 确认根目录未残留重复主题模板与主题级静态文件。

## 结论

建议采用“唯一主题来源”的抽取方案：将 Cone Scroll 主题完整收敛到 `themes/cone-scroll/`，根目录只保留站点配置、内容和内容级静态资源。只要严格遵守迁移矩阵、验证计划和回滚条件，本次重组可在不改变视觉基线的前提下完成，并为后续主题维护建立清晰边界。
