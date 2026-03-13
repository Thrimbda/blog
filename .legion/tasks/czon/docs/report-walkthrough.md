# Walkthrough 报告

## 目标与范围

- 目标：让 Czon 文章页的正文宽度与 TOC 结构感尽量对齐主站 Granda 基线，并在定制自由度不足时明确说明缺口。
- 绑定 scope：`/Users/c1/Work/blog/.czon/style.css`、`/Users/c1/Work/blog/.legion/playbook.md`。
- 非目标：不改主站模板、不改 Czon 生成器模板、不做截图级视觉回归、不触碰 `.legion/` 三文件。

## 设计摘要

- 本任务采用 design-lite 路径，没有单独 RFC；设计来源与验收标准见 `/Users/c1/Work/blog/.legion/tasks/czon/plan.md`。
- 核心思路有两点：先移除 Czon 文章壳层在桌面端残留的 `lg:pl-88 xl:pr-88` 侧向预留，再在 article-only 作用域内重建更接近主站的“左 rail + 阅读列”关系。
- 由于本轮只允许改 CSS，文章页识别采用 `:has(> aside.sidebar-right)` 作为近似挂载条件；这能把宽度与 TOC 调整限制在文章页，但仍不是模板级语义标记。

## 改动清单

### `/Users/c1/Work/blog/.czon/style.css`

- 新增 article-only CSS 变量与作用域，把正文宽度、rail 宽度、间距等结构规则收进文章页上下文，避免误伤首页、列表页和 About。
- 清掉桌面文章页外层 `lg:pl-88 xl:pr-88` 对正文宽度的挤压，让阅读列不再呈现“被夹窄的中柱感”。
- 将桌面文章正文收口到更接近主站的 `70ch` 阅读列，调整主内容与 TOC 的相对对位。
- 将 TOC 从更像默认 sidebar/widget 的表现，收口为更轻的左 rail：标题、链接密度、边线与整体存在感都更克制。
- 把 `.content` 的结构宽度规则限制在 `:has(> aside.sidebar-right)` 的 article-only 作用域内，降低对其他 surface 的副作用风险。

### `/Users/c1/Work/blog/.legion/playbook.md`

- 追加一个可复用 pitfall：仅覆盖 `.content` 宽度不足以修正 Czon 文章页，外层 `main.w-full.lg:pl-88.xl:pr-88` 的残留 padding 也会继续挤压正文。
- 补充经验规则：如果只想影响带 TOC 的文章页，优先把 widening/rail 规则绑定到 `aside.sidebar-right` 存在的场景。

## 如何验证

- 参考测试报告：`/Users/c1/Work/blog/.legion/tasks/czon/docs/test-report.md`。
- 静态结构校验：验证 `.czon/style.css` 中 `.content` 相关结构规则已收进 article-only 作用域，且文章页/非文章页的 `sidebar-right` 结构符合预期；预期结果为 PASS。
- 构建验证：运行 `npx czon@latest build --lang en-US`；预期结果为构建成功，且产物中仍包含 article-only selector 与 `max-width: 70ch;`。
- 审查验证：参考 `/Users/c1/Work/blog/.legion/tasks/czon/docs/review-code.md`；预期结果为 PASS，仅保留 non-blocking limitation。

## 风险与回滚

- 风险等级：Low。改动只涉及 CSS 收口与经验沉淀，不涉及数据、依赖、模板协议或运行时逻辑。
- 主要风险 1：article-only 识别依赖 `sidebar-right` 挂载点存在性；若 Czon 后续调整 article shell 层级，这组选择器需要同步维护。
- 主要风险 2：TOC rail 的水平定位仍包含 magic number，后续几何微调时可能出现轻微漂移。
- 回滚方式：直接回退 `/Users/c1/Work/blog/.czon/style.css` 中本轮 article-only 收口，以及 `/Users/c1/Work/blog/.legion/playbook.md` 中新增 pitfall，即可恢复到改动前状态。

## 限制与未决项

- 当前 article-only 识别是 CSS 近似，不是模板级语义标记；若需要更稳的长期方案，应在 Czon 模板层补稳定的文章页 shell class 或 page-level data attribute。
- 本轮未做浏览器截图或像素级视觉回归，因此“尽量对齐主站基线”的结论主要来自结构校验、构建成功与人工审查判断。
- `:has(...)` 与 TOC 定位中的 magic number 已在代码审查中标记为 non-blocking limitation，当前不阻塞合入。

## 下一步

- 若本 PR 通过，可先按当前 CSS 收口方案合入，作为低风险视觉对齐版本。
- 若后续允许改模板，优先补稳定的文章页语义挂载点，替代深层 `:has(...)` 选择器。
- 若需要进一步逼近主站视觉，可补桌面浏览器截图对比或像素级回归验证。
