---
title: 2026 Work Log
date: 2026-01-01
---

# 2026

## 2026-01 January

### 2026-01-22

1.  What I did today:
    1.  Refactored `opencode-feishu-notifier`. It now sends notifications to users in a predetermined manner.
    2.  Continued having AI work on `legionmind-github-bridge`. I started using the multi-agent mode of opencode. It launched 5 agents to modify 5 issues, and it ran for 2 hours straight, exhausting my 5-hour Codex tokens.
    3.  A node in the sg cluster died today. I checked the logs and found it was under constant SSH brute-force attacks. This is not good. Briefly considered a few directions to address this:
        - Disable password authentication.
        - Disable SSH access from the public internet.
        - Move the cluster behind a NAT.
    4.  Handled some miscellaneous tasks. ZL is coming to Suzhou next week, spent some time making arrangements, but it didn't go smoothly. I don't plan to invest more mental energy into this.

2.  Thoughts:

    At this stage, I can only manage 2-3 things simultaneously. This includes development work, daily scheduling, thinking, and output. Beyond this range, I become overwhelmed and easily fatigued. This is even with me trying to delegate work to AI Agents as much as possible. Therefore, I think there should be two directions for improvement:
    - For coding tasks, I should maximize the autonomy of the agent. Optimization goals include:
      1.  Minimize interruptions to me.
      2.  Maximize its workload.
      3.  Improve the reliability of its work as much as possible.
    - I also need some personal improvement:
      1.  Manage my mental energy better to avoid quick burnout.
      2.  Improve my ability to work across multiple different contexts simultaneously, avoiding forgetfulness and disorganization, and implement progress management.

    Based on the above thoughts, I think I can try two directions tomorrow:
    1.  Design a multi-agent template for legionmind and experiment with it on a coding task in Yuan using opencode.
    2.  Continue logging work to explore methods for managing mental energy and context.

3.  What I plan to do tomorrow?
    1.  As mentioned, experiment with a multi-agent system.
    2.  Continue working on `legionmind-github-bridge`.
    3.  If time permits, work on cluster security.

    —

    Overall, my current main goal is to use AI to scale myself up, and then try to scale others.

### 2026-01-23

Had a bit of a cold today, a bit of a headache, low productivity. However, I'm glad I started doing daily summaries.

1.  What I did today:
    1.  With AI's help, designed a multi-agent system. This system hasn't been systematically polished yet.
    2.  `legionmind-github-bridge` progressed a bit further.
    3.  Modified the preemption design and implementation of `node-unit`. Previously, when a `node-unit` failed, all deployments under it would be cleared. Now, they are cleaned up one by one.
    4.  Took the CFFEX (China Financial Futures Exchange) exam required for opening a futures trading account. It required the camera to be on the entire time, no minimizing or switching screens. Luckily, unlimited attempts were allowed. This couldn't stump me; passed with a high score of 95.

2.  Thoughts:

    My goal is to achieve agent autonomy with minimal friction. My current workflow is:
    1.  `legionmind` serves as an SOP for development work. It's an agent skill. I like agent skills.
    2.  `opencode` serves as the agent entity. I use its capabilities like bash / tool calling / langraph / command / subagent. If I ever need to abandon opencode, these would be on my implementation list.
    3.  My current headache is how to combine skills and these sub-agents.

    Had a headache all day, only cleared up a bit in the evening. I realized writing these thoughts at the end of the day might not be a good method. Maybe I should only record facts and summarize thoughts tomorrow morning after waking up.

3.  What I plan to do tomorrow?
    1.  Use this multi-agent system to do something, maybe connect Gate's investment account.
    2.  Continue with `legionmind-github-bridge`.
    3.  Cluster security, if time permits.
    4.  Restart work timing. (Important)
    5.  SY's friends are visiting tomorrow, so work time might be preempted.

### 2026-01-24

Slept in until 11 AM today, feeling completely relaxed. Haven't slept so recklessly in a long time.

