---
"title": "GFS Paper Notes"
"summary": "This article contains notes on the GFS (Google File System) paper, summarizing four core characteristics of GFS as a distributed file system: modeling machine failures, storing large files, focusing on append operations, and designing with application scenarios in mind. The article also elaborates on GFS's design assumptions, including that partial failures are the norm, large files are the norm, read workloads consist of large streaming reads and small random reads, write workloads are primarily large sequential writes, and optimizations for multiple clients writing to the same file concurrently. These characteristics and assumptions together form the foundation of GFS's efficient, reliable, and scalable architecture for large-scale data processing."
"tags":
  - "GFS"
  - "Distributed Systems"
  - "File System"
  - "Paper Notes"
  - "Technology"
  - "Big Data"
  - "Storage"
  - "Google"
"date": "2020-10-29"
---

GFS is a distributed file system with the following four characteristics:

1.  **Modeling Machine Failures** – GFS runs on a cluster composed of a large number of inexpensive hardware components, so partial failures in the cluster are expected due to various reasons.
2.  **Stores Large Files** – (By 2003 standards) large files of several GB are the norm, so I/O operations and block sizes are designed accordingly.
3.  **File Operations are Primarily Appends** – This is its main optimization target.
4.  **File System Design Considers Application Usage Scenarios** – Greatly improves flexibility, which is a benefit of a closed system.

## Design Overview

### Assumptions

*   Partial failures are the norm – Requires monitoring, checking, fault tolerance, and self-healing capabilities.
*   Large files are the norm – Optimizations focus primarily on managing large files.
*   Read workloads mainly consist of the following two types:
    *   Large streaming reads – Typically around 1MB per read, continuous reading.
    *   Small random reads – Typically a few KB per read, although applications do not truly tolerate random reads well.
*   Write workloads are primarily large sequential writes, similar to read operations, with infrequent modifications, so no specific optimizations are made for them.
*   Optimized for multiple clients writing to the same file concurrently – Achieved through well-defined atomic operations.