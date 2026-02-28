---
title: Spark Paper Notes
date: 2022-01-10
taxonomies:
  tags:
    - Technology
    - Distributed Systems
    - Paper Notes
    - Spark
    - RDD
---

MapReduce was highly successful, yet most systems built around acyclic graphs were not general-purpose. At this time, Spark emerged, **introducing a distributed data structure called RDD**, proposing a distributed computing framework that could support:

> those that reuse a working set of data across multiple parallel operations.

RDD (Resilient Distributed Dataset) is a read-only data structure that can be reconstructed from its preceding nodes in the DAG if lost.

Spark is implemented in Scala, which has the following characteristics:
- A language implemented on the JVM
- Supports functional programming
- Object-oriented

## Programming Model

### Introduction to RDDs

RDDs can be created in four ways:

1. From a file system, such as HDFS
2. From a Scala collection
3. Transformed from an existing RDD (via operations like flatMap, map, filter, etc.)
4. By changing the persistence method of an existing RDD (RDDs are read-only; any modification logically creates a new RDD)

Additionally, RDDs are lazy and ephemeral data structures. Users can persist RDDs in two ways:

- Via `cache`: a cached RDD remains lazy but is no longer ephemeral, meaning it is stored after its first evaluation for reuse.
- Via `save`: writing to a distributed file system.

Users need to make a trade-off between access speed and storage space.

### Parallel Operations

- reduce - associative operation
- collect
- foreach - side effect

## Examples

- log statistics
- logistic regression
- ALS

With the characteristics of laziness and ephemerality, Spark behaves similarly to MapReduce. However, by adding a caching step, computations can be significantly accelerated.

## Implementation

- (At the time the paper was written) Built on top of Mesos
- The core of the implementation lies in the RDD interface, leveraging Scala's object-oriented and functional features:
  - getPartitions
  - getIterator(partition)
  - getPreferredLocations(partition) for locality considerations
- Tasks (closures) in Scala are Java Objects, allowing them to be serialized and sent. During implementation, a bug in Scala was even discovered.
- Interpreter integration was also implemented.
- At the time the paper was written, shuffle had not yet been implemented.

## Experimental Results

- Outperformed Hadoop, 10x faster
- Small dataset

## Related Work

- Distributed Shared Memory
- MapReduce
- Scala is similar to DryadLINQ

## Reflections

- This was still early-stage work, and the authors were excited to share it. The 10x improvement over Hadoop was quite impressive.
- This paper is relatively high-level.
- Functional, immutable, enabling lazy evaluation.
- Neither Hadoop nor Spark at that time could surpass MapReduce.