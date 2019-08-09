<template>
  <div class="work-order">
    <div class="header">{{i18n.faultTicket}}</div>
    <div class="table-wrap">
      <my-table-row :rows="rows"></my-table-row>
      <div class="my-table-cell" v-for="c in cells" :key="c.id" :class="c.color">
        <div class="my-cell-item" :style="{'width':rows[0].width}"><div class="left">{{c.ip}}</div></div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left ">
          {{c.ip}}
        </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}"><div class="left ">P1</div></div>
        <div class="my-cell-item" :style="{'width':rows[3].width}"><div class="left">{{c.status}}</div></div>
      </div>
    </div>


    <div class="header">{{i18n.ticketJounals}}</div>
    <div class="mar-l-r-30 ">

      <my-toggle :left="i18n.ticketJounals">

        <tempalte>
          <my-desc-item date="2019-11-11 11:11:11">
            Aruba Ac620设备状态从up变为down，ping包丢失100%，宕机时间180s。
          </my-desc-item>

          <my-desc-item border-color="#0CE501" date="2019-11-11 11:11:11">
            Aruba 11110设备状态从up变为down，ping包丢失100%，宕机时间180s。
          </my-desc-item>

        </tempalte>
      </my-toggle>
    </div>

    <div class="header">{{i18n.deviceAlarm}}</div>
    <div class="mar-l-r-30">
      <my-toggle :left="i18n.deviceAlarm">
        <tempalte>
          <my-desc-item date="2019-11-11 11:11:11">
            Aruba Ac620设备状态从up变为down，ping包丢失100%，宕机时间180s。
          </my-desc-item>

          <my-desc-item border-color="#0CE501" date="2019-11-11 11:11:11">
            Aruba 11110设备状态从up变为down，ping包丢失100%，宕机时间180s。
          </my-desc-item>

          <my-desc-item border-color="#0CE501" date="2019-11-11 11:11:11">
            Aruba 11110设备状态从up变为down，ping包丢失100%，宕机时间180s。
          </my-desc-item>

        </tempalte>

      </my-toggle>
    </div>

    <div class="station-min"></div>
  </div>
</template>

<script>
  import myToggle from '@/components/my-toggle'
  import myTable from '@/components/my-table-row'
  import myTableRow from '@/components/my-table-row/index.vue'
  import myDescItem from "@/components/my-desc-item/index.vue";

  export default {
    components:{
      "my-desc-item": myDescItem,
      "my-table": myTable,
      'my-table-row': myTableRow,
      'my-toggle': myToggle,
    },
    computed: {
      i18n() {
        return this.$t("message")
      }
    },
    data() {
      return {
        rows: [
          {
            width: "27%",
            name: "优先级",
            isArrow: true,
          },
          {
            width: "27%",
            name: "工单ID",
            isArrow: true
          },
          {
            width: "25%",
            name: "关联设备",
            isArrow: true
          },
          {
            width: "21%",
            name: "状态",
            isArrow: true
          }
        ],
        cells:[
          {
            id:1,
            color:"history",
            ip:'192.168.1.1',
            place:'上海',
            type:'故障',
            you:"p1",
            status:"open",
            date:"10000000000",
          },
          {
            id:2,
            color:"critical",
            ip:'192.168.1.1',
            place:'上海',
            type:'故障',
            you:"p1",
            status:"open",
            date:"10000000000",
          },

        ],

      };
    }

  };
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"

</style>
