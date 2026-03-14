# Czon 比例审查

## 方法

- 依据 `frontend-design` 与 `critique` skill 的审查框架，重点看 composition、balance、hierarchy 与 page-to-page rhythm。
- 用 `playwright-cli` 在 `1440 x 1600` 视口下分别测量主站与 Czon 的 `home` / `about` / `list` / `article` 页面主要容器。
- 对照截图：
  - 主站：`.legion/tasks/czon/docs/playwright-main-home-desktop.png`、`.legion/tasks/czon/docs/playwright-main-about-desktop.png`、`.legion/tasks/czon/docs/playwright-main-list-desktop.png`、`.legion/tasks/czon/docs/playwright-main-article-desktop.png`
  - Czon：`.legion/tasks/czon/docs/playwright-czon-home-desktop.png`、`.legion/tasks/czon/docs/playwright-czon-about-desktop.png`、`.legion/tasks/czon/docs/playwright-czon-list-desktop.png`、`.legion/tasks/czon/docs/playwright-czon-article-desktop.png`

## Anti-Patterns Verdict

这套 Czon 页面 **不是典型的 AI slop**：它没有落入紫蓝渐变、玻璃卡片、泛滥 hero metrics 那一套指纹。

但它仍然 **明显失败于版式比例一致性**：同一套 header chrome，挂在了三种完全不同的 body 比例上。用户感受到的“很怪”，不是配色怪，而是 **页面几何语言不统一**。

## 关键测量

### 主站基线

| 页面 | header/shell | content/shell | content 起点 x |
| --- | --- | --- | --- |
| home | 0.38 | 0.64 | 200 |
| about | 0.38 | 0.61 | 200 |
| list | 0.38 | 0.73 | 200 |
| article | 0.38 | 0.60 | 500 |

### Czon 旧产物（修复前）

| 页面 | header/shell | content/shell | content 起点 x |
| --- | --- | --- | --- |
| home | 1.00 | 0.32 | 552 |
| about | 1.00 | 0.29 | 568 |
| list | 1.00 | 0.29 | 568 |
| article | 0.90 | 0.54 | 372 |

### 跨页面一致性

- 主站主内容列宽范围：`621px ~ 756px`，最大/最小比值约 `1.22x`
- Czon 主内容列宽范围：`304px ~ 630px`，最大/最小比值约 `2.07x`

结论：主站四个页面像同一个设计系统；修复前的 Czon 四个页面像四个不同模板被强行套了同一层皮。

### Czon 当前产物（比例修复后）

| 页面 | 可读主列宽度 | content 起点 x |
| --- | --- | --- |
| home | 704px | 200 |
| about | 640px | 200 |
| list | 752px | 200 |
| article | 621px | 500 |

- 当前主内容列宽范围：`621px ~ 752px`
- 最大/最小比值：约 `1.21x`

结论：修复后 Czon 的跨页面宽度家族已经从 `2.07x` 收敛到 `1.21x`，home/about/list 的左锚也已收回主站同一条起跑线，article 的正文与 TOC 起点也已贴近主站；“比例很怪”的核心问题已明显缓解。

## 修复前 Critique Snapshot

Czon 在修复前最怪的地方，是 **header 在说“我是一个 1040px 的宽壳”**，而 home/about/list 的正文却在说“我只是一个 304-336px 的窄针列”。

这会让页面像是：顶部属于一个网站，正文属于另一个网站。用户看到的不是“克制”，而是 **比例失配**。

## 修复后的正向结果

- article 页经过本轮 CSS 收口后，已经基本回到主站区间；正文、TOC 和起点都不再偏离主站比例。
- 纸张/墨水色调和 logo/nav 方向是统一的，说明视觉语言本身不是问题。
- Czon article 的正文列现在是 `621px`，已经与主站 `621px` 对齐，证明只要模板结构对，CSS 是能把比例做顺的。

## 修复前优先问题

### 1. Header 和 body 完全不是一个比例系统

