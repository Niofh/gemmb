<script>
  export default {
    onLaunch(){
      wx.hideTabBar({})
      console.log("app onLaunch")
    },
    onShow(){
      wx.hideTabBar({})
      console.log("app onShow")
    }
  };

</script>

<style>
  page {
    height: 100%;
    background-color: #F5F6F9;
    font-family: PingFangSC-Regular;
  }
</style>
