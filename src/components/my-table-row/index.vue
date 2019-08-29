<template>
  <div class="table-row">
    <div class="my-table">
      <div class="row-wrap">

        <div class="item-col"
             v-for="(item,i) in rows"
             :key="i"
             :style="{'width':item.width}"
        >
          <div class="header-item" :data-index="index" @click.stop="onSelect(item,i,$event)">
            <div class="header-col">
              <span class="name">{{item.name}}</span>
              <van-icon v-if="item.isArrow" custom-class="icon-arrow"
                        :name="isShowSelect&&i===index&&selectShow?'arrow-up':'arrow-down'"
                        color="#fff"></van-icon>
            </div>
          </div>
          <div v-show="isShowSelect&&item.selectOptions&&item.selectOptions.length&&i===index?selectShow:false"
               class="my-select">
            <div class="up-arrow"></div>
            <ul class="wrap">
              <li class="item" v-for="select in item.selectOptions" :key="select.id"
                  @click.stop="onSelectOptionClick(item,select)"
              >{{select.name}}
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-table-row",
    props: {
      rows: Array,
      isShowSelect: { // 是否能显示下拉框,因为点击空白处隐藏
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        selectShow: false, //控制下拉列表的显示隐藏，false隐藏、true显示
        index: -1 //选择的下拉列表下标
      }
    },
    methods: {
      onSelect(item,index, e) {

        console.log(this.isShowSelect,'this.isShowSelect')
        if (this.isShowSelect === false) { //点击了空白处

          this.selectShow = true
          this.$emit("update:isShowSelect", true)
        } else {
          // 判断是否点击空白处
          const oldIndex = e.mp.currentTarget.dataset.index
          if (oldIndex === index) {

            this.selectShow = !this.selectShow
          } else {
            this.selectShow = true
          }
        }
        this.index = index
        this.isShowSelect = true

        this.onRowClick(item)
      },
      arrow() {
        return "arrow-down"
      },

      // 下拉框点击事件
      onSelectOptionClick(item, select) {
        this.$emit("onSelectOption", { item, select, selectShow: this.selectShow })
      },
      onRowClick(item) {
        this.$emit("onRowClick", { item, selectShow: this.selectShow })
      }
    }
  }
</script>


<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .my-table {
    .row-wrap {
      position relative
      border-radius rpx(8)
      /*background-color #2E2E2D*/
      background: linear-gradient(#656364, #2E2E2D);

      .item-col {
        position relative
        z-index 9
        font-size rpx(28)
        color #fff
        text-align center
        display inline-block
        box-sizing border-box
        width 25%

        &:last-child {
          .header-col {
            border-right none
          }

          .my-select {
            right: 0
          }
        }
      }

      .header-item {
        padding rpx(20) 0px
      }

      .header-col {
        border-right rpx(3) solid #fff

        >>> .icon-arrow {
          vertical-align middle
          margin-left rpx(8)
        }

        .name {
          line-height rpx(24)
          word-break break-word
        }
      }

      .my-select {
        position absolute
        left: 0
        top rpx(80)
        background #000

      }

      .wrap {
        padding rpx(5)

        .item {
          padding rpx(18) rpx(52) rpx(18) rpx(23)
          text-align left
          font-size: rpx(24);
          font-weight: 400;
          color: #FEFEFE;
          border-bottom: rpx(3) solid #DFDFDF;

          &:last-child {
            border-bottom none
          }
        }

      }

      .up-arrow {
        position absolute
        left 15%
        top rpx(-36)
        width: 0;
        height: 0;
        border-top: rpx(20) solid rgba(0, 0, 0, 0);
        border-right: rpx(16) solid rgba(0, 0, 0, 0);
        border-bottom: rpx(20) solid #000;
        border-left: rpx(16) solid rgba(0, 0, 0, 0);
        z-index 10
      }
    }
  }

</style>
