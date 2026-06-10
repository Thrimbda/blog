---
title: 2026 Work Log
date: 2026-01-01
---

# 2026

## 2026-01 January

### 2026-01-22

1.  What I did today:
    1.  Refactored opencode-feishu-notifier so that it now notifies users in a fixed way.
    2.  Continued having AI write legionmind-github-bridge. I started using opencode's multi-agent mode; it launched 5 agents to fix 5 issues. The whole thing chugged along for 2 hours and burned through my 5 hours of Codex tokens.
    3.  Today, one node in the sg cluster died. I checked the logs and found it was under constant SSH brute-force attacks. That's not good. After a quick assessment, there are a few directions we can take:
        - Disable password authentication
        - Disable the sshd exposed to the public internet
        - Move the cluster behind NAT
    4.  Handled some miscellaneous tasks. Zl is coming to Suzhou next week, spent some time making arrangements. Things didn't go smoothly, and I've decided to stop investing energy in that.

2.  What I'm thinking:

    At this stage, I can only juggle 2-3 things simultaneously, including development work, daily scheduling, thinking, and output. Beyond that, I'll fall behind and feel tired. This is despite trying to offload as much work as possible to AI agents. So I think there are two areas for improvement:
    - For coding tasks, I should maximize the agent's autonomy. Several optimization objectives:
      1.  Bother me as little as possible
      2.  Let it work as much as possible
      3.  Improve the reliability of its work as much as possible
    - For myself, I need some improvement too:
      1.  Manage my mental energy so I don't burn out quickly
      2.  Improve the ability to work across multiple contexts simultaneously without forgetting things, and manage progress.

    Based on these thoughts, I think tomorrow I can try two things:
    1.  Design a multi-agent template for legionmind and experiment with it on a coding task for Yuan using opencode.
    2.  Continue keeping a work log, and explore a method for managing mental energy and context.

3.  What do I plan to do tomorrow?
    1.  As mentioned above, try a multi-agent experiment.
    2.  Continue working on legionmind-github-bridge.
    3.  If I have time, work on cluster security.

    —

    Overall, my main line right now is using AI to scale myself up, and then try to scale others.

### 2026-01-23

I have a bit of a cold today, and a headache, so productivity is low. But I'm glad I started doing daily summaries.

1.  What I did today:
    1.  Designed a multi-agent system with AI help. It hasn't been systematically polished yet.
    2.  Made progress on legionmind-github-bridge again.
    3.  Improved the preemption design and implementation for node-units. Previously, when a node-unit failed, all deployments under it were cleared. Now they are cleaned one by one.
    4.  Took the exam required for opening a futures brokerage account at CFFEX (China Financial Futures Exchange). I had to keep the camera on the whole time, no minimizing or switching screens. Luckily you can try indefinitely, so it wasn't a problem for me. Passed with a score of 95.

2.  What I'm thinking:

    My goal is to achieve agent autonomy with minimal wear and tear. Currently my workflow is like this:
    1.  Legionmind acts as a standard operating procedure (SOP) for development work. It's an agent skill, and I like agent skills.
    2.  Opencode is the agent entity. I'm using its bash / tool calling / langraph / command / subagent capabilities. If I ever need to leave opencode, these form my to-do list.
    3.  Right now, the headache is how to combine skills and these sub-agents.

    My head hurt all day, only clearing up towards the evening. I find that writing down these ideas at the end of the day might not be a good approach. Perhaps I should just record facts, and summarize my thoughts the next morning after waking up.

3.  What do I plan to do tomorrow?
    1.  Use this multi-agent system for something – maybe integrate the Gate financial account.
    2.  Continue legionmind-github-bridge.
    3.  Cluster security, if time permits.
    4.  Start timing work again (Important).
    5.  Tomorrow, SY's friends will visit, so work time might be squeezed.

### 2026-01-24

Today I slept in until 11am. Felt completely refreshed; it's been a while since I slept so freely.

