# RFC: Granda 主题设计门禁

**RFC ID**: rfc-2026-03-granda-design-gate
**Status**: Reviewed
**Author**: OpenCode
**Date**: 2026-03-12
**Scope**: `/.legion/tasks/granda/docs/rfc.md`, `/.legion/playbook.md`

---

## 摘要

本 RFC 将当前受 Granda 启发的主题整理为一份明确的设计契约，确保未来的主题修改不会偏离已经成形且一致的基线。基线包括 `static/css/style.css`、`templates/header.html`、`templates/footer.html`、`templates/index.html`、`templates/section.html`、`templates/tags/list.html`、`templates/tags/single.html`、`templates/page.html`、`templates/blog-page.html` 中的当前实现，以及 `/.legion/tasks/granda/docs/` 中的截图产物。

这份契约需要同时保留三点：温暖的纸张/墨水配色、类似 Granda 的克制极简气质，以及来自原始 `0xc1.space` 的列表语言启发。它不授权回退到旧站主题。

## 事实来源 / 优先级

评审优先级需要明确。当证据冲突时，以当前实现和当前 Playwright 截图为准；原始 `0xc1.space` 产物仅作为列表语言与扫描节奏的灵感参考。因此，评审者应优先保留当前温暖的 Granda 基线，再用原站判断列表语法是否仍然简洁、像索引，且不带卡片化处理。

## 动机

当前主题方向在视觉上已经足够统一，但其规则仍然是隐性的。现在的设计意图主要存在于 CSS 细节、模板结构和对截图的记忆中，这很脆弱。未来的修改很容易重新引入卡片式背景、通栏 chrome、过强的字体层级，或通用博客 UI 模式。

本 RFC 定义美学论点、稳定原语、组件规则、反模式以及验收标准，后续所有主题工作在合并前都必须满足这些要求。

## 目标

- 保留当前温暖的纸张/墨水氛围和克制的极简语气。
- 保留当前较窄的阅读体验和非卡片式列表呈现。
- 提炼原始 `0xc1.space` 在列表语言上的有效经验：简洁标记、由 rule 引导的扫描、安静的密度，以及索引式节奏。
- 定义足够稳定且具体的原语和组件规则，使其可以对照截图和代码进行评审。
- 建立一个未来主题 PR 可以通过或失败的设计门禁。

## 非目标

- 将站点回退到原始 `0xc1.space` 主题。
- 启动新的实现轮次，或引入新的视觉系统。
- 将范围扩展为完整品牌系统、插画系统或动画系统。
- 重做内容结构、信息架构，或在局部 UI 标签之外调整文案语气。
- 为了追逐流行感而加入卡片、渐变、毛玻璃、徽章或类应用控件。

## 定义

- **Paper/ink palette**：由 `static/css/style.css` 中 `--bg`、`--fg`、`--muted`、`--border` 及相关变量定义的当前暖色背景与深色文本系统。
- **List language**：由标记、rule、日期和间距构成的文本语法，使文章列表更像索引而不是一组卡片。
- **Short rule**：长度受限的局部分隔线，例如 header 和 footer 中的 rule，用于组织结构而非装饰。
- **Design drift**：任何虽然不影响站点功能，但会削弱预期语气、可读性或一致性的变化。
- **Current baseline artifacts**：`/.legion/tasks/granda/docs/` 中的 `playwright-home-desktop.png`、`playwright-home-mobile.png`、`playwright-blog-list-desktop.png` 和 `playwright-blog-list-mobile.png`。
- **Inspiration artifacts**：`/.legion/tasks/granda/docs/` 中的 `original-0xc1-home.png`、`original-0xc1-blog.png` 和 `original-0xc1-tags.png`；这些仅用于指导列表语言。

## 提议的设计

### 1. 美学论点

站点应当像一页被仔细排版、印在暖色纸上的笔记本或索引页，而不是产品落地页，也不是通用的纯文本终端皮肤。视觉重心应当平静、收窄、带一点文学性。`0xc1.space` 的影响应主要体现在列表语法和信息密度上，而不是整体主题回退。

