---
id: humanoid-energy
title: "人形机器人电池—BMS—预充—SSCB"
domain: robotics
voltage: "48–96V电池母线"
status: P1已建模
updated: 2026-10-01
tags: [应用案例, 具身智能, P1]
---

# 人形机器人电池—BMS—预充—SSCB

> 从电池包、背靠背充放电MOS、预充与接触器进入分布式关节母线，覆盖跌倒、堵转和回馈工况。

## 系统链路

1. 电池包
2. 保险丝
3. BMS MOS
4. 预充支路
5. 主接触器
6. SSCB
7. DC母线
8. 关节驱动

## 器件位点

- **MOS｜BMS背靠背充放电开关**：80–150V低阻MOS并联。关键检查：SOA、雪崩、均流和热失控。
- **TVS/Zener｜母线局部钳位、栅极和接触器线圈**：按最高充电电压与回馈峰值选择。关键检查：TVS不能吸收持续再生能量。
- **SSCB｜肢体分区快速隔离**：低压背靠背MOS方案。关键检查：误触发、恢复策略和安全状态。

## 应力闭环

- **最高充电母线**：串数×单体最高电压；判据：所有保护器件VRWM基础。
- **跌倒/堵转回馈**：机械能回灌DC-Link；判据：制动、回充和过压关断协同。
- **预充能量**：Cbus·V²/2；判据：预充电阻脉冲与接触器时序。

## 为什么这样选

- 把电池安全、母线故障隔离和关节保护拆成三个层级
- 背靠背MOS兼顾充放电控制和双向阻断

## 不采用的方案

- TVS不能代替BMS过充或持续回馈控制
- 工业机器人标准不能自动覆盖所有服务型人形机器人场景

## 标准

- [ISO 10218-1:2025](https://www.iso.org/standard/73933.html)：工业机器人本体安全要求（现行）
- [IEC 61800-5-2:2016](https://webstore.iec.ch/en/publication/24556)：安全相关电力驱动系统功能安全（现行/需跟踪修订）
- [IEC 60947-10:2026](https://webstore.iec.ch/en/publication/67514)：≤1000VAC/1500VDC半导体与混合断路器（现行）

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码；页面明确要求最终硬件验证
- [Littelfuse｜SMCJ TVS Diode Series](https://www.littelfuse.com/products/tvs-diodes/surface-mount/smcj.aspx)：规格书；高功率TVS系列参考；残压必须按脉冲条件核对

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=humanoid-energy)
