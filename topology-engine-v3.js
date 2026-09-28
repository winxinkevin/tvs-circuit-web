(function(){
const layoutCss=document.createElement("link");layoutCss.rel="stylesheet";layoutCss.href="./layout-fix-v3.css?v=1";document.head.appendChild(layoutCss);
const relabel=()=>document.querySelectorAll(".diagram-card .cardbar h3").forEach(h=>{if(h.textContent==="系统级能量链路")h.textContent="系统能量链路（含旁路、支路与双向路径）";if(h.textContent==="器件级功率拓扑与保护位置")h.textContent="关键功率级拓扑与保护位置（专用模型）"});
window.addEventListener("DOMContentLoaded",()=>{relabel();new MutationObserver(relabel).observe(document.body,{childList:true,subtree:true})});
const esc=s=>String(s??"").replace(/[&<>]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[m]));
const special={
 "boost-pfc":["AC输入","Fuse·MOV·EMI","整流桥 BR1","LBOOST·Q1·D1","400V DC-Link"],
 "totem-pole":["AC输入","Fuse·MOV·EMI","LBOOST","Totem-Pole功率桥 HF腿+LF腿","400V DC-Link"],
 "vienna":["三相AC","三相SPD·EMI","L1/L2/L3","Vienna三电平桥 S1–S3·D1–D6","分裂母线 C+ / C−"],
 "bridge-rectifier":["AC输入","Fuse·MOV·EMI","整流桥 BR1","NTC/有源限流","Bulk电容","离线DC/DC"],
 "interleaved-pfc":["AC输入","整流桥","相A: LA·QA·DA","相B: LB·QB·DB","400V DC-Link"],
 "bridgeless-pfc":["AC输入","EMI·SPD","正半周 Boost","负半周 Boost","400V DC-Link"],
 "active-front-end":["三相AC","三相SPD","LCL滤波","六开关AFE Q1–Q6","DC-Link"],
 "llc":["400V DC-Link","半桥 Q1/Q2","Lr·Cr·Lm","高频变压器 T1","同步整流 SR1/SR2","Co·48/12V"],
 "dab":["母线A","全桥A Q1–Q4","漏感/外置Lk","高频变压器 T1","全桥B Q5–Q8","母线B"],
 "hvdc-rack":["三相AC","Vienna/AFE","±400V/800V母线","SSCB·IMD·预充","DAB/CLLC","48V/POL","GPU/ASIC"],
 "online-ups":["市电输入","PFC整流","DC-Link","PWM逆变器","LCL滤波","关键负载"],
 "motor-drive":["三相AC","整流/AFE","DC-Link","制动单元","三相VSI Q1–Q6","电机"],
 "flyback":["整流DC","Cin","主开关Q1·反激T1","次级D1/SR","Co","负载"],
 "acf":["整流DC","Cin","Qmain·Qclamp·Cclamp","反激T1","同步整流SR","Co·负载"],
 "forward":["DC-Link","双开关Q1/Q2","正激T1·复位二极管","Drect·Dfree","Lo·Co","负载"],
 "psfb":["400V母线","移相全桥 Q1–Q4","高频T1","同步整流","Lo·Co","48/54V"],
 "full-bridge":["高压DC","PWM全桥 Q1–Q4","高频T1","全波整流","LC输出","负载"],
 "cllc":["母线A","全桥A","Lr1·Cr1","高频T1","Cr2·Lr2","全桥B","母线B"],
 "buck":["DC输入","Fuse/eFuse·TVS","QH/QL半桥","L1","Cout","负载"],
 "boost":["DC输入","Fuse·TVS","LBOOST","QBOOST·DBOOST","Cout","升压母线"],
 "buckboost":["DC输入","Buck半桥 Q1/Q2","L1","Boost半桥 Q3/Q4","Cout","负载"],
 "sepic":["DC输入","L1","串联电容 CSEPIC","Q1·L2·D1","Cout","负载"],
 "bidir-buckboost":["电池","Fuse·接触器","半桥A","L1","半桥B","DC-Link"],
 "ibc48-12":["48/54V输入","Hot-Swap·ORing","半桥LLC/PSFB","高频T1","同步整流","12V总线"],
 "multiphase-vrm":["12/48V输入","多相控制器","DrMOS×N","L/TLVR×N","大电流输出电容","GPU/CPU"],
 "grid-inverter":["DC输入","DC SPD·预充","DC-Link","三相桥 Q1–Q6","LCL滤波","接触器","电网"],
 "pcs":["电池簇","Fuse·接触器·预充","DC-Link","双向三相桥","LCL/工频变压器","电网"],
 "pv-mppt":["PV组串","DC SPD·隔离开关","MPPT Boost","DC-Link","并网逆变器","LCL·接触器","电网"],
 "hot-swap-oring":["A/B冗余48/54V","Fuse·TVS","ORing FET A/B","Hot-Swap FET","Bulk电容","机架负载"],
 "hvdc400":["集中整流器","380–400V母线","DC SPD·断路器","机架预充","隔离DC/DC","48V/POL"],
 "bbu":["电池模组","BMS·Fuse","接触器·预充","双向DC/DC","48/400V机架母线","服务器负载"]
};
const notes={
 "totem-pole":"高频桥臂与工频桥臂均直接连接交流端，不包含前级整流桥。",
 "vienna":"三相升压电感进入三电平整流桥，输出为带中点的分裂直流母线。",
 "dab":"两侧均为有源全桥，能量可双向流动；漏感/外置电感位于两桥之间。",
 "flyback":"反激变压器兼作储能元件，主开关导通时次级整流器截止。",
 "boost":"电感位于输入侧，开关接地，升压二极管通向输出电容。",
 "sepic":"L1、串联耦合电容、L2、开关与整流二极管构成非反相升降压功率级。",
 "hot-swap-oring":"A/B两路先独立完成保险、TVS与ORing，再汇合进入Hot-Swap和Bulk电容。"
};
function arrow(id,bidir=false){return `<defs><marker id="a${id}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#126581"/></marker><marker id="ar${id}" markerWidth="8" markerHeight="8" refX="1" refY="4" orient="auto"><path d="M8 0L0 4L8 8Z" fill="#126581"/></marker><marker id="s${id}" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#d43d2f"/></marker></defs>`}
function block(x,y,w,h,title,sub,kind=""){return `<g class="v3-block ${kind}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><circle cx="${x}" cy="${y+h/2}" r="3"/><circle cx="${x+w}" cy="${y+h/2}" r="3"/><text class="btitle" x="${x+w/2}" y="${y+h/2-5}">${esc(title)}</text><text class="bsub" x="${x+w/2}" y="${y+h/2+15}">${esc(sub||"")}</text></g>`}
function edge(x1,y1,x2,y2,id,bidir=false,cls="energy"){const m=bidir?`marker-start="url(#ar${id})" marker-end="url(#a${id})"`:`marker-end="url(#a${id})"`;return `<path class="${cls}" ${m} d="M${x1} ${y1}H${x2}V${y2}"/>`}
function systemDefault(t){
 const stages=special[t.id]||t.stages,n=stages.length,g=18,w=Math.max(104,Math.min(142,(1120-g*(n-1))/n)),total=w*n+g*(n-1),x0=(1200-total)/2,y=166,h=72,id=t.id.replace(/\W/g,""),bi=t.direction.includes("⇄");let s=arrow(id,bi);
 stages.forEach((name,i)=>{const x=x0+i*(w+g);s+=block(x,y,w,h,name,i===0?t.direction:i===n-1?"输出/负载":"功率级",i===n-1?"protected":"");if(i<n-1)s+=edge(x+w,y+h/2,x+w+g-4,y+h/2,id,bi)});
 const protect=stages.findIndex(x=>/保护|SPD|MOV|Fuse|保险丝|浪涌/.test(x));const px=x0+(protect>=0?protect:0)*(w+g)+w/2;
 s+=`<path class="surge-v3" marker-end="url(#s${id})" d="M${px} 62V${y-8}"/><text class="surge-text" x="${Math.max(35,px-78)}" y="48">外部瞬态入口</text><text class="sys-note" x="40" y="300">实线：主能量路径　双箭头：双向功率流　红色虚线：瞬态耦合到入口保护节点</text>`;return `<svg class="diagram system-svg professional-system" viewBox="0 0 1200 330" data-system-model="${esc(t.id)}">${s}</svg>`}
function systemUps(t){const id="ups",s=arrow(id,true);return `<svg class="diagram system-svg professional-system" viewBox="0 0 1200 390" data-system-model="${t.id}">${s}
${block(55,150,130,64,"市电输入","AC")}${block(240,150,130,64,"PFC整流","AC→DC")}${block(425,150,130,64,"DC-Link","400/800V")}${block(610,150,130,64,"PWM逆变器","DC→AC")}${block(795,150,130,64,"LCL滤波","正弦输出")}${block(1010,150,130,64,"关键负载","受保护","protected")}
${edge(185,182,236,182,id)}${edge(370,182,421,182,id)}${edge(555,182,606,182,id)}${edge(740,182,791,182,id)}${edge(925,182,1006,182,id)}
${block(300,280,130,58,"电池组","Fuse·BMS")}${block(500,280,150,58,"双向电池DC/DC","充电/放电")}${edge(430,309,496,309,id,true)}<path class="energy bidir" marker-start="url(#ar${id})" marker-end="url(#a${id})" d="M650 309H700V214H555"/>
${block(410,45,160,55,"静态旁路","STS")}${edge(185,182,235,182,id)}<path class="energy" marker-end="url(#a${id})" d="M185 182H215V72H406"/><path class="energy" marker-end="url(#a${id})" d="M570 72H970V182H1006"/>
<path class="surge-v3" marker-end="url(#s${id})" d="M90 86V142"/><text class="surge-text" x="42" y="72">市电浪涌</text><text class="sys-note" x="45" y="368">双变换主通道、电池支路与静态旁路分别绘制；旁路不经过 DC-Link 与逆变器。</text></svg>`}
function systemHotSwap(t){const id="hs",s=arrow(id);return `<svg class="diagram system-svg professional-system" viewBox="0 0 1200 360" data-system-model="${t.id}">${s}
${block(50,75,130,58,"输入A","48/54V")}${block(50,225,130,58,"输入B","48/54V")}${block(250,75,130,58,"Fuse·TVS A","独立保护")}${block(250,225,130,58,"Fuse·TVS B","独立保护")}${block(455,75,130,58,"ORing FET A","防反灌")}${block(455,225,130,58,"ORing FET B","防反灌")}${block(690,150,145,64,"Hot-Swap FET","浪涌限流")}${block(900,150,110,64,"Bulk电容","受控充电")}${block(1060,150,100,64,"负载","机架","protected")}
${edge(180,104,246,104,id)}${edge(180,254,246,254,id)}${edge(380,104,451,104,id)}${edge(380,254,451,254,id)}<path class="energy" marker-end="url(#a${id})" d="M585 104H640V182H686"/><path class="energy" marker-end="url(#a${id})" d="M585 254H640V182H686"/>${edge(835,182,896,182,id)}${edge(1010,182,1056,182,id)}
<path class="surge-v3" marker-end="url(#s${id})" d="M310 24V67"/><text class="surge-text" x="220" y="18">A/B支路分别钳位</text><text class="sys-note" x="45" y="335">两路输入在 ORing 后汇合，Hot-Swap 只位于公共母线上；不把 A/B 冗余源错误串联。</text></svg>`}
function systemParallelPfc(t){const id=("sp"+t.id).replace(/\W/g,""),s=arrow(id);const a=t.id==="interleaved-pfc"?"相A: LA·QA·DA":"正半周 Boost",b=t.id==="interleaved-pfc"?"相B: LB·QB·DB":"负半周 Boost";return `<svg class="diagram system-svg professional-system" viewBox="0 0 1200 360" data-system-model="${t.id}">${s}
${block(55,150,140,64,"AC输入","Fuse·SPD")}${block(255,150,140,64,t.id==="interleaved-pfc"?"整流桥":"EMI滤波","公共前端")}${block(480,70,170,58,a,"功率通道A")}${block(480,230,170,58,b,"功率通道B")}${block(755,150,145,64,"汇流节点","电流均衡")}${block(1000,150,140,64,"DC-Link","400V","protected")}
${edge(195,182,251,182,id)}<path class="energy" marker-end="url(#a${id})" d="M395 182H435V99H476"/><path class="energy" marker-end="url(#a${id})" d="M395 182H435V259H476"/><path class="energy" marker-end="url(#a${id})" d="M650 99H700V182H751"/><path class="energy" marker-end="url(#a${id})" d="M650 259H700V182H751"/>${edge(900,182,996,182,id)}
<path class="surge-v3" marker-end="url(#s${id})" d="M125 70V142"/><text class="surge-text" x="55" y="56">入口浪涌</text><text class="sys-note" x="45" y="335">两条 Boost 功率通道并联汇流，不作串联级处理；各通道具有独立电感、开关和整流器件。</text></svg>`}
function systemMotor(t){const id="motor",s=arrow(id);return `<svg class="diagram system-svg professional-system" viewBox="0 0 1200 370" data-system-model="${t.id}">${s}
${block(55,150,140,64,"三相AC","SPD·EMI")}${block(245,150,145,64,"整流/AFE","AC→DC")}${block(450,150,145,64,"DC-Link","CDC")}${block(705,150,150,64,"三相VSI","Q1–Q6")}${block(1010,150,130,64,"电机","U/V/W","protected")}
${edge(195,182,241,182,id)}${edge(390,182,446,182,id)}${edge(595,182,701,182,id)}${edge(855,182,1006,182,id)}
${block(450,275,145,58,"制动支路","QBR · RBR")}<path class="energy bidir" d="M522 275V214"/><circle class="junction" cx="522" cy="214" r="4"/>
<path class="surge-v3" marker-end="url(#s${id})" d="M780 70V142"/><text class="surge-text" x="686" y="56">VSI关断尖峰</text><text class="sys-note" x="45" y="347">制动单元并联在 DC-Link 上吸收回馈能量，不位于整流器与逆变器之间的串联主路径。</text></svg>`}
function systemVrm(t){const id="vrm",s=arrow(id);return `<svg class="diagram system-svg professional-system" viewBox="0 0 1200 360" data-system-model="${t.id}">${s}
${block(70,150,150,64,"12/48V输入","Hot-Swap·Cin")}${block(350,150,175,64,"多相功率级 ×N","DrMOS + L/TLVR")}${block(690,150,155,64,"输出电容阵列","低ESR/低ESL")}${block(1010,150,130,64,"GPU/CPU","0.6–1.8V","protected")}
${edge(220,182,346,182,id)}${edge(525,182,686,182,id)}${edge(845,182,1006,182,id)}${block(350,275,175,58,"多相PWM控制器","均流·遥感")}<path class="control-v3" d="M438 275V214"/>
<path class="surge-v3" marker-end="url(#s${id})" d="M145 70V142"/><text class="surge-text" x="72" y="56">输入热插拔</text><text class="sys-note" x="45" y="335">控制器通过控制线驱动各相，不串入主能量路径；N 相 DrMOS 与电感并联汇流至核心电源。</text></svg>`}
window.renderProfessionalSystem=t=>t.id==="online-ups"?systemUps(t):t.id==="hot-swap-oring"?systemHotSwap(t):["interleaved-pfc","bridgeless-pfc"].includes(t.id)?systemParallelPfc(t):t.id==="motor-drive"?systemMotor(t):t.id==="multiphase-vrm"?systemVrm(t):systemDefault(t);
function card(x,y,w,h,title,parts,accent=""){return`<g class="power-card ${accent}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4"/><circle cx="${x}" cy="${y+h/2}" r="3"/><circle cx="${x+w}" cy="${y+h/2}" r="3"/><text class="ctitle" x="${x+w/2}" y="${y+28}">${esc(title)}</text>${parts.map((p,i)=>`<text class="cpart" x="${x+w/2}" y="${y+51+i*18}">${esc(p)}</text>`).join("")}</g>`}
function schematicChain(t,items,opt={}){
 const id=("p"+t.id).replace(/\W/g,""),n=items.length,g=22,w=Math.max(112,Math.min(155,(1110-g*(n-1))/n)),total=w*n+g*(n-1),x0=(1200-total)/2,y=154,h=122,bi=!!opt.bidir;let s=arrow(id,bi);
 items.forEach((it,i)=>{const x=x0+i*(w+g);s+=card(x,y,w,h,it[0],it.slice(1),i===n-1?"protected":"");if(i<n-1)s+=edge(x+w,y+h/2,x+w+g-4,y+h/2,id,bi,"power-net")});
 if(opt.branch){const b=opt.branch,idx=b.at||0,bx=x0+idx*(w+g)+w/2,by=350;s+=card(bx-75,by,150,82,b.title,b.parts||[],b.accent||"");s+=`<path class="power-net ${b.bidir?"bidir":""}" ${b.bidir?`marker-start="url(#ar${id})" marker-end="url(#a${id})"`:`marker-end="url(#a${id})"`} d="M${bx} ${by}V${y+h}"/>`}
 const clamp=opt.clampAt??1,cx=x0+Math.min(clamp,n-1)*(w+g)+w/2;s+=`<path class="surge-v3" marker-end="url(#s${id})" d="M${cx} 78V${y-8}"/><text class="surge-text" x="${Math.max(35,cx-105)}" y="64">${esc(opt.surge||"瞬态/关断尖峰进入保护节点")}</text>`;
 const note=opt.note||notes[t.id]||"各模块端口按主功率网络连接；器件代号、能量方向和保护位置与该拓扑对应。";s+=`<g class="model-badge"><rect x="920" y="30" width="230" height="32" rx="4"/><text x="1035" y="51">专用拓扑模型 · ${esc(t.id)}</text></g><text class="drawing-note-v3" x="45" y="488">${esc(note)}</text>`;return`<svg class="diagram schematic-svg topology-v3" viewBox="0 0 1200 520" data-topology-model="${esc(t.id)}" data-invalid-links="0">${s}</svg>`}
function schematicParallelPfc(t){const id=("pp"+t.id).replace(/\W/g,""),s=arrow(id);const inter=t.id==="interleaved-pfc",a=inter?"相A功率级":"正半周功率级",b=inter?"相B功率级":"负半周功率级",ap=inter?["LA · QA · DA"]:["L1 · Q1 · D1"],bp=inter?["LB · QB · DB"]:["L2 · Q2 · D2"];return`<svg class="diagram schematic-svg topology-v3" viewBox="0 0 1200 520" data-topology-model="${t.id}" data-invalid-links="0">${s}
${card(55,190,155,112,inter?"整流后母线":"AC/EMI入口",inter?["BR1 · Cin"]:["Fuse · SPD"]) }${card(330,85,185,102,a,ap)}${card(330,305,185,102,b,bp)}${card(690,190,160,112,inter?"交错汇流":"半周汇流",inter?["180°移相"]:["Q3/Q4回流"]) }${card(1010,190,145,112,"DC-Link",["CDC · 400V"],"protected")}
<path class="power-net" marker-end="url(#a${id})" d="M210 246H270V136H326"/><path class="power-net" marker-end="url(#a${id})" d="M210 246H270V356H326"/><path class="power-net" marker-end="url(#a${id})" d="M515 136H600V246H686"/><path class="power-net" marker-end="url(#a${id})" d="M515 356H600V246H686"/><path class="power-net" marker-end="url(#a${id})" d="M850 246H1006"/>
<path class="surge-v3" marker-end="url(#s${id})" d="M132 90V182"/><text class="surge-text" x="55" y="75">${inter?"两相SW节点尖峰":"正/负半周换向尖峰"}</text><g class="model-badge"><rect x="920" y="30" width="230" height="32" rx="4"/><text x="1035" y="51">专用拓扑模型 · ${t.id}</text></g><text class="drawing-note-v3" x="45" y="478">两条功率通道并联接入同一输入与 DC-Link，不作为前后级串联模块。</text></svg>`}
function spec(t){
 const S=special[t.id]||t.stages.map(x=>[x]);
 switch(t.id){
  case"boost-pfc":return schematicChain(t,[["交流入口","F1 · MOV1","CMC/X电容"],["整流桥","BR1 · NTC"],["Boost功率级","LBOOST","Q1 · DBOOST"],["DC-Link","CDC 450V","400V输出"]],{clampAt:0,surge:"IEC 61000-4-5 → MOV/GDT",note:"整流桥位于 Boost 之前；Q1 从 SW 节点接回负母线，DBOOST 从 SW 节点接向 DC-Link。"});
  case"totem-pole":return schematicChain(t,[["交流入口","F1 · MOV1","EMI"],["Boost电感","LBOOST"],["Totem-Pole功率桥","HF: Q1/Q2 · GaN/SiC","LF: Q3/Q4 · Si MOS"],["DC-Link","CDC · 400V"]],{clampAt:0,surge:"市电浪涌 → 入口SPD",note:notes[t.id]});
  case"vienna":return schematicChain(t,[["三相入口","F1–F3 · SPD"],["升压电感","L1/L2/L3"],["Vienna三电平桥","S1–S3 · D1–D6","NP采样与平衡控制"],["分裂DC-Link","C+ / C−","700–800V"]],{clampAt:0,surge:"三相共模/差模浪涌",note:notes[t.id]});
  case"interleaved-pfc":case"bridgeless-pfc":return schematicParallelPfc(t);
  case"active-front-end":return schematicChain(t,[["三相入口","SPD · 接触器"],["LCL滤波","La/Lb/Lc"],["两电平AFE","Q1–Q6","SiC/IGBT"],["DC-Link","CDC","双向母线"]],{bidir:true,clampAt:2,surge:"桥臂关断过冲"});
  case"bridge-rectifier":return schematicChain(t,[["交流入口","F1 · MOV1","EMI"],["整流桥","BR1"],["浪涌限流","NTC/继电器"],["Bulk电容","CBULK"],["离线DC/DC","Flyback/LLC"]],{clampAt:0,surge:"市电浪涌 → MOV"});
  case"llc":return schematicChain(t,[["半桥","Q1/Q2"],["谐振腔","Lr · Cr · Lm"],["高频变压器","T1"],["同步整流","SR1/SR2"],["输出滤波","Co · 48/12V"]],{clampAt:0,surge:"半桥VDS关断尖峰"});
  case"dab":return schematicChain(t,[["有源全桥A","Q1–Q4"],["传输电感","Lk/Lext"],["高频变压器","T1"],["有源全桥B","Q5–Q8"],["母线B","CB"]],{bidir:true,clampAt:1,surge:"移相换向尖峰",note:notes[t.id]});
  case"cllc":return schematicChain(t,[["全桥A","Q1–Q4"],["一次谐振腔","Lr1 · Cr1"],["高频变压器","T1"],["二次谐振腔","Cr2 · Lr2"],["全桥B","Q5–Q8"]],{bidir:true,clampAt:1,surge:"谐振换向异常"});
  case"flyback":return schematicChain(t,[["输入母线","Cin"],["反激功率级","Q1 · T1","RCD/有源钳位"],["次级整流","D1/SR1"],["输出滤波","Co"],["负载","5–48V"]],{clampAt:1,surge:"T1漏感关断尖峰",note:notes[t.id]});
  case"acf":return schematicChain(t,[["输入母线","Cin"],["有源钳位反激","Qmain · Qclamp","Cclamp · T1"],["同步整流","SR1"],["输出滤波","Co"],["负载","5–48V"]],{clampAt:1,surge:"钳位电容过压"});
  case"forward":return schematicChain(t,[["输入母线","Cin"],["双开关正激","Q1/Q2 · T1","Dreset1/2"],["次级整流","Drect · Dfree"],["输出电感","Lo · Co"],["负载","12–48V"]],{clampAt:1,surge:"漏感与复位尖峰"});
  case"psfb":return schematicChain(t,[["移相全桥","Q1–Q4"],["高频变压器","T1 · Lk"],["同步整流","SR1–SR4"],["输出电感","Lo"],["输出母线","Co · 48/54V"]],{clampAt:0,surge:"滞后桥臂换向尖峰"});
  case"full-bridge":return schematicChain(t,[["PWM全桥","Q1–Q4"],["高频变压器","T1"],["全波整流","D1–D4/SR"],["LC滤波","Lo · Co"],["负载","隔离输出"]],{clampAt:0,surge:"全桥关断尖峰"});
  case"buck":return schematicChain(t,[["输入保护","F1 · TVS1","Cin"],["同步半桥","QH/QL"],["输出电感","L1"],["输出电容","Cout"],["负载","POL"]],{clampAt:0,surge:"热插拔/长线振铃"});
  case"boost":return schematicChain(t,[["输入保护","F1 · TVS1","Cin"],["升压电感","LBOOST"],["升压开关节点","QBOOST → PGND","DBOOST → VOUT"],["输出电容","Cout"],["升压母线","VOUT > VIN"]],{clampAt:2,surge:"QBOOST关断尖峰",note:notes[t.id]});
  case"buckboost":return schematicChain(t,[["输入母线","Cin"],["Buck半桥","Q1/Q2"],["功率电感","L1"],["Boost半桥","Q3/Q4"],["输出母线","Cout"]],{clampAt:2,surge:"两侧SW节点过冲"});
  case"sepic":return schematicChain(t,[["输入母线","Cin"],["输入电感","L1"],["串联耦合电容","CSEPIC"],["开关/耦合节点","Q1 · L2 · D1"],["输出滤波","Cout"],["负载","非反相输出"]],{clampAt:3,surge:"Q1关断尖峰",note:notes[t.id]});
  case"bidir-buckboost":case"bbu":return schematicChain(t,[["电池侧","Fuse · 接触器"],["半桥A","Q1/Q2"],["功率电感","L1"],["半桥B","Q3/Q4"],["机架母线","Cbus"]],{bidir:true,branch:{at:0,title:"BMS/预充",parts:["采样·隔离"],bidir:false},clampAt:2,surge:"双向故障电流"});
  case"multiphase-vrm":return schematicChain(t,[["输入保护","Hot-Swap · Cin"],["多相PWM","相位交错"],["DrMOS × N","QH/QL × N"],["L/TLVR × N","并联汇流"],["核心电源","Cout阵列","GPU/CPU"]],{clampAt:2,surge:"DrMOS SW节点尖峰"});
  case"hot-swap-oring":return schematicChain(t,[["输入A/B","FuseA/B · TVSA/B"],["ORing级","QOA/QOB"],["公共Hot-Swap","QHS · Rsense"],["Bulk电容","CBULK"],["机架负载","48/54V"]],{clampAt:0,surge:"A/B线路浪涌",note:notes[t.id]});
  case"motor-drive":return schematicChain(t,[["整流/AFE","BR/Q1–Q6"],["DC-Link","CDC"],["三相VSI","Q1–Q6"],["电机","U/V/W"]],{branch:{at:1,title:"制动支路",parts:["QBR · RBR"],bidir:false},clampAt:2,surge:"VSI关断尖峰",note:"制动支路并联在 DC-Link 上；三相 VSI 由六个功率开关构成，输出 U/V/W 接电机。"});
  case"grid-inverter":case"pcs":return schematicChain(t,[["直流侧","SPD · 预充"],["DC-Link","CDC"],["三相桥","Q1–Q6"],["LCL滤波","L1 · Cf · L2"],["接触器/变压器","Kgrid"],["电网","3φ AC"]],{bidir:t.id==="pcs",clampAt:2,surge:"桥臂关断与电网浪涌"});
  case"pv-mppt":return schematicChain(t,[["PV组串","DC SPD"],["MPPT Boost","L · Q · D"],["DC-Link","CDC"],["三相逆变桥","Q1–Q6"],["LCL/接触器","并网保护"],["电网","AC"]],{clampAt:1,surge:"PV侧浪涌/Boost尖峰"});
  case"online-ups":return schematicChain(t,[["PFC整流","BR · L · Q"],["DC-Link","CDC"],["PWM逆变器","Q1–Q4/6"],["LCL滤波","Lf · Cf"],["关键负载","AC"]],{branch:{at:1,title:"电池双向DC/DC",parts:["Battery ⇄ DC-Link"],bidir:true},clampAt:0,surge:"市电浪涌/桥臂过冲"});
  case"hvdc-rack":case"hvdc400":return schematicChain(t,[["高压入口","DC Fuse · SPD"],["预充/SSCB","Rpre · Kpre"],["HVDC母线","Cbus · IMD"],["隔离DC/DC","DAB/CLLC"],["低压母线","48V/POL"],["计算负载","GPU/ASIC"]],{clampAt:0,surge:"HVDC故障/外部浪涌"});
  case"ibc48-12":return schematicChain(t,[["48/54V入口","Hot-Swap · ORing"],["LLC/PSFB","Q1–Q4"],["高频变压器","T1"],["同步整流","SR1–SR4"],["12V母线","Co"]],{clampAt:0,surge:"热插拔浪涌"});
  default:return schematicChain(t,S.map(x=>Array.isArray(x)?x:[x]),{bidir:t.direction.includes("⇄")});
 }
}
window.renderProfessionalSchematic=spec;
})();
