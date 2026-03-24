---
title: 2026 Work Log
date: 2026-01-01
---

# 2026

## 2026-01 January

### 2026-01-22

1.  What I did today:
    1.  Refactored `opencode-feishu-notifier`. It now sends notifications to users in a predetermined manner.
    2.  Continued having AI work on `legionmind-github-bridge`. I started using the multi-agent mode of opencode. It launched 5 agents to modify 5 issues. It ran for 2 hours straight, consuming all my 5 hours of codex tokens.
    3.  A node in the sg cluster died today. I checked the logs and found it was under constant SSH brute-force attacks. This is not good. Briefly considered a few directions to address this:
        - Disable password authentication.
        - Disable SSH access from the public internet.
        - Move the cluster behind a NAT.
    4.  Handled some miscellaneous tasks. ZL is coming to Suzhou next week, spent some time making arrangements, but it didn't go smoothly. I don't plan to invest more mental energy into this.

2.  Thoughts:

    At this stage, I can only manage 2-3 things simultaneously. This includes development work, daily arrangements, thinking, and output. Beyond this range, I become overwhelmed and easily fatigued. This is even with me trying to delegate work to AI Agents as much as possible. Therefore, I think there should be two directions for improvement:
    - For coding tasks, I should maximize the autonomy of the agent. Optimization goals include:
      1.  Minimize interruptions to me.
      2.  Maximize its workload.
      3.  Improve the reliability of its work as much as possible.
    - I also need to improve myself:
      1.  Manage my mental energy to avoid rapid fatigue.
      2.  Enhance my ability to work across multiple different contexts simultaneously, avoiding forgetfulness and disorganization, and implement progress management.

    Based on the above thoughts, I think I can try two directions tomorrow:
    1.  Design a multi-agent template for legionmind and experiment with it on a coding task in Yuan using opencode.
    2.  Continue logging work to explore methods for managing mental energy and context.

3.  What I plan to do tomorrow?
    1.  As mentioned, conduct a multi-agent experiment.
    2.  Continue working on `legionmind-github-bridge`.
    3.  If time permits, work on cluster security.

    —

    Overall, my main focus is using AI to scale myself up, and then try to scale others.

### 2026-01-23

Caught a bit of a cold today, had a headache, low productivity. However, I'm glad I started doing daily summaries.

1.  What I did today:
    1.  With AI's help, designed a multi-agent system. This system hasn't been systematically polished yet.
    2.  `legionmind-github-bridge` progressed a bit further.
    3.  Modified the preemption design and implementation of `node-unit`. Previously, when a `node-unit` failed, all deployments under it would be cleared. Now, they are cleaned up one by one.
    4.  Took the CFFEX (China Financial Futures Exchange) exam required for opening a futures trading account. It required the camera to be on the entire time, no minimizing or switching screens. Fortunately, unlimited attempts were allowed. This couldn't stump me, passed with a high score of 95.

2.  Thoughts:

    My goal is to achieve agent autonomy with minimal friction. My current workflow is:
    1.  `legionmind` serves as an SOP for development work. It's an agent skill. I like agent skills.
    2.  `opencode` serves as the agent entity. I use its capabilities like bash / tool calling / langraph / command / subagent. If I ever need to abandon opencode, these are on my implementation list.
    3.  My current headache is how to combine skills and these sub-agents.

    Had a headache all day, only felt clear-headed by evening. I realized writing these thoughts at the end of the day might not be a good method. Maybe I should only record facts and summarize thoughts the next morning after waking up.

3.  What I plan to do tomorrow?
    1.  Use this multi-agent system to do something, maybe connect Gate's investment account.
    2.  Continue with `legionmind-github-bridge`.
    3.  Cluster security, if time permits.
    4.  Restart work time tracking. (Important)
    5.  SY's friends are visiting tomorrow, so work time might be preempted.

### 2026-01-24

Slept in until 11 AM today, feeling completely relaxed. Haven't slept so freely in a long time.

