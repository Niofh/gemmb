import Vue from "vue"
import App from "./App"
import md5 from "js-md5"
import "./fly"
import store from "./store/index"
import fly from "./fly"
import i18n from "./lang"

Vue.prototype.$fly = fly //将fly实例挂在vue原型上
Vue.prototype.$store = store
Vue.prototype.$md5 = md5

Vue.config.productionTip = false
App.mpType = "app"


Vue.mixin({
  onUnload() {
    console.log("onUnload")
  }
})

const app = new Vue({
  i18n,
  ...App
})


app.$mount()
