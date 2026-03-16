# 接入 Zola 多语言同步脚本与语言切换

## 目标

让主站以 `zh-Hans` 为默认语言，自动从 `.czon/src` 同步非中文翻译到 Zola 多语言内容，并在主题与 CI 中接入语言切换和预构建流程。

## 问题定义

当前仓库里已经同时存在 Zola 主站和 `.czon/src/{zh-Hans,en-US,ja-JP,es-ES,de-DE}` 的多语言内容，但主站 `config.toml` 仍是单语言配置，`content/` 也只有默认中文文件。主题模板大量直接写死 `/blog`、`/about`、`/tags`、中文/英文二选一文案以及 `current_lang == "en"` 的判断，因此即使补齐 Zola 多语言配置，导航、标签页、返回链接、RSS 和主题按钮附近的壳层文案也不会自动切到当前语言。与此同时，GitHub Pages workflow 在 `zola build` 前没有任何内容同步步骤，导致 `.czon/src` 中现成的翻译无法进入主站构建输出。

## 验收

- `config.toml` 将主站默认语言切到 `zh-Hans`，并注册 `en-US`、`ja-JP`、`es-ES`、`de-DE` 的 Zola 多语言配置。
- 新增一个 Node 24 可直接运行的 `scripts/*.ts` 脚本，把 `.czon/src/<lang>/content/**/*.md` 稳定同步为 `content/**/*.<lang>.md`，并清理失效的已生成翻译文件；重复执行结果保持幂等。
- `themes/cone-scroll/` 的 header/footer/page/tag shell 改为语言感知：内部导航、返回链接、标签链接、RSS、`html lang` 与可见文案都指向当前语言路径；theme toggle 旁新增一个简单、低声量的语言选择下拉。
- GitHub Pages workflow 会在 `zola build` 之前执行该同步脚本，确保 CI 构建出的主站包含多语言页面。
- 运行 `zola build` 成功，并能在输出目录中看到默认语言根路径和其他语言子路径。

## 假设

- 仓库根 `content/**/*.md` 继续作为默认语言 `zh-Hans` 的内容真源，不对默认语言做自动生成覆盖。
- `.czon/src/<lang>/content/**/*.md` 是非默认语言内容的唯一真源；脚本生成出的 `content/**/*.<lang>.md` 可以被完全覆盖和删除，不保留人工手改。
- 本轮语言切换以下拉跳转为主，不额外引入新的前端依赖，也不重做整体 header 信息架构。

## 约束

- 仅允许修改本任务 Scope；若实现中发现必须越界，先更新 `plan.md` 再继续。
- 脚本必须在当前 Node 24 环境下直接运行，不新增 `ts-node`、构建步骤或 `package.json` 依赖链。
- 保持 `cone-scroll` 当前 quiet / text-first 主题气质，语言下拉应与现有文本化 theme toggle 并列，而不是引入高声量控件。
- 任务过程文档只落盘到 `.legion/tasks/zola/`，不把一次性设计/报告写入仓库根 `docs/`。

## 风险与规模

- 风险等级：Medium
- 规模标签：medium
- 设计策略：RFC（短版）
- 额外标签：无 `epic`、无 `rfc:heavy`、无 `risk:high`
- 理由：该任务会同时改动站点路由配置、主题模板、前端脚本、CI 构建链路以及大量生成内容文件，属于跨模块可见行为变化；但不涉及 auth/payment/data migration，且整体可通过回退脚本与配置稳定回滚。

## 要点

- 先确认 Zola 多语言配置、内容命名和模板语言变量的最小可行方案，再进入实现。
- 让 `.czon/src` 中已存在的翻译成为主站构建输入，而不是手工复制少量页面。
- 主站默认语言必须是 `zh-Hans`；其他语言通过 Zola 规范的 `/{lang}/` 子路径输出。
- 主题壳层需要从“中文 + 英文特判”升级为通用语言感知，不只修 header 一个点。

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
