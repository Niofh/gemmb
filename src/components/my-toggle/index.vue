<template>
  <div class="my-toggle " >

    <div class="header-bg" @click="toggle">
      <div class="left">{{left}}</div>
      <div class="right">
        <van-icon custom-class="icon-arrow"
                  :name="arrow?'arrow-up':'arrow-down'"
                  color="#fff">
        </van-icon>
      </div>

    </div>
    <div class="my-body" id="the-id" v-show="arrow" >
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
    },
    methods:{
      toggle(e){
        console.log(this.$root.$mp.page)
        this.arrow = !this.arrow
        var query=wx.createSelectorQuery();
        query.selectAll('.my-body').boundingClientRect()
        query.exec(function(res){
          console.log(res)
        })
      }
    }
  };
</script>


<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .my-toggle {
    overflow hidden

    .header-bg {
      position relative
      z-index 2
      overflow hidden

      .left {
        float left
        word-wrap: break-word;
        word-break: normal;
      }

      .right {
        float right
        vertical-align middle

        >>> .icon-arrow {
          margin-top rpx(10)
        }
      }
    }

    .my-body {
      transition: all 0.3s linear;
      &.hide {
      }
    }
  }
</style>
