---
title: Spark 论文笔记
date: 2022-01-10
taxonomies:
  tags:
    - 技术
    - 分布式系统
    - 论文笔记
    - Spark
    - RDD
---

MapReduce 非常成功，然而这些围绕无环图建立的系统大多不通用，这时候 Spark 横空出世，**通过一种名叫 RDD 的分布式数据结构**，提出了一种可以支持：

> those that reuse a working set of data across multiple parallel operations.

的分布式计算框架。

RDD (Resilient Distributed Dataset) 是一种可以在丢失后通过 DAG 中前置节点被重建的只读数据结构。

Spark 通过 Scala 实现，Scala 的特性：
- 在 JVM 上实现的语言
- 支持 functional programming
- 面向对象

## 编程模型

### RDD介绍

RDD 可以通过四种方式被创建

1. 从文件系统中创建，例如 HDFS
2. 从 Scala collection 中被创建
3. 从一个已有的 RDD 变换而来，（通过 flatMap，map，filter 等）
4. 通过更改一个已有 RDD 的持久化方式（RDD 是只读的，一旦有更改操作就会逻辑上新创建一个 RDD）

此外 RDD 是一种 lazy 并且 ephemeral 的数据结构，用户可以通过两种方式持久化 RDD：

- 通过 cache，cache 后的 RDD 依然是 lazy 的，但不是 ephemeral 的，意思是在第一次求值之后会被存起来等待复用
- 通过 save，写入到分布式文件系统中

用户需要在访问速度和存储空间两者中做 trade-off

### 并行操作

- reduce - 结合律
- collect
- foreach - side effect

## 例子

- log statistics
- logistic regression
- ALS

在 lazy 和 ephermal 两个特性的加持下 Spark 表现就像 MapReduce一样，然而只要在其中加入 cache 的步骤就可以显著加速运算

## 实现

- （论文写就时的版本）构建于 Mesos 之上
- 实现的核心在于 RDD interface，充分利用了 Scala 的面向对象和函数式特性
  - getPartitions
  - getIterator(partition)
  - getPreferredLoacations(partition) 为了本地性考虑
- task (clousures) 在 Scala 中是 Java Object，因此可以序列化并发送，在实现的过程中甚至还发现了一个 Scala 的bug
- 还搞了解释器集成
- 截至论文写就的时候，还没有实现 shuffle

## 实验结果

- 吊打 Hadoop，10x 快
- 数据集小

## 相关工作

- Distributed Shared Memory
- MapReduce
- Scala 类似 DryadLINQ

## 感想

- 还很早期的工作，作者很激动地拿出来分享，10x 于 Hadoop 的效果有点炸
- 本篇文章较为笼统
- functional，immutable，因此可以 lazy evaluate
- 无论是 Hadoop，还是那个时候的 Spark，都打不过 MapReduce