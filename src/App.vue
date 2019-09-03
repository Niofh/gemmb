<script>
  import { getCurrentPageUrl } from "@/utils"

  const whiteList = ["pages/login/main"]

  export default {
    onLaunch() {
      wx.hideTabBar({})
      console.log("app onLaunch")
      const userInfo = this.$store.state.userInfo
      if (!userInfo.CustomerTag) {
        // 如果登录信息为空，跳转登录页
        wx.redirectTo({
          url: "/pages/login/main"
        })
      }
    },
    onShow() {
      wx.hideTabBar({})
      console.log("app onShow")
      const userInfo = this.$store.state.userInfo
      if (!userInfo.CustomerTag) {
        // 如果登录信息为空，跳转登录页
        wx.redirectTo({
          url: "/pages/login/main"
        })
        return
      }

      // 判断是否登录状态已经过期，默认是7天
      const currentPageUrl = getCurrentPageUrl()
      if (currentPageUrl) {
        if (whiteList.indexOf(currentPageUrl) > -1) {
          return
        }

        // 如果时间超时，跳转登录页
        const time = userInfo.time
        const curTime = new Date().getTime()
        if (curTime > time) {
          wx.redirectTo({
            url: "/pages/login/main"
          })
        }

      }
      console.log("currentPageUrl", currentPageUrl)
    },
    onUnload() {
      console.log("onUnload")
    }
  }

</script>

<style>
  page {
    /*height: 100%;*/
    background-color: #F5F6F9;
    font-family: PingFangSC-Regular;
  }
</style>
