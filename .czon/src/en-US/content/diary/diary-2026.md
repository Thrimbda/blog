---
"title": "2026 Work Log"
"summary": "This document is a work log from January 22nd to 24th, 2026. The author details daily practices of using AI Agents (e.g., opencode, legionmind) for software development (e.g., legionmind-github-bridge, node-unit improvements) and system design (multi-agent systems). The log includes specific tasks completed, problems encountered (e.g., cluster security, Agent knowledge modeling), ideas generated (e.g., increasing Agent autonomy, designing an evaluation system), and plans for the following day. The core argument is that the author is working on scaling personal capabilities through AI Agents and exploring efficient workflows and Agent evaluation methods. The conclusion is the need to find a balance between Agent autonomy, providing contextual knowledge, and managing personal energy."
"tags":
  - "Work Log"
  - "AI Agent"
  - "Software Development"
  - "Efficiency Management"
  - "Multi-Agent System"
  - "Automation"
  - "Personal Productivity"
"date": "2026-01-01"
---

# Table of Contents

1.  [2026](#org7a37329)
    1.  [2026-01 January](#orgdf95c10)
        1.  [2026-01-22](#org46a8ace)
            1.  [What I did today:](#org4842a30)
            2.  [Thoughts:](#orgd3c2dea)
            3.  [What's the plan for tomorrow?](#orgfac9005)
        2.  [2026-01-23](#org53cf87b)
            1.  [What I did today:](#org420a748)
            2.  [Thoughts:](#org003bc35)
            3.  [What's the plan for tomorrow?](#org50de801)
        3.  [2026-01-24](#org5af0a91)
            1.  [What I did today:](#org69bd02c)
            2.  [Thoughts:](#org1f09dca)
            3.  [What's the plan for tomorrow?](#org8a10f91)
        4.  [2026-01-25](#org1d94cd3)
            1.  [What I did today:](#org1ca275c)
            2.  [Thoughts:](#org48ae323)
            3.  [What's the plan for tomorrow?](#org7111e30)
        5.  [2026-01-26](#org43faf05)
            1.  [What I did today:](#org8efa648)
            2.  [Thoughts:](#orga5425d1)
            3.  [What's the plan for tomorrow?](#orge845cbe)
        6.  [2026-01-27](#org3411989)

<a id="org7a37329"></a>

# 2026

<a id="orgdf95c10"></a>

## 2026-01 January

<a id="org46a8ace"></a>

### 2026-01-22

<a id="org4842a30"></a>

#### What I did today:

1.  Refactored `opencode-feishu-notifier`. It now sends notifications to users in a predetermined way.
2.  Continued having the AI work on `legionmind-github-bridge`. I started using opencode's multi-agent mode. It launched 5 agents to modify 5 issues, and chugged along for 2 hours, completely consuming my 5-hour quota of codex tokens.
3.  A node in the sg cluster died today. Looking at the logs, it was under constant SSH brute-force attack attempts. This is not good. Briefly considered a few possible actions:
    - Disable password authentication.
    - Disable the SSH daemon's exposure to the entire internet.
    - Move the cluster behind a NAT.
4.  Handled some miscellaneous tasks. ZL is coming to Suzhou next week, spent some time making arrangements, but it didn't go smoothly. I don't plan to invest more mental energy into this.

<a id="orgd3c2dea"></a>

#### Thoughts:

At this stage, I can only manage 2-3 things simultaneously. This includes development work, daily arrangements, thinking, and output. Exceeding this range leads to poor task management and easy fatigue. This is even with me trying to delegate work to AI Agents as much as possible. Therefore, I think there should be two directions for improvement:

- For coding tasks, I should maximize the autonomy of the agent. Optimization goals include:
  1.  Disturb me as little as possible.
  2.  Let it work as much as possible.
  3.  Improve the reliability of its work as much as possible.
- I also need some self-improvement:
  1.  Manage my mental energy to avoid quick burnout.
  2.  Improve the ability to work across multiple different contexts simultaneously, avoiding forgetfulness and disorganization, and maintain progress management.

Based on the above thoughts, I think I can try two directions tomorrow:

1.  Design a multi-agent template for legionmind and experiment with it on a coding task in Yuan using opencode.
2.  Continue keeping this work log to explore methods for managing mental energy and context.

<a id="orgfac9005"></a>

#### What's the plan for tomorrow?

1.  As mentioned above, conduct a multi-agent experiment.
2.  Continue working on `legionmind-github-bridge`.
3.  If time permits, work on cluster security.

---

Overall, my main focus right now is using AI to scale myself up, and then try to scale others.

<a id="org53cf87b"></a>

### 2026-01-23

Caught a bit of a cold today, had a headache, low productivity. However, I'm glad I started doing daily summaries.

<a id="org420a748"></a>

#### What I did today:

1.  With AI's help, designed a multi-agent system. This system hasn't been systematically polished yet.
2.  `legionmind-github-bridge` progressed another step.
3.  Modified the preemption design and implementation of `node-unit`. Previously, when a `node-unit` failed, all deployments under it would be cleared. Now, they are cleaned up one by one.
4.  Took the CFFEX (China Financial Futures Exchange) exam required for opening a futures trading account. It required the camera to be on the entire time, no minimizing or switching screens. Fortunately, unlimited attempts were allowed, which couldn't stump me. Passed with a high score of 95.

<a id="org003bc35"></a>

#### Thoughts:

My goal is to achieve agent autonomy with minimal friction. My current workflow is:

1.  `legionmind` serves as an SOP for development work. It's an agent skill. I like agent skills.
2.  `opencode` serves as the agent entity. I use its capabilities like bash / tool calling / langraph / command / subagent. If I ever need to abandon opencode, these would be on my implementation list.
3.  My current headache is how to combine skills and these sub-agents.

Had a headache all day, only cleared up a bit in the evening. I realized writing these thoughts at the end of the day might not be a good method. Maybe I should only record facts and summarize thoughts the next morning after waking up.

<a id="org50de801"></a>

#### What's the plan for tomorrow?

1.  Use this multi-agent system to do something. Let's connect Gate's investment account.
2.  Continue with `legionmind-github-bridge`.
3.  Cluster security, if time permits.
4.  Restart work time tracking. (Important)
5.  SY's friends will be visiting tomorrow, so work time might be preempted.

<a id="org5af0a91"></a>

### 2026-01-24

Slept in luxuriously until 11 AM today, feeling completely relaxed. Haven't slept so freely in a long time.

<a id="org69bd02c"></a>

#### What I did today:

1.  Deployed a new version of `node-unit`. I was relatively confident in deploying it because I have fairly comprehensive end-to-end tests. Specifically, I start a timescaledb (postgresql17) in Docker, then start two `node-unit` instances, insert 21 `@yuants/portal` deployments into the database for testing, and finally observe them converging to a state of one deployment per node-unit.

    This test basically verifies that when a bunch of unowned deployments appear and two node-units come online, you can observe them taking turns preempting deployments. What's really missing is a workload that actually consumes CPU/memory, and the scenario where a node-unit goes offline for some reason.

2.  Used the new multi-agent version of legionmind in Yuan to tackle the problem of outputting account flows for the vendor-gate earn account. I had the agent first use legion for documentation creation, producing the following documents in total:

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

    Feels like a decent workflow. However, there's some conflict between my new multi-agent system and the original legionmind's documentation writing. I should carefully consider the boundaries of each task. For example, specifications on how each type of document should be written should be placed in separate skills. Then, legionmind should be a description of the workflow. Each type of agent should be able to load several smaller skills to assist them in completing their work.

    Another shortcoming was that it made a mistake on its first attempt, outputting the account flow to `account-actions-with-credential.ts`. This was because I asked it to refer to vendor-okx to complete the earn account integration. I made this request because currently only OKX's earn account is also integrated as an account. But the AI learned some outdated practices from it. The current exchange integration standard is to publish all accounts through `provideExchangeServices`, not using `provideAccountActionsWithCredential` to integrate accounts.

    This knowledge is something a brand new AI Agent doesn't possess. How should this knowledge be modeled? How should I provide such project context as an external brain for the AI Agent? This is a question worth pondering deeply. Need to think carefully tomorrow.

3.  Cooked in the afternoon to entertain SY's friends. Exhausted me. So, back to work tomorrow~

<a id="org1f09dca"></a>

#### Thoughts:

- As mentioned above, I need to carefully consider how to compactly design an external brain for AI Agents. The simplest could start with a set of AGENT.md files. I've tried this before, but the overhead of maintaining these documents themselves is quite high. Distinguishing between junk and truly valuable experience is a difficult problem. Currently, it seems memory, like other prompts, might just have an extra loop where the agent updates the memory itself. The most important thing is still how to measure the results of the AI Agent's work.

- Regarding the previous point, I saw an article that I found very interesting. Let me summarize it in my own words: First, the evaluation of an agent's single-step work can be divided into several categories:
  1.  Static tool eval: Compiler, linter, unit tests, e2e tests.
  2.  Model eval: Using another LLM to judge based on a prompt we define.
  3.  Human eval: I judge.

  Then, systematic evaluation of an Agent is of two types:
  1.  Capability-based: Answers what this agent can do? The pass rate might be very low, e.g., I want to use legion to gradually execute larger, more difficult tasks, feeling like exploring a new frontier.
  2.  Regression-based: Can it still maintain previously acquired capabilities? For example, repeatedly testing some tasks to ensure stable implementation.

  So, when a new capability is introduced, it should transition from capability-based to regression-based.

  The article also mentions two important metrics: `pass@K` and `pass^K`.
  - pass@k: At least one success in k attempts. The more attempts, the higher the probability of at least one success. Applicable: Scenarios where you only care about "finding at least one usable solution."
  - pass^k: All k attempts must succeed. The more attempts, the harder it is to maintain consistency. Applicable: Scenarios where users expect reliable production from the agent every time.

  FYI: [Refer to this article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Energy levels are still a bit low. Worked a bit in the afternoon, cooked dinner in the evening, and felt somewhat tired. When will I be like CZ and not need sleep?

<a id="org8a10f91"></a>

#### What's the plan for tomorrow?

1.  Think about this eval agent model, continue iterating on this multi-agent system.
2.  Cluster security issue, must work on it.
3.  `legion-github-bridge`.

<a id="org1d94cd3"></a>

### 2026-01-25

Got a haircut today. Came back to find the system unstable. Turned out Jige had started two services with the same `terminal_id`, causing mutual preemption and major issues.

<a id="org1ca275c"></a>

#### What I did today:

1.  Attempted to migrate the cluster behind a NAT, of course using the brand new legion to accomplish this. My steps were:
    - First, modify the kops cluster, create a new VPC using the 172.21.0.0/24 and 172.21.1.0/24 CIDR blocks. Then created a NAT for egress traffic.

      Originally planned to use a 10.0.x.x CIDR, but after trying, found AWS doesn't allow creating such CIDRs, so switched to 172.21.x.x. There was a pitfall here: need to manually point the existing load balancer resources in the cluster to the corresponding VPC (originally implicitly default, now with an extra CIDR it needs manual specification).

    - Then, create new instance groups pointing to the new VPC. A small hiccup: the new IGs didn't have S3 permissions, not sure why. Manually added them, and nodes joined the cluster normally.
    - Next step: manually migrate services to the new IGs.
    - Finally, take down the old IGs.

    After finishing, found the cluster's egress traffic now had only one IP, causing some services with IP rate limiting to break down. Had no choice but to roll back. Must first skill up on HTTP proxy before proceeding.

2.  The multi-agent system was used in practice for an automatic script to update Midas net asset value. Deepseek chugged along writing for a long time, and I felt quite satisfied. The core issue here is that if there's an early design error I don't catch, I'm in for a massive waste of tokens and time, because I found agents don't work that fast either.

    Currently, these coding agents are still quite primitive. They often crash or exit due to network issues, etc. Having them handle serious long-running work still has poor SLIs (Service Level Indicators). This might also be an opportunity. A simple thought: this requires some software engineering knowledge on high availability, etc., to work.

<a id="org48ae323"></a>

#### Thoughts:

Fewer thoughts today, mostly written inline in the sections above.

<a id="org7111e30"></a>

#### What's the plan for tomorrow?

1.  Design Yuan's HTTP proxy mechanism.
2.  After deployment, re-migrate the cluster.

<a id="org43faf05"></a>

### 2026-01-26

Today was a day of restraint. I've noticed a significant improvement in handling emotions after turning 25: alongside the emotion, there's clearly a thread of rationality acting as a co-pilot. This thread of rationality inserts a control rod into the massive emotional reactor. Without this control rod, emotions can spiral out of control, triggering a self-sustaining chain reaction that could lead to countless irreversible consequences. Under the influence of this control rod, I begin to understand what can be said, what cannot be said, what can be done, what cannot be done, what decisions can be made, and what decisions cannot be made. This is a welcome change happening within me.

<a id="org8efa648"></a>

#### What I did today:

1.  Used legion today to design and implement Yuan's HTTP proxy. I found the process quite smooth. Midway, I reviewed its design, modified one point (how to select an available terminal), then let the agent have free rein. The results were quite good.
2.  Also used legion for the Midas auto-update task. However, the AI performed poorly, failing to correctly understand my requirements and the usage of `@yuants/protocol`. I have a few suspicions: the AI's intelligence might be insufficient (DeepSeek might still seem not smart enough); review wasn't strict enough; or the documentation/knowledge base isn't rigorous enough.
3.  Damn it, got woken up by alerts at night. A host died mysteriously. Looks like a CPU usage spike caused the host to enter an unrecoverable state. The host logs are a mess. My assessment: Alerts are useful, logs are crap. Noted!

<a id="orga5425d1"></a>

#### Thoughts:

1.  While showering, thought about the key points of my current collaboration with AI. One is the service availability of the AI agent itself—it shouldn't crash or exit mid-run. (On a side note, Ralph Loop basically improves availability through brute-force retries.) The other point is how I receive output from AI. For example, subordinates reporting to superiors still need a PPT or even a professional middle manager to act as an "expensive megaphone." How can AI's reporting to humans be limited to plain Markdown and code? Can AI's report link each item to an artifact? Can there be a Citation Agent specifically responsible for this part?

    However, my current usage of AI is quite limited, focused only on coding tasks.

2.  Think carefully about why, after having a multi-agent system, this system is steadily heading towards a crash. The previous speculation mentioned three possibilities:
    1.  The AI's own intelligence level.
    2.  Human review isn't strict enough.
    3.  The knowledge base isn't detailed enough to provide more correct information for the AI to bootstrap quickly.

    Let's examine these points. Point 1 doesn't need thinking. Putting effort into direction 2 could indeed rely on an increasingly detailed RFC document to give subsequent steps a sufficiently correct direction. But this development method feels like we're back to the **waterfall** development model, completing work through a linear process:

        Requirements Analysis -> Backend Design -> Backend Development -> Frontend Development -> Integration Testing

    The factors are also at two levels: technical and organizational/process, but the organizational/process level is the *primary factor*.

    The technical level is the natural dependency between tasks, e.g., frontend must wait for backend to provide APIs, backend must wait for product's CRD to be written.

    As a human organization, the waterfall model has issues: low efficiency, quality risks hard to expose, poor flexibility, team conflicts. As a collaboration method between me and AI, efficiency and team conflicts naturally don't exist in the AI world. It's like me and AI are entities living in different time dimensions; one day for me is like a year for AI. Well, low efficiency might waste some tokens, but that's not my main concern right now. The actual problem I face is quality risks from misunderstandings of requirements or facts, and poor flexibility.

    I must find a way to maximize the use of AI's capabilities while maximizing my own liberation. Based on human organizational experience, I must become a higher-level node in the command tree, able to confidently delegate tasks to AI while keeping it on track.

    The two most critical points:
    1.  Intent alignment.
    2.  Layered verification.

    Need to think deeper about this. I feel I need to use it more, savor it.

3.  I need to be wary of the downsides of my current state of "looking for nails with a hammer": path dependency, output over understanding.

<a id="orge845cbe"></a>

#### What's the plan for tomorrow?

ZL is coming tomorrow. Plan to exercise, have a meal, play board games.

<a id="org3411989"></a>

### 2026-01-27

ZL came today. Information overload, need to digest it. Played board games—Tragedy Looper. Spent three hours just understanding the rules. Finally, in the last scenario where I played the antagonist scriptwriter, I felt the sweet spot of the game. Ended with my complete victory.