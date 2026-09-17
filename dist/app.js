const circuits = [
  {
    id: "24v-input",
    icon: "24V",
    short: "工业电源",
    category: "Power · Industrial",
    title: "24V DC 输入保护",
    application: "PLC、工业控制器、远程 I/O",
    summary: "用于长线供电入口的瞬态抑制。TVS 将线缆带入的短时高压旁路到电源回路地，后级滤波与 DC/DC 获得较低的残余应力。",
    environment: ["控制柜", "长线缆", "感性负载附近", "24/7 运行"],
    metrics: [["持续电压", "24 V nominal"], ["常见干扰", "EFT / Surge"], ["安装位置", "电源连接器入口"], ["回流参考", "Power GND"]],
    caution: "TVS 的持续工作电压必须覆盖电源上限。图中参数仅表达拓扑，实际器件需结合电源容差、源阻抗和测试等级验证。",
    nodes: [
      ["connector", "J1", "24V IN", 100, 205], ["fuse", "F1", "Fuse", 270, 205], ["tvs", "D1", "TVS", 445, 330],
      ["filter", "L1", "Filter", 500, 205], ["load", "U1", "DC/DC", 700, 205]
    ],
    wires: [[[145,205],[225,205]], [[315,205],[455,205]], [[545,205],[650,205]], [[445,205],[445,290]], [[445,370],[445,420]]],
    surge: [[70,165],[120,165],[120,205],[445,205],[445,410]],
    ground: [445,420]
  },
  {
    id: "rs485",
    icon: "485",
    short: "工业通信",
    category: "Communication · Industrial",
    title: "RS485 接口保护",
    application: "PLC、BMS、门禁控制器、工业仪表",
    summary: "接口侧 TVS 阵列限制 A/B 总线上的瞬态电压，串联器件和共模抑制元件降低进入收发器的能量与高频噪声。",
    environment: ["楼宇布线", "工厂现场", "跨设备地电位", "长距离总线"],
    metrics: [["信号类型", "差分总线"], ["典型速率", "9.6 kbps–10 Mbps"], ["常见干扰", "ESD / EFT / Surge"], ["回流参考", "Signal / Chassis GND"]],
    caution: "现场系统应先确认共模范围、隔离方式和屏蔽层接地策略。TVS 电容与残压均会影响收发器和信号质量。",
    nodes: [
      ["connector", "J1", "A / B", 90, 205], ["tvs", "D1", "TVS Array", 300, 330], ["filter", "L1", "CMC", 390, 205],
      ["resistor", "RT", "120Ω", 535, 330], ["load", "U1", "Transceiver", 675, 205]
    ],
    wires: [[[135,185],[340,185]], [[135,225],[340,225]], [[440,185],[625,185]], [[440,225],[625,225]], [[300,205],[300,290]], [[535,205],[535,290]], [[300,370],[300,420]], [[535,370],[535,420]]],
    surge: [[60,145],[110,145],[110,185],[300,185],[300,410]],
    ground: [300,420]
  },
  {
    id: "can",
    icon: "CAN",
    short: "车载/储能",
    category: "Communication · ESS",
    title: "CAN 总线保护",
    application: "BMS、储能柜、工业车辆、控制单元",
    summary: "CANH/CANL 入口处的低电容 TVS 阵列吸收静电和线束瞬态，随后信号通过共模扼流圈进入 CAN 收发器。",
    environment: ["电池系统", "高电流开关附近", "线束接口", "高噪声环境"],
    metrics: [["信号类型", "差分 CAN"], ["总线电压", "依收发器规格"], ["常见干扰", "ESD / 线束瞬态"], ["布置重点", "TVS 靠近连接器"]],
    caution: "汽车与工业 CAN 的测试脉冲不同。本示意图不代表已满足 ISO 7637 或 ISO 10605，需要按最终系统标准核验。",
    nodes: [
      ["connector", "J1", "CANH/L", 90, 205], ["tvs", "D1", "TVS Array", 285, 330], ["filter", "L1", "CMC", 385, 205],
      ["resistor", "RT", "Split Term.", 520, 330], ["load", "U1", "CAN PHY", 675, 205]
    ],
    wires: [[[135,185],[335,185]], [[135,225],[335,225]], [[435,185],[625,185]], [[435,225],[625,225]], [[285,205],[285,290]], [[520,205],[520,290]], [[285,370],[285,420]], [[520,370],[520,420]]],
    surge: [[60,145],[110,145],[110,225],[285,225],[285,410]],
    ground: [285,420]
  },
  {
    id: "contactor",
    icon: "K1",
    short: "感性负载",
    category: "Inductive Load · BMS",
    title: "BMS 接触器线圈保护",
    application: "储能电池包、高压配电盒、直流接触器驱动",
    summary: "接触器线圈断电时产生反向高压。钳位器件为线圈电流提供续流路径，限制 MOSFET 漏极电压并控制释放速度。",
    environment: ["ESS 电池包", "高压接触器", "频繁开关", "宽温环境"],
    metrics: [["负载类型", "Inductive coil"], ["瞬态来源", "Turn-off flyback"], ["保护对象", "Driver MOSFET"], ["关键权衡", "钳位电压 vs 释放速度"]],
    caution: "单纯续流二极管会延长接触器释放时间。TVS、齐纳或主动钳位应依据线圈能量和要求的断开速度选择。",
    nodes: [
      ["source", "+24V", "Supply", 105, 150], ["coil", "K1", "Contactor", 330, 205], ["tvs", "D1", "TVS Clamp", 330, 340],
      ["switch", "Q1", "MOSFET", 565, 280], ["source", "GND", "Return", 710, 390]
    ],
    wires: [[[150,150],[330,150],[330,165]], [[330,245],[330,300]], [[330,245],[565,245]], [[565,315],[565,390],[665,390]], [[330,380],[330,390],[565,390]]],
    surge: [[330,250],[330,300],[330,380],[565,380],[565,250]],
    ground: [710,390]
  },
  {
    id: "data-center",
    icon: "54V",
    short: "数据中心",
    category: "Power · Data Center",
    title: "48/54V 热插拔输入保护",
    application: "服务器电源架、网络设备、分布式 48V 母线",
    summary: "入口保护与热插拔控制器协同处理插拔瞬态和母线扰动。TVS 负责快速钳位，保险器件和 MOSFET 承担故障隔离与浪涌控制。",
    environment: ["高可用机房", "冗余电源", "热插拔", "高功率密度"],
    metrics: [["母线", "48–54 V DC"], ["事件", "Hot-swap / Surge"], ["保护对象", "Hot-swap IC & MOSFET"], ["验证重点", "SOA / Clamp / Inrush"]],
    caution: "母线容差、热插拔 MOSFET SOA 和 TVS 热累积必须联合校核。不要把负载阶跃、浪涌和持续过压视为同一种事件。",
    nodes: [
      ["connector", "J1", "48/54V", 85, 205], ["fuse", "F1", "Fuse", 235, 205], ["tvs", "D1", "TVS", 390, 330],
      ["switch", "Q1", "Hot-swap FET", 500, 205], ["load", "LOAD", "Server Rail", 690, 205]
    ],
    wires: [[[130,205],[190,205]], [[280,205],[450,205]], [[550,205],[640,205]], [[390,205],[390,290]], [[390,370],[390,420]]],
    surge: [[55,165],[105,165],[105,205],[390,205],[390,410]],
    ground: [390,420]
  }
];

