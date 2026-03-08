---
title: The Evolution of Legion: From Task Tracker to Multi-Agent Engineering Operating System
date: 2026-03-08
---

## Prologue

This document attempts to answer a specific question: How did we go from "starting with almost nothing" to gradually using Legion as the relatively mature multi-agent engineering collaboration system it is today?

The material here primarily comes from three sources:

-   The git history of `.legion/`
-   The state and audit logs of `.legion/config.json` and `.legion/ledger.csv`
-   The explicit thinking framework laid out in the blog post "[Thoughts on AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)"

If I had to summarize this trajectory in one sentence, it would be:

> We initially just wanted the Agent to help us get more things done; later, we realized that what truly needed to be built was not "stronger coding ability," but an entire engineering system that enables "Agents to be less disruptive, more productive, verifiable, and handover-ready." Legion grew from a task tracker into a multi-agent engineering operating system through this process.

---

## I. First, Look at the Present: What Legion Already Is

Let's not start from the beginning. First, look at its current form.
Judging from the repository's current state, Legion is no longer scattered documentation but a continuously running workflow system:

-   There are 33 task entries in `.legion/config.json`.
-   The status distribution is roughly: 9 `archived`, 22 `paused`, 2 `active`.
-   There are 2339 cumulative audit records in `.legion/ledger.csv`.
-   High-frequency actions include: `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
-   The current task creation policy is `agent-with-approval`, meaning an Agent can only propose a task first; it cannot create one directly and must receive explicit approval.

These facts together indicate that Legion now possesses several layers of stable capabilities:

1.  **Task Persistence**: Tasks, context, and progress are stored externally, not just living within a session.
2.  **Design Gating**: Complex tasks cannot be started directly; they require a proposal, plan, or RFC first before entering execution.
3.  **Review Loop Closure**: Comments are not chat logs but structured review items with status.
4.  **Evidence Chain Artifacts**: Many tasks now have more than just `plan/context/tasks`; they also generate `rfc`, `review-code`, `review-security`, `report-walkthrough`, `pr-body`.
5.  **Audit and Governance**: The system knows who made what decision, advanced which stage, and responded to which review, and when.

This is already highly consistent with the pipeline described in the blog:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

In other words, today's Legion is no longer a "note-taking system for assisting with coding" but a "protocol layer that governs how multiple Agents work."

---

## II. The Starting Point: First, Move Tasks Out of Your Head

Legion's starting point was very simple.

Looking at the git history, `.legion` first entered the repository on a large scale with `implement-quote-service` on 2025-12-15. This commit introduced:

-   `.legion/config.json`
-   `.legion/ledger.csv`
-   `.legion/tasks/implement-quote-service/plan.md`
-   `.legion/tasks/implement-quote-service/context.md`
-   `.legion/tasks/implement-quote-service/tasks.md`

This starting point is crucial because it established Legion's minimal three core components:

### 1. `plan.md`

Responsible for answering "what needs to be done."

In `implement-quote-service`, `plan.md` was not just a simple TODO but a relatively complete document covering:

-   Goal
-   Background & Motivation
-   Non-goals
-   Scope
-   Phase Planning
-   Contract Summary
-   Per-vendor Design

In other words, from the start, it wasn't a "Todo List" but a lightweight design document.

### 2. `context.md`

Responsible for answering "what happened and why it was done this way."

At this stage, the most obvious value of `context.md` was:

-   Recording key files
-   Recording key decisions
-   Recording verification results
-   Facilitating quick handover

It essentially replaced "the things I just figured out in my head."

### 3. `tasks.md`

Responsible for answering "where are we now."

This step is important because once multi-agent or multi-session work begins, the first thing to become distorted is often not the code but the progress state.

The blog mentions that a person can only stably maintain two or three contexts per day; beyond that, scheduling fails. Legion's first step essentially offloaded "task state" from the human brain.

So, Legion at this starting stage can be understood as:

> First, ensure tasks aren't lost; ensure context can be restored; ensure Agents don't suffer from amnesia after finishing.

This aligns perfectly with the blog's need to "offload context from the brain."

---

## III. First Evolution: From Task Tracking to Externalizing Implicit Knowledge

If the first stage solved "don't forget what you're doing," the second stage solved what the blog calls the "wall of implicit knowledge."

### 1. Tasks Became More Complex, Reviews Started Appearing Frequently

From mid-to-late December 2025, `plan` documents in Legion began to contain many `> [REVIEW]` blocks.

Typical tasks include:

-   `yuantsexchange-ohlcinterestrate`
-   `vendors-ingest-ohlc-interest-rate`
-   `task-vex-queryquotes-swr`
-   `task-vex-quote-upstream-refactor`
-   `vex-series-data-ohlcinterestrate-ohlc-v2`

The common characteristics of these tasks are:

-   They weren't simple "copy from a template" jobs.
-   They involved legacy implementations, evolution history, style preferences, and local best practices.
-   What truly determined success or failure wasn't syntactic ability but "knowing what to inherit and what not to."

For example, in the reviews for `vex-series-data-ohlcinterestrate-ohlc-v2`, you can see a typical process of "making implicit knowledge explicit":

-   Don't reference the existing implementation here because it has issues.
-   Initially thought VEX didn't need complex rate limiting, but later re-evaluated and decided certain rate-limiting strategies should still be kept.
-   Rules for `series_id` encoding, merge semantics, queue fairness, etc., weren't "world knowledge" the model could naturally infer from the code but local knowledge that evolved within the project.

This corresponds to the layering in the blog:

-   Layer 1: The current task instructions.
-   Layer 2: Project technical decisions and local best practices.
-   The layer most likely to trip up Agents is Layer 2.

Legion's role at this stage was to forcibly write out Layer 2.

### 2. Comments Became More Than Just Comments; They Became Collaboration Interfaces

Another key change in this phase: comments were no longer just "temporary remarks" but gradually became structured inputs that could be closed.

For example:

-   Some reviews directly changed the design direction.
-   Some required adding failure semantics.
-   Some required removing over-engineering.
-   Some required not referencing existing flawed implementations.

If this content only existed in chat logs, the next Agent would almost certainly lose it. Once recorded in `plan.md` or `context.md`, it transformed from "verbal knowledge" into "part of the task's truth."

So, Legion in its second stage was no longer just a task tracker; it began to function as an **external brain**.

This step is crucial because it corresponds to a core turning point emphasized in my blog:

> An external brain isn't a nice-to-have; it's a necessity for complex projects.

---

## IV. Second Evolution: From External Brain to Design Gating

As tasks grew more complex, simply "writing down knowledge" was no longer enough. The new problem became:

> What if multiple Agents start working together, but the direction itself is wrong?

This is when Legion entered its third stage: evolving from a "recording system" to a "design gating system."

### 1. RFCs and Specs Entered the Main Workflow

A key turning point was `http-proxy-service`.

In this task, Legion clearly wasn't "do first, record later" but "design first, review first, pass the gate first, then execute."

This task featured:

-   `docs/rfc.md`
-   `docs/spec-dev.md`
-   `docs/spec-test.md`
-   `docs/spec-bench.md`
-   `docs/spec-obs.md`
-   Review conclusions
-   Security review blocking items
-   Walkthrough and PR body

This meant Legion began to break down a complex task into several stable layers:

1.  **RFC**: Intent alignment
2.  **Dev/Test/Bench/Obs Spec**: Clarifying "how to verify" upfront
3.  **Review**: Exposing directional issues before work begins
4.  **Implementation & Verification**: Moving low-cost checks forward
5.  **Reporting & PR Artifacts**: Serving acceptance

This aligns highly with the "intent alignment + layered verification" mentioned in the blog.

### 2. Security and Resource Issues Began Appearing as Pre-blocking Items

In tasks like `http-proxy-service` and `http-proxy-app-implementation`, reviews were no longer just suggestions; they directly contained `blocking` items.

For example:

-   SSRF risk
-   DoS risk
-   Unbounded response body size
-   Concurrency and queueing parameters not secure-by-default
-   Unclear environment variable configuration boundaries

This indicates Legion began taking on a new responsibility:

> Not only recording "why it was done this way" but also recording "why it can't be done now unless these conditions are met first."

This is design gating.

The blog says that when multi-agent systems start failing, the human instinct is often to write longer RFCs, conduct stricter reviews, and push risks to the very front. During this period, Legion institutionalized this instinct.

### 3. It Started Resembling a Small Production Pipeline

By this stage, Legion's role was no longer "helping to remember" but "helping to constrain the order of work."

Corresponding to the blog's pipeline:

-   `Intent`: User goals, non-goals, constraints
-   `Plan`: Task breakdown, milestones, boundaries
-   `Execute`: Implementation
-   `Verify`: build / test / benchmark / review
-   `Report`: walkthrough / PR body
-   `Memory`: context / decision log / archived task

This step is crucial because it means:

> Legion no longer just carries context; it begins to carry the process.

---

## V. Milestone: The HTTP Proxy Series Made Legion Truly Engineering-Oriented

If previous stages still had an experimental "grow as you go" feel, the `http-proxy` related tasks essentially became Legion's first true milestone of maturity.

This aligns with my description in the blog: the cross-project `http-proxy` tasks were indeed a point where I started to feel clearly, "I can basically step away from coding, leaving only a few review comments."

Looking at `.legion`, this judgment has solid evidence.

### 1. It Wasn't a Single Task, but a Task Cluster

Related tasks at least include:

-   `http-proxy-service`
-   `http-proxy-app-implementation`
-   `vendor-http-services-rollout`
-   `http-proxy-metrics`
-   `http-services-terminalinfos-ready`
-   `vendor-tokenbucket-proxy-ip`

This wasn't a point requirement but a series of interconnected engineering tasks:

-   Build the base library first
-   Then the application layer
-   Then rollout
-   Then add metrics
-   Then add routing / IP readiness
-   Then link with vendor-side rate limiting and load logic

In other words, Legion began supporting genuine **cross-task, cross-package, cross-phase evolution**.

### 2. The Review Cycle Became Significantly Longer, but Also More Stable

Especially `http-proxy-app-implementation`, which clearly demonstrates Legion's maturity:

-   On one hand, there were many reviews and many points of contention;
-   On the other hand, these disputes didn't remain in chat logs but became RFC updates, review conclusions, and context decisions.

This task shows very typical engineering debates:

-   Does `allowedHosts` affect request behavior or only metrics?
-   Must `absolute-form` be the only supported path?
-   How are the boundaries of `invalid_url`, `blocked`, `error` defined?
-   How to control the high-cardinality risk of `target_host` / `target_path`?

These aren't problems solvable by "coding ability" alone; they are problems of **specification boundaries, verification boundaries, and semantic boundaries**.

Legion's value here wasn't helping write code but helping stabilize these boundaries.

### 3. It Began Generating Artifacts Truly Usable for Acceptance

This step also corresponds to the blog's point that "the reporting interface is an underestimated engineering problem."

In the http-proxy series tasks, Legion stably generated:

-   RFC
-   review-rfc
-   review-code
-   review-security
-   report-walkthrough
-   pr-body
-   spec-test / spec-bench / spec-obs

This indicates Legion was no longer satisfied with "getting things done" but began supporting "explaining things clearly, attaching evidence, and stating risks."

In other words:

> At this point, Legion began truly serving "low-cost acceptance," not just "high-efficiency execution."

This is also a crucial judgment in the blog: the most expensive cost isn't tokens but rework and attention leakage.

As long as the reporting interface isn't engineered, people still have to spend significant effort guessing what the Agent actually did. Legion, during this period, was clearly actively solving this problem.

---

## VI. Maturity: From Engineering Pipeline to Governance System

Looking further, Legion's maturity isn't just reflected in "more and more documentation" but in the **governance structure** beginning to solidify.

### 1. Task Creation Began Being Constrained by Approval Policies

The current `taskCreationPolicy` in `.legion/config.json` is `agent-with-approval`.

This step is highly symbolic.

It means Legion began acknowledging a fact:

> Not all complex tasks should be decided by the Agent itself regarding when to create or advance them.

Behind this lies the deeper problem discussed in the blog:

-   As models get stronger, should processes delegate more authority?
-   If delegating, where are the boundaries?
-   What must go through human approval first, and what can proceed automatically?

Legion's answer isn't full autonomy but **controlled autonomy**.

That is:

-   Agents can explore, organize, and propose;
-   But complex work still requires human approval before entering formal execution.

This is very close to how a real organization works.

### 2. Reviews Became More Than Suggestions; They Became Stateful Collaboration Protocols

From ledger statistics, `legion_list_reviews` and `legion_respond_review` have accumulated many records.

This indicates reviews in Legion aren't a secondary capability but a primary one.

More importantly, it's not "reading a comment," but:

-   Listing unresolved items
-   Responding to a specific review
-   Marking as resolved / wontfix / need-info
-   Confirming review closure

This is very different from ordinary markdown annotations. It transforms "comments" from text into a trackable state machine.

The significance of this step is:

> Communication between humans and Agents is no longer just session messages but protocol actions that can be sedimented, tracked, and audited.

### 3. It Began Carrying "Risk Acceptance," Not Just "Problem Fixing"

Another sign of a mature system isn't "all risks are resolved" but "the system can distinguish which risks to solve now and which to accept now."

In tasks like `http-proxy-app-implementation` and `vendor-tokenbucket-proxy-ip`, you can see:

-   Some security issues were marked as `wontfix` after review.
-   Some risks were explicitly recorded as accepted by the user.
-   Some behaviors were retained as residual risk, not vaguely forgotten.

This shows Legion is no longer just a "tool for fixing bugs" but begins to carry the reality of engineering decisions:

-   Some problems must be fixed immediately.
-   Some problems are recorded first, governed later.
-   Some problems are covered by current environmental assumptions.

This is governance.

---

## VII. The Current Highest Maturity Example: `heavy-rfc`

If I had to pick one existing task that best represents Legion's current maturity, I'd choose `heavy-rfc`.

This task can almost be seen as a complete paradigm sample of Legion's current workflow.

### 1. It Started with Risk Grading and Stage Declaration

It didn't simply write "implement live trading"; it explicitly stated upfront:

-   `rfcProfile=heavy`
-   `stage=design-only`
-   `risk=high`

In other words, this task wasn't "implement first, document later," but first acknowledged it was a high-risk task, so it must go through the heavy RFC process first.

### 2. It Already Has a Complete Artifact Chain

`heavy-rfc` already contains:

-   `task-brief.md`
-   `research.md`
-   `rfc.md`
-   `review-rfc.md`
-   `test-report.md`
-   `review-code.md`
-   `review-security.md`
-   `report-walkthrough.md`
-   `pr-body.md`

This artifact chain itself shows that Legion has broken down a high-risk engineering task into multiple reviewable, verifiable, and handover-ready layers.

### 3. It Embodies the "Converge Intent First, Then Open Execution" Work Style from the Blog

The blog makes a very core judgment:

> Autonomy isn't just about being smart; it's about being less disruptive, more productive, and verifiable.

`heavy-rfc` perfectly embodies this:

-   First, lock down the direction through design documents and reviews.
-   Then, reduce implementation risk through testing and reviews.
-   Finally, lower acceptance cost through reports / PR bodies.

This means Legion, at this point, can support a new working posture:

> Humans primarily set goals, define boundaries, and handle key reviews; Agents are responsible for advancing implementation, verification, and reporting within institutionalized tracks.

This is precisely the identity shift summarized at the end of the blog: from executor to reviewer, decision-maker, and system iterator.

---

## VIII. Viewing Maturity Upgrade Through the "Degree and Scope" of Tasks

Looking at all tasks together, you'll find Legion's maturity isn't just about increased process complexity but also reflected in the upgrade of task types themselves.

### 1. Early Stage: Single-Point Implementation Tasks

Representative: `implement-quote-service`

Characteristics:

-   Single theme
-   Relatively clear boundaries
-   Documentation mainly serves understanding and handover
-   Legion primarily acts as a task tracker

### 2. Middle Stage: Design-Dispute Tasks

Representative: `vex-series-data-ohlcinterestrate-ohlc-v2`, `yuantsexchange-ohlcinterestrate`

Characteristics:

-   Span multiple modules
-   Involve significant legacy and local best practices
-   Dense comments / reviews
-   Legion primarily externalizes implicit knowledge

### 3. Milestone Stage: Cross-Project Engineering Tasks

Representative: `http-proxy-*` series

Characteristics:

-   Cross-package
-   Have RFC / spec / benchmark / security review
-   Have rollout, observability, rollback, reporting
-   Legion primarily provides a complete engineering pipeline

### 4. Current Stage: High-Risk Governance Tasks

Representative: `heavy-rfc`

Characteristics:

-   Explicit risk grading
-   Explicit approval gating
-   Explicit review loop closure
-   Complete documentation and evidence chain
-   Legion primarily provides governance and delivery protocols

In other words, the "degree and scope" of tasks themselves are a mirror of Legion's maturity.

Initially, it only handled "implementing a feature"; later, it began handling "executing a type of complex engineering"; now, it's already handling "how to advance high-risk work in a controlled manner."

---

## IX. How This Trajectory Corresponds to the Thinking in That Blog Post

Looking back at "[Thoughts on AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)," you'll find many judgments from the blog have already been implemented in Legion's history.

### 1. "The Initial Sweet Spot of Scale"

The blog wrote: Having multiple Agents advance tasks in parallel gives a brief feeling of mechanical harvesting.

In Legion's history, this corresponds to the rapid task growth starting in December 2025:

-   quote service
-   quote routing
-   SWR
-   scheduler
-   OHLC / interest rate
-   token bucket

This shows the initial core goal was indeed: **First, let the Agent do more work.**

### 2. "The Bottleneck Is Myself"

The blog said that after offloading execution to Agents, the human bottleneck becomes context management, acceptance, and decision-making.

Legion's earliest three components precisely address this:

-   Use `tasks.md` to reduce context loss.
-   Use `context.md` to record decisions and key files.
-   Use `plan.md` to keep task objectives from drifting.

### 3. "The Wall of Implicit Knowledge"

The blog said Agents learn from visible samples but don't know what the current standard is.

Legion's response was:

-   Write reviews into the plan.
-   Write constraints into the context.
-   Write design disputes into structured documents.

In other words: externalize implicit knowledge.

### 4. "Intent Alignment + Layered Verification"

The blog's pipeline is almost exactly implemented in `http-proxy` and `heavy-rfc`:

-   Intent: Goal / Non-goals / Scope
-   Plan: Phase / RFC / Design Summary
-   Execute: Implementation
-   Verify: test / review-code / review-security / bench
-   Report: walkthrough / pr-body
-   Memory: context / archived task / ledger

### 5. "The Reporting Interface Is an Underestimated Engineering Problem"

The blog emphasized that conclusions should be bound to artifacts as much as possible.

Legion's practice has clearly moved in this direction:

-   Conclusions aren't a single sentence but correspond to reports, reviews, test-reports, PR bodies.
-   Humans don't need to re-read all the code; they can first read the condensed artifacts.

Although it's not yet the Citation Agent I envisioned, the direction is clear.

### 6. "Benchmarking Will Become a Necessity"

The blog said that in the future, we must be able to compare different workflows or model versions, not rely on feelings.

Early implementations have already appeared in Legion:

-   `spec-bench.md`
-   Benchmark scenarios and thresholds
-   Benchmark output and reports

In other words, this path is no longer just an idea; it's starting to be engineered.

---

## X. The Most Important Change: Legion Changed Not Only Agents but Also the Human Role

On the surface, Legion's growth seems to be:

-   More documentation
-   More reviews
-   Longer processes

But the truly critical change isn't these; it's that **the human-machine division of labor has been redefined**.

Earlier, the human role was roughly:

-   Personally execute
-   Personally remember
-   Personally hold all context

As Legion gradually matured, the human role slowly became:

-   Set goals and constraints
-   Review design boundaries
-   Handle blocking-level reviews
-   Accept artifacts and risks
-   Iterate the entire collaboration system

This is the concluding sentence from the blog:

> What I'm doing now isn't "using AI to write more code" but "using AI to scale myself up."

Legion is the engineering implementation of this goal.

It transformed "scaling myself up" from an abstract wish into a collaboration structure that can be implemented, audited, reviewed, and continuously optimized.

---

## XI. Looking Ahead from the Present: The Latest Evolution Direction Represented by `~/Work/legion-mind`

If you only look at the `.legion/` history in the Yuan repository, you can see how Legion was forced out bit by bit in a real project. But if you look at the current `~/Work/legion-mind`, you'll find Legion has already started evolving into its next stage.

This step is very important because it shows Legion's goal is no longer just "being useful in one repository" but starting to distill this experience into a **installable, migratable, benchmarkable, reusable** general-purpose Autopilot Kit.

From `~/Work/legion-mind/README.md` and `docs/legionmind-usage.md`, the latest direction has at least five characteristics.

### 1. From "In-Repository Workflow" to "General Orchestration Template"

In Yuan, Legion initially grew out of specific tasks. In `legion-mind`, it has been explicitly abstracted into a set of general Agent orchestration templates:

-   primary agent: `legion`
-   subagents: `engineer`, `spec-rfc`, `review-rfc`, `review-code`, `review-security`, `run-tests`, `report-walkthrough`
-   skill: `skills/legionmind`

This shows the latest version of Legion no longer understands "multi-agent collaboration" as temporarily pulling a few agents to work but begins modeling it as:

-   The orchestrator is responsible for process advancement.
-   Subagents are responsible for single responsibilities.
-   `.legion/` is responsible for persistent state and auditing.

In other words, Legion is evolving from an "experiential workflow" to a "role-clear orchestration system."

### 2. From Manual Invocation to Command-Based Entry

One of the most obvious changes in `legion-mind` is the commandification of common workflows:

-   `/legion`
-   `/legion-impl`
-   `/legion-rfc-heavy`
-   `/legion-pr`
-   `/legion-bootstrap`
-   `/evolve`

This might seem like just a user experience optimization, but it's not.

It means Legion is further solidifying conventions like "which stages, in what order, when to only design, when to continue implementation, when to sediment experience" from implicit SOPs into explicit commands.

In other words, early Legion mainly constrained processes at the documentation layer. The current direction is to push the process itself one step further, solidifying it into an operational interface that can be directly triggered.

### 3. From Task Memory to Cross-Task Playbook

Legion in the Yuan repository could already persist the context of a single task. `legion-mind` takes another step forward: introducing `.legion/playbook.md` and `/evolve`.

This is crucial because it solves a different level of problem:

-   `plan/context/tasks` solves "how to resume this task."
-   `playbook` solves "how to avoid detours for this type of task in the future."

Currently, the `playbook` has started recording patterns like:

-   Benchmark output must remain within the repository.
-   Benchmarks must first fix a deterministic profile.
-   Missing summaries must be counted as errors in the denominator, not silently shrink the denominator.

This indicates Legion's latest memory model is no longer just task memory but starting to attempt **organizational memory**.

That is:

> Not only remember "where we left off last time" but also remember "how to do similar tasks more stably in the future."

### 4. From "Usable" to "Installable, Publishable, Migratable"

Another particularly noteworthy direction in `legion-mind`: it has started providing installation, verification, rollback, and safe overwrite strategies.

For example, the README already has:

-   `install`
-   `verify --strict`
-   `rollback`
-   `safe-overwrite`
-   managed files / backup index

This means Legion is evolving from "my own working method" to "a productized asset that others can also install and use."

This step is significant.

Because once entering the installation/publishing layer, Legion's design goals are no longer just serving myself but also considering:

-   How to synchronize assets safely.
-   How to avoid overwriting users' own modifications.
-   How to verify installation status.
-   How to rollback on failure.

This shows Legion's latest direction is no longer just the collaboration system itself but the **distribution and replication capability of the collaboration system**.

### 5. From Experience Summarization to Benchmark-Driven System Iteration

I wrote in the blog that one of the most important future tasks is to be able to scientifically compare different versions of workflows, not just say "this version feels smarter."

`legion-mind` has essentially formally initiated this.

The repository already has:

-   `docs/benchmark.md`
-   Benchmark baseline commands
-   benchmark-runs directory
-   Explicit preflight / smoke / full / score / report processes

This means Legion's next stage is no longer simply stacking more processes but starting to answer harder questions:

-   Which process is truly more stable?
-   Which design gate is more cost-effective?
-   Which agent orchestration performs better on pass@k and pass^k?
-   Which steps only add ceremony, and which steps truly reduce rework?

At this point, Legion's evolution goal is actually very clear:

> From "getting multi-agent systems to work" to "building multi-agent systems as a measurable, iterable, replicable engineering product."

### Summary: `legion-mind` Lets Me See Legion's Next Stage More Clearly

If the history of Legion in Yuan primarily answers "how was this thing forced out by real needs," then `legion-mind` answers another question:

> Since this thing has been forced out, can the next step turn it from project experience into a general system?

My current understanding of the latest direction can be summarized as follows:

1.  **Commandification**: Turn high-frequency processes into stable entry points, not organizing on the fly each time.
2.  **Role Specialization**: Clearly separate the responsibilities of orchestrator / subagent.
3.  **Playbook-ification**: Elevate cross-task experience from task memory to organizational memory.
4.  **Productization**: Make Legion installable, verifiable, rollback-able, not just existing within one repository.
5.  **Benchmark-ification**: Make Legion's iteration rely on baselines and scoring systems, not feelings.

In other words, Legion's latest evolution direction is no longer just "using Agents more maturely" but starting to make "how to use Agents in an engineering way" itself into a system that can continuously evolve.

---

## XII. Final Summary: How Legion Grew Step by Step

Compressing the entire trajectory yields a clear five-stage theory.

### Stage 1: First, Don't Forget Things

First, use `plan/context/tasks` to move tasks, progress, and handover out of your head.

### Stage 2: Write Out Implicit Knowledge

Through `REVIEW`, decision logs, and context records, externalize the project's internal local knowledge, reducing the probability of Agents failing by fitting old patterns.

### Stage 3: Design First, Execute Later

Through RFCs, Specs, and Reviews, solidify design gates, pushing high-cost rework forward.

### Stage 4: Engineer Verification and Reporting

Through test, bench, review-code, review-security, walkthrough, and PR body, make verification and acceptance low-cost.

### Stage 5: Turn Autonomy into Controlled Autonomy

Through proposal, approval, review status, and ledger auditing, advance multi-agent collaboration from "can run" to "governable."

So, the final conclusion isn't "Legion made Agents stronger," but:

> Legion enabled Agent capabilities to be used stably in an engineering system for the first time.

It's not a point efficiency tool but a system that gradually grew around "less disruption, more productivity, verifiability, handover readiness, and less wear and tear."

This is also why its growth trajectory can almost directly serve as the engineering footnote to that blog post:

-   The blog wrote the principles.
-   Legion's history shows how these principles became institutions, documents, processes, and artifacts.

Together, they form the complete story.

---

## Appendix: Several Tasks That Can Serve as Milestone Observation Points

If you want to quickly review Legion's evolution, I'd prioritize these tasks:

1.  `implement-quote-service`
    -   The starting sample of Legion.
    -   The three core components first took shape.

2.  `vex-series-data-ohlcinterestrate-ohlc-v2`
    -   Most typical example of externalizing implicit knowledge.
    -   Extremely high density of reviews/comments.

3.  `http-proxy-service`
    -   Design gating and spec-ification began to take shape.

4.  `http-proxy-app-implementation`
    -   Very complete in adversarial review, semantic boundaries, risk acceptance, and artifact production.

5.  `vendor-tokenbucket-proxy-ip`
    -   Complete chain: multi-round RFC adversarial review -> implementation -> verification -> PR -> external review fixes.

6.  `heavy-rfc`
    -   The current highest maturity sample.
    -   Very complete in risk grading, design-only, review closure, and delivery artifacts.

If `implement-quote-service` represents "Legion was born," then `http-proxy-*` represents "Legion grew up," and `heavy-rfc` represents "Legion has started working like a mature system."