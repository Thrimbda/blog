---
"title": "Analysis of Worktile's Capabilities in Requirements Management"
"summary": "This article begins with the failure case of the Tower of Babel from *The Mythical Man-Month*, analyzing that the reasons for project failure lie in a lack of communication and organization. The author points out that effective requirements management should focus on both the requirements themselves and the management process. Subsequently, the article details the features of Worktile, a project management tool, including Kanban-style task management, file synchronization, shared calendars, message notifications, and analytical/statistical views. By demonstrating the process of using Worktile for requirements management—such as proposing, reviewing, implementing, confirming, and measuring requirements—the article argues how Worktile addresses issues of communication, organization, and overly broad system scope. Finally, it emphasizes that requirements management should be integrated into overall project management, and Worktile provides comprehensive conceptual support for this."
"tags":
  - "Requirements Management"
  - "Project Management"
  - "Worktile"
  - "Team Collaboration"
  - "System Analysis"
  - "Task Management"
  - "Kanban"
  - "Communication"
"date": "2017-04-06"
---

---
title: Analysis of Worktile's Capabilities in Requirements Management
date: 2017-04-06
taxonomies:
  tags:
    - Requirements Analysis
    - System Analysis and Design
---

# Requirements Management

First, an excerpt from a typical failure example in project management cited in *The Mythical Man-Month*.

<!--more-->

> **The Management Lesson of the Tower of Babel**
>
> According to Genesis, the Tower of Babel was humanity's second great engineering feat after Noah's Ark, but it was also the first complete engineering failure.
>
> This story is profound and instructive in many ways and at different levels. Let's consider it purely as an engineering project and see what management lessons can be learned. How favorable were the project's initial conditions? Did they have:
>
> 1.  A clear objective?
>
>     Yes, though it was naive to the point of impossibility. Moreover, the project failed long before encountering this fundamental limitation.
>
> 2.  Manpower?
>
>     Ample.
>
> 3.  Materials?
>
>     Abundant clay and bitumen asphalt in Mesopotamia.
>
> 4.  Sufficient time?
>
>     Yes, there is no indication of any time constraints.
>
> 5.  Sufficient technology?
>
>     Yes. The pyramid or conical structure itself is stable and effectively distributes stress loads. Masonry techniques were well understood. Again, the project failed long before reaching technological limits.
>
> So, given all these conditions, why did the project fail? What were they missing? Two things—**communication**, and its consequence—**organization**. They could not talk to each other, and thus could not cooperate. When cooperation broke down, work ground to a halt. Reading between the lines of the historical account, we can infer that the lack of communication led to arguments, frustration, and group suspicion. Soon, the tribes began to split—choosing isolation over constant quarreling.

The author's analysis reveals that the reasons for this project's failure are as follows:

-   Inability to communicate
-   Lack of organization
-   System scope was too large

Therefore, effective requirements management is twofold: **requirements-oriented** and **management-oriented**.

Based on personal experience, I have chosen to analyze the project management tool Worktile.

## Analysis

So, how does Worktile address the aforementioned problems?

### First, Answering What Worktile Is

From the official website introduction:

> Worktile's Kanban-style task collaboration allows team members to synchronize board changes in real-time through easy drag-and-drop of task cards, enabling agile collaboration. A lightweight team collaboration tool that gets your team collaborating in under 5 minutes, boosting efficiency. It's simple, intuitive, easy to use, free, offers unlimited members, projects, and storage space—helping your team soar.

After organizing, I found it has the following **features**:

-   **Project-oriented Kanban-style task management**
    Clearly divides tasks and provides timely control over project status. Each task includes checklists, assignees, deadlines, attachments, comments, etc.
-   **File synchronization functionality**
    Somewhat similar to GitHub, though not as powerful. Personally, I find it somewhat redundant.
-   **Shared team calendar**
    Provides a macro view of the team's work schedule and plans.
-   **Message notifications**
    Receive notifications for new task assignments, reminders to check files, or new comments.
-   **Analytical and statistical views**
    Quantifies tasks visually, using charts to intuitively show project progress, task allocation among members, project activity trends, etc.

After understanding its features, the next focus is on how to use Worktile for requirements management.

### Using Worktile for Requirements Management

Analyzing how Worktile reflects the requirements management process:

> -   **Proposing Requirements**
>     Record change requests in detail. This can be seen as a memo or inbox. The requester should be able to easily record detailed information about the requirement.
> -   **Reviewing**
>     Confirm whether to implement the change request. This process involves reviewing the change to confirm its necessity and its impact on existing components.

In Worktile, different change process stages are displayed using task lists.

**Inbox:** Anyone can submit change requests to this task list. When you identify a need, you can add it here.
**To Do:** Requirements confirmed for implementation can be placed in this list, with relevant assignees added.
**In Progress:** This list clearly shows requirements currently being worked on, providing insight into product progress.
**Completed:** Completed requirements can be placed in a dedicated list for easy future product tracking.

> -   **Implementation**
>     Carry out specific implementation based on the detailed requirements, potentially involving product managers, developers, and designers.
> -   **Confirmation**
>     Perform quality assurance on the requirement's outcome to confirm correct implementation.
> -   **Measurement**
>     Conduct measurement and analysis of the requirement process. This step is very important and meaningful for requirements management. Analyzing these requirements reveals the current project's progress and existing issues.

Use tags to define task attributes and task priority to define the processing priority of requirements.

If a change request is confirmed as not to be implemented, simply archive it for future reference.

In Worktile's project analysis and statistical views, tag statistics can be performed. The value for requirements management lies in analyzing requirement attributes to understand the current product's progress, how many user pain points have been resolved, and using list statistics to track requirement completion status.

### Solving the Problems

After analyzing Worktile, we can now answer the initial question: **How does Worktile solve the problems mentioned earlier?**

We can use Worktile to flexibly implement the requirements management process. Its features—intuitive tasks, a discussion platform, and multiple project views—allow us to conveniently define the system. Combined with good management, it helps avoid issues like ambiguous system boundaries.

Using Worktile, we can easily record requirement changes. Combined with its discussion and notification features, it facilitates simple coordination and communication, allowing every member to participate.

Furthermore, we can utilize its statistical analysis functions to conveniently measure and analyze project requirements, assessing the current change status of the entire project.

Thus, Worktile addresses issues of requirements management, personnel organization, and communication.

Finally, requirements management, as one part of overall project management, should not be separated from other elements of project management.

Requirements management is just one area where Worktile can be effective. Beyond this, through the aforementioned features, Worktile enables management of the entire project lifecycle, providing conceptual completeness.