const descriptions = {
  connector: "外部线缆或电源的入口。保护器件越靠近这里，浪涌电流经过 PCB 的路径通常越短。",
  fuse: "在持续故障或器件短路时限制能量。它与 TVS 的瞬态钳位作用不同。",
  tvs: "当节点电压超过阈值时快速进入低阻状态，把瞬态电流引向参考地或回路返回端。",
  filter: "抑制共模或高频噪声。其额定电流、饱和和寄生参数需要与接口匹配。",
  resistor: "提供终端匹配或限流。阻值和位置会直接影响通信波形。",
  load: "被保护的后级功能模块，其绝对最大额定值决定允许残压。",
  source: "电源或回流参考节点。实际系统必须明确保护电流最终回到哪里。",
  coil: "感性负载。断电时储存的磁场能量会转化为反向电压。",
  switch: "负责开关或热插拔控制的 MOSFET，是浪涌和感性反冲的重点保护对象。"
};

const list = document.querySelector("#circuit-list");
const search = document.querySelector("#search");
const schematic = document.querySelector("#schematic");
const toggle = document.querySelector("#toggle-surge");
let selected = circuits[0].id;
let showSurge = true;
let transform = { x: 0, y: 0, scale: 1 };
let drag = null;

function renderList(query = "") {
  const normalized = query.trim().toLowerCase();
  const filtered = circuits.filter(c => `${c.title} ${c.application} ${c.category}`.toLowerCase().includes(normalized));
  list.innerHTML = filtered.length ? filtered.map(c => `
    <button class="circuit-button ${c.id === selected ? "active" : ""}" data-id="${c.id}" type="button">
      <span class="circuit-icon">${c.icon}</span>
      <span><strong>${c.title}</strong><small>${c.short}</small></span>
    </button>`).join("") : '<div class="empty">没有匹配的应用场景</div>';
  list.querySelectorAll("button").forEach(button => button.addEventListener("click", () => selectCircuit(button.dataset.id)));
}

