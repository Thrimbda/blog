# What

本 PR 通过 CSS 局部收口，把 Czon 文章页的正文宽度与 TOC 结构感尽量拉回主站 Granda 基线。
改动只落在允许 scope：`/Users/c1/Work/blog/.czon/style.css` 与 `/Users/c1/Work/blog/.legion/playbook.md`。
这是一次可回滚的样式调整，不涉及模板协议、数据、依赖或运行时逻辑。

# Why

当前 Czon 文章页在桌面端仍被外层 `lg:pl-88 xl:pr-88` 与内容宽度共同挤窄，正文读感偏成细柱。
同时，TOC 虽已在左侧，但仍带默认 sidebar/widget 的组件感，和主站更轻的左 rail 语气不一致。
本轮目标是在不越界到模板层的前提下，先把这两个视觉偏差收口。

# How

- 在 article-only 作用域内新增 CSS 变量与结构规则，避免影响首页、列表页和 About。
- 清掉桌面文章壳层残留的侧向 padding，把正文阅读列收口到更接近主站的 `70ch`。
- 将 TOC 调整为更轻的左 rail，并在 `/Users/c1/Work/blog/.legion/playbook.md` 补充这次发现的壳层 padding pitfall。
- limitation：当前 article-only 识别依赖 `:has(> aside.sidebar-right)`，属于 CSS 近似，不是模板级稳定语义标记；TOC 水平定位仍有 non-blocking magic number。

# Testing

- PASS：`/Users/c1/Work/blog/.legion/tasks/czon/docs/test-report.md`
- 已覆盖静态结构校验与 `npx czon@latest build --lang en-US` 构建成功验证。
- 未覆盖浏览器截图 / 像素级视觉回归；原因是本轮以低成本结构验证和构建验证为主。

# Risk / Rollback

- 风险低：本次仅为 CSS 可回滚收口，主要风险来自选择器对现有 article shell DOM 的依赖。
- 若后续 Czon 调整 `sidebar-right` 挂载点或文章层级，article-only 规则可能需要同步维护。
- 回滚可直接撤回 `/Users/c1/Work/blog/.czon/style.css` 与 `/Users/c1/Work/blog/.legion/playbook.md` 的本轮改动。

# Links

- Plan / Design-lite：`/Users/c1/Work/blog/.legion/tasks/czon/plan.md`
- Test Report：`/Users/c1/Work/blog/.legion/tasks/czon/docs/test-report.md`
- Code Review：`/Users/c1/Work/blog/.legion/tasks/czon/docs/review-code.md`
- Walkthrough：`/Users/c1/Work/blog/.legion/tasks/czon/docs/report-walkthrough.md`
