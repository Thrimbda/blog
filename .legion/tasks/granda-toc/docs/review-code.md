# Code Review Report

## 结论
PASS

无阻塞问题；当前改动基本达成了 Granda 风格下更克制、更结构化的目标，TOC partial 也能正确支撑 `page.html` / `blog-page.html` 的复用接入。

## Blocking Issues
- [ ] None.

## 建议（非阻塞）
- `templates/partials/page-outline.html:6` - TOC 渲染目前手写到 `h4`，当前可用，但可维护性一般；如果后续文章出现更深层标题，需要继续复制模板层级。
- `templates/page.html:18` - `[Edit]` 链接仍保留内联样式，和这轮把颜色/留白收敛到全局样式里的方向不完全一致。
- `templates/blog-page.html:42` - 同上，博客页和普通页的 `[Edit]` 透明度还不一致，后续维护时容易出现细节漂移。
- `static/css/style.css:200` - TOC rail 宽度、文章最大宽度、栏间距都写死在桌面断点里；这次效果是对的，但后续继续微调版式时，集中成变量会更稳。
- `templates/partials/page-outline.html:2` - 移动端 outline 默认展开，当前不算问题，但在超长文里会把正文入口继续下推；如果后面内容层级更深，可以考虑移动端默认收起。

## 修复指导
当前无需阻塞性修复。若继续打磨，建议按下面顺序收口：

1. 将 `templates/partials/page-outline.html` 改成递归 macro 渲染，避免 `h1 -> h4` 的重复模板分支。
2. 把 `templates/page.html:22` 和 `templates/blog-page.html:46` 的内联字号/透明度迁移到 `static/css/style.css` 的 `.admin-edit-link`，并统一普通页与博客页表现。
3. 在 `static/css/style.css` 中提取如 `--outline-width`、`--content-max`、`--page-gap` 之类的变量，保留当前视觉结果，同时降低后续微调成本。
4. 如果后续截图里发现移动端首屏被 TOC 占用过多，再把 `page-outline` 的默认展开策略改成仅桌面展开，或在小屏下默认关闭 `details`。
