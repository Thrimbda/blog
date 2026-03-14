# CZON 框架缺口审计

## 结论

如果目标是“让 Czon 站点完全对齐主站，直到可以直接替代主站”，那么 **只改 `.czon/style.css` 做不到**。

这不是因为 CSS 不够细，而是因为 CZON 当前输出的 **页面语义、模板结构和默认壳层内容** 已经和主站不是同一个产品形态了。

> 补充说明：这里说“做不到”，指的是 **替代主站级别的完全对齐**。
> 如果只讨论 `home/about/list/article` 的 **比例问题**（宽度、留白、对位、header/body 几何关系），那么这部分仍然有相当一段可以继续通过 `.czon/style.css` 修复；详见 `.legion/tasks/czon/docs/proportion-critique.md`。

## 为什么 home 做不到

- 主站首页的内容源是 `.czon/src/zh-Hans/content/_index.md:1`，其中明确包含 `## 你好`、最近文章、标签、联系方式、朋友们、脚注等完整 landing page 内容。
- 但实际输出的 Czon 首页是 `.czon/dist/zh-Hans/index.html:984` 这一套 category explorer / overview 结构，首屏是 `All (60)` 与类别入口，而不是 `_index.md` 的 landing page 正文。
- 对 `.czon/dist/zh-Hans/index.html` 的检索也没有出现 `## 你好`、`联系方式`、`朋友们` 这些首页核心段落。

结论：CSS 可以改样式，但 **不能把一个“分类总览页”变成“渲染 `_index.md` 的首页模板”**。

## 为什么 about 做不到

- 主站 About 是 plain page 风格：正文从页面一开始就是作者自述。
- Czon 输出的 About 是 `.czon/dist/zh-Hans/about-wangsiyuan.html:984` 这套 article shell，额外注入了：
  - 全站左侧分类导航
  - metadata lead（分类、受众、摘要等）
  - language/share/footer chrome
  - 甚至把 frontmatter 泄漏进正文：`.czon/dist/zh-Hans/about-wangsiyuan.html:985` 到 `.czon/dist/zh-Hans/about-wangsiyuan.html:986` 直接出现 `title = "关于"` 与 `+++`

结论：CSS 可以隐藏一部分装饰层，但 **无法可靠修复页面被错误模板渲染、frontmatter 泄漏、以及 page/article 语义错位**。

## 为什么 list 做不到

- 主站列表页是 archive/list 模板：标题、说明、一组按日期排布的文章条目。
- Czon 的 `all-blog-posts` 输出在 `.czon/dist/zh-Hans/all-blog-posts.html:984` 仍然是 article shell；而且 `articleTitle` 仍被当成单页文章标题写入脚本，见 `.czon/dist/zh-Hans/all-blog-posts.html:1006`。
- 对 `.czon/dist/zh-Hans/all-blog-posts.html` 的检索没有找到主站那种 archive row 级别的文章条目 DOM，也没有出现 `legion-evolution-from-task-recorder-to-multi-agent-engineering-os.html` 这类应出现在归档列表中的内容链接。

结论：CSS 不能凭空生成主站那种 archive rows、日期列、标题列与摘要列结构；**这里缺的是列表模板，不是列表样式**。

## article 现在到什么程度

- article 是目前最接近主站的 surface。
- 本轮 CSS 已经把正文宽度、TOC rail 语气和桌面布局收口到接近主站。
- 但即便 article，也还保留了模板级差异：TOC 标题 `TABLE OF`、`[theme] [简体中文]` 工具行、固定 share/footer 机制等。

结论：article 可以靠 CSS 逼近，但 **site-wide full parity 仍然被模板层卡住**。

## 需要 CZON 框架补什么能力

### 1. 真正的页面级主题 / 模板覆写能力

- 至少要能区分并覆写：`home` / `page` / `section-list` / `post` / `archive` / `about`
- 不是只给一个 `.czon/style.css`，而是要能改 HTML 结构本身

### 2. 首页应允许直接渲染 `content/_index.md`

- 根路由 `/` 不能固定输出 category explorer
- 需要支持把 `_index.md` 当作 canonical homepage content 渲染

### 3. section index / archive 模板能力

- `content/blog/_index.md`、`content/diary/_index.md` 需要能输出真正的 archive/list DOM
- 至少要能控制：条目布局、日期位置、分页块、intro block、tag 入口

### 4. plain page 模板能力

- 对 About 这类页面，必须能选择“纯页面模板”
- 需要关闭或覆写以下内置注入：summary/audience/key points、左侧分类导航、share widget、generated-by footer、utility row

### 5. 可配置的 TOC / shell 文案

- TOC 标题、language utility、share 文案都需要可本地化或可关闭
- 否则视觉语气永远和主站不同

### 6. 稳定的 page-level hook

- 即便主题系统暂时不完整，也至少需要稳定的 page-level class / data attribute
- 这样才能让 CSS 在 `home` / `about` / `archive` / `post` 层面精确命中，而不是靠深层 DOM 猜测

## 与公开文档/路线的关系

- CZON 公开的 custom style guide 目前强调的是 `.czon/style.css` 覆盖，这解释了为什么我们现在只能改色彩、间距、宽度与可见性，不能真正改页面结构。
- 另一个公开讨论里，CZON 已经把 `.czon/themes` + JSX theme 作为方向提出来了；从这次审计看，这个方向不是“锦上添花”，而是实现主站替代级对齐的必要条件。

## 建议的框架级改动最小清单

1. 支持 `.czon/themes/<theme-name>/` 自定义模板入口
2. 支持 `home.tsx` / `page.tsx` / `post.tsx` / `section.tsx` / `archive.tsx` 这类页面级模板
3. 支持在 frontmatter 或 config 中声明 page kind / template kind
4. 支持关闭默认 metadata lead / left nav / share / generated footer
5. 支持自定义 TOC title 与 utility 文案
6. 为所有页面输出稳定的 `data-page-kind`、`data-template-kind` 等属性

## 最终判断

- 如果只在当前博客仓库里动 `.czon/style.css`：可以把 article 做得很像，但 **不能让 home/about/list 达到替代主站的程度**。
- 如果目标真的是“让 Czon 站点直接替代主站”，那么下一步就不该继续打磨 CSS，而是应该 **推动 CZON 框架提供真正的主题/模板能力**。
