---
id: flyback
title: "Flyback/Forward辅助电源"
category: "功率变换"
voltage: "高压DC → 辅助低压"
updated: 2026-10-01
tags: [共用拓扑, 功率变换]
---

# Flyback/Forward辅助电源

> 一次MOS、隔离变压器、RCD钳位、二次整流和输出滤波组成辅助电源。

## 关键器件

- MOS
- FRED/Schottky
- RCD/TVS钳位
- 光耦

## 保护位置与边界

一次漏感尖峰由RCD/有源钳位处理；TVS只在能量和重复率允许时使用。

## 关联案例

- 暂无P1黄金案例；网站中的拓扑图可独立学习。

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）
- [Texas Instruments｜How to Select a Surge Diode](https://www.ti.com/lit/an/slvae37/slvae37.pdf)：应用笔记；从VRWM、击穿、残压和脉冲功率选择TVS。（官方PDF，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=flyback)

