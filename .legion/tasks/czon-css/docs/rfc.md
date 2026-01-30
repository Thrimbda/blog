# RFC: Czon 专用样式文件创建

**RFC ID**: rfc-2026-01-czon-style
**Status**: Under Review
**Author**: Architecture Team
**Date**: 2026-01-30

---

## 1. 摘要 (Summary)

本 RFC 旨在为 czon 生成的内容创建独立的样式文件 `.czon/style.css`。该文件将遵循 Czon 自定义样式指南的规范，为 czon 生成的 HTML 页面提供定制化的样式支持。

**核心目标**：
- 创建独立的 czon 样式文件，不影响 Zola 主站样式
- 使用带 `--czon-` 前缀的 CSS 变量系统，避免命名冲突
- 支持亮色/暗色主题切换
- 提供品牌色、内容宽度、代码块样式等定制能力

---

## 2. 需求背景

### 2.1 Czon 自定义样式指南

根据 [Czon 自定义样式指南](https://czon.zccz14.com/zh-Hans/czon-custom-style-guide.html)：

- 在项目的 `.czon/` 目录下创建 `style.css` 文件
- Czon 构建时会检测并复制该文件到输出目录 `.czon/dist/style.css`
- 在每个生成的 HTML 页面中自动添加样式链接
- 自定义样式在内置样式之后加载，可覆盖默认样式

### 2.2 变量命名策略

为避免与 Zola 主站或其他第三方样式冲突，所有自定义变量使用 `--czon-` 前缀：

| 前缀 | 示例 | 用途 |
|------|------|------|
| 变量 | `--czon-bg-primary` | 所有自定义 CSS 变量 |
| 类名 | `.czon-content` | 所有自定义 CSS 类 |

### 2.3 项目现状

| 文件/目录 | 状态 | 说明 |
|-----------|------|------|
| `.czon/` | ✅ 存在 | 项目已有 .czon 目录 |
| `.czon/style.css` | ❌ 不存在 | 需要创建 |
| `static/css/` | ✅ 存在 | Zola 主站样式目录 |

---

## 3. 设计方案 (Proposed Design)

### 3.1 文件结构

```
your-project/
├── .czon/
│   ├── meta.json          # 现有
│   └── style.css          # 新建 - Czon 专用样式
├── static/
│   └── css/
│       ├── reset.css      # Zola 主站
│       ├── suCSS.css      # Zola 主站
│       └── style.css      # Zola 主站
└── ...
```

### 3.2 `.czon/style.css` 内容

```css
/* ========================================
   Czon 专用样式文件
   文件路径: .czon/style.css
   使用 --czon- 前缀避免命名冲突
   ======================================== */

/* 1. CSS 变量定义 - 亮色模式 */
:root {
  /* 背景色变量 */
  --czon-bg-primary: #ffffff;
  --czon-bg-secondary: #f8fafc;
  --czon-bg-tertiary: #f1f5f9;

  /* 文字色变量 */
  --czon-text-primary: #1a1a2e;
  --czon-text-secondary: #475569;
  --czon-text-muted: #94a3b8;

  /* 链接色变量 */
  --czon-link-color: #2563eb;
  --czon-link-hover-color: #1d4ed8;
  --czon-link-visited-color: #7c3aed;

  /* 边框色变量 */
  --czon-border-color: #e2e8f0;
  --czon-border-focus: #3b82f6;

  /* 强调色变量 */
  --czon-accent-primary: #3b82f6;
  --czon-accent-secondary: #8b5cf6;

  /* 代码块变量 */
  --czon-code-bg: #f1f5f9;
  --czon-code-text: #1a1a2e;
  --czon-code-font-family: 'JetBrains Mono', 'Fira Code', monospace;

  /* 内容区域宽度 */
  --czon-content-width: 60rem;
  --czon-content-width-mobile: 100%;
}

/* 2. CSS 变量定义 - 暗色模式 */
:root[data-theme="dark"] {
  --czon-bg-primary: #0f172a;
  --czon-bg-secondary: #1e293b;
  --czon-bg-tertiary: #334155;

  --czon-text-primary: #f8fafc;
  --czon-text-secondary: #cbd5e1;
  --czon-text-muted: #64748b;

  --czon-link-color: #60a5fa;
  --czon-link-hover-color: #93c5fd;

  --czon-border-color: #334155;
  --czon-border-focus: #60a5fa;

  --czon-accent-primary: #3b82f6;
  --czon-accent-secondary: #a78bfa;

  --czon-code-bg: #1e293b;
  --czon-code-text: #f8fafc;
}

/* 3. 基础样式覆盖 */
.czon-body {
  background-color: var(--czon-bg-primary);
  color: var(--czon-text-primary);
}

/* 4. 链接样式 */
.czon-link {
  color: var(--czon-link-color);
}

.czon-link:hover {
  color: var(--czon-link-hover-color);
}

/* 5. 代码块样式 */
.czon-pre {
  background-color: var(--czon-code-bg);
  color: var(--czon-code-text);
  font-family: var(--czon-code-font-family);
}

/* 6. 内容区域样式 */
.czon-content {
  max-width: var(--czon-content-width);
  margin: 0 auto;
  padding: 0 1rem;
}

@media (max-width: 640px) {
  .czon-content {
    max-width: var(--czon-content-width-mobile);
    padding: 0 0.75rem;
  }
}
```

### 3.3 主题切换机制

```css
/* 自动检测系统主题偏好（作为回退） */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]):not([data-theme="dark"]) {
    /* 使用暗色变量作为默认回退 */
    --czon-bg-primary: #0f172a;
    --czon-text-primary: #f8fafc;
    --czon-bg-secondary: #1e293b;
    --czon-text-secondary: #cbd5e1;
    --czon-bg-tertiary: #334155;
    --czon-text-muted: #64748b;
    --czon-link-color: #60a5fa;
    --czon-link-hover-color: #93c5fd;
    --czon-border-color: #334155;
    --czon-code-bg: #1e293b;
    --czon-code-text: #f8fafc;
  }
}

/* 手动主题覆盖 - 亮色（优先级最高） */
:root[data-theme="light"] {
  --czon-bg-primary: #ffffff;
  --czon-text-primary: #1a1a2e;
  --czon-bg-secondary: #f8fafc;
  --czon-text-secondary: #475569;
  --czon-bg-tertiary: #f1f5f9;
  --czon-text-muted: #94a3b8;
  --czon-link-color: #2563eb;
  --czon-link-hover-color: #1d4ed8;
  --czon-border-color: #e2e8f0;
  --czon-code-bg: #f1f5f9;
  --czon-code-text: #1a1a2e;
}

/* 手动主题覆盖 - 暗色（优先级最高） */
:root[data-theme="dark"] {
  --czon-bg-primary: #0f172a;
  --czon-text-primary: #f8fafc;
  --czon-bg-secondary: #1e293b;
  --czon-text-secondary: #cbd5e1;
  --czon-bg-tertiary: #334155;
  --czon-text-muted: #64748b;
  --czon-link-color: #60a5fa;
  --czon-link-hover-color: #93c5fd;
  --czon-border-color: #334155;
  --czon-code-bg: #1e293b;
  --czon-code-text: #f8fafc;
}
```

### 3.4 定制钩子（用户可覆盖）

```css
/* 用户可在 .czon/style.css 末尾添加自定义样式 */

/* 示例：自定义品牌色 */
:root {
  --czon-link-color: #e91e63;
  --czon-link-hover-color: #c2185b;
}

/* 示例：调整内容区域宽度 */
.czon-content {
  max-width: 72rem;
}

/* 示例：使用自定义字体 */
:root {
  --czon-code-font-family: 'Fira Code', 'Cascadia Code', monospace;
}
```

---

## 4. 实施计划

### 4.1 实施步骤

| 阶段 | 任务 | 输出物 | 备注 |
|------|------|--------|------|
| **Phase 1** | 创建 `.czon/style.css` 文件 | 初始样式文件 | 包含基础变量定义 |
| **Phase 2** | 定义 CSS 变量 | 完整的变量集 | 亮色/暗色模式 |
| **Phase 3** | 添加样式覆盖规则 | 样式规则 | 链接、代码块等 |
| **Phase 4** | 本地构建测试 | 验证构建产物 | 确认样式被正确复制 |
| **Phase 5** | 浏览器验证 | 视觉测试 | 检查样式效果 |

### 4.2 风险评估

| 风险 | 概率 | 影响 | 缓解措施 |
|------|------|------|----------|
| 样式覆盖优先级问题 | 低 | 低 | Czon 样式在内置样式之后加载 |
| 暗色模式不生效 | 低 | 中 | 测试 prefers-color-scheme 媒体查询 |
| 构建时文件未复制 | 低 | 高 | 验证 Czon 构建配置 |

### 4.3 回退方案

```bash
# 1. 移除样式文件
rm .czon/style.css

# 2. 运行构建验证回退
czon build

# 3. 验证构建产物中不存在自定义样式
ls -la .czon/dist/

# 或恢复备份
git checkout .czon/style.css.bak
```

---

## 5. 验收标准

| ID | 标准描述 | 验收方法 |
|----|----------|----------|
| AC-01 | `.czon/style.css` 文件存在 | 文件系统检查 |
| AC-02 | 文件包含 `--czon-` 前缀的 CSS 变量 | 代码审查 |
| AC-03 | 构建时文件被复制到输出目录 | 构建产物检查 |
| AC-04 | 暗色模式变量正确应用 | 浏览器 DevTools |
| AC-05 | 变量前缀 `--czon-` 一致性 | 代码审查 |
| AC-06 | 回退方案可正常恢复内置样式 | 构建验证 |

---

## 6. 附录

### 6.1 CSS 变量完整对照表

| 变量 | 亮色默认值 | 暗色默认值 | 用途 |
|------|------------|------------|------|
| `--czon-bg-primary` | `#ffffff` | `#0f172a` | 主背景 |
| `--czon-bg-secondary` | `#f8fafc` | `#1e293b` | 次级背景 |
| `--czon-bg-tertiary` | `#f1f5f9` | `#334155` | 三级背景 |
| `--czon-text-primary` | `#1a1a2e` | `#f8fafc` | 主文字 |
| `--czon-text-secondary` | `#475569` | `#cbd5e1` | 次级文字 |
| `--czon-text-muted` | `#94a3b8` | `#64748b` | 弱化文字 |
| `--czon-link-color` | `#2563eb` | `#60a5fa` | 链接色 |
| `--czon-link-hover-color` | `#1d4ed8` | `#93c5fd` | 悬停色 |
| `--czon-border-color` | `#e2e8f0` | `#334155` | 边框色 |
| `--czon-code-bg` | `#f1f5f9` | `#1e293b` | 代码块背景 |
| `--czon-code-text` | `#1a1a2e` | `#f8fafc` | 代码块文字 |
| `--czon-code-font-family` | `'JetBrains Mono', ...` | `'JetBrains Mono', ...` | 代码字体 |
| `--czon-content-width` | `60rem` | `60rem` | 内容宽度 |
| `--czon-content-width-mobile` | `100%` | `100%` | 移动端宽度 |

### 6.2 类名对照表

| 类名 | 用途 |
|------|------|
| `.czon-body` | 内容主体 |
| `.czon-link` | 链接样式 |
| `.czon-pre` | 代码块样式 |
| `.czon-content` | 内容容器 |

### 6.3 相关文档

- [Czon 自定义样式指南](https://czon.zccz14.com/zh-Hans/czon-custom-style-guide.html)
- 项目现有 `.czon/meta.json`

---

## 7. Open Questions

| ID | 问题 | 状态 | 负责人 |
|----|------|------|--------|
| OQ-01 | 是否需要支持用户主题偏好持久化？ | 待定 | - |
| OQ-02 | 代码块字体是否需要定制？ | 待定 | - |

---

*本文档为设计真源，所有实施应以此为准。如有疑问，请在 Open Questions 中记录并讨论。*
