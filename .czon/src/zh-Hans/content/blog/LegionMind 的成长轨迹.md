---
title: Legion 的成长轨迹：从任务记录器到多 Agent 工程操作系统
date: 2026-03-08
---

## 引子

这篇文档想回答一个我自己一直在复盘的问题：我到底是怎么把 Legion 从一个几乎什么都没有的想法，逐步用成今天这套相对成熟的多 Agent 工程协作系统的？

这份分析主要基于四类材料：

- Yuan 仓库里的 `.legion/` git 历史
- 当前 `.legion/config.json` 和 `.legion/ledger.csv` 的状态
- 一批有代表性的 task、review、RFC、report 产物
- 博客《[对于 AI Agent 的思考](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)》里我已经明确写出来的思考框架

如果先给一个一句话版本的结论，那就是：

> Legion 不是我一开始就设计好的一整套系统，而是在真实任务压力下，被“上下文管理、隐含知识、设计门禁、验证成本、汇报成本”这些问题一点一点逼出来的。它最早只是为了让 Agent 别失忆，后来逐步演化成了一个约束多 Agent 如何工作的工程系统。

---

## 一、先看现在：Legion 已经长成什么样了

如果先不讲起点，只看今天的状态，Legion 已经明显不是一个零散的笔记目录。

从当前 Yuan 仓库里的 `.legion` 状态看：

- 当前共有 34 个 task。
- 状态分布大致是：9 个 `archived`、23 个 `paused`、2 个 `active`。
- `.legion/ledger.csv` 里已经有 2498 条审计记录。
- 最常见的动作是 `legion_update_context`、`legion_update_tasks`、`legion_get_status`、`legion_read_context`、`legion_list_reviews`、`legion_respond_review`。
- 当前任务创建策略是 [`agent-with-approval`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json)，也就是复杂任务默认先提案，再批准，再执行。

这几件事合在一起看，Legion 今天至少已经具备了五层稳定能力：

1. **任务持久化**：任务目标、上下文、进度都不再只活在会话里。
2. **设计门禁**：复杂任务不能直接开干，要先有 plan、RFC 或提案。
3. **Review 闭环**：comment 不只是聊天，而是带状态的结构化 review 项。
4. **证据链产物**：很多任务已经会稳定产出 RFC、review、test report、walkthrough、PR body。
5. **审计与治理**：系统知道什么时候谁做了什么决策、推进了什么阶段、关闭了什么 review。

如果把它压缩成博客里的那条流水线，其实已经很像：

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

也就是说，今天的 Legion 已经不是“辅助写代码的笔记系统”，而是“多 Agent 协作的协议层”。

---

## 二、第一阶段：先把任务从脑子里挪出来

Legion 的起点其实很朴素。

从 git 历史看，最早把 `.legion` 作为显式工作流带进仓库的，是 [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md)。

这一批最关键的落点有三个：

- [`plan.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md)
- [`context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md)
- [`tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/tasks.md)

这三个文件后来几乎成了 Legion 的骨架。

### 1. `plan.md` 解决“要做什么”

在 [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md) 里，`plan.md` 已经不是一句“给所有 vendor 补 quote service”的待办，而是会写清：

- 目标
- 背景与动机
- 非目标
- 范围
- 阶段规划
- 契约摘要
- 分 vendor 设计

这一步很关键，因为它意味着 Legion 从起步开始，就不是单纯的 Todo List，而是一个轻量设计索引。

### 2. `context.md` 解决“发生了什么、为什么这样做”

[`implement-quote-service/context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md) 里已经能看到后来 Legion 非常核心的几个能力：

- 记录关键文件
- 记录关键决策
- 记录验证结果
- 提供快速交接

换句话说，`context.md` 一开始承担的就是“替代我脑子里刚刚想明白的那点事”。

### 3. `tasks.md` 解决“现在做到哪了”

多 Agent 或多轮会话一旦开始，最先丢的往往不是代码，而是进度状态。

`tasks.md` 的意义在于：

