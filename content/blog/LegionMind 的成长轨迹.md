---
title: Legion 的成长轨迹：从任务记录器到多 Agent 工程操作系统
date: 2026-03-08
---

# Legion 的成长轨迹：从任务记录器到多 Agent 工程操作系统

## 引子

这篇文档试图回答一个具体问题：我们是如何从“一开始几乎什么都没有”，逐步把 Legion 用成现在这样一套相对成熟的多 Agent 工程协作系统的？

这里的材料主要来自三部分：

- `.legion/` 的 git 历史
- `.legion/config.json` 与 `.legion/ledger.csv` 的状态和审计记录
- 博客《[对于 AI Agent 的思考](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)》中已经明确写出的思考框架

如果只用一句话概括这条轨迹，那么大概是：

> 我们最开始只是想让 Agent 帮我们多做点事；后来发现真正需要建设的不是“更强的写代码能力”，而是“让 Agent 少打扰、多产出、可验证、可交接”的整套工程系统。Legion 就是在这个过程中，从任务记录器，一步一步长成了一个多 Agent 的工程操作系统。

---

## 一、先看现在：Legion 已经是什么

先不从起点讲，先看当前的形态。
从仓库现状来看，Legion 已经不是零散文档，而是一套持续运行的工作流系统：

- `.legion/config.json` 中已有 33 个任务条目。
- 状态分布大致为：9 个 `archived`、22 个 `paused`、2 个 `active`。
- `.legion/ledger.csv` 中累计有 2339 条审计记录。
- 高频动作包括：`legion_update_context`、`legion_update_tasks`、`legion_get_status`、`legion_read_context`、`legion_list_reviews`、`legion_respond_review`。
- 当前任务创建策略为 `agent-with-approval`，也就是 Agent 只能先提案，不能直接创建任务，必须经过显式批准。

这几个事实合起来说明，Legion 现在已经具备了几层稳定能力：

1. **任务持久化**：任务、上下文、进度都外置保存，而不是只活在会话里。
2. **设计门禁**：复杂任务不能直接开干，先有提案、计划、RFC，再进入执行。
3. **Review 闭环**：comment 不是聊天记录，而是带状态的结构化 review 项。
4. **证据链产物**：很多任务已经不止有 `plan/context/tasks`，还会生成 `rfc`、`review-code`、`review-security`、`report-walkthrough`、`pr-body`。
5. **审计与治理**：系统知道谁在什么时候做了什么决策、推进了什么阶段、响应了什么 review。

这其实已经和博客里的那条流水线高度一致了：

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

也就是说，今天的 Legion 已经不是“辅助写代码的笔记系统”，而是“约束多 Agent 如何工作的协议层”。

---

## 二、成长起点：先把任务从脑子里挪出来

Legion 的起点非常朴素。

从 git 历史看，`.legion` 首次大规模进入仓库，是 2025-12-15 的 `implement-quote-service`。这次提交同时引入了：

- `.legion/config.json`
- `.legion/ledger.csv`
- `.legion/tasks/implement-quote-service/plan.md`
- `.legion/tasks/implement-quote-service/context.md`
- `.legion/tasks/implement-quote-service/tasks.md`

这个起点很关键，因为它奠定了 Legion 的最小三件套：

### 1. `plan.md`

负责回答“要做什么”。

在 `implement-quote-service` 里，`plan.md` 已经不是一句待办，而是相对完整地写清：

- 目标
- 背景与动机
- 非目标
- 范围
- 阶段规划
- 契约摘要
- 分 vendor 设计

也就是说，一上来它就不是一个“Todo List”，而是一个轻量设计文档。

### 2. `context.md`

负责回答“发生了什么、为什么这样做”。

在这个阶段，`context.md` 最明显的价值是：

- 记录关键文件
- 记录关键决策
- 记录验证结果
- 提供快速交接

它本质上是在替代“我脑子里刚刚想明白的那点事”。

### 3. `tasks.md`

负责回答“现在做到哪了”。

这一步很重要，因为多 Agent 或多轮会话一旦开始，最先失真的其实不是代码，而是进度状态。

博客里提到，人一天只能稳定维护两三个上下文，超过这个范围就会调度失灵。Legion 的第一步，本质上就是把“任务状态”从人脑里卸载出来。

