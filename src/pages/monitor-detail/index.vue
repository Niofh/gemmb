<template>
  <div class="monitor-detail" @click="pageClick">
    <div class="header">{{i18n.equipmentDetails}}</div>

    <div class="address">
      <div class="address-bg" :style="{'backgroundColor':bgColor}">
        <div class="address-wrap">
          <div class="address-header">{{deviceInfo.Name}}</div>
          <div class="address-body">
            <div class="left">
              {{deviceInfo.LocationName}}/{{deviceInfo.DeviceTypeItems&&deviceInfo.DeviceTypeItems.length>0?deviceInfo.DeviceTypeItems[0].Name:"--"}}
            </div>
            <div class="right">{{deviceInfo.IPAddress}}</div>
          </div>
          <div class="address-footer">
            <span class="left">{{deviceInfo.AreaName || "--"}}</span>
            <span class="right">{{deviceInfo.RegionName}}</span>
          </div>
        </div>
      </div>
    </div>


    <div class="order-id">{{i18n.AssociatedTicketID}} : <a class="link"
                                                           :href="'/pages/work-order-detail/main?id='+tickId">{{tickId}}</a>
    </div>
    <div class="header">{{i18n.performanceManagement}}</div>
    <div class="progress-list" style="padding-left: 0;padding-right: 0">

      <div class="pad-l-r-30">
        <my-progress :number="10" :total="30" process-color="#E60012" left-text="ping" icon="cancel">
        </my-progress>
      </div>


      <van-collapse :value="activeNames" @change="onChange">
        <van-collapse-item :title="i18n.InterfaceUtilization" name="interface">

          <my-progress :number="10" :total="30" process-color="#0CC808" left-text="cup2利用率">
          </my-progress>
          <my-progress :number="10" :total="30" process-color="#0CC808" left-text="cup1利用率">
          </my-progress>


        </van-collapse-item>


        <van-collapse-item :title="i18n.CpuUtilization" name="cpu">
          <my-progress :number="10" :total="30" process-color="#0CC808" left-text="cup2利用率">
          </my-progress>
          <my-progress :number="10" :total="30" process-color="#0CC808" left-text="cup1利用率">
          </my-progress>
        </van-collapse-item>
        <van-collapse-item :title="i18n.MemoryUtilization" name="ram">
          <my-progress :number="10" :total="30" process-color="#0CC808" left-text="I/O内存利用率">
          </my-progress>
          <my-progress :number="10" :total="30" process-color="#0CC808" left-text="处理器内存利用率">
          </my-progress>
        </van-collapse-item>
      </van-collapse>

    </div>

    <div class="header">{{i18n.alertsHistory}}</div>


    <div class="mar-l-r-30">
      <div class="header-bg">{{i18n.alertsHistory}}</div>

      <my-desc-item v-for="d in historyWaringList" :key="d.DeviceLocalTime" :border-color="d.SeverityHtmlColor"
                    :text="d.Notes"
                    :date=d.time>

      </my-desc-item>

    </div>

    <div class="header">{{i18n.ticketHistory}}</div>


    <div class="table-wrap">
      <my-table-row :rows="rows" :is-show-select.sync="isShowSelect"></my-table-row>
      <div class="my-table-cell history" v-for="(c,index) in historyList" :key="index">
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">
            <a class="link" :href="'/pages/work-order-detail/main?id='+c.TicketId"> {{c.TicketId}}</a>
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left ">{{HISTORY_WORK_STATUS[c.TicketType]}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left ">{{"P"+c.Priority}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[3].width}">
          <div class="left">{{BUG_STATUS_CODE[c.TicketStatus]}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[4].width,lineHeight:'20px'}">
          <div class="left">
            <div class="date">{{c.date}}</div>
            <div class="time">{{c.time}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="station-min"></div>
  </div>
</template>

<script>
  import myProgress from "@/components/my-progress/index.vue"
  import myDescItem from "@/components/my-desc-item/index.vue"
  import myTable from "@/components/my-table-row"
  import myTableRow from "@/components/my-table-row/index.vue"
  import myTableRowMixin from "@/mixins/myTableRowMixin"
  import { BUG_STATUS_CODE, HISTORY_WORK_STATUS } from "../../utils/constant"
  import { formatTime } from "../../utils"

  export default {
    mixins: [myTableRowMixin],
    components: {
      "my-progress": myProgress,
      "my-desc-item": myDescItem,
      "my-table": myTable,
      "my-table-row": myTableRow
    },
    computed: {
      i18n() {
        return this.$t("message")
      },
      rows() {
        const i18n = this.$t("message")
        return [
          {
            width: "22%",
            name: i18n.TicketID,
            isArrow: true
          },
          {
            width: "19%",
            name: i18n.Type,
            isArrow: true
          },
          {
            width: "20%",
            name: i18n.Priority,
            isArrow: true
          },
          {
            width: "19%",
            name: i18n.Status,
            isArrow: true
          },
          {
            width: "20%",
            name: i18n.Time,
            isArrow: true
          }
        ]
      }
    },
    data() {
      return {
        activeNames: [],
        activeNamesInterface: [],
        deviceInfo: {},
        historyList: [],
        BUG_STATUS_CODE: BUG_STATUS_CODE,
        HISTORY_WORK_STATUS: HISTORY_WORK_STATUS,
        tickId: "",
        bgColor: "",
        historyWaringList: [],
        cpuData: []  // cpu数据
      }
    },
    mounted() {
      const deviceId = Number(this.$root.$mp.query.deviceId) || ""
      this.getDeviceInfo(deviceId)
      this.getHistory(deviceId)
      this.getDeviceStatus(deviceId)
      this.getHistoryWaring(deviceId)
      this.getPing(deviceId)
      this.getPerformance(deviceId)
    },
    methods: {

      // 获取设备基础信息
      getDeviceInfo(deviceId) {
        this.$fly.get(`Api/Cmdb/Devices/${deviceId}`).then(res => {
          if (res) {
            this.deviceInfo = res
          }
        })
      },

      // 关联的工单ID以及历史工单的内容
      getHistory(deviceId) {
        this.$fly.get(`Api/ServiceDesk/Ticket/Device/Ticket/Get/${deviceId}`).then(res => {
          if (res) {
            this.historyList = res.map(item => {
              const format = formatTime(new Date(item.CreatedLocalTime), "/")
              return {
                ...item,
                date: format.t1.slice(2),
                time: format.t2
              }
            })
            this.tickId = this.historyList[this.historyList.length - 1].TicketId
          }
        })
      },

      // 获取历史警告
      getHistoryWaring(deviceId) {
        const curDate = new Date()
        const endUtli = formatTime(curDate)
        const end = endUtli.t1 + "T" + endUtli.t2
        // 将半年的时间单位换算成毫秒
        var halfYear = 24 * 3600 * 1000
        const startTime = curDate - halfYear
        var startUtil = formatTime(new Date(startTime))
        const start = startUtil.t1 + "T" + startUtil.t2
        this.$fly.get(`Api/Nms/Devices/${deviceId}/Alerts?start=${start}&end=${end}`).then(res => {
          if (res) {
            this.historyWaringList = res.map(item => {
              const { t1, t2 } = formatTime(new Date(item.DeviceLocalTime))
              const username = item.CustomerName
              return {
                ...item,
                time: t1 + " " + t2,
                username: username
              }
            })
          }
        })
      },


      getDeviceStatus(deviceId) {
        this.$fly.get(`Api/Nms/Devices/${deviceId}/DeviceStatus`).then(res => {
          if (res) {
            console.log(res)
            this.bgColor = res[0].SeverityHtmlColor
          }
        })
      },

      getPing(deviceId) {
        this.$fly.get(`Api/Nms/Poller/PollerRequest/Ping/Start/${deviceId}`).then(res => {
          if (res) {
            delete res.Name
            this.$fly.post(`Api/Nms/Poller/PollerRequest/PingResponseData/Get`, res).then(result => {

            })
          }
        })
      },



      // 获取性能指标
      getPerformance(deviceId) {
        this.$fly.get(`Api/Nms/Devices/${deviceId}/StatisticsTrees`).then(res => {
          console.log(res)
          if (res && res.length > 0) {
            const data = res[0]

            for (let i = 0; i < data.ChildItems.length; i++) {
              const item = data.ChildItems[i]
              if (item.Label === "System") {
                // System -> Cpu -> Cpu Usage
                console.log('System',item)
                const sysChildItems = item.ChildItems

                for (let j = 0; j < sysChildItems.length; j++) {
                  const sys = sysChildItems[j]
                  console.log(sys.Label)
                  if (sys.Label.toLocaleLowerCase().trim() === "cpu") {
                    console.log('CPU ChildItems',sys.ChildItems)
                  }

                }
              }
            }


          }
        })
      },


      onChange(event) {

        this.activeNames = event.mp.detail
      },
      onChangeInterface(event) {
        console.log(event.mp)
        this.activeNamesInterface = event.mp.detail
      }
    }
  }
</script>
<style lang="stylus">
  @import "~@/assets/stylus/common.styl"
  .monitor-detail {
    .my-collapse {
      .van-cell {
        padding-right rpx(5)
        padding-left rpx(5)
      }
    }
  }
</style>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .monitor-detail {
    width 100%
    min-height 100%
  }

  .address {
    padding rpx(0) rpx(30)
  }

  .address-bg {
    width 100%
    height 100%
    background-size: cover

    .address-wrap {
      color: #fff;
      padding rpx(30)

      .address-header {
        font-size: rpx(36);
        font-weight: bold;
      }
    }

    .address-body {
      padding-top rpx(46)
      padding-bottom rpx(76)
      font-size: rpx(32);
      font-weight: 500;
      display flex

      .left {
        flex 1
      }

      .right {
        flex 1
        text-align right
      }
    }

    .address-footer {
      display flex

      .left {
        margin-right rpx(28)
        font-size: rpx(32);
        font-weight: 500;
      }

      .right {
        flex 1
        font-size: rpx(20);
        font-weight: 500;
        line-height: rpx(28);
      }
    }
  }

  .order-id {
    margin-top rpx(32)
    margin-bottom rpx(78)
    padding rpx(0) rpx(30)
    font-size: rpx(28);
    font-weight: 500;
    color #666666

    .link {
      display inline-block
    }
  }

  .progress-list {

    .progress-item {
      padding 0 rpx(30) 0 rpx(30)
    }
  }

  .table-wrap {
    .my-cell-item {
      height rpx(76)
      line-height rpx(76)
    }
  }


</style>
