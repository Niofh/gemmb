<template>
  <div class="setting">
    <div></div>
    <div class="header">{{i18n.setting}}</div>


    <div class="sheet">
      <van-action-sheet :show="show">
        <van-picker
          show-toolbar
          value-key="name"
          active-class="active-class"
          :columns="array"
          :confirm-button-text="i18n.confirm"
          :cancel-button-text="i18n.cancel"
          @confirm="onChange"
          @cancel="show=false"
        ></van-picker>
      </van-action-sheet>
    </div>
    <div class="select-lang-wrap" @click="show=true">
      <img class="img" src="https://wechat.logicalisservice.com/images/map.png" alt="maps">
      {{i18n.Language}}
      <span class="right">{{i18n.lang}}</span>
    </div>
    <div class="img-bg">
      <img class="img" src="https://wechat.logicalisservice.com/images/contact.png"" alt="">

    </div>
    <div class="btn">
      <button type="primary" @click="onSignOut"> {{i18n.signOut}}</button>
    </div>
    <my-footer :active="3"/>
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer"

  export default {
    components: {
      "my-footer": myFooter
    },
    computed: {
      i18n() {
        return this.$t("message")
      }
    },
    data() {
      return {
        show: false,
        activeClass: "activeClass",
        array: [
          {
            name: "中国",
            code: "zh"
          },
          {
            name: "English",
            code: "en"
          }
        ],
        index: 0
      }
    },
    mounted() {

    },
    methods: {
      onChange(e) {
        console.log(e.mp)
        const { value, index } = e.mp.detail
        this.index = index
        this.show = false
        this.$i18n.locale = value.code
        this.$store.commit("setLang",value.code)
      },
      onSignOut() {
        const _this = this
        wx.showModal({
          title: "提示",
          content: "退出后不会删除任何历史数据，下次登录依然可以使用本账号",
          success(res) {
            if (res.confirm) {
              wx.clearStorageSync()
              wx.redirectTo({
                url: "/pages/login/main"
              })
            } else if (res.cancel) {
              console.log("用户点击取消")
            }
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  .setting {
    .active-class {
      color #06D149 !important
    }

    .sheet {
      .van-picker__confirm {
        color #06D149 !important
      }

      .van-picker__cancel {
        color #474544 !important
      }
    }


  }

</style>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"

  .setting {
    .btn {
      width 100%
      position fixed
      bottom rpx(240)
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

      .right {
        float right
      }
    }

    .img-bg{
      position absolute
      bottom rpx(360)
      padding 0 rpx(30)
      .img{
        width rpx(690)
        height rpx(170)
        background-size rpx(690) rpx(170)
      }
    }
  }
</style>
