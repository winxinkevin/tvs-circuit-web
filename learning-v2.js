(function(){
"use strict";

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const topologies=window.POWER_TOPOLOGIES||[];

const SOURCES={
  smbj:{label:"Littelfuse SMBJ 600 W系列数据手册",url:"https://www.littelfuse.com/assetdocs/littelfuse_tvs_diode_smbj_datasheet.pdf?assetguid=09a6ae9a-73cb-4ac4-acac-e6dab92ab953"},
  smcj:{label:"Littelfuse SMCJ 1500 W系列数据手册",url:"https://www.littelfuse.com/assetdocs/tvs-diodes-smcj-datasheet?assetguid=37388813-0d6d-4329-969b-1aa8b7614ac1"},
  axial:{label:"Littelfuse 1.5KE 1500 W系列数据手册",url:"https://www.littelfuse.com/~/media/electronics/datasheets/tvs_diodes/littelfuse_tvs_diode_1_5ke_datasheet.pdf.pdf"},
  sm712:{label:"Littelfuse SM712 RS-485保护系列",url:"https://www.littelfuse.com/assetdocs/littelfuse-tvs-diode-array-sm712-datasheet?assetguid=8313a28c-8802-4d47-a2a7-e30b5b1f67d8"}
};

const PARTS={
  SMBJ15A:{model:"SMBJ15A",vrwm:15,vbr:"16.7–18.5",vc:24.4,ipp:24.6,ppp:"600 W",source:"smbj"},
  SMBJ18A:{model:"SMBJ18A",vrwm:18,vbr:"20.0–22.1",vc:29.2,ipp:20.5,ppp:"600 W",source:"smbj"},
  SMBJ24A:{model:"SMBJ24A",vrwm:24,vbr:"26.7–29.5",vc:38.9,ipp:15.4,ppp:"600 W",source:"smbj"},
  SMBJ33A:{model:"SMBJ33A",vrwm:33,vbr:"36.7–40.6",vc:53.3,ipp:11.3,ppp:"600 W",source:"smbj"},
  SMBJ58A:{model:"SMBJ58A",vrwm:58,vbr:"64.4–71.2",vc:93.6,ipp:6.4,ppp:"600 W",source:"smbj"},
  SMCJ33A:{model:"SMCJ33A",vrwm:33,vbr:"36.7–40.6",vc:53.3,ipp:28.1,ppp:"1500 W",source:"smcj"},
  SMCJ58A:{model:"SMCJ58A",vrwm:58,vbr:"64.4–71.2",vc:93.6,ipp:16.0,ppp:"1500 W",source:"smcj"},
  SMCJ64A:{model:"SMCJ64A",vrwm:64,vbr:"71.1–78.6",vc:103,ipp:14.6,ppp:"1500 W",source:"smcj"},
  "1.5KE200A":{model:"1.5KE200A",vrwm:171,vbr:"190–210",vc:274,ipp:5.5,ppp:"1500 W",source:"axial"},
  SM712:{model:"SM712",vrwm:12,vbr:"7.5 / 13.3",vc:31,ipp:19,ppp:"600 W",source:"sm712"}
};

const PATENTS={
  totem:{no:"CN113972830B",title:"图腾柱功率因数校正电路、控制方法、装置及设备",url:"https://patents.google.com/patent/CN113972830B/zh",digest:"高频桥臂、工频桥臂与分裂电容构成PFC主路径。TVS应聚焦驱动、采样和辅助电源，不承担市电入口全部浪涌能量。"},
  llc:{no:"CN108900091B",title:"一种基于LLC谐振变换器的拓扑结构",url:"https://patents.google.com/patent/CN108900091B/zh",digest:"输入串联、输出并联的LLC单元用于高压大功率场景。同步整流关断应力仍需结合漏感、结电容和时序分析。"},
  hot:{no:"CN110995221B",title:"一种热插拔关断电路及服务器供电系统",url:"https://patents.google.com/patent/CN110995221B/zh",digest:"快速关断热插拔MOSFET会放大长线寄生电感产生的母线过冲，因此TVS残压必须与VDS额定值共同闭环。"},
  vrm:{no:"US8044645B2",title:"Multi-phase voltage regulator",url:"https://patents.google.com/patent/US8044645B2/en",digest:"多相稳压器依靠相位、电感支路和电流检测管理核心负载跃变；TVS重点位于板卡输入和辅助接口。"},
  dab:{no:"CN110212774B",title:"一种双有源桥DC-DC变换器及其回流功率优化方法",url:"https://patents.google.com/patent/CN110212774B/zh",digest:"移相角和漏感决定DAB内部回流功率与桥臂应力。母线高能故障必须由熔断、接触器或直流断路器处理。"},
  pcs:{no:"CN109217673A",title:"一种储能变流器及其控制方法",url:"https://patents.google.com/patent/CN109217673A/zh",digest:"电池侧斩波、逆变、检测和控制构成双向能量链，适合区分主母线保护与BMS、驱动和通信接口TVS。"},
  pv:{no:"CN118054383A",title:"一种光伏逆变器",url:"https://patents.google.com/patent/CN118054383A/zh",digest:"并网点浪涌通过受控回路和储能器件疏导，板级TVS负责限制SPD后的残余电压与低压接口瞬态。"},
  motor:{no:"CN118316360A",title:"永磁电机驱动器故障预测和保护方法",url:"https://patents.google.com/patent/CN118316360A/zh",digest:"预充、DC-Link、三相桥与检测链需要协同保护；栅极TVS不能替代DESAT、软关断、过流与热保护。"},
  ups:{no:"CN206226093U",title:"在线式双变换UPS系统",url:"https://patents.google.com/patent/CN206226093U/zh",digest:"市电、旁路、电池、整流和逆变形成多能源路径，各参考地的驱动、采样与通信TVS应分别评估。"},
  fly:{no:"CN104022661A",title:"超宽电压输入范围AC/DC-DC自适应仪表开关电源",url:"https://patents.google.com/patent/CN104022661A/zh",digest:"反激关断时输入电压、反射电压和漏感尖峰叠加，TVS或RCD必须按漏感能量、频率和MOSFET耐压计算。"}
};

const TOPOLOGY_META={
  "totem-pole":{role:"TVS为局部保护",insight:"市电高能浪涌由SPD/MOV/GDT承担；TVS主要保护驱动、采样和辅助电源。",patent:"totem"},
  "boost-pfc":{role:"一级浪涌不是TVS主责",insight:"输入浪涌由SPD体系处理；PFC开关尖峰优先优化换流回路与Snubber。",patent:"totem"},
  llc:{role:"TVS与Snubber协同",insight:"同步整流MOSFET会受到漏感、结电容和时序误差造成的关断过冲。",patent:"llc"},
  "hot-swap-oring":{role:"TVS为关键钳位",insight:"长线电感、热插拔和快速关断共同决定MOSFET端最坏残压。",patent:"hot"},
  "multiphase-vrm":{role:"TVS位于板卡输入",insight:"核心负载跃变由多相控制和去耦处理，TVS不应直接跨接CPU/GPU核心电源。",patent:"vrm"},
  "bidir-buckboost":{role:"双向故障源分层保护",insight:"双向能量流意味着两侧都可能成为故障源，主回路与控制接口必须分层处理。",patent:"dab"},
  dab:{role:"TVS为局部保护",insight:"移相角、回流功率与漏感共同决定桥臂应力，高能母线故障不能交给普通TVS。",patent:"dab"},
  pcs:{role:"主回路与接口分层",insight:"电池侧和电网侧都能注入能量，TVS重点保护低压控制、驱动和通信接口。",patent:"pcs"},
  "pv-mppt":{role:"SPD与TVS分级",insight:"长光伏电缆的雷击能量先由DC SPD泄放，TVS限制控制板和采样口残压。",patent:"pv"},
  boost:{role:"开关节点优先阻尼",insight:"Boost关断电压等于母线电压与寄生过冲之和，需先判断周期损耗再决定是否使用TVS。",patent:"pv"},
  "grid-inverter":{role:"AC/DC两侧分级保护",insight:"并网逆变器同时面对DC侧感应雷、AC侧浪涌和桥臂关断尖峰。",patent:"pv"},
  "active-front-end":{role:"TVS保护驱动层",insight:"AFE双向能量流使AC和DC两侧都成为故障源，桥臂依靠DESAT、软关断和有源钳位。",patent:"motor"},
  "motor-drive":{role:"TVS不能替代桥臂保护",insight:"电机回馈、长线反射和短路关断是不同应力，需要分别处理。",patent:"motor"},
  "online-ups":{role:"多路径分级保护",insight:"市电、旁路和电池构成三条能量路径，TVS重点保护控制、驱动和通信接口。",patent:"ups"},
  "bridge-rectifier":{role:"市电入口不用普通TVS",insight:"保险丝、MOV/GDT和EMI网络承担输入浪涌；低压控制板再使用TVS限制残压。",patent:"fly"},
  flyback:{role:"TVS可钳位漏感尖峰",insight:"关断时输入电压、反射电压与漏感尖峰叠加，必须按每周期能量计算。",patent:"fly"},
  buck:{role:"低压输入端TVS",insight:"长线插拔、继电器反冲与输入LC振铃需要在连接器附近形成低阻抗钳位回路。",patent:"fly"}
};

const INDUSTRIES={
  dc:{name:"数据中心",header:"数据中心 AI 服务器供电",title:"数据中心 PSU、48V机架与GPU板卡",copy:"从高效率AC/DC前端进入48V机架和GPU板卡，识别不同功率层级的TVS职责。",map:"数据中心 PSU → 48V 机架 → GPU 板卡",end:"GPU / ASIC",outcome:"覆盖PFC驱动、LLC同步整流、48V热插拔和板卡输入案例。",stages:["totem-pole","llc","hot-swap-oring","multiphase-vrm"],start:2},
  storage:{name:"储能",header:"储能 BESS 与 PCS",title:"电池簇、双向DC/DC、DAB与PCS",copy:"理解双向故障能源、接触器动作、DAB换流和PCS接口的保护边界。",map:"电池簇 → 双向DC/DC → DAB隔离 → PCS → 电网",end:"电网 / 负载",outcome:"覆盖双向驱动、辅助电源、DAB栅极和BMS通信案例。",stages:["bidir-buckboost","dab","pcs"],start:1},
  pv:{name:"光伏",header:"光伏组串与并网逆变",title:"光伏组串、MPPT与并网逆变",copy:"将雷击SPD、MPPT Boost应力和逆变器控制板残压放在同一条路径中分析。",map:"PV组串 → DC SPD → MPPT Boost → DC-Link → 并网逆变",end:"电网",outcome:"覆盖SPD后级残压、MPPT驱动、并网桥驱动和通信接口案例。",stages:["pv-mppt","boost","grid-inverter"],start:0},
  industry:{name:"工业驱动",header:"工业变频器与电机",title:"三相输入、AFE、逆变桥与电机",copy:"区分母线过压、桥臂关断、栅极异常和长线反射的保护责任。",map:"三相AC → AFE → DC-Link → VSI → 电机",end:"电机 / 执行器",outcome:"覆盖AFE驱动、逆变桥、编码器通信和24V控制输入案例。",stages:["active-front-end","motor-drive","buck"],start:1},
  ups:{name:"UPS",header:"双变换在线式 UPS",title:"市电、旁路、电池与逆变输出",copy:"理解UPS多能源路径及整流、DC-Link、电池接口和逆变器的保护分工。",map:"市电/旁路 → PFC整流 → DC-Link ⇄ 电池 → 逆变器 → 负载",end:"关键负载",outcome:"覆盖PFC控制、电池接口、旁路切换和通信案例。",stages:["boost-pfc","online-ups","bidir-buckboost"],start:1},
  security:{name:"安防电源",header:"安防与边缘设备供电",title:"离线电源、低压板卡与现场接口",copy:"覆盖市电入口二级保护、反激漏感钳位和低压长线接口。",map:"AC输入 → 整流滤波 → Flyback → 12/24V板卡 → 摄像机/NVR",end:"摄像机 / NVR",outcome:"覆盖AC入口后级、反激漏极、24V板卡和RS-485接口案例。",stages:["bridge-rectifier","flyback","buck"],start:1}
};

const CASES=[
  {id:"dc-pfc-gate",industry:"dc",topology:"totem-pole",title:"图腾柱高频桥臂驱动电源",node:"15V隔离驱动电源",scenario:"零交越换流与高dv/dt共模耦合",waveform:"重复尖峰，几十ns至数µs",standard:"客户开关波形实测",part:"SMBJ18A",normalMax:15,parasitic:3,absMax:40,residual:32.2,protected:"隔离驱动器VCC与局部MOSFET栅极回路",why:["18V VRWM高于15V正常轨","600W等级用于异常尖峰限幅，不承担PFC主回路浪涌"],reject:["15V档在高线和容差下可能提前导通","33V档残压过高，不能保护40V级驱动电源"]},
  {id:"dc-llc-sr",industry:"dc",topology:"llc",title:"48V LLC同步整流漏极钳位",node:"同步整流MOSFET D-S",scenario:"副边漏感、结电容与死区误差共同振铃",waveform:"高频衰减振铃，叠加48V输出",standard:"满载、轻载与启动波形",part:"SMCJ58A",normalMax:54,parasitic:7,absMax:150,residual:100.6,protected:"150V同步整流MOSFET",why:["58V VRWM覆盖54V高线","1500W脉冲能力适合作为异常限幅，并与RC阻尼分工"],reject:["SMBJ58A能量余量更低","64V档会进一步抬高最坏残压"]},
  {id:"dc-hotswap",industry:"dc",topology:"hot-swap-oring",title:"48/54V机架热插拔输入",node:"Hot-Swap MOSFET输入母线",scenario:"长线热插拔与快速关断引起L·di/dt过冲",waveform:"µs级单次脉冲，幅值随线缆与关断斜率变化",standard:"客户线缆、电子负载与故障关断组合",part:"SMCJ64A",normalMax:60,parasitic:8,absMax:150,residual:111,protected:"150V Hot-Swap / ORing MOSFET",why:["64V VRWM覆盖60V高线","与150V MOSFET配合保留39V示例裕量"],reject:["58V档无法覆盖60V持续高线","更高电压档会使MOSFET残压裕量下降"]},
  {id:"dc-vrm-input",industry:"dc",topology:"multiphase-vrm",title:"GPU板卡12V输入钳位",node:"DrMOS VIN与板卡连接器",scenario:"背板插拔、连接器抖动和输入LC振铃",waveform:"数µs至数十µs振铃",standard:"板卡热插拔和电源时序测试",part:"SMBJ15A",normalMax:14.4,parasitic:2.4,absMax:40,residual:26.8,protected:"40V DrMOS输入与控制器前级",why:["15V VRWM覆盖12V轨容差","钳位残压明显低于40V器件额定值"],reject:["12V档在14.4V上限下存在误导通风险","18V档残压更高，降低输入裕量"]},

  {id:"st-bidir-gate",industry:"storage",topology:"bidir-buckboost",title:"双向Buck-Boost隔离驱动电源",node:"15V栅极驱动轨",scenario:"接触器动作、双向切换与共模耦合",waveform:"重复尖峰与故障关断脉冲",standard:"充放电切换和短路关断实测",part:"SMBJ18A",normalMax:15,parasitic:3.5,absMax:40,residual:32.7,protected:"隔离驱动器供电端",why:["VRWM覆盖15V轨与容差","把栅极钳位、DESAT和软关断放在同一保护链中"],reject:["低电压档可能增加静态损耗","高电压档无法给40V级驱动电源留足裕量"]},
  {id:"st-bidir-aux",industry:"storage",topology:"bidir-buckboost",title:"电池侧24V辅助电源入口",node:"24V控制电源连接器",scenario:"电池接触器反冲与长线输入振铃",waveform:"几十µs脉冲与衰减振铃",standard:"接触器开断与线束长度组合",part:"SMBJ33A",normalMax:30,parasitic:4,absMax:60,residual:57.3,protected:"60V辅助电源控制器",why:["33V VRWM覆盖24V工业轨高线","适合板级二级钳位，前级仍需限流和熔断"],reject:["24V档不能覆盖30V高线","更高功率封装不能解决残压档位错误"]},
  {id:"st-dab-gate",industry:"storage",topology:"dab",title:"DAB两侧全桥栅极保护",node:"桥臂隔离驱动供电",scenario:"移相边界、漏感换流与共模瞬态",waveform:"高频重复尖峰",standard:"全移相范围、空载与功率反向测试",part:"SMBJ18A",normalMax:15,parasitic:4,absMax:40,residual:33.2,protected:"两侧全桥隔离驱动器",why:["统一两侧驱动轨的保护档位","与有源钳位和Snubber分工，避免TVS吸收周期性能量"],reject:["TVS不能替代漏感设计与软开关控制","低档TVS可能在米勒平台附近误动作"]},
  {id:"st-bms-can",industry:"storage",topology:"pcs",title:"BMS CAN总线端口",node:"CANH/CANL连接器",scenario:"长线ESD、EFT与共模浪涌",waveform:"IEC 61000-4-2 / 4-4类快速瞬态",standard:"端口级ESD、EFT及系统浪涌",part:"SM712",normalMax:12,parasitic:4,absMax:36,residual:35,protected:"CAN/RS-485类收发器端口",why:["专用非对称阵列适合差分总线","应放置在连接器与共模器件之间，缩短回流路径"],reject:["普通大功率TVS结电容较大且拓扑不适合差分线","只做单线对地保护可能破坏共模范围"]},

  {id:"pv-spd-residual",industry:"pv",topology:"pv-mppt",title:"DC SPD后的24V控制电源残压",node:"MPPT控制板辅助电源入口",scenario:"长组串感应雷经SPD后的残余浪涌",waveform:"8/20µs残余电流与组合波形",standard:"IEC 61000-4-5及整机SPD配合测试",part:"SMCJ33A",normalMax:30,parasitic:5,absMax:80,residual:58.3,protected:"80V辅助电源前级MOSFET",why:["TVS只吸收SPD后的板级残余能量","1500W封装提供比SMBJ更高的脉冲余量"],reject:["不能用TVS替代PV侧DC SPD","24V档不能覆盖控制电源30V高线"]},
  {id:"pv-mppt-gate",industry:"pv",topology:"boost",title:"MPPT Boost栅极驱动电源",node:"15V驱动与采样电源",scenario:"二极管反向恢复和MOSFET关断dv/dt耦合",waveform:"重复高频尖峰",standard:"全输入、全占空比与温度测试",part:"SMBJ18A",normalMax:15,parasitic:3.5,absMax:40,residual:32.7,protected:"Boost隔离驱动器",why:["保护低压驱动层而非高压开关节点主能量","与RC/RCD或有源钳位配合使用"],reject:["直接跨高压MOSFET使用低压TVS不可行","高档TVS对低压驱动器不起保护作用"]},
  {id:"pv-grid-driver",industry:"pv",topology:"grid-inverter",title:"并网桥臂隔离驱动",node:"IGBT/SiC驱动电源",scenario:"并网浪涌共模耦合与短路软关断",waveform:"快速共模脉冲和关断过冲",standard:"并网浪涌、短路与低电压穿越测试",part:"SMBJ18A",normalMax:15,parasitic:4,absMax:40,residual:33.2,protected:"隔离驱动器与栅极供电",why:["低压TVS保护驱动层，主桥由DESAT与有源钳位处理","单向型号适合直流驱动供电轨"],reject:["双向器件在直流轨上的正向保护能力较弱","TVS不能代替桥臂短路保护"]},
  {id:"pv-rs485",industry:"pv",topology:"grid-inverter",title:"光伏逆变器RS-485端口",node:"A/B差分通信线",scenario:"户外长线ESD、EFT与感应雷残压",waveform:"快速双极性脉冲",standard:"IEC 61000-4-2、4-4、4-5端口测试",part:"SM712",normalMax:12,parasitic:4,absMax:36,residual:35,protected:"RS-485收发器",why:["专用阵列匹配RS-485共模范围","连接器侧短回路布局可降低附加过冲"],reject:["大功率单管结电容与不对称需求不匹配","只增加串联电阻不能限制共模高压"]},

  {id:"ind-afe-gate",industry:"industry",topology:"active-front-end",title:"AFE桥臂栅极驱动",node:"15V隔离驱动轨",scenario:"短路关断、米勒耦合与共模瞬态",waveform:"ns至µs快速尖峰",standard:"短路、再生与电网扰动组合测试",part:"SMBJ18A",normalMax:15,parasitic:4,absMax:40,residual:33.2,protected:"IGBT/SiC隔离驱动器",why:["与DESAT软关断和Miller Clamp协同","TVS只限制驱动层异常电压"],reject:["TVS不能直接处理AFE直流母线故障能量","过低档位会影响负栅压与开通过程"]},
  {id:"ind-motor-gate",industry:"industry",topology:"motor-drive",title:"电机逆变桥驱动电源",node:"三相桥栅极驱动轨",scenario:"电机回馈、长电缆反射与桥臂关断",waveform:"重复尖峰与故障单脉冲",standard:"堵转、再生制动和长线电机测试",part:"SMBJ18A",normalMax:15,parasitic:4.5,absMax:40,residual:33.7,protected:"三相桥隔离驱动器",why:["栅极TVS与DESAT、Miller Clamp共同限制局部异常","三相驱动应保持器件和布局对称"],reject:["TVS不能替代制动电阻和母线OVP","单纯提高TVS功率不会降低选错电压档造成的残压"]},
  {id:"ind-encoder",industry:"industry",topology:"motor-drive",title:"编码器与现场差分接口",node:"编码器A/B或RS-485端口",scenario:"电机电缆共模耦合、ESD与EFT",waveform:"快速双极性脉冲",standard:"IEC 61000-4-2 / 4-4与电机启停",part:"SM712",normalMax:12,parasitic:4,absMax:36,residual:35,protected:"编码器/RS-485收发器",why:["总线专用阵列比通用大功率TVS更适合差分接口","屏蔽、共模电感和TVS需共同布局"],reject:["只在线缆远端放TVS无法保护控制板入口","高电容器件可能破坏高速编码器边沿"]},
  {id:"ind-24v-io",industry:"industry",topology:"buck",title:"24V PLC/驱动控制输入",node:"24V DI/DO与控制板电源",scenario:"继电器反冲、线缆插拔与EFT",waveform:"几十ns EFT群脉冲与µs级振铃",standard:"IEC 61000-4-4及现场线束测试",part:"SMCJ33A",normalMax:30,parasitic:4,absMax:80,residual:57.3,protected:"80V工业输入前级",why:["33V档覆盖工业24V高线","1500W等级适合较长现场线缆的二级保护"],reject:["24V档无法覆盖30V持续输入","TVS前缺少串联阻抗时可能超过脉冲能量能力"]},

  {id:"ups-pfc-control",industry:"ups",topology:"boost-pfc",title:"UPS PFC控制与驱动电源",node:"15V PFC控制电源",scenario:"市电浪涌残压耦合和PFC开关dv/dt",waveform:"SPD后残压与重复开关尖峰",standard:"IEC 61000-4-5后级波形实测",part:"SMBJ18A",normalMax:15,parasitic:3.5,absMax:40,residual:32.7,protected:"PFC控制器与隔离驱动器",why:["TVS位于低压控制层并与输入MOV/SPD分工","18V档覆盖15V控制轨"],reject:["普通TVS不能直接跨接市电入口承担全部浪涌","低档器件会在控制电源容差上限误导通"]},
  {id:"ups-battery",industry:"ups",topology:"bidir-buckboost",title:"48V电池接口热插拔",node:"电池DC/DC输入母线",scenario:"电池接插件、接触器和双向切换过冲",waveform:"µs级高电流脉冲",standard:"最大线束、最大SOC和故障关断测试",part:"SMCJ64A",normalMax:60,parasitic:8,absMax:150,residual:111,protected:"150V双向DC/DC MOSFET",why:["64V VRWM覆盖60V电池高线","与熔断、预充和接触器构成分层保护"],reject:["58V档不能覆盖电池高线","TVS不能代替电池支路熔断器"]},
  {id:"ups-bypass",industry:"ups",topology:"online-ups",title:"旁路切换继电器控制电源",node:"24V继电器与驱动板入口",scenario:"旁路切换、线圈反冲和参考地跳变",waveform:"感性反冲与共模瞬态",standard:"市电/旁路切换全工况测试",part:"SMBJ33A",normalMax:30,parasitic:4,absMax:60,residual:57.3,protected:"60V继电器驱动与控制器",why:["33V档覆盖24V轨高线","应分别处理线圈反冲与控制板电源入口浪涌"],reject:["跨线圈TVS与电源入口TVS不能混为一个节点","更低档位会延长继电器释放或持续导通"]},
  {id:"ups-rs485",industry:"ups",topology:"online-ups",title:"UPS监控RS-485端口",node:"A/B通信连接器",scenario:"机房长线ESD、EFT与地电位差",waveform:"双极性快速瞬态",standard:"IEC 61000-4-2、4-4、4-5端口测试",part:"SM712",normalMax:12,parasitic:4,absMax:36,residual:35,protected:"RS-485监控收发器",why:["专用阵列匹配差分通信与共模范围","TVS应靠近外部连接器"],reject:["单颗通用TVS不能同时优化两条差分线","忽略保护地回流会使实测残压显著上升"]},

  {id:"sec-ac-aux",industry:"security",topology:"bridge-rectifier",title:"AC入口后的24V辅助电源",node:"MOV/SPD后级控制电源",scenario:"市电浪涌残压经变压器和整流耦合",waveform:"组合波后级残压",standard:"IEC 61000-4-5整机测试",part:"SMCJ33A",normalMax:30,parasitic:5,absMax:80,residual:58.3,protected:"80V辅助电源前级",why:["将MOV一级泄放与板级TVS二级钳位分开","33V档覆盖24V输出高线"],reject:["普通TVS不能取代市电MOV/GDT","把TVS放在长走线末端会增加寄生过冲"]},
  {id:"sec-flyback",industry:"security",topology:"flyback",title:"反激原边MOSFET漏极钳位",node:"原边漏极TVS+二极管钳位",scenario:"变压器漏感关断能量叠加输入与反射电压",waveform:"每开关周期出现的漏感尖峰",standard:"高线、满载、启动与短路波形",part:"1.5KE200A",normalLabel:"输入与反射电压叠加",normalMax:325,parasitic:20,absMax:650,residual:619,protected:"650V原边MOSFET",why:["200A档用于示例说明漏感钳位电压区间","必须同时核算每周期能量、频率与器件温升"],reject:["电压档过低会增加钳位损耗和温升","电压档过高会使MOSFET VDS越过安全边界"]},
  {id:"sec-board24",industry:"security",topology:"buck",title:"摄像机/NVR 24V板卡输入",node:"24V连接器与Buck前级",scenario:"长线插拔、继电器反冲和输入LC振铃",waveform:"µs级振铃与感性反冲",standard:"最大线长和热插拔测试",part:"SMBJ33A",normalMax:30,parasitic:4,absMax:60,residual:57.3,protected:"60V Buck MOSFET与控制器",why:["33V VRWM覆盖24V工业轨高线","TVS靠近连接器可降低走线寄生"],reject:["24V档在30V高线下存在误导通风险","60V器件裕量偏紧时应升级后级额定值而非只换大功率TVS"]},
  {id:"sec-rs485",industry:"security",topology:"buck",title:"摄像机云台RS-485端口",node:"A/B差分控制线",scenario:"户外长线ESD、EFT与感应雷残压",waveform:"快速双极性脉冲",standard:"IEC 61000-4-2、4-4、4-5端口测试",part:"SM712",normalMax:12,parasitic:4,absMax:36,residual:35,protected:"RS-485云台控制收发器",why:["专用非对称阵列适合长线差分端口","与屏蔽、接地和共模阻抗共同设计"],reject:["电源TVS不能直接替代低电容接口阵列","保护器件远离连接器会增加未受控走线长度"]}
];

let state={industry:"dc",topology:"hot-swap-oring",caseId:"dc-hotswap",view:"system"};

function industry(){return INDUSTRIES[state.industry]}
function topology(){return topologies.find(item=>item.id===state.topology)||{id:state.topology,name:state.topology,family:"功率变换",direction:"",voltage:"",power:"",applications:[],source:"工程拓扑资料"}}
function meta(){return TOPOLOGY_META[state.topology]||{role:"分层保护",insight:"先识别瞬态源、能量路径与被保护器件，再决定TVS职责。",patent:"fly"}}
function availableCases(){return CASES.filter(item=>item.industry===state.industry&&item.topology===state.topology)}
function selectedCase(){return availableCases().find(item=>item.id===state.caseId)||availableCases()[0]||CASES.find(item=>item.industry===state.industry)||CASES[0]}
function selectedPart(){return PARTS[selectedCase().part]}
function esc(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}

function parseUrl(){
  const params=new URLSearchParams(location.hash.replace(/^#/,""));
  const next={industry:params.get("industry"),topology:params.get("topology"),caseId:params.get("case"),view:params.get("view")};
  if(next.industry&&INDUSTRIES[next.industry])state.industry=next.industry;
  const j=industry();
  state.topology=next.topology&&j.stages.includes(next.topology)?next.topology:j.stages[j.start];
  const cases=availableCases();
  state.caseId=next.caseId&&cases.some(item=>item.id===next.caseId)?next.caseId:(cases[0]?.id||null);
  state.view=["system","circuit","cases","stress","evidence"].includes(next.view)?next.view:"system";
}

function syncUrl(replace=false){
  const params=new URLSearchParams({industry:state.industry,topology:state.topology,case:state.caseId||"",view:state.view});
  const url=`${location.pathname}${location.search}#${params}`;
  history[replace?"replaceState":"pushState"](null,"",url);
}

function update(patch,options={}){
  state={...state,...patch};
  if(patch.industry){const j=industry();state.topology=j.stages[j.start];state.view="system";}
  if(patch.industry||patch.topology){const first=availableCases()[0];state.caseId=first?first.id:null;}
  if(!availableCases().some(item=>item.id===state.caseId))state.caseId=availableCases()[0]?.id||null;
  render();
  if(options.history!==false)syncUrl(false);
}

function renderIndustry(){
  $("#industry-switch").innerHTML=Object.entries(INDUSTRIES).map(([key,item])=>`<button class="${key===state.industry?"active":""}" data-industry="${key}">${item.name}</button>`).join("");
  $$('[data-industry]').forEach(button=>button.onclick=()=>update({industry:button.dataset.industry}));
  $("#header-industry").textContent=industry().header;
  $("#rail-industry").textContent=industry().name;
  $("#mission-title").textContent=industry().title;
  $("#mission-copy").textContent=industry().copy;
  $("#journey-title").textContent=industry().map;
  $("#outcome").textContent=industry().outcome;
  const count=CASES.filter(item=>item.industry===state.industry).length;
  $("#mission-metrics").innerHTML=`<span><b>${industry().stages.length}</b> 关键拓扑</span><span><b>${count}</b> 已建案例</span><span><b>5</b> 联动视图</span>`;
}

function renderTopologyNav(){
  $("#topology-nav").innerHTML=industry().stages.map((id,index)=>{const item=topologies.find(t=>t.id===id)||{name:id,voltage:""};const count=CASES.filter(c=>c.industry===state.industry&&c.topology===id).length;return `<button class="${id===state.topology?"active":""}" data-topology="${id}"><span class="topology-index">${String(index+1).padStart(2,"0")}</span><span><b>${esc(item.name)}</b><small>${esc(item.voltage||"")}</small></span><span class="case-count">${count}</span></button>`}).join("");
  $$('[data-topology]').forEach(button=>button.onclick=()=>update({topology:button.dataset.topology}));
}

function renderBreadcrumb(){
  const current=selectedCase();
  $("#case-breadcrumb").innerHTML=`<span><button data-crumb="industry">${industry().name}</button></span><span><button data-crumb="topology">${esc(topology().name)}</button></span><span><strong>${esc(current.title)}</strong></span><span><strong>${({system:"系统位置",circuit:"专业电路拓扑",cases:"TVS应用案例",stress:"应力闭环",evidence:"技术证据"})[state.view]}</strong></span>`;
  $('[data-crumb="industry"]').onclick=()=>update({view:"system"});
  $('[data-crumb="topology"]').onclick=()=>update({view:"circuit"});
}

function renderChain(){
  $("#energy-chain").innerHTML=industry().stages.map(id=>{const item=topologies.find(t=>t.id===id)||{name:id,voltage:""};const m=TOPOLOGY_META[id]||{};const kind=(m.role||"").includes("不用")||id==="bridge-rectifier"?"no":(m.role||"").includes("关键")||id==="flyback"?"tvs":"coord";return `<button class="chain-node ${kind} ${id===state.topology?"active":""}" data-chain="${id}"><span class="mark"></span><b>${esc(item.name)}</b><small>${esc(item.voltage||"")}</small></button>`}).join("")+`<div class="chain-node no"><span class="mark"></span><b>${industry().end}</b><small>客户最终负载</small></div>`;
  $$('[data-chain]').forEach(button=>button.onclick=()=>update({topology:button.dataset.chain}));
  $("#chain-insight").innerHTML=`<b>拓扑判断：</b><span>${meta().insight}</span>`;
}

function renderFocus(){
  const item=topology();
  $("#focus-family").textContent=`${item.family||"功率变换"} · ${item.direction||""}`;
  $("#focus-title").textContent=item.name;
  $("#focus-spec").textContent=`${item.voltage||""}${item.power?` · ${item.power}`:""}`;
  $("#focus-role").textContent=meta().role;
  $("#system-canvas").innerHTML=window.renderProfessionalSystem?window.renderProfessionalSystem(item):"";
  $("#circuit-canvas").innerHTML=window.renderProfessionalSchematic?window.renderProfessionalSchematic(item):"";
}

function renderCases(){
  const current=selectedCase();
  const part=selectedPart();
  $("#case-panel").innerHTML=`<div class="case-workbench"><div class="case-list">${availableCases().map(item=>`<button class="${item.id===current.id?"active":""}" data-case="${item.id}"><b>${esc(item.title)}</b><small class="case-model">${esc(item.part)}</small><small>${esc(item.node)}</small></button>`).join("")}</div><div class="case-detail"><div class="case-kicker"><span class="verified">工程示例</span><span>${industry().name}</span><span>${esc(topology().name)}</span></div><h4>${esc(current.title)}</h4><p>${esc(current.scenario)}</p><div class="case-summary"><article><small>应用节点</small><strong>${esc(current.node)}</strong></article><article><small>候选TVS型号</small><strong>${part.model}</strong></article><article><small>被保护对象</small><strong>${esc(current.protected)}</strong></article></div><div class="case-flow"><div><small>${esc(current.normalLabel||"正常工作上限")}</small><strong>${current.normalMax} V</strong></div><div><small>TVS动态钳位</small><strong>${part.vc} V @ ${part.ipp} A</strong></div><div><small>寄生附加过冲</small><strong>+ ${current.parasitic} V</strong></div><div class="result"><small>后级最坏残压</small><strong>${current.residual} V</strong></div></div><div class="case-reasons"><article class="selected"><h5>为什么选择此候选</h5><ul>${current.why.map(item=>`<li>${esc(item)}</li>`).join("")}</ul></article><article class="rejected"><h5>为什么不选择其他方案</h5><ul>${current.reject.map(item=>`<li>${esc(item)}</li>`).join("")}</ul></article></div></div></div>`;
  $$('[data-case]').forEach(button=>button.onclick=()=>update({caseId:button.dataset.case}));
}

function renderStress(){
  const current=selectedCase();
  const part=selectedPart();
  const margin=+(current.absMax-current.residual).toFixed(1);
  const pass=margin>0;
  const scale=Math.max(current.absMax,current.residual,current.normalMax,1);
  const width=value=>Math.min(100,Math.round(value/scale*100));
  const equation=current.topology==="flyback"?`VDS = VIN(max) + VOR + VC + ΔVpar；训练值为 ${current.normalMax} + ${part.vc} + ${current.parasitic} = ${current.residual} V。`:`VRES = VC(IP, TP, TJ) + LPAR × di/dt；训练值为 ${part.vc} + ${current.parasitic} = ${current.residual} V。`;
  $("#stress-panel").innerHTML=`<div class="stress-sheet"><div class="stress-head"><div><h4>${esc(current.title)} · 应力闭环</h4><p>${esc(current.waveform)} · ${esc(current.standard)}</p></div><span class="stress-status ${pass?"pass":"review"}">${pass?`示例裕量 +${margin} V`:`需要重新选型 ${margin} V`}</span></div><div class="stress-equation"><article><small>${esc(current.normalLabel||"正常电压上限")}</small><strong>${current.normalMax} V</strong></article><article><small>${part.model} 最大钳位</small><strong>${part.vc} V</strong></article><article><small>布局寄生过冲</small><strong>${current.parasitic} V</strong></article><article class="${pass?"margin-pass":""}"><small>后级绝对最大值</small><strong>${current.absMax} V</strong></article></div><div class="stress-bars"><div class="stress-bar"><span>${esc(current.normalLabel||"正常工作电压")}</span><div class="stress-track"><i style="width:${width(current.normalMax)}%"></i></div><strong>${current.normalMax} V</strong></div><div class="stress-bar"><span>最坏残压</span><div class="stress-track"><i style="width:${width(current.residual)}%"></i></div><strong>${current.residual} V</strong></div><div class="stress-bar limit"><span>器件绝对最大值</span><div class="stress-track"><i style="width:${width(current.absMax)}%"></i></div><strong>${current.absMax} V</strong></div></div><table class="stress-table"><tbody><tr><th>TVS参数</th><td>VRWM ${part.vrwm} V；VBR ${part.vbr} V；VC ${part.vc} V @ IPP ${part.ipp} A；PPP ${part.ppp}</td></tr><tr><th>残压表达式</th><td>${equation}</td></tr><tr><th>验证波形</th><td>${esc(current.waveform)}</td></tr><tr><th>验证条件</th><td>${esc(current.standard)}</td></tr><tr><th>闭环结论</th><td>${pass?`训练计算低于后级绝对最大值，仍需按温度、波形和实测残压复核。`:`当前训练计算已经越过后级绝对最大值，必须降低寄生、降低钳位档位或提高后级额定值。`}</td></tr></tbody></table><div class="stress-note"><b>使用边界：</b>页面数值用于展示完整选型方法，不代表未经客户波形、温度降额和样机测试即可直接量产。反激漏极等复合节点的残压还包含输入电压与反射电压。</div></div>`;
}

function renderEvidence(){
  const current=selectedCase();
  const part=selectedPart();
  const patent=PATENTS[meta().patent]||PATENTS.fly;
  const data=SOURCES[part.source];
  $("#evidence-panel").innerHTML=`<div class="evidence"><div class="evidence-grid"><article class="source"><h4>案例工程证据链</h4><p>系统位置 → 瞬态来源 → 输入波形 → TVS数据手册 → 被保护器件绝对最大值 → 寄生过冲 → 实测残压。当前案例：${esc(current.title)}。</p><div class="evidence-links"><a href="${data.url}" target="_blank" rel="noopener noreferrer"><span>${esc(data.label)}</span><small>官方数据手册 ↗</small></a><a href="${patent.url}" target="_blank" rel="noopener noreferrer"><span>${patent.no}</span><small>专利原文 ↗</small></a></div><p class="patent-note">最终型号必须依据所选厂商最新数据手册、器件批次、温度和实际波形确认。</p></article><article class="patent"><h4>${patent.no} · ${patent.title}</h4><div class="patent-meta"><span>拓扑技术来源</span><span>中文工程提炼</span></div><p><b>与当前案例的关系：</b>${patent.digest}</p><p><b>阅读建议：</b>先对照专利附图确认能量路径和开关节点，再回到本案例检查TVS是否位于正确参考地与回流路径。</p><a class="patent-link" href="${patent.url}" target="_blank" rel="noopener noreferrer">打开专利全文 ↗</a></article></div></div>`;
}

function renderCoach(){
  const current=selectedCase();
  const margin=+(current.absMax-current.residual).toFixed(1);
  $("#coach-title").textContent=current.title;
  $("#coach-content").innerHTML=`<div class="coach-block"><b>TVS应用节点</b><p>${esc(current.node)}</p></div><div class="coach-block"><b>真实瞬态来源</b><p>${esc(current.scenario)}</p></div><div class="coach-block"><b>候选型号</b><p>${current.part}，正常上限 ${current.normalMax} V。</p></div><div class="coach-block"><b>残压裕量</b><p>${current.residual} V 对 ${current.absMax} V，示例裕量 ${margin} V。</p></div><div class="coach-warning"><b>边界提醒：</b>主功率高能故障不能因存在TVS而省略SPD、熔断、接触器、DESAT或Snubber。</div>`;
}

function renderTabs(){
  $$('#study-tabs button').forEach(button=>button.classList.toggle("active",button.dataset.panel===state.view));
  $$('[data-panel-view]').forEach(panel=>panel.classList.toggle("active",panel.dataset.panelView===state.view));
  const labels={system:"下一步：查看专业电路拓扑",circuit:"下一步：进入TVS应用案例",cases:"下一步：完成应力闭环",stress:"下一步：查看技术证据",evidence:"回到系统位置"};
  $("#next-step").textContent=labels[state.view];
}

function render(){
  renderIndustry();
  renderTopologyNav();
  renderBreadcrumb();
  renderChain();
  renderFocus();
  renderCases();
  renderStress();
  renderEvidence();
  renderCoach();
  renderTabs();
}

const views=["system","circuit","cases","stress","evidence"];
$$('#study-tabs button').forEach(button=>button.onclick=()=>update({view:button.dataset.panel}));
$("#next-step").onclick=()=>update({view:views[(views.indexOf(state.view)+1)%views.length]});
window.addEventListener("popstate",()=>{parseUrl();render()});
parseUrl();
render();
syncUrl(true);
})();
