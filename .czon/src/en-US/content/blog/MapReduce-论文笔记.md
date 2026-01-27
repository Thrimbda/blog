---
"title": "MapReduce Paper Notes"
"summary": "This article is a set of notes on the MapReduce paper, providing a detailed analysis of MapReduce's origins, execution logic, data structures, fault tolerance mechanisms, and performance optimizations. The article points out that MapReduce was proposed as an abstract model to address the challenges of parallel computation, data distribution, and fault tolerance in large-scale data processing, drawing inspiration from the Map and Reduce concepts in functional programming. The implementation section covers key aspects such as task partitioning, Master scheduling, intermediate result storage, and backup tasks. For fault tolerance, reliability is ensured through Master monitoring and task rescheduling. Performance tests demonstrate its efficiency in grep and sorting tasks. The conclusion emphasizes that MapReduce provides a simple yet powerful programming model for distributed computing."
"tags":
  - "MapReduce"
  - "Distributed Systems"
  - "Paper Notes"
  - "Fault Tolerance"
  - "Performance Optimization"
  - "Data Processing"
"date": "November 25, 2019"
---

## Origins

The authors, while working with massive amounts of data, wrote hundreds of data processing programs. These programs shared some characteristics:

1.  Simple business logic.
2.  Enormous data volume, requiring distributed computation across hundreds of computers.

This presented several challenges:

1.  How to parallelize computation.
2.  How to distribute data.
3.  How to handle faults.

A significant portion of the code in these data processing programs was dedicated to handling these common issues rather than implementing business logic.

Therefore, a new abstraction was proposed, borrowing two concepts from Lisp and other functional languages. This allows engineers to focus on business logic while hiding the aforementioned non-functional requirements. This is MapReduce.

## Implementation

### Execution Logic

1.  Input data is split into M pieces and assigned to M Map workers.
2.  The Master acts as a data pipeline for scheduling.
3.  Map tasks invoke the user-defined Map function and store results in local memory.
4.  Results are periodically dumped to disk and partitioned into R pieces for R Reduce workers.
5.  Reduce workers, after being assigned tasks by the Master, read the data via RPC. After reading, they sort the data on disk.
6.  Reduce workers iterate over the sorted data, invoking the user-defined Reduce function for incremental computation.
7.  Upon completion, control returns to the user code.

It's evident that the partitioning method is crucial, ideally avoiding unnecessary shuffling.

### Data Structures

*   Stores the state (idle/in-progress/completed) for each map/reduce task.
*   For each completed map task, stores the location and size of intermediate files and pushes this information to reduce workers.

### Fault Tolerance

*   The Master is assumed to rarely fail, though its state can be periodically checkpointed for recovery.
*   The Master periodically pings workers. If a worker is unreachable, it is marked as failed.
    *   For map tasks, whether completed or not, they are all reset and rescheduled. This is because map results are stored locally on the worker, so if the worker fails, the results become inaccessible.
    *   For reduce tasks, only uncompleted ones are rescheduled. This is because reduce results are placed in a globally accessible file system.
    *   After a map task is rescheduled, all reduce workers are notified and will fetch data from the new location.

### Backup Tasks

The last few executing tasks can significantly slow down the overall MapReduce job, possibly due to "stragglers" – tasks that run unusually slowly for various reasons. In this case, the Master initiates backup tasks for the last few in-progress tasks. This increases resource usage by a few percentage points but can drastically reduce execution time.

## Refinements

### Partitioning

Since output files are distributed, a user-supplied partition function can be used to aggregate results of related keys together.

### Local Debugging

Can be run locally for debugging.

## Performance

Tested on two large clusters, one for sorting and one for pattern matching.

### Grep

Searched for a pattern in 10^10 100-byte files. 1.7k machines completed the task in 150 seconds, with one minute spent distributing the program. Impressively efficient.

### Sort

Sorted 10^10 100-byte files.

## Conclusion

Confident and well-founded.