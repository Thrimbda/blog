# cone-scroll-markdown-render-fixes - 上下文

## 会话进展 (2026-03-18)

### ✅ 已完成

- 补全 `plan.md`：写清问题定义、验收、假设、约束、Low 风险判断、范围与设计索引。
- 新增 `docs/design-lite.md`，明确列表 marker、任务列表与代码高亮的修复策略。
- 实现 `.page-article` 内的列表 marker：无序列表使用 `»`，有序列表改为 quiet 的自定义数字 marker。
- 为 Markdown 任务列表补齐 checkbox 对齐与状态样式，并退出普通列表 marker。
- 将 highlight.js 初始化收口到 `script.js`，并在 `style.css` 中补本地 light/dark token 配色。
- 修复 defer 脚本下的 DOM ready 时序，避免 highlight.js 首屏漏初始化。
- 刷新 `docs/test-report.md`、`docs/review-code.md`、`docs/report-walkthrough.md` 与 `docs/pr-body.md`，完成验证与交付材料。
- 将“reset 后要在正文作用域内补回列表 marker”和“第三方高亮库不要在 head 里立即初始化”的经验沉淀到 `.legion/playbook.md`。
- 建立基于临时工作区的本地预览链路：复制仓库到受控临时目录，执行 `node scripts/zola-i18n.ts sync` 后再用 `zola build --base-url http://127.0.0.1:4174 --output-dir <site>` 生成真正引用本地 CSS/JS 的验收产物。
- 使用 Playwright CLI 运行 `playwright-check.spec.cjs`，完成首页、/blog/、/about/、/diary/、/tags/、`/blog/markdown-render-showcase/`（light + dark）的浏览器级验收，结果 PASS。
- 刷新 `docs/test-report.md`、`docs/report-walkthrough.md` 与 `docs/pr-body.md`，把本地 preview 构建链路、Playwright CLI 页面覆盖与截图证据写回任务文档。
- 完成 `tasks.md` 中的 Playwright 浏览器级验收勾选，收口本轮新增验收要求。
- 扩展正文列表作用域：`themes/cone-scroll/static/css/style.css` 现在让首页 `.home-copy` 与文章页 `.page-article` 共享同一套有序/无序列表 marker 规则。
- 更新 `playwright-check.spec.cjs`，补上首页 `.home-intro ol` 与 `.home-secondary ul` 的浏览器断言，并在本地 preview 上复跑 PASS。


### 🟡 进行中

(暂无)


### ⚠️ 阻塞/待定

(暂无)


---

## 关键文件

- `themes/cone-scroll/static/css/style.css`：正文列表 marker、任务列表 checkbox 与 `.hljs` token 配色的主要落点。
- `themes/cone-scroll/static/js/script.js`：任务列表识别、highlight.js 初始化与 DOM ready 时序修复。
- `themes/cone-scroll/templates/head.html`：保留 highlight.js CDN 引入链路。
- `.legion/tasks/cone-scroll-markdown-render-fixes/docs/test-report.md`：记录 `node --check` 与 `node scripts/zola-i18n.ts build` 通过。
- `.legion/tasks/cone-scroll-markdown-render-fixes/docs/review-code.md`：代码评审 PASS，剩余项仅为非阻塞建议。
- `.legion/tasks/cone-scroll-markdown-render-fixes/docs/pr-body.md`：可直接作为 PR 描述使用。
- `.legion/playbook.md`：新增 reset/list marker 与第三方高亮初始化的可复用踩坑记录。

---

## 关键决策

| 决策 | 原因 | 替代方案 | 日期 |
|------|------|----------|------|
| 代码块高亮继续沿用 highlight.js，而不是切换到 Zola 内建高亮。 | 当前站点使用基于 `data-theme` 的手动 light/dark toggle；沿用 highlight.js 并补本地 token 配色，更容易与现有主题切换保持一致。 | 切换到 Zola 内建高亮；但 dual theme 输出更依赖系统配色或额外 CSS 链路，和当前主题切换模型的耦合更复杂。 | 2026-03-18 |
| 列表 marker 只在 `.page-article` 作用域内补回，并对任务列表单独退出普通 marker。 | 需要恢复文章正文的阅读引导，同时避免误伤 nav / TOC / post list；任务列表则应以 checkbox 状态为主，而不是混入 `»`。 | 在全局 `ul/ol` 上直接恢复 marker；或继续依赖浏览器默认 marker。 | 2026-03-18 |
| `script.js` 在 `loading` / `interactive` 阶段统一等待 `DOMContentLoaded` 后再初始化交互。 | 主题脚本位于其他 defer 第三方库之前，若在 `interactive` 阶段立即执行会有 highlight.js 首屏漏初始化风险。 | 保持原有 `loading` 分支；或在 head 中内联立即调用高亮初始化。 | 2026-03-18 |
| 浏览器级验收不再直接使用仓库已有 `public/` 目录，而是基于临时工作区重新 `sync + zola build --base-url http://127.0.0.1:4174` 生成本地预览后再跑 Playwright。 | 仓库现有 `public/` 产物会把主题 CSS/JS 指向线上绝对地址，无法可靠反映本地最新 theme 改动；用本地 base_url 重建后，Playwright 才能验证真实的本地 asset 行为。 | 继续用 `python3 -m http.server public` 直接验收；但该方式会把关键 CSS/JS 解析到线上资源，只适合静态浏览，不适合作为本轮最终浏览器验收基线。 | 2026-03-18 |
| 首页 Markdown 列表不单独再做一套样式，而是让 `.home-copy` 复用文章页正文列表的同一套 marker 规则。 | 问题根因不是首页需要不同视觉，而是正文列表作用域只覆盖了 `.page-article`；复用同一套正文规则能修复首页回归，同时避免复制维护两套几乎相同的列表逻辑。 | 为首页单独写一套 list-style/marker 规则；或恢复浏览器默认 marker。前者会形成重复维护，后者则无法与文章页的 `»` / quiet 数字 marker 保持一致。 | 2026-03-18 |

---

## 快速交接

**下次继续从这里开始：**

1. 如需再增强置信度，可补一轮移动端 Playwright 截图，重点看首页 `.home-copy` 的列表缩进。
2. 若后续有新的 Markdown 内容容器出现，应直接复用 `.page-article` / `.home-copy` 这套正文列表作用域，而不是继续复制样式。
3. 当前修复已通过 Playwright 复验，可继续等待 reviewer 或后续合并。

**注意事项：**

- 本轮没有新增 JS 逻辑，只调整了 CSS 作用域与浏览器断言。
- 首页列表问题的根因已记录到 playbook：正文列表规则不要只绑定 `.page-article`。

---

*最后更新: 2026-03-18 22:36 by Claude*
