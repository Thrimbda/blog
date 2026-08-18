# PR Body — clarity-analytics

## 变更

为主站接入 Microsoft Clarity 分析，与现有 Google Analytics 并存。

- `config.toml`: `[extra]` 新增 `clarity = "vg7b9rsa98"`。
- `themes/cone-scroll/templates/head.html`: 新增 `<!-- Microsoft Clarity -->` 条件块，仅在配置存在时输出官方 snippet，项目 ID 由 `{{ config.extra.clarity }}` 注入。

## 验证

- `zola build`（0.21.0）构建通过，生成 257 页，无报错。
- 生成页面 `<head>` 包含 Clarity snippet，项目 ID 正确注入。

详见 `.legion/tasks/clarity-analytics/docs/test-report.md`。
