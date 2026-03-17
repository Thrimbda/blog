# 测试报告

## 执行命令
`node scripts/zola-i18n.ts build`

`spot check: public/en-US/blog/chu-tan-bing-fa/index.html`

`spot check: public/en-US/diary/diary-2020/index.html`

`spot check: public/en-US/blog/index.html`

`spot check: public/en-US/tags/index.html`

`spot check: public/en-US/tags/reflection/index.html`

`spot check: public/en-US/tags/mapreduce/index.html`

`grep: <select|onchange=|\[编辑\]|/admin (path=public, include=*.html)`

## 结果
PASS

## 摘要
- 按 CI 同路径执行 `node scripts/zola-i18n.ts build` 成功；输出 `generated=236`，随后 Zola 成功创建 `280` 个页面和 `14` 个 section。
- `public/en-US/blog/chu-tan-bing-fa/index.html`、`public/en-US/diary/diary-2020/index.html`、`public/en-US/blog/index.html` 均使用 `details + a` 语言切换，并命中对应目标语言 page/section，而非旧 `select + JS`。
- `public/en-US/tags/index.html` 的语言切换命中各语言 `tags` 列表页，符合 taxonomy list 页要求。
- `public/en-US/tags/mapreduce/index.html` 能保留当前 term 并跳到目标语言对应 term 页；`public/en-US/tags/reflection/index.html` 则稳定回退到目标语言 `tags` 列表页，没有回到首页，也未生成 `/admin` 或明显 404 风险链接，符合 term 页的允许回退策略。
- `public/` 全量检索未发现旧 `<select>`、`onchange=`、`[编辑]` 或 `/admin` 残留。

## 失败项（如有）
- 无阻塞失败项。

## 备注
- 选择 `node scripts/zola-i18n.ts build`，因为这是用户指定的首选命令，也是 `.github/workflows/pages.yaml` 中实际使用的构建入口，能同时覆盖多语言同步和 Zola 构建。
- 备选项是直接跑 `zola build` 或仅检查已有 `public/` 产物；前者不能验证同步链路，后者无法确认最新决策已重新生成到输出，因此优先采用 CI 一致入口。
- 构建仍有 `18` 个既有 broken internal anchor warning，集中在多语言 `diary-2026` 页面；本次不影响语言切换验收，但应继续作为已知 warning 跟踪。
