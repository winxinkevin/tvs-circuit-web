---
id: gate-clamp
title: "栅极驱动/有源钳位/Snubber"
category: "保护单元"
voltage: "驱动与开关节点"
updated: 2026-10-01
tags: [共用拓扑, 保护单元]
---

# 栅极驱动/有源钳位/Snubber

> 隔离驱动、Rg、栅源Zener、Miller Clamp、DESAT与RC/RCD Snubber组合。

## 关键器件

- 栅极Zener
- 驱动器
- RC/RCD
- TVS

## 保护位置与边界

栅源钳位不能代替DESAT软关断；Snubber针对重复寄生能量。

## 关联案例

- [[案例/MVAC到800VDC三段式SST|MVAC到800VDC三段式SST]]
- [[案例/机器人关节三相伺服与能量回馈|机器人关节三相伺服与能量回馈]]

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）
- [Texas Instruments｜TVS Diodes at High Temperature](https://www.ti.com/lit/pdf/slva930)：应用笔记；温度对TVS漏电、击穿和钳位性能的影响。（官方PDF，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=gate-clamp)

