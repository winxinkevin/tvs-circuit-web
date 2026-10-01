---
id: buck-vrm
title: "Buck/Boost/多相VRM"
category: "功率变换"
voltage: "54/12V → 亚伏"
updated: 2026-10-01
tags: [共用拓扑, 功率变换]
---

# Buck/Boost/多相VRM

> 多相半桥、电感并联汇流和输出去耦构成高动态负载电源。

## 关键器件

- DrMOS/MOS
- 功率电感
- 输出电容
- 控制器

## 保护位置与边界

输入TVS负责插拔瞬态；核心轨droop由控制环和去耦解决。

## 关联案例

- [[案例/GPU 54V-12V到核心多相VRM|GPU 54V/12V到核心多相VRM]]

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）
- [Texas Instruments｜How to Select a Surge Diode](https://www.ti.com/lit/an/slvae37/slvae37.pdf)：应用笔记；从VRWM、击穿、残压和脉冲功率选择TVS。（官方PDF，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=buck-vrm)

