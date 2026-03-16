# RFC 审查报告

## 结论

PASS

本轮 RFC 已关闭此前要求的 4 个收敛项：taxonomy 已明确为所有语言显式声明；配置章节已包含带引号语言码的真实 TOML 片段；非目标与 admin edit 修正表述已一致；page fallback 也已收敛为 `blog / diary / 首页` 三种固定回退。当前设计已满足可实现、可验证、可回滚，可以进入实现。

## 阻塞问题

- [ ] 无

## 重要问题

- 无

## 非阻塞建议

- **Minor 1：page fallback 规则出现了两条相邻表述，建议实现前删掉旧句，避免阅读歧义。**
  - 现有 RFC 在第 145-146 行先写“回退到其所属 section 列表页”，下一行又收敛成“博客文章回 `blog`，日志文章回 `diary`，其余回首页”。
  - 最小化复杂度建议：保留后一条固定规则，删除前一条泛化描述，避免实现者误以为仍需通用 section 反推。

## 实现阶段最需要验证的点

- 验证 `zh-Hans` / `en-US` / `ja-JP` / `es-ES` / `de-DE` 在 `config.toml`、生成文件名、输出目录、`get_url(..., lang=...)`、`get_taxonomy_url(..., lang=...)` 上完全一致。
- 验证 taxonomy list / taxonomy term / 分页页的语言切换都只落到稳定入口，不再尝试同 term 精确跳转，也不会产生 404。
- 验证 `head.html` feed link、header RSS、首页 recent posts、page outline、非默认语言页 edit 入口都已随当前语言正确变化。
- 验证白名单后缀全量对比清理不会误删默认语言文件，且源文件删除后能稳定清理对应翻译产物。