- 把阶段拆开
- 把当前任务标出来
- 把发现的新任务补进去
- 让下一轮对话能快速恢复现场

所以 Legion 的第一阶段，本质上解决的是一个很现实的问题：

> 先别忘事。先让任务不丢，先让上下文能恢复，先让 Agent 不是做完就失忆。

这和我在博客里写的那个出发点是完全一致的：当并行工作开始变多，最先崩掉的其实是人的上下文调度能力。

---

## 三、第二阶段：从任务记录走向隐含知识外置

如果说第一阶段主要解决“别忘了正在做什么”，那么第二阶段解决的，就是我在博客里专门提过的那堵“隐含知识墙”。

### 1. 复杂任务开始逼出 review 机制

从 2025-12 中下旬开始，Legion 里的 plan 文档开始大量出现 `> [REVIEW]` block。典型任务包括：

- [`yuantsexchange-ohlcinterestrate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/yuantsexchange-ohlcinterestrate/plan.md)
- [`vendors-ingest-ohlc-interest-rate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendors-ingest-ohlc-interest-rate/plan.md)
- [`task-vex-queryquotes-swr`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-queryquotes-swr/plan.md)
- [`task-vex-quote-upstream-refactor`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-quote-upstream-refactor/plan.md)
- [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md)

这些任务有个共同点：

- 它们都不再是“照着现有模式改一改”就能完成的任务。
- 它们牵涉旧实现、演进历史、局部最佳实践和很多非显而易见的约束。
- 真正决定结果质量的，往往不是模型能不能写出代码，而是它知不知道什么该继承、什么不能继承。

比如在 [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md) 这种任务里，review 里反复出现的其实就是典型的项目内隐性知识：

- 不要参考某个现有实现，因为那个实现本身有问题。
- 一开始某个约束看起来不需要，后来重新评估又发现不能去掉。
- 编码规则、merge 语义、调度公平性、限流策略这些东西，不是模型从代码里自然能学出来的“世界知识”，而是项目自己长出来的知识。

这正对应我在博客里写的那层分野：

- 第 1 层是用户这次说了什么；
- 第 2 层是项目自己的技术决策和局部最佳实践；
- 真正最容易让 Agent 翻车的，恰恰是第 2 层。

Legion 在这个阶段承担的角色，就是把第 2 层强行写出来。

### 2. Comment 开始从“聊天”变成“接口”

这一步的本质不是 comment 数量变多了，而是 comment 的性质变了。

以前 comment 更像临时对话；到了这个阶段，comment 开始承担这些职责：

- 改设计方向
- 补失败语义
- 去掉过度设计
- 指出哪些旧实现不能参考
- 记录必须保留的工程约束

一旦这些东西落到 `plan.md` 或 `context.md`，它就不再是口头提醒，而变成了任务真相的一部分。

所以第二阶段的 Legion，本质上已经不只是 task tracker，而是在做一件更重要的事：

> 把隐含知识外置化。

这也是为什么我后来越来越确信：外置大脑不是锦上添花，而是 complex project 下的必需品。

---

## 四、第三阶段：从外置大脑走向设计门禁

随着任务越来越复杂，只是“把知识写下来”已经不够了。新的问题变成：

> 如果多 Agent 一起跑起来，但方向本身错了怎么办？

这时候 Legion 开始进入第三阶段：从记录系统升级成设计门禁系统。

### 1. RFC 和 spec 进入主流程

一个很典型的转折点，是 [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md)。

在这个任务里，Legion 已经明显不是“先做再记”，而是“先设计、先评审、先过门，再做”。

这个任务下面已经出现了完整的设计和验证产物：

- [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/rfc.md)
- [`spec-dev.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-dev.md)
- [`spec-test.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-test.md)
- [`spec-bench.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-bench.md)
- [`spec-obs.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-obs.md)

这意味着 Legion 开始把复杂任务拆成稳定的几个层次：

