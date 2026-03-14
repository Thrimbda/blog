# 测试报告

## 执行命令
`npx czon@latest build --lang zh-Hans`

`git status --short -- ".czon/meta.json" ".czon/style.css" ".czon/dist/style.css"`

`rg -n -- "--czon-(article-shell-width|article-content-width|article-rail-width|article-rail-gap|article-offset)|max-width: var\(--czon-article-content-width\)|left: max\(1rem, calc\(50% - \(var\(--czon-article-shell-width\) / 2\)\)\)" .czon/style.css .czon/dist/style.css`

`python3 - <<'PY' ... PY`

## 结果
PASS

## 摘要
- `npx czon@latest build --lang zh-Hans` 执行成功，日志末尾为 `Build completed in 0.83s`，产物已写入 `.czon/dist/`。
- 最新 `.czon/style.css` 的 article 变量已收口到更贴近主站的组合：`1040px / 69ch / 15.5rem / 3rem / 0.25rem`，且同样被复制到 `.czon/dist/style.css`。
- 对照主站 `static/css/style.css` 的 `max-width: 1040px` 与 article `max-width: 69ch`，当前 Czon article 已回到同一几何基线。
- 按 1440px 桌面视口静态推导，article shell 左缘为 `x=200`，TOC 为 `248px / x=200`，正文起点为 `x=500`；结合本轮已知最新测量，`article 621px / x=500` 的结论成立。
- `.czon/meta.json` 在构建过程中会被 Czon 临时改写为单语言产物元数据；该文件已由 orchestrator 在验证后恢复，因此不构成最终交付差异。

## 失败项（如有）
- 无阻塞失败。
- 需要注意：`npx czon@latest build --lang zh-Hans` 会临时改写 `.czon/meta.json`，因此验证后需要把该文件恢复；当前已恢复完毕。

## 备注
- 之所以优先选 `npx czon@latest build --lang zh-Hans`，一是用户明确点名该命令，二是仓库 CI `.github/workflows/pages.yaml` 也以 `npx czon@latest build ...` 为正式构建入口；本次只跑 `zh-Hans` 是最低成本且最贴合需求的 targeted validation。
- 同时补做了 CSS 静态校验，因为这轮关注点是 article rail / offset 微调；直接核对 `.czon/style.css` 与 `.czon/dist/style.css` 的变量、再按桌面 1440 视口推导几何，能快速确认 article 是否回到主站级别组合。
- 考虑过的备选项：1) 按 CI 全量跑 5 语言构建；2) 重新跑一轮 Playwright 坐标/截图审计。前者成本更高且与本次问题无关，后者适合做最终视觉签收，但对这次“重新验证 article 微调是否落到主站几何基线”并非最低成本路径。
- `69ch` 的像素值会受字体度量影响出现极小浮动，但主站 article 本身也是 `69ch`，因此当前组合已经回到同一宽度语义；结合最新已知结果，可将目标视为达到主站 `621px / x=500` 级别。
