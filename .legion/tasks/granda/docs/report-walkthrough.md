# Walkthrough: granda critique-priority implementation pass

## 目标与范围

- 本轮是一次实现收口，目标是按 critique 的优先级顺序，先落地最高杠杆的问题修复，而不是继续发散式微调。
- 范围绑定 `/.legion/tasks/granda/docs/rfc.md` 中已固化的门禁，重点覆盖首页层级、About 编辑式节奏、文本化 `theme toggle`、TOC/meta 可用性，以及暗色模式的暖度与材料感。
- 相关 reviewer-facing 产物包括 `/.legion/tasks/granda/docs/review-rfc.md`、`/.legion/tasks/granda/docs/review-code.md` 与本轮 Playwright 截图。

## 设计摘要

- 设计依据见 `/.legion/tasks/granda/docs/rfc.md`。本轮不是另起新方向，而是严格按 critique priority order 实施最高收益修复。
- RFC 最终版的 4.5 节已从 advisory 升级为可执行 gate：每个优先级都明确了目标、允许动作、禁止动作与证据要求，可直接用于 reviewer 判定。
- 因此，这次实现不是“凭感觉润色”，而是把 `Priority 1 -> 5` 逐项落到代码与截图证据上，确保最终观感、规则和验证口径一致。

## 改动清单

- 首页层级
  - 强化 `自我介绍 -> recent posts -> 其他补充` 的阅读顺序，提升首页主次关系与首屏抓手。

- About 页面节奏
  - 为长文本页补足编辑式呼吸点，让内容从均质文字墙回到更可读的段落节奏。

- Header / theme toggle
  - 将 `theme toggle` 收成更文本化、与 nav 同语言的 affordance，同时保持可发现性。

- 文章页 TOC / meta
  - 继续保持次级声量，但提升 TOC 与元数据的抓手和扫读效率，避免“太轻以至于不好用”。

- 暗色模式
  - 调整暗色 token 与表面关系，使其保留 warm paper/ink 的材料感，而不是滑回纯黑终端博客观感。

- Reviewer-facing docs
  - `/.legion/tasks/granda/docs/rfc.md` 已吸收 critique priorities，并在 4.5 节提供可执行 gate。
  - `/.legion/tasks/granda/docs/review-rfc.md`、`/.legion/tasks/granda/docs/review-code.md` 均为 PASS，说明文档门禁与实现状态已对齐。

## 如何验证

- 构建验证：`zola build`
  - 预期：PASS；站点可正常生成，无模板或样式回归。

- 截图复查：
  - `playwright-home-desktop.png`
  - `playwright-home-mobile.png`
  - `playwright-about-desktop.png`
  - `playwright-article-desktop.png`
  - `playwright-article-mobile.png`
  - `playwright-home-dark.png`
  - `playwright-article-dark.png`
  - 预期：首页层级更明确；About 节奏更有呼吸；`theme toggle` 文本化但可识别；TOC/meta 轻但可抓住；暗色模式保留暖纸材料感。

- Review 结果：
  - `/.legion/tasks/granda/docs/review-rfc.md` PASS
  - `/.legion/tasks/granda/docs/review-code.md` PASS
  - `review-security` 产物不存在，原因是本轮未引入新的安全面变更。

## 风险与回滚

- 主要风险是后续维护时只保留“变好看了”的印象，却忽略这些改动是按 critique 优先级和 RFC gate 收口出来的；这样容易再次发生设计漂移。
- 当前风险可控，因为优先级、允许/禁止动作与证据要求已经落进 `/.legion/tasks/granda/docs/rfc.md:244` 所在的 4.5 节，并有截图和 review 共同支撑。
- 如需回滚，应优先按 surface 回退本轮对应实现，并继续以 RFC 4.5 和相关截图为准，不要回到 advisory-only 的松散审美判断。

## 未决项与下一步

- 当前无阻塞未决项；本轮 reviewer-facing 结论可直接用于 PR 与合并评审。
- 后续若继续打磨，应保持同一优先级顺序，只处理剩余低风险细节，不另开新视觉方向。