1. **RFC**：先对齐意图
2. **Dev/Test/Bench/Obs Spec**：把怎么验证提前写清
3. **Review**：尽量在开工前暴露方向问题
4. **实现与验证**：把低成本检查前移
5. **报告与 PR 产物**：服务于验收，而不是服务于“写完就算”

这基本就是我在博客里讲的“意图对齐 + 分层验证”。

### 2. 安全和资源问题开始以前置阻塞出现

在 [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md) 和 [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) 这类任务里，review 已经不再只是“建议”，而是明确出现了 `blocking`。

典型问题包括：

- SSRF 风险
- DoS 风险
- 未限定响应体大小
- 并发和排队参数不 secure-by-default
- 环境变量边界不清

这一步很重要，因为 Legion 开始承担一个新的职责：

> 不只是记录“为什么这么做”，还要记录“为什么现在还不能做，除非先补齐这些条件”。

这其实就是设计门禁。

博客里我写过，当多 Agent 系统开始翻车，人很自然会去写更长的 RFC、做更严格的 review，把高成本错误尽量前移。Legion 在这一阶段，就是把这种本能反应制度化了。

---

## 五、里程碑阶段：HTTP Proxy 系列让 Legion 真正工程化

如果说前面的阶段仍然带着一点“边做边长”的实验感，那么 `http-proxy` 相关任务基本就是 Legion 真正成熟的第一座里程碑。

这也和我在博客里的体感是一致的：跨多个 project 的 `http-proxy` 任务，是一个让我开始明显感觉“我可以大幅退出编码，只留下少量 review comment”的节点。

### 1. 它不是单点任务，而是一个任务簇

相关任务至少包括：

- [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md)
- [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md)
- [`vendor-http-services-rollout`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-http-services-rollout/plan.md)
- [`http-proxy-metrics`（落在 `rfc-metrics.md`）](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/docs/rfc-metrics.md)
- [`http-services-terminalinfos-ready`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-services-terminalinfos-ready/plan.md)
- [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md)

这说明 Legion 这时支持的已经不是“做完一个功能”，而是：

- 先做基础库
- 再做应用层
- 再做 rollout
- 再做观测与 metrics
- 再把能力推广到 vendor 侧

也就是它开始支持 **跨任务、跨 package、跨阶段** 的工程演进。

### 2. Review 循环更长了，但也更稳了

尤其是 [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md)，非常能说明 Legion 在成熟。

这个任务里反复争论的，已经不是“代码怎么写”，而是：

- `allowedHosts` 究竟影响请求行为，还是只影响 metrics？
- `absolute-form` 到底是不是唯一支持路径？
- `invalid_url`、`blocked`、`error` 的边界怎么定义？
- `target_host` / `target_path` 的高基数风险怎么控制？

这些问题本质上都不是写代码能力问题，而是规范边界、语义边界、验证边界的问题。

Legion 在这里的价值，不是替我写更多代码，而是帮我把这些边界稳定下来。

### 3. 汇报接口开始真正工程化

这也是 Legion 特别关键的一步。

在 `http-proxy` 这批任务里，Legion 已经开始稳定生成：

- RFC
- review-rfc
- review-code
- review-security
- report-walkthrough
- PR body
- spec-test / spec-bench / spec-obs

也就是说，Legion 不再满足于“把事情做完”，而是开始支持“把事情讲清楚、把证据绑上去、把风险说出来”。

这和我在博客里说的“汇报接口是被低估的工程问题”完全一致。

真正贵的从来不是 token，而是返工、反复追问、重新读代码和注意力泄漏。只要汇报接口没有工程化，人就还是得花很多成本去猜 Agent 到底干了什么。

---

## 六、成熟阶段：从工程流水线走向治理系统

继续往后看，Legion 的成熟不只是“文档越来越多”，而是它开始具备治理结构。

### 1. 任务创建不再是随手开干，而是被策略约束

当前 [`config.json`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json) 里的 `taskCreationPolicy` 已经是 `agent-with-approval`。

这件事很有象征意义。它意味着 Legion 已经承认一个事实：

> 不是所有复杂任务，都应该由 Agent 自己决定何时开始、何时推进。

