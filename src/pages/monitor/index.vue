<template>
  <div class="monitor" @click="pageClick">
    <div class="table-wrap">
      <my-table-row :rows="rows" :is-show-select.sync="isShowSelect"></my-table-row>
      <div class="my-table-cell" v-for="c in cells" :key="c.id" :class="c.status">
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">{{c.status}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left "><a class="link" href="/pages/monitor-detail/main">{{c.shebei}}</a></div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left "><a class="link" href="/pages/monitor-detail/main">{{c.ip}}</a></div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[3].width}">
          <div class="left">{{c.place}}</div>
        </div>
      </div>
    </div>
    <div class="station"></div>
    <my-footer :active="1"/>
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer"
  import myTableRow from "@/components/my-table-row/index.vue"
  import myTableRowMixin from "@/mixins/myTableRowMixin"
  export default {
    mixins: [myTableRowMixin],
    components: {
      "my-footer": myFooter,
      "my-table-row": myTableRow
    },
    data() {
      const i18n = this.$t('message')
      return {
        rows: [
          {
            width: "22%",
            name: i18n.Status,
            isArrow: true,
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

            ]
          },
          {
            width: "28%",
            name: i18n.Hostname,
            isArrow: true
          },
          {
            width: "26%",
            name: i18n.IP,
            isArrow: true
          },
          {
            width: "24%",
            name: i18n.location,
            isArrow: true
          }
        ],
        cells: [
          {
            id: 1,
            status: "normal",
            shebei: "Aruba AC 620",
            ip: "192.168.1.1",
            place: "上海"
          },
          {
            id: 2,
            status: "history",
            shebei: "Aruba AC 620",
            ip: "192.168.1.1",
            place: "上海"
          },
          {
            id: 3,
            status: "critical",
            shebei: "Aruba AC 620",
            ip: "192.168.1.1",
            place: "上海"
          },
          {
            id: 4,
            status: "warning",
            shebei: "Aruba AC 620",
            ip: "192.168.1.1",
            place: "上海"
          },
          {
            id: 5,
            status: "major",
            shebei: "Aruba AC 620",
            ip: "192.168.1.1",
            place: "上海"
          }

        ]
      }
    },
    methods: {}

  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .monitor {
    width 100%
    height 100%
  }

</style>
