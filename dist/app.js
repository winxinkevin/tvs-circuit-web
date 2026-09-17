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

const engineering = {
  "24v-input": {
    selection: [["VRWM", "33–36 V"], ["VBR", "≈ 37–40 V"], ["目标 VC", "≤ 55 V @ IPP"], ["IPP / PPP", "由测试脉冲反算"], ["极性", "单向优先"], ["封装", "SMB/SMC 级起评"]],
    selectionNote: "示例窗口假设 24 V 工业母线最高持续电压约 30 V；最终值必须按电源容差、负载突降和 DC/DC 绝对最大值收敛。",
    stress: [["稳态裕量", 72, "30 / 33 V", "warn"], ["钳位裕量", 78, "55 / 60 V", "warn"], ["脉冲功率", 58, "估算", ""], ["PCB 过冲", 42, "L·di/dt", ""]],
    equation: "IPP ≈ (VSURGE − VC) / RSOURCE\nVIC,PK ≈ VC + LTRACE · di/dt",
    topology: [["入口与故障隔离", "J1 → Fuse/PTC → 反接 MOSFET"], ["瞬态钳位", "TVS 接在受保护电源轨与 Power GND 之间"], ["噪声滤波", "共模/差模电感与输入电容构成 EMI 滤波"], ["后级功率链", "Hot-swap / eFuse → DC/DC → 5 V / 3.3 V rails"]],
    nodes: [["connector","J1","24V IN",70,210],["fuse","F1","Fuse",205,210],["switch","Q1","Reverse FET",350,210],["tvs","D1","TVS 33–36V",470,390],["filter","L1","CM/DM Filter",535,210],["switch","U1","eFuse",700,210],["load","U2","Buck DC/DC",850,210],["load","LOAD","5V / 3V3",1010,210]],
    wires: [[[115,210],[160,210]],[[250,210],[300,210]],[[400,210],[485,210]],[[585,210],[650,210]],[[750,210],[800,210]],[[900,210],[960,210]],[[470,210],[470,350]],[[470,430],[470,495]]],
    surge: [[35,160],[90,160],[90,210],[470,210],[470,485]], ground:[470,495], boundary:[610,130,460,170]
  },
  rs485: {
    selection: [["VRWM", "≥ 总线故障电压"], ["方向", "双向阵列"], ["目标 VC", "< PHY Abs Max"], ["CJ", "按波特率/线长"], ["IPP", "按 IEC 等级"], ["通道", "A/B 对称"]],
    selectionNote: "不能只按 ±差分信号幅度选 VRWM；还要覆盖收发器共模范围、误接电源和偏置网络。低电容与低动态电阻需要同时比较。",
    stress: [["共模窗口", 68, "待核验", "warn"], ["差分残压", 62, "PHY 限值", ""], ["结电容", 46, "SI 影响", ""], ["浪涌能量", 74, "耦合相关", "warn"]],
    equation: "VC,SYSTEM = VC,TVS + LPATH · di/dt\nVDIFF = V(A) − V(B)",
    topology: [["现场入口", "Shield/RJ45/Terminal → 一级钳位"], ["信号调理", "串联阻抗 → CMC → 120 Ω / split termination"], ["通信前端", "RS485 transceiver → Digital isolator"], ["系统侧", "Isolated DC/DC + MCU / PLC controller"]],
    nodes: [["connector","J1","A / B / SHLD",65,210],["tvs","D1","TVS Array",215,405],["resistor","R1/2","Pulse R",250,210],["filter","L1","CMC",410,210],["resistor","RT","120Ω Split",545,405],["load","U1","RS485 PHY",610,210],["load","U2","Digital ISO",780,210],["load","U3","MCU / PLC",960,210]],
    wires: [[[110,190],[200,190]],[[110,230],[200,230]],[[300,190],[360,190]],[[300,230],[360,230]],[[460,190],[560,190]],[[460,230],[560,230]],[[660,210],[730,210]],[[830,210],[910,210]],[[215,210],[215,365]],[[545,210],[545,365]],[[215,445],[215,500]],[[545,445],[545,500]]],
    surge: [[30,150],[85,150],[85,190],[215,190],[215,490]], ground:[215,500], boundary:[555,125,465,175]
  },
  can: {
    selection: [["VRWM", "覆盖 CAN fault"], ["方向", "双向阵列"], ["目标 VC", "低于 PHY 限值"], ["CJ", "CAN-FD 更严格"], ["IPP", "按 ISO/IEC 脉冲"], ["AEC-Q", "车载场景要求"]],
    selectionNote: "经典 CAN、CAN-FD、工业 CAN 与车载 CAN 的故障电压和测试脉冲不同。示意窗口必须绑定到具体收发器和系统标准。",
    stress: [["总线故障", 70, "± fault", "warn"], ["VC 裕量", 64, "PHY 限值", ""], ["CAN-FD SI", 52, "CJ / symmetry", ""], ["ISO 脉冲", 78, "系统测试", "warn"]],
    equation: "VRWM > max(|VCAN,fault|)\nVC @ IPP < VABS(MAX) − VOVERSHOOT",
    topology: [["线束入口", "CANH/CANL/Shield → TVS array"], ["EMC 网络", "CMC（可选）→ split termination"], ["物理层", "CAN/CAN-FD transceiver"], ["隔离系统", "Digital isolator + isolated power → BMS MCU"]],
    nodes: [["connector","J1","CANH / CANL",65,210],["tvs","D1","CAN TVS",210,405],["filter","L1","CMC",300,210],["resistor","RT","Split Term.",455,405],["load","U1","CAN-FD PHY",535,210],["load","U2","Digital ISO",715,210],["load","U3","BMS MCU",905,210],["source","ISO","Isolated 5V",715,365]],
    wires: [[[110,190],[250,190]],[[110,230],[250,230]],[[350,190],[485,190]],[[350,230],[485,230]],[[585,210],[665,210]],[[765,210],[855,210]],[[210,210],[210,365]],[[455,210],[455,365]],[[210,445],[210,500]],[[455,445],[455,500]],[[715,333],[715,245]]],
    surge: [[30,150],[85,150],[85,230],[210,230],[210,490]], ground:[210,500], boundary:[480,125,485,175]
  },
  contactor: {
    selection: [["VRWM", "> 线圈最高电压"], ["VC", "MOSFET 与释放时间折中"], ["能量", "≥ ½LI² + margin"], ["脉冲次数", "寿命周期校核"], ["方向", "单向 TVS/组合"], ["热设计", "重复脉冲降额"]],
    selectionNote: "这里的关键不是峰值功率标签，而是线圈能量、重复频率、温度降额和接触器释放时间。需要线圈 L、R 与峰值电流实测。",
    stress: [["MOSFET VDS", 76, "VC + VS", "warn"], ["单次能量", 66, "½LI²", ""], ["重复热应力", 58, "fSW · E", ""], ["释放时间", 72, "VC tradeoff", "warn"]],
    equation: "ECOIL = ½ · LCOIL · IPEAK²\nVDS,PK ≈ VSUPPLY + VCLAMP + LSTRAY·di/dt",
    topology: [["线圈供电", "+12/24 V → Fuse → contactor coil"], ["关断钳位", "TVS/TVS+diode 跨线圈或跨 MOSFET"], ["功率开关", "N-MOSFET low-side + current sense"], ["控制链", "BMS MCU → isolated/gate driver → gate resistor"]],
    nodes: [["source","VBAT","12/24V",65,150],["fuse","F1","Coil Fuse",210,150],["coil","K1","Contactor Coil",390,210],["tvs","D1","Flyback TVS",390,400],["switch","Q1","N-MOSFET",570,315],["resistor","RS","Current Sense",570,455],["load","U1","Gate Driver",750,315],["resistor","RG","Gate R",660,315],["load","U2","BMS MCU",940,315]],
    wires: [[[110,150],[165,150]],[[255,150],[390,150],[390,170]],[[390,250],[390,360]],[[390,250],[570,250],[570,275]],[[390,440],[390,455],[520,455]],[[570,355],[570,415]],[[610,315],[620,315]],[[700,315],[700,315]],[[800,315],[890,315]]],
    surge: [[390,260],[390,360],[390,440],[570,440],[570,260]], ground:[570,495], boundary:[515,230,485,285]
  },
  "data-center": {
    selection: [["VRWM", "≥ 60–64 V 评估"], ["VBR", "避开母线容差"], ["目标 VC", "< FET/IC derated limit"], ["IPP", "由源阻抗决定"], ["PPP", "波形与温度降额"], ["封装", "SMC/高功率方案"]],
    selectionNote: "48/54 V 母线常含容差、动态升高和热插拔事件。表中仅为初始评估方向，不应直接据此锁定 60 V 或更高 VRWM 器件。",
    stress: [["母线裕量", 80, "54V + tol.", "warn"], ["FET VDS", 74, "VC + overshoot", "warn"], ["MOSFET SOA", 82, "inrush", "danger"], ["TVS 热应力", 61, "pulse derating", ""]],
    equation: "IFET(t) = CLOAD · dVOUT/dt\nPTVS(t) = VCLAMP(t) · ITVS(t)",
    topology: [["母线入口", "Blind-mate connector → Fuse → TVS"], ["浪涌与反接", "ORing / back-to-back MOSFET"], ["热插拔控制", "Controller senses VIN, VOUT, current and gate"], ["后级供电", "Bulk capacitors → isolated DC/DC / point-of-load rails"]],
    nodes: [["connector","J1","48/54V BUS",65,210],["fuse","F1","Fuse",195,210],["tvs","D1","TVS 评估",325,400],["switch","Q1/Q2","Back-to-back FET",405,210],["load","U1","Hot-swap CTRL",545,365],["resistor","RS","Current Sense",590,210],["load","CIN","Bulk Cap",720,400],["load","U2","Isolated DC/DC",785,210],["load","LOAD","POL Rails",980,210]],
    wires: [[[110,210],[150,210]],[[240,210],[355,210]],[[455,210],[545,210]],[[635,210],[735,210]],[[835,210],[930,210]],[[325,210],[325,360]],[[325,440],[325,500]],[[545,325],[545,245]],[[720,210],[720,360]],[[720,440],[720,500]]],
    surge: [[30,160],[85,160],[85,210],[325,210],[325,490]], ground:[325,500], boundary:[530,125,510,175]
  }
};

