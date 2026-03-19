# design-lite：Cone Scroll Markdown 渲染修复

## 目标 surface

1. 正文无序列表
2. 正文有序列表
3. Markdown 任务列表
4. 代码块语法高亮

## 设计决策

### 1. 列表 marker 只修 Markdown 内容区

- 在 `.page-article` 与首页 `.home-copy` 下重建 `ul/ol/li` 规则，避免误伤 header/nav、post list、TOC rail。
- 无序列表使用 `»` 作为 quiet marker，通过 pseudo-element 输出。
- 有序列表保留原生数字 marker，并只调颜色、字宽与间距。

### 2. 任务列表显式退出普通列表 marker

- 对含 `input[type="checkbox"]` 的 `li` 取消 `»` marker。
- checkbox 维持原生语义，但单独收口尺寸、边距、accent color 与 disabled 状态，使勾选状态清楚且与文本对齐。

### 3. 代码高亮继续沿用 highlight.js，但修复链路

- 不切换到 Zola 内建高亮：当前站点有手动 light/dark toggle，直接切换到内建 dual theme 容易与 `data-theme` 逻辑打架。
- 保留现有 highlight.js CDN 依赖，但把初始化移到 `script.js` 的 DOM ready 流程里，避免 `hljs.highlightAll()` 提前执行。
- 在 `style.css` 为常见 `.hljs-*` token 类名补本地配色，使 light/dark 模式都能稳定显示语义高亮。

## 验证策略

- 使用 `node scripts/zola-i18n.ts build` 作为站点级构建验证。
- 以 Markdown showcase 与首页正文作为回归样本，确认文章页与首页的列表 marker 都已恢复，且任务列表 input、代码块 class 与文章结构未被破坏。

## 非目标

- 本轮不重做 TOC、表格、blockquote、图片等其他 Markdown surface。
- 本轮不改动 showcase 正文内容，除非验证阶段发现必须补最小样本。
