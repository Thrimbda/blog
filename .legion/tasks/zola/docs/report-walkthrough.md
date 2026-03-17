# Zola 语言入口收口 walkthrough

## 目标与范围

- 本轮目标是在不扩大实现面前提下，完成 reader-facing 语言入口收口：把语言切换从 `<select>` + JS 改为原生 `details + a`，并移除公开页面中的后台痕迹。
- 本报告只覆盖本次交付范围内的两个模块：`config.toml` 与 `themes/cone-scroll/`。
- 与本轮验收直接相关的行为包括：page/section 精确切换、taxonomy term best-effort 保留、公开页 `[编辑]` / `/admin` 清理，以及多语言文案残留收口。

## 设计摘要

- 设计基线来自 RFC：`/Users/c1/Work/blog/.legion/tasks/zola/docs/rfc.md`。
- RFC 的核心方向仍然成立：页面有一手翻译元数据时做精确切换；没有可靠映射时回退到目标语言稳定入口，而不是在模板里继续堆叠脆弱的前端跳转逻辑。
- 本轮实际实现相较 RFC 的收敛点是进一步前移“可点击即跳转”的确定性：用真实链接替代依赖事件绑定的控件式切换，并把 taxonomy term 页明确收口为 best-effort 策略。

## 改动清单

### `config.toml`

- 清理语言切换与公开页面相关的翻译残留，不再保留 `[编辑]` / 后台入口对应的公开文案键。
- 保持多语言配置与主题侧使用的语言选项一致，确保 header 中的语言入口继续由配置提供稳定来源。

### `themes/cone-scroll/templates/partials/language-switch.html`

- 将语言入口从 `<select>` + JS 改为 `details + a`，把跳转目标直接落到 HTML 链接层。
- 修正默认语言 page/section 的目标链接匹配，使非默认语言页面能回到对应中文 page/section，而不是误落到不精确入口。
- taxonomy term 页采用 best-effort term 保留：优先按 `slug` / `name` 匹配目标语言 term；当跨语言 tag 语义无法可靠推断时，回退到目标语言 `tags` 列表页。
- taxonomy list 页继续统一落到目标语言 `tags` 列表页，保持切换边界清晰。

### `themes/cone-scroll/templates/` 其余公开模板

- 移除公开页面中的 `[编辑]` / `/admin` 入口，避免暴露仅对作者有意义的后台 affordance。
- 同步清理与上述入口相关的模板文案与条件渲染，确保公开页不再留下旧行为残影。

### `themes/cone-scroll/static/css/`

- 清理与旧语言下拉、`[编辑]` 入口及后台链接相关的样式残留。
- 保留 `details` 入口所需的最小样式，使语言面板继续维持低声量、文本优先的主题气质。

## 如何验证

- 测试报告：`/Users/c1/Work/blog/.legion/tasks/zola/docs/test-report.md`
- 代码评审：`/Users/c1/Work/blog/.legion/tasks/zola/docs/review-code.md`
- 安全评审：`/Users/c1/Work/blog/.legion/tasks/zola/docs/review-security.md`

1. 运行 `node scripts/zola-i18n.ts build`
   - 预期：命令成功；生成 `280` 个页面、`14` 个 section，与 CI 使用的构建入口一致。
2. 抽查 `public/en-US/blog/chu-tan-bing-fa/index.html` 与 `public/en-US/diary/diary-2020/index.html`
   - 预期：语言入口为 `details + a`；切换到默认语言时命中对应中文 page/section，而不是旧的控件跳转。
3. 抽查 `public/en-US/tags/index.html`、`public/en-US/tags/mapreduce/index.html`、`public/en-US/tags/reflection/index.html`
   - 预期：taxonomy list 页切换到目标语言 `tags` 列表；taxonomy term 页优先保留 term，无法可靠匹配时稳定回退到目标语言 `tags` 列表页。
4. 检查 `public/` 构建产物
   - 预期：不再出现旧 `<select>`、`onchange=`、`[编辑]` 或 `/admin` 残留。

## 风险与回滚

### 当前风险

- taxonomy term 的跨语言保留仍依赖 `slug` / `name` best-effort 匹配；若未来不同语言对同一 tag 使用不同命名，切换会回退到列表页而非 term 详情页。
- 代码审查提到语言面板在较窄桌面视口下仍可能出现对齐或裁切问题，但目前不构成发布阻塞。
- 构建仍保留 `18` 个既有 `diary-2026` 多语言 broken anchor warning；它们是已知噪音，不影响本轮 reader-facing 验收。

### 回滚方案

1. 回退 `themes/cone-scroll/` 中的 `details + a` 语言入口与相关模板清理，恢复旧语言切换实现。
2. 回退 `config.toml` 中与公开页文案清理相关的翻译变更。
3. 重新构建站点并验证公开页是否恢复到回滚前状态。

## 未决项与下一步

- 未决项 1：是否后续单开任务，为 taxonomy term 建立显式跨语言映射，以把 best-effort 升级为确定性命中。
- 未决项 2：是否顺手修复语言面板在窄视口下的潜在溢出问题。
- 下一步建议：当前实现可直接进入 PR 审阅；后续增量优先处理 taxonomy term 映射与语言面板防溢出。
