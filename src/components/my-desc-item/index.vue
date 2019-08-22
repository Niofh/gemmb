<template>
  <div class="my-desc-item" :style="{'borderTopColor':borderColor}">
    <div class="my-desc-body">
    {{text}}
    </div>
    <div class="my-desc-footer">
      <spam class="left">{{date}}</spam>
      <spam class="right">{{username}}</spam>
    </div>
  </div>
</template>
<script>
  export default {
    name: "my-desc-item",
    props: {
      borderColor: {
        type: String,
        default: "#E50112"
      },
      date:{
        type: String,
        default: ""
      },
      text:{
        type: String,
        default: ""
      },
      username:{
        type: String,
        default: ""
      },
    }
  };
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .my-desc-item {
    margin-top rpx(10)
    padding rpx(35) rpx(21) rpx(28)
    background-color #fff;
    border-radius: rpx(10);
    font-weight: 400;
    border-top: solid #E50112 rpx(10)
    overflow hidden
    word-wrap: break-word;
    word-break: normal;
    .my-desc-body {
      margin-bottom rpx(50)
      font-size rpx(28)
      color: #333;
      line-height: rpx(36);

    }

    .my-desc-footer {
      display flex
      color #666
      font-size rpx(24)
      .left{
        flex 1
      }
      .right{
        flex 1
        text-align right
      }
    }
  }
</style>
