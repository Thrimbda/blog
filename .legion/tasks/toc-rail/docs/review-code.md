# 代码审查报告

## 结论

PASS

本次基于指定范围内的最终代码重新审查。当前实现已收敛为 `details.toggle` 单一路径驱动状态同步，并保留 `pageshow` 重新同步；按 `pathname` 持久化、无 TOC 页面兜底、移动端原生 `details/summary`、`focus-visible` 与 `prefers-reduced-motion` 处理整体成立，未发现阻塞上线的问题。

## 阻塞问题

- [ ] 无。

## 建议（非阻塞）

- `themes/cone-scroll/static/js/script.js:6` - 持久化键目前直接使用 `window.location.pathname`。在当前站点语义下是可靠的，但若后续同时存在带尾斜杠/不带尾斜杠、别名页或同内容多路径访问，会自然分裂为多份状态；这不是当前缺陷，但建议把“按 pathname 隔离状态”明确记录为约定。
- `themes/cone-scroll/static/js/script.js:49` - 首屏恢复仍然依赖 JS 在初始 HTML 渲染后将 `details.open` 改为 `false`。功能正确，但在脚本稍晚执行时，收起页可能出现一次“先展开再收起”的轻微跳变。
- `themes/cone-scroll/templates/blog-page.html:20` - `themes/cone-scroll/templates/page.html:5` - TOC shell 的 `has-outline` / `data-outline-shell` / `data-outline-state` 协议在两个模板中重复，后续若调整 rail 契约，容易出现页面间实现漂移。
- `themes/cone-scroll/static/css/style.css:307` - `themes/cone-scroll/static/css/style.css:312` - `themes/cone-scroll/static/css/style.css:352` - `1.75rem`、`6.5rem`、`1.7rem` 等数值与 toggle 高度、sticky 顶部留白、正文补偿存在隐式耦合，当前可用，但维护时需要人工联动校准。
- `themes/cone-scroll/static/css/style.css:208` - `summary:focus` 与 `summary:hover` 共用同一组样式，已具备可用焦点反馈；若后续目录文案变长或出现英文长词，建议补一次窄桌面宽度下的焦点框与单行可见性验证，避免收起态入口贴边时观感拥挤。

## 修复指导

- 对 `themes/cone-scroll/static/js/script.js`：保留当前 `toggle` 单一路径不变，并在注释或主题文档中明确 `page-outline:${pathname}` 的存储策略；如果未来要跨别名复用状态，再统一做 pathname 归一化，而不是在本轮提前引入额外规则。
- 对首屏恢复：若后续想继续消除跳变，可考虑在模板层提前输出更接近存储态的初始标记，或在更早执行的内联脚本里先恢复 `data-outline-state` / `details.open`，再交给现有 `toggle` 同步路径接管。
- 对模板维护性：把带 TOC 的外层 shell 提取为 partial 或 macro，统一承载 `has-outline`、`data-outline-shell`、`data-outline-state="expanded"`，`blog-page.html` 与 `page.html` 只传文章内容和额外 class。
- 对 CSS magic number：把 rail 宽度、sticky top、nav 最大高度补偿、collapsed article 顶部让位收敛为少量 CSS 变量，例如 `--outline-sticky-top`、`--outline-toggle-offset`，减少后续字号或 spacing 调整时的连锁修改。
- 对可访问性与边界：继续保持移动端原生 `details/summary` 与 reduced-motion 分支；后续如有 polish 预算，优先补一轮“无 TOC 页面 / 移动端 / 窄桌面 / 键盘 Tab 焦点 / 浏览器后退 pageshow”回归检查。

[Handoff]
summary:
  - 本轮重新审查结论为 PASS，当前版本没有阻塞性问题。
  - `details.toggle` 已成为唯一状态同步来源，`pageshow` 重同步保留合理。
  - 按 `pathname` 持久化在当前实现中可靠，但建议作为显式约定记录下来。
  - 剩余问题主要是首屏轻微跳变、模板重复和 CSS magic number，均属非阻塞维护项。
decisions:
  - 维持 PASS，不把首屏状态恢复跳变提升为 blocking。
  - 维持 PASS，不把 `pathname` 粒度持久化视为缺陷，而视为当前设计选择。
risks:
  - 收起态页面在脚本较晚执行时可能短暂出现展开态布局。
  - 后续若修改 toggle 文案、字号或 sticky 间距，相关 magic number 可能同步失配。
files_touched:
  - path: /Users/c1/Work/blog/.legion/tasks/toc-rail/docs/review-code.md
commands:
  - (none)
next:
  - 如需继续 polish，优先抽取 TOC shell 模板并收敛 CSS 变量。
  - 如需继续验证，补一轮 pageshow 返回场景和窄桌面焦点可见性检查。
open_questions:
  - (none)
