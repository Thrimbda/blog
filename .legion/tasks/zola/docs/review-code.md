# 代码审查报告

## 结论

PASS

当前版本已消除上轮 major：`content/blog/_index.{en-US,ja-JP,es-ES,de-DE}.md` 中的标签链接已改为 `../tags`，不会再把非默认语言用户串回默认语言。结合已知信息，`zola build` 已通过，主题层语言切换、Zola 多语言配置与同步脚本的主路径行为均与 RFC 预期一致。

## 阻塞问题

- [ ] 无

## Major 发现

- [ ] 无

## 建议（非阻塞）

- `content/diary/diary-2026.md:8` 及对应多语言 diary 文件 - 剩余 18 个 broken anchor warning 既然已确认都来自 translated diary 的 `#org...` 锚点缺失，就更适合作为已知内容质量问题记录，不建议作为本轮阻塞项。理由是：构建已成功，问题集中、可解释，且更像 link checker 无法识别这类 HTML anchor / 目录产物，而不是用户可感知的站点路由或模板逻辑错误。

- `scripts/sync-zola-i18n.ts:291` - 当前脚本维护成本总体可接受。路径安全、幂等写入、受管文件清理、front matter 最小规范化都清晰；新增对 `blog/_index.*.md` 的 `(/tags) -> (../tags)` 改写虽然是特例规则，但边界明确、影响面小，短期内可以接受。

- `scripts/sync-zola-i18n.ts:308` - 删除策略仍然是“所有受管语言后缀文件均视为脚本产物”，这和 RFC 假设一致，当前不构成缺陷；但建议继续把这条边界保留在任务文档或脚本说明里，避免未来有人误把手写非默认语言页放进同一命名空间。

## 修复指导

1. 对 18 个 anchor warning，不必回退本轮实现；把它们登记为已知内容质量问题即可。
2. 后续若要清 warning，优先处理 diary 内容生成方式：尽量改为 Zola/link checker 可识别的原生标题锚点，而不是 `#org...` 目录锚点。
3. 保持 `scripts/sync-zola-i18n.ts` 的“固定白名单语言 + 固定受管后缀”策略，不建议在本轮再扩展复杂抽象；若未来出现手写非默认语言页需求，再引入 manifest 或额外受管边界。

## 后续可收敛点

- 给同步脚本补最小样例回归，覆盖 front matter 规范化、删除策略和 blog index 链接改写。
- 若希望 CI 更干净，可单独开一轮清理 translated diary 的 `#org...` 目录锚点 warning。
- 可在 review/test 流程中增加语言列表一致性检查，避免 `managedLanguages`、`config.toml` 与语言下拉漂移。

[Handoff]
summary:
  - 结论更新为 PASS。
  - 当前无 blocking / major 问题。
  - 18 个 broken anchor warning 可作为已知内容质量问题记录，不阻塞本轮交付。
decisions:
  - `scripts/sync-zola-i18n.ts` 的当前维护成本与边界可接受，暂不要求进一步抽象。
risks:
  - translated diary 的 `#org...` anchor warning 仍会持续给 CI 带来噪音。
  - 脚本仍按语言后缀全量接管，未来若引入手写非默认语言页需先调整边界策略。
files_touched:
  - path: /Users/c1/Work/blog/.legion/tasks/zola/docs/review-code.md
commands:
  - (none)
next:
  - 将 18 个 broken anchor warning 记录为已知问题，避免和代码正确性阻塞项混淆。
  - 若要继续打磨质量，可单开任务清理 translated diary 锚点与脚本回归样例。
open_questions:
  - (none)