1.  What I did today:
    1.  Launched the new version of node-unit. The reason I felt confident deploying it is that I have thorough end-to-end tests. Specifically, I started a TimescaleDB (PostgreSQL 17) in Docker, then started two node-units, and inserted 21 `@yuants/portal` entries into the database to test, which finally converged to a 50-50 state.

        The test can basically observe that when a bunch of unowned deployments appear, two node-units go online and you can see them preempting deployments in turn. What's really missing is one scenario where there's a workload actually occupying CPU/memory, and another scenario where a node-unit goes offline for some reason.

    2.  Using the new multi-agent version of legionmind, I tackled the issue of outputting account flows for the vendor-gate earn account in Yuan. I had the agent first use legion to create documentation, resulting in all these files:

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

        Feels like a proper workflow. But there's some conflict between my new multi-agent system and the original legionmind documentation writing. I need to carefully think about the boundaries of each thing – for example, the specifications for how each document type should be written should be placed in separate skills, while legionmind should be a workflow description. Each agent should be able to load several smaller skills to assist them.

        There were also some issues. During its first run, it made a mistake and output the account flow into `account-actions-with-credential.ts`. This was because I asked it to reference vendor-okx to integrate the earn account – currently only okx's earn account is also integrated as an account. But the AI learned some outdated practices. The current exchange integration standard is to publish all accounts via `provideExchangeServices`, not using `provideAccountActionsWithCredential`.

        This kind of knowledge isn't available to a new AI agent. How should I model such knowledge? How can I provide this project context as an external brain for the AI agent? This is a thought-provoking question that needs careful consideration tomorrow.

    3.  Cooked lunch for SY's friends in the afternoon. Exhausted me! Well, tomorrow I'll continue working~

