---
"title": "RBAC Concepts and System Design"
"summary": "This article elaborates on the core concepts of the RBAC (Role-Based Access Control) model, including objects such as Subject, Role, Permission, Session, and their many-to-many relationships. It explains RBAC as a type of Mandatory Access Control model, where system administrators centrally manage user roles, and emphasizes that a subject can only exercise the permissions of a single role during a session. The author further explores the application scenarios of RBAC, namely systems where resources are shared by the system and have various hierarchical roles, such as business corporations and operating systems adhering to the Principle of Least Privilege. The article also contrasts RBAC with the DAC (Discretionary Access Control) model, noting that DAC is more suitable for systems where resources are owned by individuals, and suggests using a hybrid of both models in practical scenarios. Finally, WeChat is used as an example to illustrate the practical application of a hybrid model."
"tags":
  - "RBAC"
  - "System Design"
  - "Access Control"
  - "Permission Management"
  - "MAC"
  - "DAC"
  - "Role"
  - "Principle of Least Privilege"
"date": "2017-05-07"
---

---
title: RBAC Concepts and System Design
date: 2017-05-07
taxonomies:
  tags:
    - System Design and Analysis
    - RBAC
---

![RBACmodel](http://0xc1.space/images/2017/05/07/RBACmodel.png)

## Concepts of RBAC

RBAC (**R**ole-**B**ased **A**ccess **C**ontrol) is an access control technology that is more neutral and flexible compared to Mandatory Access Control and Discretionary Access Control.

First, the several objects in RBAC:

- S = Subject = A user or an automated agent
- R = Role = Defined as a job position or title with an authorization level
- P = Permission = A way to access a resource
- SE = Session = The mapping relationship between S, R, or P
- SA = Subject Assignment
- PA = Permission Assignment
- RH = Role Hierarchy. Can be represented as: ≥ (x ≥ y means x inherits the permissions of y)

Secondly, the relationships between these objects are as follows:

- **Subject** and **Role** have a many-to-many relationship.

  ${\displaystyle SA\subseteq S\times R}$

- **Role** and **Permission** have a many-to-many relationship.

  ${\displaystyle PA\subseteq P\times R}$

<!--more-->

## Understanding RBAC

After understanding the concepts related to RBAC, here are my own interpretations.

RBAC is a type of MAC (**M**andatory **A**ccess **C**ontrol), meaning system administrators centrally configure and manage user roles.

The relationship between **S** (Subject), **R** (Role), and **SE** (Session) is as shown in the figure above. That is, although a subject can have multiple roles, the subject can only exercise the authority of one role after logging into the system (i.e., during a session with the system).

**P** (Permission) is determined by the services provided by the system. It is essentially a combination of the resources provided by the system and the operations performed on those resources. It is precisely this combination of resources and operations that gives the concept of permission its meaning.

### Application

My definition of the application scenario for RBAC: **A system where resources are shared by the system and have various, hierarchical roles with separated responsibilities.**

Resources are shared by the system, and there are various, hierarchical roles. This indicates that the meaning of system resources differs for each role, and therefore the responsibility each role bears for the resources also differs. For such a system, RBAC is a very suitable access control model. It can effectively allocate rights and responsibilities, thereby better protecting and utilizing the resources within the system.

Examples include: business corporations and operating systems that adhere to the Principle of Least Privilege.

For a system where resources are owned by individuals, each role is equal, and each role has complete control over its own resources. In this case, the RBAC model seems inadequate, and the DAC (**D**iscretionary **A**ccess **C**ontrol) model should be used instead. This is very common in social network systems.

In practical scenarios, there cannot be purely shared resources or purely exclusive resources. Therefore, these two models are often used in combination. For example: In WeChat, ordinary users have complete management permissions over their own "resources" (Moments). However, ordinary users cannot manage other users. The implementation of the "Report" function relies on intervention by other roles within the system that have higher permissions.