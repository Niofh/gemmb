<template>
  <div class="monitor" @click="pageClick">
    <div class="header">{{i18n.deviceList }}</div>
    <div class="table-wrap">
      <my-table-row :rows="rows" :is-show-select.sync="isShowSelect"
                    @onSelectOption="onSelectOption"
                    @onRowClick="onRowClick"
      ></my-table-row>
      <div class="my-table-cell"
           v-for="c in deviceList"
           :key="c.DeviceId"
           :style="{'backgroundColor':Severity[SeverityStatus[c.Severity]].color}">
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">{{SeverityStatus[c.Severity]}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left ">
            <a class="link" :href="'/pages/monitor-detail/main?deviceId='+c.DeviceId">{{c.DeviceName}}</a>
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left ">{{c.IPAddress|| "--"}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[3].width}">
          <div class="left">{{c.LocationName}}</div>
        </div>
      </div>
      <!--      <my-pagination :pages="10"></my-pagination>-->
    </div>
    <div class="station"></div>
    <van-toast id="van-toast"/>
    <my-footer :active="1"/>
    <my-search :show="searchShow" @search="onSearch" @clear="onClear" @close="onClose"></my-search>
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer"
  import myTableRow from "@/components/my-table-row/index.vue"
  import mySearch from "@/components/my-search/index.vue"
  import myTableRowMixin from "@/mixins/myTableRowMixin"
  import { selectOptions, Severity } from "@/utils/constant"
  import { SeverityStatus } from "../../utils/constant"
  import Toast from "@/../static/vant/toast/toast"

  export default {
    mixins: [myTableRowMixin],
    components: {
      "my-footer": myFooter,
      "my-table-row": myTableRow,
      "my-search": mySearch
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
        selectOptions.unshift({ id: "", name: "all" })
        return [
          {
            width: "20%",
            name: i18n.Status,
            isArrow: true,
            selectOptions: selectOptions.slice(0, 6),
            type: "Severity"
          },
          {
            width: "28%",
            name: i18n.Hostname,
            isArrow: true,
            type: "DeviceName"
          },
          {
            width: "28%",
            name: i18n.IP,
            isArrow: true,
            type: "IPAddress"
          },
          {
            width: "24%",
            name: i18n.location,
            isArrow: true,
            type: "LocationName"
          }
        ]
      }
    },
    data() {
      return {
        deviceList: [],
        oldList: [],
        Severity: Severity,
        SeverityStatus: SeverityStatus,
        searchShow: false,
        searchValue: "",
        searchType: "",
        timer: null
      }
    },
    mounted() {
      this.getDeviceList()
    },
    onShow() {
      this.timout()
    },
    onHide() {
      this.timer && clearInterval(this.timer)
    },
    onUnload() {
      this.timer && clearInterval(this.timer)
    },
    methods: {

      // 定时任务
      timout() {
        this.timer = setInterval(() => {
          this.getDeviceList()
        }, 5000)
      },

      // 获取设备列表
      getDeviceList() {
        this.$fly.get(`Api/Nms/Customers/${this.customerTag}/DeviceStatus`).then(res => {
          if (res && res.length) {
            this.deviceList = this.oldList = res.filter(item => {
              if (item.Severity < 7) {
                return item
              }
            })
          }
        })
      },
      onSelectOption(params) {
        console.log(params)
        const selectId = params.select.id
        if (selectId === "") {
          this.deviceList = this.oldList.map(item => item)
        } else {
          this.deviceList = this.oldList.filter(item => {
            if (item[params.item.type] === selectId) {
              return item
            }
          })
        }

        this.isShowSelect = false
      },
      onRowClick(params) {
        this.searchType = params.item.type
        if (this.searchType === "Severity") {
          return
        }
        this.searchShow = true
      },
      onSearch(value) {
        this.searchValue = value
        if (!value) {
          this.deviceList = this.oldList.map(item => item)
        } else {
          this.deviceList = this.oldList.filter(item => {
            if (item[this.searchType] && item[this.searchType].toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1) {
              return item
            }
          })
        }
        if (this.deviceList.length === 0) {
          Toast("暂无数据")
          return
        }
        this.searchShow = false
      },
      onClear() {
        this.searchValue = ""
        this.searchType = ""
      },
      onClose() {
        this.searchShow = false
      }
    }

  }
</script>
<style lang="stylus">
  .popup-class {

  }
</style>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .monitor {
    width 100%
    height 100%
  }

</style>
