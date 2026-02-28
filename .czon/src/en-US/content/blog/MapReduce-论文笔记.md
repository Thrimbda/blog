---
title: MapReduce Paper Notes
date: 2019-11-25
taxonomies:
  tags:
    - Technology
    - Distributed Systems
    - Paper Notes
    - MapReduce
---

## Origin

While working with massive amounts of data, the authors wrote hundreds of data processing programs. These programs shared some characteristics:

1.  Simple business logic.
2.  Enormous data volume, requiring distributed computation across hundreds of computers.

This presented several challenges:

1.  How to parallelize computation.
2.  How to distribute data.
3.  How to handle fault tolerance.

A significant portion of the code in these data processing programs dealt with these common issues rather than the core business logic.

Therefore, a new abstraction was proposed, borrowing two concepts from Lisp and other functional languages. This abstraction allows engineers to focus on business logic while hiding the aforementioned non-functional requirements. This is MapReduce.

## Implementation

### Execution Logic

1.  Input data is split into M pieces and assigned to M Map workers.
2.  The Master acts as a data pipeline for scheduling.
3.  Map tasks invoke the user-defined Map function, storing intermediate results in local memory.
4.  Results are periodically dumped to disk and partitioned into R pieces for distribution to R Reduce workers.
5.  Reduce workers, after being assigned tasks by the Master, read the data via RPC. After reading, they perform a disk sort.
6.  Reduce workers iterate over the sorted data, invoking the user-defined Reduce function for incremental computation.
7.  Once completed, control returns to the user code.

It's evident that the partitioning method is crucial, ideally avoiding unnecessary shuffling.

### Data Structures

*   Stores the state (idle/in-progress/completed) for each map/reduce task.
*   For each completed map task, stores the location and size of intermediate files and pushes this information to reduce workers.

### Fault Tolerance

*   The Master is assumed to rarely fail, though its state can be periodically checkpointed for recovery.
*   The Master periodically pings workers. If a worker does not respond, it is marked as failed.
    *   For map tasks, all tasks (completed or not) on that worker are reset and rescheduled. This is because map results are stored locally on the worker, making them inaccessible if the worker fails.
    *   For reduce tasks, only uncompleted tasks are rescheduled. This is because reduce results are written to a globally accessible file system.
    *   After a map task is rescheduled, all reduce workers are notified and will fetch data from the new location.

### Backup Tasks

The last few tasks being executed can significantly slow down the overall MapReduce job, often due to "stragglers" (tasks that run unusually slowly for various reasons). In this case, the Master initiates backup tasks for the last few in-progress tasks. This increases resource usage by a few percentage points but can drastically reduce execution time.

## Improvements

### Partition

Since output files are distributed, a user-supplied partition function can be used to aggregate results of related keys together.

### Local Debugging

Can be run locally for debugging purposes.

## Performance

Tested on two large clusters, one for sorting and one for pattern matching.

### Grep

Searched for a pattern in 10^10 100-byte files. 1.7k machines completed the task in 150 seconds, with about one minute spent distributing the program. Impressive.

### Sort

Sorted 10^10 100-byte files.

## Summary

Confident and well-founded.