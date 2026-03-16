# TOC 收起时折叠左 rail 并保留展开按钮

## 目标

让带 TOC 的文章页在收起目录时，左侧 rail 与占位一起折叠、正文左移，并保留可再次展开恢复状态的按钮。

## 问题定义

当前 `themes/cone-scroll/templates/partials/page-outline.html` 使用原生 `details/summary` 收起目录内容，但桌面双列布局仍保留整条左 rail 的宽度、边线与 gap。结果是目录虽然消失，正文却仍被推在右侧，体验上不像“暂时没有 TOC”，而像“左边空了一块”。用户希望收起动作同时折叠 rail 本身，并保留一个低声量按钮随时恢复原先状态。

## 验收

- 桌面端收起 TOC 后，左 rail 的列宽、分隔感与 gap 一起折叠，正文位置接近无 TOC 页面。
- 收起后仍保留可见、可点击、可键盘操作的展开按钮；再次展开后恢复原先双列 TOC 布局与滚动行为。
- 带 TOC 的普通页面与博客文章页都支持该行为；不带 TOC 的页面不受影响。
- 移动端继续保持单列语义，不出现横向溢出或失效按钮。
- 当前页的 TOC 开合状态可恢复，且默认回退为展开。
- 通过 `zola build`、Playwright CLI 浏览器级验证，以及基于 critique 标准的设计审查。

## 假设

- 本次需求只针对当前主题 `cone-scroll`，不回改历史归档主题实现。
- “恢复到之前的状态”指同一路径文章页的上次 TOC 开合状态；使用本地存储即可满足。
- 低声量展开按钮可以复用 `summary` 语义，不需要额外引入新控件类型。

## 约束

- 保持 `.legion/tasks/granda/docs/rfc.md` 与 `.legion/playbook.md` 中的 quiet TOC / paper-ink 设计契约。
- 不引入新依赖，不改内容文件，不扩大到首页、列表页或 header/footer 重做。
- 允许修改仅限本任务 Scope；若实现过程中必须越界，需先回写计划再决策。

## 风险与规模

- 风险等级：Low
- 规模标签：small
- 设计策略：design-lite（不单独起 RFC）
- 理由：仅涉及主题模板/CSS/少量 JS 的局部可回滚交互，不触及数据、API、权限、安全或跨仓库契约。

## 要点

- 参考 `.legion/tasks/granda/docs/rfc.md` 与 `.legion/playbook.md` 保持 Granda/Cone Scroll 的低声量 TOC 语言。
- 桌面端收起 TOC 后，页面视觉应接近无 TOC 文章；再次展开后恢复原先双列状态。
- 必须保留一个始终可见的按钮以重新展开 TOC，并记住当前页内的折叠状态。
- 使用 Playwright CLI 做浏览器级验证，并按 critique 设计审查思路迭代直到通过。
- 完成后按 optimize / polish / normalize / harden 的检查项做最终收口。

## 范围

- themes/cone-scroll/templates/partials/page-outline.html
- themes/cone-scroll/templates/blog-page.html
- themes/cone-scroll/templates/page.html
- themes/cone-scroll/static/css/style.css
- themes/cone-scroll/static/js/script.js
- .legion/playbook.md

## Design Index

- design-lite: `.legion/tasks/toc-rail/docs/design-lite.md`

## Phase Map

1. 设计：补齐任务契约与 design-lite，固定交互、状态策略和验证样本。
2. 实现：修改模板/CSS/JS，完成 TOC rail 折叠、按钮保留和状态恢复。
3. 验证与报告：运行构建、Playwright CLI、critique 式审查、代码评审，并生成报告与 PR body。

---

*创建于: 2026-03-16 | 最后更新: 2026-03-16*
