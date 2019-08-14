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
      <my-progress :critical="10" :total="60" right-text="1/60">
        Critical
      </my-progress>
      <my-progress right-text="1/10" :warning="1" :total="10">
        Warning
      </my-progress>
      <my-progress right-text="1/10" :minor="1" :total="10">
        Minor
      </my-progress>
      <my-progress right-text="1/10" :major="1" :total="10">
        Major
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
        return this.$store.state.userInfo.CustomerTag
      }
    },
    data() {
      return {
        bgColor: "#0CC808",
        devicesTotal: 0, // 设备总数
        devicesObj: {},// 设备状态数量
        warinObj: {
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
        },// 警告数量
        severityStatus: SeverityStatus
      }
    },
    mounted() {
      console.log(this.customerTag, "===================================")
      this.getDevicesTotal()
      this.getWarning()
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

          }
        })
      }
    }

  }
</script>


<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"


</style>
