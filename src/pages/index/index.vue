<template>
  <div class="home">

    <div class="header">{{i18n.devicesSummary}}</div>
    <div class="progress-list">
      <my-progress v-for="(d,key) in devicesObj" :key="key"
                   :bg-color="bgColor"
                   :process-color="d.color"
                   :number="d.number"
                   :total="devicesTotal"
                   :left-text="severityStatus[key]"
                   :right-text="d.number+'/'+devicesTotal">
      </my-progress>
    </div>


    <div class="header">{{i18n.alertsSummary}}</div>
    <div class="progress-list">
      <my-progress v-for="(item,key) in waringObj"
                   :key="key"
                   :left-text="key"
                   :number="item.number"
                   :process-color="item.color"
                   :total="waringTotal"
                   :right-text="item.number">
      </my-progress>
    </div>


    <div class="header">{{i18n.ticketSummary}}</div>
    <div class="progress-list">
      <my-progress :number="work.p1" :total="workTotal" left-text="p1" :right-text="work.p1" process-color="#E60012">

      </my-progress>
      <my-progress left-text="P2" :right-text="work.p2" process-color="#448ACA" :number="work.p2" :total="workTotal">

      </my-progress>
      <my-progress left-text="P3" :right-text="work.p3" process-color="#E9d310" :number="work.p3" :total="workTotal">

      </my-progress>
      <my-progress left-text="P4" :right-text="work.p4" process-color="#F39800" :number="work.p4" :total="workTotal">

      </my-progress>

    </div>

    <div class="station"></div>

    <my-footer :active="0"></my-footer>
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer/index.vue"
  import myProgress from "@/components/my-progress/index.vue"
  import { Severity, SeverityStatus } from "@/utils/constant"

  export default {
    onShow() {
      wx.hideTabBar({})
    },
    components: {
      "my-footer": myFooter,
      "my-progress": myProgress
    },
    computed: {
      i18n() {
        return this.$t("message")
      },
      customerTag() {
        console.log(this.$store.state.userInfo, "this.$store.state.userInfo")
        return this.$store.state.userInfo.CustomerTag
      }
    },
    data() {
      return {
        bgColor: "",
        devicesTotal: 0, // 设备总数
        devicesObj: {},// 设备状态数量
        waringObj: { // 警告数量
          Critical: {
            color: Severity.Critical.color,
            number: 0
          },
          Warning: {
            color: Severity.Warning.color,
            number: 0
          },
          Minor: {
            color: Severity.Minor.color
            , number: 0
          },
          Major: {
            color: Severity.Major.color
            , number: 0
          }
        },
        waringTotal: 0,
        work: {
          p1: 0,
          p2: 0,
          p3: 0,
          p4: 0
        },
        workTotal: 0,
        severityStatus: SeverityStatus
      }
    },
    mounted() {
      console.log(this.customerTag, "===================================")
      this.getDevicesTotal()
      this.getWarning()
      this.getWorkTotal()
    },
    methods: {
      onChangeSelect(e) {
        console.log(e)
        this.check = !this.check

      },
      onHome(e) {
        console.log(e, "home")
      },
      onHide() {
        this.check = false
      },
      // 获取设备总数
      getDevicesTotal() {
        this.$fly.get(`Api/Nms/Customers/${this.customerTag}/DeviceStatus`).then(res => {
          if (res && res.length > 0) {
            this.devicesTotal = res.length
            this.devicesObj = {}
            res.forEach(item => {
              if (this.devicesObj[item.Severity] == null) {
                this.devicesObj[item.Severity] = {
                  number: 1,
                  color: item.SeverityHtmlColor,
                  status: item.Severity
                }
              } else {
                this.devicesObj[item.Severity].number = this.devicesObj[item.Severity].number + 1
              }
            })
            console.log("this.devicesObj", this.devicesObj)
          }
        })
      },
      // 获取警告总结
      getWarning() {
        this.$fly.get(`Api/Nms/Customers/${this.customerTag}/AlertSummary`).then(res => {
          if (res && res.length > 0) {
            res.forEach(item => {
              this.waringObj.Critical.number += item.Critical
              this.waringObj.Warning.number += item.Warning
              this.waringObj.Minor.number += item.Minor
              this.waringObj.Major.number += item.Major
              this.waringTotal += item.Total
            })

          }
          console.log("this.waringObj", this.waringObj)
        })
      },
      // 获取工单总结
      getWorkTotal() {
        this.$fly.post(`Api/ServiceDesk/Customers/${this.customerTag}/TicketSearch`, {
          "TicketSearchFields": [],
          "TicketTypes": [0, 1, 2, 3],
          "ChangeTypes": [0, 1, 2],
          "TicketStatuses": [0, 1, 2],
          "Priorities": [1, 2, 3, 4]
        }).then(res => {
          if (res.TicketSearchResults && res.TicketSearchResults.length > 0) {
            res.TicketSearchResults.forEach(item => {
              if (item.Priority === 1) {
                this.work.p1++
              } else if (item.Priority === 2) {
                this.work.p2++
              } else if (item.Priority === 3) {
                this.work.p3++
              } else if (item.Priority === 4) {
                this.work.p4++
              }
            })
            this.workTotal = res.TicketSearchResults.length
            console.log(this.workTotal)
          }
        })
      }
    }

  }
</script>


<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"


</style>