1.  What I did today:
    1.  Deployed a new version of `node-unit`. I was relatively confident in deploying it because I have fairly comprehensive end-to-end tests. Specifically, I start a timescaledb (postgresql17) in Docker, then start two `node-unit`s, insert 21 `@yuants/portal` deployments into the database for testing, and finally observe them converging to a state of one deployment per unit.

        This test basically covers the scenario where a bunch of unassigned deployments appear, and then two node-units come online, allowing observation of them preempting deployments in turn. What's really missing is a workload that actually consumes CPU/memory, and the scenario where a node-unit goes offline for some reason.

    2.  Used the new multi-agent version of legionmind in Yuan to tackle the issue of outputting account streams for the vendor-gate earn account. I had the agent first use legion for document creation, producing the following documents:

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

        Feels like a proper workflow now. However, my new multi-agent system conflicts somewhat with the original legionmind's document writing. I should carefully consider the boundaries of each task. For example, specifications on how each type of document should be written should be placed in separate skills. Then legionmind should be a description of the workflow. Each type of agent should be able to load several smaller skills to assist in their work.

        Another issue was that it made a mistake on its first attempt, outputting the account stream to `account-actions-with-credential.ts`. This was because I asked it to refer to `vendor-okx` to complete the earn account integration. I made this request because currently only OKX's earn account is also integrated as an `account`. However, the AI learned some outdated practices from it. The current standard for exchange integration is to publish all accounts through `provideExchangeServices`, not using `provideAccountActionsWithCredential` to integrate accounts.

        This knowledge is something a brand new AI Agent lacks. How should such knowledge be modeled? How should I provide such project context as an external brain for the AI Agent? This is a question worth pondering deeply. Need to think carefully tomorrow.

    3.  Cooked in the afternoon to entertain SY's friends. Exhausted me. Well, back to work tomorrow then~