以下三种设计品质是强制要求：

- **Warm restraint**：柔和纸张背景、深墨色正文、克制的 chrome、低饱和链接。
- **Index-like clarity**：列表通过标记、填充 rule 和日期实现快速扫描。
- **Minimal but not empty**：结构必须可见，但几乎不应有装饰性表层处理。

### 2. 核心 Token 与原语

#### Palette

`static/css/style.css` 中当前的配色 token 集是基线契约：

| Token | Baseline value | 角色 | 规则 |
| --- | --- | --- | --- |
| `--bg` | `#f6f1e8` | 页面背景 | 必须保持温暖、类似纸张、低饱和 |
| `--bg-elevated` | `#fbf8f2` | 少数抬升表面 | 不得用于列表行填充或卡片块 |
| `--fg` | `#171411` | 主文本 | 必须在纸张背景上保持强对比 |
| `--muted` | `#6c655c` | 元数据、次级结构 | 必须明显比正文更安静 |
| `--link` | `#1f4d8f` | 链接 | 可轻微变化，但必须克制，不能是霓虹色 |
| `--visited` | `#6a537d` | 已访问链接 | 必须保持在温和、低调的色系内 |
| `--border` | `#d4ccbf` | rule 和分隔线 | 必须柔和且服务结构，绝不能是高对比黑线 |
| `--code-bg` | `#ebe5db` | 行内代码/代码块背景 | 保留给代码和类似工具性表面 |

规则：

- 在亮色模式下保持暖色、低饱和配色。
- 保持暗色模式兼容，但亮色模式仍是主要美学参考。
- 不得引入压过正文、让站点显得强品牌化的强调色。
- 不得用背景填充来区分列表项、导航项、标签或元数据。

#### Typography

排版有意保持朴素，并带一点 geek 气质。`static/css/style.css` 中当前的正文字体栈是基线：`"Dashes", monospace`，其中自定义字形主要用于塑造 dash 行为，同时保留近似 serif 的阅读感。

规则：

- 正文字号保持在约 `15px`，行高约为 `1.7`。
- 标题尺寸保持克制。`h1` 和 `h2` 应被读作编辑结构，而不是展示型排版。
- 粗体仅保留给标题、ASCII logo，以及需要承担扫描锚点的列表标题。
- 避免引入 sans-serif 风格的 UI 语言或高度风格化的展示字体。
- 仅使用本地 fallback 字体时，站点也应继续保持可接受观感。

#### Spacing Rhythm

基线的垂直节奏由一组重复的小步长构成，而不是大幅 hero 间距。`static/css/style.css` 中当前内容节奏对多数正文块使用 `1.1rem` 外边距。

规则：

- 使用约 `0.25rem`、`0.5rem`、`1.1rem`、`1.8rem` 和 `2rem` 这类紧凑且可复用的间距步长。
- 优先通过收紧局部间距来减少噪音，而不是增加更多容器。
- 首页和列表区域应比正文更紧凑，但不能拥挤。
- 移动端间距应当温和压缩，而不是塌缩成拥挤的文本墙。

#### Layout Width

宽度是整体气质的重要组成部分。`static/css/style.css` 中当前 shell、列表与正文宽度规则构成基线。

规则：

- 全局 shell 最宽可到约 `1040px`，但可读内容必须明显更窄。
- 首页介绍文案保持在约 `74ch`。
- 列表页保持在约 `84ch`，以便标题、填充 rule 和日期获得呼吸空间。
- 正文保持在约 `69-70ch`。
- 有 TOC 的页面保持非对称双列：左侧 TOC rail，右侧正文。
- 避免回到通栏阅读列或宽而空的 chrome 带状布局。

#### Dividers And Rules

rule 是结构提示，不是装饰线。`static/css/style.css` 中当前 header/footer rule 与索引列表填充 rule 构成基线。

规则：

