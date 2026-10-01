import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const kb = JSON.parse(fs.readFileSync(path.join(root, 'content', 'kb.json'), 'utf8'));
const dataDir = path.join(root, 'dist', 'data');
const vaultDir = path.join(root, 'obsidian-vault');
fs.mkdirSync(dataDir, { recursive: true });
fs.mkdirSync(path.join(vaultDir, '案例'), { recursive: true });

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

${resources.map(x => `- [${x.vendor}｜${x.title}](${x.url})：${x.kind}；${x.note}`).join('\n')}

## 网站

[在网站中打开](https://winxinkevin.github.io/tvs-circuit-web/?case=${item.id})
`;
  fs.writeFileSync(path.join(vaultDir, '案例', `${clean(item.title)}.md`), body);
}

const index = `# 半导体应用与标准知识系统\n\n版本：${kb.meta.version}\n\n更新：${kb.meta.updated}\n\n## P1案例\n\n${kb.cases.map(x => `- [[案例/${clean(x.title)}|${x.title}]]`).join('\n')}\n`;
fs.writeFileSync(path.join(vaultDir, '首页.md'), index);
console.log(`Generated ${kb.cases.length} cases and browser data.`);