所以起点阶段的 Legion，可以理解成：

> 先让任务不丢，先让上下文能恢复，先让 Agent 不是做完就失忆。

这和博客里“把上下文从脑子里卸载出来”的需求是完全一致的。

---

## 三、第一轮进化：从任务记录，走向隐含知识外置

如果说第一阶段解决的是“别忘了正在做什么”，那么第二阶段解决的，就是博客里说的那堵“隐含知识墙”。

### 1. 任务开始变复杂，review 开始大量出现

从 2025-12 中下旬开始，Legion 中的 plan 文档里开始出现大量 `> [REVIEW]` block。

典型任务包括：

- `yuantsexchange-ohlcinterestrate`
- `vendors-ingest-ohlc-interest-rate`
- `task-vex-queryquotes-swr`
- `task-vex-quote-upstream-refactor`
- `vex-series-data-ohlcinterestrate-ohlc-v2`

这些任务的共同特征是：

- 它们都不是单纯“照着一个模板抄一下”就能完成。
- 它们涉及旧实现、演进历史、风格偏好、局部最佳实践。
- 真正决定成败的，不是语法能力，而是“知道什么该继承，什么不该继承”。

例如在 `vex-series-data-ohlcinterestrate-ohlc-v2` 的 review 中，能看到很典型的“隐含知识显性化”过程：

- 这个地方不要参考现有实现，因为现有实现是有问题的。
- 一开始觉得 VEX 不需要复杂限流，后来又重新判断，认为仍然需要保留某些限流策略。
- series_id 的编码规则、merge 语义、队列公平性等，都不是模型从代码里自然能推断出来的“世界知识”，而是项目内部演化出来的局部知识。

这正对应博客中的分层：

- 第 1 层是本次任务指令；
- 第 2 层是项目技术决策和局部最佳实践；
- 真正最容易让 Agent 翻车的，就是第 2 层。

Legion 在这个阶段承担的角色，就是把第 2 层强行写出来。

### 2. Comment 不再只是 comment，而是协作接口

这一阶段还有一个很关键的变化：comment 不再只是“临时吐槽”，而是逐渐变成了可闭环的结构化输入。

比如：

- 有的 review 是直接改设计方向。
- 有的是要求补足失败语义。
- 有的是要求去掉过度设计。
- 有的是要求不要参考现有错误实现。

这些内容如果只存在聊天记录里，下一轮 Agent 基本必丢；一旦落到 `plan.md` 或 `context.md`，它就从“口头知识”变成了“任务真相的一部分”。

所以第二阶段的 Legion，本质上已经不只是 task tracker，而是开始承担 **外置大脑** 的功能。

这一步非常重要，因为它对应了我在博客里强调过的一个核心转折：

> 外置大脑不是锦上添花，而是 complex project 下的必需品。

---

## 四、第二轮进化：从外置大脑，走向设计门禁

随着任务越来越复杂，单纯“把知识写下来”已经不够了。新的问题变成：

> 如果多 Agent 一起动起来，但方向本身错了怎么办？

这时候 Legion 开始进入第三个阶段：从“记录系统”升级成“设计门禁系统”。

### 1. RFC 和 spec 开始进入主流程

一个关键转折点是 `http-proxy-service`。

在这个任务里，Legion 已经明显不是“先做再记”，而是“先设计、先评审、先过门，再做”。

这个任务出现了：

- `docs/rfc.md`
- `docs/spec-dev.md`
- `docs/spec-test.md`
- `docs/spec-bench.md`
- `docs/spec-obs.md`
- review 结论
- 安全审查阻塞项
- walkthrough 和 PR body

这意味着 Legion 开始把一个复杂任务拆成几个稳定层次：

1. **RFC**：意图对齐
2. **Dev/Test/Bench/Obs Spec**：把“怎么验证”提前写清
3. **Review**：尽量在开工前暴露方向问题
4. **实现与验证**：把低成本检查前移
5. **报告与 PR 产物**：为验收服务

这和博客中提到的“意图对齐 + 分层验证”是高度一致的。

### 2. 安全和资源问题开始以前置阻塞的形式出现

在 `http-proxy-service` 和 `http-proxy-app-implementation` 这类任务里，review 不再只是建议，而是直接出现 `blocking`。