- 优先使用局部短 rule，而不是全宽页面分隔线。
- 仅使用 `--border` 色调的 `1px` border。
- rule 必须足够安静，让文本始终保持主导。
- 仅在确实改善列表扫描时使用填充 rule；不要把它们散落到正文中。

### 3. 组件指引

#### Header And Logo

header 应当是安静的框架，而不是 hero banner。`templates/header.html` 中的 ASCII logo 及其在 `static/css/style.css` 中的当前样式，是主要身份标识。

规则：

- 保持 ASCII logo 以 `<pre>` 内文本艺术的形式存在。
- 保留其紧凑尺寸和粗体感；它应当像手工制作，而不是品牌物料。
- header 应继续保留左对齐的短收尾 rule，而不是全宽 border。
- 不得加入 badge、avatar、tagline、盒状 nav 或过大的 masthead 处理。

#### Nav

导航应当像一行普通文本链接。

规则：

- 保持 nav 标签简短；当前为小写的地方继续保持小写。
- nav 保持为支持换行的行内链接，而不是 pills 或 segmented controls。
- hover/focus 可以使用下划线，但 nav 不应获得厚重的悬停填充、轮廓或运动。
- theme toggle 应放在 nav 行内，并保持视觉上的低存在感。
- theme toggle 更适合表现为文本化 affordance，而不是盒状小按钮。

#### Prose And Content Area

文章和页面正文必须保持舒适、收窄、朴素。

规则：

- 保留当前正文宽度和行高。
- 标题保持紧凑并左对齐。
- blockquotes、tables 和 code blocks 应延续同样安静的 border 语言。
- 长文本页面应通过编辑式节奏建立呼吸，而不是只依赖默认段落堆叠。
- 不得加入装饰性首字下沉、过大的导语段落、盒状正文区块或杂志式修饰。

#### Lists: Home, Archive, Tags

列表是 `0xc1.space` 灵感被有意识显露出来的主要位置。

规则：

- 首页 recent-post 列表使用渲染后的 `»` 作为 marker，只显示标题，不附带日期或描述；若提及模板实现，可说明模板使用 `&raquo;` 输出该字符。
- Archive 和 tag-entry 列表使用四段式结构：marker、title、filler rule、date-or-count。
- 列表项必须直接放在页面背景上，不能出现带底色的行容器。
- 日期和计数保持 muted、次要。
- 在移动端，索引列表可以折叠 filler rule，并将 date/count 放到第二行；应与当前响应式列表样式一致。
- Tags 列表应当像术语索引，而不是 pills 或 chips 的云状集合。
- 首页应建立明确顺序：自我介绍在前、recent posts 为主要锚点、其他模块为次级补充。

理想模式：

- `» Title` 用于首页。
- `» Title ---- 2026-03-11` 用于 archive 类列表。
- `» #tag ---- 3 posts` 用于 taxonomy 总览。

禁止模式：

- 卡片式行。
- 缩略图主导的列表。
- 桌面端默认使用多行堆叠元数据。
- 与 ASCII/索引语言无关的装饰性 bullet。

#### TOC Rail

TOC rail 是阅读辅助，不是第二套导航系统。基线来自 `templates/partials/page-outline.html` 以及 `static/css/style.css` 中当前的 TOC/布局规则。

规则：

- 保持标签简短（基线为 `outline`）。
- 使用可折叠的 `details/summary` 模式。
- 在桌面端，rail 可以变为 sticky，并通过安静的竖向 rule 与正文分开。
- TOC 链接默认应为 muted，仅在 hover/focus 时略微加强。
- TOC 必须保持“轻但可抓住”，不能因为过度退让而损失导航可用性。
- 不得把 TOC 变成盒状 widget、浮动卡片或永久高声量的侧栏。

#### Metadata And Utility Links

元数据应像页边注释，而不是功能卖点。

规则：

- publish date、path hints、author lines、tag links 和 utility links 保持 muted 样式。
- `[Edit]` 这类 utility affordance 应继续保持方括号、小尺寸和低存在感。
- 元数据可以帮助定位，但绝不能与文章标题竞争。

#### Footer

footer 应当像温和的收束。

