import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const kb = JSON.parse(fs.readFileSync(path.join(root, 'content', 'kb.json'), 'utf8'));
const errors = [];

const expect = (condition, message) => {
  if (!condition) errors.push(message);
};
const unique = (items, label) => {
  const ids = items.map(item => item.id);
  expect(new Set(ids).size === ids.length, `${label}存在重复ID`);
};

expect(kb.domains.length === 9, `领域应为9个，实际${kb.domains.length}个`);
expect(kb.applicationChains.length === kb.domains.length, `领域拓扑关系应覆盖${kb.domains.length}个领域，实际${kb.applicationChains.length}个`);
expect(kb.voltageDomains.length === 7, `电压域应为7个，实际${kb.voltageDomains.length}个`);
expect(kb.topologies.length === 24, `共用拓扑应为24个，实际${kb.topologies.length}个`);
expect(kb.cases.length === 8, `P1案例应为8个，实际${kb.cases.length}个`);

for (const [label, items] of Object.entries({
  领域: kb.domains,
  电压域: kb.voltageDomains.map((name, id) => ({ id, name })),
  拓扑: kb.topologies,
  标准: kb.standards,
  资源: kb.resources,
  案例: kb.cases
})) unique(items, label);

const domainIds = new Set(kb.domains.map(x => x.id));
const standardIds = new Set(kb.standards.map(x => x.id));
const resourceIds = new Set(kb.resources.map(x => x.id));
const caseIds = new Set(kb.cases.map(x => x.id));
const topologyIds = new Set(kb.topologies.map(x => x.id));

unique(kb.applicationChains.map(x => ({ id: x.domain })), '领域拓扑关系');
const mappedTopologyIds = new Set();
for (const chain of kb.applicationChains) {
  expect(domainIds.has(chain.domain), `领域拓扑关系引用了不存在的领域：${chain.domain}`);
  expect(chain.headline, `${chain.domain}缺少领域学习说明`);
  expect(chain.stages.length >= 3, `${chain.domain}应用阶段少于3级`);
  for (const stage of chain.stages) {
    expect(stage.name && stage.note, `${chain.domain}存在缺少名称或说明的应用阶段`);
    expect(stage.topologies.length >= 2, `${chain.domain}/${stage.name}关联拓扑少于2个`);
    for (const id of stage.topologies) {
      expect(topologyIds.has(id), `${chain.domain}/${stage.name}引用了不存在的拓扑：${id}`);
      mappedTopologyIds.add(id);
    }
  }
}
for (const id of topologyIds) expect(mappedTopologyIds.has(id), `拓扑${id}没有映射到任何领域`);

for (const item of kb.topologies) {
  expect(item.name && item.category && item.voltage && item.summary, `${item.id}缺少拓扑基础字段`);
  expect(item.drawing, `${item.id}缺少电路图ID`);
  expect(item.devices.length >= 3, `${item.id}关键器件少于3类`);
  expect(item.protection, `${item.id}缺少保护位置说明`);
  expect(item.resources.length >= 1, `${item.id}缺少证据资源`);
  for (const id of item.resources) expect(resourceIds.has(id), `${item.id}引用了不存在的资源：${id}`);
  for (const id of item.cases) expect(caseIds.has(id), `${item.id}引用了不存在的案例：${id}`);
}

for (const item of kb.cases) {
  expect(domainIds.has(item.domain), `${item.id}引用了不存在的领域：${item.domain}`);
  expect(item.system.length >= 4, `${item.id}系统链路少于4级`);
  expect(item.devices.length >= 3, `${item.id}器件位点少于3个`);
  expect(item.stress.length >= 3, `${item.id}应力闭环少于3项`);
  expect(item.why.length >= 2, `${item.id}缺少选型理由`);
  expect(item.reject.length >= 2, `${item.id}缺少排除方案`);
  for (const id of item.standards) expect(standardIds.has(id), `${item.id}引用了不存在的标准：${id}`);
  for (const id of item.resources) expect(resourceIds.has(id), `${item.id}引用了不存在的资源：${id}`);
}

for (const item of [...kb.standards, ...kb.resources]) {
  expect(/^https:\/\//.test(item.url), `${item.id}不是HTTPS直达链接`);
}
for (const item of kb.resources) {
  expect(item.access, `${item.id}缺少访问状态`);
  expect(/^\d{4}-\d{2}-\d{2}$/.test(item.checked), `${item.id}缺少链接核验日期`);
  if (item.backupUrl) expect(/^https:\/\//.test(item.backupUrl), `${item.id}备用入口不是HTTPS链接`);
}

const browserData = fs.readFileSync(path.join(root, 'dist', 'data', 'p0p1-kb.js'), 'utf8');
expect(browserData.startsWith('window.PE_KB='), '浏览器数据文件格式错误');
expect(browserData.includes('ai-800v-hvdc'), '浏览器数据缺少AI 800VDC案例');
expect(browserData.includes('sst-mvac-800v'), '浏览器数据缺少SST案例');
expect(browserData.includes('sscb-800v'), '浏览器数据缺少SSCB案例');
if (browserData.startsWith('window.PE_KB=') && browserData.trim().endsWith(';')) {
  const generated = JSON.parse(browserData.trim().slice('window.PE_KB='.length, -1));
  expect(JSON.stringify(generated) === JSON.stringify(kb), '浏览器数据与content/kb.json不一致，请重新构建');
}

if (errors.length) {
  console.error(errors.map(x => `- ${x}`).join('\n'));
  process.exit(1);
}

console.log(`内容校验通过：${kb.domains.length}领域 / ${kb.voltageDomains.length}电压域 / ${kb.topologies.length}拓扑 / ${kb.cases.length}案例 / ${kb.standards.length}标准 / ${kb.resources.length}资源`);
