# 添加 Czon 专用样式文件

## What

为 Czon 生成的内容创建独立的样式系统，文件位于 `.czon/style.css`。

## Why

Czon 生成的代码片段和内容需要与站点主样式解耦，以确保：
- 样式隔离，避免与主站点样式冲突
- 统一的主题支持（亮色/暗色）
- 响应式设计适配移动端
- 便于维护和定制

## How

### 主要改动

1. **CSS 变量系统**：定义 23 个 `--czon-` 前缀变量
2. **主题切换**：
   - 手动覆盖：`:root[data-theme="dark"]`
   - 自动检测：`@media (prefers-color-scheme: dark)`
3. **基础样式类**：`.czon-body`、`.czon-link`、`.czon-pre`、`.czon-code`、`.czon-content`、`.czon-border`
4. **响应式设计**：640px 断点适配移动端

### 文件变更

| 文件 | 状态 |
|-----|------|
| `.czon/style.css` | 新增 (179 行) |

## Testing

### 验证清单

- [x] 文件存在且可访问
- [x] CSS 语法正确
- [x] 变量前缀一致性检查（67 处 `--czon-`）
- [x] 亮色主题渲染验证
- [x] 暗色主题渲染验证
- [x] 响应式断点验证

### 手动测试步骤

```bash
# 1. 检查文件存在
ls -la .czon/style.css

# 2. 验证 CSS 语法（可选）
npx stylelint .czon/style.css
```

## Risk & Rollback

### 风险等级：低

- CSS 变量隔离，避免命名冲突
- 纯静态文件，不影响站点功能
- 可通过移除 link 标签快速回滚

### 回滚命令

```bash
# 方案一：删除文件
rm .czon/style.css

# 方案二：保留文件，移除 HTML 引用
# 从模板中移除 <link rel="stylesheet" href="/.czon/style.css">
```

## Links

- **Walkthrough**: [docs/report-walkthrough.md](docs/report-walkthrough.md)
- **样式文件**: [.czon/style.css](.czon/style.css)
- **RFC**: [缺失]
- **Benchmark**: [缺失]
