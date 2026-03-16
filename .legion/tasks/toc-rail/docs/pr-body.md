## What

- 为 `cone-scroll` 主题的带 TOC 页面补上“收起目录时连同左 rail 一起折叠”的交互，桌面端正文会向左回收空间，视觉上更接近无 TOC 文章页。
- 保留一个低声量、文本化的展开入口，继续使用原生 `details/summary` 语义，不额外引入新的工具按钮或依赖。
- 本任务属于 Low-risk design-lite 变更，`rfc: N/A (design-lite)`。

## Why

- 现状里目录虽然可以收起，但左侧 rail 宽度、边线和 gap 仍然保留，正文会被持续推在右侧，产生“目录没了但空列还在”的版式问题。
- 这次改动的目标不是增加新功能，而是让 TOC 折叠更符合阅读语境：收起时像暂时没有 TOC，展开时又能快速回到原先导航状态。
- 同时补上按页面记忆开合状态、移动端稳定性和 quiet TOC 设计契约的一致性。

## How

- 模板层继续沿用 `page-outline` 的 `details/summary` 结构，在博客页和普通页统一接入 outline shell / state 协议。
- 样式层用 CSS 变量统一驱动 rail 宽度、gap、边线和收起态入口位置；collapsed 时将 rail 占位收敛到 `0`，并补齐 hover / `focus-visible` / reduced-motion 细节。
- 脚本层以 `details.toggle` 为主要状态同步来源，按 `page-outline:${pathname}` 将 `expanded` / `collapsed` 写入 `localStorage`，并在 `pageshow` 时重新同步。

## Testing

- `zola build`：PASS，构建成功，无模板或链接检查错误。详见 `/.legion/tasks/toc-rail/docs/test-report.md`
- 浏览器级证据：桌面展开、桌面收起、移动端收起截图均已留档，详见 `/.legion/tasks/toc-rail/docs/playwright-article-desktop-expanded.png`、`/.legion/tasks/toc-rail/docs/playwright-article-desktop-collapsed.png`、`/.legion/tasks/toc-rail/docs/playwright-article-mobile-collapsed.png`
- 设计审查 / 收口检查 / 代码审查：均为 PASS，详见 `/.legion/tasks/toc-rail/docs/critique-review.md`、`/.legion/tasks/toc-rail/docs/refinement-review.md`、`/.legion/tasks/toc-rail/docs/review-code.md`

## Risk

- 风险等级低，改动仅限主题模板、CSS 和少量 JS，不涉及数据、API、权限或安全边界。
- 已知残余风险主要是首屏恢复时可能出现轻微跳变，以及未覆盖所有中间断点的细微视觉差异。

## Rollback

- 直接回退 `page-outline` 相关模板协议、rail 折叠样式与状态同步逻辑即可。
- 回滚后恢复为原先仅收起 TOC 内容、但保留左 rail 占位的实现。

## Links

- Plan: `/.legion/tasks/toc-rail/plan.md`
- Design-lite: `/.legion/tasks/toc-rail/docs/design-lite.md`
- Walkthrough: `/.legion/tasks/toc-rail/docs/report-walkthrough.md`
- Test report: `/.legion/tasks/toc-rail/docs/test-report.md`
- Critique review: `/.legion/tasks/toc-rail/docs/critique-review.md`
- Refinement review: `/.legion/tasks/toc-rail/docs/refinement-review.md`
- Code review: `/.legion/tasks/toc-rail/docs/review-code.md`
