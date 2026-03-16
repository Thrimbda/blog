# Zola 多语言接入 walkthrough

## 目标与范围

- 任务目标：让主站以 `zh-Hans` 为默认语言，自动从 `.czon/src` 同步非中文翻译到 Zola 多语言内容，并在主题与 GitHub Pages CI 中完成语言感知接入。
- 本次实际落地覆盖 `config.toml`、`content/`、`scripts/`、`themes/cone-scroll/`、`.github/workflows/pages.yaml`，与任务 scope 一致。
- 当前最终状态已覆盖本任务要求的五个关键实现点：config 多语言、sync script、主题语言切换、CI 接入、生成内容。

## 设计摘要

- 设计基线来自 RFC：`/Users/c1/Work/blog/.legion/tasks/zola/docs/rfc.md`。
- RFC 审查已通过：`/Users/c1/Work/blog/.legion/tasks/zola/docs/review-rfc.md`，实现阶段重点收敛在语言码一致性、稳定入口回退、受管文件边界与可回滚性。
- 最终实现保持 RFC 主线：默认语言切到 `zh-Hans`；非默认语言内容以 `.czon/src/<lang>/content/**/*.md` 为真源；页面/section 优先精确切换，taxonomy 与壳层页回退到目标语言稳定入口；CI 改为通过统一脚本在临时工作区中完成同步与构建。

## 改动清单

### 1. `config.toml`

- 将 `default_language` 切换为 `zh-Hans`，注册 `en-US`、`ja-JP`、`es-ES`、`de-DE` 四种附加语言。
- 补齐根级与各语言级 `[translations]`，将导航、分页、目录、返回、编辑、主题、语言切换等壳层文案统一交给 `trans()`。
- 将 `extra.header_nav` 调整为 `path + label_key` 结构，并新增 `language_options`，为语言下拉提供统一配置来源。

### 2. `scripts/zola-i18n.ts`

- 新增统一入口脚本，提供 `build` / `sync` / `clean` 三个子命令。
- `sync` 会把 `.czon/src/<lang>/content/**/*.md` 生成到 `content/**/*.<lang>.md`。
- `clean` 会清掉全部受管翻译文件。
- `build` 会在临时工作区中执行 `sync` + `zola build`，最后只把构建产物复制回目标目录，不污染仓库本地 `content/`。
- 脚本已实现固定语言白名单、路径越界防护、符号链接拒绝、front matter 规范化、默认语言日期兜底、幂等覆盖写入，以及对白名单语言后缀文件的清理。
- 最新版本已补受管删除日志，删除翻译产物时会输出相对路径，便于 CI 与本地排查。
- 已修正 translated `blog/_index.*.md` 的 `/tags` 串链问题：非默认语言博客列表页中的标签入口改为 `../tags`，不会再跳回默认语言标签页。

### 3. `themes/cone-scroll/`

- `header.html` / `footer.html` / `head.html` / `index.html` / `page.html` / `blog-page.html` / `section.html` / `tags/list.html` / `tags/single.html` / `partials/page-outline.html` 等模板已完成语言感知改造。
- 内部导航、RSS、taxonomy 链接、recent posts、返回链接、目录文案、`html lang` 等都改为依赖当前语言生成，不再使用 `current_lang == "en"` 的特判结构。
- 新增 `partials/language-switch.html` 作为低干扰语言下拉；页面/section 精确切换，无翻译时按 RFC 回退到首页、`blog`/`diary` 列表页或 `tags` 稳定入口。
- 语言切换链路已补 same-origin 防护，避免把下拉值当作任意可跳转地址使用；同时 `language-switch.html` 已去除 `|safe`。
- 非默认语言派生页隐藏 admin edit 入口，避免用户被引导到脚本生成文件。

### 4. `.github/workflows/pages.yaml`

- CI 改为执行 `node scripts/zola-i18n.ts build --output-dir ./final-output`，统一复用无污染构建入口。
- Pages 构建链路已经覆盖 `zh-Hans`、`en-US`、`ja-JP`、`es-ES`、`de-DE`，保证最终产物同时包含默认语言根路径与非默认语言子路径。

### 5. `content/`

- 非默认语言内容文件仍是脚本受管产物，但不再需要长期留在仓库工作区中。
- 根据最新验证，`sync` 能生成 `236` 个翻译文件，`clean` 能全部清理，`build` 完成后本地 `content/` 不残留 `*.en-US.md` / `*.ja-JP.md` / `*.es-ES.md` / `*.de-DE.md`。

## 任务目标与实际落地对照

