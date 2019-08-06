<template>
  <div class="setting">
    <div class="header">{{i18n.setting}}</div>
    <div class="select-lang-wrap">
      <img class="img" src="/static/images/map.png" alt="maps">
      语言选择
      <span class="right">中国</span>
    </div>
    <div class="btn">
      <button type="primary"> 退出登录</button>
    </div>
  </div>
</template>

<script>
  export default {
    computed:{
      i18n(){
        return this.$t('message')
      }
    },
    data() {
      return {};
    },
    mounted() {
      /*wx.showModal({
        title: "提示",
        content: "这是一个模态弹窗",
        success(res) {
          if (res.confirm) {
            console.log("用户点击确定");
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });*/
    }
  };
</script>
<style lang="stylus">
  page {
    background-color: #F5F6F9;
  }
</style>
<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"

  .setting {
    .btn {
      width 100%
      position fixed
      bottom rpx(120)
      padding 0 rpx(30)
      box-sizing border-box
    }
    .select-lang-wrap {
      margin 0 rpx(30)
      background-color #fff
      border: 1px solid #DFDFDF;
      border-radius: rpx(10);
      font-size rpx(28)
      padding rpx(16) rpx(28) rpx(16) rpx(25)
      overflow hidden
      .img {
        margin-right rpx(10)
        width rpx(45)
        height rpx(45)
        vertical-align middle
      }
      .right{
        float right
      }
    }
  }
</style>
