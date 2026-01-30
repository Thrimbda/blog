---
"title": "Spark Paper Notes"
"summary": "This article is a set of notes on the Spark paper, focusing on the core of the Spark framework—the Resilient Distributed Dataset (RDD). An RDD is a read-only, reconstructible distributed data structure that supports data reuse across multiple parallel operations. Spark is implemented in Scala, leveraging its functional and object-oriented features to provide a flexible programming model, including methods for creating RDDs (from file systems, Scala collections, transformations of existing RDDs, etc.) and persistence strategies (cache and save). The article outlines Spark's programming model, parallel operations (such as reduce and collect), implementation details (based on Mesos, RDD interface design), and experimental results (performance is 10x better than Hadoop). Finally, the author summarizes Spark's early achievements and potential value, highlighting its advantages in handling iterative and interactive workloads."
"tags":
  - "Spark"
  - "RDD"
  - "Distributed Systems"
  - "Paper Notes"
  - "Scala"
  - "MapReduce"
  - "Big Data"
  - "Performance Optimization"
"date": "2022-01-10"
---

MapReduce was highly successful. However, most systems built around acyclic graphs were not general-purpose. At this point, Spark emerged, **proposing a distributed computing framework that could support**:

> those that reuse a working set of data across multiple parallel operations.

through a distributed data structure called RDD.

RDD (Resilient Distributed Dataset) is a read-only data structure that can be reconstructed from its lineage in the DAG if lost.

Spark is implemented in Scala. Scala's characteristics:
- A language implemented on the JVM
- Supports functional programming
- Object-oriented

## Programming Model

### Introduction to RDD

RDDs can be created in four ways:

1. From a file system, e.g., HDFS
2. From a Scala collection
3. By transforming an existing RDD (via operations like `flatMap`, `map`, `filter`, etc.)
4. By changing the persistence method of an existing RDD (RDDs are read-only; any modification logically creates a new RDD)

Furthermore, RDD is a lazy and ephemeral data structure. Users can persist RDDs in two ways:

- Via `cache`: A cached RDD remains lazy but is no longer ephemeral, meaning it is stored after its first evaluation for reuse.
- Via `save`: Writes the RDD to a distributed file system.

Users need to make a trade-off between access speed and storage space.

### Parallel Operations

- `reduce` - associative operation
- `collect`
- `foreach` - side effect

## Examples

- Log statistics
- Logistic regression
- ALS (Alternating Least Squares)

With the characteristics of being lazy and ephemeral, Spark behaves similarly to MapReduce. However, introducing a `cache` step can significantly accelerate computations.

## Implementation

- (At the time the paper was written) Built on top of Mesos
- The core of the implementation lies in the RDD interface, fully utilizing Scala's object-oriented and functional features:
  - `getPartitions`
  - `getIterator(partition)`
  - `getPreferredLocations(partition)` - for locality considerations
- Tasks (closures) in Scala are Java Objects, so they can be serialized and sent. During implementation, a bug in Scala was even discovered.
- Interpreter integration was also implemented.
- At the time the paper was written, shuffle had not yet been implemented.

## Experimental Results

- Significantly outperforms Hadoop, 10x faster
- Small dataset

## Related Work

- Distributed Shared Memory
- MapReduce
- Scala is similar to DryadLINQ

## Thoughts

- Very early-stage work; the authors were excited to share it. The 10x improvement over Hadoop was impressive.
- This article is relatively high-level.
- Functional, immutable, hence enabling lazy evaluation.
- Neither Hadoop nor Spark at that time could surpass MapReduce.