- **What**：主站四页的 header 都是紧凑左锚块，宽度约 shell 的 `38%`；Czon 的 header 在 home/about/list 上直接占满 `100%` shell。
- **Why it matters**：主站 header 是“左侧牌匾”；Czon header 是“整行横幅”。当正文又只剩 29-32% shell 时，顶部和正文的视觉语法直接打架。
- **Fix**：如果继续走主站替代路线，header 不能再默认当 full-width shell。需要页面级模板能力，把 header 做成和主站一样的 compact block，或至少允许按 page kind 调整 header 宽度与 utility row。
- **Command**：`/adapt`

### 2. home/about/list 的正文列过窄，而且窄得不一致

- **What**：主站 home/about/list 的主列大致落在 shell 的 `61%-73%`；Czon home/about/list 只有 `29%-32%`。
- **Why it matters**：这不是“精致窄版”，而是让正文像悬在中央的小岛。尤其 home 页，header 是 1040px，正文却只有 336px，空白成了剩料，不是设计。
- **Fix**：如果要接近主站，home/about/list 必须至少回到 `600-760px` 级的主列宽度，并且左对齐到稳定起点，而不是始终漂在 `x=552/568` 的中右位置。
- **Command**：`/normalize`

### 3. article 页虽然接近，但 TOC 与正文的比例仍偏瘦

- **What**：主站 article 的 outline/content 比例约 `0.41`；Czon 只有 `0.28`。同时主站正文起点在 `x=500`，Czon 在 `x=372`，整体更左偏。
- **Why it matters**：这就是“TOC 感觉不对”的残余来源。不是 TOC 在不在左边的问题，而是它的权重和与正文的间距体系还不是主站那套关系。
- **Fix**：如果继续在 CSS 层做收口，article 下一轮应优先调 TOC 宽度、rail gap、正文起点，而不是继续抛光颜色。
- **Command**：`/polish`

### 4. Czon 没有稳定的跨页面几何 grammar

- **What**：主站四页的内容宽度最大/最小比只有 `1.22x`；Czon 是 `2.07x`。
- **Why it matters**：用户会直觉感到“这个站的页面不是一家人”。比例系统一旦分裂，哪怕颜色和字体统一，也还是怪。
- **Fix**：先定义 page family：`home/list` 一组、`about/post` 一组，或者 `home/about/list` 同列宽、`article` 带 rail。无论哪种，都要把 content width family 收紧到主站接近的区间。
- **Command**：`/distill`

### 5. home/about/list 的问题已经不是纯 CSS 比例，而是模板比例

- **What**：home 实际输出的是 category explorer；about/list 实际被渲染成 article shell。
- **Why it matters**：只靠 CSS 无法把错误模板变成正确比例。你可以把现有框收窄或拉宽，但无法让 home 像首页、list 像 archive、about 像 plain page。
- **Fix**：这里要转向 CZON framework：提供真正的 `home/page/archive/post` 模板分流与 page-level hooks。
- **Command**：`/critique`

## 修复前补充观察

- Czon home 的 category cloud 宽度只有 `288px`，放在 1040px shell 里像一根竖着的索引针，而不是首页导航面。
- Czon about/list 的 `content-header` 高度都异常高，首屏大块 metadata lead 占掉了太多纵向比例，让正文开头被推得很远。
- 主站的页面起点要么固定左锚（home/about/list 的 `x=200`），要么是 article shell 下的稳定二级起点；Czon 现在在 `x=372`、`x=552`、`x=568` 之间来回漂。

## Questions to Consider

- 这个站到底想要几种页面比例？两种就够了，还是四种都不同？
- header 真的需要在每种 page kind 上都占满 1040px 吗？
- 如果 home/list/about 继续只有 304-336px 主列，它们凭什么能替代主站？
- 我们现在是在“调样式”，还是在“用 CSS 掩盖错误模板”？

## 最终判断