2.  Thoughts:
    - As mentioned above, I need to carefully consider how to compactly design an external brain for AI Agents. The simplest could start with a set of `AGENT.md` files. I've tried this before, but the overhead of maintaining these documents itself is quite high. Distinguishing between junk and truly valuable experience is a difficult problem. Currently, it seems memory, like other prompts, just has an extra loop where the agent updates its own memory. The most important thing is still how to measure the results of the AI Agent's work.

    - Regarding the above point, I saw an article that I found very interesting. Let me summarize it in my own words:
      First, evaluating a single step of an agent's work can be categorized into:
      1.  Static tool eval: Compiler, linter, unit tests, e2e tests.
      2.  Model eval: Using another LLM to judge based on a prompt we define.
      3.  Human eval: I judge.

      Then, systematic evaluation of an Agent system is of two types:
      1.  Capability-based: Answers what this agent can do? The pass rate might be low, e.g., I want to use legion to gradually execute larger, more difficult tasks, like exploring a new frontier.
      2.  Regression-based: Can it still maintain previously acquired capabilities? For example, repeatedly testing some tasks to ensure stable implementation.

      So, when a new capability is introduced, it should transition from capability-based to regression-based.

      The article also mentions two important metrics: `pass@K` and `pass^K`
      - pass@k: At least one success in k attempts. The more attempts, the higher the probability of at least one success. Applicable: Scenarios where you only care about "finding at least one usable solution."
      - pass<sup>k</sup>: All k attempts must succeed. The more attempts, the harder it is to maintain consistency. Applicable: Scenarios where users expect reliable production from the agent every time.

      FYI: [Refer to this article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - Energy level is still a bit low. Worked a bit in the afternoon, cooked dinner, and felt somewhat tired. When will I be like CZ and not need sleep?

3.  What I plan to do tomorrow?
    1.  Think about this eval agent model, continue iterating on the multi-agent system.
    2.  Cluster security issue, must work on it.
    3.  `legion-github-bridge`

### 2026-01-25

Got a haircut today. Came back to find the system unstable. Turned out Ji Ge started two services with the same `terminal_id`, causing mutual preemption and major issues.

1.  What I did today:
    1.  Attempted to migrate the cluster behind a NAT, of course using the new legion to accomplish this. My steps were:
        - First, modify the kops cluster, create a new VPC, using the 172.21.0.0/24 and 172.21.1.0/24 ranges. Then create a NAT for egress traffic.

          Originally planned to use a 10.0.x.x range, but after trying, found AWS doesn't allow creating such CIDRs, so changed to 172.21.x.x. There's a pitfall here: need to manually point the existing load balancer in the cluster resource to the corresponding VPC (originally implicitly default, now with an extra CIDR it needs manual specification).

        - Then create a new instance group pointing to the new VPC. A small hiccup: the new IG didn't have S3 permissions, not sure why. Manually added them, and nodes joined the cluster normally.

        - Next step: manually migrate services to the new IG.

        - Finally, take down the old IG.

        After finishing, found the cluster's egress traffic now had only one IP, causing some services with IP rate limiting to break down. Had no choice but to roll back. Must first implement the HTTP proxy capability before proceeding.

    2.  The multi-agent system was used to practice an automatic script for updating Midas net asset value. Deepseek chugged along writing for a long time, and I felt quite satisfied. A core issue here is that if there's an early design error I don't catch, I'm in for a massive waste of tokens and time, because I found agents don't work that fast either.

        Currently, these coding agents are still quite primitive. They often crash or exit due to network issues, etc. Having them handle serious long-running work still has poor SLIs (Service Level Indicators). This might also be an opportunity. Briefly thinking, this requires some software engineering knowledge about high availability, etc., to work.

2.  Thoughts:

    Fewer thoughts today, mostly written inline in the sections above.

3.  What I plan to do tomorrow?
    1.  Design Yuan's HTTP proxy mechanism.
    2.  After deployment, re-migrate the cluster.

### 2026-01-26

A day of restraint. I've noticed a significant improvement in handling emotions after turning 25: alongside the emotion, there's a clear thread of理智 acting as a copilot. This thread of理智 acts like a control rod in the huge emotional reactor. Without this rod, emotions can spiral out of control, triggering a self-sustaining chain reaction, potentially leading to countless irreversible consequences. Under the influence of this rod, I begin to understand what can be said, what cannot, what can be done, what cannot, what decisions can be made, what cannot. This is a welcome change happening within me.

1.  What I did today:
    1.  Used legion today to design and implement Yuan's HTTP proxy. I found the process quite smooth. Midway, I reviewed its design, made a modification regarding one point (how to select an available terminal), then let the agent take over. The result was quite good.
    2.  Also used legion to work on the automatic Midas update task. However, the AI performed poorly, failing to correctly understand my requirements and the usage of `@yuants/protocol`. I have a few suspicions: AI's intelligence is insufficient (Deepseek might still seem not smart enough); review wasn't strict enough; or the documentation/knowledge base isn't rigorous enough.
    3.  Damn it, got woken up by an alert at night. A host died mysteriously. Looks like a CPU usage spike caused the host to enter an unrecoverable state. The host logs are a mess. My assessment: Alerts are useful, logs are garbage. Noted!

2.  Thoughts:
    1.  While showering, thought about the key points in my current collaboration with AI. One is the service availability of the AI agent itself—it shouldn't crash or exit while running. (By the way, Ralph Loop basically improves availability through brute-force retries.) The other point is how I accept output from AI. For example, subordinates reporting to superiors still need a PPT or even a professional middle manager to act as an "expensive megaphone." How can AI's reports to humans be limited to plain Markdown and code? Can each item in an AI's report link to an artifact? Can there be a Citation Agent专门负责 this part?

        However, my current usage of AI is quite limited, mostly focused on coding tasks.

    2.  Think carefully about why, after having a multi-agent system, this system is steadily heading towards a ditch. Earlier speculation mentioned three possibilities:
        1.  AI's own intelligence level.
        2.  Human review not strict enough.
        3.  Knowledge base not detailed enough to provide more correct information for the AI to bootstrap quickly.

        Let's think carefully about these points. Point 1 doesn't need thinking. Putting effort into direction 2 can indeed rely on an increasingly detailed RFC document to give subsequent steps a sufficiently correct direction. But this development method feels like we're back to the **waterfall** development model, completing work through a linear process:

        ```text
        Requirements Analysis -> Backend Design -> Backend Development -> Frontend Development -> Integration Testing
        ```

        The factors for this also exist at two levels: technical and organizational/process, but the organizational/process level is the *primary factor*.

        The technical level is the natural dependency between tasks, e.g., frontend must wait for backend to provide APIs, backend must wait for product's CRD to be written.

        As a human organization, the waterfall model has issues: low efficiency, quality risks hard to expose, poor flexibility, team conflicts. As a collaboration method between me and AI, efficiency and team conflicts naturally don't exist in the AI world. It's like me and AI are entities living in different time dimensions; one day for me is like a year for AI. Well, low efficiency might waste more tokens, but that's not my primary concern right now. The actual problem I face is quality risks from misunderstandings of requirements or facts, and poor flexibility.

        I must find a way to maximize the use of AI's capabilities while maximizing my own liberation. Based on human organizational experience, I must become a higher-level node in the command tree, able to confidently delegate tasks to AI while keeping it on track.

        The two most critical points:
        1.  Intent alignment.
        2.  Layered verification.

        Need to think deeper about this. I feel I need to use it more and savor it.

    3.  I need to be wary of the negative side of this "when you have a hammer, everything looks like a nail" state: path dependency, output over understanding.

3.  What I plan to do tomorrow?

    ZL is coming tomorrow. Plan to exercise, have a meal, play board games.

### 2026-01-27

ZL came, information overload, need to digest. Played board games, Tragedy Looper. Spent three hours understanding the rules. Finally, in the last scenario where I played the villainous playwright, I felt the sweet spot of the game. Ended with my complete victory.

### 2026-01-31

The past few days have been quite packed, so no records. But stopping recording is not acceptable, so I'm picking it up now and recording everything together.

Besides being busy, why didn't I record?

1.  Because of a subconscious fear that recording means sitting down specifically for 30+ minutes to record a day. This is due to some fear and burden associated with daily logging, which is undesirable.
2.  Usually, I'm only willing to start recording a day after it's truly over. But thinking carefully, this is somewhat anti-human because I now basically go to bed quickly when it's time to sleep, not because everything I wanted to do is truly finished (does that ever really happen?). This leads to having free time but not recording, and when it's really time to record, I must quickly get into bed, compounded by issue 1.

Combined, they pile up.

1.  What I did today:

    > Correction: What I've done in recent days
    1.  Started using Neovim, recommended by SC. Why? I saw `nvim-orgmode` seems to have truly become a usable org-mode. Simultaneously, I'm starting to get fed up with Emacs:
        - Endless update failures.
        - Perplexing debugging and error messages.
        - Flexibility that adds burden but is useless to me.
        - I don't understand Emacs Lisp and don't want to.

        For years, I've endured the above to use org-mode, but nowhere else let me use org-mode properly. Now the nvim camp seems to have a viable alternative, why not try it?

        Since I've been a long-time vim user, even using evil-mode (vim-mode) in Emacs, I never felt using vim was a big burden. I can't survive in VSCode or IntelliJ IDEA without vim, so using nvim directly is no problem for me.

        With the barrier gone, examining nvim's ecosystem, I find that nvim, without the historical baggage of vimscript, directly uses Lua as its configuration and plugin language. So it can travel light, and the community is very active. I see now nvim's plugin system is also unified by a system called `lazy.vim`. Nvim's design for its plugin and configuration systems seems to be an organized, planned, bold innovation specifically targeting vim's original pain points. In vim & emacs, there are probably countless similar attempts to unify the world, but because the community is too fragmented, none truly succeeded.

        So I directly tried lazyVim. Wow, now I feel I directly own a VSCode, and this VSCode can run in the terminal. Do you know how awesome that is?

        Now I have a powerful Old One based on brand-new infrastructure, and configuring it is extremely simple. Flexibility and convenience are converged恰到好处, and my old pain points are basically all solved.

        I spent almost no time and have already switched a lot of my workflow to this. I now use tmux to open 5 windows, each opening nvim in a folder. In nvim, the left is a directory tree, the middle is code, the right is opencode and terminal.

    2.  Updated a version of legion. I significantly reduced the text volume of the legionmind skill (reduced from 4k lines). Currently using it, I feel there are fewer things requiring my attention, but I'm not sure if it's because I've been using smarter models lately or because this version of legionmind is actually smarter.

    3.  Set up an openclaw. Minimax 2.1 is still a bit dumb, but as a personal assistant, I think openclaw is quite capable, because it's basically a ChatGPT with memory + hands and feet (can operate my computer).

    4.  Added HTTP-proxy functionality to Yuan, added metrics, etc.

2.  Thoughts

    Sometimes I feel using AI to write things is a bit like debugging code whose原理 I don't fully understand, by constantly testing its behavior or printing logs to assist debugging, tweaking here and there until finally getting a satisfactory result. Exploring the origin of this feeling:

    Using AI to write code, in essence, involves a human inputting a prompt containing specific instructions, hoping the AI can understand the implicit instructions and information behind it and correctly complete the work.

    The instructions one hopes to convey to the AI can be layered: the top layer is the instruction for the current task. Below that are technical decisions made for this software project, best practices summarized after weighing pros and cons, applicable to parts of the project. The next layer is background information about the problem domain the project aims to solve. Further down is the professional background knowledge of the software engineer using AI, their personal preferences, technical biases, style preferences, historical experience,积淀 of thinking patterns. The bottom layer is the background knowledge of the world.

    In a single conversation with AI, what can be made clear to the AI is only the instruction for the current task. Then we hope the AI possesses sufficient background knowledge about the world and the background information needed to solve the problem.

    Therefore, it can be inferred that if a task's context is small enough, the given instructions are crystal clear, and there's little historical baggage, the AI should easily complete the task with high quality. If there's a lot of implicit background information, it's easy to produce莫名其妙 work.

    What Legionmind aims to do is to let the AI accumulate background knowledge and best practices related to the project itself and the problem domain. This requires the AI to either have good logical thinking and memory (context capacity), or the AI itself possesses ample world background knowledge. Beyond these, it can't be saved.

    —

    Also, I feel nvim is相见恨晚.

3.  What I plan to do tomorrow

    Tomorrow, visit SC's new home, then play board games together,顺便给 SY look at snow gear.

### 2026-02-01

Went to Cold Mountain to look at snowboard boots for SY. Measured foot length (245) and tried on a comfortable pair. Unfortunately, the nice colors at Cold Mountain were out of stock in her size, so SY has to buy online.

Had lunch at SC's place, ate the meal he cooked. He has a sous-vide device for steak, and the steak was really tender. SC prepared a room tour puzzle for us. There were two clues. The first clue required going to 4 places to find 4 English words/sentences, using a positional cipher to form a word: "Three". The second clue was obtained from an environmental puzzle, finally getting the numbers 31 / 13 (I can't remember clearly), allowing us to get a chocolate from a drawer with many numbered small boxes.

