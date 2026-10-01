---
id: industrial-io
title: "CAN/RS-485/24V I/O"
category: "接口与通信"
voltage: "5/24V端口"
updated: 2026-10-01
tags: [共用拓扑, 接口与通信]
---

# CAN/RS-485/24V I/O

> 串联阻抗、共模扼流圈、总线TVS与收发器构成工业长线端口。

## 关键器件

- 双向TVS
- PTC/电阻
- 共模扼流圈
- 收发器

## 保护位置与边界

TVS工作电压需覆盖总线共模范围，残压需低于收发器绝对最大值。

## 关联案例

- 暂无P1黄金案例；网站中的拓扑图可独立学习。

## 规格书、模型与论文

- [Texas Instruments｜Protecting Isolated CAN Systems](https://www.ti.com/lit/an/slla419/slla419.pdf)：应用笔记；隔离CAN端口的浪涌、ESD和保护连接。（官方PDF，核验 2026-10-01）
- [Texas Instruments｜Isolated RS-485 with Surge Protection](https://www.ti.com/tool/TIDA-00730)：参考设计；工业RS-485隔离与浪涌保护参考设计。（厂商页面，核验 2026-10-01）
- [Texas Instruments｜System-Level ESD Protection Guide](https://www.ti.com/lit/sg/sszb130e/sszb130e.pdf)：设计指南；接口ESD选型、布局和系统级测试指南。（官方PDF，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=industrial-io)

