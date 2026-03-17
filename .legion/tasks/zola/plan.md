# 接入 Zola 多语言同步脚本与语言切换

## 目标

让主站以 `zh-Hans` 为默认语言，自动从 `.czon/src` 同步非中文翻译到 Zola 多语言内容，并继续收口主题层体验：提供稳定可跳转的语言入口，去掉公开页面里的后台痕迹。

## 问题定义

当前仓库已经完成 Zola 多语言接入与无污染构建，但用户反馈最后一段 reader-facing 体验仍未收口：其一，theme toggle 旁的语言切换在真实点击路径上仍不稳定，说明依赖 `<select>` + JS 跳转的方案仍然脆弱；其二，文章页底部公开暴露的 `[编辑]` 链接更像后台操作痕迹，而不是对普通读者有意义的行为，且当目标不稳定时会进一步削弱观感。因此本轮需要在不扩大 Scope 的前提下，把语言入口改成更稳健的公开导航，并移除公开页面里的 admin affordance。

## 验收

- `config.toml` 将主站默认语言切到 `zh-Hans`，并注册 `en-US`、`ja-JP`、`es-ES`、`de-DE` 的 Zola 多语言配置。
- 新增一个 Node 24 可直接运行的 `scripts/*.ts` 脚本，把 `.czon/src/<lang>/content/**/*.md` 稳定同步为 `content/**/*.<lang>.md`，并清理失效的已生成翻译文件；重复执行结果保持幂等。
- `themes/cone-scroll/` 的 header/footer/page/tag shell 改为语言感知：内部导航、返回链接、标签链接、RSS、`html lang` 与可见文案都指向当前语言路径；theme toggle 旁提供一个简单、低声量、点击即可稳定跳转的语言入口，而不是继续依赖脆弱的 JS 下拉。
- 公开页面不再暴露 `[编辑]` / `/admin` 入口，也不保留只对作者有意义的后台控制文案。
- GitHub Pages workflow 会在 `zola build` 之前执行该同步脚本，确保 CI 构建出的主站包含多语言页面。
- 运行 `zola build` 成功，并能在输出目录中看到默认语言根路径和其他语言子路径。

## 假设

- 仓库根 `content/**/*.md` 继续作为默认语言 `zh-Hans` 的内容真源，不对默认语言做自动生成覆盖。
- `.czon/src/<lang>/content/**/*.md` 是非默认语言内容的唯一真源；脚本生成出的 `content/**/*.<lang>.md` 可以被完全覆盖和删除，不保留人工手改。
- 本轮语言切换可以从下拉切换为更稳健的 reader-facing 导航，但仍不额外引入新的前端依赖，也不重做整体 header 信息架构。
- `[编辑]` 链接若仅服务作者运营，则本轮默认从公开页面移除，而不是改名后继续暴露。

## 约束

- 仅允许修改本任务 Scope；若实现中发现必须越界，先更新 `plan.md` 再继续。
- 脚本必须在当前 Node 24 环境下直接运行，不新增 `ts-node`、构建步骤或 `package.json` 依赖链。
- 保持 `cone-scroll` 当前 quiet / text-first 主题气质，语言入口应与现有文本化 theme toggle 并列，并优先保证读者点击后的确定性导航。
- 任务过程文档只落盘到 `.legion/tasks/zola/`，不把一次性设计/报告写入仓库根 `docs/`。

## 风险与规模

- 风险等级：Medium
- 规模标签：medium
- 设计策略：RFC（短版）
- 额外标签：`continue`；无 `epic`、无 `rfc:heavy`、无 `risk:high`
- 理由：任务整体仍属于跨模块可见行为变化，因此沿用既有 Medium 档与 RFC；本轮增量本身是低风险收口，主要改动 theme shell 的公开入口与读者可见文案，不涉及 auth/payment/data migration，且整体可通过回退模板与配置稳定回滚。

## 要点

- 先确认 Zola 多语言配置、内容命名和模板语言变量的最小可行方案，再进入实现。
- 让 `.czon/src` 中已存在的翻译成为主站构建输入，而不是手工复制少量页面。
- 主站默认语言必须是 `zh-Hans`；其他语言通过 Zola 规范的 `/{lang}/` 子路径输出。
- 主题壳层需要从“中文 + 英文特判”升级为通用语言感知，不只修 header 一个点。
- 语言入口必须优先保证读者点击就能跳转，必要时牺牲一点“控件感”，换成更朴素的链接式交互。
- 公开页面上的作者后台入口应默认隐藏，避免把运营痕迹暴露给普通读者。

## 范围

- `config.toml`
- `content/`
- `scripts/`
- `themes/cone-scroll/`
- `.github/workflows/pages.yaml`
- `.legion/playbook.md`

## Design Index

- RFC: `.legion/tasks/zola/docs/rfc.md`
- RFC 评审: `.legion/tasks/zola/docs/review-rfc.md`

## Phase Map

1. 设计：固化多语言配置、同步策略、主题路由策略和 CI 接入点，并通过 RFC 审查。
2. 实现：落地同步脚本、Zola 配置、主题模板/JS/CSS 与 workflow 改动，生成翻译文件。
3. 验证与报告：运行构建验证，完成代码/安全评审，并产出 walkthrough 与 PR body。

---

*创建于: 2026-03-16 | 最后更新: 2026-03-16*
