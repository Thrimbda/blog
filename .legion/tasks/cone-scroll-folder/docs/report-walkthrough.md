# Walkthrough: cone-scroll 主题抽取与站点配置切换

## 目标与范围

本次变更的目标，是将当前散落在仓库根目录的 Cone Scroll 主题实现收拢到 `themes/cone-scroll/`，并让站点通过 `config.toml` 中的 `theme = "cone-scroll"` 作为唯一主题入口完成构建。

本报告只覆盖以下 scope 内的实现与验证结论：

- `config.toml`
- `theme.toml`
- `templates/`
- `static/css/`
- `static/js/`
- `static/icons.svg`
- `themes/cone-scroll/`

同时明确，本次保留在仓库根目录的 site-level 资产仍为：`static/favicon.ico`、`static/images/**`、`static/CNAME`、`static/click.ogg`。

## 设计摘要

设计依据见 `/.legion/tasks/cone-scroll-folder/docs/rfc.md`。RFC 的核心决策是：

- 采用 Zola 标准 theme folder 组织方式，把主题元数据、模板与 theme-level 静态资源统一收敛到 `themes/cone-scroll/`
- 根目录只保留站点配置、内容与 site-level / content-level 资产，避免继续维持双入口
- 本次只做结构抽取，不改页面视觉、URL、内容模型或运行时语义

按当前工作区结果，落地状态与 RFC 一致：`config.toml` 已启用 `theme = "cone-scroll"`，根目录 `theme.toml`、`templates/`、`static/css/`、`static/js/` 已不再作为主题入口存在，主题实现改由 `themes/cone-scroll/` 独占提供。

## 改动清单

### 1. 配置入口

- `config.toml`
  - 新增 `theme = "cone-scroll"`
  - 其余站点级配置保持原位，未扩展额外主题专属配置面

### 2. 主题元数据

- `theme.toml` -> `themes/cone-scroll/theme.toml`
  - 根目录误导性的主题元数据已移除
  - 主题 metadata 已改为 `granda` 身份，并以当前站点实例作为主题说明与作者信息来源

### 3. 模板目录收拢

- 根目录 `templates/` 已移除为主题入口
- 主题模板统一位于 `themes/cone-scroll/templates/`
- 当前可见主题模板覆盖：
  - 页面骨架：`base.html`、`head.html`、`header.html`、`footer.html`
  - 页面模板：`index.html`、`page.html`、`blog-page.html`、`section.html`
  - 复用目录：`macros/`、`partials/`、`shortcodes/`、`tags/`

### 4. 主题静态资源收拢

- 根目录 `static/css/`、`static/js/` 已移除为主题入口
- `static/icons.svg` 已迁入 `themes/cone-scroll/static/icons.svg`
- 主题静态资源统一位于 `themes/cone-scroll/static/`
  - `themes/cone-scroll/static/css/`
  - `themes/cone-scroll/static/js/`
  - `themes/cone-scroll/static/icons.svg`

### 5. 根目录保留资产确认

- `static/favicon.ico` 仍保留在根目录，继续作为站点 branding 资源
- `static/images/**` 仍保留在根目录，未被误迁
- `static/CNAME` 仍保留在根目录，部署边界未改变
- `static/click.ogg` 仍保留在根目录；虽然不属于本次主题抽取主路径，但未被误删或误迁

## 如何验证

详见 `/.legion/tasks/cone-scroll-folder/docs/test-report.md`。

### 已执行命令

```bash
zola build
```

### 预期结果

- 构建成功，无缺模板或缺资源错误
- 构建产物中存在 `public/css/style.css`、`public/js/script.js`、`public/favicon.ico`
- 根目录仍保留 `static/favicon.ico`、`static/images/**`、`static/CNAME`、`static/click.ogg`
- 说明主题静态资源已能通过 `themes/cone-scroll/` 正常导出，同时站点级资产未丢失

### 实际结果

- `test-report.md` 结论为 PASS
- 构建完成 56 pages、2 sections，并通过 34 条内部锚点链接检查
- 当前最关键的两类风险均已被覆盖：
  - 主题抽取后是否还能正常构建
  - 根目录站点级资产是否被误删或误迁

### 代码审查结论

详见 `/.legion/tasks/cone-scroll-folder/docs/review-code.md`。

- 审查结论为 PASS
- 未发现阻塞问题
- 非阻塞建议主要集中在第三方脚本按需注入、模板 import 收敛、以及主题定位文档补充

## 风险与回滚

### 主要风险

- 未来若再次在根目录补回同路径模板或静态资源，可能重新形成隐式双入口
- `head.html` 里的第三方脚本仍为全站无条件加载；不影响本次抽取正确性，但会继续累积主题层运行时成本
- `themes/cone-scroll/theme.toml` 当前已自洽，但更像“仓库内嵌主题”而非可外部分发主题，后续若对外复用需要再补文档边界

### 回滚方式

若后续发现构建失败、页面出现模板缺失、或无法确认实际渲染来源，可按 RFC 中定义的回滚路径处理：

1. 去掉 `config.toml` 中的 `theme = "cone-scroll"`
2. 将 `themes/cone-scroll/templates/**` 与 `themes/cone-scroll/static/**` 恢复回根目录原路径
3. 如需完全回到迁移前状态，再将 `themes/cone-scroll/theme.toml` 恢复为根级 `theme.toml`
4. 重新执行 `zola build` 验证恢复结果

## 未决项与下一步

- 当前无阻塞性未决项，已满足本任务“主题目录收拢 + 配置切换 + 可构建”目标
- 若要继续收口，优先级更高的是文档与维护性优化，而非再次调整目录结构：
  - 收敛 `page.html` / `blog-page.html` 中的重复 `import`
  - 评估 `head.html` 中第三方脚本是否按页面能力按需注入
  - 在主题 README 或后续文档中补一句“`themes/cone-scroll/` 是唯一主题来源”
