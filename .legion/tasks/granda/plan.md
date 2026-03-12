# Granda 主题细节收口

## 目标

在已建立的 Granda 主题设计门禁基础上，补充并实现“无 TOC 页面重心”设计，使首页、列表页和无 TOC 的普通页面在保持当前气质的前提下获得更平衡的版心。


## 要点

- 先在 RFC 中固化无 TOC 页面应采用的重心规则，再修改实现
- 保持当前 warm paper/ink 配色、ASCII logo、局部短 rule 和列表语言不变
- 让首页、archive/tag list、无 TOC page/article 的内容列在 shell 内获得更平衡的居中关系
- 保留有 TOC 页面当前的非对称阅读结构
- 完成 Playwright 桌面/移动端复查并更新 PR 产物


## 范围

- templates/index.html
- templates/section.html
- templates/page.html
- templates/blog-page.html
- templates/partials/page-outline.html
- templates/macros/page_outline.html
- static/css/style.css

## 阶段概览

1. **设计** - 1 个任务
2. **实现** - 3 个任务
3. **验证** - 1 个任务

---

*创建于: 2026-03-11 | 最后更新: 2026-03-12*
