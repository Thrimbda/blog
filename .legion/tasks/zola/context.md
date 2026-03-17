# 接入 Zola 多语言同步脚本与语言切换 - 上下文

## 会话进展 (2026-03-16)

### ✅ 已完成

- 补齐 `plan.md`，将任务定级为 Medium，并固定默认语言、Scope、约束与验收口径
- 完成短版 RFC 与 RFC 对抗审查，收敛多语言配置、同步脚本、语言切换、CI 接入与回滚方案
- 实现 `scripts/sync-zola-i18n.ts`，从 `.czon/src` 生成 `content/**/*.<lang>.md`，并对 YAML/TOML front matter 做最小规范化
- 更新 `config.toml`、Cone Scroll 主题模板与前端脚本，接入 `zh-Hans` 默认语言、壳层翻译与语言下拉
- 在 `.github/workflows/pages.yaml` 中将同步脚本接到 `zola build` 前，并完成多语言内容生成
- 完成 `node scripts/sync-zola-i18n.ts`、`zola build`、代码评审、安全评审与 walkthrough / PR body 产出
- 补充 `scripts/build-zola-site.ts`，在临时工作区中生成翻译并执行 `zola build`，避免本地 `content/` 被派生文件污染
- 为 `scripts/sync-zola-i18n.ts` 增加 `--clean`，并清理本地已生成的 `content/**/*.<lang>.md` 文件
- 完成语言入口收口：以 `details + a` 替代 `<select>` + JS，并修正默认语言 page/section 跳转
- 移除公开页面 `[编辑]` / `/admin` 入口及其样式/翻译残留


### 🟡 进行中

- 刷新测试/评审/报告产物，确认 taxonomy term 页的 best-effort 回退策略被文档化


### ⚠️ 阻塞/待定

(暂无)


---

## 关键文件

(暂无)

---

## 关键决策

| 决策 | 原因 | 替代方案 | 日期 |
|------|------|----------|------|
| 本任务定级为 Medium，需先写短 RFC 再进入实现 | 变更会同时影响站点多语言路由、主题壳层、CI 构建链路和大量生成内容文件，属于跨模块可见行为变化，但整体仍可回滚 | 按 Low 任务直接写 design-lite；但会降低多模块改动前的对齐度 | 2026-03-16 |
| `.czon/src/<lang>/content/**/*.md` 作为非默认语言翻译真源，脚本生成的 `content/**/*.<lang>.md` 允许完全覆盖与清理 | 仓库已有完整多语言内容树，直接以 `.czon/src` 为上游最省人工且可保持 CI 重放一致性 | 手工挑选少量页面同步，或把翻译文件直接长期手改到 `content/`；两者都更容易漂移 | 2026-03-16 |
| 引入临时工作区构建包装脚本，并为低层同步脚本补 `--clean` 能力 | 当前直接把翻译文件平铺到仓库 `content/` 会污染本地工作区；使用临时工作区可以保留多语言构建能力，同时保持本地内容树整洁 | 继续直接写入 `content/` 并依赖 `.gitignore` 或手工清理；但文件系统层面的污染仍然存在 | 2026-03-16 |
| 将 `build-zola-site` 与 `sync-zola-i18n` 合并为单一入口 `scripts/zola-i18n.ts` | 对外只保留一个脚本更易理解；通过 `build` / `sync` / `clean` 子命令区分无污染构建、显式同步和清理，既减少心智负担也保留调试能力 | 继续保留两个脚本分别承担内容同步与无污染构建；但用户反馈这会增加理解成本 | 2026-03-16 |
| 语言切换改为模板内联 fallback + 脚本幂等初始化双保险 | 线上跳转失败说明仅靠外部 JS 绑定存在脆弱点；把跳转兜底放回 `<select onchange=...>`，并让脚本在 `DOMContentLoaded`/`pageshow` 都可重绑，可以覆盖缓存恢复或脚本初始化时序问题 | 继续只依赖 `script.js` 的 change 监听；但这会让部署站点在某些初始化路径上继续失效 | 2026-03-16 |
| 放弃 `<select>` + JS 的语言切换，改为以真实链接为核心的低声量语言入口 | 用户已反馈线上点击仍不跳转，说明控件式切换在真实环境下仍有脆弱路径；直接使用 reader-facing 链接可以把导航可靠性前移到 HTML 层 | 继续修补 `change` 事件、内联 `onchange` 或额外补脚本重绑；但仍然依赖脚本时序与浏览器事件行为 | 2026-03-17 |

---

## 快速交接

**下次继续从这里开始：**

1. 将 `.legion/tasks/zola/docs/pr-body.md` 作为 PR 描述提交 Review
2. 若后续要进一步提升 taxonomy term 跨语言保真度，可考虑为 tag 建独立跨语言映射表

**注意事项：**

- 当前语言入口已不再依赖 JS 跳转；article/diary/section/taxonomy list 均命中目标语言页面
- taxonomy term 页采用 best-effort term 保留；当跨语言 tag 语义无法可靠推断时会稳定回退到目标语言 tags 列表页
- `node scripts/zola-i18n.ts build` 通过，仍保留 18 个既有 `diary-2026` broken anchor warning，性质不变

---

*最后更新: 2026-03-17 15:40 by Claude*
---

*最后更新: 2026-03-16 15:05 by Claude*
意事项：**

- 当前交付已完成；`zola build` 通过，存在 18 个非阻塞 translated diary broken anchor warning
- 非默认语言派生页已隐藏 edit 入口；语言切换遵循 page/section 精确跳转、taxonomy/无翻译页回稳定入口

---

*最后更新: 2026-03-16 15:05 by Claude*
---

*最后更新: 2026-03-16 15:05 by Claude*
*
---

*最后更新: 2026-03-16 15:05 by Claude*
意事项：**

- 当前交付已完成；`zola build` 通过，存在 18 个非阻塞 translated diary broken anchor warning
- 非默认语言派生页已隐藏 edit 入口；语言切换遵循 page/section 精确跳转、taxonomy/无翻译页回稳定入口

---

*最后更新: 2026-03-16 15:05 by Claude*
---

*最后更新: 2026-03-16 15:05 by Claude*
