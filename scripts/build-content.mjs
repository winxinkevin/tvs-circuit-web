import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const kb = JSON.parse(fs.readFileSync(path.join(root, 'content', 'kb.json'), 'utf8'));
const dataDir = path.join(root, 'dist', 'data');
const vaultDir = path.join(root, 'obsidian-vault');
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(path.join(vaultDir, '案例'), { recursive: true });
fs.mkdirSync(path.join(vaultDir, '拓扑'), { recursive: true });
fs.mkdirSync(path.join(vaultDir, '领域'), { recursive: true });

fs.writeFileSync(path.join(dataDir, 'p0p1-kb.js'), `window.PE_KB=${JSON.stringify(kb)};\n`);

const clean = value => String(value).replace(/[\\/:*?"<>|]/g, '-');
for (const item of kb.cases) {
  const domain = kb.domains.find(d => d.id === item.domain);
  const standards = item.standards.map(id => kb.standards.find(s => s.id === id)).filter(Boolean);
  const resources = item.resources.map(id => kb.resources.find(s => s.id === id)).filter(Boolean);
  const body = `---
id: ${item.id}
title: "${item.title}"
domain: ${item.domain}
voltage: "${item.voltage}"
status: ${item.status}
updated: ${kb.meta.updated}
tags: [应用案例, ${domain?.name || item.domain}, P1]
---

# ${item.title}

> ${item.summary}

## 系统链路

${item.system.map((x, i) => `${i + 1}. ${x}`).join('\n')}

## 器件位点

${item.devices.map(x => `- **${x.family}｜${x.slot}**：${x.candidate}。关键检查：${x.key}。`).join('\n')}

## 应力闭环

${item.stress.map(x => `- **${x.item}**：${x.value}；判据：${x.limit}。`).join('\n')}

## 为什么这样选

${item.why.map(x => `- ${x}`).join('\n')}

## 不采用的方案

${item.reject.map(x => `- ${x}`).join('\n')}

## 标准

${standards.map(x => `- [${x.name}](${x.url})：${x.scope}（${x.status}）`).join('\n')}

## 规格书、模型与论文

${resources.map(x => `- [${x.vendor}｜${x.title}](${x.url})：${x.kind}；${x.note}（${x.access}，核验 ${x.checked}）${x.backupUrl ? `；[备用入口](${x.backupUrl})` : ''}`).join('\n')}

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=${item.id})
`;
  fs.writeFileSync(path.join(vaultDir, '案例', `${clean(item.title)}.md`), body);
}

for (const item of kb.topologies) {
  const resources = item.resources.map(id => kb.resources.find(s => s.id === id)).filter(Boolean);
  const cases = item.cases.map(id => kb.cases.find(c => c.id === id)).filter(Boolean);
  const body = `---
id: ${item.id}
title: "${item.name}"
category: "${item.category}"
voltage: "${item.voltage}"
updated: ${kb.meta.updated}
tags: [共用拓扑, ${item.category}]
---

# ${item.name}

> ${item.summary}

## 关键器件

${item.devices.map(x => `- ${x}`).join('\n')}

## 保护位置与边界

${item.protection}

## 关联案例

${cases.length ? cases.map(x => `- [[案例/${clean(x.title)}|${x.title}]]`).join('\n') : '- 暂无P1黄金案例；网站中的拓扑图可独立学习。'}

## 规格书、模型与论文

${resources.map(x => `- [${x.vendor}｜${x.title}](${x.url})：${x.kind}；${x.note}（${x.access}，核验 ${x.checked}）${x.backupUrl ? `；[备用入口](${x.backupUrl})` : ''}`).join('\n')}

## 网站

[打开器件级参考拓扑](https://winxinkevin.github.io/tvs-circuit-web/?topology=${item.id})
`;
  fs.writeFileSync(path.join(vaultDir, '拓扑', `${clean(item.name)}.md`), body);
}

for (const chain of kb.applicationChains) {
  const domain = kb.domains.find(x => x.id === chain.domain);
  const body = `---
id: ${domain.id}
title: "${domain.name}"
updated: ${kb.meta.updated}
tags: [应用领域, 线路拓扑导航]
---

# ${domain.name}

> ${chain.headline}

## 参考平台

${domain.platforms.map(x => `- ${x}`).join('\n')}

## 应用阶段与线路拓扑

${chain.stages.map((stage, i) => `### ${i + 1}. ${stage.name}\n\n${stage.note}\n\n${stage.topologies.map(id => { const topology = kb.topologies.find(x => x.id === id); return `- [[拓扑/${clean(topology.name)}|${topology.name}]]：${topology.voltage}`; }).join('\n')}`).join('\n\n')}

## 网站

[打开该领域的交互式拓扑地图](https://winxinkevin.github.io/tvs-circuit-web/?domain=${domain.id})
`;
  fs.writeFileSync(path.join(vaultDir, '领域', `${clean(domain.name)}.md`), body);
}

const index = `# 半导体应用与标准知识系统\n\n版本：${kb.meta.version}\n\n更新：${kb.meta.updated}\n\n## 领域到拓扑导航\n\n${kb.domains.map(x => `- [[领域/${clean(x.name)}|${x.name}]]`).join('\n')}\n\n## 24类共用拓扑\n\n${kb.topologies.map(x => `- [[拓扑/${clean(x.name)}|${x.name}]]`).join('\n')}\n\n## P1案例\n\n${kb.cases.map(x => `- [[案例/${clean(x.title)}|${x.title}]]`).join('\n')}\n`;
fs.writeFileSync(path.join(vaultDir, '首页.md'), index);
console.log(`Generated ${kb.domains.length} domains, ${kb.topologies.length} topologies, ${kb.cases.length} cases and browser data.`);
