window.TVS_CIRCUITS = [
  {id:"usb2",title:"USB 2.0 Protection",group:"High Speed",voltage:"5V",status:"planned",industries:["Consumer","Industrial"]},
  {id:"usb3",title:"USB 3.x Protection",group:"High Speed",voltage:"5V",status:"planned",industries:["Consumer","Data Center"]},
  {id:"usb-c",title:"USB-C VBUS Protection",group:"High Speed",voltage:"5–20V",status:"planned",industries:["Consumer","Industrial"]},
  {id:"hdmi",title:"HDMI Protection",group:"High Speed",voltage:"5V",status:"planned",industries:["Consumer","Security"]},
  {id:"ethernet",title:"Ethernet Protection",group:"Communication",voltage:"Signal",status:"planned",industries:["Industrial","Security","Data Center"]},
  {id:"poe",title:"PoE Protection",group:"Communication",voltage:"48–57V",status:"planned",industries:["Security","Data Center"]},
  {id:"can",title:"CAN Protection",group:"Communication",voltage:"Bus",status:"golden",industries:["Industrial","Energy Storage"]},
  {id:"can-fd",title:"CAN-FD Protection",group:"Communication",voltage:"Bus",status:"planned",industries:["Industrial","Energy Storage"]},
  {id:"rs485",title:"RS485 Protection",group:"Communication",voltage:"Bus",status:"golden",industries:["Industrial","Security","Energy Storage"]},
  {id:"rs232",title:"RS232 Protection",group:"Communication",voltage:"±12V",status:"planned",industries:["Industrial","Security"]},
  {id:"12v-input",title:"12V DC Input Protection",group:"Power",voltage:"12V",status:"planned",industries:["Consumer","Security"]},
  {id:"24v-input",title:"24V DC Input Protection",group:"Power",voltage:"24V",status:"golden",industries:["Industrial","Energy Storage"]},
  {id:"48v-input",title:"48V DC Input Protection",group:"Power",voltage:"48V",status:"planned",industries:["Industrial","Data Center"]},
  {id:"54v-dc",title:"48/54V Data Center Power",group:"Power",voltage:"48–54V",status:"golden",industries:["Data Center"]},
  {id:"plc-di",title:"PLC 24V DI Protection",group:"Industrial IO",voltage:"24V",status:"planned",industries:["Industrial"]},
  {id:"plc-do",title:"PLC 24V DO Protection",group:"Industrial IO",voltage:"24V",status:"planned",industries:["Industrial"]},
  {id:"relay",title:"Relay Coil Protection",group:"Inductive Load",voltage:"12–24V",status:"planned",industries:["Industrial","Security"]},
  {id:"contactor",title:"Contactor Coil Protection",group:"Inductive Load",voltage:"24V",status:"planned",industries:["Industrial","Energy Storage"]},
  {id:"solenoid",title:"Solenoid Protection",group:"Inductive Load",voltage:"12–24V",status:"planned",industries:["Industrial"]},
  {id:"mos-ds",title:"MOSFET D-S Protection",group:"MOSFET",voltage:"Variable",status:"planned",industries:["Industrial","Energy Storage"]},
  {id:"mos-gs",title:"MOSFET G-S Protection",group:"MOSFET",voltage:"Gate",status:"planned",industries:["Industrial","Energy Storage"]},
  {id:"bms-can",title:"BMS CAN Protection",group:"Energy Storage",voltage:"Bus",status:"planned",industries:["Energy Storage"]},
  {id:"bms-contactor",title:"BMS Contactor Driver",group:"Energy Storage",voltage:"24V",status:"golden",industries:["Energy Storage"]},
  {id:"cctv-poe",title:"CCTV / IP Camera PoE",group:"Security",voltage:"PoE",status:"planned",industries:["Security"]},
  {id:"hot-swap",title:"Data Center Hot-Swap",group:"Data Center",voltage:"48–54V",status:"planned",industries:["Data Center"]}
];

window.TVS_INDUSTRIES = {
  "Consumer":["USB 2.0","USB 3.x","USB-C","HDMI","5V / 12V Power"],
  "Industrial":["24V Power","CAN / CAN-FD","RS485","PLC DI/DO","Relay / Solenoid","MOSFET"],
  "Security":["PoE","Ethernet","RS485","CCTV Power","Relay"],
  "Energy Storage":["BMS","CAN / RS485","24V Power","Contactor Driver","MOS Gate"],
  "Data Center":["48/54V Bus","Hot-Swap","Ethernet","PoE","Auxiliary Power"]
};
