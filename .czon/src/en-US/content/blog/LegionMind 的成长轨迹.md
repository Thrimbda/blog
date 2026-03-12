---
title: The Evolution of Legion: From Task Recorder to Multi-Agent Engineering Operating System
date: 2026-03-08
---

## Prologue

This document aims to answer a question I've been constantly reflecting on: How did I evolve Legion from a nearly empty idea into the relatively mature multi-agent engineering collaboration system it is today?

This analysis is primarily based on four types of materials:

-   The git history of the `.legion/` directory in the Yuan repository
-   The current state of `.legion/config.json` and `.legion/ledger.csv`
-   A batch of representative task, review, RFC, and report artifacts
-   The thinking framework I explicitly outlined in the blog post "[Thoughts on AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)"

If I had to give a one-sentence conclusion, it would be:

> Legion wasn't a fully designed system from the start. It was gradually forced into existence by real-world task pressures around "context management, implicit knowledge, design gates, verification costs, and reporting costs." It began simply to prevent Agent amnesia and gradually evolved into an engineering system that governs how multiple Agents work.

---

## I. First, The Present: What Has Legion Grown Into?

If we skip the origin story and look at its current state, Legion is clearly no longer a scattered collection of notes.

Judging from the current `.legion` state in the Yuan repository:

-   There are currently 34 tasks.
-   Status distribution is roughly: 9 `archived`, 23 `paused`, 2 `active`.
-   `.legion/ledger.csv` contains 2498 audit records.
-   The most common actions are `legion_update_context`, `legion_update_tasks`, `legion_get_status`, `legion_read_context`, `legion_list_reviews`, `legion_respond_review`.
-   The current task creation policy is [`agent-with-approval`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json), meaning complex tasks default to a proposal -> approval -> execution flow.

Looking at these together, Legion today possesses at least five stable capabilities:

1.  **Task Persistence**: Task objectives, context, and progress no longer live only in a session.
2.  **Design Gates**: Complex tasks cannot start directly; they require a plan, RFC, or proposal first.
3.  **Review Loop Closure**: Comments are not just chat; they are structured review items with states.
4.  **Artifact Evidence Chain**: Many tasks now consistently produce RFCs, reviews, test reports, walkthroughs, and PR bodies.
5.  **Audit & Governance**: The system knows when, who, made what decision, advanced which stage, or closed which review.

If we compress it into the pipeline from the blog, it already closely resembles:

`Intent -> Plan -> Execute -> Verify -> Report -> Memory`

In other words, today's Legion is no longer a "note-taking system for coding assistance" but a "protocol layer for multi-agent collaboration."

---

## II. Phase One: First, Move Tasks Out of Your Head

Legion's starting point was actually quite simple.

From the git history, the earliest instance of bringing `.legion` as an explicit workflow into the repository was [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md).

This initial batch established three crucial files:

-   [`plan.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md)
-   [`context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md)
-   [`tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/tasks.md)

These three files later became almost the skeleton of Legion.

### 1. `plan.md` Solves "What to Do"

In [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md), `plan.md` was no longer just a TODO item like "add quote service for all vendors." It clearly outlined:

-   Goal
-   Background & Motivation
-   Non-Goals
-   Scope
-   Phase Planning
-   Contract Summary
-   Per-Vendor Design

This step was crucial because it meant Legion, from the very beginning, was not just a simple Todo List but a lightweight design index.

### 2. `context.md` Solves "What Happened and Why"

[`implement-quote-service/context.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/context.md) already shows several core capabilities that Legion would later develop:

-   Recording key files
-   Recording key decisions
-   Recording verification results
-   Providing quick handover

In other words, `context.md` initially served as a "replacement for the things I just figured out in my head."

### 3. `tasks.md` Solves "Where Are We Now"

Once multi-agent or multi-session work begins, the first thing lost is often not the code, but the progress state.

The significance of `tasks.md` lies in:

-   Breaking down phases
-   Marking the current task
-   Adding newly discovered tasks
-   Allowing the next round of conversation to quickly resume context

Therefore, Legion's first phase essentially solved a very practical problem:

> Don't forget things first. Ensure tasks aren't lost, context can be restored, and Agents don't suffer from amnesia after finishing.

This aligns perfectly with the starting point I wrote about in the blog: when parallel work increases, the first thing to break down is actually a human's context-switching ability.

---

## III. Phase Two: From Task Recording to Externalizing Implicit Knowledge

If Phase One mainly solved "don't forget what you're doing," then Phase Two tackled the "wall of implicit knowledge" I specifically mentioned in the blog.

### 1. Complex Tasks Forced the Emergence of Review Mechanisms

Starting from mid-to-late December 2025, Legion's plan documents began to frequently include `> [REVIEW]` blocks. Typical tasks include:

-   [`yuantsexchange-ohlcinterestrate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/yuantsexchange-ohlcinterestrate/plan.md)
-   [`vendors-ingest-ohlc-interest-rate`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendors-ingest-ohlc-interest-rate/plan.md)
-   [`task-vex-queryquotes-swr`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-queryquotes-swr/plan.md)
-   [`task-vex-quote-upstream-refactor`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/task-vex-quote-upstream-refactor/plan.md)
-   [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md)

These tasks share a common characteristic:

-   They are no longer tasks that can be completed by simply "modifying based on existing patterns."
-   They involve old implementations, evolution history, local best practices, and many non-obvious constraints.
-   What truly determines the quality of the outcome is often not whether the model can write the code, but whether it knows what to inherit and what not to inherit.

For example, in tasks like [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md), the recurring themes in reviews are typical project-specific implicit knowledge:

-   Don't reference a certain existing implementation because it's flawed.
-   A constraint initially seemed unnecessary, but later re-evaluation found it couldn't be removed.
-   Things like coding rules, merge semantics, scheduling fairness, and rate-limiting strategies are not "world knowledge" the model can naturally learn from code; they are knowledge that grew within the project.

This corresponds exactly to the distinction I made in the blog:

-   Layer 1 is what the user said this time;
-   Layer 2 is the project's own technical decisions and local best practices;
-   The layer most likely to trip up Agents is precisely Layer 2.

Legion's role in this phase was to forcibly write out Layer 2.

### 2. Comments Evolved from "Chat" to "Interface"

The essence of this step is not that the number of comments increased, but that their nature changed.

Previously, comments were more like temporary dialogue. By this stage, comments began to take on these responsibilities:

-   Changing design direction
-   Adding failure semantics
-   Removing over-engineering
-   Pointing out which old implementations should not be referenced
-   Recording essential engineering constraints

Once these things were documented in `plan.md` or `context.md`, they were no longer verbal reminders but became part of the task's truth.

Therefore, Legion in Phase Two was essentially no longer just a task tracker; it was doing something more important:

> Externalizing implicit knowledge.

This is also why I became increasingly convinced later: an external brain is not a nice-to-have but a necessity for complex projects.

---

## IV. Phase Three: From External Brain to Design Gates

As tasks grew more complex, simply "writing down knowledge" was no longer enough. The new problem became:

> What if multiple Agents start running, but the direction itself is wrong?

This is when Legion entered its third phase: upgrading from a recording system to a design gate system.

### 1. RFCs and Specs Enter the Main Workflow

A typical turning point was [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md).

In this task, Legion was clearly no longer "do first, record later," but "design first, review first, pass the gate first, then execute."

This task already produced a complete set of design and verification artifacts:

-   [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/rfc.md)
-   [`spec-dev.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-dev.md)
-   [`spec-test.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-test.md)
-   [`spec-bench.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-bench.md)
-   [`spec-obs.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/docs/spec-obs.md)

This means Legion began to break down complex tasks into stable layers:

1.  **RFC**: Align intent first.
2.  **Dev/Test/Bench/Obs Spec**: Clarify how to verify upfront.
3.  **Review**: Expose directional issues before starting work as much as possible.
4.  **Implementation & Verification**: Move low-cost checks forward.
5.  **Report & PR Artifacts**: Serve acceptance, not just "finishing writing."

This is essentially the "intent alignment + layered verification" I discussed in the blog.

### 2. Security and Resource Issues Begin to Appear as Pre-Blocking Items

In tasks like [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md) and [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md), reviews were no longer just "suggestions"; they explicitly included `blocking` items.

Typical issues included:

-   SSRF risk
-   DoS risk
-   Unbounded response body size
-   Concurrency and queuing parameters not secure-by-default
-   Unclear environment variable boundaries

This step is important because Legion began to take on a new responsibility:

> Not just recording "why we did this," but also recording "why we can't do this now unless these conditions are met first."

This is precisely a design gate.

As I wrote in the blog, when multi-agent systems start failing, people naturally write longer RFCs and conduct stricter reviews to push high-cost errors forward as much as possible. Legion, in this phase, institutionalized this instinctive reaction.

---

## V. Milestone Phase: The HTTP Proxy Series Truly Engineered Legion

If the previous phases still carried a sense of "evolving while doing," the `http-proxy` related tasks essentially became Legion's first true milestone of maturity.

This also aligns with my feeling from the blog: the cross-project `http-proxy` task was a point where I began to clearly feel "I can significantly step back from coding, leaving only a small number of review comments."

### 1. It Wasn't a Single Task, But a Task Cluster

Related tasks included at least:

-   [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md)
-   [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md)
-   [`vendor-http-services-rollout`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-http-services-rollout/plan.md)
-   [`http-proxy-metrics` (landed in `rfc-metrics.md`)](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/docs/rfc-metrics.md)
-   [`http-services-terminalinfos-ready`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-services-terminalinfos-ready/plan.md)
-   [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md)

This shows that Legion at this point supported not just "completing a feature," but:

-   Building a foundational library first
-   Then the application layer
-   Then rollout
-   Then observability and metrics
-   Then extending the capability to the vendor side

In other words, it began to support **cross-task, cross-package, cross-phase** engineering evolution.

### 2. The Review Cycle Grew Longer, But Also More Stable

Especially [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) is very illustrative of Legion's maturity.

The recurring debates in this task were no longer about "how to write the code," but about:

-   Does `allowedHosts` affect request behavior, or only metrics?
-   Is `absolute-form` the only supported path format?
-   How are the boundaries between `invalid_url`, `blocked`, and `error` defined?
-   How to control the high-cardinality risk of `target_host` / `target_path`?

These questions are essentially not about coding ability, but about specification boundaries, semantic boundaries, and verification boundaries.

Legion's value here was not writing more code for me, but helping me stabilize these boundaries.

### 3. The Reporting Interface Began to Truly Engineer Itself

This was also a particularly crucial step for Legion.

In the `http-proxy` batch of tasks, Legion began to consistently generate:

-   RFCs
-   review-rfc
-   review-code
-   review-security
-   report-walkthrough
-   PR body
-   spec-test / spec-bench / spec-obs

In other words, Legion was no longer satisfied with just "getting things done"; it began to support "explaining things clearly, attaching evidence, and stating risks."

This aligns perfectly with what I said in the blog: "The reporting interface is an underestimated engineering problem."

The real cost is never tokens, but rework, repeated questioning, re-reading code, and attention leakage. As long as the reporting interface isn't engineered, people still have to spend significant cost guessing what the Agent actually did.

---

## VI. Mature Phase: From Engineering Pipeline to Governance System

Looking further, Legion's maturity isn't just "more documentation"; it's that it began to develop a governance structure.

### 1. Task Creation Is No Longer Ad-Hoc, But Constrained by Policy

The `taskCreationPolicy` in the current [`config.json`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/config.json) is already `agent-with-approval`.

This is symbolically significant. It means Legion has acknowledged a fact:

> Not all complex tasks should be decided by the Agent itself on when to start or advance.

In other words:

-   Agents can explore, organize, and propose;
-   But complex work requires human approval before entering formal execution.

This is controlled autonomy.

### 2. Reviews Are No Longer Just Text, But Stateful Protocols

Judging from the ledger distribution, `legion_list_reviews` and `legion_respond_review` are already high-frequency actions.

This indicates that reviews in Legion are not a secondary capability but a primary one. More importantly, it's not just "reading comments," but:

-   Finding unresolved items
-   Responding to specific reviews point by point
-   Marking `resolved` / `wontfix` / `need-info`
-   Confirming the review loop is closed

The significance of this step is:

> The collaboration between humans and Agents is no longer just session messages, but protocol actions that can be sedimented, tracked, and audited.

### 3. It Began to Bear "Risk Acceptance"

A mature system doesn't mean "all problems are solved," but that it can clearly distinguish:

-   Which risks must be fixed immediately
-   Which risks can be recorded first and governed later
-   Which risks are acceptable under current environmental assumptions

In tasks like [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md) and [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md), we can already see:

-   Some issues were marked as `wontfix` after review.
-   Some security issues were explicitly recorded as accepted risks for the current phase.
-   Some residual risks were not forgotten but formally left behind.

This shows that Legion is no longer just a tool to "help me fix bugs"; it has begun to bear the reality of engineering decisions.

---

## VII. Highest Maturity Samples: From `heavy-rfc` to `signal-trader`

If I had to pick samples from existing tasks that best represent Legion's maturity, I would look at them as two consecutive phases:

-   [`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md)
-   [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md)