function componentMarkup([type, ref, label, x, y]) {
  const vertical = ["tvs", "resistor", "coil"].includes(type);
  const width = vertical ? 90 : 100;
  const height = vertical ? 80 : 64;
  return `<g class="c-component" data-type="${type}" data-ref="${ref}" tabindex="0" role="button" aria-label="${ref} ${label}">
    <rect x="${x-width/2}" y="${y-height/2}" width="${width}" height="${height}" rx="7" />
    <text class="c-label" x="${x}" y="${y-3}">${ref}</text>
    <text class="c-sub" x="${x}" y="${y+20}">${label}</text>
  </g>`;
}

function polyline(points, className) {
  return `<polyline class="${className}" points="${points.map(p => p.join(",")).join(" ")}" />`;
}

function groundMarkup([x, y]) {
  return `<g class="c-ground"><line x1="${x}" y1="${y}" x2="${x}" y2="${y+12}"/><line x1="${x-20}" y1="${y+12}" x2="${x+20}" y2="${y+12}"/><line x1="${x-13}" y1="${y+20}" x2="${x+13}" y2="${y+20}"/><line x1="${x-6}" y1="${y+28}" x2="${x+6}" y2="${y+28}"/></g>`;
}

function renderSchematic(circuit) {
  schematic.innerHTML = `<svg viewBox="0 0 800 500" aria-labelledby="svg-title">
    <title id="svg-title">${circuit.title}连接示意图</title>
    <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#e7533f"/></marker></defs>
    <g id="viewport" transform="translate(${transform.x} ${transform.y}) scale(${transform.scale})">
      ${circuit.wires.map(w => polyline(w, "c-wire")).join("")}
      ${groundMarkup(circuit.ground)}
      ${circuit.nodes.map(componentMarkup).join("")}
      <g class="surge-layer">
        ${polyline(circuit.surge, "surge-path")}
        <circle class="surge-badge" cx="${circuit.surge[0][0]}" cy="${circuit.surge[0][1]-24}" r="21"/>
        <text class="surge-text" x="${circuit.surge[0][0]}" y="${circuit.surge[0][1]-19}">SURGE</text>
      </g>
    </g>
  </svg>`;
  schematic.classList.toggle("surge-hidden", !showSurge);
  schematic.querySelectorAll(".c-component").forEach(node => {
    const open = () => showComponent(node.dataset.type, node.dataset.ref);
    node.addEventListener("click", open);
    node.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") open(); });
  });
}

function selectCircuit(id) {
  selected = id;
  transform = { x: 0, y: 0, scale: 1 };
  const c = circuits.find(item => item.id === id);
  document.querySelector("#eyebrow").textContent = c.category;
  document.querySelector("#circuit-title").textContent = c.title;
  document.querySelector("#application").textContent = c.application;
  document.querySelector("#summary").textContent = c.summary;
  document.querySelector("#environment").innerHTML = c.environment.map(item => `<span>${item}</span>`).join("");
  document.querySelector("#metrics").innerHTML = c.metrics.map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`).join("");
  document.querySelector("#caution").textContent = c.caution;
  document.querySelector("#component-note").hidden = true;
  renderList(search.value);
  renderSchematic(c);
}

function showComponent(type, ref) {
  document.querySelector("#component-name").textContent = `${ref} · ${type.toUpperCase()}`;
  document.querySelector("#component-description").textContent = descriptions[type];
  document.querySelector("#component-note").hidden = false;
}

function applyTransform() {
  const viewport = schematic.querySelector("#viewport");
  if (viewport) viewport.setAttribute("transform", `translate(${transform.x} ${transform.y}) scale(${transform.scale})`);
}

search.addEventListener("input", e => renderList(e.target.value));
toggle.addEventListener("click", () => {
  showSurge = !showSurge;
  toggle.classList.toggle("active", showSurge);
  toggle.setAttribute("aria-pressed", String(showSurge));
  schematic.classList.toggle("surge-hidden", !showSurge);
});
document.querySelector("#reset-view").addEventListener("click", () => { transform = { x: 0, y: 0, scale: 1 }; applyTransform(); });
document.querySelector("#close-note").addEventListener("click", () => { document.querySelector("#component-note").hidden = true; });

schematic.addEventListener("pointerdown", e => {
  if (e.target.closest(".c-component")) return;
  drag = { x: e.clientX, y: e.clientY, ox: transform.x, oy: transform.y };
  schematic.setPointerCapture(e.pointerId);
  schematic.classList.add("dragging");
});
schematic.addEventListener("pointermove", e => {
  if (!drag) return;
  transform.x = drag.ox + (e.clientX - drag.x);
  transform.y = drag.oy + (e.clientY - drag.y);
  applyTransform();
});
schematic.addEventListener("pointerup", () => { drag = null; schematic.classList.remove("dragging"); });
schematic.addEventListener("wheel", e => {
  e.preventDefault();
  transform.scale = Math.min(1.8, Math.max(.65, transform.scale * (e.deltaY > 0 ? .92 : 1.08)));
  applyTransform();
}, { passive: false });

selectCircuit(selected);