2.  What I'm thinking:
    - As mentioned above, I need to carefully think about how to compactly design an external brain for the AI agent. The simplest start is with a set of AGENT.md files. I've tried this before, but maintaining these documents comes with a significant overhead. It's hard to separate the junk from the truly valuable experience to record. For now, memory is like any other prompt, just with the potential for the agent to have a loop for updating its memory. The most important thing is how to measure the result of the AI agent's work.

    - Regarding the previous point, I read an interesting article. Let me summarize it in my own words: First, for evaluating a single step of an agent's work, evaluations can be categorized as:
      1.  Static tool eval: Compiler, linter, unit tests, e2e tests
      2.  Model eval: Using another LLM to judge according to a defined prompt
      3.  Human eval: I judge

      Then, for systematic evaluation of an agent, there are two types:
      1.  Capability evaluation: Answers what the agent can do. The pass rate might be low – for example, using legion to gradually execute larger, harder tasks, like exploring a new frontier.
      2.  Regression evaluation: Does it still retain old capabilities? Like repeatedly testing some tasks to ensure consistent performance.

      When a new capability is introduced, you transition from capability evaluation to regression evaluation.

      The article also mentions two important metrics: `pass@K` and `pass^K`.
      - pass@k: At least one success out of k attempts. More attempts, higher probability of at least one success. Applicable when you only care about "finding at least one usable solution."
      - pass<sup>k</sup>: All k attempts must succeed. More attempts make it harder to maintain consistency. Applicable when users expect reliable production agents every time.

      FYI: [Reference article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

    - My energy is still pretty low. I worked a bit in the afternoon and felt tired after cooking dinner. When will I ever become like CZ and not need sleep?

3.  What do I plan to do tomorrow?
    1.  Think about this eval agent model and continue iterating on the multi-agent system.
    2.  Cluster security – must be done.
    3.  Legionmind-github-bridge.

### 2026-01-25

Today I got a haircut. When I got home, the system was unstable. It turned out that Brother Ji had started two terminals with the same service running, causing a big problem due to mutual preemption.

1.  What I did today:
    1.  Tried to migrate the cluster behind NAT, of course using the brand new legion for this task. Here's my operation:
        - First, modified the Kops cluster, created a new VPC using the 172.21.0.0/24 and 172.21.1.0/24 subnets. Then created a NAT for outbound traffic.

          I originally planned to use the 10.0.x.x subnet, but AWS doesn't allow that CIDR, so I switched to 172.21.x.x. One pitfall: I had to point the existing load balancer to the appropriate VPC in the cluster resource (it was implicitly defaulted before, but now with an extra CIDR I had to specify it manually).

        - Next, created a new instance group pointing to the new VPC. Minor issue: the new IG didn't have S3 permissions for some reason. I added them manually and the node joined the cluster normally.

        - Next step: manually migrate services to the new IG.

        - Finally, tear down the original IG.

        After all that, I found that all cluster outbound traffic now came from a single IP, which was causing issues for services with IP rate limiting. Had to roll back. I need to add the HTTP proxy skill point before proceeding.

    2.  The multi-agent was used to implement an auto-updating script for midas net asset value. DeepSeek worked on it for a long time, and I was quite satisfied. The core issue is: if I miss an early design error, I'm in for a huge waste of tokens and time, because the agent isn't particularly fast.

        Currently, these coding agents are still quite primitive. They often crash due to network issues. Making them suitable for serious long-running tasks still has poor SLI. This might be an opportunity – it requires knowledge of software engineering high-availability concepts to make it work.

2.  What I'm thinking:

    Not many thoughts today; I've inline-written them into the above sections.

3.  What do I plan to do tomorrow?
    1.  Design an HTTP proxy mechanism for Yuan.
    2.  After launching, re-migrate the cluster.

### 2026-01-26

Today was a day of restraint. I've noticed a significant improvement in how I handle emotions since I turned 25: alongside the emotional reaction, there's a clear strand of rationality acting as a copilot. This strand places a cadmium rod in the huge emotional reactor. Without it, emotions would run wild, triggering a self-exciting chain reaction with potentially irreversible consequences. With this rod, I begin to understand what to say and what not to say, what to do and what not to do, what decisions to make and what not to make. This is a welcome change happening in me.

1.  What I did today:
    1.  Used legion to design and implement the HTTP proxy for Yuan. The experience was quite smooth. Midway, I reviewed the design, modified one point (how to choose an available terminal), and then let the agent go. The result was quite good.
    2.  Also used legion to automate midas updates. However, the AI kept doing a poor job, failing to correctly understand my requirements and the usage of `@yuants/protocol`. I suspect a few possible reasons: the AI's intelligence is insufficient (DeepSeek might not be smart enough), my review wasn't strict enough, or the documentation knowledge base is not rigorous enough.
    3.  Dammit, I was woken up by an alert at night. A host inexplicably crashed. It seemed like a CPU usage spike caused the host to enter a state from which it couldn't recover on its own. The host logs are a mess. My verdict: alerts are useful; logs are crap. Making a note of this!

2.  What I'm thinking:
    1.  While showering, I thought about the key point of my collaboration with AI. First, the service availability of the AI agent itself – it shouldn't just quit mid-process. (Ralph loop basically uses brute-force retries to improve availability). Second, how do I accept the output from AI? Just like a subordinate's report to a superior needs a PPT or a specialized middle manager as an "expensive relay", how can AI reports to humans be limited to plain Markdown and code? Can't every item in the AI report link to an artifact? Could there be a Citation Agent dedicated to this part?

        However, my current use of AI is mostly limited to coding tasks.

    2.  Let me think deeply about why, despite having a multi-agent system, it steadily drives towards failure. Earlier I suggested three possibilities:
        1.  AI's own intelligence level
        2.  Insufficient human review
        3.  Insufficient knowledge base, unable to provide correct information for the AI to start quickly

        Let's examine these. Point 1 doesn't need consideration. Working on point 2 could rely on an increasingly detailed RFC document to give subsequent steps the correct direction. But this development method feels like a return to the **waterfall** model: a linear process.

        ```text
        Requirement analysis -> Backend design -> Backend development -> Frontend development -> Integration testing
        ```

        The factors behind this are two-fold: technical and organizational/process, but the latter is the *primary factor*.

        Technically, there are natural dependencies between tasks. As a human organization, the waterfall model suffers from low efficiency, difficulty exposing quality risks, poor flexibility, and team conflicts. As a collaboration between me and AI, efficiency and team conflicts are naturally absent in the AI world. It's like we live in different time dimensions – my day might feel like a year to the AI. Less efficiency might just mean more token waste, but that's not my biggest concern. The real problem is quality risk from misunderstanding requirements or facts, and poor flexibility.

        I must find a way to maximize AI's capabilities while freeing myself as much as possible. Drawing from human organizational experience, I need to become a higher-level node in the command tree, able to confidently delegate tasks to the AI without it going off track.

        Two key points:
        1.  Intent alignment
        2.  Layered verification

        I need to think deeper about this. I feel I need more practice and experimentation.

    3.  I need to be wary of the bad side of this "when you have a hammer, everything looks like a nail" mindset: path dependency, output exceeding understanding.

3.  What do I plan to do tomorrow?

    Zl is coming tomorrow. Plan to exercise, eat, play board games.

### 2026-01-27

Zl arrived. A lot of information to digest. We played a board game – the Cycle of Tragedy. Spent three hours understanding the rules. Finally, in the last scenario where I played the villain playwright, I felt the sweet spot of the game. Ended with my complete victory.

### 2026-01-31

The past few days have been quite packed, so I didn't record. But stopping recording is not an option, so I'll pick it up now and record everything together.

Besides being busy, why didn't I record?

1.  Because I was afraid that recording would require sitting down for 30+ minutes to document the day. This stems from a fear and burden about recording daily activities; it's a bad attitude.
2.  Usually, I only want to start recording after the day is truly over. But thinking about it, that's somewhat against human nature. Now I go to bed when it's time, quickly diving under the covers, not because I've finished everything I wanted to do (does that ever happen?). So I end up not recording when I have free time, and when I should record, I have to rush to bed. Combine that with issue 1.

   The combination makes things pile up.

1.  What I did today:

    > Correction: What I did in the last few days.
    1.  Inspired by SC, I started using Neovim. Why? I saw that nvim-orgmode has truly become a usable org-mode, and I've grown tired of Emacs:
        - Endless update failures
        - Opaque debugging and error messages
        - Flexibility that adds burden without any benefit for me
        - I don't understand Emacs Lisp and don't want to

        For years, I've endured all these just to use org-mode, with no other alternative. Now, the Neovim camp seems to have a viable replacement – why not try it?

        I've been a Vim user for years, using evil-mode even in Emacs, so I've never felt Vim is a big burden. In VSCode and IntelliJ, I can't survive without Vim, so switching to Neovim is no problem.

        With no obstacle, I looked at the Neovim ecosystem. Neovim doesn't have VimScript's historical baggage; it uses Lua directly for configuration and plugins. Lightweight and with a very active community. The plugin system is now unified under `lazy.vim`. Neovim's design for plugins and configuration seems well-organized and specifically innovative for Vim's past pain points. Vim & Emacs had countless similar attempts to unify the ecosystem, but due to fragmentation, none truly succeeded.

        So I tried LazyVim. Wow, I felt like I had an instant VSCode, one that runs in the terminal. You don't know how good that feels?

        Now I have a powerful entity built on new infrastructure, and its configuration is incredibly simple. Flexibility and convenience are nicely balanced. My old pain points are almost all solved.

        I barely spent any time transitioning many of my workflows. I now use tmux with 5 windows, each opening Neovim in a different folder. In Neovim, I have a directory tree on the left, code in the middle, and opencode/terminal on the right.

    2.  Updated legion. I significantly reduced the text size of the legionmind skill (by about 4k lines). Currently, it seems to need less of my oversight. But I don't know if it's because I'm using smarter models lately or if this version of legionmind is actually smarter.

    3.  Set up openclaw. Minimax 2.1 is still a bit dumb, but as a personal assistant, openclaw is quite capable – basically a ChatGPT with memory, plus hands and feet (can operate my computer).

    4.  Added HTTP proxy functionality to Yuan, along with metrics, etc.

2.  What I'm thinking.

    Sometimes I feel that using AI to write things is like debugging code you don't fully understand: constantly testing behaviors or printing logs to assist debugging, tweaking a bit here and there, until you get a satisfactory result. Let's explore the origin of this feeling:

    The process of using AI to write code involves a human entering a prompt with specific instructions, hoping the AI will grasp the implicit instructions and context behind them, and then complete the task correctly.

    You can layer the instructions you want to convey to the AI: the top layer is the task's immediate instruction. Below that is some technical decisions and best practices accumulated for this project. Next is background information about the problem domain the project addresses. Below that is the AI's own professional background as a software engineer – its personal preferences, technical biases, historical experiences, and accumulated thinking patterns. At the bottom is the world's background knowledge.

    In a conversation with AI, you can clearly convey only the immediate task's instructions, then rely on the AI having enough background knowledge and the information needed to solve the problem.

    So it's logical that if a task's context is small enough, instructions are crystal clear, and there's little historical baggage, the AI should be able to complete the task to high quality easily. If there's a lot of implicit background information, you'll likely get some strange output.

    Legionmind's job is to let the AI accumulate background knowledge and best practices about the project and the problem domain. This requires the AI to have good logical thinking and memory (context capacity), or abundant world background knowledge. Beyond those, nothing can help.

    —

    Then, I feel Neovim is a tool I wish I'd found earlier.

3.  What do I plan to do tomorrow?

    Tomorrow, I'm visiting SC's new home, playing board games, and showing SY some snowboarding gear.

### 2026-02-01

Went to Lengshan with SY to look at snow boots. Measured foot length (245) and found a comfortable pair. Unfortunately, Lengshan's nice colors were out of stock in SY's size, so she'll have to buy online.

At noon, I ate at SC's place. He has a sous-vide steak device – the steak was really tender. SC prepared a room tour puzzle with two clues. The first clue required finding 4 English words/sentences in 4 places, and the sequence number spelled out a word: Three. The second clue came from an environmental puzzle, ultimately yielding the number 31/13 (can't remember exactly) which allowed us to retrieve a chocolate from a drawer with many numbered boxes.

