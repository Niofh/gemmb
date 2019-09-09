<template>
  <div class="my-footer">
    <van-tabbar :active="active" @change="onChange">
      <van-tabbar-item>
        <div class="img-wrap">
          <img class="img" :src="active===0?'/static/tabs/homeActive.png':'/static/tabs/home.png'">
        </div>
        <div class="name" :class="{'active':active===0}">{{i18n.home}}</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <div class="img-wrap">
          <img class="img" :src="active===1?'/static/tabs/jiankongActive.png':'/static/tabs/jiankong.png'">
        </div>
        <div class="name" :class="{'active':active===1}">{{i18n.monitor}}</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <div class="img-wrap">
          <img class="img" :src="active===2?'/static/tabs/gongdanActive.png':'/static/tabs/gongdan.png'">
        </div>
        <div class="name" :class="{'active':active===2}">{{i18n.Ticket}}</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <div class="img-wrap">
          <img class="img" :src="active===3?'/static/tabs/settingActive.png':'/static/tabs/setting.png'">
        </div>
        <div class="name" :class="{'active':active===3}">{{i18n.setting}}</div>
      </van-tabbar-item>

    </van-tabbar>
  </div>
</template>

<script>
  export default {
    props: {
      active: {
        type: Number,
        default: 0
      }
    },
    computed: {
      i18n() {
        return this.$t("message")
      }
    },
    data() {
      return {
        tarbarUrl: ["index", "monitor", "work-order", "setting"]
      }
    },
    methods: {
      onChange(e) {
        wx.switchTab({
          url: `/pages/` + this.tarbarUrl[e.mp.detail] + "/main"
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .my-footer {
    >>> .van-tabbar {
      background #E9E9E9 !important
      z-index 30 !important
    }

    .active {
      color #5AC790
    }

    .img-wrap {
      text-align center

      .img {
        width rpx(40)
        height rpx(40)
      }
    }

  }
</style>
