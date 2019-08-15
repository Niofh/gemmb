const Fly = require("flyio/dist/npm/wx")
import qs from "qs"
import { ajaxBaseUrl } from "../config"
import store from "@/store"
// https://wendux.github.io/dist/#/doc/flyio/interceptor 文档
const fly = new Fly()


// 设置超时
fly.config.timeout = 20000

// 设置请求基地址
fly.config.baseURL = ajaxBaseUrl


// 定义公共headers
fly.config.headers["Content-Type"] = "application/json;charset=UTF-8"
console.log("wx.getStorageSync", wx.getStorageSync("vuex"))


//添加请求拦截器
fly.interceptors.request.use((config) => {

  //给所有请求添加自定义header 比如token
  // request.headers["X-Tag"] = "flyio";

  if (store.state.userInfo.AccessToken) {
    config.headers["AccessToken"] = store.state.userInfo.AccessToken

  }
  if (config.form === true) {
    // form表单请求
    config.headers["Content-Type"] = "application/x-www-form-urlencoded;charset=utf-8"
    config.data = qs.stringify(config.data)
  } else {
    config.data = JSON.stringify(config.data)
  }

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return config

})


//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    console.log(err)
    const res = err.response.data
    //发生网络错误后会走到这里
    if (err.status === 401) {
      if (res.ExceptionType === 2) {
        wx.showToast({
          title: res.Message,
          icon: "none",
          duration: 4000
        })
      } else {
        wx.showModal({
          title: "提示",
          content: "登录信息已过期，请重新登录",
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: "/pages/login/main"
              })
            } else if (res.cancel) {
              console.log("用户点击取消")
            }
          }
        })
      }

    } else {
      wx.showToast({
        title: res.Message,
        icon: "none",
        duration: 4000
      })

    }

    return Promise.reject(err)
  }
)

export default fly

