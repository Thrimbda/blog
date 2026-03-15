# 提取 Cone Scroll 主题为独立 folder 并切换站点配置

## 目标

将当前 Cone Scroll 风格的 Zola 主题按 anemone 的主题仓库组织方式抽取到独立 `themes/cone-scroll/` 目录，并让站点通过 `theme = "cone-scroll"` 使用它。

## 问题定义

- 当前站点的 Cone Scroll 主题文件仍散落在仓库根目录的 `templates/`、`static/css/`、`static/js/` 和若干根级静态文件中，主题与站点内容没有明确边界。
- 根目录 `theme.toml` 仍保留 anemone 元数据，但站点实际已经是自定义的 Cone Scroll 风格实现，主题元信息与当前实现不一致。
- 需要把已有 Cone Scroll 主题整理成可独立复用的 Zola theme folder，同时保持主站视觉与功能不回退。

## 验收标准

- `themes/cone-scroll/` 成为新的主题根目录，包含可工作的 `theme.toml`、`templates/` 和 theme-level `static/` 资源。
- 根目录 `config.toml` 显式声明 `theme = "cone-scroll"`，站点通过主题目录完成构建。
- 被提取的模板、样式、脚本和 theme-level SVG 资产不再以重复主题入口留在仓库根目录。
- `zola build` 通过，提取前后的页面结构与既有 Cone Scroll 视觉基线保持一致。
- 产出 `docs/rfc.md`、`docs/test-report.md`、`docs/review-code.md`、`docs/report-walkthrough.md`、`docs/pr-body.md`。

## 假设

- 既有 `granda` Legion task 的实现与截图产物可作为当前主题的 source of truth。
- 本次提取不改变内容层 markdown、taxonomy 数据或图片等站点级静态资源位置。
- 当前 Zola 版本支持站点根目录与 `themes/<name>/` 的标准覆盖/加载机制。

## 约束

- `plan.md` 作为唯一任务契约，保持摘要级，不复制完整 RFC 正文。
- 仅提取主题级模板与静态资源；内容图片、`static/images/`、`static/CNAME`、`static/favicon.ico` 等站点资源不得被误移入主题。
- 主题目录结构参考 anemone 的组织方式：主题元数据、templates、theme-level static 资源落在同一 folder 中。
- 不借这次重组顺手改视觉设计；视觉基线以当前 Cone Scroll 实现为准。

## 风险分级

- **等级**: Medium
- **理由**: 本次变更会重组主题目录结构并切换 Zola 的加载入口，涉及模板、静态资源与配置联动，但不改变外部 API、内容模型或线上数据，且可通过回退目录与配置恢复，因此判定为中风险、非 Epic。

## 要点

- 参考既有 `granda` 任务产物，把当前主站 Cone Scroll 视觉作为 source of truth
- 按 anemone 的组织方式提取主题：主题元数据、templates、theme-level static 资源进入独立 folder
- 站点根目录保留内容与站点配置，主题相关模板/样式/脚本改由 `themes/cone-scroll/` 提供
- 确保提取后构建结果保持现有视觉和功能，最终生成测试/评审/PR body 文档

## 范围

- config.toml
- theme.toml
- templates/
- templates/shortcodes/
- templates/macros/
- templates/partials/
- templates/tags/
- static/css/
- static/js/
- static/icons.svg
- themes/cone-scroll/

## Design Index

- 主设计文档: `.legion/tasks/cone-scroll-folder/docs/rfc.md`（本任务）
- 基线来源: `.legion/tasks/granda/plan.md`
- 视觉/评审基线: `.legion/playbook.md`

## 阶段概览

1. **设计** - 1 个任务
2. **实现** - 2 个任务
3. **验证与报告** - 1 个任务

## 阶段地图

1. 设计: 盘点主题资产边界，确认迁移矩阵、目录结构与回滚策略，形成 RFC。
2. 实现: 提取 theme folder、修正主题元数据、切换站点配置并删除重复主题入口。
3. 验证与报告: 构建验证、代码评审、walkthrough 与 PR body 落盘。

---

*创建于: 2026-03-14 | 最后更新: 2026-03-14*
