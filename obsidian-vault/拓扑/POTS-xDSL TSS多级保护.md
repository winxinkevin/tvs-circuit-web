---
id: pots-tss
title: "POTS/xDSL TSS多级保护"
category: "接口与通信"
voltage: "-48V馈电"
updated: 2026-10-01
tags: [共用拓扑, 接口与通信]
---

# POTS/xDSL TSS多级保护

> GDT一级泄放、PTC限流、TSS折返钳位并保护SLIC。

## 关键器件

- GDT
- PTC
- TSS
- SLIC

## 保护位置与边界

必须联合校核TSS的VDRM、VS、IH和Power Cross热稳定。

## 关联案例

- [[案例/POTS-xDSL长线TSS多级保护|POTS/xDSL长线TSS多级保护]]

## 规格书、模型与论文

- [Bourns｜TISP5xxxH3BJ Series](https://www.bourns.com/data/global/pdfs/TISP5xxxH3Bj.pdf)：规格书；TSS电参数、浪涌等级和典型连接。（官方PDF，核验 2026-10-01）
- [Bourns｜TISP Design Files](https://www.bourns.com/resources/design-tools/design-files?product=circuit_protection_thyristor_surge_protectors)：SPICE模型；TISP系列官方设计文件入口。（厂商页面，核验 2026-10-01）

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=pots-tss)

