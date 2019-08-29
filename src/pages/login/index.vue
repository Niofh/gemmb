<template>
  <div class="login">
    <div class="logo-wrap">
      <img class="logo"
           src="https://wechat.logicalisservice.com/images/logo.png"
           alt="logo">
    </div>
    <div class="bg-wrap">
      <img class="bg"
           src="https://wechat.logicalisservice.com/images/loginbg.png" alt="bg">
      <div class="login-wrap">
        <van-field
          :value="form.Identity"
          clearable
          placeholder="Please input username"
          @change="onChangeUserName"
        >
          <img class="username-icon" slot="left-icon" src="https://wechat.logicalisservice.com/images/username.png"
               alt="">
        </van-field>
        <div class="blcok"></div>
        <van-field
          :value="password"
          type="password"
          clearable
          placeholder="Please input password"
          @change="onChangePwd"
        >
          <img class="username-icon" slot="left-icon" src="https://wechat.logicalisservice.com/images/pwd.png" alt="">
        </van-field>

        <div class="checkbox">
          <van-checkbox
            checked-color="#E31E27"
            label-class="label"
            :value="checked"
            @change="onChangeChecked"
          >
            remember username and password

          </van-checkbox>
        </div>
        <van-button type="danger" size="large" @click="onLogin">Login</van-button>
        <div class="tis">Partner Entry</div>
      </div>
    </div>
    <div class="copyright">Copyright © 2019 logicalis.com.ALL rights reservd.</div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import Toast from "@/../static/vant/toast/toast"

  export default {
    data() {
      return {
        password: "", // test@135
        checked: false,
        form: {
          Identity: "", // 用户名test_public@demo
          EncryptedPassword: "",
          HashedPassword: "", // md5加密码
          OneTimePassword: ""
        }
      }
    },
    computed: {
      remember() {
        return this.$store.state.remember
      },
      userInfo() {
        return this.$store.state.userInfo
      }
    },
    onShow() {
      const userInfo = this.$store.state.userInfo
      console.log("userInfo", userInfo)
      const len = Object.keys(userInfo).length
      console.log("len", len)
      if (len > 0) {
        // 存在用户信息，表示有记住我功能
        wx.switchTab({
          url: "/pages/index/main"
        })
      }
    },
    methods: {
      onChangeUserName(event) {
        this.form.Identity = event.mp.detail
      },
      onChangePwd(event) {
        this.password = event.mp.detail
      },
      onChangeChecked(e) {
        this.checked = e.mp.detail
      },
      onLogin() {
        if (!this.form.Identity) {
          Toast("UserName Required")
          return
        }
        if (!this.password) {
          Toast("Password Required")
          return
        }
        Toast.loading({
          mask: true,
          message: "loading..."
        })


        // md5加密
        const md5 = this.$md5.create()
        md5.update(this.password)
        const digest = md5.digest()
        const ret = `{MD5}` + md5.base64(digest)

        this.form.HashedPassword = ret

        this.$store.commit("setRemember", this.checked)


        this.$fly.post("/Api/Security/AccessTokens", this.form)
          .then((res) => {
            if (res) {
              console.log(res)
              if (this.checked) {
                // 记住我，保存到缓存
                this.$store.commit("setUserInfo", res)
                this.$store.commit("setRemember", true)
              }
              wx.switchTab({
                url: "/pages/index/main"
              })
            }
          })
          .catch(err => {

          })
          .finally(() => {
            Toast.clear()
          })
      }
    }

  }
</script>
<style lang="stylus">
  @import "~@/assets/stylus/common.styl"
  .login {
    .checkbox {
      .van-checkbox__icon--round {
        transform scale(0.8)
      }

      .label {
        font-size rpx(28)
      }
    }
  }
</style>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .login {
    .logo-wrap {
      margin rpx(96) 0 rpx(30) 0
      text-align center

      .logo {
        width rpx(488)
        height rpx(93)
      }
    }

    .bg-wrap {
      position relative
      width 100%
      height rpx(700)

      .bg {
        width 100%
        height rpx(700)
      }

      .login-wrap {
        padding rpx(30)
        width 80%
        border rpx(4) solid #F3E0E4
        border-radius rpx(10)
        position absolute
        top: 50%
        left: 50%
        transform translate(-50%, -50%)
        background-color #fff

        .blcok {
          height rpx(20)
        }

        .username-icon, .pws-icon {
          margin-right rpx(18)
          width rpx(40)
          height rpx(40)
        }

        .checkbox {
          margin-top rpx(30)
          margin-left rpx(30)
          margin-bottom rpx(50)
        }

        .tis {
          margin-top rpx(50)
          font-size: rpx(24);
          font-weight: 400;
          color #E41E26
          text-align center
        }
      }
    }

    .copyright {
      width 100%
      position fixed
      bottom rpx(150)
      text-align center
      font-size: rpx(20);
      font-weight: 400;
      color #9A9DA2
    }
  }
</style>
