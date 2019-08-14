<template>
  <div class="my-progress-wrap">
    <div class="header-progress">
      <div class="left">
        {{leftText}}
      </div>
      <div class="right">
        {{rightText}}
      </div>
    </div>
    <!--进度条-->
    <div class="my-progress" :style="{'backgroundColor': bgColor}">
      <div class="process" :style="{width: (number/total*100)+'%',backgroundColor: processColor}"></div>
      <!--      <div class="process warning" :style="{width: (warning/total*100)+'%'}"></div>-->
      <!--      <div class="process minor" :style="{width: (minor/total*100)+'%'}"></div>-->
      <!--      <div class="process major" :style="{width: (major/total*100)+'%'}"></div>-->
      <!--      <div class="process normal" :style="{width: (normal/total*100)+'%'}"></div>-->
    </div>
  </div>

</template>

<script>
  export default {
    name: "my-progress",
    props: {
      // 右边内容
      rightText: {
        type: [String,Number],
        default: ""
      },
      // 左边内容
      leftText: {
        type: String,
        default: ""
      },
      number: {
        type: Number,
        default: 0
      },
      total: {  // 总数
        type: Number,
        default: 0
      },
      bgColor: { // 默认背景颜色
        type: String,
        default: "#CCCCCC"
      },
      processColor: { // 进度条颜色
        type: String,
        default: "#CCCCCC"
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .my-progress-wrap {
    margin-bottom rpx(30)
  }

  .header-progress {
    margin-bottom rpx(14)
    overflow hidden

    .left {
      float left
      font-size: rpx(25);
      font-weight: 500;
      color #333
    }

    .right {
      float right
      text-align right
      font-size: rpx(24);
      font-weight: 500;
      color: #666;
    }
  }

  .my-progress {
    width 100%
    height: rpx(16);
    background-color: #CCCCCC;
    border-radius: 8px;
    overflow hidden

    .process {
      float left
      height: 100%

    }

  }
</style>
