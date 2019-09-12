<template>
  <div class="work-order">
    <div class="header">{{i18n.workOrderDetails}}</div>
    <div class="table-wrap">
      <my-table-row :rows="rows"></my-table-row>
      <div class="my-table-cell"
           :style="{'backgroundColor':bugWork.PriorityHtmlColor}">
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">
            {{'P'+bugWork.Priority}}
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left ">
            {{bugWork.TicketId}}
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left ">
            <a class="link" :href="'/pages/monitor-detail/main?deviceId='+bugWork.DeviceId">{{bugWork.DeviceName|| '--'}}</a>
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[3].width}">
          <div class="left">{{BUG_STATUS_CODE[bugWork.IncidentState]}}</div>
        </div>
      </div>
    </div>


    <div class="header">{{i18n.ticketJounals}}</div>
    <div class="mar-l-r-30 ">

      <my-toggle :left="i18n.ticketJounals">
        <div>
          <my-desc-item v-for="w in workLog"
                        :key="w.CreatedUtc"
                        border-color="#D59E0A"
                        :text="w.Html||''"
                        :date="w.time"
                        :username="w.username"
          >

          </my-desc-item>
        </div>
      </my-toggle>
    </div>

    <div class="header">{{i18n.deviceAlarm}}</div>
    <div class="mar-l-r-30">
      <my-toggle :left="i18n.deviceAlarm">
        <div>
          <my-desc-item v-for="d in deviceList" :key="d.DeviceLocalTime" :border-color="d.SeverityHtmlColor"
                        :text="d.Notes"
                        :date=d.time>

          </my-desc-item>


        </div>

      </my-toggle>
    </div>

    <div class="station-min"></div>
  </div>
</template>

<script>
  import myToggle from "@/components/my-toggle"
  import myTable from "@/components/my-table-row"
  import myTableRow from "@/components/my-table-row/index.vue"
  import myDescItem from "@/components/my-desc-item/index.vue"
  import {BUG_STATUS_CODE} from "../../utils/constant";
  import {formatTime} from "../../utils";

  export default {
    components: {
      "my-desc-item": myDescItem,
      "my-table": myTable,
      "my-table-row": myTableRow,
      "my-toggle": myToggle
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
            isArrow: false
          },
          {
            width: "27%",
            name: i18n.TicketID,
            isArrow: false
          },
          {
            width: "25%",
            name: i18n.Device,
            isArrow: false
          },
          {
            width: "25%",
            name: i18n.Status,
            isArrow: false
          }
        ]
      },
    },
    data() {
      return {
        bugWork: {},
        BUG_STATUS_CODE,
        workLog: [],
        deviceList: []
      }
    },
    mounted() {
      const tickId = Number(this.$root.$mp.query.id) || ''
      this.getBusWork(tickId)
      this.getWorkLog(tickId)

    },
    onUnload(){
      console.log('onUnload')
      this.bugWorkList = []
      this.workLog = []
      this.deviceList = []
    },
    methods: {
      // 获取故障工单
      getBusWork(ticketId) {
        const _this = this
        this.$fly.get(` Api/ServiceDesk/Tickets/${ticketId}`).then(res => {
          if(res){
            this.bugWork = res
            _this.getDeviceLog(ticketId)
          }

        })


      },


      // 获取工单日志
      getWorkLog(tickId) {
        this.workLog = []
        this.$fly.get(`Api/ServiceDesk/Tickets/${tickId}/TicketJournals`).then(res => {
          if (res && res.length > 0) {
            this.workLog = res.map(item => {
              const {t1, t2} = formatTime(new Date(item.CreatedUtc))
              const username = item.CreatedBy.Name + `[${item.CreatedBy.CustomerTag}]`
              return {
                ...item,
                time: t1 + ' ' + t2,
                username
              }
            })
          }
        })
      },
      getDeviceLog(ticketId) {
        this.$fly.post(`Api/Nms/Tickets/${ticketId}/Alerts`, {
          "Page": 1,
          "PageSize": 500
        }).then(t => {
          t.DeviceAlertItems.forEach(item => {
            if (item.TicketId === ticketId) {
              this.bugWork.DeviceName = item.DeviceName
              this.bugWork.DeviceId = item.DeviceId
            }
            this.deviceList = t.DeviceAlertItems.map(item=>{
              const {t1, t2} = formatTime(new Date(item.DeviceLocalTime))
              const username = item.DeviceName
              return {
                ...item,
                time: t1 + ' ' + t2,
                username:username,

              }
            })
          })
        })
      }

    }
  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"

</style>
