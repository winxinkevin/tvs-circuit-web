---
id: sst
title: "MVAC到800VDC SST"
category: "先进配电"
voltage: "MVAC → 800VDC"
updated: 2026-10-01
tags: [共用拓扑, 先进配电]
---

# MVAC到800VDC SST

> 模块化多电平AFE、单元DC-Link、DAB和高频隔离组成三段式SST。

## 关键器件

- 1200/1700V SiC
- DC-Link电容
- 高频变压器
- 隔离驱动

## 保护位置与边界

入口避雷、单元均压、栅极钳位与输出故障隔离分层设计。

## 关联案例

- [[案例/MVAC到800VDC三段式SST|MVAC到800VDC三段式SST]]

## 规格书、模型与论文

- [MDPI｜Solid-State Transformer Technologies and Applications](https://res.mdpi.com/d_attachment/electronics/electronics-07-00298/article_deploy/electronics-07-00298.pdf)：开放论文；SST结构、功率级和应用综述；主链接直达PDF。（开放全文，核验 2026-10-01）；[备用入口](https://www.mdpi.com/2079-9292/7/11/298)
- [MDPI｜Solid-State Transformers: Recent Advances and Future Trends](https://www.mdpi.com/2227-7080/13/2/74)：开放论文；较新的SST器件、拓扑和应用综述。（开放全文，核验 2026-10-01）
- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=sst)
