# Granda 主题细节收口

## 目标

在保留当前 Granda 美学基础的前提下，移除站点英文入口 `/en/`，并让长文章页面的 TOC rail 在视口内独立滚动。


## 要点

- 默认不再保留英文入口或英文首页壳层
- 继续保持当前中文壳层文案与文章返回链接语义
- 长 TOC 页面应在不放大 TOC 存在感的前提下支持独立滚动
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