例如：

- SSRF 风险
- DoS 风险
- 未限定响应体大小
- 并发和排队参数不 secure-by-default
- 环境变量配置边界不清

这说明 Legion 已经开始承担一个新的职责：

> 不仅记录“为什么这么做”，还记录“为什么现在不能做，除非先补齐这些条件”。

这就是设计门禁。

博客里说，当多 Agent 系统开始翻车，人类第一反应往往是写更长的 RFC、做更严格的 review，把风险压到最前面。Legion 在这个时期，正是把这种本能反应制度化了。

### 3. 它开始像一个小型生产流水线

到了这个阶段，Legion 的角色已经不是“帮助想起来”，而是“帮助约束工作顺序”。

对应博客里的流水线：

- `Intent`：用户目标、非目标、约束
- `Plan`：任务拆解、里程碑、边界
- `Execute`：实现
- `Verify`：build / test / benchmark / review
- `Report`：walkthrough / PR body
- `Memory`：context / decision log / archived task

这一步很关键，因为它意味着：

> Legion 不再只是承载上下文，而是开始承载流程。

---

## 五、里程碑：HTTP Proxy 系列让 Legion 真正工程化

如果说之前的阶段仍然带有“边做边长”的实验感，那么 `http-proxy` 相关任务基本上就是 Legion 真正成熟的第一座里程碑。

这和我在博客里的描述是吻合的：跨多个 project 的 `http-proxy` 任务，确实是一个让我开始明显感觉“我基本可以脱离编码，只留下少量 review comment”的节点。

从 `.legion` 里看，这个判断是有充分证据的。

### 1. 它不是单个任务，而是一个任务簇

相关任务至少包括：

- `http-proxy-service`
- `http-proxy-app-implementation`
- `vendor-http-services-rollout`
- `http-proxy-metrics`
- `http-services-terminalinfos-ready`
- `vendor-tokenbucket-proxy-ip`

这不是一个点状需求，而是一串相互衔接的工程任务：

- 先做基础库
- 再做应用层
- 再做 rollout
- 再补 metrics
- 再补 routing / ip readiness
- 再联动 vendor 侧限流与负载逻辑

也就是说，Legion 已经开始支持一类真正的 **跨任务、跨 package、跨阶段演进**。

### 2. Review 循环明显变长，但同时更稳定

尤其是 `http-proxy-app-implementation`，它非常能说明 Legion 的成熟：

- 一方面 review 数量很多，争议点也很多；
- 另一方面，这些争议都没有留在聊天记录里，而是变成了 RFC 更新、review 结论和 context 决策。

这个任务里可以看到非常典型的工程化争论：

- allowedHosts 究竟影响请求行为，还是只影响 metrics？
- absolute-form 是否必须唯一支持路径？
- invalid_url、blocked、error 的边界怎么定义？
- target_host / target_path 的高基数风险怎么控制？

这些不是“写代码能力”能直接解决的问题，而是 **规范边界、验证边界、语义边界** 的问题。

Legion 在这里的价值，不是帮忙写代码，而是帮忙稳定这些边界。

### 3. 它开始生成真正可用于验收的 artifact

这一步也正好对应博客里“汇报接口是被低估的工程问题”。

在 http-proxy 系列任务里，Legion 已经稳定生成：

- RFC
- review-rfc
- review-code
- review-security
- report-walkthrough
- pr-body
- spec-test / spec-bench / spec-obs

这说明 Legion 已经不满足于“把事情做了”，而是开始支持“把事情讲清楚、把证据绑上去、把风险说出来”。

换句话说：

> 这时候 Legion 开始真正服务于“低成本验收”，而不仅是“高效率执行”。

这也是博客里一个特别重要的判断：最昂贵的不是 token，而是返工和注意力泄漏。

只要汇报接口不工程化，人就还是得大量花精力去猜 Agent 到底干了什么。Legion 在这一时期，明显已经在主动解决这个问题。

---

## 六、成熟期：从工程流水线，走向治理系统

继续往后看，Legion 的成熟并不只是体现在“文档越来越多”，而是体现在 **治理结构** 开始固定下来。

### 1. 任务创建开始被审批策略约束