也就是：

- Agent 可以探索、整理、提案；
- 但复杂工作进入正式执行前，仍然需要人类批准。

这就是受控自治。

### 2. Review 已经不只是文本，而是有状态的协议

从 ledger 的分布看，`legion_list_reviews` 和 `legion_respond_review` 已经是高频动作。

这说明 review 在 Legion 里不是附属能力，而是主能力之一。更重要的是，它不只是“读评论”，而是：

- 找出未解决项
- 对具体 review 逐条响应
- 标记 `resolved` / `wontfix` / `need-info`
- 再确认 review 已经闭环

这一步的意义在于：

> 人和 Agent 的协作，不再只是会话消息，而是可沉淀、可追踪、可审计的协议动作。

### 3. 它开始承载“风险接受”

成熟系统并不意味着“所有问题都解决了”，而是它能明确区分：

- 哪些风险必须马上修
- 哪些风险可以先记录、后治理
- 哪些风险在当前环境假设下可接受

在 [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) 和 [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md) 这类任务里，已经能看到：

- 某些问题经过评审后被标记为 `wontfix`
- 某些安全问题被显式记录为当前阶段接受的风险
- 某些残余风险不是被遗忘，而是被正式留下来

这说明 Legion 已经不只是一个“帮我改 bug”的工具，而是开始承载工程决策的现实性。

---

## 七、最高成熟度样本：从 `heavy-rfc` 到 `signal-trader`

如果要从现有任务里挑出最能体现 Legion 成熟度的样本，我会把它分成两个连续阶段看：

- [`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md)
- [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md)

### 1. `heavy-rfc`：设计门禁的成熟形态

[`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md) 是一个非常典型的高风险设计任务。

它一开始就明确：

- `rfcProfile=heavy`
- `stage=design-only`
- `risk=high`

而且它的产物链已经非常完整：

- [`task-brief.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/task-brief.md)
- [`research.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/research.md)
- [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/rfc.md)
- [`review-rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/review-rfc.md)
- [`report-walkthrough.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/report-walkthrough.md)
- [`pr-body.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/pr-body.md)

这个任务说明了一件事：Legion 已经可以在高风险任务里，把“先对齐意图，再放开执行”做成稳定流程。

### 2. `signal-trader`：Heavy 流程和实现闭环接上了

如果说 `heavy-rfc` 代表的是设计门禁的成熟，那么 [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md) 更像是它的延续：

- 先有 heavy 设计约束
- 再进入实现
- 再跑测试
- 再做 code/security review
- 再产出 walkthrough 和 PR body

从 [`signal-trader/tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/tasks.md) 能看到，这条链已经被压成标准阶段：

1. 任务定义与边界收敛
2. Heavy 研究与 RFC
3. RFC 对抗审查
4. RFC-only Draft PR 产物
5. Core Lib 实现
6. 测试与验证
7. 代码与安全评审
8. 报告与 PR 产物

这一步对我来说特别重要，因为它说明 Legion 到这里已经不是“有一套文档体系”，而是有了 **可以稳定复用的重型任务流程模板**。

这正是我在博客里说的那个身份转变：从执行者，慢慢变成审阅者、决策者和系统迭代者。

---

## 八、把这条轨迹和博客对照起来看

如果回过头去看《[对于 AI Agent 的思考](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)》，会发现很多判断，其实已经在 Legion 的历史里落地了。

### 1. “初尝 scale 的甜蜜点”

博客里写的是：多 Agent 并行推进任务，短期内会给人一种机械化收割的快感。

在 Legion 历史里，对应的是 2025-12 开始 task 快速增长：

- quote service
- quote routing
- SWR
- scheduler
- OHLC / interest rate
- token bucket

这时最核心的目标，确实就是：先让 Agent 多干活。

### 2. “真正的瓶颈变成了我自己”

当执行工作逐渐交给 Agent，人真正的瓶颈就变成了：

- 上下文管理
- 设计判断
- 验收
- 决策

Legion 的三件套，正是最早用来对抗这件事的：

