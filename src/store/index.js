import Vue from "vue"
import Vuex from "vuex"

// 持久层 刷新不会丢失数据
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    remember: false,
    userInfo: {}, // 用户信息
    lang: "zh" // 默认是中文
  },
  mutations: {
    setLang(state, lang) {
      state.lang = lang
    },
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setRemember(state, remember) {
      state.remember = remember
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => {

        }
      }
    })
  ]
})


