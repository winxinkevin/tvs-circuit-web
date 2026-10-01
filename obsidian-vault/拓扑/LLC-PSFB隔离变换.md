---
id: llc-psfb
title: "LLC/PSFB隔离变换"
category: "功率变换"
voltage: "400/800VDC → 48/12V"
updated: 2026-10-01
tags: [共用拓扑, 功率变换]
---

# LLC/PSFB隔离变换

> 全桥、谐振腔/移相电感、高频变压器和同步整流构成隔离DC/DC。

## 关键器件

- SiC MOS
- 同步整流MOS
- 谐振磁件
- 栅极Zener

## 保护位置与边界

栅源钳位、一次母线异常和二次整流尖峰分别处理。

## 关联案例

- [[案例/ORv3 48-54V机架Power Shelf|ORv3 48/54V机架Power Shelf]]

## 规格书、模型与论文

- [Infineon｜PC Power Supply Application](https://www.infineon.com/application/pc-power-supply)：应用资料；PFC、LLC及服务器/PC电源应用资料入口。（厂商页面，核验 2026-10-01）
- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=llc-psfb)

