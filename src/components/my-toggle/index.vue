<template>
  <div class="my-toggle ">

    <div class="header-bg"  @click="arrow=!arrow">
      <div class="left">{{left}}</div>
      <div class="right">
        <van-icon custom-class="icon-arrow"
                  :name="arrow?'arrow-up':'arrow-down'"
                  color="#fff">
        </van-icon>
      </div>

    </div>
    <div class="body" v-show="arrow">
      <slot></slot>
    </div>

  </div>
</template>
<script>
  export default {
    name: "my-toggle",
    props: {
      left: String
    },
    data() {
      return {
        arrow: true
      };
    }
  };
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .my-toggle {
    .header-bg {
      overflow hidden

      .left {
        float left
      }

      .right {
        float right
        vertical-align middle
        >>> .icon-arrow{
          margin-top rpx(10)
        }
      }
    }
  }
</style>
