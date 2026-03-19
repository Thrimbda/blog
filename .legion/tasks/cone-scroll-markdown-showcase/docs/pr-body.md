## What

本轮只新增一篇 Markdown showcase 文章：`content/blog/markdown-render-showcase.md`。文章以中文可读内容覆盖标题层级、段落、强调、链接、引用、列表、任务列表、代码块、表格、分隔线、图片与脚注，用作 Cone Scroll 主题后续优化的稳定回归样本。

## Why

当前仓库缺少一篇专门用于观察 Markdown 渲染细节的统一基线文章，导致后续做主题排版优化时难以稳定比较不同 surface 的表现。本 PR 先补齐样本，后续主题优化即可直接围绕同一篇文章做回归验证。

## How

实现方式保持最小化：仅新增文章内容，不修改主题模板、样式、配置或构建脚本。front matter 按现有博客文章契约编写，并使用站内已有图片资源，降低额外变量与回滚成本。

## Testing

- `zola build`：已执行，当前为 **FAIL**。
- 失败原因是仓库既有多语言入口问题：`content/_index.es-ES.md` 渲染链路中的 `@/_index.es-ES.md` 无法解析。
- 本轮新增文章未出现在报错链路中；静态检查未见 front matter 或 Markdown 结构异常。
- 详细记录见：`.legion/tasks/cone-scroll-markdown-showcase/docs/test-report.md`

## Risk / Rollback

- 风险较低：本轮只新增 Markdown showcase 文章，无生产代码与主题实现改动。
- 当前主要风险是构建验证被仓库既有多语言入口问题阻塞，而非本 PR 新增内容已确认失败。
- 如需回滚，删除 `content/blog/markdown-render-showcase.md` 即可。

## Links

- Plan：`.legion/tasks/cone-scroll-markdown-showcase/plan.md`
- Design Lite：`.legion/tasks/cone-scroll-markdown-showcase/docs/design-lite.md`
- Test Report：`.legion/tasks/cone-scroll-markdown-showcase/docs/test-report.md`
- Code Review（PASS）：`.legion/tasks/cone-scroll-markdown-showcase/docs/review-code.md`
- Walkthrough：`.legion/tasks/cone-scroll-markdown-showcase/docs/report-walkthrough.md`

## 备注

- 代码评审结论：**PASS**。
- 后续在修复构建阻塞后，可直接拿这篇文章做 Cone Scroll 主题优化回归。
