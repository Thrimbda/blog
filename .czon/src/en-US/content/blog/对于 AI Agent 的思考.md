---
title: Thoughts on AI Agents
date: 2026-02-26
---

> This article was co-written with ChatGPT. My observation: ChatGPT has strong logical abilities, but its Chinese expression is really weird. I wonder who taught it Chinese.

When the early morning alarm dragged me out of bed, I knew how the night would end: **the alert would be useful, but the logs would be garbage**. The CPU spike on the screen was like a needle, popping the bubble of the system "seeming okay"; and as I stared at the logs that couldn't be analyzed, I mentally added another note – availability isn't built on prayers.

It was also from that moment that I became even more certain of one thing: what I'm doing now isn't really "using AI to write more code," but **using AI to scale myself up**. First, move myself out of the executor's position, becoming the one who directs, accepts, and is responsible for iterating on this system, and then try to use this system to scale others.

This essay starts with that theme. I fired up the multi-agent system, spent tokens, and felt the joy of playing creator. Then I immediately ran into the project's "tacit knowledge wall," forcing me to pick up "unsexy things" like evaluation, reporting, and memory one by one. Interspersed were a cold, cooking, board games, and switching editors – these aren't digressions; they are the real constraints of my system: **I only have one brain, only 24 hours in a day, and I really do get tired.**

---

## First Taste of the Scaling Sweet Spot

That day, I truly started using opencode's multi-agent mode: five agents simultaneously fixing five issues. The two-hour experience was a lot like the first time I got the first 6.824 assignment running: a distributed MapReduce system running locally – logs scrolling rapidly, tasks being pushed forward concurrently, my productivity shifting from "manual farming" to "mechanized harvesting."

During this process, my Codex Plus plan's weekly token limit was also used up for the first time so quickly.

Parallelism is addictive because it feels so good: you don't need to constantly watch, and you can even briefly believe you've escaped the bottleneck. But the cost of parallelism is straightforward: **costs scale linearly, and errors are amplified**. If the initial direction is wrong, multi-agent isn't "trying multiple paths," but "five cars driving into the ditch together."

So my definition of "autonomy" quickly evolved from a slogan into three concrete goals – I wrote them like SLIs:

- **Bother me as little as possible** (reduce the cost of interruptions)
- **Let it work as much as possible** (increase effective output)
- **Improve reliability as much as possible** (don't veer off course, don't crash, don't drag me into the quagmire of rework)

These three goals reappeared repeatedly later, becoming the North Star for all of LegionMind's design decisions.

---

## The Bottleneck is Myself

After offloading as much execution work as possible to agents, human rationality and desire became the bottleneck for progress.

My workflow is roughly: development, daily scheduling, thinking and output – I can stably run at most two or three contexts simultaneously. Beyond that, my scheduling fails, and fatigue piles up like a memory leak. The multi-agent system didn't eliminate this problem; it just moved the "execution burden" away, but **context management, acceptance, and decision-making** still fall on me, and because AI execution is really fast, the burden in other areas becomes heavier.

Later, I started looking at "work logs" more honestly, which led to this [2026 Work Diary](https://0xc1.space/diary/diary-2026/). As I mentioned there, writing it isn't for recalling details in the future, but for **unloading context from my brain**. The act of recording itself is a reorganization of the thought chain, like tidying up dirty pages in memory and flushing them back to disk.

I even found that if logs become a ritual of "must sit down and write for thirty minutes," it creates fear; fear leads to stopping updates; stopping for a few days leads to accumulation, making it harder to write later. No matter how beautiful the system design, when it meets human habits, reality can still break through. I'm still exploring this point. Let's get back on topic and talk about AI.

---

## The "Tacit Knowledge Wall": What Are We Expecting When We Give AI Instructions?

When I truly pushed agents into complex projects – especially monorepo projects spanning multiple packages – a typical accident appeared very quickly:

I asked an agent to reference a similar implementation (e.g., vendor-okx) to integrate a new module. It not only learned the correct way to write it but also learned **outdated practices**: in my own case, this outdated practice was writing account flows into an entry point that was no longer used. For me, this was "common sense the project had already evolved past"; for a new agent, this evolution was invisible.

At that moment, I realized: an agent's "learning" is more like fitting from visible samples, not understanding history from organizational memory. **It doesn't know what the "current standard" is.**

Thus, an "external brain" went from a nice-to-have to a necessity. But an external brain also has a brutal cost: maintaining it consumes attention, and attention is my scarcest resource.

I once tried using a set of `AGENT.md` files as project memory, but quickly hit a difficulty: how to distinguish noise from experience worth solidifying? This isn't a documentation writing problem; it's an **evaluation problem** – you must know what will cause an agent to fail and what can significantly improve its success rate before it's worth writing into "memory."

What are we really expecting when we give AI instructions? Organizing this structure into a "instruction/knowledge layering" diagram yields the following:

```
┌────────────────────────────┐
│ ① Task Instruction (What you can articulate) │
├────────────────────────────┤
│ ② Project Tech Decisions / Local Best Practices │  ← Most prone to being "tacit," most prone to failure
├────────────────────────────┤
│ ③ Domain Context (What the problem is) │
├────────────────────────────┤
│ ④ Engineering Common Sense / Style Preferences / Accumulated Experience │
├────────────────────────────┤
│ ⑤ World Background Knowledge │
└────────────────────────────┘
```

In a single conversation, what can be clearly communicated to the AI is only the top layer.

The conclusion is: the smaller the context, the clearer the instruction, the less historical baggage, the easier it is for the AI to complete with high quality. The more tacit background, the more likely "weird work" appears.

This is also why LegionMind was born. It doesn't require the person giving instructions to "write a perfect prompt," but to turn the second layer of tacit knowledge into something that can be loaded and reused.

---

## Intent Alignment + Layered Verification

The current version of LegionMind forces the Agent to collect project-relevant information based on user instructions and write a detailed RFC-style document, striving to align user needs as much as possible from the start. The reason is simple:

When a multi-agent system starts failing, the human first reaction is often: write longer RFCs, do stricter reviews, push risk to the very front. Human-AI collaboration gets pushed back into a waterfall-like form: linear progression, poor flexibility, but the crucial part is: **it imposes a relatively large mental burden on me**.

How do human organizations prevent upper-level decision-makers from being overwhelmed by information? How do human decision-makers let subordinates work freely? CZ has some [thoughts](https://readme.zccz14.com/zh-Hans/how-to-solve-human-control-desire-controllable-trust-in-human-machine-collaboration.html) on this.

Essentially, it's:

1.  **Intent Alignment**: Keep the agent from veering off course.
2.  **Layered Verification**: Expose errors early and allow easy rollback, rather than discovering the direction was wrong at the end.

This isn't empty talk. I paired it with a "production pipeline" flowchart to constrain my interaction with agents:

```
          ┌──────────┐
          │  Intent   │  Goal/Constraints/What not to do
          └────┬─────┘
               │
          ┌────▼─────┐
          │   Plan    │  Breakdown, Milestones, Assumptions
          └────┬─────┘
               │
          ┌────▼─────┐
          │ Execute   │  Write code/Modify config/Generate docs
          └────┬─────┘
               │
     ┌─────────▼─────────┐
     │     Verify         │  Layered Verification (Cheapest runs first)
     │  - build/lint/test │
     │  - e2e/bench       │
     │  - model eval      │
     │  - human review    │
     └─────────┬─────────┘
               │
          ┌────▼─────┐
          │  Report   │  Conclusion + Evidence + Risk
          └────┬─────┘
               │
          ┌────▼─────┐
          │  Memory   │  Solidify "worth remembering" differences
          └────┬─────┘
               └──(Feeds back to Intent/Plan: forms a loop)
```

The key to this process isn't "more complex," but moving verification forward and turning feedback into a loop. It combats the two most common types of waste:

-  Continuing parallel progression in the wrong direction (massive token hemorrhage)
-  Correct direction but unreliable details, leading to repeated rework (mental wear and tear)

---

## Two Languages of Evaluation: pass@k and pass^k

An [article](https://medium.com/ai-software-engineer/anthropic-new-guide-shows-how-to-build-quality-ai-agents-without-getting-fooled-29f378ec2609) on how to evaluate AI Agent performance was very enlightening.

When using AI to complete tasks, there are generally two completely different types of work:

-  **Capability Exploration**: Doesn't care about getting it right the first time, just wants to know "is it possible for it to do this?" The focus here is `pass@k` – at least one success in k attempts.
-  **Production Regression**: Doesn't accept "works occasionally," needs "reliable every time." The focus here is `pass^k` – all k attempts must succeed.

The same system should speak different metrics at different stages. The capability exploration phase can involve less talking and more listening, letting the AI Agent fully utilize its rich and knowledgeable world background; the regression phase we must focus on consistency.

```
        ┌────────────────┐
        │  Human Eval     │  Human reviews design/risk/boundary conditions (most expensive)
        ├────────────────┤
        │  Model Eval     │  rubric/alignment/consistency check (medium)
        ├────────────────┤
        │  Static / Tool  │  build/lint/unit/e2e (cheapest)
        └────────────────┘
```

The principle is simple: use tool-based judgment as much as possible to reduce cognitive load.

---

## The "Reporting Interface" is an Underrated Engineering Problem

The previous chapters discussed "how to get agents to do things." Another key point besides that is "how to let me accept results at low cost." I'm still thinking about this part, but I have some simple ideas I can share here.

The core idea is: AI reporting can't stay at flat Markdown and code diffs. In human organizations, subordinate reporting often requires PPTs, even needing a middle manager as an "expensive megaphone" to compress complex information into actionable conclusions, evidence, and risks.

So what should an AI's report be?

One very concrete idea: **Every conclusion should link to an artifact**. For example:

-  "This feature is complete" → Link to e2e test report, key diff, reproduction experiment script.
-  "This choice is better" → Link to benchmark comparison, log evidence, configuration changes.
-  "There is a risk here" → Link to known uncertainty list, rollback plan.

There could even be a dedicated Citation Agent: it doesn't write code, it only does one thing – bind conclusions and evidence together.

Only when the reporting interface improves can humans feel more at ease, and autonomy truly be established. Otherwise, no matter how powerful the agent's coding ability is, I'd still have to spend a lot of energy "reading what it wrote, guessing what it actually did" – which conflicts with the "less wear and tear" I want.

---

## Engineering Iteration

By February, ChatGPT Codex 5.3 was released, and the experience indeed felt very smart. This also gave me a concern: would setting the workflow too rigidly waste AI's potential?

What LegionMind has been trying is: given a fixed framework, given a relatively mature SOP in a domain (layers 3 and 4 above), let agents run on a given track to reduce deviation. But when the model is smarter, perhaps a more reasonable way is – I only give goals, constraints, and evaluation mechanisms, letting it design the most suitable path itself.

This also means something else must happen: I must compare the performance of different system versions in a more scientific way, not just saying "this version feels smarter."

Thus, "benchmark" in my mind evolved from a thought to a necessity: I need a set of regression tests for complex coding tasks, using the same set of tasks to quantify:

-  `pass@k` (capability exploration)
-  `pass^k` (production reliability)
-  Cost (tokens/time)
-  Rework rate (number of human interventions, modification rounds)
-  Coverage (stability across projects, across packages)

Only then can I truly "iterate the system," not "iterate my mood."

Regarding this, I plan to do two things next:

1.  Investigate existing LLM Coding benchmarks to see if anything can be used directly.
2.  Design a set of benchmarks (LLM interview questions) based on our actual scenarios for different versions of LLMs and Legion to complete tasks. Could even do a 360-degree evaluation.

---

## Milestone

One night, I finally used this LegionMind system to complete an http-proxy task spanning multiple projects. The process wasn't elegant, even touching the limits of the current system – subagents occasionally crashed, cross-package context made multi-agent collaboration fragile.

But the result was a milestone I cared about: I could basically step away from coding. In most cases, I only needed to leave a few review comments on design documents.

This change felt very comfortable: shifting from a keyboard executor to a reviewer, decision-maker, system iterater. That is, what I said at the beginning: scaling myself up.

At the same time, I'm also more willing to admit a realistic principle: **Don't build wheels that are easily smashed by waves**. I found that certain capability platforms themselves are evolving (e.g., opencode is already doing some things the bridge could do), so I'd rather hold off and invest energy into system-layer capabilities that "rise with the tide" – evaluation, memory, reporting, reliability.

---

## The Mutual Taming Between Me and AI Agents

Writing this, I realized that over the past month or so, the AI agent and I have been taming each other:

-  I tame it: Using SOPs, verification, reporting interfaces, pushing it from a "model that can write code" towards a "deliverable system."
-  It tames me: Forcing me to admit human bottlenecks, admit the importance of evaluation, admit that organization and process are the core of the problem.

If I had to compress this experience into a few sentences, I now roughly believe:

1.  **Autonomy isn't just about being smart; it's about less interruption, more output, and verifiability.**
2.  **The most expensive thing isn't tokens; it's rework and attention leakage.**
3.  **Tacit knowledge makes agents fail more easily than code. An external brain is a must, but it must be maintainable.**
4.  **Verification must be layered, goals must be phased: first pass@k, then pass^k.**
5.  **AI's reporting interface must be engineered: conclusions must come with evidence, preferably with one-click access to artifacts.**
6.  **When models get stronger, processes may need to delegate authority to AI; but the premise of delegation is having a benchmark.**

Next, I'll probably continue doing two things: first, build up the benchmark system, making "iterating the legion/multi-agent system" a measurable thing; second, complete the report/citation/artifact chain, allowing me to hand off tasks more easily and stably.

As for that most basic wish – **"minimize wear and tear"** – I now think it's not a wish; it should be a non-functional requirement of the system. As long as I'm still writing code, still being woken by alerts, still playing board games and cooking, this requirement will always hold true.