- 用 `tasks.md` 减少进度丢失
- 用 `context.md` 外置决策和关键文件
- 用 `plan.md` 固定目标与范围

### 3. “隐含知识墙”

博客里最重要的判断之一，是 Agent 学到的往往只是可见样本，而不知道什么才是现在的标准。

Legion 的回应方式就是：

- 把 review 写进 plan
- 把约束写进 context
- 把设计争议写成结构化文档

也就是把项目的隐含知识外置化。

### 4. “意图对齐 + 分层验证”

博客里的流水线，到 `http-proxy-*` 和 `signal-trader` 这类任务里已经非常接近原样落地：

- Intent：Goal / Non-goals / Scope
- Plan：Phase / RFC / Design Summary
- Execute：实现
- Verify：test / review-code / review-security / bench
- Report：walkthrough / PR body
- Memory：context / archived task / ledger

### 5. “汇报接口是被低估的工程问题”

我在博客里说，结论应该尽量绑定 artifact，而不是停留在口头摘要。

Legion 现在已经明显朝这个方向走：

- 结论不是一句话，而是对应 report、review、test-report、PR body
- 验收不需要重新读全部代码，而是可以优先读凝练后的 artifact

虽然它还不是我理想中的 Citation Agent，但方向已经非常明确了。

### 6. “benchmark 会成为刚需”

博客里我说，未来必须能比较不同 workflow 或模型版本，而不是靠感觉说“这版更聪明”。

这条线在 Legion 里也已经出现雏形：

- `spec-bench.md`
- benchmark 场景和阈值
- bench 输出和报告

这说明它已经不只是一个想法，而是在进入工程化阶段。

---

## 九、站在现在看下一步：`legion-mind` 代表的最新演化方向

如果说 Yuan 仓库里的 `.legion/` 历史，主要回答的是“这套东西是怎么被真实需求逼出来的”；那么现在的 `~/Work/legion-mind` 则在回答另一个问题：

> 既然这套东西已经被逼出来了，下一步能不能把它从项目经验提炼成一个通用系统？

从这几个入口可以很明显地看到 Legion 的最新演化方向：

