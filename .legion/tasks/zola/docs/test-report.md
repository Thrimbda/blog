# 测试报告

## 执行命令
`node scripts/zola-i18n.ts sync`

`node scripts/zola-i18n.ts clean`

`node scripts/zola-i18n.ts build`

## 结果
WARN

## 摘要
- `node scripts/zola-i18n.ts sync` 执行成功，输出 `generated=236 updated=0 unchanged=0 deleted=0`，说明统一脚本仍能显式生成全部受管翻译文件。
- `node scripts/zola-i18n.ts clean` 执行成功，输出 `generated=0 updated=0 unchanged=0 deleted=236`，说明统一脚本能把生成文件完整清回干净工作区。
- `node scripts/zola-i18n.ts build` 执行成功，临时工作区内生成 `280` 个页面、`14` 个 section，本地工作区未残留 `content/**/*.<lang>.md`。
- 多语言输出已生成：`public/index.html` 为默认语言根路径，同时存在 `public/en-US/`、`public/ja-JP/`、`public/es-ES/`、`public/de-DE/`，且各目录下均有 `about/`、`blog/`、`diary/`、`tags/`、`index.html` 等页面。
- 综合判定为 `WARN`：统一入口脚本和最终构建均成功，验收项中的多语言输出与无污染工作区都已满足，但存在非阻塞 warning，建议后续清理。

## 失败项（如有）
- 无阻塞失败。

## 已知警告
- `node scripts/zola-i18n.ts build` 内部调用的 `zola build` 在 internal anchor 检查阶段报告 `18` 个 broken internal anchor links。
- 警告集中在 `content/diary/diary-2026.ja-JP.md`、`content/diary/diary-2026.es-ES.md`、`content/diary/diary-2026.de-DE.md` 内若干 `#org...` 锚点不存在。
- 该警告未阻塞静态站点构建与多语言目录生成，但会影响对应翻译页内的锚点跳转准确性。

## 备注
- 之所以优先执行这三个命令，是因为统一入口脚本已经替代原来的双脚本方案：`sync` 用于显式生成、`clean` 用于恢复干净工作区、`build` 用于本地/CI 的无污染正式构建。
- 备选项曾考虑补充从 `package.json` scripts 或 `Makefile` 推断测试入口，但仓库根下未发现这两个文件，因此未采用额外脚本入口。
- 本次以“先验证显式生成与清理，再验证无污染正式构建”为主；未额外执行更重的站点级检查，因为当前任务的硬性要求已覆盖关键链路，且 `zola build` 本身已执行链接与锚点校验。
