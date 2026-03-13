# 同步 Czon 文章页到主站视觉基线 - 任务清单

## 快速恢复

**当前阶段**: 阶段 1 - 设计
**当前任务**: (none)
**进度**: 4/4 任务完成

---

## 阶段 1: 设计 ✅ COMPLETE

- [x] 梳理主站 Granda 与当前 Czon 文章页在正文宽度和 TOC 结构上的差异，形成摘要级 plan/design-lite | 验收: plan.md 写明问题定义、验收、假设、约束、风险与允许 scope ← CURRENT

---

## 阶段 2: 实现 ✅ COMPLETE

- [x] 调整 Czon 文章页相关样式，使正文宽度、桌面 TOC rail、移动端目录入口尽量贴近主站 | 验收: `.czon/style.css` 完成改动，且不破坏首页/列表/页脚等既有 Czon surface
- [x] 如果存在可复用经验，更新 `.legion/playbook.md` | 验收: playbook 追加可复用约束或踩坑，且不记录一次性细节

---

## 阶段 3: 验证与报告 ✅ COMPLETE

- [x] 运行验证、代码评审并生成 walkthrough / PR body | 验收: 生成 `docs/test-report.md`、`docs/review-code.md`、`docs/report-walkthrough.md`、`docs/pr-body.md`，并在文档中说明是否存在 Czon 自由度限制

---

## 发现的新任务

(暂无)

---

*最后更新: 2026-03-13 21:40*