Unfortunately, he didn't have chocolate, so we got a cute sticker.

—

The afternoon board game session was even more interesting. The highlight was "The Leaders" (or similar). For the first time since we started playing, the middle class (played by SC) achieved an unprecedented victory! PGW, playing the bourgeoisie, was furious because Mouse, playing the government, failed to help him in two critical policy reform votes. I played the working class, so naturally I had little common interest with the bourgeoisie on most issues. In fact, by the time the game ended, the scores of all three except PGW were very close. Only the capitalists were hurt.

This game is really fun, becoming my favorite. It has serious depth; each player's playstyle is vastly different. Every time we play a different role, it's a completely different experience. For instance, this time my working class experienced for the first time an excess of unemployed population (because neither the government nor the bourgeoisie wanted to open new companies), leading to conditions for a worker demonstration/riot. The workers took to the streets, threatening to overturn the nation. The specific effect was gaining influence dice and deducting points from other classes totaling (unemployed population - 2 + number of unions).

Sure enough, where before the working class had to beg and persuade the bourgeoisie and government to open new companies, now they scrambled to open new ones, which revived the game. I finished second with a high score of 101.

### 2026-02-02

Exercised and then just chilled. Did nothing productive.

1.  What do I plan to do tomorrow?
    1.  Get all the HTTP proxy stuff working and solidify the cluster.
    2.  Get nvim-orgmode up and running properly.
    3.  Research the relay station.

