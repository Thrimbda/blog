# Cone Scroll Markdown 渲染修复

## 目标

修复 Cone Scroll 主题 Markdown 内容区中无序列表、有序列表、任务列表与代码块语法高亮的渲染问题，覆盖文章页与首页正文。

## 问题定义

- 当前主题加载了 `reset.css`，但 Markdown 内容区没有统一重新建立稳定的列表 marker 规则，导致文章页已修复后，首页正文等非 `.page-article` surface 仍可能缺少可见的无序/有序列表引导。
- Markdown 任务列表虽然已被渲染成 checkbox，但当前样式没有针对文章正文做专门收口，视觉状态与文本对齐都不理想。
- 主题虽已引入 highlight.js 脚本，但语法高亮初始化与样式链路不完整，代码块最终几乎只剩统一底色，没有达到可用的语义高亮效果。
- 需要以 `content/blog/markdown-render-showcase.md` 为回归样本，把这些 reader-facing 的基础渲染问题一次收口。

## 验收标准

- Markdown showcase 文章中的无序列表恢复可见 marker，且无序列表 marker 使用 `»`。
- Markdown showcase 文章中的有序列表恢复清晰数字 marker，并与正文排版保持安静一致。
- 首页 Markdown 正文中的无序列表与有序列表也继承同一套正文 marker 规则，不再因作用域遗漏而失去 marker。
- Markdown showcase 文章中的任务列表 checkbox 状态清楚、与文本对齐稳定，不再混用普通列表 marker。
- Markdown showcase 文章中的代码块获得可见的语法高亮，且与 Cone Scroll 的明暗主题配色协调。
- 生成 `docs/test-report.md`、`docs/review-code.md`、`docs/report-walkthrough.md`、`docs/pr-body.md`。

## 假设

- 本轮问题可以通过主题模板/脚本/样式收口解决，不需要改 Markdown 内容结构或引入新依赖包。
- `content/blog/markdown-render-showcase.md` 已足够覆盖列表、任务列表与代码块等回归 surface，无需新增专用文章。
- highlight.js 继续作为现有代码块高亮方案；本轮优先修复初始化与样式，而不是更换整套高亮栈。

## 约束

- `plan.md` 保持摘要级任务契约，不展开成 mini-RFC；本轮按 Low risk 走 design-lite。
- 仅收口 Markdown 内容区 render，不顺手改 header / footer / post-list / 列表页索引组件等无关 surface。
- 无序列表 marker 固定采用用户指定的 `»`；有序列表 marker 由主题统一安排，但需 quiet、清楚。
- 代码块高亮方案需兼容当前主题切换，不引入高噪声默认主题皮肤。

## 风险/规模分级

- **风险等级**: Low
- **规模**: 非 Epic
- **标签**: 无（非 `continue` / `plan-only` / `rfc:heavy` / `risk:high`）
- **理由**: 本轮只涉及主题样式与脚本层的局部渲染修复，不改内容模型、路由或外部接口，回滚成本低，适合 design-lite 快速收口。

## 要点

- 本轮以 Markdown showcase 文章与首页正文为回归样本，优先修复 reader-facing 的列表与代码块可读性问题。
- 无序列表 marker 按用户要求采用 `»`；有序列表 marker 保持 quiet 风格但必须清楚。
- 语法高亮优先修复现有 highlight.js 链路，并用本地主题色收口 token 颜色，避免与 light/dark toggle 打架。

## 范围

- `themes/cone-scroll/static/css/style.css`
- `themes/cone-scroll/static/js/script.js`
- `themes/cone-scroll/templates/head.html`
- `.legion/tasks/cone-scroll-markdown-render-fixes/**`
- `.legion/playbook.md`

## Design Index

- design-lite: `.legion/tasks/cone-scroll-markdown-render-fixes/docs/design-lite.md`
- 回归样本: `content/blog/markdown-render-showcase.md`
- 受影响模板入口: `themes/cone-scroll/templates/head.html`

## 阶段概览

1. **阶段 1 - 契约与设计** - 2 个任务
2. **阶段 2 - 实现** - 3 个任务
3. **阶段 3 - 验证与交付** - 2 个任务

## 阶段地图

1. 契约与设计：明确列表/任务列表/代码高亮的目标样式与技术路径。
2. 实现：补回 Markdown 内容区列表 marker、修复任务列表状态样式、收口 highlight.js 初始化与 token 配色。
3. 验证与交付：基于 showcase 文章做构建验证、代码评审、walkthrough 与 PR body。

---

*创建于: 2026-03-18 | 最后更新: 2026-03-18*
