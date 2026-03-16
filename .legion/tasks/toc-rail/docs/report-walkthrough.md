# TOC rail 交付 walkthrough

## 目标与范围

- 任务目标：让带 TOC 的文章页在收起目录时，左侧 rail 与占位一并折叠，正文左移，并保留可再次展开的低声量入口。
- 风险级别：Low。
- 设计形式：design-lite。
- rfc: N/A (design-lite)
- 绑定 scope：`themes/cone-scroll/templates/partials/page-outline.html`、`themes/cone-scroll/templates/blog-page.html`、`themes/cone-scroll/templates/page.html`、`themes/cone-scroll/static/css/style.css`、`themes/cone-scroll/static/js/script.js`、`.legion/playbook.md`

## 设计摘要

- 设计依据见 `/.legion/tasks/toc-rail/docs/design-lite.md`，本任务不单独起 RFC，以 design-lite 作为设计索引与实现约束。
- 核心设计是继续保留原生 `details/summary` 语义，通过状态同步让桌面端 rail 宽度、gap 与边线在 collapsed 时一并退场，而不是只隐藏目录内容。
- 收起后保留文本化、低声量的展开入口，避免引入额外 widget 感，延续 quiet TOC / paper-ink 的主题语言。
- 状态按 `pathname` 写入本地存储，默认回退为展开；移动端保持单列语义，`prefers-reduced-motion` 下关闭不必要动画。

## 改动清单

### 模板与结构

- `themes/cone-scroll/templates/partials/page-outline.html`
  - 保持 `details/summary` 作为开合语义载体。
  - 为 rail 折叠与状态同步提供稳定的 outline shell / toggle 结构。
- `themes/cone-scroll/templates/blog-page.html`
  - 在博客文章页接入统一的 TOC shell 状态协议，确保有 TOC 时可切换 expanded / collapsed。
- `themes/cone-scroll/templates/page.html`
  - 普通页面与博客页复用同一套 TOC 行为，避免只在文章模板生效。

### 样式与交互

- `themes/cone-scroll/static/css/style.css`
  - 通过 CSS 变量驱动 rail 宽度、间距与边线，在收起态收敛到 `0`，让正文更接近无 TOC 页面。
  - 为收起态的展开入口提供 hover / `focus-visible` 反馈，同时保持低声量文本化表达。
  - 对移动端、窄视口与 `prefers-reduced-motion` 做兼容，避免横向溢出和多余动效。
- `themes/cone-scroll/static/js/script.js`
  - 使用 `details.toggle` 作为主要状态同步路径，并在 `pageshow` 时重新同步展示状态。
  - 按 `page-outline:${pathname}` 持久化当前页开合状态，仅接受 `expanded` / `collapsed` 合法值。
  - 对 `localStorage` 访问做 `try/catch` 保护，无 TOC 页面走安全兜底。

### 设计契约与留档

- `.legion/playbook.md`
  - 作为 quiet rail / paper-ink 语言的主题约束来源，本次实现按既有契约收敛，没有扩展为高声量控件。
- 评审与验证材料
  - 设计审查：`/.legion/tasks/toc-rail/docs/critique-review.md`
  - 收口检查：`/.legion/tasks/toc-rail/docs/refinement-review.md`
  - 代码审查：`/.legion/tasks/toc-rail/docs/review-code.md`

## 如何验证

### 构建验证

- 命令：`zola build`
- 预期：构建成功，无模板或链接检查错误。
- 结果来源：`/.legion/tasks/toc-rail/docs/test-report.md`

### 浏览器级验证

- 桌面展开态
  - 证据：`/.legion/tasks/toc-rail/docs/playwright-article-desktop-expanded.png`
  - 预期：保留原有 TOC rail 宽度与正文定位。
- 桌面收起态
  - 证据：`/.legion/tasks/toc-rail/docs/playwright-article-desktop-collapsed.png`
  - 预期：左侧 rail 折叠后 `aside width≈0`，正文左移且获得更多可用宽度。
- 移动端收起态
  - 证据：`/.legion/tasks/toc-rail/docs/playwright-article-mobile-collapsed.png`
  - 预期：单列布局稳定，无横向溢出，展开入口仍可用。
- 状态持久化
  - 预期：reload 后保持上次开合状态，默认无记录时为展开。

### 结果摘要

- `/.legion/tasks/toc-rail/docs/test-report.md` 结论为 PASS。
- 已记录关键测量：桌面 1440px 展开态 `article x≈484 / aside width≈240`；收起态 `article x≈200 / aside width≈0 / article width≈630`；移动端 390px 下 `scrollWidth == clientWidth == 390`。
- `/.legion/tasks/toc-rail/docs/critique-review.md`、`/.legion/tasks/toc-rail/docs/refinement-review.md`、`/.legion/tasks/toc-rail/docs/review-code.md` 均为 PASS。

## 风险与回滚

### 当前风险

- 首屏恢复依赖 JS 在初始渲染后同步 `details.open`，脚本较晚执行时可能出现一次轻微的先展开再收起跳变。
- 当前状态按 `pathname` 隔离；若未来存在别名页、尾斜杠差异或同内容多路径访问，状态会自然分裂。
- 当前验证覆盖桌面 1440px 与移动端 390px 两个关键视口，其它中间断点仍可能存在轻微视觉偏差。

### 回滚方式

- 本任务改动集中在模板、CSS 与少量 JS，回滚可直接撤回 `page-outline` 相关模板协议、rail 折叠样式与状态同步逻辑。
- 回滚后将恢复为原有 `details/summary` 仅控制目录内容显示、但保留左 rail 占位的行为。
- 因未引入依赖、未改内容与数据结构，回滚影响面较小。

## 未决项与下一步

- 当前无阻塞未决项，可以进入正常 review / 合并流程。
- 可选后续优化一：把博客页与普通页重复的 TOC shell 协议进一步抽为 partial 或 macro，降低模板漂移风险。
- 可选后续优化二：收敛 `style.css` 中与 toggle 高度、sticky top、正文补偿相关的 magic number，减少后续联动调参成本。
- 可选后续验证：补一轮窄桌面焦点可见性、浏览器后退 `pageshow` 场景，以及更多中间断点的视觉回归。
