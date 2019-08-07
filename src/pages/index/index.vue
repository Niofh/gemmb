<template>
  <div class="home">
    <div class="process">
      <div class="process-1"></div>
      <div class="process-2"></div>
    </div>

    <div class="box"></div>

    <div class="my-table">
      <div class="row">
        <div class="header-col">
          <span class="name">优先级</span> <van-icon custom-class="icon-arrow"  name="arrow-down" color="#fff" />
        </div>
        <div class="header-col">
          <span class="name">优先级</span> <van-icon custom-class="icon-arrow"  name="arrow-down" color="#fff" />
        </div>
        <div class="header-col">
          <span class="name">优先级</span> <van-icon custom-class="icon-arrow"  name="arrow-down" color="#fff" />
        </div>
        <div class="header-col">
          <span class="name">优先级</span> <van-icon custom-class="icon-arrow"  name="arrow-down" color="#fff" />
        </div>
      </div>
    </div>


    <my-footer :active="0"></my-footer>
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer/index.vue";

  export default {
    components: {
      "my-footer": myFooter
    },
    data() {
      return {};
    }

  };
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .my-table{
    .row{
      overflow: hidden
      border-radius rpx(8)
      .header-col{
        width 20%
        padding rpx(20) 0px
        float left
        text-align center
        font-size rpx(28)
        color #fff
        background-color #2C2C2C
        >>>.icon-arrow{
          vertical-align middle
          margin-left rpx(5)
        }
        .name{
          line-height rpx(24)
        }
      }
    }
  }
  .process {
    width 80%
    height: rpx(16);
    background: rgba(12, 200, 8, 1);
    border-radius: 8px;
    overflow hidden
    .process-1 {
      width 10%
      float left
      background-color red
      height: rpx(16)
    }
    .process-2 {
      float left
      width 20%
      height: rpx(16)
      background-color blue
    }
  }

  .box {
    width: 0;
    height: 0;
    border-top: rpx(20) solid rgba(0, 0, 0, 0);
    border-right: rpx(16) solid rgba(0, 0, 0, 0);
    border-bottom: rpx(20) solid #474544;
    border-left: rpx(16) solid rgba(0, 0, 0, 0);
  }

</style>
