---
id: ai-dc
title: "AI数据中心"
updated: 2026-10-01
tags: [应用领域, 线路拓扑导航]
---

# AI数据中心

> AI数据中心需要同时看设施级高压配电、机架级隔离变换和板级GPU/液冷供电，不能只看单一TVS位点。

## 参考平台

- 48/54V机架
- 800VDC配电
- GPU电源
- SST/SSCB

## 应用阶段与线路拓扑

### 1. 设施入口与高压配电

MVAC/三相AC、SST、800VDC母线和故障隔离

- [[拓扑/三相AC有源前端|三相AC有源前端]]：三相AC → DC-Link
- [[拓扑/MVAC到800VDC SST|MVAC到800VDC SST]]：MVAC → 800VDC
- [[拓扑/400-800VDC配电|400/800VDC配电]]：400/800VDC
- [[拓扑/SSCB-SCHCB故障隔离|SSCB/SCHCB故障隔离]]：400–1500VDC

### 2. 机架变换与冗余

PFC、隔离DC/DC、热插拔和ORing

- [[拓扑/Boost-图腾柱PFC|Boost/图腾柱PFC]]：AC → 380–420VDC
- [[拓扑/LLC-PSFB隔离变换|LLC/PSFB隔离变换]]：400/800VDC → 48/12V
- [[拓扑/DAB-CLLC双向隔离变换|DAB/CLLC双向隔离变换]]：双向高压DC/DC
- [[拓扑/12–54V DC输入-反接-热插拔|12–54V DC输入/反接/热插拔]]：12–54VDC
- [[拓扑/同步整流-理想二极管-ORing|同步整流/理想二极管/ORing]]：12–54VDC

### 3. 板级、网络与液冷

GPU VRM、管理网络和泵/风扇辅助供电

- [[拓扑/Buck-Boost-多相VRM|Buck/Boost/多相VRM]]：54/12V → 亚伏
- [[拓扑/Ethernet-PoE|Ethernet/PoE]]：-57V PoE
- [[拓扑/液冷泵-风扇与辅助电源|液冷泵/风扇与辅助电源]]：48/54V → 12/24V
- [[拓扑/栅极驱动-有源钳位-Snubber|栅极驱动/有源钳位/Snubber]]：驱动与开关节点

## 网站

[打开该领域的交互式拓扑地图](https://winxinkevin.github.io/tvs-circuit-web/?domain=ai-dc)

