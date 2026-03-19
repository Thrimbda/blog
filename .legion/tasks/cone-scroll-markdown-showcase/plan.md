# Cone Scroll Markdown Showcase 文章基线

## 目标

为 Cone Scroll 主题新增一篇覆盖常见 Markdown 渲染元素的示例文章，作为后续主题视觉优化的稳定验收样本。

## 问题定义

- 当前博客缺少一篇专门用于观察 Cone Scroll 主题 Markdown 渲染细节的“基准文章”，导致后续做排版/组件优化时很难一次性检查标题层级、列表、引用、代码、表格、图片等 surface。
- 现有文章虽然包含部分 Markdown 元素，但题材和结构各不相同，无法稳定承担“主题回归样本”的角色。
- 需要先补齐一篇内容可读、结构完整、可长期复用的 showcase 文章，再以这篇文章为基线推进后续主题优化。

## 验收标准

- `content/blog/markdown-render-showcase.md` 存在并能被 Zola 构建为一篇博客文章。
- 文章覆盖后续主题优化最常观察的核心 Markdown surface：标题层级、段落、强调、链接、引用、列表、任务列表、代码块、表格、分隔线、图片、脚注。
- 文章 front matter 与当前博客列表页/文章页约定兼容，能在 Cone Scroll 主题下正常显示标题、日期、slug、TOC 与标签信息。
- 生成 `docs/test-report.md`、`docs/review-code.md`、`docs/report-walkthrough.md`、`docs/pr-body.md`，支持直接进入 PR review。

## 假设

- 当前站点继续使用 Zola 与 `theme = "cone-scroll"`，默认语言内容放在 `content/blog/` 下即可被收录。
- 站内已有稳定可复用图片资源（如 `static/images/avatar.jpg`），可直接用于图片渲染示例，无需为本任务额外引入新素材。
- 本次只需提供中文基线文章；其他语言在未来若需要再按多语言同步流程补齐。

## 约束

- `plan.md` 保持摘要级任务契约，不展开成 mini-RFC；Low risk 任务仅补充 design-lite。
- 本轮不修改 Cone Scroll 主题模板或样式；若实施中发现必须动主题代码，需先升级 scope 再处理。
- 示例内容优先使用 Zola 当前稳定支持的常见 Markdown 能力，避免引入不确定的第三方扩展语法。
- 新文章既要覆盖元素，也要保持“可读文章”的组织感，避免写成纯碎片化语法清单。

## 风险/规模分级

- **风险等级**: Low
- **规模**: 非 Epic
- **标签**: 无（非 `continue` / `plan-only` / `rfc:heavy` / `risk:high`）
- **理由**: 本次只新增内容样本与任务文档，不改主题实现、配置契约或外部依赖；变更局部、可快速回滚，因此采用 design-lite 即可。

## 要点

- 新增一篇稳定、可长期复用的 Markdown showcase 文章，作为后续 Cone Scroll 视觉优化的统一验收样本。
- 优先覆盖最能暴露主题问题的 surface：TOC 层级、段落节奏、列表缩进、引用边界、代码块、表格、图片与脚注。
- 文章内容保持中文、可读、低噪声，方便后续直接对照页面做视觉打磨。

## 范围

- `content/blog/markdown-render-showcase.md`
- `.legion/tasks/cone-scroll-markdown-showcase/**`
- `.legion/playbook.md`

## Design Index

- design-lite: `.legion/tasks/cone-scroll-markdown-showcase/docs/design-lite.md`
- 主题与结构参考: `themes/cone-scroll/templates/blog-page.html`
- 样式基线参考: `themes/cone-scroll/static/css/style.css`

## 阶段概览

1. **阶段 1 - 契约与设计** - 2 个任务
2. **阶段 2 - 内容实现** - 2 个任务
3. **阶段 3 - 验证与交付** - 2 个任务

## 阶段地图

1. 契约与设计：确认文章目标、front matter 约定、Markdown 覆盖矩阵与 design-lite。
2. 内容实现：新增 showcase 文章，确保内容既可读又能覆盖关键 render surface。
3. 验证与交付：运行站点构建验证，完成代码评审、walkthrough 与 PR body。

---

*创建于: 2026-03-18 | 最后更新: 2026-03-18*