| 目标 | 实际落地 |
| --- | --- |
| config 多语言 | 已完成。默认语言为 `zh-Hans`，并注册 `en-US`、`ja-JP`、`es-ES`、`de-DE`。 |
| sync script | 已完成。统一脚本同时具备无污染构建、显式同步、受管清理、路径安全和删除日志。 |
| 主题语言切换 | 已完成。主题壳层链接、RSS、目录、recent posts、返回链接与语言下拉均已语言感知。 |
| CI 接入 | 已完成。Pages workflow 已在 `zola build` 前执行同步脚本。 |
| 生成内容 | 已完成。`content/**/*.<lang>.md` 已生成，并通过重复执行验证稳定。 |

## 验证结论

- 测试报告：`/Users/c1/Work/blog/.legion/tasks/zola/docs/test-report.md`
- 代码评审：`/Users/c1/Work/blog/.legion/tasks/zola/docs/review-code.md`
- 安全评审：`/Users/c1/Work/blog/.legion/tasks/zola/docs/review-security.md`

### 如何验证

1. 运行 `node scripts/zola-i18n.ts sync`
   - 预期：命令成功退出；当前结果为 `generated=236 updated=0 unchanged=0 deleted=0`。
2. 运行 `node scripts/zola-i18n.ts clean`
   - 预期：命令成功退出；当前结果为 `generated=0 updated=0 unchanged=0 deleted=236`，仓库 `content/` 恢复干净。
3. 运行 `node scripts/zola-i18n.ts build`
   - 预期：构建成功；临时工作区生成 `280` 个页面、`14` 个 section；输出包含 `public/index.html` 以及 `public/en-US/`、`public/ja-JP/`、`public/es-ES/`、`public/de-DE/`，同时仓库本地 `content/` 无派生翻译文件残留。
4. 抽查多语言壳层行为
   - 预期：首页、博客列表、日志列表、关于页、标签页、文章详情页均按当前语言生成导航、RSS、返回链接与语言切换目标；translated `blog/_index.*.md` 的标签入口不再串回默认语言。

### 最终结论

- 最新验证仍为 `WARN` 而非 `FAIL`：`node scripts/zola-i18n.ts sync`、`node scripts/zola-i18n.ts clean`、`node scripts/zola-i18n.ts build` 均成功，任务验收项已满足。
- 最新代码评审结论为 PASS：已修正 translated `blog/_index.*.md` 的 `/tags` 串链，当前无 blocking / major 问题。
- 最新安全评审结论为 PASS：same-origin 防护与删除日志均已补齐，当前未发现 blocking / major 风险。

## 已知 warning / 非阻塞问题

- 当前仍保留 `18` 个 translated diary broken anchor warning，集中在若干翻译 diary 文件中的 `#org...` 锚点。
- 该 warning 不阻塞 `zola build`、多语言目录输出、主题语言切换或 CI 成功，因此本轮作为已知内容质量问题记录，不影响交付结论。
- 若后续要清理 warning，优先方向是调整 translated diary 的锚点/目录生成方式，使其更接近 Zola link checker 可识别的原生标题锚点。

## 风险与回滚

### 当前风险

- 功能风险：主链路已通过，但 translated diary 的锚点 warning 仍会持续给构建日志带来噪音。
- 运维风险：workflow 仍依赖部分未固定到 SHA 的 GitHub Actions，以及 `npx czon@latest` 的浮动供应链，属于可接受但未完全消除的 residual risk。
- 维护风险：当前所有白名单语言后缀文件均视为脚本产物；若未来引入手写非默认语言页，需要先调整受管边界。

### 回滚思路

1. 从 `.github/workflows/pages.yaml` 回退 `node scripts/zola-i18n.ts build --output-dir ./final-output`，先断开 CI 对统一多语言构建入口的依赖。
2. 回退 `config.toml` 中的多语言注册、翻译文案、导航与语言选项配置，恢复单语言站点配置。
3. 回退 `themes/cone-scroll/` 中的语言感知模板、语言切换 UI 与相关前端跳转逻辑。
4. 如需清理受管翻译文件，运行 `node scripts/zola-i18n.ts clean`，恢复仅默认语言内容的站点形态。

## 未决项与下一步

- 未决项 1：是否单开后续任务清理 translated diary 的 `#org...` broken anchor warning。
- 未决项 2：是否继续加固 Pages workflow，把 GitHub Actions 固定到 SHA，并把 `czon` 固定到明确版本。
- 下一步建议：当前版本已经可进入最终 PR 评审与合并；后续质量打磨优先处理 anchor warning 与 CI 供应链收紧。
