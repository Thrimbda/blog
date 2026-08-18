# 接入 Microsoft Clarity 分析

## 目标

为主站接入 Microsoft Clarity 会话回放与热力图分析，与现有 Google Analytics 并存。

## 问题定义

- 站点当前只有 Google Analytics（`config.extra.google_analytics`），缺少会话回放 / 点击热力图等可视化分析能力。
- 用户已提供 Clarity 项目 ID `vg7b9rsa98`，需要把官方 tracking snippet 接入主题 `<head>`，并按站点既有约定（`config.extra.*` 开关 + 模板条件块）落地。

## 验收标准

- `config.toml` 的 `[extra]` 新增 `clarity = "vg7b9rsa98"`。
- 主题 `head.html` 新增 Clarity 条件块，仅在 `config.extra.clarity` 存在时输出官方 snippet，且项目 ID 由配置注入而非硬编码。
- `zola build` 构建通过，生成的页面 `<head>` 中包含指向 `https://www.clarity.ms/tag/vg7b9rsa98` 的脚本。
- 生成 `docs/test-report.md` 与 `docs/pr-body.md`。

## 假设

- Clarity snippet 与 Google Analytics 脚本同处 `<head>`、均采用 `async` 加载，互不冲突。
- 保持 snippet 原样（官方 IIFE），只把项目 ID 参数化为模板变量。

## 约束

- 只改 `config.toml` 与 `themes/cone-scroll/templates/head.html`，不触碰其他 surface。
- 不引入新依赖；不调整内容、样式或脚本加载顺序。

## 风险/规模分级

- **风险等级**: Low
- **规模**: 非 Epic
- **标签**: 无（非 `continue` / `plan-only` / `rfc:heavy` / `risk:high`）
- **理由**: 单点模板 + 单行配置增量，回滚成本低，走 design-lite 快速收口。

## 要点

- 与 Google Analytics 块并列，新增 `<!-- Microsoft Clarity -->` 条件块。
- 项目 ID 走 `{{ config.extra.clarity }}`，与既有 `google_analytics` 配置模式一致。

## 范围

- `config.toml`
- `themes/cone-scroll/templates/head.html`
- `.legion/tasks/clarity-analytics/**`

## Design Index

- design-lite: 本文件即摘要级契约，不单列 rfc。
- 受影响模板入口: `themes/cone-scroll/templates/head.html`

## 阶段概览

1. **阶段 1 - 实现** - 1 个任务
2. **阶段 2 - 验证与交付** - 2 个任务

---

*创建于: 2026-08-18*