### 2026-02-05

Time to log my day! I'll try a different format today.

1.  ChatGPT Pro

    On Friday, I finally took the plunge and bought a ChatGPT Pro subscription on Xianyu (a Chinese second-hand marketplace). They asked for 1369 RMB. I saw it's cheaper than 200 USD, so I ordered quickly. But they didn't finish setting it up until Tuesday. They gave me an Outlook email and a ChatGPT account bound to it.

    I logged into the Outlook email and found a ChatGPT invoice, paid in Philippine Pesos.

    |                          |                 |
    | ------------------------ | --------------- |
    | plan                     | amount          |
    | ChatGPT Pro Subscription | ₱8919.64        |
    |                          | Tax: ₱1070.36   |
    |                          | Total: ₱9990.00 |
    | Payment method           | Mastercard-xxxx |

    Curious, I looked up the conversion to CNY. It was only about 1174.54 CNY! So they netted nearly 200 RMB from me!

    Then I researched – damn, they deserve that profit. The Philippines is indeed the cheapest place globally to buy the ChatGPT Pro plan. Impressive.

    I have a reliable contact in Thailand. I thought about replicating their success, but haha, Thailand is more expensive. At about 1537 CNY. Could I, perhaps, sell Philippine ChatGPT memberships on a Polish (1942 CNY) version of Xianyu? 🤔