规则：

- 保持顶部短 rule 和纯文本结构。
- 保持 footer nav 简单、文本化。
- 不得加入社交图标行、多列 footer、newsletter 模块或厚重的法律 chrome。

### 4. 交互语气

交互应当几乎不可见。

规则：

- hover 和 focus 状态主要使用下划线、轻微的颜色增强或 border-color 变化。
- theme toggle 应保持为小型行内控件，不加入新奇动画。
- 如果存在 motion，也应仅限于约 `0.2s` 的简短颜色或边框过渡。
- 不允许放大悬停、滑出面板、视差或弹簧感运动。
- 主题切换应当感觉功能化，而非戏剧化。

### 4.5 当前审查驱动的优先级

以下条目来自最近一次 `critique` 式前端审查，应作为本阶段实现的直接优先级：

#### Priority 1: 首页层级更果断

- 目标：`自我介绍 -> recent posts -> 其他补充` 必须形成明确阅读顺序，而不是同音量平铺。
- 允许怎么做：通过模块顺序、标题语气、块间留白、宽度差和次级区块的弱化来建立层级。
- 不得怎么做：不得新增卡片、底色块、粗分隔线、hero 化 heading、指标式 summary 区或额外 chrome。
- 证据要求：`playwright-home-desktop.png`、`playwright-home-mobile.png`、`templates/index.html`、相关 `static/css/style.css` 规则。

#### Priority 2: 长文本页面使用编辑式节奏

- 目标：About 类长文本页面应有呼吸点和段落组织，而不是整块均质文字墙。
- 允许怎么做：只可通过段落组间距、标题前后距、引文与正文的节奏差、首段语气和宽度控制来实现。
- 不得怎么做：不得引入首字下沉、超大导语、装饰性章标题、额外分栏、正文背景块或杂志式修饰。
- 证据要求：代表性无 TOC 页面截图（如 `playwright-about-desktop.png`）、`templates/page.html`、相关 `static/css/style.css` 规则。

#### Priority 3: `theme toggle` 文本化而可发现

- 目标：`theme toggle` 必须一眼看出可操作，同时仍属于 nav 的文本语言系统。
- 允许怎么做：复用普通文本链接的字重、间距、hover/focus 语言；用括号、词语或轻量符号提示状态。
- 不得怎么做：不得回到盒状按钮、图标按钮、发光控件、分段切换器或独立工具条样式。
- 证据要求：header 截图、`templates/header.html`、`static/js/script.js`、相关 `static/css/style.css` 规则。

#### Priority 4: TOC / 元数据轻但可抓住

- 目标：TOC 与元数据继续保持次级，但用户应能在 1-2 次扫视内定位结构和基础上下文。
- 允许怎么做：默认保持 muted；通过字号、字距、行高、hover/focus、分组方式和点击目标尺寸来提升可用性。
- 不得怎么做：不得新增盒状容器、阴影、浮层感、sticky widget、厚边框或高对比强调带。
- 证据要求：`playwright-article-desktop.png`、`playwright-article-mobile.png`、`playwright-article-dark.png`、`templates/blog-page.html`、`templates/partials/page-outline.html`、相关 `static/css/style.css` 规则。

#### Priority 5: 暗色模式保留材料感

- 目标：暗色模式应像“被压暗的纸页”，而不是滑回纯黑背景的终端博客观感。
- 允许怎么做：只允许在现有亮色 token 语义上做最小偏移，优先调整 `--bg`、`--bg-elevated`、`--border`、`--muted`、`--code-bg` 与链接色的暖度和材料感。
- 不得怎么做：不得另起一套高饱和暗色主题，不得回到纯黑背景、霓虹蓝链、强 glow 或终端式反差。
- 证据要求：`playwright-home-dark.png`、`playwright-article-dark.png`、`static/css/style.css` 中暗色 token 规则。

### 5. 漂移边界与反模式

除非未来有新的 RFC 明确替代本 RFC，下列变化均视为设计回退：

