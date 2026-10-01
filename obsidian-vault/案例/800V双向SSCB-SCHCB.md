---
id: sscb-800v
title: "800V双向SSCB/SCHCB"
domain: ai-dc
voltage: "800VDC双向配电"
status: P1已建模
updated: 2026-10-01
tags: [应用案例, AI数据中心, P1]
---

# 800V双向SSCB/SCHCB

> 背靠背SiC开关、隔离触点、电流检测和MOV/TVS吸能构成完整切断链，页面按毫秒/微秒事件顺序展示。

## 系统链路

1. 800V源
2. 线路电感
3. 电流检测
4. 背靠背SiC
5. 吸能支路
6. 隔离触点
7. 负载

## 器件位点

- **SiC MOS｜双向半导体开关阵列**：串联/并联1200V器件。关键检查：SOA、短路时间、均流均压。
- **TVS/MOV｜断路器两端吸收线路能量**：按L·I²/2与钳位电压设计。关键检查：能量不是只看峰值功率。
- **Zener/ESD｜栅极与电流检测接口**：隔离驱动局部钳位。关键检查：故障时驱动掉电仍须安全关断。

## 应力闭环

- **线路储能**：E=L·I²/2；判据：吸能支路热容量与重复间隔。
- **关断峰值**：Vbus+Vclamp+寄生过冲；判据：低于串联器件总耐压与单管均压限值。
- **导通损耗**：I²·RDS(on)·器件数；判据：结温、冷却与效率共同闭环。

## 为什么这样选

- 半导体快速限流，机械隔离触点提供可见隔离和低待机损耗
- 双向DC必须使用可双向阻断的开关组织

## 不采用的方案

- 单个MOS体二极管不能实现双向阻断
- 没有吸能支路的快速关断会把线路能量转化为器件过压

## 标准

- [IEC 60947-10:2026](https://webstore.iec.ch/en/publication/67514)：≤1000VAC/1500VDC半导体与混合断路器（现行）
- [800 VDC Architecture](https://developer.nvidia.com/blog/nvidia-800-v-hvdc-architecture-will-power-the-next-generation-of-ai-factories/)：AI数据中心从设施到机架的800VDC架构（官方架构）

## 规格书、模型与论文

- [Infineon｜750V CoolSiC MOSFET](https://www.infineon.com/products/power/mosfet/silicon-carbide/750v)：规格书/设计资源；SSCB与800VDC候选技术资源入口
- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码；页面明确要求最终硬件验证
- [Littelfuse｜SMCJ TVS Diode Series](https://www.littelfuse.com/products/tvs-diodes/surface-mount/smcj.aspx)：规格书；高功率TVS系列参考；残压必须按脉冲条件核对

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=sscb-800v)
