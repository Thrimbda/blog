# 提取 Cone Scroll 主题为独立 folder 并切换站点配置 - 任务清单

## 快速恢复

**当前阶段**: 已完成
**当前任务**: (none)
**进度**: 4/4 任务完成

---

## 阶段 1: 设计 ✅ COMPLETE

- [x] 梳理当前 Cone Scroll 主题资产边界、目标目录结构与风险分级，形成摘要级任务契约与 RFC | 验收: plan.md 明确问题定义、验收、假设、约束、风险、允许 scope，并产出可执行 RFC

---

## 阶段 2: 实现 ✅ COMPLETE

- [x] 提取主题文件到 `themes/cone-scroll/` 并更新主题元数据 | 验收: `themes/cone-scroll/` 具备可独立复用的 `theme.toml`、templates 与 theme-level static 资源
- [x] 修改站点配置并清理根目录中的重复主题入口 | 验收: `config.toml` 通过 `theme = "cone-scroll"` 加载主题，站点根目录仅保留内容级资源和配置

---

## 阶段 3: 验证与报告 ✅ COMPLETE

- [x] 运行构建/验证并生成代码评审、walkthrough 与 PR body | 验收: 输出 `docs/test-report.md`、`docs/review-code.md`、`docs/report-walkthrough.md`、`docs/pr-body.md`，并说明提取方式与回滚方式

---

## 发现的新任务

(暂无)

---

*最后更新: 2026-03-14 10:30*
