<template>
  <div class="monitor" @click="pageClick">
    <div class="table-wrap">
      <my-table-row :rows="rows" :is-show-select.sync="isShowSelect"></my-table-row>
      <div class="my-table-cell"
           v-for="c in deviceList"
           :key="c.DeviceId"
           :style="{'backgroundColor':Severity[SeverityStatus[c.Severity]].color}">
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">{{SeverityStatus[c.Severity]}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left "><a class="link" href="/pages/monitor-detail/main">{{c.DeviceName}}</a></div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left ">{{c.IPAddress|| '--'}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[3].width}">
          <div class="left">{{c.LocationName}}</div>
        </div>
      </div>
      <!--      <my-pagination :pages="10"></my-pagination>-->
    </div>
    <div class="station"></div>
    <my-footer :active="1" />
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer"
  import myTableRow from "@/components/my-table-row/index.vue"
  import myTableRowMixin from "@/mixins/myTableRowMixin"
  import {selectOptions, Severity} from "@/utils/constant";
  import {SeverityStatus} from "../../utils/constant";

  export default {
    mixins: [myTableRowMixin],
    components: {
      "my-footer": myFooter,
      "my-table-row": myTableRow,
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
            width: "20%",
            name: i18n.Status,
            isArrow: true,
            selectOptions: selectOptions.slice(0, 5)
          },
          {
            width: "28%",
            name: i18n.Hostname,
            isArrow: true
          },
          {
            width: "28%",
            name: i18n.IP,
            isArrow: true
          },
          {
            width: "24%",
            name: i18n.location,
            isArrow: true
          }
        ]
      }
    },
    data() {
      return {
        deviceList: [],
        Severity: Severity,
        SeverityStatus: SeverityStatus,
      }
    },
    mounted() {
      this.getDeviceList()
    },
    methods: {
      // 获取设备列表
      getDeviceList() {
        this.$fly.get(`Api/Nms/Customers/${this.customerTag}/DeviceStatus`).then(res => {
          if (res && res.length) {
            this.deviceList = res
          }
        })
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
