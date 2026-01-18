---
title: RDD 论文笔记
date: 2020-10-29
taxonomies:
  tags:
    - 技术
    - 分布式系统
    - 论文笔记
    - RDD
    - Spark
---

Resilient Distributed Datasets (RDDs) 就是一个对分布式系统的内存抽象。

本质上是一个限制严格的**共享内存**模型，只提供粗粒度的 transformation 操作

## 动机

### 问题

迭代性质（iterative）的分布式计算需要有（高效的）对迭代间的数据复用的能力

### 现状

- 现存（2012年）的分布式计算框架缺少一个能够充分利用（复用）集群内存的的抽象。
- 现存框架复用数据的唯一途径是启动多次分布式计算。

因此虽然解决问题的可解性问题，但数据复用依然是这类计算的性能瓶颈：大量的资源损耗在过于频繁的 I/O 上。

有一些工作试图解决这些问题，但是都只能支持特定的计算模式，不够通用。

主要的挑战是在计算的细粒度和通用性与容错性三者之间的取舍

## RDD

RDD 提供了一套对于分布式计算集群的内存抽象，很大程度上解决了上述问题，而其做法是舍弃了三者之间相对最不重要的一点：计算的粒度。

### Basics

RDD 的性质：

- Immutable
- Lazy

RDD 支持的操作：

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

Spark 实现了 RDD，提供了一套类似 DryadLINQ 的编程接口。

### RDD 的优势

主要是与类似（对集群内存进行建模）的抽象进行了对比，RDD 牺牲了细粒度的数据操作来实现其他方面（通用型，容错性，降级后的性能，一致性，掉队者问题，易用性）的吊打。

### RDD 的限制

RDD 不适合用于有大量细粒度读写的异步计算，比如爬虫的存储系统，对于类似应用作者建议了一些其他框架，这里不再赘述。

## Spark 的编程接口

使用 Scala 实现，因为 Scala 简洁高效。

这部分作者举了几个例子，这里略过。

## RDD 的表示

使用一个 DAG 来表示 RDD

### Dependencies

- narrow dependencies - 每个 parent 最多被一个 child 依赖
- Wide dependencies - 一个 parent 至少被一个 child 依赖

## 实现

- 使用 Mesos 做集群管理
- Job schedule 略
- Interpreter integration 略
- Memory management 略

## 评估

- 在迭代式任务上 20x Hadoop
- 用户分析程序上报告 40x Hadoop
- 节点失效之后可以很快重新计算出来
- 查询 1TB 数据 5-7 秒延迟

细节略过

## 讨论

他们丧心病狂地用 Spark 去模仿其他分布式计算框架以体现 RDD 的通用性质

具体略过

## Summary

- RDD/Spark 的最大优势是对整个 cluster 的内存建模，使得分布式计算可以将中间结果储存在内存之中，因此对于同一个 Dataset 的快速连续计算成为可能，而这一切都基于一个前提，那就是内存比硬盘快一个数量级（因此才能实现 Spark : Hadoop 40x 性能提升）
  可见软件创新的理论极限是硬件的硬性限制。