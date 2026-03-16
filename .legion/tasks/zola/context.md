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


### 🟡 进行中

- 根据用户反馈调整构建流程，目标是在不污染本地 `content/` 的前提下完成多语言同步与 Zola 构建


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

---

## 快速交接

**下次继续从这里开始：**

1. 本地构建改用 `node scripts/build-zola-site.ts`；若只想清掉历史派生文件可运行 `node scripts/sync-zola-i18n.ts --clean`
2. CI 已切到无污染构建路径；如需继续收口，可刷新 task docs 中对构建命令的描述

**注意事项：**

- 当前仓库 `content/` 已恢复为仅默认语言内容，未残留 `*.en-US.md` / `*.ja-JP.md` / `*.es-ES.md` / `*.de-DE.md`
- 临时工作区构建仍保留 18 个 translated diary broken anchor warning，性质不变，仍为非阻塞

---

*最后更新: 2026-03-16 16:19 by Claude*
---

*最后更新: 2026-03-16 15:05 by Claude*
意事项：**

- 当前交付已完成；`zola build` 通过，存在 18 个非阻塞 translated diary broken anchor warning
- 非默认语言派生页已隐藏 edit 入口；语言切换遵循 page/section 精确跳转、taxonomy/无翻译页回稳定入口

---

*最后更新: 2026-03-16 15:05 by Claude*
---

*最后更新: 2026-03-16 15:05 by Claude*
