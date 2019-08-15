<template>
  <div class="work-order">
    <div class="header">{{i18n.faultList}}</div>
    <div class="table-wrap">
      <my-table-row :rows="rows"></my-table-row>
      <div class="my-table-cell" v-for="c in bugWorkList" :key="c.TicketID" :style="{'backgroundColor':c.PriorityHtmlColor}" >
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">
            {{c.Priority}}
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left ">
            <a class="link" href="/pages/work-order-detail/main">{{c.TicketId}}</a>
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left ">{{c.Priority}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[3].width}">
          <div class="left">{{BUG_STATUS_CODE[c.IncidentState]}}</div>
        </div>
      </div>
    </div>

    <div class="header">{{i18n.changeTicket}}</div>
    <div class="table-wrap">
      <my-table-row :rows="changeRows"></my-table-row>
      <div class="my-table-cell" v-for="c in changeWorkList" :key="c.TicketID" :style="{'backgroundColor':c.PriorityHtmlColor}">
        <div class="my-cell-item" :style="{'width':changeRows[0].width}">
          <div class="left">{{c.TicketID}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':changeRows[1].width}">
          <div class="left ">哈哈</div>
        </div>
        <div class="my-cell-item" :style="{'width':changeRows[2].width}">
          <div class="left ">{{CHANGE_TYPE_CODE(c.ChangeType)}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':changeRows[3].width}">
          <div class="left">{{CHANGE_STATUS_CODE(c.ChangeState)}}</div>
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
  import {BUG_STATUS_CODE, CHANGE_STATUS_CODE, CHANGE_TYPE_CODE} from "../../utils/constant";

  export default {
    components: {
      "my-table": myTable,
      "my-table-row": myTableRow,
      "my-footer": myFooter
    },
    computed: {
      i18n() {
        return this.$t("message")
      },
      customerTag() {
        return this.$store.state.userInfo.CustomerTag
      },
      rows() {
        const i18n = this.$t("message")
        return [
          {
            width: "23%",
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
            width: "25%",
            name: i18n.Status,
            isArrow: true
          }
        ]
      },
      changeRows() {
        const i18n = this.$t("message")
        return [
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
        ]
      }
    },

    data() {
      return {
        bugWorkList: [], // 故障工单列表
        changeWorkList: [], // 变更工单列表
        BUG_STATUS_CODE,
        CHANGE_TYPE_CODE,
        CHANGE_STATUS_CODE,
      }
    },
    mounted() {
      this.getBusWork()
    },
    methods: {
      getBusWork() {
        this.$fly.post(`Api/ServiceDesk/Customers/${this.customerTag}/TicketSearch`, {
          "TicketSearchFields": [],
          "TicketTypes": [0, 1, 2, 3],
          "ChangeTypes": [0, 1, 2],
          "TicketStatuses": [0, 1, 2],
          "Priorities": [1, 2, 3, 4]
        }).then((res) => {
          if (res) {
            const ticketSearchResults = res.TicketSearchResults;
            this.getResults(ticketSearchResults)
          }
        })

      },
      async getResults(ticketSearchResults){
        for (let i = 0; i < ticketSearchResults.length; i++) {
          const item = ticketSearchResults[i]
          console.log(item)
          const TicketId =item.TicketId
          const Device =await this.getDevice(TicketId)

          if(item.TicketIncidentDetail){
            this.bugWorkList.push({
              TicketId:item.TicketIncidentDetail.TicketId,
              IncidentState:item.TicketIncidentDetail.IncidentState,
              Priority:`P`+item.Priority,
              PriorityHtmlColor:item.PriorityHtmlColor,
            })
          }
          if(item.TicketChangeDetail){
            this.changeWorkList.push({
              PriorityHtmlColor:item.PriorityHtmlColor,
              TicketId:item.TicketIncidentDetail.TicketId,
              IncidentState:item.TicketIncidentDetail.IncidentState,
              ChangeState:item.TicketIncidentDetail.ChangeState,
              ChangeType:item.TicketIncidentDetail.ChangeType,
            })
          }

        }
        console.log('this.bugWorkList',this.bugWorkList)
        console.log('this.changeWorkList',this.changeWorkList)
      },
      async getDevice(ticketId){
        return this.$fly.get(`Api/ServiceDesk/Tickets/${ticketId}/Devices/Assignable`)
      }
    }

  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"

</style>
