---
id: ideal-diode-oring
title: "同步整流/理想二极管/ORing"
category: "功率变换"
voltage: "12–54VDC"
updated: 2026-10-01
tags: [共用拓扑, 功率变换]
---

# 同步整流/理想二极管/ORing

> 两路电源经反向串联MOS和理想二极管控制器汇入公共母线。

## 关键器件

- 低阻MOS
- 理想二极管控制器
- TVS
- 电流检测

## 保护位置与边界

每路入口独立限幅，公共母线TVS残压不能超过下游MOS耐压。

## 关联案例

- [[案例/ORv3 48-54V机架Power Shelf|ORv3 48/54V机架Power Shelf]]

## 规格书、模型与论文

- [Texas Instruments｜TVS Selection for Hot-swap and ORing MOSFETs](https://www.ti.com/document-viewer/lit/html/sszt363)：应用文章；热插拔、ORing MOS与TVS残压闭环。（官方网页，核验 2026-10-01）
- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=ideal-diode-oring)

