# TOC rail design-lite

## 交互目标

- 收起 TOC 时，桌面双列中的左 rail 不只隐藏内容，还要连同占位一起退场，让正文回到接近单栏文章的起跑线。
- 保留一个低声量、文本化的展开入口，语气延续当前 `outline/目录` 的编辑式辅助导航，而不是新做一个工具按钮。

## 方案

- 继续保留 `details/summary` 作为可访问的开合语义，但用 JS 在 `page-shell` 上同步一个 collapsed state class/data attribute。
- 桌面布局改为由 CSS 变量驱动 rail 宽度、gap 与边线；collapsed 时把这些变量收敛到 `0`，并让 `summary` 以绝对定位的小标签形式留在正文左缘。
- 目录内容在 collapsed 时只做轻量淡出/位移，避免新增 widget 感；展开后恢复原来的 sticky rail 和独立滚动。
- 以 `pathname` 为 key 将开合状态存到 `localStorage`；默认无记录时保持展开，避免首次访问丢失目录。

## 兼容与边界

- 仅在 `.page-shell.has-outline` 生效；无 TOC 页面继续走单栏。
- 移动端不强求 rail 折叠动画，只需保持 `summary` 可用、布局稳定、无横向溢出。
- `prefers-reduced-motion` 下关闭列宽/位移动画，保留状态切换本身。

## 验证样本

- 1 篇带 TOC 的博客长文：验证桌面展开/收起/再展开、移动端开合、刷新后状态恢复。
- 1 个带 TOC 的普通页面（若存在）或至少 spot check `page.html` 渲染不回退。
- 对照 `.legion/tasks/granda/docs/rfc.md` 的 TOC gate，确认没有引入盒状按钮、重边框或高声量 rail。
