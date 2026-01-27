---
"title": "RDD Paper Notes"
"summary": "This article is a set of notes on the paper about Resilient Distributed Datasets (RDDs). It details the motivation, core characteristics, advantages, and limitations of RDDs as an in-memory abstraction for distributed systems. By sacrificing fine-grained computation, RDDs achieve efficient iterative computation, fault tolerance, and generality, addressing the performance bottleneck of data reuse in traditional distributed computing frameworks. The article also introduces the implementation of RDDs in Spark, including its programming interface, dependencies, and performance evaluation, demonstrating RDD's significant performance improvements over Hadoop for iterative tasks and user analysis programs. Finally, it concludes that the core value of RDDs lies in modeling cluster memory, enabling fast, successive computations, and points out that hardware limitations are the theoretical boundary for software innovation."
"tags":
  - "RDD"
  - "Spark"
  - "Distributed Systems"
  - "Paper Notes"
  - "In-Memory Abstraction"
  - "Iterative Computation"
  - "Fault Tolerance"
  - "Performance Optimization"
"date": "2020-10-29"
---

Resilient Distributed Datasets (RDDs) are an in-memory abstraction for distributed systems.

At their core, they are a strictly constrained **shared memory** model, offering only coarse-grained transformation operations.

## Motivation

### Problem

Iterative distributed computations require the (efficient) ability to reuse data between iterations.

### Current State (circa 2012)

- Existing distributed computing frameworks lacked an abstraction that could fully leverage (reuse) cluster memory.
- The only way for existing frameworks to reuse data was to launch multiple distributed computations.

While this solved the problem of feasibility, data reuse remained a performance bottleneck for such computations: significant resources were wasted on overly frequent I/O.

Some work attempted to address these issues, but could only support specific computational patterns, lacking generality.

The main challenge was the trade-off between computational granularity, generality, and fault tolerance.

## RDD

RDDs provide an in-memory abstraction for distributed computing clusters, largely solving the above problems. Their approach was to sacrifice the least important aspect among the three: computational granularity.

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
- persist (i.e., cache)

Spark implements RDDs, providing a programming interface similar to DryadLINQ.

### Advantages of RDDs

Primarily compared to similar abstractions (which model cluster memory), RDDs sacrifice fine-grained data operations to achieve significant superiority in other aspects (generality, fault tolerance, degraded performance, consistency, straggler mitigation, ease of use).

### Limitations of RDDs

RDDs are not suitable for asynchronous computations involving a large number of fine-grained reads and writes, such as storage systems for web crawlers. For similar applications, the authors suggest other frameworks, which are not detailed here.

## Spark's Programming Interface

Implemented using Scala due to its conciseness and efficiency.

The author provides several examples in this section, which are omitted here.

## Representation of RDDs

RDDs are represented using a DAG (Directed Acyclic Graph).

### Dependencies

- Narrow dependencies - Each parent partition is depended on by at most one child partition.
- Wide dependencies - A parent partition is depended on by at least one child partition.

## Implementation

- Uses Mesos for cluster management.
- Job scheduler details omitted.
- Interpreter integration details omitted.
- Memory management details omitted.

## Evaluation

- 20x faster than Hadoop on iterative tasks.
- Reported 40x faster than Hadoop for user analysis programs.
- Can quickly recompute data after node failures.
- Query latency of 5-7 seconds for 1TB of data.

Specific details are omitted.

## Discussion

They ambitiously used Spark to mimic other distributed computing frameworks to demonstrate the generality of RDDs.

Specifics are omitted.

## Summary

- The greatest advantage of RDDs/Spark is modeling the memory of the entire cluster, allowing distributed computations to store intermediate results in memory. This makes fast, successive computations on the same dataset possible. All of this is based on one premise: memory is an order of magnitude faster than disk (hence enabling the 40x performance improvement of Spark over Hadoop).
  This shows that the theoretical limit of software innovation is the hard constraint of hardware.