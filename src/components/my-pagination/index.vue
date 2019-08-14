<template>
  <div class="my-pagination">
    <div class="page">
      <div class="pagelist">
        <span class="jump" v-show="current_page>1" @click=" current_page>0&&current_page--">上一页</span>
        <span v-show="current_page>4" class="jump" @click="jumpPage(1)">1</span>
        <span class="jump"
              v-for="num in indexs"
              :key="num"
              :class="{'bgprimary':current_page===num}"
              @click="jumpPage(num)">{{num}}</span>

        <span v-show="current_page<pages" class="jump" @click="current_page++">下一页</span>
        <span v-show="!(current_page>=pages)" class="jump" @click="jumpPage(pages)">{{pages}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "my-pagination",
    props:{
      pages:{ // 总页面，一页多少条数据
        type:Number,
        default:0
      }
    },
    data() {
      return {
        current_page: 1, //当前页
      }
    },
    computed: {
      efont: function () {
        if (this.pages <= 7) return false;
        return this.current_page > 5
      },
      indexs: function () {

        var left = 1,
          right = this.pages,
          ar = [];
        // 总条数大于等于4
        if (this.pages >= 4) {
          // 显示三个  总是是10
          if (this.current_page > 4 && this.current_page < this.pages - 2) {
            // 如果当前页小于最后三个  current_page 5~8
            left = this.current_page - 1
            right = this.current_page + 1
          } else {
            if (this.current_page <= 4) {
              // current_page 4
              left = 1;
              right = 4;
            } else {
              // current_page 9~10
              left = this.pages - 2;
              right = this.pages;
            }
          }
        }
        while (left <= right) {
          ar.push(left);
          left++;
        }
        return ar;
      },
    },
    methods: {
      jumpPage: function (id) {
        this.current_page = id;
        this.$emit('onJumpPage',id) // 跳转回调事件
      },
    },
  }
</script>

<style scoped>
  .page {
    font-weight: 900;
    height: 40px;
    text-align: right;
    color: #888;
    margin: 5px auto 0;
  }

  .pagelist {
    font-size: 0;
    height: 50px;
    line-height: 50px;
  }

  .pagelist span {
    font-size: 14px;
  }

  .pagelist .jump {
    border: 1px solid #ccc;
    padding: 5px 8px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 5px;
  }

  .pagelist .bgprimary {
    cursor: default;
    color: #fff;
    background: #337ab7;
    border-color: #337ab7;
  }

  .jumpinp input {
    width: 55px;
    height: 26px;
    font-size: 13px;
    border: 1px solid #ccc;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
    text-align: center;
  }

  .ellipsis {
    padding: 0px 8px;
  }

  .jumppoint {
    margin-left: 30px;
  }

  .pagelist .gobtn {
  }

  .bgprimary {
    cursor: default;
    color: #fff;
    background: #337ab7;
    border-color: #337ab7;
  }
</style>
