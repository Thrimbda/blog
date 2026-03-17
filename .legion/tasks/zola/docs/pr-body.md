## What

- 将语言切换从 `<select>` + JS 收口为 `details + a` 的原生 reader-facing 链接入口，减少脚本时序对点击跳转的影响。
- 修正默认语言 page/section 的目标链接匹配，使非默认语言页能稳定回到对应中文 page/section。
- taxonomy term 页改为 best-effort term 保留：优先按 `slug` / `name` 匹配，无法可靠推断跨语言 tag 语义时回退到目标语言 `tags` 列表页；同时移除公开页面中的 `[编辑]` / `/admin` 入口及相关样式、翻译残留。

## Why

- 线上反馈表明旧的 `<select>` + JS 语言切换在真实点击路径上仍不稳定，reader-facing 导航需要更确定的 HTML 优先方案。
- 默认语言 page/section 回跳不精确会破坏多语言阅读连续性，而 taxonomy term 又缺少可靠的跨语言语义映射，需要明确的降级边界。
- 公开站点继续暴露 `[编辑]` / `/admin` 会泄露作者操作痕迹，不符合本轮体验收口目标。

## How

- 在 `themes/cone-scroll/` 中用 `details + a` 重写语言入口，直接输出各语言目标链接，并保留 page/section 精确切换逻辑。
- 对 taxonomy term 切换采用“先保留、再回退”的 best-effort 策略：先按 `slug` / `name` 找目标 term，失败则统一落到目标语言 `tags` 列表页。
- 在 `config.toml` 与主题模板/CSS 中同步清理 `[编辑]` / `/admin` 及对应翻译、样式残留，确保公开构建产物不再暴露后台入口。

## Testing

- `node scripts/zola-i18n.ts build`
  - 成功；生成 `280` 个页面、`14` 个 section。
  - 已知仍有 `18` 个既有 `diary-2026` 多语言 broken anchor warning，非本次阻塞。
- Spot check：`public/en-US/blog/chu-tan-bing-fa/index.html`、`public/en-US/diary/diary-2020/index.html`、`public/en-US/blog/index.html`、`public/en-US/tags/index.html`、`public/en-US/tags/reflection/index.html`、`public/en-US/tags/mapreduce/index.html`
  - 结果符合 page/section 精确切换、taxonomy list 稳定入口与 taxonomy term best-effort 回退预期。
- `public/` 全量检索未发现旧 `<select>` / `onchange=` / `[编辑]` / `/admin` 残留。
- 测试报告：`/Users/c1/Work/blog/.legion/tasks/zola/docs/test-report.md`
- 代码评审：PASS - `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-code.md`
- 安全评审：PASS - `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-security.md`

## Risk / Rollback

- 风险：taxonomy term 跨语言保留仍是 best-effort；若不同语言 tag 命名不一致，切换会回退到列表页而非 term 详情页。
- 风险：桌面端语言面板在较窄视口下仍可能有溢出风险，但不阻塞当前发布。
- 回滚：回退 `themes/cone-scroll/` 的语言入口与公开模板清理、回退 `config.toml` 的相关翻译变更后重新构建即可恢复旧行为。

## Links

- Plan: `/Users/c1/Work/blog/.legion/tasks/zola/plan.md`
- RFC: `/Users/c1/Work/blog/.legion/tasks/zola/docs/rfc.md`
- Code Review: `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-code.md`
- Security Review: `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-security.md`
- Walkthrough: `/Users/c1/Work/blog/.legion/tasks/zola/docs/report-walkthrough.md`
