<template>
  <div class="home">
<!--    <div class="process">
      <div class="process-1"></div>
      <div class="process-2"></div>
    </div>-->
    <my-progress :total="120" :critical="30" :warning="5" :major="30" ></my-progress>

    <table-row :rows="rows"></table-row>

    <my-footer :active="0"></my-footer>
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer/index.vue";
  import tableRow from "@/components/table-row/index.vue";
  import myProgress from "@/components/my-progress/index.vue";

  export default {
    components: {
      "my-footer": myFooter,
      "table-row": tableRow,
      "my-progress": myProgress
    },
    data() {
      return {
        check: false,
        rows: [
          {
            width: "22%",
            name: "优先级",
            selectOptions: [
              {
                id: 1,
                name: "Critical"
              },
              {
                id: 2,
                name: "Major"
              },
              {
                id: 3,
                name: "Minor"
              },
              {
                id: 4,
                name: "Warining"
              },
              {
                id: 5,
                name: "Normal"
              }

            ],
            isArrow: true
          },
          {
            width: "28%",
            name: "设备名称",
            isArrow: true
          },
          {
            width: "28%",
            name: "设备IP",
            isArrow: true
          },
          {
            width: "22%",
            name: "地点",
            isArrow: true
          }
        ]
      };
    },
    methods: {
      onChangeSelect(e) {
        console.log(e);
        this.check = !this.check;

      },
      onHome(e) {
        console.log(e, "home");
      },
      onHide() {
        this.check = false;
      }
    }

  };
</script>


<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"

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


</style>
