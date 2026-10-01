---
id: motor-inductive
title: "BLDC/PMSM/感性负载"
category: "驱动与执行"
voltage: "24–800VDC"
updated: 2026-10-01
tags: [共用拓扑, 驱动与执行]
---

# BLDC/PMSM/感性负载

> 三相桥驱动PMSM，并单列抱闸/继电器线圈的续流与快速释放支路。

## 关键器件

- MOS/IGBT
- PMSM
- TVS/Zener
- 电流传感器

## 保护位置与边界

再生能量回到DC-Link或制动单元，不能仅靠TVS长期耗散。

## 关联案例

- [[案例/机器人关节三相伺服与能量回馈|机器人关节三相伺服与能量回馈]]

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）
- [Littelfuse｜SMCJ TVS Diode Series](https://www.littelfuse.com/~/media/electronics/datasheets/tvs_diodes/littelfuse_tvs_diode_smcj_datasheet.pdf.pdf)：规格书；高功率TVS系列；残压必须按实际脉冲电流核对。（官方PDF，核验 2026-10-01）；[备用入口](https://www.littelfuse.com/assetdocs/littelfuse-tvs-diode-smcj-datasheet?assetguid=37388813-0d6d-4329-969b-1aa8b7614ac1)

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=motor-inductive)