- 重新在首页或 archive 列表行后加入带底色的卡片。
- 用全宽横向分隔线来构造 header/footer 框架。
- 将正文加宽到失去笔记本式阅读感。
- 把 tags 变成 pills、badges 或彩色 chips。
- 把高饱和强调色、光泽按钮、阴影、模糊或渐变作为主要结构手段。
- 提升元数据地位，直到它与标题竞争。
- 用 polished graphic logo 或大型 wordmark 取代 ASCII logo。
- 让 TOC 比正文列更醒目。
- 加入装饰性 motion 或类应用控件样式。
- 整体复制原始 `0xc1.space`，而不是只选择性借用其列表语言。
- 把首页或 About 做成缺乏主次的均质文字面。
- 让暗色模式仅剩“黑底蓝链开发者博客”气质。

### 6. Reviewer Matrix

使用下表作为变更表面的主要通过/失败门禁：

| Surface | Must preserve | Must not introduce | Evidence required |
| --- | --- | --- | --- |
| Header | `<pre>` 中的 ASCII logo；行内文本链接 nav；局部短 framing rule | graphic logo、盒状 nav、badge row、全宽 chrome rule | header 区域渲染截图 + `templates/header.html` |
| Home list | 基于纯背景的 `»` 标题行；每行无附加元数据；收窄的索引节奏 | cards、thumbnails、逐行底色填充、桌面端堆叠元数据 | 首页桌面/移动端截图 + `templates/index.html` |
| Archive/tag list | marker + title + filler rule + date/count 结构；muted 的次级元数据 | pill tags、chip clouds、card rows、装饰性 bullet、桌面端密集多行堆叠 | 列表表面桌面/移动端截图 + `templates/section.html` 或 `templates/tags/*.html` |
| Article | 收窄且可读的正文；紧凑标题；muted 的元数据和 utility links | 宽阅读列、盒状正文区块、高声量元数据框架、装饰性排版 | 文章桌面/移动端截图 + `templates/page.html` 或 `templates/blog-page.html` |
| TOC | 简短 summary 标签；可折叠的次级 rail；muted 链接 | 高声量盒状 widget、sticky card 处理、比正文更强的视觉权重 | TOC 展开时的文章截图 + `templates/partials/page-outline.html` |
| Footer | 纯文本 footer；顶部短 rule；简单的收尾结构 | 多列 footer、社交图标行、newsletter 模块、全宽重分隔线 | footer 渲染截图 + `templates/footer.html` |

评审规则：如果某个 surface 破坏任意 `Must preserve` 项、引入任意 `Must not introduce` 项，或缺少该 surface 要求的证据，则该 surface 评审失败。

### 7. 允许变化的范围

以下细化无需替换本 RFC 即可安全进行：

- 只要正文、rule 和元数据层级不变，链接色相可以在同一克制的冷暖色族内轻微漂移。
- 间距可以在现有小步长节奏内轻微收紧或放松，前提是列表仍保持索引感，正文仍舒适可读。
- TOC summary 文案可以从 `outline` 变为其他同样简短的小写标签，只要它仍是次级阅读辅助。
- 首页和 archive 列表密度可以通过细微的 gap 和 rule 长度调整来微调，但纯背景索引语法必须保持不变。
- taxonomy count 的文案可在紧凑文本形式之间变化，只要计数仍保持 muted，并且次于 tag 名称。

任何超出这些边界的变化，都需要更新 RFC，或获得与本契约挂钩的明确评审批准。

## 数据模型 / 接口

本 RFC 将以下内容视为未来主题工作的稳定接口表面：

### Stable CSS Tokens

- `--bg`
- `--bg-elevated`
- `--fg`
- `--muted`
- `--link`
- `--visited`
- `--border`
- `--code-bg`

兼容性规则：未来工作可以新增 token，但在未于 PR 中记录迁移影响前，不应改变现有 token 的语义用途。

### Stable Semantic Classes

