---
"title": "RDD Paper Notes"
"summary": "These are notes on the Resilient Distributed Datasets (RDDs) paper, analyzing the design motivation, core concepts, and advantages of RDDs. As a distributed memory abstraction, RDDs support transformation and action operations through immutable, lazy-evaluation properties and utilize a DAG to represent dependencies. By sacrificing fine-grained operations, RDDs gain fault tolerance, generality, and performance, showing significant improvements over Hadoop in iterative computations (e.g., 20-40x). The article also outlines Spark's implementation and evaluation results, noting that RDDs are suitable for coarse-grained computations but not for fine-grained asynchronous tasks."
"tags":
  - "RDD"
  - "Spark"
  - "Distributed Systems"
  - "Paper Notes"
  - "Memory Abstraction"
  - "Iterative Computation"
  - "Fault Tolerance"
"date": "2020-10-29"
---

Resilient Distributed Datasets (RDDs) are a memory abstraction for distributed systems.

Essentially, it is a strictly constrained **shared memory** model that only provides coarse-grained transformation operations.

## Motivation

### Problem

Iterative distributed computations require the ability to (efficiently) reuse data across iterations.

### Current State

- Existing (as of 2012) distributed computing frameworks lacked an abstraction that could fully utilize (reuse) cluster memory.
- The only way for existing frameworks to reuse data was to launch multiple distributed computations.

Thus, while the solvability of problems is addressed, data reuse remains a performance bottleneck for such computations: significant resources are wasted on overly frequent I/O.

Some work has attempted to address these issues, but they only support specific computational patterns and are not general enough.

The main challenge lies in the trade-off between computational granularity, generality, and fault tolerance.

## RDD

RDD provides a memory abstraction for distributed computing clusters, largely solving the above problems by sacrificing the least important aspect among the three: computational granularity.

### Basics

Properties of RDDs:

- Immutable
- Lazy

Operations supported by RDDs:

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

Spark implements RDDs and provides a programming interface similar to DryadLINQ.

### Advantages of RDDs

Primarily compared to similar abstractions (modeling cluster memory), RDDs sacrifice fine-grained data operations to achieve overwhelming advantages in other aspects (generality, fault tolerance, degraded performance, consistency, straggler mitigation, ease of use).

### Limitations of RDDs

RDDs are not suitable for asynchronous computations with many fine-grained reads and writes, such as storage systems for web crawlers. For such applications, the authors suggest other frameworks, which are not detailed here.

## Spark's Programming Interface

Implemented using Scala due to its conciseness and efficiency.

The author provides several examples in this section, which are omitted here.

## Representation of RDDs

Uses a DAG to represent RDDs.

### Dependencies

- narrow dependencies - Each parent partition is depended on by at most one child partition.
- wide dependencies - Each parent partition is depended on by at least one child partition.

## Implementation

- Uses Mesos for cluster management.
- Job scheduler details omitted.
- Interpreter integration details omitted.
- Memory management details omitted.

## Evaluation

- 20x faster than Hadoop on iterative tasks.
- Reports 40x faster than Hadoop on user analytics programs.
- Can quickly recompute data after node failures.
- Query latency of 5-7 seconds for 1TB of data.

Details omitted.

## Discussion

They ambitiously used Spark to mimic other distributed computing frameworks to demonstrate the generality of RDDs.

Specifics omitted.

## Summary

- The greatest advantage of RDDs/Spark is modeling the memory of the entire cluster, enabling distributed computations to store intermediate results in memory. This makes rapid consecutive computations on the same dataset possible, all based on the premise that memory is an order of magnitude faster than disk (hence achieving the 40x performance improvement of Spark over Hadoop).
  This shows that the theoretical limit of software innovation is constrained by the hard limits of hardware.