Unfortunately, he was out of chocolate, so we got a cute sticker.

—

The afternoon board game session was even more interesting. The main event was, of course, The King's Dilemma. In the end, SC, playing the Middle Class, achieved an unprecedented victory—the first time the Middle Class has won in our plays of this game. PGW, playing the Bourgeoisie, was furious because Xiao Haozi, playing the Government, didn't help him on two crucial policy reform votes. I played the Working Class, naturally having little common interest with the Bourgeoisie on most issues, so couldn't help. In fact, at the end, except for PGW, the scores of the three of us were very close. A world where only the capitalist got hurt.

This game is really fun and has become my favorite board game. It has considerable depth. Each of the four players has vastly different gameplay; playing a different role each time is a completely different experience. This time, as the Working Class, for the first time, unemployment became excessive (because neither the Government nor the Bourgeoisie wanted to open new companies), reaching the condition to发动工人示威暴动. The Working Class took to the streets, threatening to turn the world upside down. Specifically, it grants influence dice and deducts a total of (unemployed population - 2 + number of unions) points from the other classes.

Sure enough, whereas in the past the Working Class had to scheme, persuade, and beg the Bourgeoisie and Government to open new companies, now they争先恐后 to open new companies, instantly revitalizing the game. In the end, I scored a high 101 points, securing second place.

