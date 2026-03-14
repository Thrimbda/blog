# CZON 上游 Issue / RFC 草案

## 标题建议

支持 page-level theme / template hooks，以便把 CZON 站点对齐到现有博客主站

## 背景

我正在把同一份博客内容同时输出为主站（Zola）和 CZON 站点，并希望 CZON 站点在视觉上能直接替代主站。

目前通过 `.czon/style.css` 已经能把 **比例问题** 大幅修掉：

- 修复前，CZON 四类页面的主列宽度家族是 `304px ~ 630px`，最大/最小比值约 `2.07x`
- 修复后，已经收敛到 `621px ~ 752px` 这一档，最大/最小比值约 `1.21x ~ 1.27x`
- article 页现在已经基本对齐主站：`content 621px / x=500`，TOC `248px / x=200`

这说明：**CZON 的自定义 CSS 覆盖能力已经足够强，至少能把比例与基础视觉语言拉齐。**

但也正因为这一轮 CSS 已经把“能靠 CSS 修的部分”基本修完了，所以剩下无法消除的差异就更清楚了：它们不是 style 问题，而是 page-level template / shell control 问题。

## 仍然存在的问题

### 1. 首页不是 `_index.md` 首页，而是 category explorer

- 当前首页输出的是 category overview / category cloud
- 但博客主站的首页语义是直接渲染 `content/_index.md` 作为 landing page
- CSS 能调宽度、留白、对位，但不能把 category explorer 变成 `_index.md` 首页模板

### 2. About / List 被渲染成 article shell

- About 与 archive/list 现在共享 article-ish shell
- 它们被注入了 article 的 metadata lead、share/footer chrome、utility row 等结构
- 这导致即使比例修好了，页面语义和主站仍然不是同一类页面

### 3. page-level 可识别能力不足

- 当前只能通过 DOM 猜测页面类型，例如：
  - `:has(> aside.sidebar-right)` 近似识别 article
  - `:has(> nav):not(:has(> aside.sidebar-right))` 近似识别 plain page / list
  - `:not(:has(> nav)):not(:has(> aside.sidebar-right))` 近似识别 home
- 这种方式能工作，但维护风险高；一旦 DOM 层级变化，定制样式就可能失效

### 4. 页面壳层内容缺少关闭/覆写入口

- TOC title
- metadata lead
- share widget
- generated footer
- language / utility row

这些内容即便能用 CSS 隐藏，也不是稳定的产品化方案。

### 5. section / archive 缺少真正的 list template

- archive/list 当前没有输出主站那种 row-based archive DOM
- CSS 不能凭空生成 list semantics，只能对现有结构做近似修饰

## 这轮验证得到的结论

### 已经证明可行的部分

- `.czon/style.css` 足以做 page-family 宽度变量
- `.czon/style.css` 足以把 header/body 比例、左锚和 article rail 调到接近主站
- 也就是说，CZON 不是“完全不能定制”，而是 **已经很接近只差模板层能力**

### 仍然缺失的部分

- 首页模板选择权
- page kind 的显式标记
- plain page / archive / post 的分流模板
- shell 注入块的显式开关或覆写点

## 建议的最小能力清单

### A. 输出稳定的 page-level hooks

至少输出这些属性之一：

- `data-page-kind="home|page|post|archive|section"`
- `data-template-kind="..."`
- 或稳定 shell class，例如 `.page-home`、`.page-post`、`.page-archive`

这能立即降低 CSS 定制的脆弱性。

### B. 支持真正的 page-level template override

建议支持类似下面的主题入口：

- `home.tsx`
- `page.tsx`
- `post.tsx`
- `archive.tsx`
- `section.tsx`

只要有这层，CZON 站点就能真正做出和主站一致的 page grammar，而不是只能事后覆盖。

### C. 支持 `_index.md` 作为 canonical homepage content

根路由 `/` 不应只能输出 category explorer。

至少需要一个配置，让首页可以选择：

1. `category explorer`
2. `render content/_index.md`
3. `custom home template`

### D. 给 shell 注入块提供开关/插槽

建议让以下块可配置开启/关闭，或可由主题接管：

- metadata lead
- TOC title
- share block
- generated footer
- utility row / language switch row

### E. 让 archive/list 有真正的 list rendering path

不是把 `_index.md` section 当成 article 渲染，而是提供 archive/list 的专用 DOM 结构。

## 为什么这件事值得做

因为从这次实测看，CZON 已经不再是“离可替代主站很远”。

恰恰相反：

- **比例与视觉语言** 已经能靠 `.czon/style.css` 基本拉齐
- **剩下的阻碍** 非常集中，主要就是 page-level theme / template hooks

换句话说，现在补这层能力，收益会非常直接：

- 不只是能做一个更像主站的博客
- 还意味着 CZON 从“可调样式的引擎”迈向“可定义页面产品形态的引擎”

## 附：本地验证证据

- 比例审计：`.legion/tasks/czon/docs/proportion-critique.md`
- 框架缺口分析：`.legion/tasks/czon/docs/czon-framework-gap.md`
- 主站参考截图：
  - `.legion/tasks/czon/docs/playwright-main-home-desktop.png`
  - `.legion/tasks/czon/docs/playwright-main-about-desktop.png`
  - `.legion/tasks/czon/docs/playwright-main-list-desktop.png`
  - `.legion/tasks/czon/docs/playwright-main-article-desktop.png`
- CZON 当前截图：
  - `.legion/tasks/czon/docs/playwright-czon-home-desktop.png`
  - `.legion/tasks/czon/docs/playwright-czon-about-desktop.png`
  - `.legion/tasks/czon/docs/playwright-czon-list-desktop.png`
  - `.legion/tasks/czon/docs/playwright-czon-article-desktop.png`

## 一句话结论

CZON 现在已经证明：**样式层够用了，下一步缺的是页面级主题/模板能力。**
