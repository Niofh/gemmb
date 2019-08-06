import Vue from "vue";
import App from "./App";

import "./fly";
import store from "./store/index";
import fly from "./fly";
import i18n from './lang'

Vue.prototype.$fly = fly; //将fly实例挂在vue原型上
Vue.prototype.$store = store;

Vue.config.productionTip = false;
App.mpType = "app";

const app = new Vue({
  i18n,
  ...App
})

app.$mount();
