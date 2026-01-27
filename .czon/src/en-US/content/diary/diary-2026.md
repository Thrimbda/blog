---
"title": "2026 Work Log"
"summary": "This document is a work log from January 22nd to 24th, 2026. The author details daily practices in software development (e.g., legionmind-github-bridge, node-unit improvements) and system design (multi-agent systems) using AI Agents like opencode and legionmind. The log includes specific tasks completed, problems encountered (e.g., cluster security, Agent knowledge modeling), ideas generated (e.g., increasing Agent autonomy, designing an evaluation system), and plans for the following day. The core argument is that the author is focused on scaling personal capabilities through AI Agents and exploring efficient workflows and Agent evaluation methods. The conclusion is the need to find a balance between Agent autonomy, contextual knowledge provision, and personal energy management."
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

1.  [2026](#orgf3197da)
    1.  [2026-01 January](#orge03e1ca)
        1.  [2026-01-22](#org4d65f86)
            1.  [What I did today:](#org1006a17)
            2.  [Thoughts:](#orgdb0ae87)
            3.  [What's the plan for tomorrow?](#org750daf2)
        2.  [2026-01-23](#org287b8dd)
            1.  [What I did today:](#orgf838e08)
            2.  [Thoughts:](#org8998678)
            3.  [What's the plan for tomorrow?](#orgc688fe4)
        3.  [2026-01-24](#org2a15db2)
            1.  [What I did today:](#orgab0f160)
            2.  [Thoughts:](#org68bf2d9)
            3.  [What's the plan for tomorrow?](#orge3ab04d)

<a id="orgf3197da"></a>

# 2026

<a id="orge03e1ca"></a>

## 2026-01 January

<a id="org4d65f86"></a>

### 2026-01-22

<a id="org1006a17"></a>

#### What I did today:

1.  Refactored the opencode-feishu-notifier; it now sends notifications to users in a predetermined manner.
2.  Continued having the AI work on legionmind-github-bridge. I started using opencode's multi-agent mode. It launched 5 agents to modify 5 issues, chugging along for 2 hours and completely consuming my 5-hour quota of codex tokens.
3.  A node in the sg cluster died today. Looking at the logs, it was under constant SSH brute-force attack attempts, which is not good. Briefly considered a few possible actions:
    - Disable password authentication.
    - Disable the SSH daemon's exposure to the entire internet.
    - Move the cluster behind a NAT.
4.  Handled some miscellaneous tasks. ZL is coming to Suzhou next week, spent some time making arrangements, but it didn't go smoothly. I don't plan to invest more mental energy into this.

<a id="orgdb0ae87"></a>

#### Thoughts:

At this stage, I can only manage 2-3 things simultaneously. This includes development work, daily scheduling, thinking, and output. Exceeding this range leads to poor task management and easy fatigue. This is even with me trying to delegate as much work as possible to AI Agents. Therefore, I think there are two directions for improvement:

- For coding tasks, I should maximize the autonomy of the agent, with several optimization goals:
  1.  Bother me as little as possible.
  2.  Let it do as much work as possible.
  3.  Improve the reliability of its work as much as possible.
- I also need some personal improvement:
  1.  Manage my mental energy better to avoid quick burnout.
  2.  Improve the ability to work across multiple different contexts simultaneously, avoiding forgetfulness and disorganization, and implement progress management.

Based on the above thoughts, I think I can try two directions tomorrow:

1.  Design a multi-agent template for legionmind and experiment with it on a coding task in Yuan using opencode.
2.  Continue logging work to explore methods for managing mental energy and context.

<a id="org750daf2"></a>

#### What's the plan for tomorrow?

1.  As mentioned above, run a multi-agent experiment.
2.  Continue working on legionmind-github-bridge.
3.  If time permits, work on cluster security.

---

Overall, my main focus right now is using AI to scale myself up, and then try to scale others.

<a id="org287b8dd"></a>

### 2026-01-23

I caught a bit of a cold today, had a headache, and was less productive. However, I'm glad I started doing daily summaries.

<a id="orgf838e08"></a>

#### What I did today:

1.  With AI assistance, designed a multi-agent system. This system hasn't been systematically polished yet.
2.  Made further progress on legionmind-github-bridge.
3.  Modified the preemption design and implementation in node-unit. Previously, when a node-unit failed, all deployments under it would be cleared. Now, they are cleaned up one by one.
4.  Took the CFFEX (China Financial Futures Exchange) exam required for opening a futures trading account. They required the camera to be on the entire time, no minimizing the window or switching screens. Luckily, unlimited attempts were allowed, which couldn't stump me. Passed with a high score of 95.

<a id="org8998678"></a>

#### Thoughts:

My goal is to achieve agent autonomy with minimal friction. My current workflow is:

1.  legionmind serves as an SOP for development work; it's an agent skill. I like the concept of agent skills.
2.  opencode serves as the agent entity. I use its capabilities like bash / tool calling / langraph / command / subagent. If I ever need to move away from opencode, these would be on my implementation checklist.
3.  My current headache is figuring out how to combine skills and these sub-agents.

I had a headache all day and only felt clear-headed by evening. I realized that writing down thoughts at the end of the day might not be the best approach. Maybe I should only record facts and summarize thoughts the next morning after waking up.

<a id="orgc688fe4"></a>

#### What's the plan for tomorrow?

1.  Use this multi-agent system to do something, like connecting Gate's wealth management account.
2.  Continue with legionmind-github-bridge.
3.  Cluster security, if time permits.
4.  Restart work time tracking. (Important)
5.  SY's friends will be visiting tomorrow, so work time might be preempted.

<a id="org2a15db2"></a>

### 2026-01-24

Slept in luxuriously until 11 AM today, feeling completely refreshed. Haven't slept so freely in a long time.

<a id="orgab0f160"></a>

#### What I did today:

1.  Deployed a new version of node-unit. I was confident enough to deploy it because I have relatively comprehensive end-to-end tests. Specifically, the test involves starting a timescaledb (postgresql17) in Docker, launching two node-units, inserting 21 `@yuants/portal` deployments into the database for testing, and observing them eventually converge to a state where each node-unit handles half.

    This test basically covers the scenario where a bunch of unclaimed deployments appear, and then two node-units come online, allowing observation of them taking turns preempting deployments. What it's really missing is a workload that actually consumes CPU/memory, and the scenario where a node-unit goes offline for some reason.

2.  Used the new multi-agent version of legionmind in Yuan to tackle the problem of outputting account flows for the vendor-gate earn account. I had the agent first use legion for documentation creation, producing the following documents:

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

    It feels like a proper workflow now. However, there's some conflict between my new multi-agent system and legionmind's original documentation writing. I should carefully consider the boundaries of each task. For example, specifications on how each type of document should be written should be placed in separate skills, and legionmind should be a description of the workflow. Each type of agent should be able to load several smaller skills to assist them in their work.

    Another shortcoming was that it made a mistake during its first run, outputting the account flow to `account-actions-with-credential.ts`. This happened because I instructed it to reference vendor-okx to complete the earn account integration. I gave this instruction because currently, only OKX's earn account is also integrated as an account. However, the AI learned some outdated practices from it. The current standard for exchange integration is to publish all accounts through `provideExchangeServices`, not to integrate accounts using `provideAccountActionsWithCredential`.

    This knowledge is something a brand new AI Agent doesn't possess. How should such knowledge be modeled? How should I provide such project context as an external brain for the AI Agent? This is a question worth pondering deeply and needs careful thought tomorrow.

3.  Cooked in the afternoon to entertain SY's friends, which exhausted me. So, back to work tomorrow~

<a id="org68bf2d9"></a>

#### Thoughts:

- As mentioned above, I need to carefully consider how to compactly design an external brain for AI Agents. The simplest could start with a set of AGENT.md files. I've tried this before, but the overhead of maintaining these documents themselves is quite high. Distinguishing between noise and truly valuable experience is a difficult problem. Currently, it seems memory, like other prompts, might just involve an additional loop for the agent to update its own memory. The most important thing is still how to measure the results of the AI Agent's work.

- Regarding the above point, I saw an article that I found very interesting. Let me summarize it in my own words: First, the evaluation of an agent's single-step work can be categorized into several types:
  1.  Static tool eval: Compiler, linter, unit tests, e2e tests.
  2.  Model eval: Using another LLM to judge based on a prompt we define.
  3.  Human eval: I judge it myself.

  Then, systematic evaluation of an Agent system is of two types:
  1.  Capability-based: Answers what this agent can do? The pass rate might be low, e.g., I want to use legion to gradually execute larger, more difficult tasks, feeling like exploring a new frontier.
  2.  Regression-based: Can it still maintain previously acquired capabilities? For example, repeatedly testing some tasks to ensure stable implementation.

  So, when a new capability is introduced, it should transition from capability-based to regression-based evaluation.

  The article also mentions two important metrics: `pass@K` and `pass^K`.
  - pass@k: At least one success in k attempts. The more attempts, the higher the probability of at least one success. Applicable: Scenarios where you only care about "finding at least one usable solution."
  - pass^k: All k attempts must succeed. The more attempts, the harder it is to maintain consistency. Applicable: Scenarios where users expect reliable production from the agent every time.

  FYI: [Reference this article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Energy levels are still a bit low. Worked for a while in the afternoon, and cooking in the evening made me feel tired. When will I be able to not need sleep like CZ?

<a id="orge3ab04d"></a>

#### What's the plan for tomorrow?

1.  Think about this eval agent model and continue iterating on the multi-agent system.
2.  Cluster security issue, must tackle it.
3.  legion-github-bridge