- `.home-copy`
- `.home-posts`
- `.list-shell`
- `.page-shell`
- `.page-shell.has-outline`
- `.page-article`
- `.page-outline`
- `.page-outline-nav`
- `.post-list`
- `.post-list-home`
- `.post-list-index`
- `.post-link`
- `.post-marker`
- `.post-filler`
- `.post-date`
- `.post-meta`
- `.tags-data`
- `.admin-edit-link`

兼容性规则：如果未来重构重命名了这些语义之一，PR 必须说明替代项，并证明最终视觉行为仍满足本 RFC。

### Template Contracts

- Header 持续暴露 ASCII logo、行内 nav 和 theme toggle。
- Home 持续将介绍文案与 recent-post 列表分开。
- Archive 类页面持续渲染索引式行列表。
- Article 类页面持续支持可选 TOC rail。

## 错误语义

由于本 RFC 是设计门禁，错误表现为评审失败，而不是运行时异常。未来变更应按下表对失败进行分类：

| Failure | Severity | Recovery | Retry semantics |
| --- | --- | --- | --- |
| 配色不再呈现 warm paper/ink 观感 | blocking | 将 token 漂移回退到基线色族 | 对照截图后重试 |
| 列表重新出现 card/chip 处理 | blocking | 恢复纯背景列表结构 | 重新抓取桌面/移动端截图后重试 |
| 内容宽度超出预期阅读范围 | blocking | 恢复 shell 宽度约束 | 做可读性检查后重试 |
| TOC 或元数据在视觉上喧宾夺主 | blocking | 降低对比、字重或框架感 | 完成文章截图评审后重试 |
| hover/motion 变得装饰化 | non-blocking unless severe | 收敛回下划线或轻微颜色变化 | 完成交互评审后重试 |
| 局部间距不一致但仍可读 | non-blocking | 归一到既定节奏步长 | 并排比较后重试 |

可恢复性规则：优先回退造成漂移的最小 token 或组件变更。不要通过在别处增加更多视觉 chrome 来补偿一次糟糕的改动。

## 安全考虑

这是一份 docs/design-governance RFC，但未来在此设计门禁下的实现变更仍需遵守以下要求：

- 不得依赖远程字体、远程图标包或第三方视觉资源来承载核心身份。
- 保持 ASCII logo 和列表标记由模板生成，而不是从不可信内容中注入。
- 避免 CSS 或模板改动让 front matter 或用户内容以不安全方式控制结构类名。
- 在重设链接或控件样式时，保留可见的 focus 状态。
- 避免昂贵的视觉效果，以免在长列表或低功耗设备上造成渲染成本峰值。

## 向后兼容与发布

本 RFC 与当前站点向后兼容，因为它是在固化现有实现，而不是替换现有实现。

发布计划：

1. 将本 RFC 作为未来主题 PR 的评审基线。
2. 要求未来主题变更说明它们有意修改了哪些原语或组件。
3. 在合并前要求为受影响 surface 提供更新后的截图。

回滚计划：

- 如果未来某个主题 PR 虽通过功能检查，但未通过本设计门禁，则回退其视觉 diff，同时保留其他内容/模板行为不变。
- 如果只有一个原语发生漂移，应先回滚该原语，而不是回退无关清理项。

## 可访问性与可读性护栏

- 保持正文在纸张背景上的清晰可读对比。
- 保持 muted 文本可读，而不是淡到像幽灵文本。
- 为链接和控件保留清晰的 hover 与键盘 focus 区分。
- 保持正文宽度在当前可读范围内，避免过密行长。
- 保持移动端行为，防止横向溢出。
- 保持列表日期和计数为次级信息，但在小屏幕上仍然清晰可辨。
- 避免过小的点击目标；theme toggle 和 nav 链接在触摸设备上必须可用。
- 不得只依赖颜色来表达交互状态。

## 验证计划

未来每次主题变更都应将其主张映射到具体检查：

