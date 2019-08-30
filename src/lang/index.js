import Vue from "vue"
import VueI18n from "vue-i18n"
import store from "@/store"

Vue.use(VueI18n)


const messages = {
  zh: {
    message: {
      setting: "设置",
      devicesSummary: "设备总结",
      alertsSummary: "告警总结",
      ticketSummary: "工单总结",
      equipmentDetails: "设备详情",
      performanceManagement: "性能管理",
      alertsHistory: "历史告警",
      ticketHistory: "历史工单",
      faultList: "故障列表",
      deviceList: "设备列表",
      changeTicket: "变更工单",
      faultTicket: "故障工单",
      ticketJounals: "工单日志",
      deviceAlarm: "设备告警",
      Status: "状态",
      Hostname: "设备名称",
      IP: "设备IP",
      location: "地点",
      AssociatedTicketID: "关联工单ID",
      InterfaceUtilization: "接口利用率",
      CpuUtilization: "Cpu利用率",
      MemoryUtilization: "内存利用率",
      Type: "类型",
      TicketID: "工单ID",
      Priority: "优先级",
      Time: "时间",
      Incident: "故障",
      Change: "变更",
      Ticket: "工单",
      Device: "关联设备",
      Language: "语言选择",
      confirm: "确定",
      cancel: "取消",
      signOut: "退出登录",
      home: "首页",
      monitor: "监控",
      lang: "中文"
    }
  },
  en: {
    message: {
      setting: "Setting",
      devicesSummary: "Devices Summary",
      alertsSummary: "Alerts Summary",
      ticketSummary: "Ticket Summary",
      equipmentDetails: "Equipment Details",
      performanceManagement: "Performance Management",
      alertsHistory: "Alerts History",
      ticketHistory: "Ticket History",
      faultList: "FaultList",
      deviceList: "DeviceList",
      changeTicket: "Change Ticket",
      faultTicket: "Fault Ticket",
      ticketJounals: "Ticket Jounals",
      deviceAlarm: "Device Alarm",
      Status: "Status",
      Hostname: "Hostname",
      IP: "IP",
      location: "Location",
      AssociatedTicketID: "Associated Ticket ID",
      CpuUtilization: "CPU Utilization",
      InterfaceUtilization: "Interface Utilization",
      MemoryUtilization: "Memory Utilization",
      Type: "Type",
      TicketID: "TicketID",
      Priority: "Priority",
      Time: "Time",
      Incident: "Incident",
      Change: "Change",
      Ticket: "Ticket",
      Device: "Device",
      Language: "Language",
      confirm: "Confirm",
      cancel: "Cancel",
      signOut: "Sign Out",
      home: "Home",
      monitor: "Monitor",
      lang: "English"
    }
  }
}
console.log(store.state.lang)
const i18n = new VueI18n({
  locale:  store.state.lang, // 语言标识
  messages
})


Vue.prototype._i18n = i18n

export default i18n
