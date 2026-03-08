---
title: Legion's Evolution: From Task Tracker to Multi-Agent Engineering Operating System
date: March 8, 2026
---

## Prologue

This document attempts to answer a specific question: How did we go from "starting with almost nothing" to gradually using Legion as the relatively mature multi-agent engineering collaboration system it is today?

The material here comes mainly from three parts:

-   The git history of `.legion/`
-   The state and audit logs of `.legion/config.json` and `.legion/ledger.csv`
-   The thinking framework already explicitly laid out in the blog post "[Thoughts on AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)"

If we had to summarize this trajectory in one sentence, it would be:

> We initially just wanted the Agent to help us get more things done; later, we realized that what truly needed to be built was not "stronger coding ability," but an entire engineering system that enables "less interruption, more output, verifiability, and handover capability." Legion grew from a task tracker, step by step, into a multi-agent engineering operating system during this process.

---

## I. First, Look at the Present: What Legion Already Is

Let's not start from the beginning; let's look at its current form first.

Judging from the repository's current state, Legion is no longer scattered documentation but a continuously running workflow system:

-   `.legion/config.json` already contains 33 task entries.
-   The status distribution is roughly: 9 `archived`, 22 `paused`, 2 `active`.
-   `.legion/ledger.csv` has accumulated 2339 audit records.
-   High-frequency actions include: `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
-   The current task creation policy is `agent-with-approval`, meaning an Agent can only propose a task first; it cannot create one directly and must receive explicit approval.

These facts combined indicate that Legion now possesses several layers of stable capabilities:

1.  **Task Persistence**: Tasks, context, and progress are stored externally, not just living in a session.
2.  **Design Gatekeeping**: Complex tasks cannot be started directly; they require a proposal, plan, or RFC first before entering execution.
3.  **Review Loop Closure**: Comments are not chat logs but structured review items with status.
4.  **Evidence Chain Artifacts**: Many tasks now have more than just `plan/context/tasks`; they also generate `rfc`, `review-code`, `review-security`, `report-walkthrough`, `pr-body`.
5.  **Audit and Governance**: The system knows who made what decision, advanced which stage, and responded to which review, and when.

This is already highly consistent with the pipeline described in the blog post:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

In other words, today's Legion is no longer a "note-taking system for assisting with coding" but a "protocol layer that constrains how multiple Agents work."

---

## II. The Starting Point: First, Move Tasks Out of Your Head

Legion's starting point was very simple.

From the git history, `.legion` first entered the repository on a large scale with `implement-quote-service` on 2025-12-15. This commit introduced simultaneously:

-   `.legion/config.json`
-   `.legion/ledger.csv`
-   `.legion/tasks/implement-quote-service/plan.md`
-   `.legion/tasks/implement-quote-service/context.md`
-   `.legion/tasks/implement-quote-service/tasks.md`

This starting point is crucial because it established Legion's minimal three-piece set:

### 1. `plan.md`

Responsible for answering "what to do."

In `implement-quote-service`, `plan.md` was no longer a simple to-do item but a relatively complete document covering:

-   Goal
-   Background & Motivation
-   Non-Goals
-   Scope
-   Phase Planning
-   Contract Summary
-   Per-Vendor Design

In other words, from the start, it wasn't a "Todo List" but a lightweight design document.

### 2. `context.md`

Responsible for answering "what happened and why it was done this way."

At this stage, the most obvious value of `context.md` was:

-   Recording key files
-   Recording key decisions
-   Recording verification results
-   Providing quick handover

It essentially replaced "the things I just figured out in my head."

### 3. `tasks.md`

Responsible for answering "where are we now."

This step is important because once multi-agent or multi-session work begins, the first thing to become distorted is often not the code, but the progress status.

As mentioned in the blog, a person can only stably maintain two or three contexts per day; beyond that, scheduling fails. Legion's first step essentially offloaded "task state" from the human brain.

So, Legion at the starting stage can be understood as:

> First, ensure tasks aren't lost; ensure context can be restored; ensure Agents don't suffer from amnesia after finishing.

This aligns perfectly with the need described in the blog: "offload context from the brain."

---

## III. First Evolution: From Task Tracking to Externalizing Implicit Knowledge

If the first stage solved "don't forget what you're doing," the second stage solved what the blog called the "implicit knowledge wall."

### 1. Tasks Became More Complex, Reviews Started Appearing in Large Numbers

From mid-to-late December 2025, Legion's plan documents began to contain numerous `> [REVIEW]` blocks.

Typical tasks include:

-   `yuantsexchange-ohlcinterestrate`
-   `vendors-ingest-ohlc-interest-rate`
-   `task-vex-queryquotes-swr`
-   `task-vex-quote-upstream-refactor`
-   `vex-series-data-ohlcinterestrate-ohlc-v2`

The common characteristics of these tasks are:

-   They were not simply "copying from a template."
-   They involved old implementations, evolution history, style preferences, and local best practices.
-   What truly determined success or failure was not syntactic ability, but "knowing what to inherit and what not to inherit."

For example, in the review for `vex-series-data-ohlcinterestrate-ohlc-v2`, you can see a very typical process of "making implicit knowledge explicit":

-   This part should not reference the existing implementation because it has issues.
-   Initially, it was thought VEX didn't need complex rate limiting, but later it was re-evaluated, concluding that certain rate-limiting strategies should still be retained.
-   Rules for `series_id` encoding, merge semantics, queue fairness, etc., were not "world knowledge" the model could naturally infer from the code but local knowledge that evolved within the project.

This corresponds exactly to the layering in the blog:

-   Layer 1 is the current task instruction;
-   Layer 2 is project technical decisions and local best practices;
-   The layer most likely to trip up Agents is Layer 2.

Legion's role at this stage was to forcibly write out Layer 2.

### 2. Comments Were No Longer Just Comments, But Collaboration Interfaces

Another crucial change in this phase: comments gradually evolved from "temporary remarks" into structured inputs that could be closed.

For example:

-   Some reviews directly changed the design direction.
-   Some required adding failure semantics.
-   Some required removing over-engineering.
-   Some required not referencing existing erroneous implementations.

If this content only existed in chat logs, the next Agent would almost certainly lose it; once recorded in `plan.md` or `context.md`, it transformed from "verbal knowledge" into "part of the task's truth."

Therefore, Legion in the second stage was essentially no longer just a task tracker but began to serve as an **external brain**.

This step is very important because it corresponds to a core turning point in your blog:

> An external brain is not a nice-to-have but a necessity for complex projects.

---

## IV. Second Evolution: From External Brain to Design Gatekeeping

As tasks became more complex, simply "writing down knowledge" was no longer sufficient. The new problem became:

> What if multiple Agents start working together, but the direction itself is wrong?

This is when Legion entered its third stage: upgrading from a "recording system" to a "design gatekeeping system."

### 1. RFCs and Specs Entered the Main Workflow

A key turning point was `http-proxy-service`.

In this task, Legion was clearly no longer "do first, record later," but "design first, review first, pass the gate first, then execute."

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
3.  **Review**: Exposing directional issues as much as possible before starting work
4.  **Implementation & Verification**: Moving low-cost checks forward
5.  **Reporting & PR Artifacts**: Serving acceptance

This is highly consistent with the "intent alignment + layered verification" mentioned in the blog.

### 2. Security and Resource Issues Began to Appear as Pre-Blocking Items

In tasks like `http-proxy-service` and `http-proxy-app-implementation`, reviews were no longer just suggestions; they directly contained `blocking` items.

For example:

-   SSRF risk
-   DoS risk
-   Unbounded response body size
-   Concurrency and queueing parameters not secure-by-default
-   Unclear environment variable configuration boundaries

This indicates Legion began to take on a new responsibility:

> Not only recording "why it was done this way," but also recording "why it cannot be done now unless these conditions are met first."

This is design gatekeeping.

The blog mentioned that when multi-agent systems start failing, the human instinct is often to write longer RFCs, conduct stricter reviews, and push risks to the very front. During this period, Legion institutionalized this instinct.

### 3. It Started to Resemble a Small Production Pipeline

By this stage, Legion's role was no longer "helping to remember" but "helping to constrain the order of work."

Corresponding to the pipeline in the blog:

-   `Intent`: User goals, non-goals, constraints
-   `Plan`: Task breakdown, milestones, boundaries
-   `Execute`: Implementation
-   `Verify`: build / test / benchmark / review
-   `Report`: walkthrough / PR body
-   `Memory`: context / decision log / archived task

This step is crucial because it means:

> Legion no longer just carries context; it begins to carry the process.

---

## V. Milestone: The HTTP Proxy Series Truly Engineered Legion

If previous stages still had an experimental feel of "growing while doing," then the `http-proxy` related tasks essentially became the first major milestone of Legion's true maturity.

This aligns with the description in the blog: you explicitly mentioned that the cross-project `http-proxy` task was a point where you felt "I can basically step away from coding, leaving only a small number of review comments."

Looking at `.legion`, this judgment has ample evidence.

### 1. It Wasn't a Single Task, But a Task Cluster

Related tasks included at least:

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

In other words, Legion began to support genuine **cross-task, cross-package, cross-phase evolution**.

### 2. The Review Cycle Became Significantly Longer, But Also More Stable

Especially `http-proxy-app-implementation`, which is very illustrative of Legion's maturity:

-   On one hand, there were many reviews and many points of contention;
-   On the other hand, these disputes didn't remain in chat logs but became RFC updates, review conclusions, and context decisions.

In this task, you can see very typical engineering debates:

-   Does `allowedHosts` affect request behavior or only metrics?
-   Must `absolute-form` be the only supported path format?
-   How are the boundaries between `invalid_url`, `blocked`, and `error` defined?
-   How to control the high-cardinality risk of `target_host` / `target_path`?

These aren't problems that "coding ability" can directly solve; they are problems of **specification boundaries, verification boundaries, and semantic boundaries**.

Legion's value here isn't helping to write code but helping to stabilize these boundaries.

### 3. It Began Generating Artifacts Truly Usable for Acceptance

This step also corresponds to the blog's point: "The reporting interface is an underestimated engineering problem."

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

This is also a particularly important judgment in the blog: the most expensive cost isn't tokens, but rework and attention leakage.

As long as the reporting interface isn't engineered, people still have to spend significant effort guessing what the Agent actually did. Legion, during this period, was clearly proactively solving this problem.

---

## VI. Maturity: From Engineering Pipeline to Governance System

Looking further, Legion's maturity isn't just reflected in "more documentation," but in the **governance structure** beginning to solidify.

### 1. Task Creation Began to Be Constrained by Approval Policies

The current `taskCreationPolicy` in `.legion/config.json` is `agent-with-approval`.

This step is very symbolic.

It means Legion began acknowledging a fact:

> Not all complex tasks should be decided by the Agent itself regarding when to create or advance them.

Behind this lies the deeper problem mentioned in the blog:

-   As models become stronger, should the process delegate more authority?
-   If delegating, where are the boundaries?
-   What must go through human approval first, and what can proceed automatically?

Legion's answer isn't full autonomy, but **controlled autonomy**.

That is:

-   Agents can explore, organize, and propose;
-   But before complex work enters formal execution, it still requires human approval.

This is already very close to how a real organization works.

### 2. Reviews Are No Longer Just Suggestions, But Stateful Collaboration Protocols

From ledger statistics, `legion_list_reviews` and `legion_respond_review` have accumulated a large number of records.

This indicates that reviews in Legion are not a secondary capability but a primary one.

More importantly, it's not just "reading a comment," but:

-   Listing unresolved items
-   Responding to a specific review
-   Marking as resolved / wontfix / need-info
-   Confirming review closure

This is very different from ordinary markdown annotations. It transforms "comments" from text into a trackable state machine.

The significance of this step is:

> Communication between humans and Agents is no longer just session messages but protocol actions that can be沉淀 (precipitated), tracked, and audited.

### 3. It Began Carrying "Risk Acceptance," Not Just "Problem Fixing"

Another sign of a mature system isn't "all risks are resolved," but "the system can distinguish which risks to solve now and which to accept now."

In tasks like `http-proxy-app-implementation` and `vendor-tokenbucket-proxy-ip`, we can already see:

-   Some security issues were marked as `wontfix` after review.
-   Some risks were explicitly recorded as accepted by the user.
-   Some behaviors were retained as residual risk, not vaguely forgotten.

This shows Legion is no longer just a "tool for fixing bugs" but has begun to carry the reality of engineering decisions:

-   Some problems must be fixed immediately.
-   Some problems are recorded first, governed later.
-   Some problems are covered by current environmental assumptions.

This is governance.

---

## VII. The Current Highest Maturity Example: `heavy-rfc`

If we had to pick one existing task that best represents Legion's current maturity, I would choose `heavy-rfc`.

This task can almost be seen as a complete paradigm sample of Legion's current workflow.

### 1. It Started with Risk Classification and Phase Declaration

It didn't simply write "implement live trading"; it explicitly stated from the beginning:

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

This artifact chain itself shows that Legion has already broken down a high-risk engineering task into multiple reviewable, verifiable, and handover-ready layers.

### 3. It Embodies the "Converge Intent First, Then Execute" Work Style from the Blog

The blog has a very core judgment:

> Autonomy isn't just about being smart; it's about less interruption, more output, verifiability.

`heavy-rfc`恰好体现了这一点:

-   First, lock down the direction through design documents and reviews.
-   Then, lower implementation risk through testing and reviews.
-   Finally, reduce acceptance cost through reports / PR bodies.

This means Legion, by now, can support a new working posture:

> Humans mainly set goals, define boundaries, and handle key reviews; Agents are responsible for advancing implementation, verification, and reporting within institutionalized tracks.

This is precisely the identity shift mentioned at the end of your blog: from executor to reviewer, decision-maker, and system iterater.

---

## VIII. Viewing Maturity Upgrade Through Task "Degree and Scope"

Looking at all tasks together, Legion's maturity isn't just about increased process complexity but is reflected in the upgrade of the task types themselves.

### 1. Early Stage: Single-Point Implementation Tasks

Representative: `implement-quote-service`

Characteristics:

-   Single theme
-   Relatively clear boundaries
-   Documentation mainly serves understanding and handover
-   Legion mainly serves as task tracking

### 2. Middle Stage: Design-Contestation Tasks

Representative: `vex-series-data-ohlcinterestrate-ohlc-v2`, `yuantsexchange-ohlcinterestrate`

Characteristics:

-   Span multiple modules
-   Involve significant historical baggage and local best practices
-   Dense comments / reviews
-   Legion mainly serves to externalize implicit knowledge

### 3. Milestone Stage: Cross-Project Engineering Tasks

Representative: `http-proxy-*` series

Characteristics:

-   Cross-package
-   Have RFC / spec / benchmark / security review
-   Have rollout, observability, rollback, reporting
-   Legion mainly serves as a complete engineering pipeline

### 4. Current Stage: High-Risk Governance Tasks

Representative: `heavy-rfc`

Characteristics:

-   Clear risk classification
-   Clear approval gatekeeping
-   Clear review loop closure
-   Complete documentation and evidence chain
-   Legion mainly serves governance and delivery protocols

In other words, the "degree and scope" of the tasks themselves are a mirror of Legion's maturity.

Initially, it only handled "implementing a feature"; later, it began handling "executing a type of complex engineering"; now, it is already handling "how to advance high-risk work in a controlled manner."

---

## IX. How This Trajectory Corresponds to the Thinking in the Blog

Looking back at "[Thoughts on AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)," we find that many judgments written in the blog have already been implemented in Legion's history.

### 1. "The Initial Sweet Spot of Scale"

The blog wrote: Having multiple Agents advance tasks in parallel gives a short-term feeling of mechanical harvesting.

In Legion's history, this corresponds to the rapid growth of tasks starting in December 2025:

-   quote service
-   quote routing
-   SWR
-   scheduler
-   OHLC / interest rate
-   token bucket

This shows the initial core goal was indeed: **First, let the Agent do more work.**

### 2. "The Bottleneck Was Myself"

The blog said that after offloading execution work to Agents, the human bottleneck truly became context management, acceptance, and decision-making.

Legion's earliest three-piece set恰好 solved this:

-   Use `tasks.md` to reduce context loss.
-   Use `context.md` to record decisions and key files.
-   Use `plan.md` to prevent task goals from drifting.

### 3. "The Implicit Knowledge Wall"

The blog said Agents often learn from visible samples but don't know what the current standard is.

Legion's response was:

-   Write reviews into the plan.
-   Write constraints into the context.
-   Write design disputes into structured documents.

That is: externalize implicit knowledge.

### 4. "Intent Alignment + Layered Verification"

The blog's pipeline has been almost exactly implemented in `http-proxy` and `heavy-rfc`:

-   Intent: Goal / Non-goals / Scope
-   Plan: Phase / RFC / Design Summary
-   Execute: Implementation
-   Verify: test / review-code / review-security / bench
-   Report: walkthrough / pr-body
-   Memory: context / archived task / ledger

### 5. "The Reporting Interface is an Underestimated Engineering Problem"

The blog emphasized that conclusions should尽量绑定 artifact.

Legion's practice has clearly moved in this direction:

-   Conclusions aren't just a sentence; they correspond to reports, reviews, test-reports, PR bodies.
-   Humans don't need to re-read all the code; they can first read the condensed artifacts.

Although it's not yet the Citation Agent you envisioned, the direction is very clear.

### 6. "Benchmarking Will Become a Necessity"

The blog said that in the future, we must be able to compare different workflows or model versions, not rely on feelings.

This has already seen early implementation in Legion:

-   `spec-bench.md`
-   Benchmark scenarios and thresholds
-   Benchmark output and reports

In other words, this path is no longer just an idea; it's starting to be engineered.

---

## X. The Most Important Change: Legion Changed Not Only Agents, But Also the Human Role

On the surface, Legion's growth seems to be:

-   More documentation
-   More reviews
-   Longer processes

But the truly critical change isn't these; it's that **the human-machine division of labor has been redefined.**

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

This is exactly the concluding sentence of the blog:

> What I'm doing now isn't "using AI to write more code," but "using AI to scale myself up."

Legion is the engineering implementation of this goal.

It transformed "scaling myself up" from an abstract wish into a collaboration structure that can be implemented, audited, reviewed, and continuously optimized.

---

## XI. Final Summary: How Legion Grew Step by Step

Compressing the entire trajectory yields a clear five-stage theory.

### Stage 1: First, Don't Forget Things

First, use `plan/context/tasks` to offload tasks, progress, and handover from the brain.

### Stage 2: Write Out Implicit Knowledge

Through `REVIEW`, decision logs, and context records, externalize the project's internal local knowledge to reduce the probability of Agents failing by fitting old samples.

### Stage 3: Design First, Execute Later

Through RFCs, Specs, and Reviews, solidify design gatekeeping, pushing high-cost rework forward.

### Stage 4: Engineer Verification and Reporting

Through test, bench, review-code, review-security, walkthrough, and PR body, make verification and acceptance low-cost.

### Stage 5: Turn Autonomy into Controlled Autonomy

Through proposal, approval, review status, and ledger auditing, advance multi-agent collaboration from "can run" to "governable."

Therefore, the final conclusion isn't "Legion made Agents stronger," but:

> Legion enabled Agent capabilities to be used stably as an engineering system for the first time.

It's not a point efficiency tool but a system that gradually grew around "less interruption, more output, verifiability, handover capability, and less wear and tear."

This is also why its growth trajectory can almost directly serve as the engineering footnote to that blog post:

-   The blog wrote the principles;
-   Legion's history shows how these principles became institutions, documents, processes, and artifacts.

Together, they form the complete story.

---

## Appendix: Several Tasks That Can Serve as Milestone Observation Points

To quickly review Legion's evolution, I would prioritize these tasks:

1.  `implement-quote-service`
    -   The starting sample of Legion
    -   The earliest formation of the three-piece set

2.  `vex-series-data-ohlcinterestrate-ohlc-v2`
    -   Most typical example of externalizing implicit knowledge
    -   Extremely high density of reviews/comments

3.  `http-proxy-service`
    -   Design gatekeeping and spec-ification began to take shape

4.  `http-proxy-app-implementation`
    -   Very complete in adversarial review, semantic boundaries, risk acceptance, and artifact production

5.  `vendor-tokenbucket-proxy-ip`
    -   A complete chain of multi-round RFC adversarial review -> implementation -> verification -> PR -> external review fixes

6.  `heavy-rfc`
    -   The current highest maturity sample
    -   Very complete in risk classification, design-only, review loop closure, and delivery artifacts

If `implement-quote-service` represents "Legion was born," then `http-proxy-*` represents "Legion grew up," and `heavy-rfc` represents "Legion has already started working like a mature system."