# 代码审查报告

## 结论
PASS

## 阻塞问题
- [ ] 无

## 建议（非阻塞）
- `themes/cone-scroll/templates/head.html:98` - `highlight.js`、`mermaid`、`embla` 相关脚本在所有页面无条件加载；这不影响本次主题抽取正确性，但会让主题入口承担额外全站成本，后续可按 shortcode/页面能力做按需注入。
- `themes/cone-scroll/templates/page.html:1` - 文件顶部已 `import "macros/page_outline.html"`，但实际渲染走的是 `partials/page-outline.html`，而该 partial 自己也会再 import 一次；`themes/cone-scroll/templates/blog-page.html:1` 同样如此，建议收敛成单一引入点，减少后续模板维护时的认知噪音。
- `themes/cone-scroll/theme.toml:2` - 当前 metadata 基本自洽，但 `description`、`homepage`、`demo` 都直接指向站点实例；若后续希望把该主题作为“仓库内嵌主题”长期维护，建议在描述或 README 中明确其定位，避免被误解为通用外部分发主题。

## 修复指导
1. 当前无需阻塞性修复；目录入口、资产归属、metadata 基本一致，已满足本次抽取目标。
2. 若要优化运行时负担，可把 `themes/cone-scroll/templates/head.html` 中的第三方脚本拆成按页面能力注入，例如仅在出现 Mermaid shortcode、代码高亮块或轮播容器时再输出对应脚本标签。
3. 若要降低模板重复，可删除 `themes/cone-scroll/templates/page.html:1` 与 `themes/cone-scroll/templates/blog-page.html:1` 中未直接使用的 `page_outline` import，仅保留 `themes/cone-scroll/templates/partials/page-outline.html:1` 的统一 import。
4. 若要进一步稳固“单入口”约束，可在主题 README 或任务文档中补一句：主题模板与主题静态资源唯一来源是 `themes/cone-scroll/`，根目录 `templates/`、`static/css/`、`static/js/` 不再承载同类主题实现。

[Handoff]
summary:
  - 已按最终工作区状态复查双入口、site-level 资产误迁、theme metadata 自洽性与配置切换最小化。
  - 当前主题入口已收敛到 `themes/cone-scroll/`；根目录 `templates/`、`static/css/`、`static/js/` 为空，`static/icons.svg` 已迁入 `themes/cone-scroll/static/icons.svg`。
  - `config.toml` 仅见必要的 `theme = "cone-scroll"` 切换，未发现额外站点级配置膨胀；审查结论维持 PASS。
decisions:
  - (none)
risks:
  - 第三方脚本现为全站无条件加载，后续若主题继续扩展，性能与可控性成本会累积。
  - Zola 仍允许根目录同路径资源覆盖主题资源；若团队缺少文档约束，未来存在重新形成隐式双入口的风险。
files_touched:
  - path: /Users/c1/Work/blog/.legion/tasks/cone-scroll-folder/docs/review-code.md
commands:
  - (none)
next:
  - 如需继续收口，可优先做一次仅模板清理/文档补充的小修，不必再调整目录结构。
open_questions:
  - (none)
