<template>
  <div class="login">
    <div class="logo-wrap">
      <img class="logo"
           src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3359634383,540379162&fm=26&gp=0.jpg"
           alt="logo">
    </div>
    <div class="bg-wrap">
      <img class="bg"
           src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3359634383,540379162&fm=26&gp=0.jpg" alt="bg">
      <div class="login-wrap">
        <van-field
          :value="username"
          clearable
          placeholder="Please input username"
        >
          <img class="username-icon" slot="left-icon" src="/static/images/username.png" alt="">
        </van-field>
        <div class="blcok"></div>
        <van-field
          :value="password"
          type="password"
          clearable
          placeholder="Please input password"
        >
          <img class="username-icon" slot="left-icon" src="/static/images/pwd.png" alt="">
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: "",
        password: "",
        checked: false
      };
    },
    methods: {
      onChangeChecked(e) {
        this.checked = e.mp.detail;
      },
      onLogin(){
        wx.switchTab({
          url:'/pages/index/main'
        })
      }
    }

  };
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