### 2026-02-02

Exercised today, then emptied my mind, did nothing.

1.  What I plan to do tomorrow?
    1.  Get all HTTP proxy related stuff working, fix up the cluster.
    2.  Get `org-mode.nvim` working properly.
    3.  Research the中转站.

### 2026-02-05

Recording my day! Trying a different format today.

1.  ChatGPT Pro

    On Friday, I made a bold decision and bought a ChatGPT Pro on the万能闲鱼 for 1369 CNY. I saw it was cheaper than 200 USD, so I bought it爽快. It wasn't ready until Tuesday. He gave me an Outlook邮箱 and a ChatGPT account bound to it.

    I logged into the Outlook邮箱 and saw a ChatGPT bill, paid in Philippine Peso.

    |                          |                 |
    | ------------------------ | --------------- |
    | plan                     | amount          |
    | ChatGPT Pro Subscription | ₱8919.64        |
    |                          | Tax: ₱1070.36   |
    |                          | Total: ₱9990.00 |
    | Payment method           | Mastercard-xxxx |

    Curious, I checked the equivalent CNY price, only about 1174.54 CNY. He made nearly 200 CNY profit!

    Then I researched. Damn it. He deserves that money! The Philippines确实 is the globally cheapest place to buy a ChatGPT Pro plan. Impressive.

    I have a reliable contact in Thailand. I wanted to复制他的成功, but哈哈 Thailand is more expensive, about 1537 CNY. Could I possibly sell Philippine ChatGPT memberships on类似闲鱼 platforms in, say, Poland (1942 CNY)? 🤔