- [`README.md`](https://github.com/Thrimbda/legion-mind/blob/main/README.md)
- [`docs/legionmind-usage.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/legionmind-usage.md)
- [`.legion/playbook.md`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md)
- [`/evolve`](https://github.com/Thrimbda/legion-mind/blob/main/.opencode/commands/evolve.md)
- [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)

### 1. 从“仓库内 workflow”走向“通用编排模板”

在 Yuan 里，Legion 是跟着具体任务长出来的；到了 `legion-mind`，它已经被显式抽象成：

- primary agent：`legion`
- subagents：`engineer`、`spec-rfc`、`review-rfc`、`review-code`、`review-security`、`run-tests`、`report-walkthrough`
- skill：`skills/legionmind`

这说明 Legion 正在从“经验型 workflow”变成“角色清晰的编排系统”。

### 2. 从文档约束走向命令化入口

`legion-mind` 里最明显的一个变化，是把高频流程命令化了：

- `/legion`
- `/legion-impl`
- `/legion-rfc-heavy`
- `/legion-pr`
- `/legion-bootstrap`
- `/evolve`

这看起来只是使用体验优化，但本质上不是。它意味着 Legion 正在把原来靠隐性 SOP 维持的流程，进一步固化成显式入口。

### 3. 从 task memory 走向 organizational memory

Yuan 里的 Legion 已经能把单个任务的上下文持久化；而在 `legion-mind` 里，又往前走了一步：开始把跨任务经验沉淀到 [`playbook`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md) 里。

这很重要，因为：

- `plan/context/tasks` 解决的是“这个任务如何续跑”；
- `playbook` 解决的是“同类任务以后怎么少走弯路”。

现在 playbook 里已经开始沉淀类似这些规则：

- benchmark 输出必须留在仓库内
- benchmark 必须先固定 deterministic profile
- 缺失 summary 必须按 error 计入分母，不能静默缩小分母

也就是说，Legion 的最新记忆模型已经不只是 task memory，而开始尝试做 organizational memory。

### 4. 从“能用”走向“可安装、可验证、可回滚”

`legion-mind` 还有一个特别重要的方向：它开始考虑分发和复制能力。

README 里已经可以看到：

- `install`
- `verify --strict`
- `rollback`
- `safe-overwrite`
- managed files / backup index

这说明 Legion 的目标已经不只是“我自己在这个仓库里用着顺手”，而是：

- 如何安全同步资产
- 如何避免覆盖用户自己的修改
- 如何验证安装状态
- 如何在失败时回滚

也就是它开始从工作方法走向产品化资产。

### 5. 从经验总结走向 benchmark 驱动的系统迭代

我在博客里说过，未来最重要的事情之一，就是要能比较不同版本的 workflow，而不是靠感觉判断“这版更好”。

`legion-mind` 基本已经开始正面做这件事了：

- [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)
- benchmark baseline 命令
- benchmark-runs 目录
- preflight / smoke / full / score / report 流程

这意味着 Legion 的下一阶段，已经不是继续堆流程，而是开始回答更硬的问题：

- 哪种流程真的更稳？
- 哪种设计门禁更划算？
- 哪种 agent 编排更适合不同风险级别的任务？
- 哪些环节只是增加仪式感，哪些环节真的减少返工？

对我来说，这其实已经把 Legion 的下一阶段说得很清楚了：

> 从“把多 Agent 用起来”，走向“把多 Agent 系统作为一个可测量、可迭代、可复制的工程产品来建设”。

---

## 十、最后的归纳：Legion 是怎么一步一步长出来的

如果把整条轨迹再压缩一下，我会把它概括成五步。

### 第一步：先别忘事

先用 `plan/context/tasks` 把任务、进度和交接从脑子里拿出来。

### 第二步：把隐含知识写出来

通过 `REVIEW`、决策日志和上下文记录，把项目内部的局部知识外置化，降低 Agent 机械拟合旧样本的翻车概率。

### 第三步：先设计，后执行

通过 RFC、Spec、Review 把设计门禁固定下来，把高成本返工往前压。

### 第四步：把验证和汇报工程化

通过 test、bench、review-code、review-security、walkthrough、PR body 让验证和验收低成本化。

### 第五步：把自治变成受控自治

通过 proposal、approval、review 状态、ledger 审计，把多 Agent 协作从“能跑”推进到“可治理”。

所以最终的结论不是“Legion 让 Agent 变强了”，而是：

> Legion 让 Agent 的能力，第一次能以工程系统的方式被稳定使用。

它不是一个单点提效工具，而是一个围绕“少打扰、多产出、可验证、可交接、少磨损”逐渐长出来的系统。

博客写的是原则；Legion 的历史展示的是这些原则如何一步步变成制度、文档、流程和 artifact。两者合在一起，才构成了完整的故事。

---

## 附：如果要快速回看 Legion 的演进，我会优先看这些例子

1. [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md)
   - Legion 的起点样本
   - 三件套最早成型

2. [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md)
   - 隐含知识外置最典型
   - review/comment 密度极高

3. [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md)
   - 设计门禁和 spec 化开始成型

4. [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md)
   - 对抗审查、语义边界、风险接受、artifact 产出都很完整

5. [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md)
   - 多轮 RFC 对抗审查 -> 实现 -> 验证 -> PR -> 外部 review 修复 的完整链条

6. [`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md)
   - 高风险设计门禁的成熟样本

7. [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md)
   - Heavy 设计流和实现闭环接上的最新样本

如果说 [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md) 代表“Legion 出生了”，那么 [`http-proxy-*`](https://github.com/No-Trade-No-Life/Yuan/tree/main/.legion/tasks) 代表“Legion 长大了”，而 [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md) 和 [`legion-mind`](https://github.com/Thrimbda/legion-mind) 则代表 Legion 已经开始往“可复制、可 benchmark、可产品化”的下一阶段继续演化。
