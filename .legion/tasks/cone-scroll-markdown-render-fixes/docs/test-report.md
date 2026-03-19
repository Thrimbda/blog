# 测试报告

## 执行命令
- `node --check themes/cone-scroll/static/js/script.js`
- `node scripts/zola-i18n.ts build`
- 在临时工作区 `<preview_root>/repo` 执行：
  - `node scripts/zola-i18n.ts sync`
  - `zola build --force --base-url "http://127.0.0.1:4174" --output-dir "<preview_root>/site"`
- `python3 -m http.server 4174 --bind 127.0.0.1 --directory "<preview_root>/site"`
- `node ".legion/tasks/cone-scroll-markdown-render-fixes/docs/playwright-diagnose.cjs"`
- `".legion/tasks/cone-scroll-markdown-render-fixes/docs/node_modules/.bin/playwright" test ".legion/tasks/cone-scroll-markdown-render-fixes/docs/playwright-check.spec.cjs" --reporter=line`

## 结果
PASS

## 摘要
- 已验证事实：`themes/cone-scroll/static/js/script.js` 通过 `node --check`，最新改动没有引入 JS 语法错误。
- 已验证事实：`node scripts/zola-i18n.ts build` 成功完成，输出 `generated=236`，Zola 构建完成并创建 281 pages / 14 sections。
- 已验证事实：不能直接用仓库现有 `public/` 作为本轮最终浏览器验收基线；本次改为在临时工作区重建站点，并通过 `--base-url http://127.0.0.1:4174` 生成真正引用本地 `css/style.css` / `js/script.js` 的预览产物。
- 已验证事实：`playwright-diagnose.cjs` 在本地 preview 上确认了关键前提：`firstListItemBefore = "\"»\""`、`firstOrderedItemBefore = "counter(article-list) \".\""`、`taskListClassCount = 1`、`taskItemClassCount = 4`、`pageErrors = []`。
- 已验证事实：Playwright CLI 验收 PASS，覆盖 `/`、`/blog/`、`/about/`、`/diary/`、`/tags/`、`/blog/markdown-render-showcase/`，并额外检查 showcase 的 dark theme；截图已写入任务 docs 目录。
- 已验证事实：showcase 页面中的无序列表 marker 为 `»`，有序列表 marker 正常，task list checkbox 不再混入普通 marker，代码高亮在 light/dark 下均可见且 token 颜色与正文前景色区分明确。
- 已验证事实：首页 `.home-intro` 中的 Markdown 有序列表、以及 `.home-secondary` 中的 Markdown 无序列表，现已继承与文章页一致的正文 marker 规则；Playwright 断言确认首页有序列表 marker 不再为 `none`，首页无序列表 marker 为 `»`。

## 失败项（如有）
- 无。

## 备注
- 为什么新增本地 preview 链路：仓库 `config.toml` 的 `base_url` 指向 `https://0xc1.space`，若直接 `python3 -m http.server public`，页面会把关键 CSS/JS 解析到线上资源，无法可靠证明本地最新 theme 改动已经生效。
- 本轮额外修复了一个回归缺口：之前列表规则只绑在 `.page-article`，导致首页 `.home-copy` 中的 Markdown 有序/无序列表在 `reset.css` 之后仍丢失 marker；现已通过扩展正文列表作用域修复，并补上首页断言。
- 本轮 Playwright CLI 已满足用户要求的浏览器级验收；如 reviewer 还想快速人工 spot check，可直接查看任务 docs 下生成的 `playwright-*.png`。
- 诊断过程中仍可见 giscus 的跨域 warning / discussion-not-found 提示，以及个别 404 console message；当前未观察到它们对 Markdown 列表 marker、任务列表或 highlight.js 验收造成阻断，因此按非阻塞记录。
