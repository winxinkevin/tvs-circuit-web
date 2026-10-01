---
id: orv3-48v-rack
title: "ORv3 48/54V机架Power Shelf"
domain: ai-dc
voltage: "277VAC/三相AC → 48/54VDC"
status: P1已建模
updated: 2026-10-01
tags: [应用案例, AI数据中心, P1]
---

# ORv3 48/54V机架Power Shelf

> 从AC入口、桥式/图腾柱PFC、隔离LLC到冗余ORing和1400A级母排，区分主功率器件与板级瞬态保护。

## 系统链路

1. AC配电
2. Power Shelf
3. PFC母线
4. 隔离DC/DC
5. ORing
6. 48/54V母排
7. GPU Tray

## 器件位点

- **桥堆/SiC SBD｜AC整流与PFC换流**：GBU/SiC二极管等级。关键检查：IF、VRRM、浪涌电流、反向恢复。
- **MOS/SiC MOS｜PFC、LLC、同步整流与ORing**：650V SiC + 80/100V低阻MOS。关键检查：RDS(on)、Eoss、Qg、SOA。
- **TVS/Zener｜54V母排、驱动与辅助电源**：58–64V TVS；15–18V栅极钳位。关键检查：VRWM、VC、IPP、寄生过冲。

## 应力闭环

- **48/54V母排持续高线**：按40–59.5V范围核对；判据：TVS不得在正常高线导通。
- **热插拔关断过冲**：L·di/dt + TVS动态残压；判据：低于ORing/Hot-swap MOS VDS。
- **同步整流尖峰**：漏感+结电容+时序；判据：Snubber承担周期能量，TVS只作异常限幅。

## 为什么这样选

- 把高能AC浪涌、开关周期尖峰和54V母排插拔分开处理
- 48/54V TVS必须基于母排高线与MOS绝对最大值闭环

## 不采用的方案

- 不能让板级TVS替代AC入口SPD
- 不能把TVS直接并在GPU核心电压轨处理负载跃变

## 标准

- [OCP MGX Rack and Trays](https://www.opencompute.org/documents/mgx-accelerated-computing-rack-and-trays-specification-1-1-pdf-1)：48/51/54V机架母排、PDB及机械电气接口（官方公开）
- [IEC 62477-1:2022](https://webstore.iec.ch/en/publication/28936)：功率电子变换系统安全（现行）

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码；页面明确要求最终硬件验证
- [Infineon｜IMW65R027M1H CoolSiC MOSFET](https://www.infineon.com/assets/row/public/documents/24/49/infineon-imw65r027m1h-datasheet-en.pdf)：规格书/模型；650V SiC器件参考；模型需核对适用层级
- [Littelfuse｜SMCJ TVS Diode Series](https://www.littelfuse.com/products/tvs-diodes/surface-mount/smcj.aspx)：规格书；高功率TVS系列参考；残压必须按脉冲条件核对

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=orv3-48v-rack)
