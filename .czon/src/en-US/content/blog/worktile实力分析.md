---
title: Analysis of Worktile's Capabilities in Requirements Management
date: April 6, 2017
taxonomies:
  tags:
    - Requirements Analysis
    - System Analysis and Design
---

# Requirements Management

First, let's excerpt a classic example of project management failure from *The Mythical Man-Month*.

<!--more-->

> **The Management Lesson of the Tower of Babel**
>
> According to Genesis, the Tower of Babel was humanity's second great engineering feat after Noah's Ark, but it was also the first complete engineering failure.
>
> This story is profoundly insightful and instructive in many ways and at different levels. Let's consider it purely as an engineering project and see what management lessons can be learned. How favorable were the project's initial conditions? Did they have:
>
> 1. A clear objective?
>
>    Yes, albeit one that was naive and nearly impossible. Moreover, the project failed long before encountering this fundamental limitation.
>
> 2. Manpower?
>
>    Ample.
>
> 3. Materials?
>
>    Abundant clay and bitumen asphalt in Mesopotamia.
>
> 4. Sufficient time?
>
>    Yes, there is no indication of any time constraints.
>
> 5. Adequate technology?
>
>    Yes. The pyramid or conical structure is inherently stable and effectively distributes compressive loads. Masonry techniques were well understood. Again, the project failed long before reaching any technological limits.
>
> So, given all these conditions, why did the project fail? What were they missing? Two things—**communication**, and its consequence—**organization**. They could not talk to each other, and therefore could not cooperate. When cooperation became impossible, work ground to a halt. Reading between the lines of the historical account, we can infer that the lack of communication led to arguments, frustration, and group suspicion. Soon, the tribes began to split—choosing isolation over conflict.

The author's analysis reveals that the reasons for this project's failure are as follows:

- Inability to communicate
- Lack of organization
- The system scope was too large

Therefore, effective requirements management involves two aspects: **being requirement-oriented** and **managing requirements**.

Based on my personal experience, I have chosen to analyze the project management tool Worktile.

## Analysis

So, how does Worktile address the aforementioned problems?

### First, Answering What Worktile Is

From the official website introduction:

> Worktile offers Kanban-style task collaboration. By easily dragging and dropping task cards, team members can synchronize board changes in real-time for agile collaboration. It's a lightweight team collaboration tool that gets your team collaborating in under 5 minutes, boosting efficiency. It's simple, intuitive, easy to use, free, and offers unlimited members, projects, and storage space. Take off with your team.

After reviewing, I found it has the following **features**:

- Project-oriented Kanban-style task management

  Clearly divides tasks and provides timely control over project status. Each task includes checklists, assignees, deadlines, attachments, comments, etc.

- File synchronization functionality

  Somewhat similar to GitHub, but not as powerful. Personally, I find it somewhat lacking.

- Shared team calendar

  Provides a macro view of the team's work plans and schedules.

- Message notifications

  Receive notifications for new task assignments, reminders to check a file, or new comments.

- Analytics and statistical views

  Quantifies tasks visually, using charts to intuitively show project progress, task allocation among members, project activity trends, etc.

After understanding its features, the next focus is on how to use Worktile for requirements management.

### Using Worktile for Requirements Management

Analyzing how Worktile reflects the requirements management process:

> - Propose Requirements
>
>   Record change requests in detail. This can be seen as a memo or inbox. The requester should be able to easily record detailed information about the requirement.
>
> - Review
>
>   Confirm whether to implement the change request. This process involves reviewing the change to confirm if the requirement needs to be changed and its impact on existing components.

In Worktile, different change process stages are displayed using task lists.

**Inbox:** Anyone can submit change requests to this task list. When you identify a need, you can add it here.
**To Do:** Requirements confirmed for implementation can be placed in this list, with relevant assignees added.
**In Progress:** This list clearly shows requirements currently being worked on, providing insight into product progress.
**Done:** Completed requirements can be placed in a dedicated list for easy future product tracking.

> - Implementation
>
>   Carry out specific implementation based on the detailed requirements, which may involve product managers, developers, and designers.
>
> - Verification
>
>   Ensure the quality of the requirement's outcome, confirming that the implementation is correct.
>
> - Measurement
>
>   Perform measurement and analysis on the requirement process. This step is very important and meaningful for requirements management. By analyzing these requirements, you can understand the current project's progress and identify existing issues.

Use labels to define task attributes and task priority to define the processing priority of requirements.

If a change request is confirmed as not to be implemented, simply archive it for future reference.

In Worktile's project analytics and statistical views, label statistics can be performed. The value for requirements management lies in analyzing requirement attributes to understand the current product's progress, how many user pain points have been resolved, and using list statistics to track requirement completion status.

### Solving the Problems

After analyzing Worktile, we can now answer the initial question: **How does Worktile solve the problems mentioned earlier?**

We can use Worktile to flexibly implement the requirements management process. Its features of intuitive tasks, a discussion platform, and multiple project views allow us to easily define the system. Combined with good management, it can help avoid issues like ambiguous system boundaries.

Using Worktile, we can conveniently record change requests. Combined with discussion and notification features, it facilitates simple collaboration and communication, allowing every member to participate.

Simultaneously, we can utilize its statistical analysis functions to easily measure and analyze project requirements, assessing the current change status of the entire project.

Thus, Worktile addresses issues related to requirements management, personnel organization, and communication.

Finally, requirements management is just one part of overall project management and should not be separated from other elements of project management.

Requirements management is only one area where Worktile can be effective. Beyond this, through the aforementioned functions, Worktile enables management of the entire project lifecycle, providing conceptual integrity.