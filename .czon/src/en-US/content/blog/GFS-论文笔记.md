---
title: GFS Paper Notes
date: 2020-10-29
taxonomies:
  tags:
    - technology
    - distributed systems
    - paper notes
    - GFS
    - file system
---

GFS is a distributed file system with the following four characteristics:

1. **Modeling machine failures** – GFS runs on a cluster composed of large numbers of inexpensive hardware, so partial failures in the cluster occur for various reasons.
2. **Stores large files** – (By 2003 standards) files of several GB are common, so I/O operations and block sizes need to be specially considered.
3. **File operations are primarily append-based** – This is its main optimization goal.
4. **The file system design considers application usage scenarios** – Greatly improves flexibility, which is an advantage of a closed system.

## Design Overview

### Assumptions

- Partial failures are normal – Requires monitoring, checking, fault tolerance, and self-healing capabilities.
- Large files are normal – Optimized mainly for managing large files.
- Read workloads mainly fall into two types:
  - Large streaming reads – Around 1 MB per read, continuous reading.
  - Small random reads – A few KB per read, though applications do not truly tolerate random reads.
- Write workloads are primarily large sequential writes, similar to read operations, with few modifications, so no optimization is done for them.
- Optimized for multiple clients writing to the same file concurrently – Achieved through well-defined atomic operations.