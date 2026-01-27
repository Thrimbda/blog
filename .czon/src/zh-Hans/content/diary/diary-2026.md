---
"title": "2026 工作日志"
"summary": "本文是 2026 年 1 月 22 日至 24 日的工作日志，作者详细记录了使用 AI Agent（如
  opencode、legionmind）进行软件开发（如 legionmind-github-bridge、node-unit
  改进）和系统设计（multi-agent 系统）的日常实践。日志中包含了具体完成的任务、遇到的问题（如集群安全、Agent 知识建模）、产生的想法（如提高
  Agent 自治、设计评估体系）以及次日计划。核心论点是作者正致力于通过 AI Agent 扩展个人能力（scale），并探索高效的工作流和 Agent
  评估方法。结论是需要在 Agent 自治、上下文知识提供和个人精力管理之间找到平衡。"
"tags":
  - "工作日志"
  - "AI Agent"
  - "软件开发"
  - "效率管理"
  - "Multi-Agent 系统"
  - "自动化"
  - "个人生产力"
"date": "2026-01-01"
---

# Table of Contents

1.  [2026](#orgf3197da)
    1.  [2026-01 January](#orge03e1ca)
        1.  [2026-01-22](#org4d65f86)
            1.  [今天做了什么：](#org1006a17)
            2.  [有什么想法：](#orgdb0ae87)
            3.  [明天打算做什么？](#org750daf2)
        2.  [2026-01-23](#org287b8dd)
            1.  [今天做了什么：](#orgf838e08)
            2.  [有什么想法：](#org8998678)
            3.  [明天打算做什么？](#orgc688fe4)
        3.  [2026-01-24](#org2a15db2)
            1.  [今天做了什么：](#orgab0f160)
            2.  [有什么想法：](#org68bf2d9)
            3.  [明天打算做什么？](#orge3ab04d)

<a id="orgf3197da"></a>

# 2026

<a id="orge03e1ca"></a>

## 2026-01 January

<a id="org4d65f86"></a>

### 2026-01-22

<a id="org1006a17"></a>

#### 今天做了什么：

1.  重构了一下 opencode-feishu-notifier，它现在会按照一个既定的方式发送通知给用户了。
2.  继续让 AI 编写 legionmind-github-bridge，我开始使用 opencode 的 multi-agent 模式了，它启动了 5 个 agent 修改 5 个问题，一个人吭哧吭哧运行了 2 个小时，消耗干净了我那 5 个小时的 codex tokens。
3.  今天 sg 集群死了一个节点，我看了一下日志竟然是被不断 ssh 尝试攻击，这并不妙，简单考察了一下，可以有几个方向可以做：
    - 关掉密码认证
    - 关掉针对全网的 sshd 通道
    - 把集群移动到 NAT 后面
4.  处理了一些杂事，zl 下周来苏州，花了一些时间做了一些安排，结果并不顺利，我不打算再付出心力在这个上面了。

<a id="orgdb0ae87"></a>

#### 有什么想法：

在目前这个阶段我只能同时调度 2-3 个事情。包括开发工作、日常安排、思考和输出。超出这个范围我就会调度不及，并且容易感到疲惫。这还是我已经尽量将工作安排给 AI Agent 的情况下，因此我觉得应该要有两点改进方向：

- 对于编码任务，我应该尽可能提高 agent 的自治程度，有几个优化目标：
  1.  尽量少来打扰我
  2.  它尽量多工作
  3.  尽可能提升它工作的可靠性
- 对于我自己也要有一些提升：
  1.  要管理好自己的心力，不至于快速疲惫
  2.  提升在多个不同的上下文中同时工作的能力，不至于丢三落四和忘记，并且要有进度管理

基于上述的思考，我觉得明天可以在两个方向上有所尝试：

1.  为 legionmind 设计一个 multiagent 模板，通过 opencode 在 yuan 的某个编码任务上做实验
2.  继续记录工作日志，摸索一个心力和上下文管理的方法。

<a id="org750daf2"></a>

#### 明天打算做什么？

1.  如前文所说，搞一个 mutliagent 的实验
2.  继续搞 legionmind-github-bridge
3.  如果有时间，搞搞集群安全性

&#x2014;

总体来说，我目前的主线是使用 AI 把自己 scale 起来，然后去尝试 scale 别人。

<a id="org287b8dd"></a>

### 2026-01-23

今天有点感冒了，有点头痛，产能低下，不过我很高兴我开始做每日总结了。

<a id="orgf838e08"></a>

#### 今天做了什么：

1.  在 AI 的帮助下设计了一套 multi-agent 系统，这个系统还没经过系统的打磨。
2.  legionmind-github-bridge 又往前走了一步。
3.  修改了一下 node-unit 的抢占设计和实现，之前在某个 node-unit 在 failed 的时候。其下所有的 deployment 都会被清除，现在只会一个一个清理。
4.  去考了一下期货券商开户中金所的考试，竟然要全程打开摄像头不许最小化不许切屏幕，好在可以无限尝试，这可难不倒我，95 分高调通过。

<a id="org8998678"></a>

#### 有什么想法：

我的目标是在尽量少的磨损的情况下做到 agent 自治，目前我的工作流是这样的：

1.  legionmind 作为一个开发工作的 SOP，它是一个 agent skill，我喜欢 agent skill
2.  opencode 作为 agent 的实体，我使用了其中的 bash / tool calling /
    langraph / command / subagent 等能力，如果我有一天要抛弃 opencode，那么这些就是我的待实现清单。
3.  现在我有点头痛的就是如何组合 skill 和这些子代理

头痛一天，到晚上才有点头脑清明，我发现一天结束的时候写这些想法可能不是一个好办法，也许应该只记录事实，然后等到明天早上醒来的时候再总结想法。

<a id="orgc688fe4"></a>

#### 明天打算做什么？

1.  利用这个 multi-agent 系统干点啥，把 gate 的理财账户接一下好了
2.  继续 legionmind-github-bridge
3.  集群安全性，如果有时间的话
4.  重新开始进行 work 计时。（重要）
5.  明天 sy 的朋友们会来做客，因此可能工作时间要被抢占

<a id="org2a15db2"></a>

### 2026-01-24

今天一觉爽睡到了 11 点，感觉一身轻松，好久没如此放肆地睡过觉了。

<a id="orgab0f160"></a>

#### 今天做了什么：

1.  上线了 node-unit 的新版本，比较敢放心上它的原因是我有比较详尽的端到端测试，具体来说就是 docker 启动了一个 timescaledb（postgresql17），然后启动了两个 node-unit，并在数据库里插入了 21 个 `@yuants/portal` 来测试，最终收敛成一人一半的状态。

    这个测试基本可以测出来当一堆无主的 deployment 出现的时候，上线了两个 node-unit，就可以观察到轮流抢占 deployment，要说真差点啥，一个是真正占据 cpu / memory 的工作负载，另一个是需要有 node-unit 因故下线这个场景。

2.  使用新的 multi-agent 版本的 legionmind 在 Yuan 中攻克了 vendor-gate earn 账户输出账户流的问题。我让 agent 先使用 legion 进行文档的创作，总计输出了下面这么多文档：

        .legion/tasks/vendor-gate
        ├── context.md
        ├── docs
        │   ├── api-doc.md
        │   ├── pr-body.md
        │   ├── report-walkthrough.md
        │   ├── rfc.md
        │   ├── spec-bench.md
        │   ├── spec-dev.md
        │   ├── spec-obs.md
        │   └── spec-test.md
        ├── plan.md
        └── tasks.md

    感觉是个像样的工作流了。不过我的新的 multi-agent 系统和原有的 legionmind 的文档写作有一些冲突，我应该仔细考虑各个事情的边界，比如每种文档该怎么写的规范应该放到一些单独的 skill 里，然后 legionmind 应该是一个工作流程的说明。每种 agent 都应该能加载几个比较小的 skill 来辅助它们完成自己的工作。

    还有一些不足的问题是，它第一次工作的时候翻了一个错误，把账户流输出到
    `account-actions-with-credential.ts` 中去了，这是因为我要求它参考 vendor-okx 来完成 earn 账户的接入，我之所以这么要求是因为目前只有 okx 的 earn 账户也被接入成一个 account 了。但是 ai 把这其中一些过时的实践也学去了，目前的 exchange 接入标准是把账户全部通过
    `provideExchangeServices` 发布，而不是使用
    `provideAccountActionsWithCredential` 来接入账户。

    这些知识是一个全新的 AI Agent 所不具备的，这些知识该怎么建模呢？我该怎么为 AI Agent 提供这样的项目上下文作为它的外置大脑呢？这是一个值得深思的问题，明天需要仔细思考。

3.  下午做饭来招待 sy 的朋友们，给我累坏啦，那么明天还是继续工作吧~

<a id="org68bf2d9"></a>

#### 有什么想法：

- 如同上文所说，我需要仔细考虑如何紧凑地为 AI Agent 设计一个外置大脑，最简单的可以从一组 AGENT.md 开始，我之前有尝试过，但是维护这些文档本身的 overhead 其实也挺高的，区分垃圾和真正值得记录的经验是一个很难的问题。目前看来记忆和其他的 prompt 一样，只不过可能多了一个 agent 自己有一条环路去更新记忆，最重要的还是如何去衡量 AI Agent 工作的结果。

- 有关于上一点，我看到一篇文章我感觉很有意思，现在让我用我的语言来摘要它：首先，对于 agent 一步工作的评估，这个评估可以分成几类：
  1.  静态工具 eval：编译器、linter、单元测试、e2e 测试
  2.  模型 eval：用另一个 LLM 按照我们定义的 prompt 来判断
  3.  人工 eval： 我来判断

  然后对于一个 Agent 的系统性评估分两种：
  1.  能力型：回答这个 agent 能做什么？而且可能通过率很低比如我要用 legion 来逐步执行更大、更难的任务，感觉像是探索一个新的边界。
  2.  回归型：它还能保持以前会的能力吗？比如重复地测试一些任务，保证还能够稳定实现。

  那么当一个新的能力被引入之后就应该从能力型过渡到回归型。

  这篇文章还提到两个很重要的指标，分别是 `pass@K` 和 `pass^K`
  - pass@k：k 次尝试里至少成功一次尝试越多，至少成功一次的概率越高。适用： 你只在乎“至少找到一个可用解”的场景
  - pass^k：k 次尝试必须全部成功尝试越多，要维持一致性就越难。适用： 用户期望每次都可靠的生产 agent

  FYI: [参考这篇文章](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- 精力还是有点差，下午 work 了一会，晚上做了个饭就感觉有些累，我什么时候能像 CZ 一样不用睡觉呢？

<a id="orge3ab04d"></a>

#### 明天打算做什么？

1.  思考下这个 eval agent 的模型，继续迭代这个 multi-agent 系统。
2.  集群安全问题，必须搞了
3.  legion-github-bridge