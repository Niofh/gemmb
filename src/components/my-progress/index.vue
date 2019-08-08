<template>
  <div class="header">

  </div>
  <!--进度条-->
  <div class="my-progress" :style="{'backgroundColor': bgColor}">
    <div class="process critical" :style="{width: (critical/total*100)+'%'}"></div>
    <div class="process warning" :style="{width: (warning/total*100)+'%'}"></div>
    <div class="process minor" :style="{width: (minor/total*100)+'%'}"></div>
    <div class="process major" :style="{width: (major/total*100)+'%'}"></div>
    <div class="process normal" :style="{width: (normal/total*100)+'%'}"></div>
  </div>
</template>

<script>
  export default {
    name: "my-progress",
    props: {
      critical: {
        type: Number,
        default: 0
      },
      warning: {
        type: Number,
        default: 0
      },
      minor: {
        type: Number,
        default: 0
      },
      major: {
        type: Number,
        default: 0
      },
      normal: {
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
      }
    }
  };
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .my-progress {
    width 100%
    height: rpx(16);
    background-color: #CCCCCC;
    border-radius: 8px;
    overflow hidden

    .process {
      float left
      height: 100%

      &.critical {
        background-color $critical
      }

      &.warning {
        background-color $warning
      }

      &.minor {
        background-color $minor
      }

      &.major {
        background-color $major
      }

      &.normal {
        background-color $normal
      }
    }

    .process-1 {
      width 10%
      background-color red
    }

    .process-2 {
      width 20%
      background-color blue
    }
  }
</style>
