<template>
  <div class="my-footer">
    <van-tabbar :active="active" @change="onChange">
      <van-tabbar-item>
        <img class="img" :src="active===0?'/static/tabs/homeActive.png':'/static/tabs/home.png'">
        <div class="name" :class="{'active':active===0}">首页</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <img class="img" :src="active===1?'/static/tabs/jiankongActive.png':'/static/tabs/jiankong.png'">
        <div class="name" :class="{'active':active===1}">监控</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <img class="img" :src="active===2?'/static/tabs/gongdanActive.png':'/static/tabs/gongdan.png'">
        <div class="name" :class="{'active':active===2}">工单</div>
      </van-tabbar-item>
      <van-tabbar-item>
        <img class="img" :src="active===3?'/static/tabs/settingActive.png':'/static/tabs/setting.png'">
        <div class="name" :class="{'active':active===3}">设置</div>
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
    data() {
      return {
        tarbarUrl: ['index', 'monitor', 'work-order', 'setting']
      }
    },
    methods: {
      onChange(e) {
        wx.switchTab({
          url: `/pages/` + this.tarbarUrl[e.mp.detail] + '/main'
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
    }

    .active {
      color #5AC790
    }

    .img {
      margin-bottom rpx(5)
      margin-left rpx(5)
      width rpx(40)
      height rpx(40)
    }
  }
</style>
