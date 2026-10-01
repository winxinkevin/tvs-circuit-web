---
id: bms-precharge
title: "BMS/预充/接触器"
category: "驱动与执行"
voltage: "48–1500V电池"
updated: 2026-10-01
tags: [共用拓扑, 驱动与执行]
---

# BMS/预充/接触器

> 背靠背充放电MOS、预充电阻、主接触器与DC-Link组成电池能量入口。

## 关键器件

- 背靠背MOS
- 预充电阻
- 接触器
- 母线TVS

## 保护位置与边界

TVS只吸收瞬态，持续回馈和预充能量必须由系统级路径承担。

## 关联案例

- [[案例/人形机器人电池—BMS—预充—SSCB|人形机器人电池—BMS—预充—SSCB]]

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）
- [Texas Instruments｜How to Select a Surge Diode](https://www.ti.com/lit/an/slvae37/slvae37.pdf)：应用笔记；从VRWM、击穿、残压和脉冲功率选择TVS。（官方PDF，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=bms-precharge)

