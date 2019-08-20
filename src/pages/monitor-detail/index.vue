<template>
  <div class="monitor-detail" @click="pageClick">
    <div class="header">{{i18n.equipmentDetails}}</div>

    <div class="address">
      <div class="address-bg">
        <div class="address-wrap">
          <div class="address-header">CS-CE</div>
          <div class="address-body">
            <div class="left">CISCO2911/K9</div>
            <div class="right">192.168.1.1</div>
          </div>
          <div class="address-footer">
            <span class="left">上海</span>
            <span class="right">上海市青浦区嘉松中路5555号奥特莱斯品牌直销广场B189耐克换季优惠店</span>
          </div>
        </div>
      </div>
    </div>


    <div class="order-id">{{i18n.AssociatedTicketID}} : <a class="link" href="">12131215</a></div>
    <div class="header">{{i18n.performanceManagement}}</div>
    <div class="progress-list" style="padding-left: 0;padding-right: 0">

      <div class="pad-l-r-30">
        <my-progress :number="10" :total="30" process-color="#E60012" left-text="ping" icon="cancel">
        </my-progress>
      </div>


      <van-collapse :value="activeNames" @change="onChange">
        <van-collapse-item :title="i18n.InterfaceUtilization" name="interface">

          <div class="my-collapse">
            <van-collapse :value="activeNamesInterface" @change="onChangeInterface">
              <van-collapse-item title="Gi0/0  MPLS接口利用率" name="interface-1">
                <my-progress :number="10" :total="30" process-color="#0CC808" left-text="入站" icon="success">
                </my-progress>
                <my-progress :number="10" :total="30" process-color="#E60012" left-text="出站" icon="warn">
                </my-progress>
              </van-collapse-item>
            </van-collapse>
          </div>


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
      <my-desc-item date="2019-11-11 11:11:11">
        Aruba Ac620设备状态从up变为down，ping包丢失100%，宕机时间180s。
      </my-desc-item>

      <my-desc-item border-color="#0CE501" date="2019-11-11 11:11:11">
        Aruba 11110设备状态从up变为down，ping包丢失100%，宕机时间180s。
      </my-desc-item>

    </div>

    <div class="header">{{i18n.ticketHistory}}</div>


    <div class="table-wrap">
      <my-table-row :rows="rows" :is-show-select.sync="isShowSelect"></my-table-row>
      <div class="my-table-cell" v-for="c in cells" :key="c.id" :class="c.color">
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">{{c.ip}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left ">哈哈</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left ">P1</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[3].width}">
          <div class="left">{{c.status}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[4].width}">
          <div class="left">
            <div class="date">2019.7.13</div>
            <div class="time">16:45:00</div>
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
            name: i18n.IP,
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
            color: "history",
            ip: "192.168.1.1",
            place: "上海",
            type: "故障",
            you: "p1",
            status: "open",
            date: "10000000000"
          }

        ],
        activeNames: [],
        activeNamesInterface: [],
      }
    },
    methods: {
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
    background url("https://wechat.logicalisservice.com/images/red.png") center center no-repeat
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


</style>
