# 测试报告

## 执行命令
`python3 - <<'PY' ...`（静态校验 `.czon/style.css` 的括号平衡、`.content` 相关 selector、以及 `.czon/dist/en-US` 中文章页/非文章页的 `sidebar-right` 结构）

`npx czon@latest build --lang en-US`

`python3 - <<'PY' ...`（校验重建后的 `.czon/dist/style.css` 仍包含 article-only selector，并复核 `en-US` 产物页面结构）

## 结果
PASS

## 摘要
- 静态检查通过，`.czon/style.css` 中与 `.content` 相关且带结构宽度属性的规则共 3 处：2 处为 `body > div:first-child > div.flex.mt-18:has(> aside.sidebar-right)` 的 article-only 作用域，剩余 1 处仅是 `@media (max-width: 640px)` 下的 `article, .content, .footer, .czon-header { max-width: 100%; }` 移动端兜底；未发现裸 `.content` 的全局结构宽度规则，`UNSCOPED_STRUCTURAL_CONTENT_RULES:0`。
- 文章页命中证明成立：抽样 `thoughts-on-ai-agent.html` 同时存在 `aside.sidebar-right` 与文章 shell 内的 `.content`，说明 article-only selector 仍可命中文章页。
- 非文章页隔离证明成立：`index.html`、`all-blog-posts.html`、`all-diary-posts.html`、`about-wangsiyuan.html` 均不含 `sidebar-right`，因此不会命中 `:has(> aside.sidebar-right)` 的文章宽度/rail 覆盖。
- 重建成功：`npx czon@latest build --lang en-US` 完成，`.czon/dist/style.css` 中仍存在 article-only `.content` selector、article shell selector 与 `max-width: 70ch;`；构建后统计到 49 个带 `sidebar-right` 的文章页。
- 构建日志仅出现 `npm warn Unknown env config "tmp"`，不影响产物，最终输出 `Build completed in 1.55s`。

## 失败项（如有）
- 无阻塞失败。
- 限制：本轮仍是静态结构验证与单语言构建验证，未做浏览器级视觉回归或像素对比。

## 备注
- 选择 `npx czon@latest build --lang en-US` 的原因：仓库 CI 在 `.github/workflows/pages.yaml` 中使用 `npx czon@latest build ...`，而本次改动只涉及共享 CSS；先跑单语言可最低成本复核构建链与 selector 落地产物。
- 补充说明“无裸 `.content` 全局结构宽度规则”：本次验证将“裸”定义为未受 `:has(> aside.sidebar-right)` 文章作用域约束、且直接控制 `.content` 宽度/左右边距的规则；按此定义当前为 0。移动端 grouped reset 仍保留，但它只在 `max-width: 640px` 下把多类容器统一收口到 `100%`，不属于桌面全局文章结构覆盖。
- 考虑过的备选项：1) 直接跑 CI 同款多语言构建；2) 只做静态 grep 不重建。最终未选 1) 是因为本轮目标是验证最新 CSS 作用域与单语言产物；未选 2) 是因为需要确认 Czon 构建后 selector 仍然存在。