| Behavior to verify | Evidence |
| --- | --- |
| Header/footer 保持短 rule 的文本式框架，并与主体重心协调 | 渲染截图 + `templates/header.html` 和 `templates/footer.html` |
| Home 保持 warm paper 基线和纯文本索引式列表语言 | `playwright-home-desktop.png`、`playwright-home-mobile.png` 和 `templates/index.html` |
| Archive/tag surface 保持 marker/title/rule/date-count 语法 | `playwright-blog-list-desktop.png`、`playwright-blog-list-mobile.png`，以及改动过的 archive/tag 模板 |
| Article 页面保持收窄可读正文和次级元数据 | 文章桌面/移动端截图 + `templates/page.html` 或 `templates/blog-page.html` |
| TOC 保持简短、可折叠且视觉上次级 | TOC 展开状态的文章截图 + `templates/partials/page-outline.html` |
| 交互保持克制 | 手工 hover/focus/theme-toggle 评审记录 |
| 无布局回退 | `zola build` + 受影响 surface 的桌面/移动端 spot check |
| 首页层级形成 `自我介绍 -> recent posts -> 其他补充` 的明确顺序 | `playwright-home-desktop.png`、`playwright-home-mobile.png`、`templates/index.html` |
| 长文本页面具有编辑式节奏而非均质文字墙 | `playwright-about-desktop.png` 或其他代表性无 TOC 页面截图 + `templates/page.html` |
| `theme toggle` 文本化且可发现 | header 截图 + `templates/header.html` + `static/js/script.js` |
| TOC / 元数据轻但可抓住 | `playwright-article-desktop.png`、`playwright-article-mobile.png`、`playwright-article-dark.png` + `templates/blog-page.html` |
| 暗色模式保留 warm paper/ink 的材料感 | `playwright-home-dark.png`、`playwright-article-dark.png` + `static/css/style.css` dark tokens |

使用本 RFC 中的 reviewer matrix 作为合并门禁；不要只依赖主观的整体观感。

## 备选方案

### Alternative A: Leave The Design Intent Unwritten

拒绝原因：这会让设计知识继续被困在记忆和截图里，使后续细化更主观，并提高漂移风险。

### Alternative B: Revert More Of The Site To The Original `0xc1.space`

拒绝原因：当前站点已经形成用户希望保留的、温暖且类似 Granda 的一致方向。原站真正有价值的启发主要是列表语法，而不是整套旧视觉系统。

### Alternative C: Create A Generic Design System RFC

拒绝原因：通用指导过于抽象，无法成为真正的门禁。本任务需要的是与当前文件和产物绑定的、站点特定的设计契约。

## 评审边界决策

- 首页与 archive 链接字重差异目前暂不纳入契约。除非未来变更明确针对列表字重统一，否则评审者应保持当前差异。
- TOC summary 标签的当前基线仍是 `outline`。只有在上述允许变化范围内，才允许改成其他同样简短的小写标签。
- taxonomy 总览计数的当前文本形式仍是基线。更偏 bracketed 的计数语法推迟到未来 RFC 或定向设计轮次再讨论。

## 计划

本 RFC 仅涉及文档。本轮不提出任何主题实现变更。

### 未来工作的文件触点

- `static/css/style.css`: tokens、间距、宽度、列表样式、TOC 样式、交互样式
- `templates/header.html`: logo、nav、theme toggle 结构
- `templates/footer.html`: footer 框架与 nav 结构
- `templates/index.html`: 首页介绍区与 recent-post 列表语言
- `templates/section.html`: archive 列表语言与分页语气
- `templates/tags/list.html`: taxonomy 总览列表语言
- `templates/tags/single.html`: taxonomy 明细列表语言
- `templates/page.html`: 页面正文、tags、utility links、TOC 使用方式
- `templates/blog-page.html`: 文章元数据、正文、tags、TOC 使用方式

### 未来任意主题 PR 的验证步骤

1. 运行 `zola build`。
2. 为每个变更过的 surface 抓取更新后的桌面/移动端截图。
3. 将变更截图与本 RFC 中命名的基线产物进行对比。
4. 依据本文档中的 reviewer matrix 和证据规则进行评审。
5. 任何以新奇感换取设计论点损失的变更都应被拒绝或修订。
