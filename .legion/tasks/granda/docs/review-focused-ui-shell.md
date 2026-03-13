# 代码审查报告

## 结论
PASS

## 阻塞问题
- [ ] 无。

## 建议（非阻塞）
- `templates/tags/list.html:4`、`templates/tags/single.html:10` - 这里直接读取 `config.default_language`，而 `header.html` / `footer.html` / `section.html` 已按当前页面语言分支。若后续真的启用英文 taxonomy 页面，这两处会继续输出中文壳层文案；建议提前收敛成同一套取语言方式，减少模板分叉。
- `templates/macros/post_list.html:13` - 列表气味目前在缺少 `summary` / `description` 时回退到 `page.content | striptags`。这能工作，但后续正文若以引文、代码、图片说明开头，列表摘要可能变得不稳定；更稳妥的方向是优先要求显式摘要，或把回退策略限制在更可控的字段上。

## 修复指导
- 为 taxonomy 模板补齐与 `section`/`page` 一致的语言解析策略；如果 `term` 本身拿不到语言，至少抽一个共享 partial 或显式从当前路径/配置传入，避免未来只改了一半模板。
- 如果想让列表气味长期可控，优先在文章 front matter 中补 `description` 或 `summary`；模板层把 `page.content` 作为最后兜底时，最好再过滤掉过长的首段噪音或仅在无富媒体开头时启用。

[Handoff]
summary:
  - 本轮 focused UI/content-shell refinement 代码审查结论为 PASS。
  - header/footer/pagination 的 aria 文案已和可见壳层文案一起本地化，之前的无障碍层中英混搭问题已解决。
  - 壳层中文化、theme 状态文本、列表低声量气味、文章返回文案这几项在当前 scope 内实现一致，未见阻塞正确性问题。
  - 目前剩 2 个非阻塞建议，集中在 taxonomy 模板的多语言一致性和列表摘要回退策略稳健性。
decisions:
  - (none)
risks:
  - taxonomy 模板若未来启用英文路由，当前语言判断会继续漏出中文。
  - 列表摘要依赖正文首段回退时，后续内容编辑可能带来气味质量波动。
files_touched:
  - path: /Users/c1/Work/blog/.legion/tasks/granda/docs/review-focused-ui-shell.md
commands:
  - (none)
next:
  - 如需继续收口，优先统一 taxonomy 模板与其他模板的语言解析方式。
  - 若后续列表气味成为长期模式，考虑把摘要来源收敛到 front matter 字段。
open_questions:
  - (none)
