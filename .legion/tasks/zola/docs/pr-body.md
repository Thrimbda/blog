## Summary

### What
- 为 Zola 主站补齐多语言基础能力：`config.toml` 切到 `zh-Hans` 默认语言，注册 `en-US`、`ja-JP`、`es-ES`、`de-DE`，并将主题壳层文案改为配置翻译驱动。
- 新增统一入口 `scripts/zola-i18n.ts`：`build` 在临时工作区中完成翻译同步与 `zola build`，`sync`/`clean` 负责显式生成和清理受管翻译文件。
- 改造 `themes/cone-scroll/` 与 `.github/workflows/pages.yaml`：主题支持语言感知链接和语言切换，CI 改为通过无污染构建入口生成多语言站点。

### Why
- 仓库中已存在较完整的多语言内容资产，但主站此前仍是单语言配置，导致翻译内容无法进入 Zola 构建输出。
- 主题模板之前存在大量硬编码路径与 `current_lang == "en"` 特判，无法保证导航、RSS、标签页、返回链接和语言切换随当前语言正确工作。
- 本 PR 将翻译真源、主题壳层与构建链路一并打通，使本地与 CI 都能稳定产出多语言站点。

### How
- 在 `config.toml` 中补齐多语言配置、翻译文案、语言选项和基于 `path + label_key` 的导航定义。
- 用 `scripts/zola-i18n.ts` 统一封装翻译同步、清理与无污染构建；本地日常只需要 `build` 子命令即可，不再把翻译文件平铺到仓库 `content/`。
- 将 header/footer/head/index/page/blog/tags 等模板改为统一依赖当前语言生成 URL；新增低干扰语言下拉，并补 same-origin 防护。
- 修正 translated `blog/_index.*.md` 的 `/tags` 串链，避免非默认语言博客列表页跳回默认语言标签页。

## Testing

- `node scripts/zola-i18n.ts sync`
  - 成功，结果为 `generated=236 updated=0 unchanged=0 deleted=0`
- `node scripts/zola-i18n.ts clean`
  - 成功，结果为 `generated=0 updated=0 unchanged=0 deleted=236`
- `node scripts/zola-i18n.ts build`
  - 成功，临时工作区中生成 `280` 个页面、`14` 个 section，仓库本地 `content/` 保持干净
- 测试报告：`/Users/c1/Work/blog/.legion/tasks/zola/docs/test-report.md`
- 代码评审：PASS - `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-code.md`
- 安全评审：PASS - `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-security.md`

## Known Issues / Risks

- 当前仍保留 `18` 个 translated diary broken anchor warning，集中在翻译 diary 文件中的 `#org...` 锚点；该问题不阻塞构建成功和多语言输出，已按非阻塞内容质量问题登记。
- workflow 仍包含未固定到 SHA 的 GitHub Actions 与 `npx czon@latest`，存在 residual supply-chain risk；建议后续单开任务收紧版本与权限边界。
- 当前所有 `content/**/*.<lang>.md` 白名单后缀文件均视为脚本受管产物；若未来需要手写非默认语言页，需要先调整受管边界。

## Rollback

- 将 `.github/workflows/pages.yaml` 中的 `node scripts/zola-i18n.ts build --output-dir ./final-output` 回退为旧的单语言构建方式。
- 回退 `config.toml` 的多语言与翻译配置。
- 回退 `themes/cone-scroll/` 的语言感知模板、语言切换逻辑与相关前端改动。
- 如需清理受管翻译文件，执行 `node scripts/zola-i18n.ts clean`，恢复单语言站点形态。

## Links

- Plan: `/Users/c1/Work/blog/.legion/tasks/zola/plan.md`
- RFC: `/Users/c1/Work/blog/.legion/tasks/zola/docs/rfc.md`
- RFC Review: `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-rfc.md`
- Walkthrough: `/Users/c1/Work/blog/.legion/tasks/zola/docs/report-walkthrough.md`
- Test Report: `/Users/c1/Work/blog/.legion/tasks/zola/docs/test-report.md`
- Code Review: `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-code.md`
- Security Review: `/Users/c1/Work/blog/.legion/tasks/zola/docs/review-security.md`
