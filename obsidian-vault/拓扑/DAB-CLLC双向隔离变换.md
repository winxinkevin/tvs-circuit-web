---
id: dab-cllc
title: "DAB/CLLC双向隔离变换"
category: "功率变换"
voltage: "双向高压DC/DC"
updated: 2026-10-01
tags: [共用拓扑, 功率变换]
---

# DAB/CLLC双向隔离变换

> 两侧全桥、高频变压器与漏感/谐振腔组成双向隔离变换。

## 关键器件

- SiC MOS
- 高频变压器
- 谐振电容
- 隔离驱动

## 保护位置与边界

两侧母线各自保护，不能让TVS跨越隔离边界形成错误回流。

## 关联案例

- [[案例/AI数据中心800VDC设施到机架|AI数据中心800VDC设施到机架]]
- [[案例/MVAC到800VDC三段式SST|MVAC到800VDC三段式SST]]

## 规格书、模型与论文

- [Infineon｜Power MOSFET Simulation Models](https://www.infineon.com/de/design-resources/simulation-modeling/power-mosfet-simulation-models)：PSpice模型；官方PSpice代码入口；最终结果仍需硬件验证。（厂商页面，核验 2026-10-01）
- [MDPI｜Solid-State Transformer Technologies and Applications](https://res.mdpi.com/d_attachment/electronics/electronics-07-00298/article_deploy/electronics-07-00298.pdf)：开放论文；SST结构、功率级和应用综述；主链接直达PDF。（开放全文，核验 2026-10-01）；[备用入口](https://www.mdpi.com/2079-9292/7/11/298)

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=dab-cllc)