当前 `.legion/config.json` 中的 `taskCreationPolicy` 已经是 `agent-with-approval`。

这一步很有象征意义。

它意味着 Legion 开始承认一个事实：

> 不是所有复杂任务都应该由 Agent 自己决定何时创建、何时推进。

这背后其实就是博客里讲的那个更深层的问题：

- 当模型越来越强，流程是不是应该放权？
- 如果要放权，边界在哪里？
- 什么必须先经过人类批准，什么可以自动推进？

Legion 给出的答案不是完全自治，而是 **受控自治**。

也就是：

- Agent 可以探索、整理、提案；
- 但复杂工作进入正式执行前，仍然要有人类批准。

这已经非常接近一个真正组织中的工作机制了。

### 2. Review 不再只是建议，而是有状态的协作协议

从 ledger 统计看，`legion_list_reviews` 和 `legion_respond_review` 已经累计出现了大量记录。

这说明 review 在 Legion 里不是附属能力，而是主能力之一。

更重要的是，它不是“读一下 comment”，而是：

- 列出未解决项
- 响应某个 review
- 标记 resolved / wontfix / need-info
- 再确认 review 闭环

这和普通 markdown 批注非常不同。它把“评论”从文本，变成了一个可跟踪状态机。

这一步的意义是：

> 人和 Agent 的沟通，不再只是会话消息，而是可沉淀、可追踪、可审计的协议动作。

### 3. 它开始承载“风险接受”而不只是“问题修复”

成熟系统还有一个标志，不是“所有风险都解决了”，而是“系统能区分哪些风险现在解决，哪些风险现在接受”。

在 `http-proxy-app-implementation`、`vendor-tokenbucket-proxy-ip` 等任务里，已经可以看到：

- 某些安全问题经过评审后被标记为 `wontfix`
- 某些风险被明确记录为用户接受
- 某些行为被保留为 residual risk，而不是被模糊地遗忘

这说明 Legion 已经不只是一个“改 bug 的工具”，而是开始承载工程决策的现实性：

- 有些问题必须马上修
- 有些问题先记录、后治理
- 有些问题由当前环境假设兜底

这就是治理。

---

## 七、当前最高成熟度的例子：`heavy-rfc`

如果要从现有任务里挑一个最能体现 Legion 成熟度的代表，我会选 `heavy-rfc`。

这个任务几乎可以看作 Legion 当前工作流的完整范式样本。

### 1. 一开始就有风险分级和阶段声明

它不是简单写“实现 live trading”，而是一开始就明确：

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

也就是说，这个任务不是先实现再补文档，而是先承认它是高风险任务，所以必须先走 heavy RFC 流程。

### 2. 它已经有完整的产物链

`heavy-rfc` 下已经包含：

- `task-brief.md`
- `research.md`
- `rfc.md`
- `review-rfc.md`
- `test-report.md`
- `review-code.md`
- `review-security.md`
- `report-walkthrough.md`
- `pr-body.md`

这个产物链本身就说明，Legion 已经把一个高风险工程任务拆成了多个可审阅、可验证、可交接的层次。

### 3. 它体现了博客里那种“先收敛意图，再放开执行”的工作方式

博客中有一个非常核心的判断：

> 自治不是聪明就够了，而是少打扰、多产出、可验证。

`heavy-rfc` 恰好体现了这一点：

- 先通过设计文档和 review 把方向定住
- 再通过测试和评审压低实现风险
- 最后通过 report / PR body 让验收成本降低

这意味着 Legion 到现在，已经能够支持一种新的工作姿势：

> 人主要做目标设定、边界约束、关键 review；Agent 负责在制度化轨道内推进实现、验证和汇报。

这正是我在博客最后总结的那个身份转变：从执行者变成审阅者、决策者、系统迭代者。

---

## 八、从 task 的“程度和范畴”看成熟度升级

如果把所有 task 放在一起看，会发现 Legion 的成熟，不只是流程复杂度变高，更体现在任务类型本身在升级。

### 1. 早期：单点实现型任务

代表：`implement-quote-service`

特征：

- 单主题
- 边界较清晰
- 文档主要服务于理解和交接
- Legion 主要承担 task tracking

### 2. 中期：设计争议型任务

