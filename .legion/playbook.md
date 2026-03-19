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

## [Convention] 面向读者的关键导航优先使用真实链接

- 对站点 header、语言切换、返回入口这类 reader-facing 关键导航，优先使用原生 `<a>` 链接；只有在真实链接无法表达时才考虑 JS 驱动控件。
- 若跨语言语义无法可靠一一映射，优先回退到同语言下的稳定列表入口，而不是生成可能失效或误导的“猜测链接”。

## [Convention] 主题视觉迭代先准备稳定 Markdown showcase 样本

- 在做文章页主题优化前，优先准备一篇可长期复用的 Markdown showcase 文章，集中覆盖标题层级、列表、任务列表、引用、代码块、表格、图片、脚注等核心 surface。
- 这篇样本应保持“可读文章”而不是语法清单，这样后续视觉判断更接近真实阅读场景。
- 若仓库已有站内图片资源，优先复用现有素材，减少主题回归时的额外变量。

## [Pitfall] reset 之后要在正文作用域内补回 Markdown 列表 marker

- 如果主题使用 reset 清掉了 `ul/ol` 默认 marker，必须在正文作用域（如 `.page-article`）内显式补回列表样式；否则文章里的无序/有序列表会直接失去阅读引导。
- 补 marker 时要把作用域限制在 markdown 内容区，避免误伤 header/nav、TOC rail、post list 等非正文列表。

## [Pitfall] 第三方高亮库不要在 head 里立即执行初始化

- 如果主题脚本与第三方高亮库都用 `defer`，不要在 `head` 中直接内联调用 `hljs.highlightAll()` 这类初始化；更稳妥的做法是让主题脚本在 `DOMContentLoaded` 之后统一初始化。
- 这样可以避免 defer 执行顺序与 `document.readyState === "interactive"` 时机造成的首屏漏初始化。

## [Pitfall] Zola 本地浏览器验收不要直接复用现成 `public/`

- 如果 `config.toml` 的 `base_url` 指向线上域名，直接对仓库现有 `public/` 跑本地静态服务时，关键 CSS/JS 很可能仍会回源到线上地址，导致本地 Playwright 结果失真。
- 更稳妥的做法是：在临时工作区先 `sync`，再用 `zola build --base-url http://127.0.0.1:<port>` 生成本地预览产物，然后只对这份产物做浏览器级验收。

## [Pitfall] 正文列表规则不要只绑定 `.page-article`

- 如果站点里存在多个 Markdown 内容容器（例如文章页 `.page-article`、首页 `.home-copy`），列表 marker 规则不能只修其中一个；否则 `reset.css` 清掉默认 `list-style` 后，其他容器里的有序/无序列表会继续失去 marker。
- 更稳妥的做法是先明确“哪些容器属于正文 Markdown surface”，再让这些容器共享同一套列表作用域规则；把 `post-list`、nav、TOC rail 等索引组件继续留在独立样式里。

## [Convention] 公开页面默认不暴露作者后台入口

- 面向读者的公开页面不默认展示 `/admin`、`[编辑]`、后台控制文案或只对作者有意义的操作入口。
- 若确有作者运营需求，应通过登录态、私有环境或明确的作者工具位承载，而不是混在公开阅读界面里。
