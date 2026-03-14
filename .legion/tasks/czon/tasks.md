# 同步 Czon 文章页到主站视觉基线 - 任务清单

## 快速恢复

**当前阶段**: 阶段 3 - 验证与报告
**当前任务**: (none)
**进度**: 4/4 任务完成

---

## 阶段 1: 设计 ✅ COMPLETE

- [x] 梳理主站 Granda 与当前 Czon 文章页在正文宽度和 TOC 结构上的差异，形成摘要级 plan/design-lite | 验收: plan.md 写明问题定义、验收、假设、约束、风险与允许 scope

---

## 阶段 2: 实现 ✅ COMPLETE

- [x] 调整 Czon 文章页相关样式，使正文宽度、桌面 TOC rail、移动端目录入口尽量贴近主站 | 验收: `.czon/style.css` 完成改动，且不破坏首页/列表/页脚等既有 Czon surface
- [x] 如果存在可复用经验，更新 `.legion/playbook.md` | 验收: playbook 追加可复用约束或踩坑，且不记录一次性细节

---

## 阶段 3: 验证与报告 🟡 IN PROGRESS

- [x] 运行验证、代码评审并生成 walkthrough / PR body | 验收: 生成 `docs/test-report.md`、`docs/review-code.md`、`docs/report-walkthrough.md`、`docs/pr-body.md`，并在文档中说明是否存在 Czon 自由度限制

---

## 发现的新任务

(暂无)
- [ ] 若目标升级为“Czon 直接替代主站”，需要推动 CZON framework 提供页面级主题/模板能力 | 来源: Playwright 审查 + `.czon/dist` DOM 审计发现 home/about/list 的结构差异不是 CSS 可修复问题
- [x] 继续微调 article 的 rail / offset，使文章页与主站更接近 | 来源: 用户要求同时完成 article 比例微调与上游 issue/RFC 文档草案 ← CURRENT
- [x] 整理一份可发给 CZON 上游的 issue / RFC 草案 | 来源: 用户要求把仍需框架支持的差异整理成文档


---

*最后更新: 2026-03-13 23:49*
: 2026-03-13 22:32*
list/article 宽度与对位 | 来源: 用户确认比例问题可继续通过 `.czon/style.css` 推进，并要求直接修改


---

*最后更新: 2026-03-13 23:19*
: 2026-03-13 22:32*