circuits.forEach(circuit => Object.assign(circuit, engineering[circuit.id]));

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
  const [bx, by, bw, bh] = circuit.boundary;
  const stressCards = showSurge ? circuit.stress.slice(0, 3).map(([label,,value], index) => `
    <g class="stress-card" transform="translate(${590 + index * 155} 68)"><rect width="140" height="42" rx="5"/><text x="10" y="17">${label}</text><text x="10" y="34">${value}</text></g>`).join("") : "";
  schematic.innerHTML = `<svg viewBox="0 0 1100 580" aria-labelledby="svg-title">
    <title id="svg-title">${circuit.title}连接示意图</title>
    <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 Z" fill="#e7533f"/></marker></defs>
    <g id="viewport" transform="translate(${transform.x} ${transform.y}) scale(${transform.scale})">
      <rect class="c-zone" x="20" y="115" width="475" height="415" rx="12"/>
      <text class="c-zone-title" x="38" y="140">FIELD / SURGE SIDE</text>
      <rect class="protected-boundary" x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="12"/>
      <text class="protected-text" x="${bx+14}" y="${by+24}">PROTECTED DOMAIN / DOWNSTREAM TOPOLOGY</text>
      ${circuit.wires.map(w => polyline(w, "c-wire")).join("")}
      ${groundMarkup(circuit.ground)}
      ${circuit.nodes.map(componentMarkup).join("")}
      <g class="surge-layer">
        ${polyline(circuit.surge, "surge-path")}
        <circle class="surge-badge" cx="${circuit.surge[0][0]}" cy="${circuit.surge[0][1]-24}" r="21"/>
        <text class="surge-text" x="${circuit.surge[0][0]}" y="${circuit.surge[0][1]-19}">SURGE</text>
      </g>
      <g class="surge-layer">${stressCards}</g>
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
  document.querySelector("#selection-grid").innerHTML = c.selection.map(([key,value]) => `<div class="selection-item"><span>${key}</span><strong>${value}</strong></div>`).join("");
  document.querySelector("#selection-note").textContent = c.selectionNote;
  document.querySelector("#stress-status").textContent = "Requires validation";
  document.querySelector("#stress-bars").innerHTML = c.stress.map(([label,percent,value,state]) => `<div class="stress-row"><span>${label}</span><div class="stress-track"><div class="stress-fill ${state}" style="width:${percent}%"></div></div><span class="stress-value">${value}</span></div>`).join("");
  document.querySelector("#equation").textContent = c.equation;
  document.querySelector("#topology-list").innerHTML = c.topology.map(([title,description]) => `<li><strong>${title}</strong>${description}</li>`).join("");
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
  showSurge = true;
  toggle.classList.add("active");
  document.querySelector("#normal-view").classList.remove("active");
  toggle.setAttribute("aria-pressed", "true");
  renderSchematic(circuits.find(item => item.id === selected));
});
document.querySelector("#normal-view").addEventListener("click", event => {
  showSurge = false;
  event.currentTarget.classList.add("active");
  toggle.classList.remove("active");
  toggle.setAttribute("aria-pressed", "false");
  renderSchematic(circuits.find(item => item.id === selected));
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
