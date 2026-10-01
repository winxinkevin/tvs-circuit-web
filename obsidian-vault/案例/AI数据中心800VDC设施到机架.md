---
id: ai-800v-hvdc
title: "AI数据中心800VDC设施到机架"
domain: ai-dc
voltage: "MVAC/415VAC → 800VDC → 54/12V"
status: P1已建模
updated: 2026-10-01
tags: [应用案例, AI数据中心, P1]
---

# AI数据中心800VDC设施到机架

> 设施侧集中转换、800V母排、分级断路和机架隔离DC/DC，重点学习电压域、接地、预充及故障选择性。

## 系统链路

1. 电网/MVAC
2. 集中整流或SST
3. 800VDC母排
4. 行级SSCB
5. 机架DC/DC
6. 54/12V
7. GPU VRM

## 器件位点

- **SiC MOS/二极管｜800V输入与隔离DAB/CLLC**：1200V/1700V SiC等级。关键检查：VDS裕量、短路耐受、动态损耗。
- **SSCB器件｜行级/机架故障隔离**：串联或多电平SiC开关。关键检查：关断能量、I²t、钳位路径。
- **TVS/Zener/ESD｜48/54V二级、驱动、采样与通信**：按各低压域独立选择。关键检查：不得跨越绝缘边界错误泄放。

## 应力闭环

- **800V母排最大工作电压**：必须使用项目定义而非名称推断；判据：器件额定与爬电距离共同校核。
- **母线短路**：di/dt由线路L与源阻抗决定；判据：SSCB检测+关断+吸能全链闭环。
- **机架输入预充**：Cbus与允许浪涌电流；判据：预充电阻脉冲能量与旁路时序。

## 为什么这样选

- 800V架构减少多级AC/DC转换和配电电流
- 保护方案按设施、行、机架、板卡四级选择性设计

## 不采用的方案

- 不能把-48V通信经验直接放大到800V
- 不能只按稳态电流选择SSCB而忽略线路电感能量

## 标准

- [800 VDC Architecture](https://developer.nvidia.com/blog/nvidia-800-v-hvdc-architecture-will-power-the-next-generation-of-ai-factories/)：AI数据中心从设施到机架的800VDC架构（官方架构）
- [ORv3 HVDC-LVDC 100kW Power Shelf](https://www.opencompute.org/documents/orv3-hvdc-lvdc-100kw-power-shelf-spec-1-0-0-pdf)：HVDC到48V Power Shelf及监控接口（官方公开）
- [IEC 60947-10:2026](https://webstore.iec.ch/en/publication/67514)：≤1000VAC/1500VDC半导体与混合断路器（现行）
- [IEC 62477-1:2022](https://webstore.iec.ch/en/publication/28936)：功率电子变换系统安全（现行）

## 规格书、模型与论文

- [Infineon｜750V CoolSiC MOSFET](https://www.infineon.com/products/power/mosfet/silicon-carbide/750v)：规格书/设计资源；SSCB与800VDC候选技术资源入口
- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码；页面明确要求最终硬件验证
- [Littelfuse｜SMCJ TVS Diode Series](https://www.littelfuse.com/products/tvs-diodes/surface-mount/smcj.aspx)：规格书；高功率TVS系列参考；残压必须按脉冲条件核对

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=ai-800v-hvdc)
