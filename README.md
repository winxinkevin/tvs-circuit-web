# 半导体应用与标准知识系统

面向TVS产品经理与应用FAE的跨行业学习站。P0建立统一行业、供电架构、拓扑、标准和资源数据；P1交付8个可审查的专业案例。

- 在线站点：https://winxinkevin.github.io/tvs-circuit-web/
- 旧版TVS案例：https://winxinkevin.github.io/tvs-circuit-web/learning-demo.html
- 主数据：`content/kb.json`
- 浏览器站点：`dist/`
- Obsidian资料库：`obsidian-vault/`

## P1案例

1. ORv3 48/54V机架Power Shelf
2. AI数据中心800VDC设施到机架
3. MVAC到800VDC三段式SST
4. 800V双向SSCB/SCHCB
5. GPU 54V/12V到核心多相VRM
6. 人形机器人电池—BMS—预充—SSCB
7. 机器人关节三相伺服与能量回馈
8. POTS/xDSL长线TSS多级保护

## 维护

修改 `content/kb.json` 后执行：

```powershell
node .\scripts\build-content.mjs
node .\scripts\validate-content.mjs
```

向 `master` 或 `main` 分支推送后，GitHub Actions会发布 `dist/`。专业电路图是用于应用学习的可审查拓扑，不替代量产原理图、ERC、安规评审与整机测试。