代表：`vex-series-data-ohlcinterestrate-ohlc-v2`、`yuantsexchange-ohlcinterestrate`

特征：

- 跨多个模块
- 涉及大量历史包袱和局部最佳实践
- comment / review 密集
- Legion 主要承担隐含知识外置

### 3. 里程碑期：跨项目工程型任务

代表：`http-proxy-*` 系列

特征：

- 跨 package
- 有 RFC / spec / benchmark / security review
- 有 rollout、观测、回滚、报告
- Legion 主要承担完整工程流水线

### 4. 当前：高风险治理型任务

代表：`heavy-rfc`

特征：

- 风险分级明确
- 审批门禁明确
- review 闭环明确
- 文档和证据链完整
- Legion 主要承担治理与交付协议

换句话说，task 的“程度和范畴”本身，就是 Legion 成熟度的镜子。

一开始它只处理“做一个功能”；后来它开始处理“做一类复杂工程”；现在它已经在处理“如何以受控方式推进高风险工作”。

---

## 九、这条轨迹如何对应到博客里的那篇思考

现在回过头去看《对于 AI Agent 的思考》，会发现博客里写的很多判断，其实都已经在 Legion 的历史中落地了。

### 1. “初尝 scale 的甜蜜点”

博客里写的是：多 Agent 并行推进任务，短时间里会让人有一种机械化收割的快感。

在 Legion 历史里，对应的是 2025-12 开始 task 快速增长：

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

这说明一开始的核心目标确实是：**先让 Agent 多干活**。

### 2. “瓶颈是我自己”

博客里说，执行工作挪给 Agent 之后，人真正的瓶颈变成上下文管理、验收和决策。

Legion 的最早三件套，恰好就在解决这个问题：

- 用 `tasks.md` 降低上下文丢失
- 用 `context.md` 记录决策和关键文件
- 用 `plan.md` 让任务目标不漂移

### 3. “隐含知识墙”

博客里说，Agent 学到的往往是可见样本，而不知道什么是现在的标准。

Legion 的 response 是：

- 把 review 写进 plan
- 把约束写进 context
- 把设计争议写成结构化文档

也就是：把隐含知识外置化。

### 4. “意图对齐 + 分层验证”

博客里的流水线，在 `http-proxy` 和 `heavy-rfc` 里几乎已经原样实现：

- Intent：Goal / Non-goals / Scope
- Plan：Phase / RFC / Design Summary
- Execute：实现
- Verify：test / review-code / review-security / bench
- Report：walkthrough / pr-body
- Memory：context / archived task / ledger

### 5. “汇报接口是被低估的工程问题”

博客强调，结论应该尽量绑定 artifact。

Legion 的实践已经明显朝这个方向走：

- 结论不是一句话，而是对应 report、review、test-report、PR body
- 人不需要重新读全部代码，而是可以先读凝练后的 artifact

虽然它还不是我设想中的 Citation Agent，但方向已经很明确了。

### 6. “benchmark 会成为刚需”

博客里说，未来必须能比较不同 workflow 或模型版本，而不是靠感觉。

这在 Legion 里已经出现早期实现：

- `spec-bench.md`
- benchmark 场景和阈值
- bench 输出和报告

也就是说，这条路已经不是想法，而是开始工程化了。

---

## 十、最重要的变化：Legion 改变的不只是 Agent，也改变了人的角色

如果只看表面，会觉得 Legion 的成长是：

- 文档更多了
- review 更多了
- 流程更长了

但真正关键的变化不是这些，而是 **人机分工被重新定义了**。

在更早的时候，人的角色大致还是：

- 亲自执行
- 亲自记忆
- 亲自兜住所有上下文

而在 Legion 逐渐成熟之后，人的角色慢慢变成：

- 设定目标和约束
- 审核设计边界
- 处理阻塞级 review
- 验收 artifact 和风险
- 迭代整个协作系统

这也就是博客最后总结的那句话：

> 我现在做的不是“用 AI 写更多代码”，而是“用 AI 把自己 scale 起来”。

Legion 正是这个目标的工程实现。

它把“把自己 scale 起来”从一种抽象愿望，变成了一套可以落地、可以审计、可以复盘、可以持续优化的协作结构。

---