2.  Reaching Closure on HTTP-Proxy

    Finally got the HTTP proxy thing working. Damn, it was more complex than I thought. It demonstrated legion's limit: it can handle a topic spanning 8 projects in a mono-repo, but just barely. I even encountered subagent crashes a few times.

    But then again, without legionmind, I have the impression that giving the AI direct instructions couldn't have handled a problem of this scale. This indirectly shows legionmind's unique capability in such situations.

    In the end, Legion solved this task on its own. I can now mostly step away from coding and only leave a few review comments on design docs. I'm fairly satisfied with this version of Legion.

3.  Iterating on Legionmind

    Speaking of legionmind.

    I upgraded legion again tonight. I feel that forcing it into a fixed workflow is still a bit rigid – essentially making the AI work within my framework. But AI, especially smart ones like the Codex 5.2 extra high I keep open with ChatGPT Pro, actually understands everything. I'm not even sure my multi-agent system is wasteful here. I think as AI gets smarter, letting it design its own workflow is the more reasonable approach. At this level, whether it's me, Manus, or oh-my-opencode, we're all just paving the way before AI can completely replace humans in current human tasks. As Nietzsche said, "Man is a rope, tied between beast and overman — a rope over an abyss."

    Back to the point: I should systematically test different versions of Legion's performance in a scientific way. I need a benchmark to evaluate how different Legion versions handle the same set of complex coding tasks. I should build such a benchmark tool quickly (maybe by referencing common bench tools in the industry?).

    So besides continuing work on Yuan, I need to focus on this area.

    By the way, I haven't worked on the legionmind-github-bridge recently. I noticed that opencode itself has this capability. Rather than struggling to finish it with tons of bugs, I think it's better to hold off for now. I should avoid doing things that are easily swept away by the waves. Instead, I want to build a boat that rises with the sea level. (This metaphor is borrowed from the Manus blog.)

    — That's it for today. I saw CZ's cross-server comment. I think I should indeed record things when I feel like it. But habits take time. For me, the greatest value of recording isn't looking back at details on some future day; it's that the act of recording itself is a chain-of-thought deep thinking process. Even if nobody else reads this log, it remains highly significant for me.

### 2026-03-17

Restarting recording after more than a month. The Spring Festival happened; I won't chase the missing parts. Before today, I also tried voice recording but haven't had time to organize it. I'll just drop it in here.

A lot has happened in this month-plus. Impossible to record everything at once. So I'll skip the backlog and just write today's content.