1.  What I did today:
    1.  Deployed a new version of `node-unit`. I was relatively confident in deploying it because I have fairly comprehensive end-to-end tests. Specifically, I start a timescaledb (postgresql17) in Docker, then start two `node-unit`s, insert 21 `@yuants/portal` deployments into the database for testing, and finally observe them converging to a state where each node-unit handles half.

        This test basically covers the scenario where a bunch of unassigned deployments appear, and then two node-units come online, allowing observation of them taking turns preempting deployments. What's missing is a real CPU/memory workload and the scenario where a node-unit goes offline unexpectedly.

    2.  Used the new multi-agent version of legionmind in Yuan to tackle the issue of outputting account streams for the vendor-gate earn account. I had the agent first use legion for documentation creation, producing the following documents:

        ```text
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

        Feels like a proper workflow now. However, there's some conflict between my new multi-agent system and the original legionmind's documentation writing. I should carefully consider the boundaries of each task. For example, specifications on how each type of document should be written should be placed in separate skills. Then, legionmind should be a description of the workflow. Each type of agent should be able to load several smaller skills to assist in their work.

        Another issue was that it made a mistake on its first run, outputting the account stream to `account-actions-with-credential.ts`. This was because I asked it to reference `vendor-okx` to complete the earn account integration. I gave this instruction because currently only OKX's earn account is also integrated as an `account`. However, the AI learned some outdated practices from it. The current exchange integration standard is to publish all accounts through `provideExchangeServices`, not using `provideAccountActionsWithCredential` to integrate accounts.

        This knowledge is something a brand new AI Agent lacks. How should such knowledge be modeled? How should I provide such project context as an external brain for the AI Agent? This is a question worth pondering deeply. Need to think carefully tomorrow.

    3.  Cooked in the afternoon to entertain SY's friends. Exhausted me. Well, back to work tomorrow~

2.  Thoughts:
    - As mentioned above, I need to carefully consider how to compactly design an external brain for AI Agents. The simplest could start with a set of AGENT.md files. I've tried this before, but the overhead of maintaining these documents itself is quite high. Distinguishing between noise and truly valuable experience is a difficult problem. Currently, it seems memory, like other prompts, might just have an extra loop for the agent to update its own memory. The most important thing is still how to measure the results of the AI Agent's work.

    - Regarding the above point, I read an article that I found very interesting. Let me summarize it in my own words:
      First, evaluating a single step of an agent's work can be categorized into:
      1.  Static tool eval: Compiler, linter, unit tests, e2e tests.
      2.  Model eval: Using another LLM to judge based on a defined prompt.
      3.  Human eval: I judge.

      Then, systematic evaluation of an Agent system is of two types:
      1.  Capability-based: Answers what this agent can do? The pass rate might be low, e.g., I want to use legion to gradually execute larger, more difficult tasks, feeling like exploring a new frontier.
      2.  Regression-based: Can it still maintain previously acquired capabilities? For example, repeatedly testing some tasks to ensure stable implementation.

      So, when a new capability is introduced, it should transition from capability-based to regression-based.

      The article also mentions two important metrics: `pass@K` and `pass^K`
      - pass@k: At least one success in k attempts. The more attempts, the higher the probability of at least one success. Applicable: Scenarios where you only care about "finding at least one usable solution."
      - pass<sup>k</sup>: All k attempts must succeed. The more attempts, the harder it is to maintain consistency. Applicable: Scenarios where users expect reliable production from the agent every time.

      FYI: [Reference this article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Energy levels are still a bit low. Worked a bit in the afternoon, felt tired after cooking dinner. When will I be like CZ and not need sleep?

3.  What I plan to do tomorrow?
    1.  Think about this eval agent model, continue iterating on the multi-agent system.
    2.  Cluster security issue, must address it.
    3.  `legion-github-bridge`.

### 2026-01-25

Got a haircut today. Came back to find the system unstable. Turned out it was because Ji Ge started two services with the same `terminal_id`, causing them to preempt each other and leading to major issues.

1.  What I did today:
    1.  Attempted to migrate the cluster behind a NAT, of course using the new legion to accomplish this. My steps were:
        - First, modify the kops cluster, create a new VPC using the `172.21.0.0/24` and `172.21.1.0/24` CIDR blocks. Then created a NAT for egress traffic.

          Originally planned to use a `10.0` CIDR, but AWS didn't allow creating that. So switched to `172.21`. There was a pitfall: needed to manually point the existing load balancer resource to the corresponding VPC in the cluster spec (it was implicitly default before, now with an extra CIDR it needed manual specification).

        - Then, create a new instance group pointing to the new VPC. A small hiccup: the new IG didn't have S3 permissions, not sure why. Manually added them, and nodes joined the cluster normally.

        - Next step: manually migrate services to the new IG.

        - Finally, take down the old IG.

        After finishing, found that the cluster's egress traffic now had only one IP, causing some services with IP rate limiting to break down. Had no choice but to roll back. Need to implement HTTP proxy capability first before proceeding.

    2.  Used the multi-agent system to practice an automatic script for updating Midas net asset value. Deepseek chugged along for a long time, and I felt quite satisfied. A core issue here is that if there's an early design error I don't catch, it leads to massive token and time waste, as I found agent work isn't that fast either.

        Currently, these coding agents are still quite primitive. They often crash or exit due to network issues, etc. Expecting them to handle serious long-running work still has poor SLIs. This might also be an opportunity. Briefly thinking, this requires knowledge of software engineering, high availability, etc., to work.

2.  Thoughts:

    Fewer thoughts today, mostly written inline in the sections above.

3.  What I plan to do tomorrow?
    1.  Design Yuan's HTTP proxy mechanism.
    2.  After deployment, re-migrate the cluster.

### 2026-01-26

Today was a day of restraint. I've noticed a significant improvement in handling emotions after turning 25: alongside strong emotions, there's a clear thread of理智 (reason) acting as a copilot. This thread of理智 acts like a control rod within the massive emotional reactor. Without this rod, emotions could spiral out of control, triggering a self-sustaining chain reaction with potentially countless irreversible consequences. Under the influence of this rod, I begin to understand what can be said, what cannot, what can be done, what cannot, what decisions can be made, what cannot. This is a welcome change happening within me.

1.  What I did today:
    1.  Used legion to design and implement Yuan's HTTP proxy. Felt quite smooth to use. During the process, I reviewed its design, modified one point (how to select an available terminal), then let the agent take over. The effect was quite good.
    2.  Also used legion to work on the Midas auto-update task. However, the AI performed poorly, failing to correctly understand my requirements and the usage of `@yuants/protocol`. I have a few suspicions: AI's intelligence is insufficient (Deepseek might still be not smart enough); review wasn't strict enough; or the documentation/knowledge base isn't rigorous enough.
    3.  Damn it, got woken up by an alert at night. A host mysteriously died. Looks like a CPU usage spike caused the host to enter an unrecoverable state. The host logs are a mess. My assessment: Alerts are useful, logs are garbage. Noted!

2.  Thoughts:
    1.  While showering, thought about the key points in my current collaboration with AI. One is the service availability of the AI agent itself—it shouldn't just exit while running. (By the way, Ralph Loop basically improves availability through brute-force retries.) The other point is how I receive output from AI. For example, subordinates reporting to superiors still need a PPT or even a professional middle manager to act as an "expensive megaphone." How can AI's reporting to humans be limited to plain Markdown and code? Can AI's report link each item to an artifact? Can there be a Citation Agent专门负责 this part?

        However, my current usage of AI is quite limited, mostly focused on coding tasks.

    2.  Think carefully about why, after having a multi-agent system, it's steadily heading towards crashing into a ditch. Earlier speculation mentioned three possibilities:
        1.  AI's own intelligence level.
        2.  Human review not being strict enough.
        3.  Knowledge base not being detailed enough to provide more correct information for AI to bootstrap quickly.

        Let's think carefully about these points. Point 1 doesn't need thinking. Putting effort into direction 2 could indeed rely on an increasingly detailed RFC document to give sufficient correct direction for subsequent steps. But this development method feels like we're returning to the **waterfall** development model, completing work through a linear process:

        ```text
        Requirements Analysis -> Backend Design -> Backend Development -> Frontend Development -> Integration Testing
        ```

        The factors for this also exist at two levels: technical and organizational/process, but the organizational/process level is the *primary factor*.

        The technical level is the natural dependency between tasks, e.g., frontend must wait for backend to provide APIs, backend must wait for product's CRD to be written.

        As a human organization, the waterfall model has issues: low efficiency, quality risks hard to expose, poor flexibility, team conflicts. As a collaboration method between me and AI, efficiency and team conflicts naturally don't exist in the AI world. It's like me and AI are entities living in different time dimensions; one day for me is like a year for AI. Well, low efficiency might waste more tokens, but that's not my main concern right now. The actual problems I face are quality risks from misunderstandings of requirements or facts, and poor flexibility.

        I must find a way to maximize the use of AI's capabilities while maximizing my own liberation. Based on human organizational experience, I must become a higher-level node in the command tree, able to confidently delegate tasks to AI while keeping it on track.

        The two most critical points:
        1.  Intent alignment.
        2.  Layered verification.

        Need to think deeper about this. I feel I need to use it more and savor it.

    3.  I need to be wary of the downsides of my current "looking for nails with a hammer" state: path dependency, output over understanding.

3.  What I plan to do tomorrow?

    ZL is coming tomorrow. Plan to exercise, have a meal, play board games.

### 2026-01-27

ZL came. Information overload, need to digest. Played board games, Tragedy Looper. Spent three hours just understanding the rules. Finally, in the last scenario where I played the antagonist playwright, I felt the sweet spot of the game. Ended with my complete victory.

### 2026-01-31

The past few days have been quite packed, so no records. But stopping recording is not acceptable, so I'm picking it up now and recording everything together.

Besides being busy, why didn't I record?

1.  Because of a subconscious fear that recording requires sitting down and spending over 30 minutes specifically to record a day. This creates fear and burden around daily logging, which is undesirable.
2.  Usually, I only want to start recording a day after it's truly over. But thinking carefully, this is somewhat anti-human, because I now basically go to bed quickly when it's time to sleep, not because everything I wanted to do is actually finished (does that ever really happen?). This leads to having free time but not recording, and when it's really time to record, I must quickly get into bed. Combined with issue 1, it piles up.

1.  What I did today:

    > Correction: What I've done in the past few days
    1.  Started using Neovim, recommended by SC. Why? I saw `nvim-orgmode` seems to have become a truly usable org-mode. Simultaneously, I'm starting to get fed up with Emacs:
        - Endless update failures.
        - Confusing debugging and error messages.
        - Flexibility that adds burden but is useless to me.
        - I don't know Emacs Lisp and don't want to.

        For years, I've endured the above to use org-mode, but nowhere else let me use org-mode properly. Now the nvim camp seems to have a viable alternative, why not try it?

        Since I've been a long-time vim user, using evil-mode (vim-mode) even in Emacs, I never felt using vim would be a big burden. I can't survive in VSCode or IntelliJ IDEA without vim, so using nvim directly is no problem for me.

        With the obstacles gone, let's examine nvim's ecosystem. Nvim, without the historical baggage of vimscript, directly uses Lua as its configuration and plugin language. So it can move forward lightly, and the community is very active. I see now nvim's plugin system is also unified by a system called `lazy.vim`. Nvim's design of its plugin and configuration system seems to be an organized, planned, bold innovation specifically targeting vim's original pain points. In vim & emacs, there are probably countless similar attempts to unify everything, but the community is too fragmented; none truly succeeded.

        So I directly tried lazyVim. Wow, now I feel like I directly have a VSCode, and this VSCode can run in the terminal. Do you know how awesome that is?

        Now I have a powerful Old One based on brand-new infrastructure, and it's incredibly simple to configure. Flexibility and convenience are constrained just right. My old pain points are basically all solved.

        I spent almost no time switching a significant part of my workflow to this. I now use tmux to open 5 windows, each running nvim in a different folder. In nvim, the left side is the file tree, the middle is code, and the right side is opencode and terminal.

    2.  Updated a version of legion. I significantly reduced the text volume of the legionmind skill (from 4k lines reduced). Currently using it, it feels like there are fewer things requiring my attention, but I'm not sure if it's because I've been using smarter models lately or because this version of legionmind is actually smarter.

    3.  Set up an openclaw. Minimax 2.1 is still a bit dumb, but as a personal assistant, I think openclaw is quite capable, because it's basically a ChatGPT with memory + hands and feet (can operate my computer).

    4.  Added HTTP-proxy functionality to Yuan, added metrics, etc.

2.  Thoughts

    Sometimes I feel using AI to write things is a bit like debugging code whose原理 (principles) I don't fully understand. You debug by constantly testing its behavior or printing logs, tweaking here and there until you get a satisfactory result. Let's explore the origin of this feeling:

    Using AI to write code, in essence, involves a human inputting a prompt containing specific instructions, hoping the AI can understand the implicit instructions and information behind them and correctly complete the work.

    The instructions we hope to convey to AI can be layered: The top layer is the instruction for the current task. Below that are technical decisions made for this software project, best practices summarized after weighing pros and cons, applicable to parts of the project. Further down is background information about the problem domain the project aims to solve. Even further down is the professional background knowledge of the software engineer using AI—their personal preferences, technical biases, style preferences, historical experience,积淀 (accumulated) ways of thinking. The bottom layer is the world's background knowledge.

    In a single conversation with AI, what can be made clear to the AI is only the instruction for the current task. Then we hope the AI possesses sufficient background knowledge about the world and the background information needed to solve the problem.

    Therefore, it can be inferred that if a task's context is small enough, the given instructions are crystal clear, and there's little historical baggage, AI should easily complete the task with high quality. If there's a lot of implicit background information, it's easy to produce莫名其妙 (bizarre) work.

    What legionmind aims to do is to let the AI itself accumulate background knowledge and best practices related to this specific project and problem domain. This requires the AI to either have good logical thinking ability and memory (context capacity), or the AI itself possesses ample world background knowledge. Beyond these two, it can't be saved.

    —

    Also, I feel like I met nvim too late.

3.  What I plan to do tomorrow

    Tomorrow, visit SC's new home, then play board games together,顺便 (by the way) show SY some snow gear.

### 2026-02-01

Went to Cold Mountain to look at snowboard boots for SY. Measured foot length (245) and found a comfortable pair. Unfortunately, the nice colors were out of stock at Cold Mountain, so SY has to buy online.

Had lunch at SC's place, he cooked. He has a sous-vide device for steak; the steak was really tender. SC prepared a room tour puzzle for us. There were two clues. The first clue required finding 4 English words/sentences in 4 places, then using a positional cipher to form a word: "Three". The second clue was obtained from an environmental puzzle, finally getting the numbers 31 / 13 (I can't remember exactly) to retrieve a chocolate from a drawer with many numbered small boxes.

Unfortunately, he was out of chocolate. We got a cute sticker.

—

The afternoon board game session was even more interesting. The main event was, of course, **The King's Dilemma** (Note: The Chinese name "领国者" likely refers to a specific game, possibly "The King's Dilemma" or similar. I'll keep the translation generic unless confirmed). In the end, SC, playing the middle class, achieved an unprecedented victory—the first time the middle class has won in our plays of this game. PGW, playing the capitalist, was furious because the player acting as the government, Xiao Haozi, didn't help him on two crucial policy reform votes that were very important to PGW. I played the working class, naturally having little common interest with the capitalist on most issues, couldn't help. In fact, at the end, the scores of the three of us (excluding PGW) were very close. A world where only the capitalist got hurt was achieved.

This game is really fun and has become my favorite board game. It has considerable depth. Each of the four players has vastly different playstyles; playing a different role each time is a completely different experience. This time, as the working class, I encountered surplus unemployed人口 (population) for the first time (because neither the government nor the capitalist wanted to open new companies), reaching the condition to发动 (launch) a worker demonstration/riot. The working class took to the streets, threatening to turn the world upside down. The具体 (specific) effect was to gain influence dice and deduct a total of (unemployed population - 2 + number of unions) points from the other classes.

Sure enough, in the past, the working class needed to盘算着 (scheme),劝说者 (persuade),祈求着 (beg) the capitalist and government to open new companies. Now they争先恐后 (scrambled) to open new companies, immediately revitalizing the game. In the end, I took second place in this game with a high score of 101.

### 2026-02-02

Exercised today, then emptied my mind, did nothing.

1.  What I plan to do tomorrow?
    1.  Get all HTTP proxy related things working, fix up the cluster.
    2.  Get `org-mode.nvim` working properly.
    3.  Research the中转站 (relay station?).

### 2026-02-05

Let's record my day! Trying a different format today.

1.  ChatGPT Pro

    On Friday, I made a decisive move and bought a ChatGPT Pro account on the万能 (all-purpose)闲鱼 (Xianyu, a second-hand marketplace). It cost 1369 CNY. I saw it was cheaper than 200 USD, so I bought it爽快 (readily). It wasn't ready until Tuesday. He gave me an Outlook邮箱 (email) and a ChatGPT account bound to it.

    I logged into the Outlook邮箱 and saw, wow, there was a ChatGPT bill, paid in Philippine Peso.

    |                          |                 |
    | ------------------------ | --------------- |
    | plan                     | amount          |
    | ChatGPT Pro Subscription | ₱8919.64        |
    |                          | Tax: ₱1070.36   |
    |                          | Total: ₱9990.00 |
    | Payment method           | Mastercard-xxxx |

    Curious, I checked the equivalent CNY price. It was only about 1174.54 CNY! That means he made nearly 200 CNY profit from me!

    Then I did some research. Damn it. He deserves to earn that money! The Philippines确实 (indeed) has the lowest global price for ChatGPT Pro. Impressive.

    I have a reliable contact in Thailand. I thought about replicating his success, but哈哈 (haha) Thailand is more expensive. Equivalent to about 1537 CNY. So, could I possibly sell Philippine ChatGPT memberships on类似闲鱼 (similar platforms) in, say, Poland (1942 CNY)? 🤔

2.  Conclusion of HTTP-Proxy

    Finally got the HTTP-proxy stuff working. My goodness, it was more complex than I thought. This also demonstrates that legion's ability to handle work on a single topic spanning 8 projects within a mono-repo is almost at its limit. I even encountered issues with subagents crashing a few times.

    But then again, without legionmind, I recall that directly giving instructions to AI根本无法搞定 (couldn't handle at all) problems of this complexity. This indirectly shows the unique capability legionmind exhibits in such situations.

    In the end, this task was completed by Legion itself. I can now basically脱离编码 (detach from coding), and in most cases, only leave少量 (a small amount) of review comments on design documents. I'm quite satisfied with this version of legion.

3.  Iteration of Legionmind

    Speaking of legionmind.

    I upgraded legion again tonight. I feel that rigidly defining a workflow for it is still a bit inflexible;本质上 (in essence), it's still making AI work within my framework. But AI, especially smart AI like the Codex 5.2 extra high I often use after getting ChatGPT Pro, actually understands everything. I'm not even sure if my multi-agent system is somewhat wasteful in this regard. I think as AI gets smarter, letting it design its own workflow should be a more reasonable way to work. At this level, me, manus, oh-my-opencode, are all essentially paving the way before AI can completely replace humans in existing human work. As Nietzsche said, man is a bridge to the overman.

    So, back on topic, I should test the performance of different legion versions in a scientific, systematic way. There should be a benchmark to test how different legions perform when faced with the same set of complex coding tasks. I should尽快搞出 (quickly create) such a benchmark tool (maybe可以参考 (reference) common industry benchmarks?).

    Besides continuing work on Yuan, I should strive in this direction.

    Speaking of the previous `legionmind github bridge`, I haven't continued it these days. The reason is I saw opencode itself has this capability. Rather than stubbornly finishing it full of bugs, it's better to暂时先hold (put it on hold for now). I think it's better not to do things容易被海浪拍死 (easily crushed by waves), but to be a boat that rises with the rising tide. (This metaphor is抄自 (copied from) manus's blog.)

    —That's it for today. I saw CZ's cross-server comment. I think I should indeed record when I feel like it. But habits need time to cultivate. For me, the greatest significance of recording isn't to回顾 (look back on) the details of a day in the future, but the act of recording itself is my process of deep, chain-of-thought thinking. Even if no one ever reads this log, the act of recording still holds significant meaning for me.

### 2026-03-17

Restarting recording after over a month. Had Chinese New Year. Won't追究 (delve into) the stuff in between. Before today, I also tried voice recording, but haven't had time to organize it yet. Will put it here.

A lot happened in this over a month. It's impossible to record everything here at once. So I plan to ignore it for now and write about today.

1.  Continued Exploration of AI Agent

    On March 8th, participated in an AI Agent discussion/sharing organized by alumni. The event was held in Shenzhen, with over 30 people registered offline,据说 (reportedly) over 40 actually attended. I participated remotely via腾讯会议 (Tencent Meeting). However, that day I accompanied SY to the hospital, so the joining environment was poor—in the car connected via手机热点 (mobile hotspot). The mobile hotspot network was very unstable, so I couldn't turn on my camera or see the remote friends' reactions via video,只能 (could only)强行讲 (force myself to talk) to the screen. Although preparation was十分不充分 (very insufficient), I managed to talk smoothly for a while based on my感想 (impressions) from using AI agents themselves (i.e., the work logs started recording since the beginning of 2026, and articles提炼出的 (extracted) AI-related viewpoints from these logs). I originally thought I'd be nervous, but the actual effect was okay.

    Relevant links here:
    1.  [Thoughts on AI Agent](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)
    2.  [Legion's Growth Trajectory: From Task Logger to Multi-Agent Engineering OS](https://0xc1.space/blog/legionmind-de-cheng-chang-gui-ji/)

    I also looked at other alumni's shares. Feels like everyone is still in the early stages of exploring AI agents represented by openclaw. This actually shows this field is still a blue ocean. However, the "Free Lobster Installation" event held at the foot of Tencent Building in Shenzhen on March 6th shows people have very high enthusiasm for this field. So although it's a blue ocean, the window of opportunity is still quite limited.

    Later discussed with CZ on Friday. I introduced him to how to use legionmind, let him get hands-on experience starting a task, and also introduced other industry-related agent harness projects and relevant blogs. The discussion with him clarified a question that has been in the back of my mind这段时间 (recently): **What exactly is legionmind?** Now I think the answer has two parts:
    1.  An agent harness tool.
    2.  Handling the implicit information wall mentioned above.

    Later, CZ thought for a day and proposed applying for OPC to正式把这个业务做起来 (formally build this business). He also has some related实践和思考 (practice and thoughts) in this area, namely the czon project and his recent thoughts on the Elys product. Combining our ideas, a product for an AI一人公司 (one-person company)呼之欲出 (is on the horizon): building AI agent avatars, aligning with AI on certain labor themes, building knowledge bases (soul/memory), ultimately追求 (pursuing) deep alignment. Won't say more for now. I have high enthusiasm for this project. Plus, SY has深厚 (deep) knowledge in psychology, which should provide significant support in this area. I think after量化 (quant) related matters告一段落 (reach a stage of completion) and stabilize, I will invest considerable心血 (effort),热情 (passion),还有时间 (and time) into this.

2.  signal-trader

    This idea originated from CZ's资本持久战 (capital持久战?). If completed, it might极大程度改善 (greatly improve) our subjective strategy's投注方式 (betting method), bringing us some收益 (returns). Current progress is not乐观 (optimistic). I think I need to reflect on this here. Admittedly, in the past half month, my mind was largely occupied for some reasons. One reason for the discussion with CZ last Friday was that CZ understood my difficulties and wanted to交接一下 (hand over)推进 (advance) this task. However, it seems he's been mainly busy with OPC matters these days, so after I'm back, I still need to推进 (advance) this.

    After syncing with CZ today, this matter will remain my highest priority until it's completed. For me, there are three reasons:
    1.  Trust from同伴 (companions). Actually, when I first heard about this module, CZ synced with me and then I went offline. Later, I saw their chat records, saw the discussion between CZ and Ryan, and felt warm inside. This translates into a sense of responsibility.
    2.  The potential收益 (returns) from the matter itself. It might极大 (greatly)提升 (improve) the收益 (returns) of our Midas fund, significantly impacting our income. Considering the OPC idea is still in the "talking product" stage, this is more stable and should be prioritized.
    3.  The last reason is to use it as a major test for legionmind. I want to高强度使用 (intensively use) legionmind on this task, see its problems, and use that as material for思考 (thinking) about its修改 (modification). This will also indirectly affect our OPC project.

    Now, thinking about why progress is slow.

    The foremost reason is my精力 (energy) was significantly occupied这段时间 (recently). However, as things become clearer, both压力 (pressure) and动力 (motivation) have landed on me simultaneously. So, as mentioned in that article [舵与风的历险](https://0xc1.space/blog/duo-yu-feng-de-li-xian/), the动力源 (source of motivation) within me is彻底点燃 (completely ignited). I have no real退路 (way back), but I'm not绝望 (despairing) either.相反 (On the contrary), I feel a良性 (positive) pressure, the responsibility that comes with it, and the快乐 (joy) of seeing potential美好可能 (beautiful possibilities) in the future. All these things constitute my motivation. I预感 (foresee) that from now on, progress on this matter will be faster than before.

    The second reason is the shortcomings legionmind itself暴露的 (exposed) in this complex work. The system we discussed has many details, and these details极有可能 (are highly likely to) influence the entire module's design direction during code implementation, even exposing more detailed problems we haven't even discussed. This complexity体现在 (is reflected in) legionmind's RFC design document, making people easily feel晕头转向 (dizzy) just reading it. Combined with the first reason, I even lacked the energy to仔细看 (carefully read) these technical documents