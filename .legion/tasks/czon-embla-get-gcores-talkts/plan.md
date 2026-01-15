# 调研 CZON embla 轮播图并修改 get-gcores-talk.ts

## 目标

修改 get-gcores-talk.ts 以输出平铺的 markdown 图片，并集成 Embla 轮播图实现，与 CZON 保持一致

## 要点

- 调研 CZON 中 Embla 轮播图的实现细节
- 分析当前博客的模板结构和现有 slider 实现
- 修改 get-gcores-talk.ts 的图片输出逻辑，将 slideshow 宏改为多个 markdown 图片行
- 在博客模板中添加 Embla 库加载和初始化脚本
- 添加 Embla 所需的 CSS 样式
- 测试轮播图功能并确保兼容性

## 范围

- /Users/c1/Work/blog/scripts/get-gcores-talk.ts
- /Users/c1/Work/blog/templates/
- /Users/c1/Work/blog/static/js/
- /Users/c1/Work/blog/static/css/

## 阶段概览

1. **调研与分析** - 3 个任务
2. **修改 get-gcores-talk.ts** - 1 个任务
3. **集成 Embla 到博客模板** - 3 个任务
4. **测试与验证** - 3 个任务

---

 *创建于: 2026-01-15 | 最后更新: 2026-01-15*

## 设计决策

> [REVIEW:blocking] 集成方案确认
> 计划用 Embla 替换现有 slider 实现，统一轮播图方案。这将涉及修改 `slideshow` shortcode 输出 Embla 兼容结构，添加 Embla 脚本和样式，并移除现有 slider 的 JavaScript 代码。
> 请确认是否同意此方案，或希望采用其他方案（如共存）。
> 
> [RESPONSE] 用户已通过"继续"指令确认集成方案，将继续执行 Embla 替换现有 slider 的方案。
> [STATUS:resolved]

## 详细设计方案

### 核心流程
1. 修改 `get-gcores-talk.ts` 的图片输出逻辑：将 `slideshow` 宏改为多个独立的 markdown 图片行，每行一个 `![...](...)`。
2. 修改 `templates/shortcodes/slideshow.html`：输出 Embla 兼容的 HTML 结构（`.embla`, `.embla__container`, `.embla__slide`），同时保留 `.slider-container` 外层容器以保持样式兼容。
3. 在 `templates/head.html` 中添加 Embla 和 Embla Autoplay 的 CDN 脚本标签。
4. 在 `static/js/script.js` 中添加 Embla 初始化代码（或新建脚本），使其自动初始化 `.embla` 容器，并跳过已被初始化的容器。
5. 将 CZON 的 Embla CSS 样式添加到 `static/css/style.css` 中，或通过 style 标签嵌入。
6. 移除 `static/js/script.js` 中现有 slider 的 JavaScript 代码（或保留但禁用）。

### 接口定义
- Embla 容器结构：
```html
<div class="slider-container">
  <div class="embla">
    <div class="embla__container">
      <div class="embla__slide"><img src="..." /></div>
      ...
    </div>
  </div>
</div>
```

### 文件变更明细
- `scripts/get-gcores-talk.ts`：修改图片输出逻辑
- `templates/shortcodes/slideshow.html`：重写为 Embla 结构
- `templates/head.html`：添加 Embla 脚本标签
- `static/js/script.js`：添加 Embla 初始化函数，移除现有 slider 代码
- `static/css/style.css`：添加 Embla 样式，调整现有 slider 样式

### 不确定点
- 现有 slider 的 CSS 样式是否需要完全重写？可以保留外层 `.slider-container` 的样式，内部 Embla 结构使用新样式。
- Embla 自动分组逻辑是否会对其他页面中的图片产生意外影响？需要确保只针对包含 `.embla` 类或特定容器的图片组进行初始化。
