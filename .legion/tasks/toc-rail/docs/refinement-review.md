# optimize / polish / normalize / harden 检查

## optimize

- 保持零新增依赖，仅复用现有 `details/summary` 和轻量 JS 状态同步。
- 状态切换主要由 CSS 变量驱动，未引入重布局脚本或额外监听器风暴。

## polish

- 为 `summary` 补充 hover / focus-visible 状态，增强可发现性但不做盒状按钮化。
- 收起态正文宽度回到 `70ch`，让版式更接近无 TOC 文章。

## normalize

- 新交互继续沿用站内已有的 text-like affordance、paper/ink token 和 quiet rail 语言。
- 博客页与普通页面都走同一套 `data-outline-state` 状态模型，没有分叉出第二套实现。

## harden

- `localStorage` 访问继续包在 `try/catch` 中，并过滤非法存储值，只接受 `expanded` / `collapsed`。
- 保留 `details/summary` 原生语义与键盘可达性；移动端验证无横向溢出。

## 结论

PASS
