# Walkthrough：Cone Scroll Markdown 渲染修复

## 目标与范围

- 目标：修复 Cone Scroll 主题 Markdown 内容区中的列表、任务列表与代码块高亮渲染问题，覆盖文章页与首页正文，主要回归样本为 `content/blog/markdown-render-showcase.md`。
- 范围绑定本任务 scope：
  - `themes/cone-scroll/static/css/style.css`
  - `themes/cone-scroll/static/js/script.js`
  - `themes/cone-scroll/templates/head.html`
  - `docs/test-report.md`
  - `docs/review-code.md`
- 本轮仅收口正文渲染，不扩散到 header、post list、TOC rail 等其他 surface。

## 设计摘要

- 设计依据见 [plan](../plan.md) 与 [design-lite](./design-lite.md)。
- 列表规则收口到 Markdown 内容区：文章页 `.page-article` 与首页 `.home-copy` 共享同一套正文列表 marker 规则，避免误伤全站其他列表。
- 无序列表明确使用 `»` 作为 marker；有序列表恢复 quiet 的数字 marker，保持可读但不过度抢眼。
- 任务列表显式退出普通列表 marker，修复 checkbox 与文本对齐。
- 代码块高亮继续沿用 highlight.js，不更换高亮栈；本轮重点修复初始化时序与 token 配色链路。

## 改动清单

### 1. `themes/cone-scroll/static/css/style.css`

- 在 `.page-article` 与首页 `.home-copy` 下重建 `ul/ol/li` 规则，避免 `reset.css` 后 Markdown 正文列表失去稳定 marker。
- 无序列表通过伪元素恢复 marker，统一输出 `»`。
- 有序列表恢复 quiet 数字 marker，使用自定义计数器、字宽与间距控制，保证数字清楚但视觉安静。
- 任务列表通过 `.is-task-list` / `.is-task-item` 退出普通 marker，并修复 checkbox 尺寸、边距、accent color、disabled 状态与文本对齐。
- 为 `.hljs` 及常见 `.hljs-*` token 提供本地 light/dark 配色，补回代码块语义高亮。

### 2. `themes/cone-scroll/static/js/script.js`

- 增加 Markdown 任务列表初始化：识别文章正文中的 checkbox 列表项，为父列表和列表项补类名，驱动专用样式生效。
- 将代码高亮初始化收口到交互初始化流程中，针对 `.page-article pre code` 调用 `hljs.highlightElement(...)`。
- 跳过 mermaid 等非普通代码块，避免误高亮。
- 修复初始化时序：在 DOM ready 后统一执行交互初始化，避免 highlight.js 尚未加载完成时提前运行。

### 3. `themes/cone-scroll/templates/head.html`

- 保持 highlight.js CDN 引入方案与 `defer` 资源加载链路，作为本轮“沿用 highlight.js”方案的模板入口。
- 不新增高亮依赖、不切换到其他高亮方案，确保改动集中在现有链路修复。

### 4. 验证与审查产物

- [test-report](./test-report.md)：记录自动验证命令、结果与未覆盖项。
- [review-code](./review-code.md)：记录代码审查结论、剩余非阻塞建议与后续增强方向。
- `playwright-check.spec.cjs` / `playwright-diagnose.cjs`：记录本轮浏览器级验收与本地 preview 诊断逻辑。
- `playwright-*.png`：首页、Blog、About、Diary、Tags 与 Markdown showcase（light/dark）的验收截图。

## 如何验证

详见 [test-report](./test-report.md)。本轮自动验证与 Playwright 浏览器验收已通过，建议 reviewer 至少关注以下检查点：

1. `node --check themes/cone-scroll/static/js/script.js`
   - 预期：PASS；确认脚本无语法错误。
2. `node scripts/zola-i18n.ts build`
   - 预期：PASS；站点成功构建，回归样本页面正常生成。
3. 在临时工作区执行 `node scripts/zola-i18n.ts sync && zola build --force --base-url "http://127.0.0.1:4174" --output-dir <temp-site>`
   - 预期：生成真正引用本地 CSS/JS 的预览产物，而不是继续复用仓库现有 `public/`。
4. 启动 `python3 -m http.server 4174 --bind 127.0.0.1 --directory <temp-site>` 后，执行：
   - `node .legion/tasks/cone-scroll-markdown-render-fixes/docs/playwright-diagnose.cjs`
   - `".legion/tasks/cone-scroll-markdown-render-fixes/docs/node_modules/.bin/playwright" test ".legion/tasks/cone-scroll-markdown-render-fixes/docs/playwright-check.spec.cjs" --reporter=line`
   - 预期：至少 5 个页面通过浏览器级验收；首页 Markdown 列表与 showcase 页面在 light/dark 下都能看到正确的列表 marker、任务列表与代码高亮。

补充说明：本轮已完成真实浏览器验收；若还需要人工补看，只需打开生成的 Playwright 截图，不再依赖聊天中的旧截图结论。

## 风险与回滚

### 风险

- 当前任务列表识别策略是“父列表中出现任务项即整体标记为 task list”，在未来混合列表场景下，普通项 marker 可能受到影响。
- `matchMedia(...).addEventListener("change", ...)` 仍存在旧版 Safari 兼容性风险，但不构成本轮阻塞。
- 浏览器验收已覆盖桌面端关键页面，但仍未覆盖移动端截图与跨浏览器差异。
- 正文列表规则目前已覆盖文章页与首页 `.home-copy`，但若后续新增其他 Markdown 内容容器，仍需要显式纳入同一套正文作用域。

### 回滚

- 样式问题可优先回滚 `style.css` 中 `.page-article` 列表、任务列表和 `.hljs` token 配色相关片段。
- 若高亮初始化出现回归，可回滚 `script.js` 中 `initCodeHighlighting()` 与 DOM ready 收口逻辑。
- 由于未引入新依赖、未改内容模型，回滚成本较低，影响面主要局限于文章页 Markdown 渲染。

## 未决项与下一步

- 如需进一步增强置信度，可补一轮移动端 Playwright 截图或 Safari/Firefox spot check。
- 若后续新增新的 Markdown 内容容器，优先复用现有正文列表作用域，而不是再单独复制一套列表规则。
- 如后续出现混合任务列表需求，建议把 `is-task-list` 判定收紧为“直接子项全部为任务项”再整体加类。
- 若产品兼容目标覆盖旧版 Safari，可为 `matchMedia` 监听补 `addListener` fallback。
