# 同步 Czon 文章页到主站视觉基线 - 上下文

## 会话进展 (2026-03-13)

### ✅ 已完成

- 已在 `.czon/style.css` 中为 home/about/list/article 建立 page-family 宽度变量，并把跨页面主列宽度家族从 2.07x 收敛到 1.27x
- 已通过 Playwright 复测确认 home/about/list 左锚回到 x=200，article 保持左 rail 结构且移动端无横向溢出
- 已更新 `docs/proportion-critique.md`、`docs/test-report.md` 与 `docs/review-code.md`，记录比例修复清单与最新验证结果



### 🟡 进行中

- 开始第二轮：继续微调 article 的 rail / offset，并整理一份可发给 CZON 上游的 issue / RFC 草案


### ⚠️ 阻塞/待定

(暂无)


---

## 关键文件

(暂无)

---

## 关键决策

| 决策 | 原因 | 替代方案 | 日期 |
|------|------|----------|------|
| 本轮风险定级为 Low，采用 design-lite 直接实现，不单独生成 RFC | 只修改 `.czon/style.css` 的可回滚样式覆盖，不涉及 API、数据或模板协议变更；主要工作是收口正文宽度与 TOC 语气 | 写独立 RFC；但对当前 CSS polish 成本偏高且不会改变实现路径 | 2026-03-13 |
| 桌面文章页改用 article-only CSS 作用域，基于 `aside.sidebar-right` 存在性重建正文宽度与 TOC rail | 这样可以只命中带 TOC 的文章页，清掉 Czon 默认文章 shell 的残留 padding，同时避免误伤首页、列表页与 About | 全局覆盖 `.content`/`main` 宽度；但会波及没有 TOC 的其他 Czon surface | 2026-03-13 |
| 仅靠 `.czon/style.css` 无法让 Czon 在 home/about/list 上达到可替代主站的完全对齐 | 首页输出的是 category explorer 而不是 `_index.md` landing page；About 与 archive 页面被渲染成 article shell，并额外注入 metadata/nav/footer/share 结构，甚至出现 frontmatter 泄漏 | 继续只用 CSS 打磨；但这只能逼近 article，无法创造缺失的页面模板与语义结构 | 2026-03-13 |
| 比例问题继续优先通过 `.czon/style.css` 收口，先把 page-family 宽度族与左锚统一到接近主站，再把剩余差异归因到模板层 | Playwright 复测表明 home/about/list/article 的宽度与对位在现有 DOM 下仍有足够 CSS 可修空间；完成这一步后，跨页面宽度家族已从 2.07x 收敛到 1.27x | 直接停止 CSS 调整并立即上升为框架问题；但这会错过当前可低成本修掉的比例失配 | 2026-03-13 |

---

## 快速交接

**下次继续从这里开始：**

1. 如需继续推进主站替代级对齐，优先把 `.legion/tasks/czon/docs/czon-upstream-issue.md` 发给 CZON 上游，争取 page-level theme/template hooks
2. 若只在当前仓库继续微调，下一步已不必再大改比例，而应只处理模板语义差异或少量壳层文案问题

**注意事项：**

- 最新 Playwright 复测：home 704px/x=200，about 640px/x=200，list 752px/x=200，article 621px/x=500，TOC 248px/x=200；跨页面宽度家族已收敛到约 1.21x
- 当前剩余主要不是比例，而是 home/about/list 的模板语义与主站仍不完全同构；这部分已整理进 `.legion/tasks/czon/docs/czon-upstream-issue.md` 与 `.legion/tasks/czon/docs/czon-framework-gap.md`

---

*最后更新: 2026-03-13 23:49 by Claude*
开始：**

1. (待填写)

**注意事项：**

- (待填写)

---

*最后更新: 2026-03-13 22:44 by Claude*
框架模板能力

**注意事项：**

- 比例审计表明主站四页主列宽度族只有 1.22x 波动，而 Czon 当前达到 2.07x，用户感知到的“怪”是合理的
- 当前最优路径不是继续打磨颜色，而是推动 page-level theme/template hooks

---

*最后更新: 2026-03-13 23:15 by Claude*
开始：**

1. (待填写)

**注意事项：**

- (待填写)

---

*最后更新: 2026-03-13 22:44 by Claude*
23:15 by Claude*
开始：**

1. (待填写)

**注意事项：**

- (待填写)

---

*最后更新: 2026-03-13 22:44 by Claude*
