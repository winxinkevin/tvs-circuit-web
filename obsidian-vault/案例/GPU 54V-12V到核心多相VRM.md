---
id: gpu-vrm
title: "GPU 54V/12V到核心多相VRM"
domain: ai-dc
voltage: "54V → 12V → 亚伏核心电压"
status: P1已建模
updated: 2026-10-01
tags: [应用案例, AI数据中心, P1]
---

# GPU 54V/12V到核心多相VRM

> 将板卡输入保护、中间总线和多相Buck分开；TVS保护输入与辅助接口，核心负载跃变由控制环和去耦处理。

## 系统链路

1. 54V母排
2. 热插拔
3. 隔离IBC
4. 12V总线
5. 多相Buck
6. 核心电压
7. GPU/ASIC

## 器件位点

- **80/100V MOS｜54V热插拔与IBC一次侧**：低RDS(on)+强SOA器件。关键检查：热插拔SOA不同于开关FOM。
- **DrMOS/MOS｜12V多相Buck**：低Qg、低寄生封装。关键检查：效率、相数和瞬态响应。
- **TVS/ESD｜54V/12V输入及管理接口**：输入TVS；低电容接口阵列。关键检查：核心轨不使用大功率TVS处理负载跃变。

## 应力闭环

- **54V插拔过冲**：背板L与输入C振铃；判据：Hot-swap MOS VDS/SOA。
- **GPU负载阶跃**：di/dt与控制环带宽；判据：由相数、输出电感和去耦闭环。
- **DrMOS开关节点**：12V+寄生尖峰；判据：优先优化布局与Snubber。

## 为什么这样选

- 按54V输入、12V中间总线和核心轨分层设计
- 输入TVS选型由持续高线和Hot-swap MOS耐压共同确定

## 不采用的方案

- 不能把GPU droop误判为TVS问题
- 不能把相邻TVS功率等级当成残压档位的替代

## 标准

- [OCP MGX Rack and Trays](https://www.opencompute.org/documents/mgx-accelerated-computing-rack-and-trays-specification-1-1-pdf-1)：48/51/54V机架母排、PDB及机械电气接口（官方公开）
- [ORv3 HVDC-LVDC 100kW Power Shelf](https://www.opencompute.org/documents/orv3-hvdc-lvdc-100kw-power-shelf-spec-1-0-0-pdf)：HVDC到48V Power Shelf及监控接口（官方公开）

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码；页面明确要求最终硬件验证
- [Littelfuse｜SMCJ TVS Diode Series](https://www.littelfuse.com/products/tvs-diodes/surface-mount/smcj.aspx)：规格书；高功率TVS系列参考；残压必须按脉冲条件核对

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=gpu-vrm)
