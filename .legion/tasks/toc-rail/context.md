# TOC 收起时折叠左 rail 并保留展开按钮 - 上下文

## 会话进展 (2026-03-16)

### ✅ 已完成

- 补齐 `plan.md` 与 `docs/design-lite.md`，将任务定级为 Low / design-lite
- 完成 `cone-scroll` 模板、CSS 与 JS 改动，实现 TOC rail 收起时连占位、gap、边线一起折叠
- 使用 Playwright CLI 完成桌面展开/收起、reload 持久化与移动端无横向溢出的浏览器级验证
- 完成 critique 设计审查、optimize/polish/normalize/harden 收口、代码评审与 walkthrough / PR body 产出


### 🟡 进行中

(暂无)


### ⚠️ 阻塞/待定

(暂无)


---

## 关键文件

(暂无)

---

## 关键决策

| 决策 | 原因 | 替代方案 | 日期 |
|------|------|----------|------|
| 本任务定级为 Low，采用 design-lite 而非单独 RFC | 改动仅限 `cone-scroll` 主题模板、CSS 与少量 JS，可回滚且不涉及数据/API/安全契约 | 单独生成 RFC；但会增加文档成本，且不会改变实现路径 | 2026-03-16 |
| 继续复用原生 `details/summary`，并以 `details.toggle` + `data-outline-state` 驱动 rail 折叠 | 这样既保留了 quiet TOC 的文本化 affordance 和可访问语义，又能稳定同步 rail 宽度、gap、边线与正文位移 | 额外增加独立展开按钮或完全改写 TOC 组件；但会引入更重的控件感并增加维护面 | 2026-03-16 |
| TOC 开合状态按 `page-outline:${pathname}` 持久化，并在 `pageshow` 时重新同步 | 满足“当前页记住上次状态”的需求，同时覆盖浏览器返回场景；按路径隔离可避免不同文章互相污染 | 全局共享一个 TOC 状态或不持久化；前者会串页，后者不满足用户要求 | 2026-03-16 |
| 在收起态补上 hover / focus-visible 与 `70ch` 正文宽度回收，作为 critique 后的 refine pass | 这样能让展开入口更可发现，同时让收起后的版式更接近无 TOC 页面，不破坏 quiet rail 语气 | 维持默认无额外交互反馈与 69ch 正文宽度；但可发现性和“像无 TOC 页面”的完成度略差 | 2026-03-16 |

---

## 快速交接

**下次继续从这里开始：**

1. 使用 `.legion/tasks/toc-rail/docs/pr-body.md` 作为 PR 描述进入 review / 合并流程
2. 若要继续 polish，可优先抽取 blog/page 重复的 TOC shell 协议，并收敛 CSS magic number

**注意事项：**

- 最终验证产物：`docs/test-report.md`、`docs/critique-review.md`、`docs/refinement-review.md`、`docs/review-code.md`、`docs/report-walkthrough.md`、`docs/pr-body.md`
- 已知非阻塞风险：首屏恢复可能有轻微跳变；中间断点与别名路径策略仍可在后续任务中继续收口

---

*最后更新: 2026-03-16 13:49 by Claude*
