---
id: three-phase-afe
title: "三相AC有源前端"
category: "输入与配电"
voltage: "三相AC → DC-Link"
updated: 2026-10-01
tags: [共用拓扑, 输入与配电]
---

# 三相AC有源前端

> 三相电抗器、六开关AFE和DC-Link电容构成可回馈整流前端。

## 关键器件

- SiC MOS/IGBT
- FRED/SiC SBD
- DC-Link电容
- 栅极Zener

## 保护位置与边界

交流入口SPD、DC-Link过压和每桥臂栅源钳位分层设置。

## 关联案例

- [[案例/MVAC到800VDC三段式SST|MVAC到800VDC三段式SST]]

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）
- [Infineon｜IMW65R027M1H CoolSiC MOSFET](https://www.infineon.com/assets/row/public/documents/24/49/infineon-imw65r027m1h-datasheet-en.pdf)：规格书/模型；650V SiC器件参考规格书。（官方PDF，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=three-phase-afe)