## 十一、站在现在看下一步：`~/Work/legion-mind` 代表的最新演化方向

如果只看 Yuan 仓库里的 `.legion/` 历史，能看到 Legion 是怎样在真实项目里被一点点逼出来的；但如果再看现在的 `~/Work/legion-mind`，就会发现 Legion 已经开始往下一阶段演化了。

这一步非常重要，因为它说明 Legion 的目标已经不只是“在一个仓库里好用”，而是开始尝试把这套经验提炼成一套 **可安装、可迁移、可 benchmark、可复用** 的通用 Autopilot Kit。

从 `~/Work/legion-mind/README.md` 和 `docs/legionmind-usage.md` 可以看出，最新方向至少有五个特征。

### 1. 从“仓库内工作流”走向“通用编排模板”

在 Yuan 里，Legion 一开始是跟着具体任务长出来的；到了 `legion-mind`，它已经被显式抽象成一套通用 Agent 编排模板：

- primary agent：`legion`
- subagents：`engineer`、`spec-rfc`、`review-rfc`、`review-code`、`review-security`、`run-tests`、`report-walkthrough`
- skill：`skills/legionmind`

这说明最新版本的 Legion，已经不再把“多 Agent 协作”理解成临时拉几个 agent 干活，而是开始把它建模成：

- orchestrator 负责流程推进
- subagent 负责单一职责
- `.legion/` 负责持久化状态和审计

也就是说，Legion 正在从“经验型 workflow”变成“角色清晰的编排系统”。

### 2. 从手工调用走向命令化入口

`legion-mind` 里最明显的变化之一，是把常见工作流命令化了：

- `/legion`
- `/legion-impl`
- `/legion-rfc-heavy`
- `/legion-pr`
- `/legion-bootstrap`
- `/evolve`

这件事看起来只是使用体验优化，但本质上不是。

它意味着 Legion 正在把“哪些阶段、按什么顺序跑、何时只做设计、何时继续实现、何时沉淀经验”这些约定，进一步从隐性 SOP 变成显式命令。

换句话说，早期 Legion 主要是在文档层约束流程；而现在的方向，是把流程本身再往前推一层，固化成可以直接触发的操作界面。

### 3. 从任务记忆走向跨任务 Playbook

Yuan 仓库里的 Legion，已经能把单个任务的上下文持久化；而 `legion-mind` 里又向前走了一步：开始引入 `.legion/playbook.md` 和 `/evolve`。

这很关键，因为它解决的是另一个层级的问题：

- `plan/context/tasks` 解决的是“这个任务如何续跑”；
- `playbook` 解决的是“这类任务以后怎么少走弯路”。

现在 `playbook` 里已经开始记录类似这样的模式：

- benchmark 输出必须留在仓库内
- benchmark 必须先固定 deterministic profile
- 缺失 summary 必须按 error 计入分母，不能静默缩小分母

这说明 Legion 最新的记忆模型，已经不只是 task memory，而是开始尝试做 **organizational memory**。

也就是：

> 不只记住“上次做到哪”，还要记住“以后同类任务应该怎么做更稳”。

### 4. 从“能用”走向“可安装、可发布、可迁移”

`legion-mind` 里还有一个特别值得注意的方向：它已经开始提供安装、校验、回滚和安全覆盖策略。

比如 README 里已经有：

- `install`
- `verify --strict`
- `rollback`
- `safe-overwrite`
- managed files / backup index

这意味着 Legion 正在从“我自己的工作方法”演化为“别人也能装进去用的一套产品化资产”。

这一步的意义很大。

因为一旦进入安装/发布层，Legion 的设计目标就不只是服务我自己，还要考虑：

- 如何安全地同步资产
- 如何避免覆盖用户自己的修改
- 如何验证安装状态
- 如何在失败时回滚

这说明 Legion 的最新方向，已经不只是协作系统本身，而是 **协作系统的分发与复制能力**。

### 5. 从经验总结走向 benchmark 驱动的系统迭代

我在博客里写过，未来最重要的事情之一，就是要能科学比较不同版本的 workflow，而不是凭感觉说“这版更聪明”。

`legion-mind` 基本已经把这件事正式立项了。

仓库里已经有：