- 从比例 critique 的角度看，用户说的“不一致、很怪”是准确的。
- 经过这一轮 `.czon/style.css` 修复后，**整站比例家族已经明显收敛**：home/about/list/article 的宽度族从 `2.07x` 收敛到 `1.21x`，home/about/list 也回到了与主站一致的左锚，article 则重新贴回主站的 `x=500 / 621px` 级别。
- 当前剩余问题不再是“整站比例完全失控”，而主要是模板语义层尾项：home/about/list 与主站仍不完全同构。
- 若目标是“替代主站”，下一步应该把注意力从纯比例转向模板能力；但如果目标只是先把页面看起来顺眼、比例不怪，那么 `.czon/style.css` 这条线已经证明是有效的。

## style.css 修复清单

先明确一句：**比例问题本身，大部分是可以继续通过 `.czon/style.css` 修的。**

前面批评的是“整站替代级一致性”不可能只靠 CSS 完成；但如果只谈 `home/about/list/article` 的 **宽度、对位、留白、header/body 比例**，当前 DOM 已经暴露出足够多的挂载点，仍然有明显可修空间。

### 可直接通过 `.czon/style.css` 推进的比例项

- [x] **统一 header block 比例**：把 `home/about/list` 的 header 从 full-width shell 收回到更接近主站的 compact block，避免 `header/shell = 1.00`。
- [x] **统一非 article 页的主列宽度族**：
  - `home` 从约 `336px` 提升到接近主站首页的 `660-760px`
  - `about` 从约 `304px` 提升到接近主站 about 的 `620-640px`
  - `list` 从约 `304px` 提升到接近主站 archive 的 `740-760px`
- [x] **统一非 article 页的左起点**：把 `home/about/list` 的内容起点从 `x=552/568` 收回到更接近主站的 `x=200` 左锚，而不是漂在中右。
- [x] **压缩 `about/list` 首屏 header 区高度**：当前 `content-header` 过高，首屏大块 metadata lead 把正文推得太远；即便不改模板，也可以先用 CSS 收紧间距、隐藏部分重复 lead、减小 block density。
- [x] **修 article 的 rail 比例**：把 article 的 TOC/content 比例从 `0.28` 拉回更接近主站的区间，优先调 `rail width`、`gap`、`article x-offset`。
- [x] **给不同 page kind 定义明确宽度变量**：例如 `--czon-home-width`、`--czon-page-width`、`--czon-list-width`、`--czon-article-width`、`--czon-article-rail-width`，避免每页比例各说各话。
- [x] **统一 shell 内可读区域占比**：主站 `content/shell` 大致落在 `0.60-0.73`，Czon 现在 `home/about/list` 只有 `0.29-0.32`；至少要把这三页拉回同一宽度家族。

### 只能部分缓解、不能彻底靠 `.czon/style.css` 解决的项

- [ ] `home` 仍然是 category explorer，不是主站那种 `_index.md` landing page；CSS 只能改比例，不能把分类总览变成真正首页模板。
- [ ] `about` / `list` 目前仍被渲染成 article shell；CSS 能放大和挪动，但不能把错误 page kind 变成真正的 plain page / archive template。
- [ ] `list` 页缺少主站 archive rows 的真实 DOM；CSS 不能凭空生成标题列、日期列、摘要列的结构关系。
- [ ] `about` 的 frontmatter 泄漏、metadata 注入、share/footer chrome 仍是模板问题；CSS 只能隐藏，不能从根上修正输出语义。

### 建议的执行顺序

1. [x] 先用 `.czon/style.css` 修完 **纯比例问题**：header 宽度、非 article 页主列宽度、左起点、article rail 比例。
2. [x] 再重新跑 Playwright 对比，确认四页的 `content width family` 是否已经从 `2.07x` 收敛到接近主站的 `1.2x ~ 1.3x`。
3. [ ] 如果这一步完成后仍觉得不像主站，那剩下就主要不是比例，而是 **模板与语义层差异**，此时再推动 CZON framework。
