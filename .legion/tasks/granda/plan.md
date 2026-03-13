# Granda 主题细节收口

## 目标

在保留当前 Granda 美学基础的前提下，统一站点可见 UI 文案，为博客/日志类列表补充低声量内容线索，并把文章页的返回路径改成更明确的人话导航。


## 要点

- 不再优先处理 hierarchy/重心问题，本轮以 clarity / ux writing 收口为主
- 统一 header、footer、list、TOC、utility links 等可见文案的语言与语气
- 列表页只通过轻量摘要/标签气味增强可发现性，不引入卡片、缩略图或高声量元数据
- 将 `../slug` 式返回提示改成更明确的返回博客/返回日志文案
- 机组页保持不改


## 范围

- templates/header.html
- templates/footer.html
- templates/index.html
- templates/section.html
- templates/page.html
- templates/blog-page.html
- templates/partials/page-outline.html
- templates/tags/list.html
- templates/tags/single.html
- templates/macros/page_outline.html
- templates/macros/post_list.html
- static/css/style.css
- static/js/script.js
- content/about.md
- content/blog/_index.md
- content/diary/_index.md
- .legion/tasks/granda/docs/rfc.md

## 阶段概览

1. **设计** - 1 个任务
2. **实现** - 3 个任务
3. **验证** - 1 个任务

---

*创建于: 2026-03-11 | 最后更新: 2026-03-13*
