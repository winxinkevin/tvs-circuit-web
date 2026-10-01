---
id: sst-mvac-800v
title: "MVAC到800VDC三段式SST"
domain: ai-dc
voltage: "中压AC → 高频隔离 → 800VDC"
status: P1已建模
updated: 2026-10-01
tags: [应用案例, AI数据中心, P1]
---

# MVAC到800VDC三段式SST

> 用模块化有源整流、DC链路和隔离DAB构成SST单元，展示真实功率器件、隔离变压器、驱动钳位与故障旁路。

## 系统链路

1. MVAC
2. 输入电抗器
3. 多电平有源整流
4. 单元DC链路
5. DAB/CLLC
6. HF变压器
7. 800VDC

## 器件位点

- **SiC MOS｜有源整流与DAB全桥**：1200V/1700V模块化器件。关键检查：串联均压、dv/dt、隔离驱动。
- **FRED/SiC SBD｜辅助换流与钳位**：与开关电压等级匹配。关键检查：Qrr、浪涌、热阻。
- **Zener/TVS｜栅源、驱动电源和采样输入**：15–18V栅极钳位等级。关键检查：与DESAT、Miller Clamp、软关断协同。

## 应力闭环

- **开关器件峰值**：单元DC电压+换流过冲；判据：低于器件VDS并保留温度裕量。
- **高频变压器绝缘**：工作电压+共模dv/dt；判据：绝缘系统与局放要求单独验证。
- **栅极异常**：驱动电源+Miller耦合；判据：Zener/TVS不能代替DESAT与软关断。

## 为什么这样选

- 三段式结构把功率因数、隔离和DC输出控制解耦
- 模型按开关、磁件和控制环分层，避免一个黑盒模型掩盖应力

## 不采用的方案

- 不能把工频变压器图标当成SST拓扑
- 不能用单管PSpice结果代替模块寄生和控制环验证

## 标准

- [SST Specification v0.3](https://www.opencompute.org/index.php/blog/powering-the-next-era-of-ai-how-google-microsoft-and-nvidia-are-standardizing-and-accelerating-the-industry-transition-to-lvdc)：MVAC到800VDC固态变压器平台（2026开放规范）
- [IEC 62477-1:2022](https://webstore.iec.ch/en/publication/28936)：功率电子变换系统安全（现行）

## 规格书、模型与论文

- [IEEE｜Solid-State Transformers: An Overview](https://doi.org/10.1109/MIE.2011.942065)：论文；SST概念、拓扑与应用综述
- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码；页面明确要求最终硬件验证
- [Infineon｜IMW65R027M1H CoolSiC MOSFET](https://www.infineon.com/assets/row/public/documents/24/49/infineon-imw65r027m1h-datasheet-en.pdf)：规格书/模型；650V SiC器件参考；模型需核对适用层级

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=sst-mvac-800v)
