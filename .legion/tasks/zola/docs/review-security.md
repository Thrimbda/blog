# 安全审查报告

## 结论
PASS

本次公开站点 UI 收口改动整体风险较低，当前未发现阻塞发布的安全问题。重点关注的 reader-facing 链接、后台入口暴露面、开放重定向与越权残留路径均已明显收敛：语言切换已从脚本驱动跳转改为模板内真实链接，公开模板范围内未再发现 `[编辑]` 或 `/admin` 入口残留，默认行为也符合 secure-by-default。

## 阻塞问题
- [ ] 无

## 建议（非阻塞）
- `[STRIDE:Tampering/Elevation of Privilege]` `themes/cone-scroll/templates/partials/language-switch.html:9` - 当前语言切换链接来源于 `get_url(...)`、`page.translations` 与 `section.translations`，按现状属于站点内部已生成 permalink，未见开放重定向入口。建议后续补一个轻量模板/构建校验，约束 `language_options` 只能映射到站内语言白名单，防止未来有人把该入口演进成可配置外链。
- `[STRIDE:Repudiation/Denial of Service]` `config.toml:226` - 语言列表与模板 fallback 路径目前靠人工保持一致；若后续语言配置漂移，最可能出现的是跳到错误落点或局部 404，而不是直接安全漏洞。建议在 CI 增加一致性检查，校验 `default_language`、`[languages.*]`、`language_options` 与主题导航逻辑同步，避免 reader-facing 链接 silently degrade。
- `[STRIDE:Information Disclosure]` `themes/cone-scroll/templates/head.html:100` - 主题仍依赖多处第三方脚本/CDN（如 `highlight.js`、`mermaid`、`embla`、`giscus`、`gtag`），本次改动未扩大该暴露面，但从依赖风险视角看仍是公开页面的长期供应链面。建议后续评估固定版本、SRI 或自托管策略，并监控前端脚本加载失败/异常上报。
- `[STRIDE:Repudiation]` `themes/cone-scroll/templates/header.html:22` - 公开模板里已移除后台入口，方向正确。建议补一个极轻量静态检查，防止 `/admin`、`[编辑]`、`edit` 链接在后续模板改动中重新进入公开页面。

## 修复指导
1. 保持 `themes/cone-scroll/templates/partials/language-switch.html` 只输出站内生成链接，不要引入 query 参数拼接、前端 `location=` 跳转或可配置外部目标。
2. 在 CI 增加一条低成本检查：枚举 `config.toml` 中语言配置与 `themes/cone-scroll/templates/partials/language-switch.html` 的输出目标，确保所有语言入口都落在本站域名和已知语言路径内。
3. 增加模板级回归检查，阻止 `/admin`、`edit`、`[编辑]` 重新暴露到 reader-facing 页面。
4. 将第三方前端依赖纳入常规版本审计与异常监控，降低公开页供应链风险。

[Handoff]
summary:
  - 本次 UI 收口安全结论为 PASS，无 blocking 问题。
  - 语言切换改为真实链接后，当前未见开放重定向或脚本时序导致的跳转风险。
  - 公开模板范围内未发现 `[编辑]` / `/admin` 入口残留，默认暴露面已收紧。
decisions:
  - (none)
risks:
  - 语言配置与模板 fallback 逻辑若未来漂移，可能带来错误落点或 404，需用 CI 守护。
  - 公开页第三方脚本/CDN 仍是长期供应链暴露面，但非本次改动新增。
files_touched:
  - path: /Users/c1/Work/blog/.legion/tasks/zola/docs/review-security.md
commands:
  - (none)
next:
  - 给语言入口和后台入口残留补静态/CI 守护。
  - 后续单开任务处理第三方脚本供应链加固。
open_questions:
  - (none)
