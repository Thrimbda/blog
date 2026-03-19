# design-lite：Cone Scroll Markdown Showcase

## 设计目标

- 提供一篇单文件、可构建、可长期复用的文章样本。
- 用尽量少的额外依赖覆盖 Cone Scroll 主题最关键的 Markdown 渲染 surface。
- 内容组织成“说明 + 示例”式文章，便于后续视觉优化时逐段观察。

## 内容结构

1. 引子：说明这篇文章的用途与观察方式。
2. 文本与层级：H2/H3/H4、段落、强调、链接、引用。
3. 列表：无序列表、有序列表、嵌套列表、任务列表。
4. 代码：行内代码 + 多语言代码块。
5. 表格与分隔：表格、水平分隔线。
6. 媒体与附注：图片、脚注。

## 覆盖矩阵

- Heading / TOC：至少 3 级标题，验证目录结构与 anchor。
- Typography：粗体、斜体、删除线、行内代码、emoji、普通链接。
- Blocks：blockquote、code fence、table、hr。
- Lists：ul、ol、nested list、task list。
- Media：至少 1 张站内图片。
- Notes：至少 1 个脚注。

## Front Matter 约定

- 放在 `content/blog/` 下，沿用博客文章模板。
- 显式设置 `slug`，便于后续截图、回归和 PR 沟通。
- 提供 tags / description / `extra.toc = true`，确保列表与文章页信息完整。

## 非目标

- 本轮不覆盖 Mermaid、shortcode、自定义 HTML 组件或主题级交互实验。
- 本轮不为所有语言生成翻译副本。
