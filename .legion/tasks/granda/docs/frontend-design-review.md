# 前端设计审查报告

## 结论
PASS

## 总体判断

当前主题方向是成立的，而且已经明显脱离了“普通极简博客皮肤”的无差别感。它最有价值的地方，不是某个单独的视觉花样，而是几组关系同时成立：暖纸色背景、克制的墨色正文、ASCII logo、非卡片式索引列表，以及收窄后的阅读宽度。这些核心特征在首页、列表页、文章页和暗色模式里基本保持一致，因此这轮设计审查不建议打回重做。

从设计 gate 看，当前实现满足 RFC 和 playbook 里最重要的保留项：没有回退到旧站整体主题，没有引入卡片/chip/widget 化表层，也没有把 header/footer 做成通栏 chrome。真正拖后腿的不是方向错误，而是几个“还不够准”的细节：TOC 的可用性偏弱、theme toggle 的控件感略重、无 TOC 页面里 header/footer 与正文的关系还可以再更自然一点，以及移动端索引列表在长标题下会损失一部分扫描节奏。

## 做得最好的地方

- `static/css/style.css:8` - 亮色模式的 paper/ink 配色非常稳，`--bg`、`--fg`、`--border` 的关系让页面有纸面感，但没有做旧或伪文艺的过度表演；`audit-home-desktop.png`、`audit-blog-list-desktop.png` 证明这一点在内容页和列表页都成立。
- `templates/index.html:14` 与 `static/css/style.css:516` - 首页 recent posts 已经回到非常干净的 `» title` 语言，这比常见博客首页的摘要卡片更有记忆点；`audit-home-desktop.png`、`audit-home-mobile.png` 上的扫描速度是好的。
- `templates/section.html:14`、`templates/tags/list.html:5`、`templates/tags/single.html:10` 与 `static/css/style.css:533` - archive/tag 列表的 marker + title + filler + date/count 结构是目前最成功的设计语法，既借到了索引感，也没有把页面做成“终端 cosplay”；`audit-blog-list-desktop.png` 的横向扫描体验尤其成熟。
- `templates/header.html:8` 与 `templates/footer.html:11`，配合 `static/css/style.css:71`、`static/css/style.css:214` - header/footer 都维持了文本式框架和短 rule，存在感低但辨识度强，没有抢主体内容。
- `templates/blog-page.html:3` 与 `static/css/style.css:229` - 带 TOC 的文章页采用非对称双列是对的，正文宽度仍然被控制住，`audit-article-desktop.png` 说明它比把整页做成居中单栏更有结构感。
- `audit-home-dark.png`、`audit-article-dark.png` 对应 `static/css/style.css:19` 和 `static/css/style.css:32` - 暗色模式没有另起一套风格，仍然是同一设计语言的夜间版本，这一点很难得。

## 阻塞问题

- [ ] 无阻塞问题。本次审查未发现破坏 RFC/playbook 核心设计契约的项；当前版本可视为通过设计 gate。

## 主要问题

- [important] `static/css/style.css:145`、`static/css/style.css:170`、`static/css/style.css:697` - TOC 的层级语气有点“过度谦让”，已经接近可用性被牺牲的边缘。`summary` 只有 `0.72rem` 且全大写，目录正文只有 `0.88rem`，再叠加 muted 对比度后，在 `audit-article-desktop.png`、`audit-article-mobile.png`、`audit-article-dark.png` 里都显得偏小偏轻。它确实没有喧宾夺主，但现在略微走到了“存在了却不好用”的那一侧。
- [important] `templates/header.html:26` 与 `static/css/style.css:429`、`static/css/style.css:445` - theme toggle 是当前 header 里唯一明显带“控件盒子感”的元素。`audit-home-desktop.png`、`audit-blog-list-desktop.png` 中它像一个小型 UI 按钮插在文本导航里，和 ASCII logo + 文本 nav 的语言不是完全同一套，轻微破坏了 header 的纯文本气质。
- [important] `static/css/style.css:67`、`static/css/style.css:71`、`static/css/style.css:208`、`static/css/style.css:214` - 无 TOC 页面里，header/footer 作为局部锚点是成立的，但正文起点和收束与这两个锚点之间还缺一层更自然的呼应。`audit-home-desktop.png`、`audit-about-desktop.png` 上能看到：header 很精致，正文也舒服，但两者像各自成立，而不是同一张版面里自然接上。问题不在宽度，而在节奏衔接略松。
- [polish] `static/css/style.css:570` - 移动端 archive/tag 列表在长标题下会从“索引式横向扫描”退化成“标题堆叠 + 日期补行”。`audit-blog-list-mobile.png` 还不算难看，但 compared to desktop 的利落感，移动端节奏明显更钝，尤其中文长标题会放大这个问题。
- [polish] `static/css/style.css:24`、`static/css/style.css:454`、`static/css/style.css:666` - 暗色模式下的 muted 文本整体安全，但页边信息略偏虚。`audit-article-dark.png` 中 TOC、meta、`[Edit]`、部分次级文字已经接近“看得见但不想看”，设计上安静是对的，但可读性还有一点余额可以拿回来。

