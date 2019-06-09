---
title: Thrive-voice设计思路
date: 2017-5-2
tag: 设计
categories: 设计
---

## 要做什么

一个IP电话。

## 怎么做

简单的思路：

- UDP实现通信
- TCP做目录服务

## 设计

![thrive-voice top design](C:\Users\Macsnow\Pictures\草图\Thrive-voice顶层设计.png)

### 所要实现的功能

1. 拥有一个CLI
2. 用户注册以及登陆（怎么实现用户信息的储存，C/S架构）
3. 查询所呼叫用户状态
4. 呼叫在线用户
5. 通话

## 实现

### CLI

- python fire
- docopt

### 用户管理

- Flask micro service

#### 存储

- 文件
- 数据库

### 查询

同上

### 呼叫

服务器发送被叫用户的IP地址以及端口号

被叫方可选择接听或者不接听，接听后手动模拟链接建立过程

UDP发包

### 通话

使用pyaudio采集声音然后通过UDP发送

如何实现同时录与听

![thrive-voice-detail-design](C:\Users\Macsnow\Pictures\草图\Thrive-voice细化设计.png)

## 时序图

![thrive-voice-sequence-diagram](C:\Users\Macsnow\Pictures\草图\Thrive-voice打电话时序图.png)

## 状态码

### external

| code | event      |
| ---- | ---------- |
| 0    | accepted   |
| 1    | denied     |
| 2    | terminated |

### internal

| code | event   |
| ---- | ------- |
| m    | message |
| e    | error   |
| c    | control |