---
id: pfc
title: "Boost/图腾柱PFC"
category: "功率变换"
voltage: "AC → 380–420VDC"
updated: 2026-10-01
tags: [共用拓扑, 功率变换]
---

# Boost/图腾柱PFC

> 桥式Boost或图腾柱PFC的电感、开关、二极管和母线电容功率回路。

## 关键器件

- 桥堆
- SiC MOS
- SiC SBD/FRED
- DC-Link电容

## 保护位置与边界

MOV处理入口浪涌；开关节点重复尖峰优先由布局与RC/RCD Snubber处理。

## 关联案例

- [[案例/ORv3 48-54V机架Power Shelf|ORv3 48/54V机架Power Shelf]]

## 规格书、模型与论文

- [Infineon｜PC Power Supply Application](https://www.infineon.com/application/pc-power-supply)：应用资料；PFC、LLC及服务器/PC电源应用资料入口。（厂商页面，核验 2026-10-01）
- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=pfc)

