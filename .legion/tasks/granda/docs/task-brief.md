# Task Brief

## Task

- taskId: `granda`
- tags: `continue`
- risk: `Medium`
- epic: `false`

## 问题定义

当前 Granda 主题已经经过多轮微调，最近一次“无 TOC 页面重心迁移”实验虽然在意图上试图改善平衡感，但实际观感不如前一版自然。当前需要撤销这一实验分支，恢复之前更克制的构图，并保持 RFC / playbook 与当前实现一致。

## 本轮产出

- 撤销本轮“无 TOC 页面重心迁移”相关的 RFC / playbook 规则。
- 回退模板与 CSS 中本轮重心实验引入的布局变化，恢复到更自然的前一版构图。
- 重新验证首页、列表页和文章页，确认回退后观感恢复且未破坏既有主题结果。
- 更新测试、评审、walkthrough 与 PR 文案产物。

## 验收标准

1. `docs/rfc.md` 不再要求无 TOC 页面进行本轮被否决的重心迁移。
2. `review-rfc.md` 无阻塞问题，确认文档门禁与当前实现重新一致。
3. 首页、archive/tag list、无 TOC 的普通页面回到前一版更自然的构图。
4. 有 TOC 页面继续保留当前左 rail + 右正文的非对称结构，不被这轮回退破坏。
5. `zola build` 通过，且 Playwright 截图能证明回退后的观感恢复正常。
6. `report-walkthrough.md` 与 `pr-body.md` 已更新，可直接用于审阅。

## 假设

- 当前 warm paper/ink 配色、ASCII logo、短 rule 和列表语法继续作为既定基线。
- 本轮目标是撤销一个失败的布局实验，而不是继续推进新的版心设计。

## 风险评估

这是 `Medium` 风险任务，因为它需要同时回退代码与设计门禁。如果只回退其中一侧，就会造成 RFC / playbook 与实际 UI 不一致；如果回退不干净，也可能破坏当前已经建立的 notebook/index 气质。

## 验证计划

- 更新 `docs/rfc.md` 与 `.legion/playbook.md`，再运行/更新 `review-rfc.md`。
- 回退模板与 CSS 后运行 `zola build`。
- 使用 Playwright 复查至少这些 surface：
  - 首页 desktop
  - 首页 mobile
  - blog list desktop
  - 一个无 TOC 的普通 page desktop（如 `/about`）
- 更新 `review-code.md`、`test-report.md`、`report-walkthrough.md` 与 `pr-body.md`。
