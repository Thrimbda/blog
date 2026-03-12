# Granda 主题左侧大纲与 ASCII Logo 调整

## 目标

在当前 Granda 风格主题上增加可显示/隐藏的左侧文章大纲，并将站点标题 ASCII Logo 调整为 0xc1 风格。

## 要点

- 归档已完成的 czon-css 任务
- 新增符合当前极简主题的左侧 TOC 侧栏，并支持显示/隐藏
- 将 header ASCII 标题改成 0xc1，并换用新的 ASCII 风格
- 用 zola serve/build 做本地验证，产出 test-report/review-code/pr-body

## 范围

- templates/header.html
- templates/page.html
- templates/blog-page.html
- templates/base.html
- templates/head.html
- static/css/style.css
- static/js/script.js

## 阶段概览

1. **设计与任务初始化** - 1 个任务
2. **实现** - 3 个任务
3. **验证与报告** - 2 个任务

---

*创建于: 2026-03-11 | 最后更新: 2026-03-11*
