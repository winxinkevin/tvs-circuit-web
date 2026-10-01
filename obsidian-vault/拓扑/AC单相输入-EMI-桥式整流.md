---
id: ac-input-bridge
title: "AC单相输入/EMI/桥式整流"
category: "输入与配电"
voltage: "85–277VAC"
updated: 2026-10-01
tags: [共用拓扑, 输入与配电]
---

# AC单相输入/EMI/桥式整流

> 保险丝、MOV、共模/差模滤波和全桥整流组成离线电源前端。

## 关键器件

- 保险丝
- MOV
- 共模电感
- 桥堆

## 保护位置与边界

MOV跨L-N并位于保险丝之后；高能浪涌不能由DC侧TVS替代。

## 关联案例

- [[案例/ORv3 48-54V机架Power Shelf|ORv3 48/54V机架Power Shelf]]

## 规格书、模型与论文

- [Texas Instruments｜How to Select a Surge Diode](https://www.ti.com/lit/an/slvae37/slvae37.pdf)：应用笔记；从VRWM、击穿、残压和脉冲功率选择TVS。（官方PDF，核验 2026-10-01）
- [Littelfuse｜SMCJ TVS Diode Series](https://www.littelfuse.com/~/media/electronics/datasheets/tvs_diodes/littelfuse_tvs_diode_smcj_datasheet.pdf.pdf)：规格书；高功率TVS系列；残压必须按实际脉冲电流核对。（官方PDF，核验 2026-10-01）；[备用入口](https://www.littelfuse.com/assetdocs/littelfuse-tvs-diode-smcj-datasheet?assetguid=37388813-0d6d-4329-969b-1aa8b7614ac1)

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=ac-input-bridge)