### 1. `heavy-rfc`: The Mature Form of Design Gates

[`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md) is a very typical high-risk design task.

It was clear from the start:

-   `rfcProfile=heavy`
-   `stage=design-only`
-   `risk=high`

And its artifact chain is already very complete:

-   [`task-brief.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/task-brief.md)
-   [`research.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/research.md)
-   [`rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/rfc.md)
-   [`review-rfc.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/review-rfc.md)
-   [`report-walkthrough.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/report-walkthrough.md)
-   [`pr-body.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/docs/pr-body.md)

This task illustrates one thing: Legion can now, in high-risk tasks, make "align intent first, then release for execution" a stable process.

### 2. `signal-trader`: The Heavy Process and Implementation Loop Closed

If `heavy-rfc` represents the maturity of design gates, then [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md) feels more like its continuation:

-   Start with heavy design constraints
-   Then enter implementation
-   Then run tests
-   Then conduct code/security review
-   Then produce walkthrough and PR body

From [`signal-trader/tasks.md`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/tasks.md), we can see this chain has been compressed into standard stages:

1.  Task Definition & Boundary Convergence
2.  Heavy Research & RFC
3.  RFC Adversarial Review
4.  RFC-only Draft PR Artifacts
5.  Core Lib Implementation
6.  Testing & Verification
7.  Code & Security Review
8.  Reporting & PR Artifacts

This step is particularly important to me because it shows that Legion, at this point, is no longer "having a set of documentation," but has **a stable, reusable heavy-task process template**.

This is precisely the identity shift I mentioned in the blog: gradually moving from executor to reviewer, decision-maker, and system iterator.

---

## VIII. Comparing This Trajectory with the Blog

Looking back at "[Thoughts on AI Agents](https://0xc1.space/blog/dui-yu-ai-agent-de-si-kao/)", many of the judgments have already materialized in Legion's history.

### 1. "The Initial Sweet Spot of Scale"

The blog wrote: Multi-agent parallel task advancement gives a short-term sense of mechanized harvesting pleasure.

In Legion's history, this corresponds to the rapid growth of tasks starting in December 2025:

-   quote service
-   quote routing
-   SWR
-   scheduler
-   OHLC / interest rate
-   token bucket

The core goal at this time was indeed: get the Agents to do more work first.

### 2. "The Real Bottleneck Became Myself"

As execution work gradually shifted to Agents, the real human bottlenecks became:

-   Context management
-   Design judgment
-   Acceptance
-   Decision-making

Legion's three core files were the earliest tools to combat this:

-   Use `tasks.md` to reduce progress loss.
-   Use `context.md` to externalize decisions and key files.
-   Use `plan.md` to solidify goals and scope.

### 3. "The Wall of Implicit Knowledge"

One of the most important judgments in the blog was that Agents often only learn from visible samples, not knowing what the current standard is.

Legion's response was:

-   Write reviews into the plan.
-   Write constraints into the context.
-   Document design disputes as structured documents.

In other words, externalize the project's implicit knowledge.

### 4. "Intent Alignment + Layered Verification"

The pipeline from the blog is already very close to being implemented in tasks like `http-proxy-*` and `signal-trader`:

-   Intent: Goal / Non-goals / Scope
-   Plan: Phase / RFC / Design Summary
-   Execute: Implementation
-   Verify: test / review-code / review-security / bench
-   Report: walkthrough / PR body
-   Memory: context / archived task / ledger

### 5. "The Reporting Interface is an Underestimated Engineering Problem"

I said in the blog that conclusions should be bound to artifacts, not left as verbal summaries.

Legion is now clearly moving in this direction:

-   Conclusions are not one sentence but correspond to reports, reviews, test-reports, PR bodies.
-   Acceptance doesn't require re-reading all the code; it can prioritize reading condensed artifacts.

While it's not yet my ideal Citation Agent, the direction is very clear.

### 6. "Benchmark Will Become a Necessity"

I said in the blog that in the future, we must be able to compare different workflows or model versions, not rely on feelings like "this version seems smarter."

This line has also begun to take shape in Legion:

-   `spec-bench.md`
-   Benchmark scenarios and thresholds
-   Benchmark output and reports

This shows it's no longer just an idea but entering the engineering phase.

---

## IX. Looking Ahead from Now: The Latest Evolution Direction Represented by `legion-mind`

If the `.legion/` history in the Yuan repository mainly answers "how was this system driven out by real needs," then the current `~/Work/legion-mind` is answering another question:

> Now that this system has been forced into existence, can the next step be to distill it from project experience into a general-purpose system?

The latest evolution direction of Legion is clearly visible from these entry points:

-   [`README.md`](https://github.com/Thrimbda/legion-mind/blob/main/README.md)
-   [`docs/legionmind-usage.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/legionmind-usage.md)
-   [`.legion/playbook.md`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md)
-   [`/evolve`](https://github.com/Thrimbda/legion-mind/blob/main/.opencode/commands/evolve.md)
-   [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)

### 1. From "In-Repository Workflow" to "General Orchestration Template"

In Yuan, Legion grew organically with specific tasks. In `legion-mind`, it has been explicitly abstracted into:

-   primary agent: `legion`
-   subagents: `engineer`, `spec-rfc`, `review-rfc`, `review-code`, `review-security`, `run-tests`, `report-walkthrough`
-   skill: `skills/legionmind`

This shows Legion is evolving from an "experiential workflow" to a "role-clear orchestration system."

### 2. From Document Constraints to Command-Line Entries

The most obvious change in `legion-mind` is the command-line-ification of high-frequency processes:

-   `/legion`
-   `/legion-impl`
-   `/legion-rfc-heavy`
-   `/legion-pr`
-   `/legion-bootstrap`
-   `/evolve`

This might seem like just a usability improvement, but it's not. It means Legion is further solidifying processes that were previously maintained by implicit SOPs into explicit entry points.

### 3. From Task Memory to Organizational Memory

Legion in Yuan could already persist the context of a single task. In `legion-mind`, it has taken another step: starting to sediment cross-task experience into a [`playbook`](https://github.com/Thrimbda/legion-mind/blob/main/.legion/playbook.md).

This is important because:

-   `plan/context/tasks` solve "how to resume this task";
-   `playbook` solves "how to avoid pitfalls for similar tasks in the future."

The playbook is already starting to accumulate rules like:

-   Benchmark output must remain within the repository.
-   Benchmarks must first fix a deterministic profile.
-   Missing summaries must be counted as errors in the denominator, not silently shrinking the denominator.

In other words, Legion's latest memory model is no longer just task memory; it's beginning to attempt organizational memory.

### 4. From "Usable" to "Installable, Verifiable, Rollback-able"

`legion-mind` also has a particularly important direction: it's starting to consider distribution and replication capabilities.

The README already shows:

-   `install`
-   `verify --strict`
-   `rollback`
-   `safe-overwrite`
-   managed files / backup index

This indicates Legion's goal is no longer just "I can use it smoothly in this repository," but:

-   How to safely synchronize assets
-   How to avoid overwriting user modifications
-   How to verify installation status
-   How to rollback on failure

In other words, it's moving from a working method to a productized asset.

### 5. From Experience Summary to Benchmark-Driven System Iteration

I said in the blog that one of the most important future tasks is to be able to compare different versions of workflows, not rely on feeling to judge "this version is better."

`legion-mind` has basically started tackling this head-on:

-   [`docs/benchmark.md`](https://github.com/Thrimbda/legion-mind/blob/main/docs/benchmark.md)
-   benchmark baseline command
-   benchmark-runs directory
-   preflight / smoke / full / score / report process

This means Legion's next phase is no longer about piling on more processes, but starting to answer harder questions:

-   Which process is truly more stable?
-   Which design gate is more cost-effective?
-   Which agent orchestration is more suitable for tasks of different risk levels?
-   Which steps just add ceremony, and which steps actually reduce rework?

For me, this actually makes Legion's next stage very clear:

> From "getting multi-agent systems to work" to "building multi-agent systems as a measurable, iterable, replicable engineering product."

---

## X. Final Summary: How Legion Grew Step by Step

If we compress the entire trajectory again, I would summarize it in five steps.

### Step One: Don't Forget Things First

Use `plan/context/tasks` to move tasks, progress, and handover out of your head.

### Step Two: Write Down Implicit Knowledge

Through `REVIEW`, decision logs, and context records, externalize the project's internal, local knowledge to reduce the probability of Agents mechanically fitting old samples and failing.

### Step Three: Design First, Execute Later

Use RFCs, Specs, and Reviews to solidify design gates, pushing high-cost rework forward.

### Step Four: Engineer Verification and Reporting

Use tests, benchmarks, review-code, review-security, walkthroughs, and PR bodies to make verification and acceptance low-cost.

### Step Five: Turn Autonomy into Controlled Autonomy

Through proposals, approvals, review states, and ledger audits, advance multi-agent collaboration from "can run" to "governable."

So the final conclusion is not "Legion made Agents stronger," but:

> Legion allowed Agent capabilities to be used in a stable, engineering-system way for the first time.

It's not a single-point efficiency tool, but a system that gradually grew around "less interruption, more output, verifiable, handover-able, less wear and tear."

The blog wrote the principles; Legion's history shows how these principles gradually became institutions, documents, processes, and artifacts. Together, they form the complete story.

---

## Appendix: If I Want to Quickly Review Legion's Evolution, I'd Prioritize These Examples

1.  [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md)
    -   The starting point sample of Legion
    -   The three core files first took shape.

2.  [`vex-series-data-ohlcinterestrate-ohlc-v2`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vex-series-data-ohlcinterestrate-ohlc-v2/plan.md)
    -   Most typical for externalizing implicit knowledge.
    -   Extremely high density of reviews/comments.

3.  [`http-proxy-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-service/plan.md)
    -   Design gates and spec-ification began to take shape.

4.  [`http-proxy-app-implementation`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/http-proxy-app-implementation/plan.md)
    -   Very complete in adversarial review, semantic boundaries, risk acceptance, and artifact production.

5.  [`vendor-tokenbucket-proxy-ip`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/vendor-tokenbucket-proxy-ip/plan.md)
    -   A complete chain of multi-round RFC adversarial review -> implementation -> verification -> PR -> external review fixes.

6.  [`heavy-rfc`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/heavy-rfc/plan.md)
    -   A mature sample of high-risk design gates.

7.  [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md)
    -   The latest sample where the heavy design flow and implementation loop connected.

If [`implement-quote-service`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/implement-quote-service/plan.md) represents "Legion was born," then [`http-proxy-*`](https://github.com/No-Trade-No-Life/Yuan/tree/main/.legion/tasks) represents "Legion grew up," and [`signal-trader`](https://github.com/No-Trade-No-Life/Yuan/blob/main/.legion/tasks/signal-trader/plan.md) and [`legion-mind`](https://github.com/Thrimbda/legion-mind) represent Legion beginning to evolve further into the next stage of being "replicable, benchmark-able, productizable."