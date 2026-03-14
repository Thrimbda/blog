# Playwright 审查

## 结论

通过浏览器级审查，当前 Czon 文章页已经基本解决了用户最初指出的两个核心问题：正文不再异常狭窄，TOC 也不再像默认 widget，而是更接近主站的安静左 rail。

但它还没有达到与主站 1:1 完全一致的程度；剩余差异主要来自 Czon 现有 DOM 与内置壳层文案，而不是这轮 CSS 收口本身失败。

## 证据

- Czon 桌面文章截图：`.legion/tasks/czon/docs/playwright-czon-article-desktop.png`
- Czon 移动文章截图：`.legion/tasks/czon/docs/playwright-czon-article-mobile.png`
- Czon 首页截图：`.legion/tasks/czon/docs/playwright-czon-home-desktop.png`
- Czon 列表截图：`.legion/tasks/czon/docs/playwright-czon-list-desktop.png`
- Czon About 截图：`.legion/tasks/czon/docs/playwright-czon-about-desktop.png`
- 主站基线截图：`.legion/tasks/granda/docs/playwright-article-desktop.png`

## 量化观察

- 审查视口：`1440 x 1600`
- Czon 文章主 shell：约 `1160px`
- Czon `.content` 阅读列：约 `630px`
- Czon `article` 阅读列：约 `630px`
- Czon 左侧 TOC rail：约 `176px`

这组尺寸说明当前正文已经从此前“被外层 padding 挤成细柱”的状态，恢复到接近主站窄阅读列的量级。

## 通过项

- 正文宽度明显恢复：桌面截图里正文已不再贴成异常细柱，首屏阅读感与主站同样回到窄而可读的编辑式列宽。
- TOC 方向正确：左侧目录已是低声量 rail，而非盒状 sidebar；标题更小、链接更轻、边线更安静。
- 非文章页未见回归：首页、列表页、About 页截图都没有出现文章页规则误伤导致的宽度塌陷或 rail 残留。
- 移动端未破版：移动端文章截图中正文宽度与首屏节奏正常，没有因桌面 article-only 规则引入明显异常。

## 仍存在的差异

- Czon 的 TOC 标题文案仍是内置的 `TABLE OF`，主站则是中文 `目录`，这会直接影响观感是否“像同一个站”。
- 文章首屏仍保留 Czon 自带的 `[theme] [简体中文]` 工具行与其既有位置关系；主站没有这组完全相同的壳层结构。
- TOC 仍是 Czon 的固定侧栏 DOM，只是被 CSS 收口为更轻的 rail；主站则是模板层定义的 outline 结构，因此细节语气仍有轻微差异。

## 原因判断

这些剩余差异更像是 **Czon 当前模板/挂载点自由度不足**，而不是 CSS 不够努力：

- 仅靠 `.czon/style.css` 可以调整宽度、间距、颜色、边线、层级和位置；
- 但不能稳定修改内置壳层文案、替换 TOC 结构、增加主站那种 `details/summary` 语义，或重排文章头部的信息层级。

## 如果要做到更像主站，我需要什么

- 一个稳定的 article shell class 或 page-level data attribute，用于替代当前对 `:has(> aside.sidebar-right)` 的近似识别。
- 可覆盖或本地化的 TOC 标题文案入口，至少能把 `TABLE OF` 改成与主站一致的语气。
- 可自定义文章页头部 / utility row / TOC 结构的模板挂载点，而不只是事后用 CSS 覆盖。

## 审查结论

- 对用户最初关心的“正文太窄”和“TOC 感觉不对”这两个问题：**现在可以判定为已基本修正**。
- 对“和主站视觉效果完全一样”这个更高标准：**当前已经很接近，但仍受 Czon 模板自由度限制，未做到 1:1 完全同构**。