2.  HTTP-Proxy Conclusion

    Finally got the HTTP-proxy stuff working. My goodness, it was more complex than I thought. This also demonstrates that legion's ability to work on a single topic across 8 projects within a mono-repo is almost at its limit. I even encountered subagent闪退 issues a few times.

    But then again, without legionmind, I印象 directly giving AI instructions根本搞不定 problems of this complexity. This indirectly shows the unique capability legionmind exhibits in such situations.

    In the end, this task was搞定 by Legion itself. I can now basically脱离编码, and in most cases, only leave少量针对设计文档的 review comments. I'm quite satisfied with this version of legion.

3.  Legionmind Iteration

    Speaking of legionmind.

    I upgraded legion again tonight. I feel规定死 a workflow is still a bit rigid, essentially making AI work within my framework. But AI, especially smart AI: like the codex 5.2 extra high I often use after getting ChatGPT Pro, actually understands everything. I'm not sure if my multi-agent system is somewhat wasteful in this regard. I think as AI gets smarter, letting it design its own workflow should be a more reasonable way to work. At this level, me, manus, oh-my-opencode, are essentially paving the way before AI can completely replace humans in existing human work. As Nietzsche said, man is a bridge to the overman.

    So, back on topic, I should test different versions of legion's performance in a scientific, systematic way. There should be a benchmark to test how different legions perform facing the same set of complex coding tasks. I should尽快搞出 such a benchmark tool (maybe可以参考现在业界常见的 bench?).

    Besides continuing Yuan's work, I need to努力 in this direction.

    Speaking of the `legionmind github bridge` I haven't continued lately, the reason is I saw opencode itself has this capability. Rather than stubbornly finishing it full of bugs, better to暂时先 hold. I think it's better not to do things容易被海浪拍死 for now, but to be a ship that rises with the rising tide. (This metaphor is抄自 manus's blog.)

    —That's it for today. I saw CZ's cross-server comment. I think I should indeed record when I feel like it. But habits need time to cultivate. For me, the biggest meaning of recording isn't to回顾细节 on some future day, but the act of recording itself is a process of deep, chain-of-thought thinking. Even if no one reads this log, the recording still holds significant meaning for me.

### 2026-03-17

Restarting recording over a month later. Had the Chinese New Year, won't追究 the stuff in between. Before today, I also tried a voice log but haven't had time to整理好, will put it here.

A lot happened this past month, impossible to record it all here at once. So I打算先不理会, write what I want to write today first.

1.  Continued Exploration of AI Agent

    On March 8th, participated in an AI Agent discussion/sharing organized by alumni. The event was in Shenzhen, with over 30 people signing up offline,据说 actually over 40 attended. I participated remotely via腾讯会议. However, that day I accompanied SY to the hospital, so the joining environment was poor, just in the car connected via手机热点. The mobile hotspot network was very unstable, so I couldn't turn on the camera or see remote friends' reactions via video,只能一个人对着屏幕强行讲. Although preparation was十分不充分, I managed to talk smoothly for a while based on my感想 about using AI agents themselves (i.e., the work logs started recording since the beginning of 2026, and articles提炼出的 AI-related viewpoints from these logs). I thought I might怯场, but the actual effect was okay.

    Relevant links here:
    1.  [Thoughts on AI Agent](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)
    2.  [Legion's Growth Trajectory: From Task Logger to Multi-Agent Engineering OS](https://0xc1.space/blog/legionmind-de-cheng-chang-gui-ji/)

    I also looked at other alumni's shares.感觉大家目前都还处于 the初级阶段 of exploration of AI agents represented by openclaw. This actually shows this field is still a蓝海. However, the "Free Install Lobster" activity at the foot of Tencent Building in Shenzhen on March 6th still shows people have十分高昂的热情 for this field. So although it's a蓝海, the window of opportunity is still quite limited.

    Later discussed with CZ on Friday. I introduced him to how to use legionmind, let him get hands-on experience actually starting a task,同时 introduced other industry-related agent harness projects and relevant blogs. Through discussion with him, I clarified a question that has been思考 in the back of my mind这段时间: **What exactly is legionmind?** Now I think the answer has two parts:
    1.  An agent harness tool.
    2.  Handling the隐含信息墙 mentioned above.

    Later, CZ thought for a day and proposed applying for OPC to正式把这个业务做起来. He also has some related实践和思考 in this area, namely the czon project and his recent thoughts on the Elys product. Combining our ideas, a product for an AI一人公司呼之欲出: building AI agent分身, achieving alignment with AI on certain labor themes, building a knowledge base (soul/memory), ultimately追求的是深度的一致. Won't say more for now. I have高度的热情 for this project.加上 SY has深厚的知识 in psychology,想必能 provide significant support in this part. I think after量化相关的事情告一段落并稳定, I will invest considerable心血,热情,还有时间 into this.

2.  Signal-trader

    This idea originates from CZ's资本持久战. If completed, it might极大程度改善 our subjective strategy's投注方式, bringing us some收益. Current progress并不乐观, I think需要在此反思一下.诚然, the past half month, due to some reasons, my心神 was很大程度被占据了. One reason for last Friday's discussion with CZ was CZ understood my苦衷, wanted to交接一下推进 this task.不过似乎 he's been mainly busy with OPC stuff these days, so after I'm back, still need to推进 this.

    After syncing with CZ today, this matter will remain my最高优先级 until it's done. For me, there are three reasons:
    1.  Trust from同伴. Actually, when I first heard about this module, CZ synced with me and I went offline first. Later I saw their chat log, saw CZ and Ryan's discussion, felt心里暖暖的. This translates into a responsibility.
    2.  The收益 this matter itself might bring. It might极大提升 our Midas fund's收益, significantly improving our收入状况. Considering OPC's idea is still in the用嘴做产品的 stage, this is actually more stable and should be prioritized.
    3.  The last reason is to use it as a大考 for legionmind. I want to高强度使用 legionmind on this task, see its problems, then use that as思考材料 for modifying it. This will also indirectly affect our OPC project.

    Now thinking why progress is slow.

    First and foremost, my精力 was显著占据ed这段时间, but as things become clearer,压力 and动力同时降临到我身上. Then, as mentioned in that [Adventure of Helm and Wind](https://0xc1.space/blog/duo-yu-feng-de-li-xian/) article, the动力源 is彻底点燃ed in me. I have no退路, but also not绝望.相反 I feel a良性压力, the responsibility from this pressure, and the快乐 of seeing potential美好可能 in the future. All these constitute my动力. I预感接下来, progress on this will推进 faster than before.

    The second reason is the缺点 legionmind itself暴露的 in this complex work. The system we discussed has many细节, and these细节极有可能 influence the entire module's design direction during code implementation, even exposing more细节问题 we haven't discussed. Such complexity体现在 legionmind's RFC design document makes people动辄看的晕头转向.加上 the first reason mentioned, I even had little精力 to仔细看 these detailed technical documents in the past period. So after rounds of vibe-coding, I became somewhat茫然. From this perspective, TDD might be a比较好的实践方式 for this project. If AI can do its own end-to-end tests and provide convenient manual testing methods, pushing this module should不成问题.

    The third reason hides behind the second: the构想 of signal-trader itself is a产物 of CZ's深度思考. Although we've had multiple rounds of同步, I'm still不太确定 if I've grasped the核心 of his构想 in this work item, or perhaps he himself hasn't thought it through clearly. I佩服自己 for stating this reason明说, but I'm早已不是以前的我. The solution to this problem自然 is I need to接手 the思维的主观能动 from him.本质上 is to invest more心力.

3.  Blog Modifications

    Used Legionmind to大幅修改 my blog theme. It's now a theme inspired by anemone and granda.org, embodying my个人意志. Then I thought about it, felt modifying my own czon site's style.css was still太难了, so I反其道而行之, moved the multilingual text generated by the czon site反向移动到了 the main site. After all, czon志不在此, so let czon do what czon is适合去做的, and I'll freely体现我的意志 in the outer layer.

### 2026-03-24

Trying again. Another attempt at a voice log.

Last time, around March 6th, about 20 days ago, I tried using a voice memo as the day's log to make some思考和总结 about recent life and work,算是总结最近的工作和生活吧. Then I tried using ChatGPT to convert it into a text version log. The effect was相当之好; it出色地完成了任务, organizing my somewhat杂乱的语言 in such voice logs into有条理,有逻辑,比较清晰的语言.

In terms of output quality, it's now相当不错. But I feel a恐惧, a fear of "losing my voice." Assuming all this language isn't spoken by myself but全部都是由 ChatGPT书写出来的, am I then actually becoming something驯化过后的 by AI