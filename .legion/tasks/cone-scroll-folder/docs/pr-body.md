# 变更说明

## What

本 PR 将当前站点的 Cone Scroll 主题实现，从仓库根目录的分散入口抽取到 `themes/cone-scroll/`，并在 `config.toml` 中显式启用 `theme = "cone-scroll"`。

主题相关模板、CSS、JS 与 `icons.svg` 现已统一由 `themes/cone-scroll/` 提供；根目录不再保留同类主题入口。

## Why

此前主题资产分散在根目录 `templates/`、`static/css/`、`static/js/` 等位置，主题边界与站点边界混杂，且根级 `theme.toml` 仍保留 `anemone` 元数据，和当前实际实现不一致。

这次调整的目标，是建立唯一主题来源，清理误导性元数据，并在不改变视觉与 URL 的前提下，让仓库结构回到 Zola 标准 theme folder 组织方式。

## How

- 在 `themes/cone-scroll/` 下落地主题元数据、模板与 theme-level 静态资源
- 在 `themes/cone-scroll/README.md` 中补充主题说明，并新增 `themes/cone-scroll/screenshot.svg` 作为效果图
- `config.toml` 仅增加必要的 `theme = "cone-scroll"` 配置切换
- 根目录 `theme.toml`、`templates/`、`static/css/`、`static/js/`、`static/icons.svg` 对应主题入口完成迁移/清理
- 根目录继续保留 site-level 资产：`static/favicon.ico`、`static/images/**`、`static/CNAME`、`static/click.ogg`

## Testing

- 见 `/.legion/tasks/cone-scroll-folder/docs/test-report.md`
- 已执行：`zola build`
- 结果：PASS；构建成功，且产物中可见 `public/css/style.css`、`public/js/script.js`、`public/favicon.ico`
- 同时确认根目录保留资产仍存在：`static/favicon.ico`、`static/images/**`、`static/CNAME`、`static/click.ogg`

## Risk / Rollback

- 主要风险是后续再次在根目录添加同路径模板或静态资源，重新形成双入口；另有非阻塞维护项包括第三方脚本仍为全站无条件加载
- 若需回滚，可移除 `config.toml` 中的 `theme = "cone-scroll"`，再将 `themes/cone-scroll/templates/**`、`themes/cone-scroll/static/**` 和 `themes/cone-scroll/theme.toml` 恢复到迁移前根级路径

## Links

- Plan: `/.legion/tasks/cone-scroll-folder/plan.md`
- RFC: `/.legion/tasks/cone-scroll-folder/docs/rfc.md`
- Code Review: `/.legion/tasks/cone-scroll-folder/docs/review-code.md`
- Test Report: `/.legion/tasks/cone-scroll-folder/docs/test-report.md`
- Walkthrough: `/.legion/tasks/cone-scroll-folder/docs/report-walkthrough.md`