## 建议（非阻塞）

- `static/css/style.css:145` - 建议把 TOC summary 从“标签感”往“可读的辅助导航”轻推一步，例如略增字号、减轻 letter-spacing，避免它只剩装饰性的 rail 标题。
- `static/css/style.css:170` - 建议让 TOC 链接在默认态比现在再清楚半级，尤其暗色模式；不要把修正做成高对比强调，只要让它从“费力辨认”回到“顺手可用”。
- `templates/header.html:26` - 建议把 theme toggle 进一步文本化，减少边框按钮感；这个位置更适合“行内符号”而不是“小工具按钮”。
- `static/css/style.css:67` 与 `static/css/style.css:208` - 建议重新校准首屏内容与 header/footer 的垂直节奏，让正文第一块和 footer 收尾更像版式编排，而不只是默认 margin 的叠加结果。
- `static/css/style.css:570` - 建议继续优化移动端列表的 hanging rhythm，让日期更像同一条索引的次级尾注，而不是掉到下一段的新行。
- `static/css/style.css:666` - 建议提高暗色模式下 utility/meta 的下限可读性，尤其是 `[Edit]` 这类本就弱化的 affordance，避免“弱化”变成“消失”。

## 优先级最高的改进建议

1. 先修 TOC 的可读性，而不是继续动大框架。当前站点最接近“体验损失”的地方不是首页也不是列表，而是文章页 TOC 太轻。优先调整 `static/css/style.css:145`、`static/css/style.css:170` 一带，让它仍然安静，但不再需要用户费力辨认。
2. 把 theme toggle 从“小盒子按钮”改成更文本化的 header 成员。这个改动小，但收益很高，因为它会立即让 header 更完整地回到同一种语言系统；对应 `templates/header.html:26` 与 `static/css/style.css:445`。
3. 微调无 TOC 页面首屏垂直节奏。不是改成居中大框架，也不是回到通栏分隔线，而是在 `static/css/style.css:67`、`static/css/style.css:113`、`static/css/style.css:208` 这几处重新校准 header/main/footer 的距离关系，让首页和 about 页更“整版”。
4. 最后再处理移动端列表密度。`static/css/style.css:570` 目前可用但不够漂亮，这属于能明显增色、但不影响 gate 通过的第四优先级。

## 修复指导

- 关于 TOC：以“增强可用性，不增加声量”为原则。优先改字号、行高、对比度和字距，不要加背景、边框盒子或 sticky 卡片感。桌面端目标是让 rail 一眼可读；移动端目标是让展开后能连续扫读，而不是像辅助注释。
- 关于 theme toggle：优先改成与 nav 同语气的行内切换 affordance，例如更接近文本链接/括号符号/轻量字符切换；保留清晰 focus 状态，但避免默认态就是一个描边方块。
- 关于无 TOC 页面构图：不要再做大规模重心迁移。更合适的修法是精修 vertical rhythm，例如 header 下缘到首个 `h1`/首段的距离、footer 上缘到正文末尾的距离，以及短 rule 长度与正文列起始之间的关系。
- 关于移动端列表：优先从 title weight、row gap、date baseline 和缩进关系入手，让长标题换行后仍像一条索引项；不要为了修移动端而回退到卡片或多行元数据模板。
- 关于暗色模式：只提升次级信息的最低可读性，不要把暗色模式做得更亮更花。优先检查 `--muted`、`.post-meta`、`.admin-edit-link`、TOC 链接这些真正偏灰的元素。

## 是否建议继续打磨

建议继续打磨，但应当是“小刀修边”，不是再开一轮方向性重做。当前版本已经具备合并/作为基线继续演进的资格；如果还有精力，最值得投入的 20% 工作量会集中在 TOC、theme toggle 和无 TOC 页面节奏这三处。除此之外，不建议再为了“更有设计感”引入新的视觉层或更强的装饰元素。
