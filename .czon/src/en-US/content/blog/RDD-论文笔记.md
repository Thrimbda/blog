---
title: RDD Paper Notes
date: 2020-10-29
taxonomies:
  tags:
    - Technology
    - Distributed Systems
    - Paper Notes
    - RDD
    - Spark
---

Resilient Distributed Datasets (RDDs) are an in-memory abstraction for distributed systems.

Essentially, it is a strictly constrained **shared memory** model that only provides coarse-grained transformation operations.

## Motivation

### Problem

Iterative distributed computations require the ability to (efficiently) reuse data between iterations.

### Current State

- Existing (as of 2012) distributed computing frameworks lack an abstraction that can fully utilize (reuse) cluster memory.
- The only way for existing frameworks to reuse data is to launch multiple distributed computations.

Therefore, while the solvability of the problem is not an issue, data reuse remains a performance bottleneck for this type of computation: significant resources are wasted on overly frequent I/O.

Some work has attempted to address these issues, but they only support specific computational patterns and are not general enough.

The main challenge lies in the trade-off between computational granularity, generality, and fault tolerance.

## RDD

RDD provides a memory abstraction for distributed computing clusters, largely solving the above problems by sacrificing the least important aspect among the three: computational granularity.

### Basics

Properties of RDD:

- Immutable
- Lazy

Operations supported by RDD:

- transformation - Lazy operations
  - map
  - filter
  - ...
- actions - Launch computations
  - count
  - collect
  - save
  - ...
- persist i.e. cache

Spark implements RDD and provides a programming interface similar to DryadLINQ.

### Advantages of RDD

Primarily compared to similar abstractions (modeling cluster memory), RDD sacrifices fine-grained data operations to achieve overwhelming advantages in other aspects (generality, fault tolerance, degraded performance, consistency, straggler problem, ease of use).

### Limitations of RDD

RDD is not suitable for asynchronous computations with a large number of fine-grained reads and writes, such as storage systems for web crawlers. For similar applications, the authors suggest other frameworks, which are not elaborated here.

## Spark's Programming Interface

Implemented using Scala due to its conciseness and efficiency.

The author provides several examples in this section, which are omitted here.

## Representation of RDD

RDD is represented using a DAG.

### Dependencies

- narrow dependencies - Each parent is depended on by at most one child.
- Wide dependencies - A parent is depended on by at least one child.

## Implementation

- Uses Mesos for cluster management.
- Job scheduling is omitted.
- Interpreter integration is omitted.
- Memory management is omitted.

## Evaluation

- 20x faster than Hadoop on iterative tasks.
- Reports 40x faster than Hadoop on user analysis programs.
- Can quickly recompute data after node failures.
- Query latency of 5-7 seconds for 1TB of data.

Details are omitted.

## Discussion

They ambitiously used Spark to mimic other distributed computing frameworks to demonstrate the generality of RDD.

Specifics are omitted.

## Summary

- The greatest advantage of RDD/Spark is its modeling of the entire cluster's memory, enabling distributed computations to store intermediate results in memory. This makes rapid consecutive computations on the same Dataset possible, all based on the premise that memory is an order of magnitude faster than hard drives (hence the 40x performance improvement of Spark over Hadoop).
  It is evident that the theoretical limit of software innovation is constrained by hardware limitations.