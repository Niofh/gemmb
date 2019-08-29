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
        <my-progress :number="ping" :total="100" :process-color="pingColor" left-text="ping">
        </my-progress>
      </div>


      <van-collapse :value="activeNames" @change="onChange">
        <van-collapse-item :title="i18n.InterfaceUtilization" name="interface">

          <div class="my-collapse">
            <van-collapse :value="activeNamesInterface" @change="onChangeInterface">
              <van-collapse-item v-for="inter in interfaceList" :key="inter.name" :title="inter.name"
                                 :name="inter.type">
                <div class="desc" v-show="inter.Description">{{inter.Description}}</div>
                <my-progress :number="inter.in" :total="100" process-color="#0CC808" left-text="in" icon="success">
                </my-progress>
                <my-progress :number="inter.out" :total="100" process-color="#E60012" left-text="out" icon="warn">
                </my-progress>
              </van-collapse-item>
            </van-collapse>
          </div>

        </van-collapse-item>


        <van-collapse-item :title="i18n.CpuUtilization" name="cpu">

          <div class="my-collapse">
            <van-collapse :value="activeNamesInterface" @change="onChangeInterface">
              <van-collapse-item v-for="inter in cpuList" :key="inter.name" :title="inter.name" :name="inter.type">
                <div class="desc" v-show="inter.Description">{{inter.Description}}</div>
                <my-progress :number="inter.value" :total="100" process-color="#0CC808">
                </my-progress>
              </van-collapse-item>
            </van-collapse>
          </div>

        </van-collapse-item>
        <van-collapse-item :title="i18n.MemoryUtilization" name="ram">

          <div class="my-collapse">
            <van-collapse :value="activeNamesInterface" @change="onChangeInterface">
              <van-collapse-item v-for="inter in memoryList" :key="inter.name" :title="inter.name" :name="inter.type">
                <div class="desc" v-show="inter.Description">{{inter.Description}}</div>
                <my-progress :number="inter.value" :total="100" process-color="#0CC808">
                </my-progress>
              </van-collapse-item>
            </van-collapse>
          </div>
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
    <van-toast id="van-toast"></van-toast>
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
  import Toast from "@/../static/vant/toast/toast"

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
      customerTag() {
        return this.$store.state.userInfo.CustomerTag
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
        cpuData: [],  // cpu数据
        cpuList: [],  // cpu数据
        interfaceData: [], // interface数据
        interfaceList: [],
        memoryData: [], // interface数据
        memoryList: [],
        oldActice: [], // 存储以前打开过的接口率
        ping: 0,
        pingColor: "red"
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
    onUnload() {
      this.cpuData = []
      this.cpuList = []
      this.interfaceData = []
      this.interfaceList = []
      this.memoryData = []
      this.memoryList = []

      this.activeNames = []
      this.activeNamesInterface = []
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

        // 将半年的时间单位换算成毫秒
        var halfYear = 24 * 3600 * 1000
        const { start, end } = this._getTime(halfYear)
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
        const _this = this
        this.$fly.get(`Api/Nms/Poller/PollerRequest/Ping/Start/${deviceId}`).then(async (res) => {
          _this.ping = 100
          if (res) {
            delete res.Name
            let num = 1
            while (num < 5) {
              const rst = await this._getPing(res)
              if (rst) {
                _this.ping = 100
                _this.pingColor = "#5CB85C"
                if (rst.PingResponseItems.length > 0) {
                  const item = rst.PingResponseItems[rst.PingResponseItems.length - 1]
                  if (item.RttMSec >= 50) {
                    _this.pingColor = "yello"
                  }
                }
                break
              } else {
                num++
              }
            }
          }
        })
      },

      _getPing(param) {
        return this.$fly.post(`Api/Nms/Poller/PollerRequest/PingResponseData/Get`, param)
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
                console.log("System", item)
                const sysChildItems = item.ChildItems

                for (let j = 0; j < sysChildItems.length; j++) {
                  const sys = sysChildItems[j]
                  if (sys.Label.toLocaleLowerCase().trim() === "cpu") {
                    console.log("CPU ChildItems", sys.ChildItems)
                    this.childItems(sys, "Cpu Usage", this.cpuData)
                  } else if (sys.Label.toLocaleLowerCase().trim() === "memory") {
                    console.log("Memory ChildItems", sys.ChildItems)
                    this.childItems(sys, "Memory Usage", this.memoryData)
                  }
                }

              } else if (item.Label === "Interface") {
                console.log("interface")
                this.childItems(item, "Interface Utilization", this.interfaceData)
              }
            }
            // console.log("this.cpuData", this.cpuData)
            // console.log("this.interfaceData", this.interfaceData)
            // “Interface Utilization”"Cpu Usage”、“Memory Usage”；
            this.cpuList = this.changeData(this.cpuData, "Cpu Usage")
            this.interfaceList = this.changeData(this.interfaceData, "Interface Utilization")
            this.memoryList = this.changeData(this.memoryData, "Memory Usage")
            console.log("this.cpuList", this.cpuList)
            console.log("this.interfaceList", this.interfaceList)
            console.log("this.memoryList", this.memoryList)


          }
        })
      },

      // 获取当前时间
      _getTime(halfYear) {
        const curDate = new Date()
        const endUtli = formatTime(curDate)
        const end = endUtli.t1 + "T" + endUtli.t2
        // 将半年的时间单位换算成毫秒
        const startTime = curDate - halfYear
        var startUtil = formatTime(new Date(startTime))
        const start = startUtil.t1 + "T" + startUtil.t2
        return {
          start, end
        }
      },
      // 改造数据 第二个接口需要数据的
      changeData(data, label) {
        // 改造数据
        const newData = []
        data.forEach(item => {
          item.ChartItems.forEach(chart => {
            if (chart.Label === label) {
              let name = item.Label
              let type = "interface"  // 默认是 interface
              if (chart.Label === "Interface Utilization") {
                const sp = item.Label.split(/\//)
                const index = sp[0].search(/\d+/)
                name = sp[0].slice(0, 3) + "" + sp[0].slice(index) + "/" + sp[1]
                type = "interface"
              } else if (chart.Label === "Memory Usage") {
                type = "memory"
              } else if (chart.Label === "Cpu Usage") {
                type = "cpu"
              }

              const ItemData = newData.map(item => item.ItemId)
              const ChartIdData = newData.map(item => item.ChartId)


              if (ItemData.indexOf(item.ItemId) > -1 && ChartIdData.indexOf(chart.ChartId) > -1) {
                // 已经有重复项目
                return
              }
              newData.push({
                "CustomerTag": this.customerTag,
                "ItemId": item.ItemId,
                "ChartingMethod": 0, // 默认
                "ChartId": chart.ChartId,
                "Start": "",
                "End": "",
                "DataRollupType": 0,// 默认
                name: `${chart.Label.split(" ")[0]}-${name}-Usage-${chart.ChartId}`,
                type: `${type}List-${chart.Label.split(" ")[0]}-${name}-Usage-${chart.ChartId}`
              })
            }
          })
        })


        return newData
      },


      _postData(params) {
        return this.$fly.post(`Api/Nms/Statistics/GetChartDataItem`, params)
      },
      _getItemIdDesc(ItemId) {
        return this.$fly.get(`Api/Nms/SnmpEntities/${ItemId}`)
      },


      /**
       * 递归数据
       * @param child  内容
       * @param label  查找数据字符串
       * @param wrapData 存放容器数据
       */
      childItems(child, label, wrapData) {
        if (child.ChildItems.length <= 0) {
          if (child.ChartItems && child.ChartItems.length) {
            child.ChartItems.forEach(item => {
              console.log("chartItem", item)
              if (item.Label === label) {
                wrapData.push(child)  // 获取数据
              }
            })

          }
          return
        }
        for (let i = 0; i < child.ChildItems.length; i++) {
          const item = child.ChildItems[i]
          this.childItems(item, label, wrapData)
        }
      },


      onChange(event) {
        this.activeNames = event.mp.detail
      },
      async onChangeInterface(event) {
        console.log(event.mp.detail)
        const detail = event.mp.detail

        if (detail.length < this.oldActice.length) {
          this.activeNamesInterface = this.oldActice = detail
          return
        }
        if (detail.length <= 0) {
          this.activeNamesInterface = this.oldActice = event.mp.detail
          return
        }

        try {
          Toast.loading({
            mask: true,
            message: "loading..."
          })

          const item = detail[detail.length - 1]

          const splitData = item.split("-")

          const listName = splitData[0]
          const chartId = splitData[splitData.length - 1]

          console.log(listName, chartId)

          let paramsItem = {}
          this[listName].forEach(item => {
            if (item.ChartId == chartId) {
              paramsItem = item
            }
          })
          var halfYear = 1 * 3600 * 1000
          const { start, end } = this._getTime(halfYear)
          paramsItem.Start = start
          paramsItem.End = end

          const resData = await this._postData(paramsItem)
          const itemDesc = await this._getItemIdDesc(paramsItem.ItemId)

          paramsItem.Description = itemDesc.Description

          this.activeNamesInterface = this.oldActice = event.mp.detail

          if (resData.ChartData) {
            const splitList = resData.ChartData.split(/[\n\s]/).filter(item => !!item)
            console.log(splitList)

            const str = splitList[splitList.length - 1]
            const valueList = str.split(",")
            console.log(valueList)
            if (listName === "interfaceList") {
              paramsItem.in = Number(valueList[valueList.length - 1])
              paramsItem.out = Number(valueList[valueList.length - 2])
            } else if (listName === "cpuList") {
              paramsItem.value = Number(valueList[valueList.length - 2])
            } else if (listName === "memoryList") {
              paramsItem.value = Number(valueList[valueList.length - 2])
            }

            console.log(paramsItem)

          }
        } finally {
          Toast.clear()
        }
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
