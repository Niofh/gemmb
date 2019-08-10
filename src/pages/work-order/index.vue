<template>
  <div class="work-order">
    <div class="header">{{i18n.faultList}}</div>
    <div class="table-wrap">
      <my-table-row :rows="rows"></my-table-row>
      <div class="my-table-cell" v-for="c in cells" :key="c.id" :class="c.color">
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">
            <a class="link" href="/pages/work-order-detail/main">{{c.ip}}</a>
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left ">
            {{c.ip}}
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left ">P1</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[3].width}">
          <div class="left">{{c.status}}</div>
        </div>
      </div>
    </div>

    <div class="header">{{i18n.changeTicket}}</div>
    <div class="table-wrap">
      <my-table-row :rows="changeRows"></my-table-row>
      <div class="my-table-cell" v-for="c in changeCells" :key="c.id" :class="c.color">
        <div class="my-cell-item" :style="{'width':changeRows[0].width}">
          <div class="left">{{c.ip}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':changeRows[1].width}">
          <div class="left ">哈哈</div>
        </div>
        <div class="my-cell-item" :style="{'width':changeRows[2].width}">
          <div class="left ">P1</div>
        </div>
        <div class="my-cell-item" :style="{'width':changeRows[3].width}">
          <div class="left">{{c.status}}</div>
        </div>
      </div>
    </div>

    <my-footer :active="2"></my-footer>
  </div>
</template>

<script>
  import myTable from "@/components/my-table-row"
  import myTableRow from "@/components/my-table-row/index.vue"
  import myFooter from "@/components/my-footer/index.vue"

  export default {
    components: {
      "my-table": myTable,
      "my-table-row": myTableRow,
      "my-footer": myFooter
    },
    computed: {
      i18n() {
        return this.$t("message")
      }
    },
    data() {
      const i18n = this.$t("message")
      return {
        rows: [
          {
            width: "27%",
            name: i18n.Priority,
            isArrow: true
          },
          {
            width: "27%",
            name: i18n.TicketID,
            isArrow: true
          },
          {
            width: "25%",
            name: i18n.Device,
            isArrow: true
          },
          {
            width: "21%",
            name: i18n.Status,
            isArrow: true
          }
        ],
        cells: [
          {
            id: 1,
            color: "history",
            ip: "192.168.1.1",
            place: "上海",
            type: "故障",
            you: "p1",
            status: "open",
            date: "10000000000"
          },
          {
            id: 2,
            color: "critical",
            ip: "192.168.1.1",
            place: "上海",
            type: "故障",
            you: "p1",
            status: "open",
            date: "10000000000"
          }

        ],
        changeRows: [
          {
            width: "27%",
            name: i18n.TicketID,
            isArrow: true
          },
          {
            width: "30%",
            name: i18n.Device,
            isArrow: true
          },
          {
            width: "20%",
            name: i18n.Type,
            isArrow: true
          },
          {
            width: "23%",
            name: i18n.Status,
            isArrow: true
          }
        ],
        changeCells: [
          {
            id: 1,
            color: "history",
            ip: "192.168.1.1",
            place: "上海",
            type: "故障",
            you: "p1",
            status: "open",
            date: "10000000000"
          },
          {
            id: 2,
            color: "critical",
            ip: "192.168.1.1",
            place: "上海",
            type: "故障",
            you: "p1",
            status: "open",
            date: "10000000000"
          }

        ]

      }
    }

  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"

</style>
