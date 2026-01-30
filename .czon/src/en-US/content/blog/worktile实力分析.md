---
"title": "Analysis of Worktile's Capabilities in Requirements Management"
"summary": "This article begins with the failure case of the Tower of Babel from *The Mythical Man-Month*, pointing out that the reasons for requirements management failure lie in the inability to communicate, lack of organization, and overly large system scope. The author then introduces the features of the Worktile project management tool, including kanban-style task management, file synchronization, shared team calendars, message notifications, and analytical statistical views. Next, it elaborates on the process of using Worktile for requirements management, such as proposing requirements, reviewing, implementing, confirming, and measuring, and demonstrates how Worktile addresses issues in requirements management through task lists, labels, priorities, and statistical analysis. Finally, the article concludes that Worktile can solve problems in requirements management, personnel organization, and communication, and emphasizes that requirements management should be integrated with other project management elements."
"tags":
  - "Requirements Management"
  - "Worktile"
  - "Project Management"
  - "System Analysis"
  - "Task Collaboration"
  - "Kanban"
  - "Team Collaboration"
  - "Requirements Analysis"
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

First, an excerpt from *The Mythical Man-Month* regarding a typical failure example in project management.

<!--more-->

> **The Management Lesson of the Tower of Babel**
>
> According to Genesis, the Tower of Babel was humanity's second great engineering feat after Noah's Ark, but it was also the first complete engineering failure.
>
> This story is profound and instructive in many ways and at different levels. Let's consider it purely as an engineering project and see what management lessons can be learned. How favorable were the project's initial conditions? Did they have:
>
> 1. A clear objective?
>
>    Yes, though it was naive and nearly impossible. Moreover, the project failed long before encountering this fundamental limitation.
>
> 2. Manpower?
>
>    Plentiful.
>
> 3. Materials?
>
>    Abundant clay and bitumen asphalt in Mesopotamia.
>
> 4. Sufficient time?
>
>    Yes, there were no signs of any time constraints.
>
> 5. Adequate technology?
>
>    Yes, the pyramid or conical structure itself is stable and can effectively distribute pressure loads. Masonry techniques had been thoroughly studied. Again, the project failed long before reaching technological limits.
>
> So, given all these conditions, why did the project fail? What were they lacking? Two aspects—**communication**, and the result of communication—**organization**. They could not talk to each other, and thus could not cooperate. When cooperation became impossible, work came to a halt. Reading between the lines of historical records, we infer that the lack of communication led to arguments, frustration, and group suspicion. Soon, the tribes began to split—choosing isolation over conflict.

The author's analysis reveals that the reasons for this project's failure are as follows:

- Inability to communicate
- Lack of organization
- System scope too large

Therefore, effective requirements management involves two aspects: **oriented toward requirements** and **oriented toward managing requirements**.

Based on personal experience, I have chosen to analyze the Worktile project management tool.

## Analysis

So, how does Worktile address the issues mentioned above?

### First, Answer: What is Worktile?

Introduction from the official website:

> Worktile offers kanban-style task collaboration. By easily dragging and dropping task cards, team members can synchronize kanban changes in real-time for agile collaboration. A lightweight team collaboration tool that allows your team to start collaborating within 5 minutes, boosting efficiency. It is simple, intuitive, easy to use, and free, offering unlimited members, projects, and storage space. Fly with your team.

After organizing, I found it has the following **features**:

- Project-oriented kanban-style task management

  Clearly divides tasks and provides timely control over project status. Each task includes checklists, assignees, deadlines, attachments, comments, etc.

- File synchronization functionality

  Somewhat similar to GitHub but not as powerful. Personally, I find it somewhat redundant.

- Shared team calendar

  Provides a macro view of the team's work plans and schedules.

- Message notifications

  Receive notifications when new tasks are assigned, when attention is requested for a file, or when new comments are made.

- Analytical statistical views

  Quantify tasks visually, using charts to intuitively see project progress, task allocation among team members, project activity trends, etc.

After understanding its features, the next focus is on how to use Worktile for requirements management.

### Using Worktile for Requirements Management

Analyzing how to reflect the requirements management process in Worktile:

> - Propose requirements
>
>   Record change requirements in detail. This can be seen as a memo or inbox. The requester should be able to easily record detailed information about the requirement.
>
> - Review
>
>   Confirm whether to implement the change requirement. This process involves reviewing the change to confirm if the requirement needs to be changed and the impact of the requirement on existing parts.

In Worktile, different change processes are displayed through task lists.

**Inbox:** Anyone can submit change requirement requests to this task list. When you feel there is a need to address a requirement, you can add it here.
**To Do:** Requirements confirmed to be done can be placed in this list, with relevant responsible persons assigned.
**In Progress:** This list clearly shows requirements currently being worked on, providing insight into product progress.
**Completed:** Completed requirements can be placed in a dedicated list for easy tracking later.

> - Implement
>
>   Carry out specific implementation based on the detailed requirements, which may involve product, development, and design personnel.
>
> - Confirm
>
>   Ensure the quality of the requirement's outcome and confirm that the implementation is correct.
>
> - Measure
>
>   Perform metric analysis on the requirement process. This step is very important and meaningful for requirements management. By analyzing these requirements, you can understand the current project's progress and existing issues.

Use labels to define task attributes and task priorities to define the priority of requirement handling.

If it is confirmed that a change requirement will not be implemented, simply archive it for future reference.

In Worktile's project analytical statistical views, label statistics can be performed. The value for requirements management lies in the ability to understand the progress of the existing product through statistical analysis of requirement attributes, see how many user pain points have been resolved, and use list statistics to track requirement completion:

### Solving Problems

After analyzing Worktile, we can now answer the initial question: **How does Worktile solve the problems mentioned earlier?**

We can use Worktile to flexibly implement the requirements management process. Its features of intuitive tasks, providing a discussion platform, and multiple project views allow us to easily define the system. Combined with good management, it can help avoid issues like ambiguous system boundaries.

Using Worktile, we can conveniently record change requirements. Combined with discussion and notification features, it facilitates simple collaboration and communication, allowing every member to participate.

Additionally, we can leverage its statistical analysis functionality to easily perform metric analysis on project requirements and analyze the current change status of the entire project.

Thus, Worktile addresses issues in requirements management, personnel organization, and communication.

Finally, as one part of overall project management, requirements management should not be separated from other elements of project management.

Requirements management is just one aspect where Worktile can be effective. Beyond this, through the aforementioned features, Worktile enables management of the entire project lifecycle, providing conceptual integrity.