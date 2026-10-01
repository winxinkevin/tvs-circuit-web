---
id: telecom-oring
title: "-48V通信ORing与热插拔"
category: "输入与配电"
voltage: "-36至-75VDC"
updated: 2026-10-01
tags: [共用拓扑, 输入与配电]
---

# -48V通信ORing与热插拔

> 双路-48V经保险、理想二极管MOS和热插拔级汇入通信母线。

## 关键器件

- 100V MOS
- 理想二极管控制器
- TVS
- 保险丝

## 保护位置与边界

按负电源极性放置TVS，ORing MOS需覆盖输入反接和浪涌。

## 关联案例

- 暂无P1黄金案例；网站中的拓扑图可独立学习。

## 规格书、模型与论文

- [Texas Instruments｜TVS Selection for Hot-swap and ORing MOSFETs](https://www.ti.com/document-viewer/lit/html/sszt363)：应用文章；热插拔、ORing MOS与TVS残压闭环。（官方网页，核验 2026-10-01）
- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=telecom-oring)

