# 同步 Czon 文章页到主站视觉基线

## 标签

- continue

## 目标

让 Czon 站点的正文宽度与 TOC 结构感尽量对齐主站 Granda 基线，并在定制能力不足时明确说明缺口

## 问题定义

当前 Czon 文章页虽然已经套上了 Granda 的纸张/墨水配色，但桌面文章 layout 仍然和主站存在两个明显偏差：正文列被 Czon 原生 `lg:pl-88 xl:pr-88` 留白与 `max-w-4xl` 共同挤窄，读起来像被夹在中间的细柱；TOC 虽然被重新放到左侧，但仍带着 Czon 默认 sidebar 的组件感，和主站那种“轻但可抓住”的结构性 rail 不一致。

## 验收

- 桌面端 Czon 文章正文恢复到接近主站的阅读宽度与起始位置，不再呈现异常狭窄的中柱感。
- 桌面端 TOC 更像主站的安静左 rail，而不是默认 sidebar/widget；链接、标题和分隔线都更克制。
- `.czon/style.css` 改动不破坏首页、列表页、About、footer 和移动端的既有可用性。
- 若仅靠 `.czon/style.css` 无法完全复刻主站效果，必须在任务文档与 PR body 中说明具体限制和需要的挂载点/模板自由度。

## 假设

- 主站当前 `static/css/style.css` 与 `/.legion/tasks/granda/docs/playwright-article-desktop.png` 是这次视觉对齐的 source of truth。
- 本轮允许范围只包含 `.czon/style.css`，因此优先通过覆盖 Czon 生成 DOM 的现有 class 与结构选择器完成对齐。
- Czon 构建产物中的 article shell 结构在短期内稳定，允许针对 `main.w-full lg:pl-88 xl:pr-88`、`.content.max-w-4xl.mx-auto`、`.sidebar-right` 这类挂载点做样式覆盖。

## 约束

- 不修改主站模板、主站 CSS 或 Czon 生成器模板；本轮只在 `.czon/style.css` 内修正文章页表现。
- 不把 TOC 做成盒状卡片、吸睛 widget、浮层或高声量导航。
- 保持当前中文工作语言和 LegionMind 文档体系，不额外引入英文设计文档。

## 风险与规模分级

- 风险：Low
- 规模：非 Epic
- 理由：本轮是可回滚的 CSS 局部收口，不涉及数据、API、依赖或模板协议变更；主要风险来自 Czon DOM 结构选择器耦合。

## Design Index

- design-lite：本文档内联，不单独创建 RFC。

## Design Lite

1. 先移除 Czon 原生文章 shell 在桌面端残留的 `lg:pl-88 xl:pr-88` 侧向预留，让正文宽度不再被双侧 padding 意外压缩。
2. 用 `.czon/style.css` 在桌面端重建接近主站的“左 rail + 正文”关系：给主内容容器预留稳定的左侧 rail 空间，并把正文宽度收口到主站相近的 69-70ch 级别，而不是维持当前被挤压后的细柱观感。
3. 继续沿用现有 fixed TOC 挂载点，但把标题、字号、链接密度、边线和 hover 语气压回主站基线，去掉默认 sidebar 的组件味。
4. 若覆盖后仍有无法消除的偏差，则只将其归因为 Czon HTML 挂载点不足，并在报告中写明缺失的是哪一层 DOM/语义控制能力。

## 要点

- 以主站当前 Granda 视觉为 source of truth，同步正文宽度、TOC rail 语气和页面结构节奏
- 优先修改 `.czon/style.css`，避免越界到主站模板或内容
- 保留 Czon 可用性与移动端表现，不引入盒状 TOC 或通栏阅读列
- 若 Czon DOM/自定义能力不足以完全复刻，需要在任务文档和 PR body 中写明限制与所需挂载点

## 范围

- .czon/style.css
- .legion/playbook.md

## 允许 Scope 说明

- 允许直接修改：`.czon/style.css`
- 允许任务沉淀：`.legion/playbook.md`
- 不允许越界：`templates/`、`static/css/style.css`、`.czon/dist/`、Czon 上游模板或脚本

## 阻塞判断

- 当前无阻塞；先按 CSS 可覆盖路径推进。
- 只有当 Czon 生成 DOM 缺少稳定挂载点，导致正文宽度或 TOC 结构无法仅用 CSS 收口时，才把“定制自由度不足”记为阻塞并在报告中说明。

## 阶段概览

1. **设计** - 1 个任务
2. **实现** - 2 个任务
3. **验证与报告** - 1 个任务

## Phase Map

1. 设计：确认正文变窄的真实原因与 TOC 偏差来源，冻结 Low-risk design-lite。
2. 实现：仅在 `.czon/style.css` 中修正文宽、主内容对位和 TOC rail 语气，必要时追加可复用 playbook。
3. 验证与报告：跑构建/检查，补齐 review、walkthrough 与 PR body，并说明是否存在 Czon 自由度限制。

---

*创建于: 2026-03-13 | 最后更新: 2026-03-13*
