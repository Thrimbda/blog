# clarity-analytics - 过程日志

## 2026-08-18

- 建立任务契约（Low risk / design-lite，不进入 RFC）。
- 用户提供 Clarity 项目 ID `vg7b9rsa98`。
- 在 `.worktrees/clarity-analytics`（分支 `legion/clarity-analytics`）内实现。
- 实现：`config.toml` 新增 `clarity = "vg7b9rsa98"`；`head.html` 新增 Clarity 条件块。
- 验证：zola 0.21.0 build 通过（257 pages），生成页面 `<head>` 已注入 Clarity snippet，项目 ID 正确。
- 交付：待提交 / 推送 / PR。
