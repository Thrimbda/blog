---
"title": "2026 Work Log: AI Agent Collaboration and System Development Practice"
"summary": "This article is a work log for January 2026, where the author details daily tasks, thoughts, and plans. The core focus is on leveraging AI Agents (particularly multi-agent systems) to enhance personal productivity and system autonomy. The log covers several technical practices, such as refactoring opencode-feishu-notifier, developing legionmind-github-bridge, designing multi-agent templates, handling cluster security migration (e.g., NAT configuration), and implementing Yuan's http proxy mechanism. The author reflects on key issues in AI collaboration, including intent alignment, layered validation, knowledge base construction, and Agent evaluation methods, and discusses the applicability of the waterfall development model in AI collaboration. The log also includes personal life events (such as friends visiting, health management) and reflections on emotional management."
"tags":
  - "Work Log"
  - "AI Agent"
  - "Multi-Agent System"
  - "System Development"
  - "Cluster Security"
  - "Productivity Enhancement"
  - "Automation"
  - "Personal Management"
"date": "2026-01-01"
---

# Table of Contents

1.  [2026](#org5ee6b7c)
    1.  [2026-01 January](#org45f3c96)
        1.  [2026-01-22](#org3212356)
            1.  [What was done today:](#orgedcd975)
            2.  [What are the thoughts:](#orgd861555)
            3.  [What is planned for tomorrow?](#org6508baf)
        2.  [2026-01-23](#orge794f8c)
            1.  [What was done today:](#org983b200)
            2.  [What are the thoughts:](#org745e411)
            3.  [What is planned for tomorrow?](#orgd141df3)
        3.  [2026-01-24](#org9073c8a)
            1.  [What was done today:](#org1a919b7)
            2.  [What are the thoughts:](#orga4c58b1)
            3.  [What is planned for tomorrow?](#org40d8af6)
        4.  [2026-01-25](#org8472491)
            1.  [What was done today:](#orge1fb7a5)
            2.  [What are the thoughts:](#orgae54535)
            3.  [What is planned for tomorrow?](#orgd08b296)
        5.  [2026-01-26](#org59008a3)
            1.  [What was done today:](#org0ff4e76)
            2.  [What are the thoughts:](#org6827fba)
            3.  [What is planned for tomorrow?](#org884441d)
        6.  [2026-01-27](#orge656d95)
        7.  [2026-01-31](#orgef7cc98)
            1.  [What was done today:](#org1c7254e)
            2.  [What are the thoughts](#orgb6eb713)
            3.  [What is planned for tomorrow](#org896307c)
        8.  [2026-02-01](#org71706c0)
        9.  [2026-02-02](#org28106d7)
            1.  [What is planned for tomorrow?](#orgf8b0675)

<a id="org5ee6b7c"></a>

# 2026

<a id="org45f3c96"></a>

## 2026-01 January

<a id="org3212356"></a>

### 2026-01-22

<a id="orgedcd975"></a>

#### What was done today:

1.  Refactored the opencode-feishu-notifier; it now sends notifications to users in a predetermined manner.
2.  Continued having the AI work on legionmind-github-bridge. I started using opencode's multi-agent mode, which launched 5 agents to modify 5 issues. It ran for 2 hours straight, exhausting my 5-hour Codex tokens.
3.  A node died in the sg cluster today. Looking at the logs, it was under constant SSH brute-force attack, which is not good. Briefly considered a few directions:
    - Disable password authentication
    - Disable the SSH daemon's exposure to the entire internet
    - Move the cluster behind a NAT
4.  Handled some miscellaneous tasks. ZL is coming to Suzhou next week, spent some time making arrangements, but it didn't go smoothly. I don't plan to invest more mental energy into this.

<a id="orgd861555"></a>

#### What are the thoughts:

At this stage, I can only manage 2-3 things simultaneously. This includes development work, daily arrangements, thinking, and output. Beyond this range, I become overwhelmed and easily fatigued. This is even with me trying to delegate work to AI Agents as much as possible. Therefore, I think there should be two directions for improvement:

- For coding tasks, I should maximize the autonomy of agents, with several optimization goals:
  1.  Disturb me as little as possible.
  2.  Let it do as much work as possible.
  3.  Improve the reliability of its work as much as possible.
- I also need some personal improvement:
  1.  Manage my mental energy to avoid rapid fatigue.
  2.  Improve the ability to work across multiple different contexts simultaneously, avoiding forgetfulness and disorganization, and implement progress management.

Based on the above thoughts, I think I can try two directions tomorrow:

1.  Design a multi-agent template for legionmind and experiment with it on a coding task in Yuan using opencode.
2.  Continue keeping the work log to explore methods for managing mental energy and context.

<a id="org6508baf"></a>

#### What is planned for tomorrow?

1.  As mentioned above, work on a multi-agent experiment.
2.  Continue with legionmind-github-bridge.
3.  If time permits, work on cluster security.

---

Overall, my current main goal is to use AI to scale myself up, and then try to scale others.

<a id="orge794f8c"></a>

### 2026-01-23

Had a bit of a cold today, with a headache, so productivity was low. However, I'm glad I started doing daily summaries.

<a id="org983b200"></a>

#### What was done today:

1.  With AI assistance, designed a multi-agent system. This system hasn't been systematically polished yet.
2.  Made further progress on legionmind-github-bridge.
3.  Modified the preemption design and implementation of node-unit. Previously, when a node-unit failed, all deployments under it would be cleared. Now, they are cleaned up one by one.
4.  Took the CFFEX (China Financial Futures Exchange) exam required for opening a futures brokerage account. It required the camera to be on the entire time, no minimizing or switching screens. Fortunately, unlimited attempts were allowed, which couldn't stop me. Passed with a high score of 95.

<a id="org745e411"></a>

#### What are the thoughts:

My goal is to achieve agent autonomy with minimal friction. My current workflow is:

1.  Legionmind serves as an SOP for development work; it's an agent skill. I like agent skills.
2.  Opencode serves as the entity for agents. I use its capabilities like bash / tool calling / langraph / command / subagent. If I ever need to abandon opencode, these would be on my to-implement list.
3.  My current headache is how to combine skills and these sub-agents.

Had a headache all day, only clearing up a bit in the evening. I realized that writing these thoughts at the end of the day might not be a good method. Perhaps I should only record facts and summarize thoughts the next morning after waking up.

<a id="orgd141df3"></a>

#### What is planned for tomorrow?

1.  Use this multi-agent system to do something, like connecting Gate's investment account.
2.  Continue with legionmind-github-bridge.
3.  Cluster security, if time permits.
4.  Restart work timing. (Important)
5.  SY's friends will be visiting tomorrow, so work time might be preempted.

<a id="org9073c8a"></a>

### 2026-01-24

Slept in until 11 AM today, feeling completely relaxed. Haven't slept so freely in a long time.

<a id="org1a919b7"></a>

#### What was done today:

1.  Deployed a new version of node-unit. I was confident in deploying it because I have relatively comprehensive end-to-end tests. Specifically, I started a timescaledb (PostgreSQL 17) in Docker, launched two node-units, and inserted 21 `@yuants/portal` instances into the database for testing, which eventually converged to a state of one node-unit handling half each.

    This test basically verifies that when a bunch of unowned deployments appear and two node-units come online, they can be observed preempting deployments in turn. What's missing is a real CPU/memory workload and a scenario where a node-unit goes offline unexpectedly.

2.  Used the new multi-agent version of legionmind in Yuan to tackle the issue of outputting account streams for the vendor-gate earn account. I had the agent first use legion for document creation, producing the following documents:

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

    It feels like a proper workflow now. However, there's some conflict between my new multi-agent system and the original legionmind's document writing. I should carefully consider the boundaries of each task. For example, specifications on how each type of document should be written should be placed in separate skills, and legionmind should be a description of the workflow. Each type of agent should be able to load a few smaller skills to assist in completing its work.

    Another issue is that it made a mistake during its first run, outputting the account stream to `account-actions-with-credential.ts`. This is because I asked it to refer to vendor-okx to complete the earn account integration, as currently only OKX's earn account is integrated as an account. However, the AI learned some outdated practices from it. The current exchange integration standard is to publish all accounts through `provideExchangeServices`, not using `provideAccountActionsWithCredential` to integrate accounts.

    This knowledge is something a brand-new AI Agent doesn't possess. How should such knowledge be modeled? How should I provide such project context as an external brain for the AI Agent? This is a question worth pondering deeply and needs careful thought tomorrow.

3.  Cooked in the afternoon to entertain SY's friends. It exhausted me. So, back to work tomorrow~

<a id="orga4c58b1"></a>

#### What are the thoughts:

- As mentioned above, I need to carefully consider how to compactly design an external brain for AI Agents. The simplest could start with a set of AGENT.md files. I've tried this before, but the overhead of maintaining these documents is quite high. Distinguishing between noise and truly valuable experience is difficult. Currently, it seems memory, like other prompts, might just have an extra loop for the agent to update its memory. The most important thing is still how to measure the results of the AI Agent's work.

- Regarding the above point, I read an article that I found very interesting. Let me summarize it in my own words: First, the evaluation of an agent's single-step work can be categorized into:
  1.  Static tool eval: Compiler, linter, unit tests, e2e tests.
  2.  Model eval: Using another LLM to judge based on our defined prompt.
  3.  Human eval: I judge.

  Then, there are two types of systematic evaluation for an Agent system:
  1.  Capability-based: Answers what this agent can do? The pass rate might be low, e.g., using legion to gradually execute larger, more difficult tasks, like exploring a new frontier.
  2.  Regression-based: Can it still maintain previously acquired capabilities? For example, repeatedly testing some tasks to ensure stable implementation.

  When a new capability is introduced, it should transition from capability-based to regression-based.

  The article also mentions two important metrics: `pass@K` and `pass^K`.
  - pass@k: At least one success in k attempts. The more attempts, the higher the probability of at least one success. Applicable: You only care about "finding at least one usable solution."
  - pass^k: All k attempts must succeed. The more attempts, the harder it is to maintain consistency. Applicable: Users expect reliable production from the agent every time.

  FYI: [Reference this article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609)

- Energy levels are still a bit low. Worked a bit in the afternoon, and cooking in the evening made me feel tired. When will I be like CZ and not need sleep?

<a id="org40d8af6"></a>

#### What is planned for tomorrow?

1.  Think about this eval agent model and continue iterating on the multi-agent system.
2.  Cluster security issue, must work on it.
3.  Legion-github-bridge.

<a id="org8472491"></a>

### 2026-01-25

Got a haircut today. Came back to find the system unstable. Turned out to be Ji Ge running two services with the same terminal_id, causing preemption issues and major problems.

<a id="orge1fb7a5"></a>

#### What was done today:

1.  Attempted to migrate the cluster behind a NAT, of course using the new legion for this task. My steps were:
    - First, modify the kops cluster, create a new VPC using the 172.21.0.0/24 and 172.21.1.0/24 CIDR blocks. Then create a NAT for egress traffic.

      Originally planned to use a 10.0.x.x CIDR, but AWS didn't allow creating such a CIDR, so switched to 172.21.x.x. There was a pitfall: need to manually point the existing load balancer in the cluster resource to the corresponding VPC (originally implicitly default, now with an extra CIDR it needs manual specification).

    - Then create a new instance group pointing to the new VPC. A minor hiccup: the new IG didn't have S3 permissions, not sure why. Manually added them, and nodes joined the cluster normally.
    - Next step: manually migrate services to the new IG.
    - Finally, decommission the old IG.

    After completion, found that cluster egress traffic now had only one IP, causing issues for our IP rate-limiting services. Had no choice but to roll back. Must first implement the http proxy capability before proceeding.

2.  Used the multi-agent system to practice an automatic script for updating Midas net asset value. Deepseek worked on it for a long time, and I was quite satisfied. A core issue here is that if there's an early design error I don't catch, it leads to massive token and time waste, as I found agent work isn't that fast either.

    Currently, these coding agents are still quite primitive. They often crash or exit due to network issues, etc. Having them handle serious long-running work still has poor SLIs (Service Level Indicators). This might also be an opportunity. Briefly thinking, this requires some software engineering knowledge on high availability, etc., to work.

<a id="orgae54535"></a>

#### What are the thoughts:

Fewer thoughts today, mostly written inline in the sections above.

<a id="orgd08b296"></a>

#### What is planned for tomorrow?

1.  Design Yuan's http proxy mechanism.
2.  After deployment, re-migrate the cluster.

<a id="org59008a3"></a>

### 2026-01-26

Today was a day of restraint. I've noticed a significant improvement in handling emotions after turning 25: alongside strong emotions, there's a clear thread of理智 (reason) acting as a copilot. This thread of reason inserts a control rod into the massive emotional reactor. Without this control rod, emotions could spiral out of control, triggering a self-sustaining chain reaction with potentially irreversible consequences. Under the influence of this control rod, I've begun to understand what can be said, what cannot; what can be done, what cannot; what decisions can be made, what cannot. This is a welcome change happening within me.

<a id="org0ff4e76"></a>

#### What was done today:

1.  Used legion today to design and implement Yuan's http proxy. I found the process quite smooth. Midway, I reviewed its design, made a modification regarding one point (how to select an available terminal), then let the agent take over. The results were quite good.
2.  Also used legion to work on the automatic Midas update task. However, the AI performed poorly, failing to correctly understand my requirements and the usage of `@yuants/protocol`. I have a few suspicions: the AI's intelligence might be insufficient (Deepseek might still seem not smart enough); review wasn't strict enough; or the documentation/knowledge base isn't rigorous enough.
3.  Damn it, got woken up by alerts at night. A host died mysteriously. Looks like a CPU usage spike caused the host to enter an unrecoverable state. The host logs are a mess. My assessment: alerts are useful, logs are crap. Noted!

<a id="org6827fba"></a>

#### What are the thoughts:

1.  While showering, thought about the most critical points in my current collaboration with AI. One is the service availability of the AI agent itself—it shouldn't crash or exit mid-run. By the way, Ralph Loop basically improves availability through brute-force retries. Another point is how I accept output from AI. For example, a subordinate reporting to a superior still needs a PPT or even a professional middle manager to act as an "expensive megaphone." How can AI's reporting to humans be limited to plain Markdown and code? Can AI's report link each item to an artifact? Can there be a Citation Agent专门负责 (specifically responsible for) this part?

    However, my current use of AI is quite limited, focused only on coding tasks.

2.  Carefully consider why, after having a multi-agent system, it steadily headed towards crashing and burning. The earlier speculation mentioned three possibilities:
    1.  The AI's own intelligence level.
    2.  Insufficiently strict human review.
    3.  The knowledge base isn't detailed enough to provide more correct information for the AI to bootstrap quickly.

    Let's think carefully about these points. Point 1 doesn't need thinking. Putting effort into direction 2 could indeed rely on an increasingly detailed RFC document to give sufficient correct direction to subsequent steps. But this development method feels like we've returned to the **waterfall** development model, completing work through a linear process:

        Requirements Analysis -> Backend Design -> Backend Development -> Frontend Development -> Integration Testing

    The contributing factors exist at two levels: technical and organizational/process, with the organizational/process level being the *primary factor*.

    The technical level is the natural dependency between tasks, e.g., frontend must wait for backend to provide interfaces, backend must wait for product's CRD to be written.

    As a human organization, the waterfall model has issues: low efficiency, quality risks hard to expose, poor flexibility, team conflicts. As a collaboration method between me and AI, efficiency and team conflicts naturally don't exist in the AI world. It's as if AI and I exist in different time dimensions; one day for me is like a year for AI. Well, low efficiency might cost more tokens, but that's not my primary concern currently. The actual problem I face is quality risks from misunderstandings of requirements or facts, and poor flexibility.

    I must find a way to maximize the use of AI's capabilities while maximizing my own liberation. Drawing from human organizational experience, I must become a higher-level node in the command tree, able to confidently delegate tasks to AI while keeping it on track.

    The two most critical points:
    1.  Intent alignment.
    2.  Layered validation.

    Need to think deeper about this. I feel I need to use it more and get a better sense.

3.  I need to be wary of the downside of being in this "looking for nails with a hammer" state: path dependency, output over understanding.

<a id="org884441d"></a>

#### What is planned for tomorrow?

ZL is coming tomorrow. Plan to exercise, have a meal, play board games.

<a id="orge656d95"></a>

### 2026-01-27

ZL came. Information overload, need to digest. Played board games—Tragedy Looper. Spent three hours just understanding the rules. Finally, in the last scenario where I played the antagonist Scriptwriter, I felt the sweet spot of the game. Ended with my complete victory.

<a id="orgef7cc98"></a>

### 2026-01-31

The past few days have been quite packed, so no records. But stopping recording is not acceptable, so I'm picking it up now and recording everything together.

Besides being busy, why didn't I record?

1.  Because of an underlying fear that recording requires sitting down and spending over 30 minutes专门 (specifically) to record a day. This creates fear and burden around daily recording, which is not good.
2.  Usually, I only want to start recording a day when it's truly over. But thinking carefully, this is somewhat anti-human, because I now usually go to bed quickly when it's time to sleep, not because everything I wanted to do is truly finished (does that ever really happen?). This leads to not recording when there's time, and when it's time to record, I need to quickly get into bed, compounded by issue 1.

The combination leads to accumulation.

<a id="org1c7254e"></a>

#### What was done today:

> Correction: What was done in the past few days?

1.  Started using Neovim, recommended by SC. Why? I saw nvim-orgmode似乎 (seems to) have truly become a usable org-mode替代品 (alternative). Simultaneously, I'm starting to feel厌烦 (annoyed) with Emacs:
    - Endless update failures.
    - Confusing debugging and error reporting.
    - Flexibility that adds burden but is useless to me.
    - I don't understand Emacs Lisp and don't want to.

    For years, I've endured the above to use org-mode, but nowhere else allowed me to use org-mode properly. Now the nvim camp似乎 (seems to) have a viable alternative, so why not try?

    As a long-time Vim user, even in Emacs I used evil-mode (vim-mode), so I never felt using Vim would be a big burden. I can't survive in VSCode or IntelliJ IDEA without Vim mode, so using nvim directly is no problem for me.

    With that barrier gone,考察 (examining) nvim's ecosystem, I found that nvim, without the historical baggage of Vimscript, directly uses Lua as its configuration and plugin language. So it can move forward lightly, and the community is very active. I see now neovim's plugin system has also been unified by a system called `lazy.vim`. Nvim's design for its plugin and configuration system seems to be an organized, planned bold innovation specifically targeting Vim's original pain points. In Vim & Emacs, there are probably countless similar attempts to unify the江湖 (scene), but due to a fragmented community, none truly succeeded.

    So I directly tried lazyVim. Wow, now I feel I directly have a VSCode, and this VSCode can run in the terminal. Do you know how awesome that is?

    Now I have a powerful Old One based on全新基建 (completely new infrastructure), and it's巨简单 (extremely simple) to configure. Flexibility and convenience are收敛 (converged)恰到好处 (just right). My old pain points are basically all solved.

    I spent almost no time switching a significant part of my workflow to this. I now use tmux to open 5 windows, each running nvim in a different folder. In nvim,左边 (left) is the directory tree,中间 (middle) is code,右边 (right) is opencode and terminal.

2.  Updated a version of legion. I大幅降低 (significantly reduced) the text volume of the legionmind skill (from 4k lines down). Currently using it, it feels like there are fewer things requiring my操心 (attention), but not sure if it's because I've been using smarter models lately or because this version of legionmind actually became smarter.

3.  Set up an openclaw. Minimax 2.1 is still a bit dumb, but as a personal assistant, I think openclaw is quite capable, because it's basically a ChatGPT with memory + hands and feet (can operate my computer).

4.  Added http-proxy functionality to Yuan, added metrics, etc.

<a id="orgb6eb713"></a>

#### What are the thoughts

Sometimes I feel using AI to write things is a bit like debugging code whose原理 (principles) I don't fully understand—constantly testing its behavior or printing logs to assist debugging, tweaking here and there until finally getting a satisfactory result. Exploring the origin of this feeling:

Using AI to write code,究其过程 (investigating the process), involves humans inputting a prompt containing specific instructions, hoping the AI can understand the隐含指令 (implicit instructions) and information behind them and correctly complete the work.

The instructions we hope to convey to the AI can be layered: the top layer is the instruction for the current task. Below that are technical decisions made for this software project, best practices总结出来 (summarized) after权衡利弊 (weighing pros and cons) applicable to局部 (parts of) the project. The next layer is background information about the problem domain the project aims to solve. Further down is the software engineering professional background knowledge of the person using AI, their personal preferences, technical biases, style preferences, historical experience,积淀 (accumulation) of思维方式 (thinking patterns). The bottom layer is the world's background knowledge.

In a single conversation with AI, what can be made clear to the AI is only the instruction for the current task, then hoping the AI possesses sufficient world background knowledge and the background information needed to solve the problem.

Therefore, it can be inferred that if a task's context is sufficiently small, the given instructions are crystal clear, and there's little historical baggage, the AI should be able to complete the task with high quality easily. If there's a lot of implicit background information, it容易搞出一些莫名其妙的活 (easily produces some inexplicable work).

What Legionmind aims to do is let the AI itself accumulate background knowledge and best practices related to this project and problem domain. This requires the AI to either have good logical thinking ability and memory (context capacity), or possess ample world background knowledge. Beyond these, it can't be saved.

---

Also, I feel nvim is相见恨晚 (regret not meeting sooner).

<a id="org896307c"></a>

#### What is planned for tomorrow

Tomorrow visiting SC's new home, then playing board games together,顺便 (顺便) helping SY look at滑雪装备 (skiing equipment).

<a id="org71706c0"></a>

### 2026-02-01

Went to冷山 (Cold Mountain) to look at ski boots for SY. Measured foot length (245) and found a comfortable pair. Unfortunately, the nice colors at冷山 (Cold Mountain) were out of stock, so SY has to buy online.

Had lunch at SC's place, ate the meal he prepared. He has a sous-vide device for steak; the steak cooked with it was really tender. SC prepared a room tour puzzle for us. There were two clues. The first clue required finding 4 English words/sentences in 4 places,拼出 (拼出) a word using a numbered code—it was "Three." The second clue was obtained from an environmental puzzle, finally getting numbers 31 / 13 (I can't remember clearly), which allowed getting a chocolate from a drawer with many numbered small boxes.

Unfortunately, he had no chocolate left; we got a cute sticker.

---

The board game session in the afternoon was even more interesting. The highlight was, of course,领国者 (The King's Dilemma?). Finally, SC, playing the middle class, achieved an unprecedented victory—the first time the middle class won in our plays of this game. PGW, playing the资产阶级 (bourgeoisie), was furious because小耗子 (Xiao Haozi?), playing the government, didn't help him on two crucial policy reform votes. I played the工人阶级 (working class), naturally having little common interest with the bourgeoisie on most issues,爱莫能助 (unable to help). In fact, at game end, the scores of the three of us except PGW were very close. A world where only the capitalist got hurt was achieved.

This game is really fun and has become my favorite board game. It has considerable depth; each of the four players has vastly different playstyles. Playing a different role each time is a completely different experience. This time, as the working class, for the first time, I had surplus unemployed人口 (population) (because neither government nor bourgeoisie wanted to open new companies), reaching the condition to发动工人示威暴动 (initiate worker demonstration/riot). The working class took to the streets, threatening to turn the country upside down. The具体作用 (specific effect) was to gain influence dice and deduct (unemployed population - 2 + number of unions) points from other classes combined.

Sure enough, whereas in the past the working class needed to算计着 (calculate) and恳求 (plead) with the bourgeoisie and government to open new companies, now they争先恐后 (scrambled) to open new companies, revitalizing the game. In the end, I took second place with a high score of 101.

<a id="org28106d7"></a>

### 2026-02-02

After exercising today, let myself空 (empty), did nothing.

<a id="orgf8b0675"></a>

#### What is planned for tomorrow?

1.  Get all http proxy related things working, fix up the cluster.
2.  Get org-mode.nvim working properly.
3.  Research中转站 (relay stations / hubs).