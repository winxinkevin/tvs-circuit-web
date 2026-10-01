---
id: sscb
title: "SSCB/SCHCB故障隔离"
category: "先进配电"
voltage: "400–1500VDC"
updated: 2026-10-01
tags: [共用拓扑, 先进配电]
---

# SSCB/SCHCB故障隔离

> 电流检测、背靠背SiC、MOV/TVS吸能和机械隔离触点构成完整断路链。

## 关键器件

- SiC MOS
- MOV/TVS
- 分流器/霍尔
- 隔离触点

## 保护位置与边界

吸能器件按0.5LI²校核，关断峰值需计入母线与寄生过冲。

## 关联案例

- [[案例/800V双向SSCB-SCHCB|800V双向SSCB/SCHCB]]

## 规格书、模型与论文

- [IEEE｜Solid-State Circuit Breakers for DC Systems](https://ieeexplore.ieee.org/document/8945374/)：论文摘要；SSCB拓扑、保护和应用；全文取决于机构权限。（摘要页·全文视授权，核验 2026-10-01）
- [IEEE｜Solid-State Circuit Breaker Review](https://ieeexplore.ieee.org/document/9589056/)：论文摘要；DC SSCB技术综述；全文取决于机构权限。（摘要页·全文视授权，核验 2026-10-01）
- [Infineon｜750V CoolSiC MOSFET](https://www.infineon.com/products/power/mosfet/silicon-carbide/750v)：规格书/设计资源；SSCB与800VDC候选技术资源入口。（厂商页面，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=sscb)

