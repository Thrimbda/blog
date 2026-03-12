## What

本 PR 按 critique priority order 落地本轮最高杠杆修复，覆盖首页层级、About 编辑式节奏、文本化 `theme toggle`、TOC/meta 可用性，以及暗色模式材料感；同时将这些判断收束到最终 RFC。

## Why

此前 critique 已明确最值得先修的不是零散样式点，而是几处直接影响整体气质和可用性的高收益问题。本轮因此按优先级顺序实施，而不是继续做无约束微调。

## How

`/.legion/tasks/granda/docs/rfc.md` 最终版 4.5 已从 advisory 升级为可执行 gate，明确每项 priority 的 allowed / forbidden moves 与 evidence rules；实现侧据此完成对应 surface 的收口，并通过截图与 review 对齐结果。

## Testing

- `zola build` PASS
- Playwright 截图已复查：`playwright-home-desktop.png`、`playwright-home-mobile.png`、`playwright-about-desktop.png`、`playwright-article-desktop.png`、`playwright-article-mobile.png`、`playwright-home-dark.png`、`playwright-article-dark.png`
- `/.legion/tasks/granda/docs/review-rfc.md` PASS
- `/.legion/tasks/granda/docs/review-code.md` PASS
- Security review: N/A；本轮无新的安全面变更，也无 `review-security` 产物

## Risk / Rollback

风险主要在于后续 theme work 偏离本轮已固化的优先级门禁。若需回滚，按受影响 surface 回退实现，并继续以 RFC 4.5 与现有截图证据作为判断基线。

## Links

- RFC: `/.legion/tasks/granda/docs/rfc.md`
- RFC Review: `/.legion/tasks/granda/docs/review-rfc.md`
- Code Review: `/.legion/tasks/granda/docs/review-code.md`
- Walkthrough: `/.legion/tasks/granda/docs/report-walkthrough.md`
