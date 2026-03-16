# 安全审查报告

## 结论
PASS

基于最新实现复审后，前一轮的两项主要顾虑已得到有效收敛：

- `themes/cone-scroll/templates/partials/language-switch.html` 已移除 `|safe`，降低了语言切换 URL 被错误当作已验证 HTML/URL 片段直接信任的风险。
- `themes/cone-scroll/static/js/script.js` 已在跳转前加入 same-origin 校验，当前语言切换链路不存在明显开放跳转路径。
- `scripts/sync-zola-i18n.ts` 已补充删除文件相对路径日志，在受管文件被清理时具备基本可追溯性。

结合现有实现，`scripts/sync-zola-i18n.ts` 的路径约束、删除边界与符号链接拒绝策略仍然稳健；`.czon/src` 到 `content/` 的同步不执行输入内容；主题层未见新增 XSS、开放跳转或越权路径。当前未发现 blocking 或 major 风险，剩余风险以供应链与持续加固项为主，属于当前发布上下文下可接受的 minor 风险。

## 阻塞问题
- [ ] 无

## Major 风险
- [ ] 无

## Minor 风险
- [ ] `[STRIDE:Elevation of Privilege/Denial of Service]` `.github/workflows/pages.yaml:32` `.github/workflows/pages.yaml:53` - 本次新增 `node scripts/sync-zola-i18n.ts` 本身风险较低，但 workflow 仍依赖未固定到 commit SHA 的 GitHub Action，以及 `npx czon@latest` 的浮动供应链；同时构建链路仍在具备 `pages:write` / `id-token:write` 的整体发布上下文中运行。若上游依赖或 action 被污染，影响面仍偏大。建议后续将 action 固定到 SHA、把 `czon` 固定到明确版本，并继续评估构建/部署权限拆分。

## 建议（非阻塞）
- 维持当前 `scripts/sync-zola-i18n.ts` 的固定语言白名单、`ensureWithin(...)` 与符号链接拒绝策略，不要演进为外部可配置的任意路径同步器。
- 将 `.czon/src` 继续视为受信任内容源；若未来引入更开放的协作来源，建议单独增加对原始 HTML、短代码和外链的内容审查门禁。
- 可补一个轻量一致性检查，确保 `managedLanguages`、`config.toml` 的语言注册和 `language_options` 长期不漂移。

## 修复指导
1. CI 加固时优先处理供应链：固定 `actions/checkout`、`actions/setup-node`、`taiki-e/install-action`、`actions/configure-pages`、`actions/upload-pages-artifact`、`actions/deploy-pages` 到 SHA。
2. 将 `npx czon@latest build` 改为固定版本调用，避免未来 silent upgrade。
3. 若要进一步收紧最小权限，把构建 job 与部署 job 的权限边界再拆细。

[Handoff]
summary:
  - 复审结论为 PASS。
  - 语言切换的 `|safe` 与开放跳转防护问题已修复。
  - 删除日志已补充，当前无 blocking / major 风险。
decisions:
  - (none)
risks:
  - workflow 仍存在浮动依赖与较宽部署权限带来的 residual supply-chain risk。
files_touched:
  - path: /Users/c1/Work/blog/.legion/tasks/zola/docs/review-security.md
commands:
  - (none)
next:
  - 后续单开任务收紧 CI 供应链与权限边界。
  - 维持当前同步脚本路径/删除边界设计，不再放宽为动态路径输入。
open_questions:
  - (none)
