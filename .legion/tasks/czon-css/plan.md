# 实现 czon 风格 CSS 主题

## 目标

创建 .czon/style.css 专用样式文件，为 czon 生成的内容提供定制化样式


## 要点

- RFC: docs/rfc.md (已通过二审)
- 新建文件: .czon/style.css（不影响 Zola 主站 CSS）
- 变量前缀: --czon- (避免命名冲突)
- 主题切换: :root[data-theme] + prefers-color-scheme 回退
- 代码块: --czon-code-font-family (JetBrains Mono)


## 范围

- static/css/suCSS.css
- static/css/style.css
- templates/*.html

## 阶段概览

1. **设计阶段** - 2 个任务
2. **实现阶段** - 5 个任务
3. **验收阶段** - 1 个任务

---

*创建于: 2026-01-30 | 最后更新: 2026-01-30*
