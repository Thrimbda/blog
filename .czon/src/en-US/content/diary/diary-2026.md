---
"title": "2026 Work Log: Exploring AI Collaboration and Personal Efficiency"
"summary": "This article is the author's work log from January to early February 2026, detailing daily development, thoughts, and life. The core focus is on how to collaborate with AI to enhance personal efficiency, including designing a multi-agent system (Legionmind), optimizing workflows (e.g., using Neovim), and solving technical problems (e.g., cluster security, HTTP proxy). The author reflects on the challenges of AI collaboration (such as intent alignment, knowledge base construction) and personal energy management, and shares experiences with tools (like purchasing ChatGPT Pro) and social activities. The log embodies a continuous exploration of technological iteration, efficiency improvement, and life balance."
"tags":
  - "Work Log"
  - "AI Collaboration"
  - "Multi-Agent System"
  - "Efficiency Improvement"
  - "Toolchain"
  - "Personal Growth"
  - "Technical Reflection"
  - "Neovim"
"date": "2026-02-05"
---

# Table of Contents

1.  [2026](#org91ae5f8)
    1.  [2026-01 January](#org14e7d23)
        1.  [2026-01-22](#org987e5de)
            1.  [What I did today:](#orgb693af8)
            2.  [Thoughts:](#orgbbe0c52)
            3.  [What to do tomorrow?](#org4c1530c)
        2.  [2026-01-23](#org9670646)
            1.  [What I did today:](#org5b02719)
            2.  [Thoughts:](#orgcd67dde)
            3.  [What to do tomorrow?](#org55c5e88)
        3.  [2026-01-24](#org93f4e20)
            1.  [What I did today:](#orgabed47d)
            2.  [Thoughts:](#orgdb4d8bb)
            3.  [What to do tomorrow?](#org1e207dc)
        4.  [2026-01-25](#org7ceb7a6)
            1.  [What I did today:](#org1fc8b40)
            2.  [Thoughts:](#orgbbaf9e2)
            3.  [What to do tomorrow?](#org3c32f7f)
        5.  [2026-01-26](#org80b755f)
            1.  [What I did today:](#org80224a0)
            2.  [Thoughts:](#org5b61931)
            3.  [What to do tomorrow?](#orga6c35c5)
        6.  [2026-01-27](#org98d2dad)
        7.  [2026-01-31](#org756539f)
            1.  [What I did today:](#org57e9aa8)
            2.  [Thoughts](#orgcaa37f7)
            3.  [What to do tomorrow](#orgf2eb618)
        8.  [2026-02-01](#org0700b38)
        9.  [2026-02-02](#org1f4b65c)
            1.  [What to do tomorrow?](#org149a83d)
        10. [2026-02-05](#org6221927)
            1.  [chatgpt pro](#org68b3fdf)
            2.  [Conclusion of http-proxy](#org2f33c3f)
            3.  [Iteration of Legionmind](#org43f0ced)



<a id="org91ae5f8"></a>

# 2026




<a id="org14e7d23"></a>

## 2026-01 January


<a id="org987e5de"></a>

### 2026-01-22


<a id="orgb693af8"></a>

#### What I did today:

1.  Refactored `opencode-feishu-notifier`; it now sends notifications to users in a predetermined way.
2.  Continued having AI work on `legionmind-github-bridge`. I started using opencode's multi-agent mode; it launched 5 agents to modify 5 issues, and it ran for 2 hours straight, exhausting my 5-hour Codex tokens.
3.  A node in the sg cluster died today. Looking at the logs, it was under constant SSH brute-force attacks. This is not good. Briefly considered a few directions:
    -   Disable password authentication.
    -   Disable the SSH daemon's exposure to the entire internet.
    -   Move the cluster behind a NAT.
4.  Handled some miscellaneous tasks. ZL is coming to Suzhou next week, spent some time making arrangements, but it didn't go smoothly. I don't plan to invest more mental energy into this.


<a id="orgbbe0c52"></a>

#### Thoughts:

At this stage, I can only manage 2-3 things simultaneously. This includes development work, daily arrangements, thinking, and output. Beyond this range, I struggle to manage and easily get fatigued. This is even with me trying to delegate as much work as possible to AI Agents. Therefore, I think there should be two directions for improvement:

-   For coding tasks, I should maximize the autonomy of agents, with several optimization goals:
    1.  Bother me as little as possible.
    2.  Let it do as much work as possible.
    3.  Improve the reliability of its work as much as possible.
-   I also need some personal improvement:
    1.  Manage my mental energy to avoid rapid exhaustion.
    2.  Improve my ability to work across multiple different contexts simultaneously, avoiding forgetfulness and disorganization, and implement progress management.

Based on the above thoughts, I think I can try two directions tomorrow:

1.  Design a multi-agent template for Legionmind and experiment with it on a coding task in Yuan using opencode.
2.  Continue logging work to explore methods for managing mental energy and context.


<a id="org4c1530c"></a>

#### What to do tomorrow?

1.  As mentioned, work on a multi-agent experiment.
2.  Continue with `legionmind-github-bridge`.
3.  If time permits, work on cluster security.

---

Overall, my current main goal is to use AI to scale myself up, and then try to scale others.


<a id="org9670646"></a>

### 2026-01-23

Had a bit of a cold today, a bit of a headache, low productivity. However, I'm glad I started doing daily summaries.


<a id="org5b02719"></a>

#### What I did today:

1.  With AI's help, designed a multi-agent system. This system hasn't been systematically polished yet.
2.  `legionmind-github-bridge` progressed a bit further.
3.  Modified the preemption design and implementation of `node-unit`. Previously, when a `node-unit` failed, all deployments under it would be cleared. Now, they are cleaned up one by one.
4.  Took the CFFEX (China Financial Futures Exchange) exam for futures brokerage account opening. It required the camera to be on the entire time, no minimizing or switching screens. Fortunately, unlimited attempts were allowed, which couldn't stump me. Passed with a high score of 95.


<a id="orgcd67dde"></a>

#### Thoughts:

My goal is to achieve agent autonomy with minimal friction. My current workflow is:

1.  Legionmind serves as an SOP for development work; it's an agent skill. I like agent skills.
2.  Opencode serves as the agent's entity. I use its capabilities like bash / tool calling / langraph / command / subagent. If I ever abandon opencode, these would be on my to-implement list.
3.  My current headache is how to combine skills and these sub-agents.

Had a headache all day, only cleared up a bit in the evening. I realized writing these thoughts at the end of the day might not be a good method. Maybe I should only record facts and summarize thoughts tomorrow morning when I wake up.


<a id="org55c5e88"></a>

#### What to do tomorrow?

1.  Use this multi-agent system to do something, maybe connect Gate's investment account.
2.  Continue with `legionmind-github-bridge`.
3.  Cluster security, if time permits.
4.  Restart work timing. (Important)
5.  SY's friends are visiting tomorrow, so work time might be preempted.


<a id="org93f4e20"></a>

### 2026-01-24

Slept in until 11 AM today, feeling completely relaxed. Haven't slept so freely in a long time.


<a id="orgabed47d"></a>

#### What I did today:

1.  Deployed a new version of `node-unit`. I was relatively confident in deploying it because I have fairly comprehensive end-to-end tests. Specifically, I started a TimescaleDB (PostgreSQL 17) in Docker, then started two `node-unit` instances, inserted 21 `@yuants/portal` deployments into the database for testing, and finally observed them converging to a state of one deployment per unit.
    This test basically covers the scenario where a bunch of unowned deployments appear, and then two `node-unit` instances come online, allowing observation of them preempting deployments in turn. What's missing? One is a real workload that consumes CPU/memory, and the other is the scenario where a `node-unit` goes offline for some reason.

2.  Used the new multi-agent version of Legionmind in Yuan to tackle the problem of outputting account flows for the vendor-gate earn account. I had the agent first use Legion for documentation creation, producing the following documents:
    ```
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
    ```
    Feels like a decent workflow. However, there's some conflict between my new multi-agent system and Legionmind's original documentation writing. I should carefully consider the boundaries of each task. For example, specifications on how each type of document should be written should be placed in separate skills, and Legionmind should be a description of the workflow. Each type of agent should be able to load a few smaller skills to assist in their work.
    Another issue is that it made a mistake on its first attempt, outputting the account flow to `account-actions-with-credential.ts`. This is because I asked it to refer to vendor-okx to complete the earn account integration (I did this because currently only OKX's earn account is integrated as an account). However, the AI learned some outdated practices from it. The current exchange integration standard is to publish all accounts through `provideExchangeServices`, not use `provideAccountActionsWithCredential` to integrate accounts.
    This knowledge is something a brand new AI Agent doesn't possess. How should such knowledge be modeled? How should I provide such project context as an external brain for the AI Agent? This is a question worth pondering deeply. Need to think about it carefully tomorrow.

3.  Cooked in the afternoon to entertain SY's friends. Exhausted me. So, back to work tomorrow~


<a id="orgdb4d8bb"></a>

#### Thoughts:

-   As mentioned above, I need to carefully consider how to compactly design an external brain for AI Agents. The simplest could start with a set of AGENT.md files. I've tried this before, but the overhead of maintaining these documents themselves is quite high. Distinguishing between junk and truly valuable experience to record is a difficult problem. Currently, it seems memory, like other prompts, just has an extra loop where the agent updates its own memory. The most important thing is still how to evaluate the results of the AI Agent's work.

-   Regarding the above point, I saw an article that I found very interesting. Let me summarize it in my own words: First, evaluating a single step of an agent's work can be categorized into several types:
    1.  Static tool eval: Compiler, linter, unit tests, e2e tests.
    2.  Model eval: Using another LLM to judge based on a defined prompt.
    3.  Human eval: I judge.
    Then, systematic evaluation of an Agent system is of two types:
    1.  Capability-based: Answers what this agent can do? The pass rate might be low, e.g., I want to use Legion to gradually execute larger, more difficult tasks, feeling like exploring a new frontier.
    2.  Regression-based: Can it still maintain previously acquired capabilities? For example, repeatedly testing some tasks to ensure stable implementation.
    So, when a new capability is introduced, it should transition from capability-based to regression-based.
    The article also mentions two important metrics: `pass@K` and `pass^K`.
    -   `pass@k`: At least one success in k attempts. The more attempts, the higher the probability of at least one success. Applicable: You only care about "finding at least one usable solution."
    -   `pass^k`: All k attempts must succeed. The more attempts, the harder it is to maintain consistency. Applicable: Users expect the agent to be reliable every time.
    FYI: [Reference this article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

-   Energy level is still a bit low. Worked a bit in the afternoon, cooked dinner, and felt somewhat tired. When can I be like CZ and not need sleep?


<a id="org1e207dc"></a>

#### What to do tomorrow?

1.  Think about this eval agent model, continue iterating on the multi-agent system.
2.  Cluster security issue, must work on it.
3.  `legion-github-bridge`.


<a id="org7ceb7a6"></a>

### 2026-01-25

Got a haircut today. Came back to find the system unstable. Turned out to be because Ji Ge started two services with the same `terminal_id`, causing mutual preemption and major issues.


<a id="org1fc8b40"></a>

#### What I did today:

1.  Attempted to migrate the cluster behind a NAT, of course using the new Legion to accomplish this. My steps were:
    -   First, modify the kOps cluster, create a new VPC using the 172.21.0.0/24 and 172.21.1.0/24 CIDR blocks. Then create a NAT for egress traffic.
        Originally planned to use a 10.0.x.x CIDR, but AWS didn't allow creating that after trying, so switched to 172.21.x.x. There was a pitfall: in the cluster resource, the existing load balancer needed to be pointed to the corresponding VPC (originally implicitly default, now with an extra CIDR it had to be manually specified).
    -   Then create a new instance group pointing to the new VPC. A small hiccup: the new IG didn't have S3 permissions, not sure why. Manually added them, and nodes joined the cluster normally.
    -   Next, manually migrate services to the new IG.
    -   Finally, take down the old IG.
    After finishing, found that the cluster's egress traffic now had only one IP, causing some services with IP rate limiting to crash. Had no choice but to roll back. Must first skill up on HTTP proxy before proceeding.

2.  Used the multi-agent system to practice an automatic script for updating Midas net asset value. Deepseek chugged along for a long time, and I felt quite satisfied. However, there's a core issue: if there's an early design error I don't catch, it leads to massive token and time waste, as I found agent work isn't that fast either.
    Currently, these coding agents are still quite primitive. They often crash or exit due to network issues, etc. Expecting them to handle serious long-running work still has poor SLIs. This might also be an opportunity. Thinking simply, this requires knowledge of software engineering, high availability, etc., to work.


<a id="orgbbaf9e2"></a>

#### Thoughts:

Fewer thoughts today, mostly written inline in the sections above.


<a id="org3c32f7f"></a>

#### What to do tomorrow?

1.  Design Yuan's HTTP proxy mechanism.
2.  After deployment, re-migrate the cluster.


<a id="org80b755f"></a>

### 2026-01-26

Today was a day of restraint. I've noticed a significant improvement in my ability to handle emotions after turning 25: alongside strong emotions, there's a clear thread of理智 acting as a copilot. This理智 acts like a control rod within the massive emotional reactor. Without this rod, emotions can spiral out of control, triggering a self-sustaining chain reaction that might lead to countless irreversible consequences. Under the influence of this rod, I begin to understand what can be said, what cannot, what can be done, what cannot, what decisions can be made, what cannot. This is a welcome change happening within me.


<a id="org80224a0"></a>

#### What I did today:

1.  Used Legion today to design and implement Yuan's HTTP proxy. Felt quite smooth to use. During the process, I reviewed its design, modified one point (how to select an available terminal), then let the agent take over. The results were quite good.
2.  Also used Legion for the Midas auto-update task. However, the AI performed poorly, failing to correctly understand my requirements and the usage of `@yuants/protocol`. I have a few suspicions: AI's intelligence might be insufficient (Deepseek might still seem not smart enough); review wasn't strict enough; or the documentation/knowledge base isn't rigorous enough.
3.  Damn it, got woken up by alerts at night. A host mysteriously died. Looks like a CPU usage spike caused the host to enter an unrecoverable state. The host logs are a mess. My assessment: Alerts are useful, logs are crap. Note to self!


<a id="org5b61931"></a>

#### Thoughts:

1.  While showering, thought about the key points in my current collaboration with AI. One is the service availability of the AI agent itself—it shouldn't crash or exit mid-run. (By the way, Ralph Loop basically improves availability through brute-force retries.) The other point is how I receive output from AI. For example, subordinates reporting to superiors still need a PPT or even a professional middle manager to act as an "expensive megaphone." How can AI's reporting to humans be limited to plain Markdown and code? Can AI's report link each item to an artifact? Can there be a Citation Agent专门负责 this part?
    However, my current use of AI is quite limited, focused only on coding tasks.

2.  Let's think carefully about why, even after having a multi-agent system, it steadily headed towards crashing and burning. The earlier speculation mentioned three possibilities:
    1.  AI's own intelligence level.
    2.  Human review not being strict enough.
    3.  The knowledge base not being detailed enough to provide more correct information for the AI to bootstrap quickly.
    Let's examine these points. Point 1 doesn't need thinking. Putting effort into direction 2确实可以 rely on an increasingly detailed RFC document to give subsequent steps sufficiently correct direction. But this development method feels like we're back to the **waterfall** development model, completing work through a linear process:
    ```
    Requirements Analysis -> Backend Design -> Backend Development -> Frontend Development -> Integration Testing
    ```
    The contributing factors are at two levels: technical and organizational/process, with the organizational/process level being the *primary factor*.
    The technical level is the natural dependency between tasks, e.g., frontend must wait for backend to provide APIs, backend must wait for product's CRD to be written.
    As a human organization, the waterfall model has issues: low efficiency, quality risks hard to expose, poor flexibility, team conflicts. As a collaboration method between me and AI, efficiency and team conflicts naturally don't exist in the AI world. It's like me and AI are entities living in different time dimensions; one day for me is like a year for AI. Well, low efficiency might waste some tokens, but that's not my main concern right now. The actual problem I face is quality risks from misunderstandings of requirements or facts, and poor flexibility.
    I must find a way to maximize the use of AI's capabilities while maximizing my own liberation. Based on human organizational experience, I must become a higher-level node in the command tree, able to confidently delegate tasks to AI while keeping it on track.
    The two most critical points:
    1.  Intent alignment.
    2.  Layered verification.
    Need to think more deeply about this. I feel I need to use it more and get a better feel.

3.  I need to be wary of the downside of being in a state of "when you have a hammer, everything looks like a nail": path dependency, output over understanding.


<a id="orga6c35c5"></a>

#### What to do tomorrow?

ZL is coming tomorrow. Plan to exercise, have a meal, play board games.


<a id="org98d2dad"></a>

### 2026-01-27

ZL came. Information overload, need to digest. Played board games, Tragedy Looper. Spent three hours understanding the rules. Finally, in the last scenario where I played the villainous playwright, I experienced the sweet spot of the game, ending with my complete victory.


<a id="org756539f"></a>

### 2026-01-31

The past few days have been quite packed, so no records. But stopping recording is not acceptable, so I'm picking it up now and recording everything together.

Besides being busy, why didn't I record?

1.  Because of an underlying fear that recording requires sitting down专门花 30+ minutes to record a day. This creates fear and burden towards daily logging, which is not good.
2.  Usually, I'm only willing to start recording the day when it's truly over. But thinking about it, this is somewhat反人类, because I now usually go to bed quickly when it's time to sleep, not because everything I wanted to do is actually finished (does that ever really happen?). This leads to not recording when there's time, and when it's time to record, I must quickly get into bed, compounded by issue 1.

The combination leads to accumulation.


<a id="org57e9aa8"></a>

#### What I did today:

> Correction: What I've done in the past few days.

1.  Started using Neovim, recommended by SC. Why? I saw `nvim-orgmode` seems to have truly become a usable org-mode替代品. At the same time, I'm starting to get fed up with Emacs:
    -   Endless update failures.
    -   Confusing debugging and error messages.
    -   Flexibility that adds burden but is useless to me.
    -   I don't understand Emacs Lisp and don't want to.
    For years, I've endured the above to use org-mode, but nowhere else allowed me to use org-mode properly. Now the nvim阵营 seems to have a viable alternative, why not try it?
    Since I've been a long-time vim user, even using evil-mode (vim-mode) in Emacs, I never felt using vim was a big burden. I can't survive in VSCode or IntelliJ IDEA without vim, so using nvim directly is no problem for me.
    With the障碍 gone, let's examine nvim's ecosystem. Nvim, without the historical baggage of vimscript, directly uses Lua as its configuration and plugin language. So it can move forward lightly, and the community is very active. I see neovim's plugin system has also been unified by a system called `lazy.vim`. Nvim's design for its plugin and configuration system seems to be a deliberate, planned bold innovation specifically targeting vim's original pain points. In vim & emacs, there are probably countless similar attempts to unify, but due to a fragmented community, none truly succeeded.
    So I directly tried lazyVim. Wow, now I feel I directly have a VSCode, and this VSCode can run in the terminal. Do you know how awesome that is?
    Now I have a powerful Old One based on全新基建, and configuring it is巨简单. Flexibility and convenience are收敛恰到好处. My old pain points are basically all solved.
    I spent almost no time and have already switched a significant part of my workflow to it. I now use tmux with 5 windows, each opening nvim in a folder. In nvim, the left is the directory tree, the middle is code, the right is opencode and terminal.

2.  Updated a version of Legion. I significantly reduced the text volume of the Legionmind skill (reduced from 4k lines). Currently using it, it feels like there are fewer things requiring my操心, but I'm not sure if it's because I've been using smarter models lately or because this version of Legionmind is actually smarter.

3.  Set up an OpenClaw. Minimax 2.1 is still a bit dumb, but as a personal assistant, I think OpenClaw is quite capable, as it's basically a ChatGPT with memory + hands and feet (can operate my computer).

4.  Added HTTP-proxy functionality to Yuan, added metrics, etc.


<a id="orgcaa37f7"></a>

#### Thoughts

Sometimes, using AI to write things feels a bit like debugging code whose原理 I don't fully understand—constantly testing its behavior or printing logs to assist debugging, tweaking here and there until finally getting a satisfactory result. Let's explore the origin of this feeling.

Using AI to write code,究其过程, involves human input of a prompt containing some specific instructions, hoping the AI can understand the隐含指令 and information behind these instructions and correctly complete the work.

The instructions we hope to convey to the AI can be layered: The top layer is the instruction for the current task. Below that are technical decisions made for this software project, best practices summarized after weighing pros and cons, applicable to局部 of the project. The next layer is background information about the problem domain the project aims to solve. Further down is the professional background knowledge of the software engineer using AI—their personal preferences, technical biases, style preferences, historical experience,积淀 of思维方式. The bottom layer is the background knowledge of the world.

In a single conversation with AI, what can be made clear to the AI is only the instruction for the current task. We then hope the AI possesses sufficient background knowledge about the world and the background information needed to solve the problem.

Therefore, it can be inferred that if a task's context is sufficiently small, the given instructions are crystal clear, and there's little historical baggage, AI should easily complete the task with high quality. If there's a lot of隐含 background information, it's easy to produce some莫名其妙 work.

What Legionmind aims to do is to let the AI itself accumulate background knowledge and best practices related to this specific project and problem domain. This requires the AI to either have good logical thinking ability and memory (context capacity), or possess ample world background knowledge. Beyond these, it can't be saved.

---

Also, I feel nvim is相见恨晚.


<a id="orgf2eb618"></a>

#### What to do tomorrow

Visit SC's new home tomorrow, then play board games together,顺便 show SY some ski gear.


<a id="org0700b38"></a>

### 2026-02-01

Went to Cold Mountain to look at ski boots for SY. Measured foot length (245) and found a comfortable pair. Unfortunately, the nice colors were out of stock at Cold Mountain, so SY has to buy online.

Had lunch at SC's place, ate the meal he cooked. He has a sous-vide device for steak; the steak cooked with it was really tender. SC prepared a room tour puzzle for us with two clues. The first clue required finding 4 English words/sentences in 4 places, then using a positional cipher to拼出一个 word: "Three". The second clue was obtained from an environmental puzzle, finally getting the numbers 31 / 13 (I can't remember exactly) to retrieve a chocolate from a drawer with many numbered small boxes.

Unfortunately, he was out of chocolate, so we got a cute sticker.

---

The afternoon board game session was even more interesting. The main event was, of course, The King's Dilemma. In the end, SC, playing the Middle Class, achieved an unprecedented victory—the first time the Middle Class has won in our plays of this game. PGW, playing the Capitalist, was furious because Xiao Haozi, playing the Government, didn't help him on two crucial policy reform votes. I played the Working Class, naturally having little common interest with the Capitalist on most issues, so couldn't help. In fact, at the end of the game, the scores among the three of us (excluding PGW) were very close. A world where only the capitalist gets hurt was achieved.

This game is really fun and has become my favorite board game. It has considerable depth; each of the four players has vastly different playstyles. Playing a different role each time is a completely different experience. This time, as the Working Class, I experienced surplus unemployed人口 for the first time (because neither the Government nor the Capitalist wanted to open new companies), reaching the condition to发动工人示威暴动. The working class took to the streets, threatening to turn the country upside down. The具体作用 was to gain influence dice and deduct (number of unemployed - 2 + number of unions) points from the other classes combined.

Sure enough, whereas in the past the Working Class needed to盘算着劝说者祈求着 the Capitalist and Government to open new companies, now they争先恐后 to open new companies, instantly revitalizing the game. In the end, I scored 101 points, securing second place in this game.


<a id="org1f4b65c"></a>

### 2026-02-02

Exercised today, then emptied my mind, did nothing.


<a id="org149a83d"></a>

#### What to do tomorrow?

1.  Get all HTTP proxy related stuff working, fix up the cluster.
2.  Get `org-mode.nvim` working properly.
3.  Research transfer stations.


<a id="org6221927"></a>

### 2026-02-05

Time to record my day! Trying a different format today.


<a id="org68b3fdf"></a>

#### chatgpt pro

On Friday, I made a snap decision and bought a ChatGPT Pro account on闲鱼 for 1369 CNY. I saw it was cheaper than 200 USD, so I bought it爽快. It wasn't ready until Tuesday. He gave me an Outlook邮箱 and a ChatGPT account bound to it.

I logged into the Outlook邮箱 and saw, wow, there was a ChatGPT bill, paid in Philippine Peso.

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

Curious, I checked the equivalent CNY price—only about 1174.54 CNY! That means he made nearly 200 CNY profit off me!

Then I did some research. Damn it. He deserves that money! The Philippines确实 is the globally cheapest place to buy a ChatGPT Pro plan. Impressive.

I have a reliable contact in Thailand. I wanted to复制他的成功, but哈哈 Thailand is more expensive—about 1537 CNY equivalent. So, could I potentially sell Philippine ChatGPT memberships on类似闲鱼 platforms in, say, Poland (1942 CNY)? 🤔


<a id="org2f33c3f"></a>

#### Conclusion of http-proxy

Finally got the HTTP-proxy stuff working. My goodness, it was more complex than I thought. This also demonstrates that Legion's ability to work on the same topic across 8 projects within a mono-repo is almost at its limit. I even encountered issues with subagents crashing occasionally.

But then again, without Legionmind, I印象 directly giving AI instructions根本搞不定 problems of this complexity. This indirectly shows the unique capabilities Legionmind exhibits in such situations.

In the end, this task was搞定 by Legion itself. I can now基本脱离编码, and in most cases, only leave少量 review comments on design documents. I'm quite satisfied with this version of Legion.


<a id="org43f0ced"></a>

#### Iteration of Legionmind

Speaking of Legionmind.

I upgraded Legion again tonight. I feel that rigidly defining a workflow for it is still a bit僵化.本质上, it's still making AI work within my framework. But AI, especially smart AI—like the Codex 5.2 extra high I often use after getting ChatGPT Pro—actually understands everything. I'm not even sure if my multi-agent system is somewhat wasteful in this aspect. I think as AI gets smarter, letting it design its own workflow should be a more reasonable way to work. On this level, whether it's me, Manus, or oh-my-opencode, we are all essentially铺路人 before AI can completely replace humans in existing human work. As Nietzsche said, man is a bridge to the overman.

So, getting back on track, we should test the performance of different Legion versions in a scientific, systematic way. There should be a benchmark to test how different Legions perform when faced with the same set of complex coding tasks. I should尽快搞出 such a benchmark tool (maybe可以参考 existing industry benchmarks?).

Besides continuing work on Yuan, I need to put effort into this aspect.

Speaking of which, I haven't continued working on the `legionmind github bridge` these past few days. The reason is I saw opencode itself has this capability. Rather than stubbornly finishing it full of bugs, it's better to暂时先 hold. I think it's better not to do things容易被海浪拍死; instead, build a boat that rises with the rising tide. (This metaphor is抄自 Manus's blog.)

---

That's it for today. I saw CZ's cross-server comment. I think I should indeed record when I feel like it, but habits take time to cultivate. For me, the greatest significance of recording isn't to回顾 the details of a day in the future, but the act of recording itself is a process of链式深度思考 for me. Even if no one ever reads this log, recording still holds considerable meaning for me.