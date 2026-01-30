---
"title": "GFS Paper Notes"
"summary": "This article summarizes the core design of the GFS distributed file system. GFS is designed for cluster environments composed of inexpensive hardware, where partial failures are the norm. It primarily stores and manages large files, optimizing for append-heavy file operations. The design considers specific application scenarios, supporting large streaming reads and a small number of random reads, and optimizes for multiple clients writing concurrently to the same file. The article also outlines GFS's design assumptions, including modeling machine failures, optimizing for large file management, and the characteristics of read and write workloads."
"tags":
  - "GFS"
  - "Distributed Systems"
  - "File System"
  - "Paper Notes"
  - "Technology"
"date": "2020-10-29"
---

GFS is a distributed file system with the following four characteristics:

1. **Modeling Machine Failures** – GFS runs on a cluster composed of a large number of inexpensive hardware components, so the cluster will experience partial failures due to various reasons.
2. **Stores Large Files** – (By 2003 standards) large files of several GB are common, so I/O operations and block sizes need to be specifically considered.
3. **File Operations Are Append-Heavy** – This is its primary optimization target.
4. **File System Design Considers Application Usage Scenarios** – Greatly improves flexibility, which is a benefit of a closed system.

## Design Overview

### Assumptions

- Partial failures are the norm – Requires monitoring, checking, fault tolerance, and self-healing capabilities.
- Large files are the norm – Optimizations are primarily focused on managing large files.
- Read workloads mainly consist of the following two types:
  - Large streaming reads – Around 1MB per read, continuous reading.
  - Small random reads – A few KB per read, though applications do not truly tolerate random reads.
- Write workloads mainly consist of large sequential writes, similar to read operations, with few modifications, so no specific optimizations are made.
- Optimized for multiple clients writing concurrently to the same file – Achieved through well-defined atomic operations.