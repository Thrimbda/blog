# cone-scroll-markdown-render-fixes - 任务清单

## 快速恢复

**当前阶段**: (unknown)
**当前任务**: (none)
**进度**: 7/7 任务完成

---

## 阶段 1: 阶段 1 - 契约与设计 ✅ COMPLETE

- [x] 建立任务契约，明确问题、验收、假设、约束、风险与允许 scope | 验收: plan.md 已定义本轮渲染修复目标、验收标准、风险等级与 scope
- [x] 补充 design-lite，明确列表 marker、任务列表视觉与代码高亮接入策略 | 验收: 存在可执行的 design-lite，能指导样式与配置改动

---

## 阶段 2: 阶段 2 - 实现 ✅ COMPLETE

- [x] 修复无序列表与有序列表 marker 显示问题，并让无序列表使用 `»` | 验收: 文章页中的 ul/ol 在 Cone Scroll 主题下可见且层级清楚
- [x] 修复任务列表的 checkbox 与文本对齐/状态表现 | 验收: 任务列表在文章页中能正确显示未完成/已完成状态
- [x] 启用并收口代码块语法高亮样式 | 验收: 代码块拥有可用的语法高亮且与主题配色协调

---

## 阶段 3: 阶段 3 - 验证与交付 🟡 IN PROGRESS

- [x] 运行站点相关验证，确认修改可构建且 showcase 文章可用于观察修复结果 | 验收: docs/test-report.md 记录验证命令与结果
- [x] 完成代码评审与交付报告，生成可直接用于 PR 的说明文档 | 验收: docs/review-code.md、docs/report-walkthrough.md 与 docs/pr-body.md 已生成

---

## 发现的新任务

(暂无)
- [x] 使用 Playwright 对至少 5 个页面做浏览器级验收，确认列表 marker、任务列表与代码高亮没有明显回归 | 来源: 用户追加要求：用 playwright-cli 检查各个页面
- [x] 修复首页 Markdown 有序/无序列表未继承正文 marker 规则的问题，并补首页列表的 Playwright 断言 | 来源: 用户反馈：首页中的 markdown 有序列表也不对


---

*最后更新: 2026-03-18 22:36*
