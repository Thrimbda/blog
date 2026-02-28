---
title: RBAC Concepts and System Design
date: May 7, 2017
taxonomies:
  tags:
    - System Design and Analysis
    - RBAC
---

![RBACmodel](http://0xc1.space/images/2017/05/07/RBACmodel.png)

## Concepts of RBAC

RBAC (**R**ole-**B**ased **A**ccess **C**ontrol) is an access control model based on roles. It is a more neutral and flexible access control technology compared to mandatory access control and discretionary access control.

First, several objects in RBAC:

- S = Subject = A user or an automated agent
- R = Role = Defined as a job position or title with an authorization level
- P = Permission = A way to access a resource
- SE = Session = A mapping relationship among S, R, or P
- SA = Subject Assignment
- PA = Permission Assignment
- RH = Role Hierarchy. Can be represented as: ≥ (x ≥ y means x inherits the permissions of y)

Second, the relationships among these objects are as follows:

- **Subject** and **Role** have a many-to-many relationship.

  ${\displaystyle SA\subseteq S\times R}$

- **Role** and **Permission** have a many-to-many relationship.

  ${\displaystyle PA\subseteq P\times R}$

<!--more-->

## Understanding RBAC

After understanding the related concepts of RBAC, here are my own thoughts.

RBAC is a type of MAC (**M**andatory **A**ccess **C**ontrol), meaning the system administrator uniformly configures and manages each user role.

The relationship among **S** (Subject), **R** (Role), and **SE** (Session) is as shown in the figure above. That is, although a subject can have multiple roles, the subject can only exercise the authority of one role after logging into the system (i.e., during a session with the system).

**P** (Permission) is determined by the services provided by the system. It is essentially a combination of the resources provided by the system and the operations performed on those resources. It is precisely this combination of resources and operations that gives meaning to the concept of permission.

### Application

My definition of the application scenario for RBAC: **A system where resources are shared by the system and have multiple hierarchical roles with separated responsibilities**.

Resources are shared by the system and have multiple, hierarchical roles. This indicates that the resources in the system have different meanings for each role, and therefore, the responsibility each role bears for the resources also differs. For such a system, RBAC is a very suitable access control model. It can effectively allocate rights and responsibilities, thereby better protecting and utilizing the resources in the system.

Examples: Commercial companies and operating systems that follow the Principle of least privilege.

For a system where resources are owned by individuals, each role is equal, and each role has complete control over its own resources. In this case, the RBAC model seems inadequate, and the DAC (**D**iscretionary **A**ccess **C**ontrol) model should be used instead. This is very common in social network systems.

In real-world scenarios, there is no purely shared resource or purely exclusive resource. Therefore, these two models are often mixed. For example: In WeChat, ordinary users have complete management permissions over their own "resources" (Moments). However, ordinary users cannot manage other users. The implementation of the "report" function relies on intervention by other roles in the system with higher permissions.