# Design Playbook

## Granda 设计标准

- 当前实现和当前 Playwright 截图是 source of truth。
- 原始 `0xc1.space` 产物仅用于提供列表语言灵感，不用于整体主题回退。
- 保留温暖的 paper/ink 配色、收窄的阅读宽度、ASCII logo、局部短 rule，以及纯背景索引式列表。
- 不得引入 cards、chips、盒状 widgets、全宽 chrome 分隔线、高声量元数据或装饰性 motion。
- 评审时要求提供与 surface 对应的证据：受影响的模板/CSS 文件，以及该 surface 的对应截图。
- 如果某个变更 surface 破坏了必须保留的特征、引入了禁止特征，或缺少要求的证据，则该主题评审失败。
- 当前最高优先级不是重做大框架，而是收口：首页层级、About 编辑节奏、文本化 theme toggle、可用但安静的 TOC/meta、以及更有材料感的暗色模式。

## [Convention] 壳层文案与列表气味

- 默认中文站点的可见壳层文案（header/footer/pagination/TOC/utility links/section titles）应保持中文一致，不再漏出主题默认英文残留。
- archive / tag-entry 列表允许增加一行 muted 的 tags/摘要气味，帮助新访客判断内容方向。
- 这行气味必须退后于 `marker + title + filler + date/count` 的主轴，且不得演化成 cards、badges、缩略图或高声量摘要块。

## [Pitfall] Czon 文章壳层的残留侧向 padding

- Czon 文章页即使覆盖了 `.content` 宽度，也常常仍保留外层 `main.w-full.lg:pl-88.xl:pr-88` 的桌面侧向 padding；如果不先清掉这层预留，正文会看起来异常狭窄。
- 做 Czon 文章页视觉同步时，优先检查 `.czon/dist/*.html` 的真实 shell，而不是只盯着 `.czon/style.css` 里的 `max-width` 变量。
- 若只想影响带 TOC 的文章页，优先把 widening/rail 规则绑定到 `aside.sidebar-right` 存在的场景，避免误伤首页、列表页和 About。

## [Convention] 收起 TOC 时要连 rail 占位一起收起

- 在 Granda / Cone Scroll 这类 quiet article shell 里，收起 TOC 不能只隐藏目录内容；必须连同 rail 宽度、gap 和分隔线一起折叠，否则会留下“目录没了但空列还在”的视觉残影。
- 展开入口应保持文本化、小声量，优先复用 `details/summary`，避免额外做成盒状按钮、浮层 tab 或 sticky widget。
- 如果需要记忆开合状态，优先按 `pathname` 做本地持久化，并保留清晰的 keyboard focus 状态。

## [Convention] Zola 多语言内容由 `.czon/src` 驱动

- 主站默认语言固定为 `zh-Hans`；`content/**/*.md` 只承载默认语言内容，非默认语言统一生成到 `content/**/*.<lang>.md`。
- 非默认语言内容的唯一真源是 `.czon/src/<lang>/content/**/*.md`；统一入口是 `node scripts/zola-i18n.ts`，其中 `build` 走无污染临时工作区，`sync`/`clean` 仅用于调试或清理。
- 主题壳层文案统一走 `lang + trans()`，内部链接统一走 `get_url(..., lang=...)` / `get_taxonomy_url(..., lang=...)`；语言切换只对 page/section 做精确跳转，taxonomy 与无翻译页面回稳定入口。
