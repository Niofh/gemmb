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
                   :total="waringTotal"
                   :right-text="item.number">
      </my-progress>
    </div>


    <div class="header">{{i18n.ticketSummary}}</div>
    <div class="progress-list">
      <my-progress :critical="10" :total="60" right-text="1">
        P1
      </my-progress>
      <my-progress right-text="1" :warning="1" :total="10">
        P2
      </my-progress>
      <my-progress right-text="1" :minor="1" :total="10">
        P3
      </my-progress>
      <my-progress right-text="1" :major="1" :total="10">
        P4
      </my-progress>

    </div>

    <div class="station"></div>

    <my-footer :active="0"></my-footer>
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer/index.vue"
  import myProgress from "@/components/my-progress/index.vue"
  import {Severity, SeverityStatus} from "@/utils/constant"

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
        return this.$store.state.userInfo.CustomerTag
      }
    },
    data() {
      return {
        bgColor: "#0CC808",
        devicesTotal: 0, // 设备总数
        devicesObj: {},// 设备状态数量
        waringObj: { // 警告数量
          Critical: {
            color: Severity.Critical.color
          },
          Warning: {
            color: Severity.Warning.color
          },
          Minor: {
            color: Severity.Minor.color
          },
          Major: {
            color: Severity.Major.color
          }
        },
        waringTotal: 0,
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
            console.log(this.devicesObj)
          }
        })
      },
      // 获取警告总结
      getWarning() {
        this.$fly.get(`Api/Nms/Customers/${this.customerTag}/AlertSummary`).then(res => {
          if (res && res.length > 0) {
            const data = res[0]
            this.waringObj.Critical.number = data.Critical
            this.waringObj.Warning.number = data.Warning
            this.waringObj.Minor.number = data.Minor
            this.waringObj.Major.number = data.Major
            this.waringTotal = data.Total
          }
        })
      },
      // 获取工单总结
      getWorkTotal(){
        this.$fly.post(`Api/ServiceDesk/Customers/${this.customerTag}/TicketSearch`,{customerTag:this.customerTag}).then(res=>{
          if (res && res.length > 0) {

          }
        })
      }
    }

  }
</script>


<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"


</style>
