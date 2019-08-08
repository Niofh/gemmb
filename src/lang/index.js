import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n)

const messages = {
  zh: {
    message: {
      setting: "设置",
      devicesSummary: '设备总结',
      alertsSummary: '告警总结',
      ticketSummary: '工单总结',
      equipmentDetails: '设备详情',
      performanceManagement: '性能管理',
    }
  },
  en: {
    message: {
      setting: "Setting"
    }
  }
};

const i18n = new VueI18n({
  locale: "zh", // 语言标识
  messages
});


Vue.prototype._i18n = i18n;

export default i18n