- `docs/benchmark.md`
- benchmark baseline 命令
- benchmark-runs 目录
- 明确的 preflight / smoke / full / score / report 流程

这意味着 Legion 的下一阶段，已经不是单纯继续堆流程，而是要开始回答更硬的问题：

- 哪种流程真的更稳？
- 哪种设计门禁更划算？
- 哪种 agent 编排在 pass@k 和 pass^k 上表现更好？
- 哪些环节只是增加仪式感，哪些环节真的减少返工？

到这里，Legion 的演化目标其实已经非常明确了：

> 从“把多 Agent 用起来”，走向“把多 Agent 系统作为一个可测量、可迭代、可复制的工程产品来建设”。

### 小结：`legion-mind` 让我更清楚地看到 Legion 的下一阶段

如果说 Yuan 里的 Legion 历史，主要回答的是“这套东西是怎么被真实需求逼出来的”；那么 `legion-mind` 则在回答另一个问题：

> 既然这套东西已经被逼出来了，下一步能不能把它从项目经验，变成一个通用系统？

我现在理解的最新方向，大概可以概括成下面这几条：

1. **命令化**：把高频流程变成稳定入口，而不是每次靠临场组织。
2. **角色化**：把 orchestrator / subagent 的职责彻底拉开。
3. **Playbook 化**：把跨任务经验从 task memory 提升到 organizational memory。
4. **产品化**：让 Legion 能被安装、验证、回滚，而不是只存在于一个仓库里。
5. **Benchmark 化**：让 Legion 的迭代不再靠感觉，而是靠基线和评分体系。

也就是说，Legion 的最新演化方向，已经不只是“更成熟地使用 Agent”，而是开始把“如何工程化地使用 Agent”本身做成一个可以持续演进的系统。

---

## 十二、最后的归纳：Legion 是如何一步一步长出来的

把整条轨迹再压缩一下，可以得到一个很清晰的五段论。

### 第一阶段：先别忘事

先用 `plan/context/tasks` 把任务、进度和交接从脑子里拿出来。

### 第二阶段：把隐含知识写出来

通过 `REVIEW`、决策日志和上下文记录，把项目内部的局部知识外置化，降低 Agent 拟合旧样本的翻车概率。

### 第三阶段：先设计，后执行

通过 RFC、Spec、Review 把设计门禁固定下来，把高成本返工往前压。

### 第四阶段：把验证和汇报工程化

通过 test、bench、review-code、review-security、walkthrough、PR body 让验证和验收低成本化。

### 第五阶段：把自治变成受控自治

通过 proposal、approval、review 状态、ledger 审计，把多 Agent 协作从“能跑”推进到“可治理”。

所以最终的结论不是“Legion 让 Agent 变强了”，而是：

> Legion 让 Agent 的能力，第一次能以工程系统的方式被稳定使用。

它不是单点提效工具，而是一个围绕“少打扰、多产出、可验证、可交接、少磨损”逐渐长出来的系统。

这也是为什么它的成长轨迹，几乎可以直接作为那篇博客的工程注脚：

- 博客写的是原则；
- Legion 历史展示的是这些原则如何变成制度、文档、流程和 artifact。

两者合在一起，才构成了完整的故事。

---

## 附：几个可以作为里程碑观察点的任务

如果要快速回看 Legion 的演进，我会优先看这几个任务：

1. `implement-quote-service`
   - Legion 的起点样本
   - 三件套最早成型

2. `vex-series-data-ohlcinterestrate-ohlc-v2`
   - 隐含知识外置最典型
   - review/comment 密度极高

3. `http-proxy-service`
   - 设计门禁和 spec 化开始成型

4. `http-proxy-app-implementation`
   - 对抗审查、语义边界、风险接受、artifact 产出都非常完整

5. `vendor-tokenbucket-proxy-ip`
   - 多轮 RFC 对抗审查 -> 实现 -> 验证 -> PR -> 外部 review 修复 的完整链条

6. `heavy-rfc`
   - 当前最高成熟度样本
   - 风险分级、design-only、review 闭环、交付产物都很完整

如果说 `implement-quote-service` 代表“Legion 出生了”，那么 `http-proxy-*` 代表“Legion 长大了”，而 `heavy-rfc` 代表“Legion 已经开始像一个成熟系统那样工作了”。
