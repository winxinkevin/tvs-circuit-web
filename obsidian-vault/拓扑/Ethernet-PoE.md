---
id: poe
title: "Ethernet/PoE"
category: "接口与通信"
voltage: "-57V PoE"
updated: 2026-10-01
tags: [共用拓扑, 接口与通信]
---

# Ethernet/PoE

> RJ45、磁性器件、桥式整流、差/共模保护与PD控制器的标准受电端。

## 关键器件

- 桥堆
- TVS
- GDT
- PD控制器

## 保护位置与边界

浪涌回路区分线对间与线对地，保护件放在磁性器件与PD接口的对应侧。

## 关联案例

- 暂无P1黄金案例；网站中的拓扑图可独立学习。

## 规格书、模型与论文

- [Texas Instruments｜PoE Lightning Surge Protection](https://www.ti.com/lit/pdf/slua736)：应用笔记；PoE受电端雷击浪涌路径和保护设计。（官方PDF，核验 2026-10-01）
- [Texas Instruments｜PoE Circuit Protection](https://www.ti.com/lit/an/slva233a/slva233a.pdf)：应用笔记；PoE PD接口保护器件与连接方式。（官方PDF，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=poe)