1.  Continued Exploration of AI Agents

    On March 8, I attended an AI Agent discussion sharing session organized by alumni. It was held in Shenzhen with about 30 people registered offline, reportedly over 40 actually came. I participated remotely via Tencent Meeting. But that day I had accompanied SY to the hospital, so the environment was poor – I gave my talk from the car, connected via mobile hotspot. The network was unstable, so I couldn't turn on the camera or see the reactions of remote friends. I just talked to the screen alone. Although poorly prepared, I managed to speak smoothly using my actual reflections on using AI agents (i.e., the work logs I've kept since the beginning of 2026 and the AI-related ideas derived from them). I originally thought I'd be nervous, but the actual effect was okay.

    Relevant links:
    1.  [Thoughts on AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)
    2.  [Legion's Growth Trajectory: From Task Recorder to Multi-Agent Engineering Operating System](https://0xc1.space/blog/legionmind-de-cheng-chang-gui-ji/)

    I also looked at other alumni's sharing. It seems everyone is still in the early stages of exploring AI agents like openclaw. This indicates the field is still a blue ocean. However, the "free lobster" event on March 6 at the Tencent Building in Shenzhen showed that people have huge enthusiasm for this area. So even though it's a blue ocean, the opportunity window is limited.

    Later on Friday, I discussed with CZ. I introduced legionmind's usage to him, let him try it out with a real task, and also introduced other industry agent harness projects and related blogs. The discussion clarified a question that had been running in the background of my mind: **What exactly is legionmind?** Now I think the answer has two parts:
    1.  An Agent Harness Tool.
    2.  Handling the "implicit information wall" mentioned earlier.

    After thinking for a day, CZ proposed applying for OPC and formally making this a business. He also had his own relevant practices and thoughts – the CZon project and his recent thinking on the Elys product. Combining our ideas, an "AI One-Person Company" product emerged: build AI agent avatars, align with AI on a certain labor theme, construct knowledge bases (soul/memory), ultimately pursuing deep alignment. I won't say more for now, but I have high enthusiasm for this project. With SY's deep knowledge in psychology, it can likely support our work. I think after the quantitative trading stuff stabilizes, I'll invest more energy, passion, and time into this.

2.  Signal-Trader

    This idea originated from CZ's "capital protracted war" concept. If completed, it might greatly improve our subjective strategy's betting method and bring some returns. Currently, progress is not good. I need to reflect. Over the past half month, my mind was significantly occupied by some reasons. One reason for Friday's discussion with CZ was that he understood my difficulties and wanted to hand over the task's advancement. But he seems to have been busy with OPC stuff, so after I return, I need to push it forward.

    After syncing with CZ today, this thing will be my highest priority until it's done. Reasons:
    1.  Trust from teammates. When I first heard about this module, I logged off after CZ synced with me. Later I saw their chat history, including discussions between CZ and Ryan. It warmed my heart and will translate into responsibility.
    2.  Potential returns from this thing. It could significantly improve the returns of our midas fund, boosting our income. Considering OPC is currently still in the "talking about the product" phase, this is more stable and should come first.
    3.  Finally, it serves as a major test for legionmind. I'll use it intensively on this task, identify legionmind's issues as raw material for its improvement, which will indirectly impact our OPC project.

    Why has progress been slow?

    First and foremost, my energy was significantly occupied. But as things become clearer, pressure and motivation simultaneously descend upon me. As mentioned in the article [The Adventure of Helm and Wind](https://0xc1.space/blog/duo-yu-feng-de-li-xian/), the source of motivation is fully ignited in me. I have no retreat, but I'm not desperate. Instead, I feel a healthy pressure, responsibility, and happiness at the potential positive future. All these form my motivation. I foresee that from now on, progress on this thing will accelerate.

    Second, legionmind itself exposed weaknesses in this complex work. The system we discussed has many details, and these details could significantly influence the module's design direction during implementation, potentially revealing even more unimagined details. This complexity manifests in the RFC design documents, making them daunting to read. Combined with my lack of energy in the past period to carefully review these technical documents, I've felt lost after rounds of vibe-coding. From this perspective, TDD might be a good practice for this project. If AI can write its own end-to-end tests and give me simple manual testing methods, driving this module should be manageable.

    Third, hidden behind the second point: the concept of signal-trader itself is a product of CZ's deep thinking. Although we've had many sync sessions, I'm not entirely sure if I've grasped the core of his idea, or if even he hasn't thought it through completely. I'm proud to state this reason openly. I'm already not the old me; the solution is to take over the intellectual initiative from him. Essentially, I need to invest more mental energy.

3.  Blog Revision

    I used Legionmind to significantly revise my blog theme. It's now a theme inspired by Anemone and Granda.org, expressing my personal will. After much deliberation, I found it too difficult to modify the CZon site's style.css, so I reversed course: I moved the multilingual text generated by the CZon site back into the main site. Since CZon's ambition is elsewhere, let CZon do what it's suited for, and I'll freely express my will on the outer layer.

### 2026-03-24

Trying again. Another attempt at voice logging.

Last time, around March 6, about 20 days ago, I tried using a voice memo as the day's log to summarize and think about recent life. I then tried using ChatGPT to convert it into a text log. The effect was quite good; it completed the task admirably, organizing my somewhat messy spoken language into structured, logical, clear text.

The quality of output was quite good. But I felt a fear: fear of "losing my voice." If all these words were not spoken by me but entirely written by ChatGPT, would I have become something tamed by AI? Do I still have my own thinking and thoughts? Or am I just providing raw material, handing the real thinking process to AI, and then presenting the