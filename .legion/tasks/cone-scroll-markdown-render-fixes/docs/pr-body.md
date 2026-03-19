## What

- 修复 Cone Scroll 主题文章页的 Markdown 渲染问题，覆盖无序列表、有序列表、任务列表与代码块高亮四个 reader-facing surface。
- 无序列表统一恢复为 `»` marker；有序列表恢复 quiet 数字 marker；任务列表修复 checkbox 与文本对齐。
- 无序列表与有序列表现在共享一致的 marker 列宽与文本起始列，不再有明显的缩进节奏差异。
- `markdown-render-showcase.md` 现已补齐正文内的 1-6 级标题样本，后续可直接用它观察标题层级、TOC 与锚点表现。
- 代码块高亮继续沿用 highlight.js，但修复了初始化时序，并补齐 light/dark 下的 token 配色。

## Why

- 现有正文渲染受到 `reset.css` 与高亮链路不完整影响，列表 marker 不清楚、任务列表视觉不稳定、代码块几乎只剩统一底色。
- 这些问题直接影响文章阅读体验，而 `markdown-render-showcase.md` 已能稳定覆盖本轮回归面。
- 本轮在不更换高亮栈、不扩大改动面的前提下，把正文 Markdown 基础渲染一次收口。

## How

- 在 `style.css` 中把正文列表规则收口到 `.page-article` 与首页 `.home-copy`，为普通列表重建 marker，并修复首页 Markdown 列表在 `reset.css` 后仍缺 marker 的问题。
- 在 `style.css` 中统一无序/有序列表的 marker 列宽与对齐方式，避免读者感觉两类正文列表像用了两套不同缩进。
- 在 `script.js` 中识别 Markdown 任务列表、补类名，并把 highlight.js 初始化收口到 DOM ready 后执行。
- 保持 `head.html` 的 highlight.js 引入链路，沿用现有 CDN 方案，不新增依赖。

## Testing

- 自动验证：PASS，见 [test-report](./test-report.md)。
- 已执行：`node --check themes/cone-scroll/static/js/script.js`、`node scripts/zola-i18n.ts build`，以及基于本地 `--base-url` preview 的 Playwright CLI 浏览器验收。
- 已执行：`grep -n '^#{1,6} ' content/blog/markdown-render-showcase.md`，确认 showcase 源文件已覆盖 1-6 级标题样本。
- 浏览器验收：PASS，覆盖 `/`、`/blog/`、`/about/`、`/diary/`、`/tags/`、`/blog/markdown-render-showcase/`，并额外检查 showcase 的 dark theme。
- 浏览器验收额外确认：首页 `.home-intro` 的 Markdown 有序列表和 `.home-secondary` 的 Markdown 无序列表 marker 已恢复。
- 浏览器验收额外确认：首页有序/无序列表的 `padding-left` 与 marker 宽度一致。
- 验收证据：任务 docs 下的 `playwright-*.png` 截图，以及 [test-report](./test-report.md) 中记录的本地 preview 构建链路。

## Risk / Rollback

- 风险主要在文章页列表样式收口、任务列表混合场景、以及真实浏览器中的高亮视觉效果。
- 回滚可直接撤回 `style.css` 的列表/任务列表/`.hljs` 样式片段，以及 `script.js` 的任务列表初始化与高亮初始化逻辑。
- 未引入新依赖、未改动内容模型，回滚成本低。

## Links

- Plan: [../plan.md](../plan.md)
- Design Lite: [./design-lite.md](./design-lite.md)
- Review: [./review-code.md](./review-code.md)
- Walkthrough: [./report-walkthrough.md](./report-walkthrough.md)
