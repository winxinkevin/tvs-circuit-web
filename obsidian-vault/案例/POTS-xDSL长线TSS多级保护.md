---
id: telecom-tss
title: "POTS/xDSL长线TSS多级保护"
domain: telecom
voltage: "-48V馈电/铜线通信"
status: P1已建模
updated: 2026-10-01
tags: [应用案例, 通信网络, P1]
---

# POTS/xDSL长线TSS多级保护

> GDT承担大能量，PTC/串阻限制后续电流，TSS折返钳位保护SLIC；重点解释VDRM、VS、IH和Power Cross配合。

## 系统链路

1. 户外铜线
2. GDT一级泄放
3. PTC/保险
4. 串联阻抗
5. TSS二级保护
6. SLIC/变压器
7. 业务接口

## 器件位点

- **TSS｜Tip/Ring二级折返保护**：Bourns TISP5095H3等级示例。关键检查：VDRM、VS、IH、ITSM、结电容。
- **GDT/PTC｜一级泄放与续流限制**：按K.20/K.21等级配合。关键检查：TSS触发后必须让线路电流降到IH以下。
- **ESD/TVS｜低压数字侧和本地接口**：按接口带宽选择低电容阵列。关键检查：不得用高电容大功率TVS跨接高速线。

## 应力闭环

- **雷击组合波**：按ITU端口类别和安装环境；判据：GDT/TSS分担必须用实测电流确认。
- **Power Cross**：工频过压与持续电流；判据：PTC/保险动作和TSS热稳定。
- **保持电流**：触发后线路续流；判据：必须可靠低于IH才能恢复。

## 为什么这样选

- TSS触发后进入低压大电流状态，适合保护通信SLIC
- 与GDT和PTC构成能量、残压和续流三级配合

## 不采用的方案

- 普通TVS在Power Cross下可能持续高功耗失效
- 只放GDT通常无法把残压压到SLIC可承受范围

## 标准

- [ITU-T K.20/K.21/K.28/K.44](https://www.itu.int/en/ITU-T/studygroups/2022-2024/05/Pages/classification-ITUT-Kseries-recommendations.aspx)：通信设备过压过流耐受及TSS参数/试验（官方系列入口）

## 规格书、模型与论文

- [Bourns｜TISP Thyristor Surge Protectors](https://www.bourns.com/products/circuit-protection/thyristor-surge-protectors)：规格书；TSS产品族与标准浪涌额定值入口
- [Bourns｜TISP5095H3](https://bourns.com/products/circuit-protection/thyristor-surge-protectors/details/tisp5xxx-single-unidirectional-thyristor-surge-protector/tisp5095h3)：规格书；-75V VDRM、通信浪涌额定值示例
- [Bourns｜TISP Design Files](https://www.bourns.com/resources/design-tools/design-files?product=circuit_protection_thyristor_surge_protectors)：SPICE模型；TISP系列官方设计文件入口

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=telecom-tss)
