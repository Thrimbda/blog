---
title: 2026 Work Log
date: 2026-01-01
---

# Table of Contents

1.  [2026](#org91ae5f8)
    1.  [2026-01 January](#org14e7d23)
        1.  [2026-01-22](#org987e5de)
            1.  [What I did today:](#orgb693af8)
            2.  [Thoughts:](#orgbbe0c52)
            3.  [What's the plan for tomorrow?](#org4c1530c)
        2.  [2026-01-23](#org9670646)
            1.  [What I did today:](#org5b02719)
            2.  [Thoughts:](#orgcd67dde)
            3.  [What's the plan for tomorrow?](#org55c5e88)
        3.  [2026-01-24](#org93f4e20)
            1.  [What I did today:](#orgabed47d)
            2.  [Thoughts:](#orgdb4d8bb)
            3.  [What's the plan for tomorrow?](#org1e207dc)
        4.  [2026-01-25](#org7ceb7a6)
            1.  [What I did today:](#org1fc8b40)
            2.  [Thoughts:](#orgbbaf9e2)
            3.  [What's the plan for tomorrow?](#org3c32f7f)
        5.  [2026-01-26](#org80b755f)
            1.  [What I did today:](#org80224a0)
            2.  [Thoughts:](#org5b61931)
            3.  [What's the plan for tomorrow?](#orga6c35c5)
        6.  [2026-01-27](#org98d2dad)
        7.  [2026-01-31](#org756539f)
            1.  [What I did today:](#org57e9aa8)
            2.  [Thoughts](#orgcaa37f7)
            3.  [Plan for tomorrow](#orgf2eb618)
        8.  [2026-02-01](#org0700b38)
        9.  [2026-02-02](#org1f4b65c)
            1.  [What's the plan for tomorrow?](#org149a83d)
        10. [2026-02-05](#org6221927)
            1.  [chatgpt pro](#org68b3fdf)
            2.  [Wrapping up http-proxy](#org2f33c3f)
            3.  [Iterating on Legionmind](#org43f0ced)



<a id="org91ae5f8"></a>

# 2026




<a id="org14e7d23"></a>

## 2026-01 January


<a id="org987e5de"></a>

### 2026-01-22


<a id="orgb693af8"></a>

#### What I did today:

1.  Refactored `opencode-feishu-notifier`. It now sends notifications to users in a predetermined way.
2.  Continued having AI work on `legionmind-github-bridge`. I started using opencode's multi-agent mode. It launched 5 agents to modify 5 issues, ran for 2 hours straight, and exhausted my 5-hour Codex tokens.
3.  A node in the SG cluster died today. I checked the logs and found it was under constant SSH brute-force attacks. This is not good. Briefly considered a few directions:
    -   Disable password authentication.
    -   Disable SSH access from the public internet.
    -   Move the cluster behind a NAT.
4.  Handled some miscellaneous tasks. ZL is coming to Suzhou next week, spent some time making arrangements, but it didn't go smoothly. I don't plan to invest more mental energy into this.


<a id="orgbbe0c52"></a>

#### Thoughts:

At this stage, I can only manage 2-3 things simultaneously. This includes development work, daily arrangements, thinking, and output. Beyond this, I struggle to keep up and get tired easily. This is even with me trying to delegate work to AI Agents as much as possible. Therefore, I think there are two areas for improvement:

-   For coding tasks, I should maximize agent autonomy. Optimization goals:
    1.  Bother me as little as possible.
    2.  Let it do as much work as possible.
    3.  Improve the reliability of its work as much as possible.
-   I also need to improve myself:
    1.  Manage my mental energy better to avoid quick burnout.
    2.  Improve my ability to work across multiple different contexts simultaneously, avoiding forgetfulness and disorganization, and manage progress.

Based on the above, I think I can try two things tomorrow:

1.  Design a multi-agent template for Legionmind and experiment with it on a coding task in Yuan using opencode.
2.  Continue logging work to explore methods for managing mental energy and context.


<a id="org4c1530c"></a>

#### What's the plan for tomorrow?

1.  As mentioned, experiment with a multi-agent setup.
2.  Continue working on `legionmind-github-bridge`.
3.  If time permits, work on cluster security.

---

Overall, my main focus is using AI to scale myself up, and then try to scale others.


<a id="org9670646"></a>

### 2026-01-23

Caught a bit of a cold today, had a headache, low productivity. But I'm glad I started doing daily summaries.


<a id="org5b02719"></a>

#### What I did today:

1.  With AI's help, designed a multi-agent system. This system hasn't been systematically polished yet.
2.  `legionmind-github-bridge` progressed a bit further.
3.  Modified the preemption design and implementation in `node-unit`. Previously, when a `node-unit` failed, all deployments under it would be cleared. Now they are cleared one by one.
4.  Took the CFFEX (China Financial Futures Exchange) exam for futures brokerage account opening. It required the camera to be on the whole time, no minimizing or switching screens. Luckily, unlimited attempts were allowed. That couldn't stop me, passed with a high score of 95.


<a id="orgcd67dde"></a>

#### Thoughts:

My goal is to achieve agent autonomy with minimal friction. My current workflow is:

1.  Legionmind, as an SOP for development work, is an agent skill. I like agent skills.
2.  Opencode serves as the agent entity. I use its bash / tool calling / langraph / command / subagent capabilities. If I ever abandon opencode, these are on my to-implement list.
3.  My current headache is how to combine skills and these sub-agents.

Had a headache all day, only cleared up a bit in the evening. I realized writing these thoughts at the end of the day might not be the best approach. Maybe I should just record facts and summarize thoughts the next morning when I wake up.


<a id="org55c5e88"></a>

#### What's the plan for tomorrow?

1.  Use this multi-agent system to do something. Let's connect Gate's investment account.
2.  Continue with `legionmind-github-bridge`.
3.  Cluster security, if time permits.
4.  Restart work time tracking. (Important)
5.  SY's friends are visiting tomorrow, so work time might be compromised.


<a id="org93f4e20"></a>

### 2026-01-24

Slept in until 11 AM today, felt incredibly relaxed. Haven't slept so freely in a long time.


<a id="orgabed47d"></a>

#### What I did today:

1.  Deployed a new version of `node-unit`. I was confident because I have fairly comprehensive end-to-end tests. Specifically, I started a timescaledb (PostgreSQL 17) in Docker, launched two `node-unit` instances, inserted 21 `@yuants/portal` deployments into the database for testing, and they eventually converged to a split state.
    
    This test basically covers the scenario where a bunch of unassigned deployments appear, and two `node-unit` instances come online, observing them preempt deployments in turn. What's missing? One is a real workload consuming CPU/memory, and the other is the scenario where a `node-unit` goes offline unexpectedly.

2.  Used the new multi-agent version of Legionmind in Yuan to tackle the issue of outputting account flows for the vendor-gate earn account. I had the agent first use Legion for documentation creation, producing the following documents:
    
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
    
    Feels like a proper workflow now. However, there's some conflict between my new multi-agent system and Legionmind's original documentation writing. I should carefully consider the boundaries of each task. For example, specifications for how each type of document should be written should be placed in separate skills, and Legionmind should be a workflow description. Each type of agent should be able to load a few smaller skills to assist in their work.
    
    Another issue was that it made a mistake on its first attempt, outputting account flows to `account-actions-with-credential.ts`. This was because I asked it to reference vendor-okx to integrate the earn account (since only okx's earn account is currently integrated as an account). But the AI learned some outdated practices from it. The current exchange integration standard is to publish all accounts via `provideExchangeServices`, not using `provideAccountActionsWithCredential` for account integration.
    
    This knowledge is something a brand new AI Agent lacks. How should such knowledge be modeled? How can I provide such project context as an external brain for the AI Agent? This is a question worth pondering deeply. Need to think about it carefully tomorrow.

3.  Cooked in the afternoon to entertain SY's friends. Exhausted me! So, back to work tomorrow~


<a id="orgdb4d8bb"></a>

#### Thoughts:

-   As mentioned above, I need to carefully consider how to compactly design an external brain for AI Agents. The simplest could start with a set of AGENT.md files. I've tried this before, but the overhead of maintaining these documents is quite high. Distinguishing between noise and truly valuable experience is difficult. Currently, it seems memory, like other prompts, just has an extra loop for the agent to update its memory. The most important thing is still how to evaluate the results of the AI Agent's work.

-   Regarding the above point, I read an article that I found very interesting. Let me summarize it in my own words: First, evaluating a single step of an agent's work can be categorized into:
    
    1.  Static tool eval: Compiler, linter, unit tests, e2e tests.
    2.  Model eval: Using another LLM to judge based on our defined prompt.
    3.  Human eval: I judge.
    
    Then, systematic evaluation of an Agent system is of two types:
    
    1.  Capability-based: Answers what this agent can do? The pass rate might be low, e.g., using Legion to gradually execute larger, more difficult tasks, like exploring a new frontier.
    2.  Regression-based: Can it still maintain previously acquired capabilities? For example, repeatedly testing some tasks to ensure stable performance.
    
    So, when a new capability is introduced, it should transition from capability-based to regression-based.
    
    The article also mentions two important metrics: `pass@K` and `pass^K`.
    
    -   `pass@k`: At least one success in k attempts. The more attempts, the higher the probability of at least one success. Applicable: You only care about "finding at least one usable solution."
    -   `pass^k`: All k attempts must succeed. The more attempts, the harder it is to maintain consistency. Applicable: Users expect reliable production agents every time.
    
    FYI: [Reference this article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

-   Energy levels are still a bit low. Worked a bit in the afternoon, cooked dinner, and felt tired. When will I be like CZ and not need sleep?


<a id="org1e207dc"></a>

#### What's the plan for tomorrow?

1.  Think about this eval agent model, continue iterating on the multi-agent system.
2.  Cluster security issue, must do it.
3.  `legion-github-bridge`.


<a id="org7ceb7a6"></a>

### 2026-01-25

Got a haircut today. Came back to find the system unstable. Turned out to be Ji Ge running two services with the same `terminal_id`, causing preemption issues and major problems.


<a id="org1fc8b40"></a>

#### What I did today:

1.  Attempted to migrate the cluster behind a NAT, of course using the new Legion for this. My steps were:
    
    -   First, modified the kOps cluster, created a new VPC using the 172.21.0.0/24 and 172.21.1.0/24 CIDR blocks. Then created a NAT for egress traffic.
        
        Originally planned to use a 10.0.x.x CIDR, but AWS didn't allow creating that, so switched to 172.21.x.x. There was a pitfall: needed to manually point the existing load balancer to the corresponding VPC in the cluster resource (it was implicitly default before, now with an extra CIDR it had to be specified manually).
    
    -   Then created new instance groups pointing to the new VPC. A small hiccup: the new IGs didn't have S3 permissions, not sure why. Manually added them, and nodes joined the cluster normally.
    
    -   Next, manually migrated services to the new IGs.
    
    -   Finally, took down the old IGs.
    
    After finishing, found that cluster egress traffic now had only one IP, causing issues with our IP rate-limited services. Had no choice but to roll back. Must first implement the http-proxy feature before proceeding.

2.  Used the multi-agent system to practice an automatic script for updating Midas net asset value. Deepseek worked on it for a long time, and I was quite satisfied. A core issue here is that if there's an early design error I don't catch, it leads to massive token and time waste, as I found agent work isn't that fast either.
    
    Currently, these coding agents are still quite primitive. They often crash or exit due to network issues, etc. Having them handle serious long-running work still has poor SLIs. This might also be an opportunity. Thinking simply, this requires some software engineering, high availability knowledge, etc., to work.


<a id="orgbbaf9e2"></a>

#### Thoughts:

Fewer thoughts today, mostly written inline in the sections above.


<a id="org3c32f7f"></a>

#### What's the plan for tomorrow?

1.  Design the http-proxy mechanism for Yuan.
2.  After deployment, re-migrate the cluster.


<a id="org80b755f"></a>

### 2026-01-26

A day of restraint. I've noticed a significant improvement in handling emotions after turning 25: alongside strong emotions, there's a clear thread of理智 (reason) acting as a copilot. This thread of理智 acts like a control rod within the massive emotional reactor. Without this rod, emotions can spiral out of control, triggering a self-sustaining chain reaction with potentially countless irreversible consequences. With this rod, I begin to understand what can be said, what cannot, what can be done, what cannot, what decisions can be made, what cannot. This is a welcome change happening within me.


<a id="org80224a0"></a>

#### What I did today:

1.  Used Legion today to design and implement the http-proxy for Yuan. Felt quite smooth to use. Midway, I reviewed its design, modified one point (how to select an available terminal), then let the agent take over. The results were quite good.
2.  Also used Legion for the Midas auto-update task. But the AI performed poorly, failing to correctly understand my requirements and the usage of `@yuants/protocol`. I have a few suspicions: AI's intelligence isn't sufficient (Deepseek might still be a bit dumb); review wasn't strict enough; or the documentation/knowledge base isn't rigorous enough.
3.  Damn it, got woken up by alerts at night. A host died mysteriously. Looks like a CPU usage spike caused the host to enter an unrecoverable state. The host logs are a mess. My assessment: Alerts are useful, logs are garbage. Noted!


<a id="org5b61931"></a>

#### Thoughts:

1.  While showering, thought about the key points of my current collaboration with AI. One is the service availability of the AI agent itself—it shouldn't crash or exit while running. (By the way, Ralph Loop basically improves availability through brute-force retries.) The other point is how I receive output from AI. For example, subordinates reporting to superiors still need a PPT or even a professional middle manager to act as an "expensive megaphone." How can AI's reporting to humans be limited to plain Markdown and code? Can AI's report link each item to an artifact? Can there be a Citation Agent专门负责 this part?
    
    However, my current use of AI is quite limited, mostly focused on coding tasks.

2.  Think carefully about why, after having a multi-agent system, it's steadily heading towards a crash. The earlier speculation mentioned three possibilities:
    
    1.  AI's own intelligence level.
    2.  Human review isn't strict enough.
    3.  The knowledge base isn't detailed enough to provide more correct information for the AI to bootstrap quickly.
    
    Let's examine these points. Point 1 doesn't need much thought. Working on point 2确实可以 rely on an increasingly detailed RFC document to give subsequent steps a sufficiently correct direction. But this development approach feels like we're back to the **waterfall** development model, completing work through a linear process:
    
        Requirements Analysis -> Backend Design -> Backend Development -> Frontend Development -> Integration Testing
    
    The factors are at two levels: technical and organizational/process, but the organizational/process level is the *primary factor*.
    
    The technical level is the natural dependency between tasks, e.g., frontend must wait for backend to provide APIs, backend must wait for product's CRD to be written.
    
    In human organizations, the waterfall model has issues: low efficiency, quality risks hard to expose, poor flexibility, team conflicts. In my collaboration with AI, efficiency and team conflicts naturally don't exist in the AI world. It's like AI and I live in different time dimensions; one day for me is like a year for AI. Well, low efficiency might waste more tokens, but that's not my main concern right now. The actual problem I face is quality risks from misunderstandings of requirements or facts, and poor flexibility.
    
    I must find a way to maximize the use of AI's capabilities while maximizing my own liberation. Based on human organizational experience, I must become a higher-level node in the command tree, able to confidently delegate tasks to AI while keeping it on track.
    
    The two most critical points:
    
    1.  Intent alignment.
    2.  Layered verification.
    
    Need to think deeper about this. I feel I need to use it more and get a better sense.

3.  I need to be wary of the downside of being in a "looking for nails with a hammer" state: path dependency, output over understanding.


<a id="orga6c35c5"></a>

#### What's the plan for tomorrow?

ZL is coming tomorrow. Plan to exercise, have a meal, play board games.


<a id="org98d2dad"></a>

### 2026-01-27

ZL came, lots of information to digest. Played board games, Tragedy Looper. Spent three hours understanding the rules. Finally, in the last scenario where I played the antagonist Scriptwriter, I felt the sweet spot of the game, ending with my complete victory.


<a id="org756539f"></a>

### 2026-01-31

The past few days have been quite packed, so no records. But stopping recording is not an option, so I'm picking it up now and recording everything together.

Besides being busy, why didn't I record?

1.  Because of the fear that recording requires sitting down specifically for 30+ minutes to record a day. This creates fear and burden around daily logging, which is not good.
2.  Usually, I only want to start recording a day when it's truly over. But thinking about it, this is somewhat anti-human, because I usually go to bed quickly when it's time to sleep, not because I've truly finished everything I wanted to do (does that ever happen?). This leads to not recording when I have time, and when it's time to record, I need to get into bed quickly, compounded by issue 1.

Combined, they pile up.


<a id="org57e9aa8"></a>

#### What I did today:

> Correction: What I've done in recent days

1.  Started using Neovim, recommended by SC. Why? I saw `nvim-orgmode` seems to have become a truly usable org-mode, and I'm starting to get tired of Emacs:
    
    -   Endless update failures.
    -   Confusing debugging and error messages.
    -   Useless flexibility that only adds burden for me.
    -   I don't understand Emacs Lisp and don't want to.
    
    For years, I've endured the above to use org-mode, but nowhere else let me use org-mode properly. Now the nvim阵营 seems to have a viable alternative, why not try it?
    
    As a long-time vim user who also used evil-mode (vim-mode) in Emacs, I never felt using vim would be a big burden. I can't survive in VSCode or IntelliJ IDEA without vim, so using nvim directly is no problem for me.
    
    With the barrier gone, let's examine nvim's ecosystem. Nvim, without the historical baggage of vimscript, directly uses Lua as its configuration and plugin language. So it can move forward lightly, and the community is very active. I see nvim's plugin system has been unified by a system called `lazy.vim`. Nvim's design for its plugin and configuration systems seems to be an organized, planned, bold innovation specifically targeting vim's pain points. In vim & emacs, there are probably countless similar attempts to unify, but due to a fragmented community, none truly succeeded.
    
    So I directly tried lazyVim. Wow, now I feel like I directly have a VSCode, and this VSCode can run in the terminal. Do you know how awesome that is?
    
    Now I have a powerful Old One based on new infrastructure, and it's巨简单 to configure. Flexibility and convenience are收敛恰到好处. My old pain points are mostly solved.
    
    I spent almost no time switching a lot of my workflow over. I now use tmux with 5 windows, each opening nvim in a folder. In nvim, the left is the directory tree, the middle is code, and the right is opencode and terminal.

2.  Updated a version of Legion. I大幅 reduced the text volume of the Legionmind skill (from 4k lines). Currently, it feels like there are fewer things I need to worry about, but I'm not sure if it's because I've been using smarter models lately or because this version of Legionmind is actually smarter.

3.  Set up an openclaw. Minimax 2.1 is still a bit dumb, but as a personal assistant, I think openclaw is quite capable, as it's basically a ChatGPT with memory + hands and feet (can operate my computer).

4.  Added http-proxy functionality to Yuan, added metrics, etc.


<a id="orgcaa37f7"></a>

#### Thoughts

Sometimes, using AI to write things feels like debugging code whose原理 (principles) I don't fully understand—constantly testing its behavior or printing logs to assist debugging, tweaking here and there until I get a satisfactory result. Let's explore the origin of this feeling.

Using AI to write code, in essence, involves a human inputting a prompt containing specific instructions, hoping the AI can understand the implicit instructions and information behind them and correctly complete the task.

The instructions we hope to convey to the AI can be layered: the top layer is the instruction for the current task. Below that are technical decisions made for this software project, best practices总结出来 for local parts of the project after weighing pros and cons. Further down is background information about the problem domain the project aims to solve. Further down is the professional background knowledge of the software engineer using AI—their personal preferences, technical biases, style preferences, historical experience,积淀 of思维方式. The bottom layer is the world's background knowledge.

In a single conversation with AI, what can be made clear to the AI is only the instruction for the current task. We then hope the AI possesses sufficient background knowledge about the world and the problem domain.

Therefore, it can be inferred that if a task's context is small enough, the given instructions are crystal clear, and there's no historical baggage, the AI should easily complete the task with high quality. If there's a lot of implicit background information, it's easy to produce莫名其妙 (bizarre) work.

What Legionmind aims to do is let the AI accumulate background knowledge and best practices related to the project and problem domain itself. This requires the AI to either have good logical thinking and memory (context capacity), or possess ample world background knowledge. Beyond these, it can't be saved.

---

Also, I feel like I should have discovered nvim much earlier.


<a id="orgf2eb618"></a>

#### Plan for tomorrow

Going to SC's place tomorrow to see his new home, then play board games together, and顺便给 SY look at ski gear.


<a id="org0700b38"></a>

### 2026-02-01

Went to Cold Mountain to look at ski boots for SY. Measured foot length (245) and found a comfortable pair. Unfortunately, the nice colors were out of stock at Cold Mountain, so SY has to buy online.

Had lunch at SC's place, ate the food he cooked. He has a sous-vide device for steak; the steak was really tender. SC prepared a room tour puzzle for us with two clues. The first clue required finding 4 English words/sentences in 4 places, using a positional cipher to form a word: "Three." The second clue came from an environmental puzzle, finally obtaining the numbers 31 / 13 (I can't remember exactly) to get a chocolate from a drawer with many numbered small boxes.

Unfortunately, he was out of chocolate, so we got a cute sticker.

---

The board game session in the afternoon was even more interesting. The main event was, of course, "The King's Dilemma" (领国者). In the end, SC, playing the middle class, achieved an unprecedented victory—the first time the middle class has won in our games. PGW, playing the capitalist, was furious because Xiao Haozi, playing the government, didn't help him on two crucial policy reform votes. I played the working class, naturally having little common interest with the capitalist on most issues, couldn't help. In fact, at the end, the scores of the three of us (excluding PGW) were very close. A world where only the capitalist got hurt was achieved.

This game is really fun and has become my favorite board game. It has considerable depth; each of the four players has vastly different playstyles. Playing a different role each time is a completely different experience. This time, as the working class, I experienced surplus unemployed人口 for the first time (because the government and capitalist were unwilling to open new companies), reaching the condition to发动工人示威暴动 (initiate worker demonstrations/riots). The working class took to the streets, threatening to turn the country upside down. Specifically, it grants influence dice and deducts a total of (unemployed population - 2 + number of unions) points from other classes.

Sure enough, where the working class used to need to盘算着劝说者祈求着 (scheme, persuade, beg) the capitalist and government to open new companies, now they争先恐后 (scrambled) to open new companies, revitalizing the game. In the end, I scored 101 points, taking second place.


<a id="org1f4b65c"></a>

### 2026-02-02

Exercised today, then cleared my mind and did nothing.


<a id="org149a83d"></a>

#### What's the plan for tomorrow?

1.  Get all http-proxy related stuff working, fix up the cluster.
2.  Set up `org-mode.nvim` properly.
3.  Research transit stations (中转站).


<a id="org6221927"></a>

### 2026-02-05

Time to record my day! Trying a different format today.


<a id="org68b3fdf"></a>

#### chatgpt pro

On Friday, I made a snap decision and bought a ChatGPT Pro subscription on闲鱼 (Xianyu, a second-hand marketplace) for 1369 CNY. I saw it was cheaper than 200 USD, so I bought it爽快 (readily). It wasn't ready until Tuesday. He gave me an Outlook邮箱 (email) and a ChatGPT account bound to it.

I logged into the Outlook邮箱 and saw a ChatGPT bill, paid in Philippine Peso.

<table border="2" cellspacing="0" cellpadding="6" rules="groups" frame="hsides">


<colgroup>
<col  class="org-left" />

<col  class="org-left" />
</colgroup>
<tbody>
<tr>
<td class="org-left">plan</td>
<td class="org-left">amount</td>
</tr>

<tr>
<td class="org-left">ChatGPT Pro Subscription</td>
<td class="org-left">₱8919.64</td>
</tr>

<tr>
<td class="org-left">&#xa0;</td>
<td class="org-left">Tax: ₱1070.36</td>
</tr>

<tr>
<td class="org-left">&#xa0;</td>
<td class="org-left">Total: ₱9990.00</td>
</tr>

<tr>
<td class="org-left">Payment method</td>
<td class="org-left">Mastercard-xxxx</td>
</tr>
</tbody>
</table>

Curious, I checked the equivalent CNY price—only about 1174.54 CNY! That means he made nearly 200 CNY profit!

Then I researched. Damn it. He deserves that money! The Philippines确实 is the cheapest place globally to buy a ChatGPT Pro plan. Impressive.

I have reliable contacts in Thailand. I thought about复制他的成功 (replicating his success), but哈哈 (ha ha), Thailand is more expensive—about 1537 CNY. So, could I potentially sell Philippine ChatGPT subscriptions on类似闲鱼 (similar marketplaces) in places like Poland (1942 CNY)? 🤔


<a id="org2f33c3f"></a>

#### Wrapping up http-proxy

Finally got the http-proxy stuff working. My goodness, it was more complex than I thought. This also demonstrates that Legion's ability to work on the same topic across 8 projects in a mono-repo is almost at its limit. I even encountered subagent闪退 (crashing) issues a few times.

But then again, without Legionmind, I印象 (recall) that directly giving AI instructions根本搞不定 (simply couldn't handle) problems of this magnitude. This indirectly shows the unique capabilities Legionmind exhibits in such situations.

In the end, Legion itself搞定 (handled) this task. I can now基本脱离编码 (basically step away from coding), and in most cases, only leave少量 (a small amount of) review comments on design documents. I'm quite satisfied with this version of Legion.


<a id="org43f0ced"></a>

#### Iterating on Legionmind

Speaking of Legionmind.

I upgraded Legion again tonight. I feel that rigidly defining a workflow for it is still a bit僵化 (inflexible). Essentially, it's still making AI work within my framework. But AI, especially smart AI like Codex 5.2 extra high (which I often use after getting ChatGPT Pro), actually understands everything. I'm not sure if my multi-agent system is somewhat wasteful in this regard. I think as AI gets smarter, letting it design its own workflow should be a more reasonable way to work. At this level, whether it's me, Manus, or oh-my-opencode, we are essentially铺路人 (paving the way) before AI can completely replace humans in existing human work. As Nietzsche said, man is a bridge to the overman.

So, back on topic, we should scientifically and systematically test the performance of different Legion versions. There should be a benchmark to test how different Legions perform facing the same set of complex coding tasks. I should尽快搞出 (quickly create) such a benchmark tool (maybe参考 (reference) common industry benchmarks?).

Besides continuing Yuan work, I need to focus on this area.

Speaking of which, I haven't continued working on the `legionmind github bridge` these past few days. The reason is I saw opencode itself has this capability. Rather than stubbornly finishing it full of bugs, it's better to暂时先 hold (put it on hold for now). I think it's better not to do things容易被海浪拍死 (easily crushed by waves), but to be a boat that rises with the rising tide. (This metaphor is抄自 (copied from) Manus's blog.)

---

That's it for today. I saw CZ's cross-server comment. I think I should indeed record when I feel like it, but habits take time to cultivate. For me, the biggest meaning of recording isn't to回顾 (look back on) the details of a day in the future, but the act of recording itself is a process of deep, chain-of-thought thinking. Even if no one ever reads this log, the act of recording still holds significant meaning for me.