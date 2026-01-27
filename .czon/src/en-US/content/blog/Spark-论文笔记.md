---
"title": "Spark Paper Notes"
"summary": "This article contains notes on the Spark paper, introducing how Spark overcomes the limitations in generality of systems like MapReduce through the RDD (Resilient Distributed Dataset) data structure, supporting data reuse across multiple parallel operations. The article details the ways to create RDDs, persistence strategies, the programming model (e.g., parallel operations), and implementation details of Spark in Scala, including its lazy evaluation and ephemeral nature. Experimental results show Spark is up to 10x faster than Hadoop in specific scenarios. Finally, the article summarizes Spark's early advantages, limitations, and comparisons with related technologies."
"tags":
  - "Spark"
  - "RDD"
  - "Distributed Systems"
  - "Paper Notes"
  - "Big Data"
  - "Scala"
  - "MapReduce"
"date": "2022-01-10"
---

MapReduce was very successful. However, most systems built around acyclic graphs were not general-purpose. At this point, Spark emerged, **proposing a distributed computing framework that can support**:

> those that reuse a working set of data across multiple parallel operations.

through a distributed data structure called RDD.

RDD (Resilient Distributed Dataset) is a read-only data structure that can be reconstructed from its lineage in the DAG if lost.

Spark is implemented in Scala, which has the following characteristics:
- A language implemented on the JVM
- Supports functional programming
- Object-oriented

## Programming Model

### Introduction to RDD

RDDs can be created in four ways:

1. From a file system, e.g., HDFS
2. From a Scala collection
3. Transformed from an existing RDD (via operations like `flatMap`, `map`, `filter`, etc.)
4. By changing the persistence method of an existing RDD (RDDs are read-only; any modification logically creates a new RDD)

Additionally, RDDs are lazy and ephemeral data structures. Users can persist RDDs in two ways:

- Via `cache`: a cached RDD remains lazy but is no longer ephemeral, meaning it is stored after its first evaluation for reuse.
- Via `save`: writing to a distributed file system.

Users need to make a trade-off between access speed and storage space.

### Parallel Operations

- `reduce` - associative operation
- `collect`
- `foreach` - side effect

## Examples

- Log statistics
- Logistic regression
- ALS (Alternating Least Squares)

With the characteristics of laziness and ephemerality, Spark behaves similarly to MapReduce. However, adding a caching step can significantly speed up computations.

## Implementation

- (At the time the paper was written) Built on top of Mesos
- The core of the implementation lies in the RDD interface, fully leveraging Scala's object-oriented and functional features:
  - `getPartitions`
  - `getIterator(partition)`
  - `getPreferredLocations(partition)` for locality considerations
- Tasks (closures) in Scala are Java Objects, so they can be serialized and sent. During implementation, a bug in Scala was even discovered.
- Interpreter integration was also implemented.
- As of the paper's writing, shuffle had not yet been implemented.

## Experimental Results

- Outperformed Hadoop, up to 10x faster
- Small dataset used

## Related Work

- Distributed Shared Memory
- MapReduce
- Scala is similar to DryadLINQ

## Thoughts

- Very early-stage work; the authors were excited to share it. The 10x improvement over Hadoop was impressive.
- This article is relatively high-level.
- Functional, immutable, enabling lazy evaluation.
- Neither Hadoop nor Spark at that time could surpass MapReduce.