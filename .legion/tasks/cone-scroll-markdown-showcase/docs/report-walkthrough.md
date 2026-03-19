# Walkthrough：Cone Scroll Markdown Showcase

## 目标与范围

- 目标：新增一篇可长期复用的 Markdown showcase 文章，作为 Cone Scroll 主题后续视觉优化与回归验收的统一样本。
- 本轮 scope 仅覆盖以下产物：
  - `content/blog/markdown-render-showcase.md`
  - `.legion/tasks/cone-scroll-markdown-showcase/docs/test-report.md`
  - `.legion/tasks/cone-scroll-markdown-showcase/docs/review-code.md`
- 未修改主题模板、样式、构建脚本或站点配置。

## 设计摘要

- 任务契约见：`../plan.md`
- 轻量设计见：`./design-lite.md`
- 本轮按 Low risk / 非 Epic 处理，仅补齐一篇中文基线文章，不进入主题实现改动。
- 文章设计目标是“说明 + 示例”结合：既覆盖常见 Markdown surface，也保持真实文章的阅读节奏，便于后续主题优化时逐段观察。

## 改动清单

### 1. 文章基线样本

- `content/blog/markdown-render-showcase.md`
  - 新增 front matter：`title`、`date`、`slug`、`description`、`taxonomies.tags`、`extra.toc = true`。
  - 覆盖标题层级与 TOC，支持检查目录结构、锚点与扫描性。
  - 覆盖基础文本元素：段落、粗体、斜体、删除线、行内代码、链接、emoji、引用。
  - 覆盖结构化内容：无序列表、有序列表、嵌套列表、任务列表。
  - 覆盖技术内容：bash / Python 代码块。
  - 覆盖密度与节奏元素：表格、分隔线。
  - 覆盖媒体与收尾元素：站内图片 `/images/avatar.jpg`、脚注。
  - 内容组织保持可读性，可直接作为后续主题优化回归样本。

### 2. 验证与评审产物

- `./test-report.md`
  - 记录 `zola build` 执行结果与失败原因。
  - 结论：构建失败由仓库既有多语言入口问题触发，阻塞点为 `content/_index.es-ES.md` 的 `get_url` 解析，不在本次新增文章链路内。

- `./review-code.md`
  - 记录本轮代码审查结论。
  - 结论：PASS，无阻塞问题；当前文章已满足任务契约，可作为后续视觉回归基线。

## 如何验证

### 已执行

1. 构建验证
   - 命令：`zola build`
   - 预期：站点完成构建，至少能覆盖文章 front matter 解析、Markdown 渲染入口与模板链路。
   - 实际：失败。
   - 失败原因：仓库既有多语言入口问题，`content/_index.es-ES.md` 渲染时 `get_url` 无法解析 `@/_index.es-ES.md`。
   - 参考：`./test-report.md`

2. 内容与契约审查
   - 方式：对照 `../plan.md` 与 `./design-lite.md` 做静态检查。
   - 预期：front matter 与博客模板契约兼容，Markdown 覆盖达到任务要求。
   - 实际：通过。

3. 代码评审
   - 方式：审查新增文章与交付范围。
   - 预期：无 blocking 问题、无 scope 外改动。
   - 实际：PASS。
   - 参考：`./review-code.md`

### 后续建议补验

- 先修复仓库既有多语言入口问题，再补跑一次 `zola build`。
- 构建恢复后，可直接使用 `content/blog/markdown-render-showcase.md` 做主题优化前后的视觉回归对比。

## 风险与回滚

### 风险

- 当前无法用完整构建结果证明文章已进入最终全站产物，因为 `zola build` 被仓库既有多语言入口问题提前阻塞。
- 当前样本已覆盖常见 Markdown surface，但对长链接、超长代码行、极端窄屏溢出等压力场景覆盖仍偏轻。

### 回滚

- 本轮为纯新增内容，回滚成本低。
- 如需回滚，仅删除 `content/blog/markdown-render-showcase.md` 及对应任务文档即可；无需恢复主题代码或配置。

## 未决项与下一步

- 未决项：
  - 需由后续任务处理仓库既有多语言入口问题，解除 `zola build` 阻塞。
- 下一步：
  - 在构建链路恢复后，补一次完整构建验证。
  - 后续主题优化可直接拿这篇文章做回归样本，重点观察 TOC、列表缩进、代码块、表格、图片与脚注的视觉表现。
  - 若要增强回归压力，可后续小步补充长链接或长行代码样本，但不影响本轮交付。
