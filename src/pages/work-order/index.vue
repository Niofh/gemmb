<template>
  <div class="work-order" @click="pageClick">
    <div class="header">{{i18n.faultTicket}}</div>
    <div class="table-wrap">
      <div class="table-zindex">
        <my-table-row :rows="rows"
                      :is-show-select.sync="isShowSelect"
                      @onSelectOption="onSelectOption"
                      @onRowClick="onRowClick"
        ></my-table-row>
      </div>
      <div class="my-table-cell" v-for="c in bugWorkList" :key="c.TicketID"
           :style="{'backgroundColor':c.PriorityHtmlColor}">
        <div class="my-cell-item" :style="{'width':rows[0].width}">
          <div class="left">
            {{c.Priority}}
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[1].width}">
          <div class="left ">
            <a class="link" :href="'/pages/work-order-detail/main?id='+c.TicketId+''">{{c.TicketId}}</a>
          </div>
        </div>
        <div class="my-cell-item" :style="{'width':rows[2].width}">
          <div class="left">{{BUG_STATUS_CODE[c.IncidentState]}}</div>
        </div>
      </div>
    </div>

    <div class="header">{{i18n.changeTicket}}</div>
    <div class="table-wrap">
      <my-table-row :rows="changeRows"
                    :is-show-select.sync="isShowSelect1"
                    @onSelectOption="onSelectOption1"
                    @onRowClick="onRowClick1">

      </my-table-row>
      <div class="my-table-cell" v-for="c in changeWorkList" :key="c.TicketID"
           :style="{'backgroundColor':c.PriorityHtmlColor}">
        <div class="my-cell-item" :style="{'width':changeRows[0].width}">
          <div class="left">{{c.TicketID}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':changeRows[1].width}">
          <div class="left ">{{CHANGE_TYPE_CODE(c.ChangeType)}}</div>
        </div>
        <div class="my-cell-item" :style="{'width':changeRows[2].width}">
          <div class="left">{{CHANGE_STATUS_CODE(c.ChangeState)}}</div>
        </div>
      </div>
    </div>
    <my-search :show="searchShow" @search="onSearch" @clear="onClear" @close="onClose"></my-search>
    <van-toast id="van-toast"/>
    <my-footer :active="2"></my-footer>
  </div>
</template>

<script>
  import myTable from "@/components/my-table-row"
  import myTableRow from "@/components/my-table-row/index.vue"
  import mySearch from "@/components/my-search/index.vue"
  import myFooter from "@/components/my-footer/index.vue"
  import { BUG_STATUS_CODE, CHANGE_STATUS_CODE, CHANGE_TYPE_CODE, PRIORITY_CODE } from "../../utils/constant"
  import myTableRowMixin from "../../mixins/myTableRowMixin"
  import Toast from "@/../static/vant/toast/toast"


  export default {
    mixins: [myTableRowMixin],
    components: {
      "my-table": myTable,
      "my-table-row": myTableRow,
      "my-footer": myFooter,
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
        PRIORITY_CODE.unshift({ id: "", name: "all" })
        return [
          {
            width: "23%",
            name: i18n.Priority,
            isArrow: true,
            selectOptions: PRIORITY_CODE,
            type: "Priority"
          },
          {
            width: "27%",
            name: i18n.TicketID,
            isArrow: true,
            type: "TicketId"
          },
          {
            width: "50%",
            name: i18n.Status,
            isArrow: false
          }
        ]
      },
      changeRows() {
        const i18n = this.$t("message")
        return [
          {
            width: "23%",
            name: i18n.TicketID,
            isArrow: true,
            type: "TicketId"
          },
          {
            width: "27%",
            name: i18n.Type,
            isArrow: true,
            selectOptions: this.CHANGE_TYPE_CODE_select,
            type: "ChangeType"
          },
          {
            width: "50%",
            name: i18n.Status,
            isArrow: false
          }
        ]
      }
    },

    data() {
      return {
        bugWorkList: [], // 故障工单列表
        bugWorkOldList: [], // 故障工单列表
        changeWorkList: [], // 变更工单列表
        changeWorkOldList: [], // 变更工单列表
        BUG_STATUS_CODE,
        CHANGE_TYPE_CODE,
        CHANGE_STATUS_CODE,
        searchShow: false,
        searchValue: "",
        searchType: "",
        CHANGE_TYPE_CODE_select: [],
        isShowSelect1: false
      }
    },
    mounted() {
      console.log("mounted")

      const dataCode = [{ id: "", name: "all" }]
      for (let key in CHANGE_TYPE_CODE) {
        dataCode.push({
          id: key,
          name: CHANGE_TYPE_CODE[key]
        })
      }
      this.CHANGE_TYPE_CODE_select = dataCode
      this.getBusWork()
    },

    methods: {
      getBusWork() {
        this.$fly.post(`Api/ServiceDesk/Customers/${this.customerTag}/TicketSearch`, {
          "TicketSearchFields": [],
          "TicketTypes": [0, 1, 2, 3],
          "ChangeTypes": [0, 1, 2],
          "TicketStatuses": [0, 1, 2],
          "Priorities": [1, 2, 3, 4]
        }).then((res) => {
          if (res) {

            const ticketSearchResults = res.TicketSearchResults
            this.getResults(ticketSearchResults)
          }
        })

      },
      async getResults(ticketSearchResults) {
        for (let i = 0; i < ticketSearchResults.length; i++) {
          const item = ticketSearchResults[i]
          console.log(item)
          const TicketId = item.TicketId

          // const Device = await this.getDevice(TicketId)

          const dataTicketIncidentDetail = []
          const dataTicketChangeDetail = []
          if (item.TicketIncidentDetail) {
            dataTicketIncidentDetail.push({
              TicketId: item.TicketIncidentDetail.TicketId,
              IncidentState: item.TicketIncidentDetail.IncidentState,
              Priority: `P` + item.Priority,
              PriorityHtmlColor: item.PriorityHtmlColor
            })
          }
          if (item.TicketChangeDetail) {
            dataTicketChangeDetail.push({
              PriorityHtmlColor: item.PriorityHtmlColor,
              TicketId: item.TicketIncidentDetail.TicketId,
              IncidentState: item.TicketIncidentDetail.IncidentState,
              ChangeState: item.TicketIncidentDetail.ChangeState,
              ChangeType: item.TicketIncidentDetail.ChangeType
            })
          }

          this.bugWorkList = this.bugWorkOldList = dataTicketIncidentDetail
          this.changeWorkList = this.changeWorkOldList = dataTicketChangeDetail

        }
        console.log("this.bugWorkList", this.bugWorkList)
        console.log("this.changeWorkList", this.changeWorkList)
      },
      async getDevice(ticketId) {
        return this.$fly.get(`Api/ServiceDesk/Tickets/${ticketId}/Devices/Assignable`)
      },
      onSelectOption(params) {
        console.log(params)
        const selectId = params.select.id
        if (selectId === "") {
          this.bugWorkList = this.bugWorkOldList.map(item => item)
        } else {
          this.bugWorkList = this.bugWorkOldList.filter(item => {
            if (item[params.item.type] === "P" + selectId) {
              return item
            }
          })
        }

        this.isShowSelect = false
      },
      onRowClick(params) {
        this.searchType = params.item.type
        if (this.searchType === "Priority" || !this.searchType) {
          return
        }
        this.sType = 1
        this.searchShow = true
      },

      onSelectOption1(params) {
        console.log(params)
        const selectId = params.select.id
        if (selectId === "") {
          this.changeWorkList = this.changeWorkOldList.map(item => item)
        } else {
          this.changeWorkList = this.changeWorkOldList.filter(item => {
            if (item[params.item.type] === selectId) {
              return item
            }
          })
        }

        this.isShowSelect1 = false
      },
      onRowClick1(params) {
        this.searchType = params.item.type
        if (this.searchType === "ChangeType" || !this.searchType) {
          return
        }
        this.sType = 2
        this.isShowSelect1 = true
      },
      onSearch(value) {
        if (this.sType === 1) {
          this.searchValue = value
          if (!value) {
            this.bugWorkList = this.bugWorkOldList.map(item => item)
          } else {
            this.bugWorkList = this.bugWorkOldList.filter(item => {
              if (item[this.searchType] + "" && item[this.searchType].toString().toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1) {
                return item
              }
            })
          }
          if (this.bugWorkList.length === 0) {
            Toast("暂无数据")
            return
          }
          this.searchShow = false
        } else {
          this.onSearch1(value)
        }

      },
      onSearch1(value) {


        this.searchValue = value
        if (!value) {
          this.changeWorkList = this.changeWorkOldList.map(item => item)
        } else {
          this.changeWorkList = this.changeWorkOldList.filter(item => {
            if (item[this.searchType] + "" && item[this.searchType].toString().toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1) {
              return item
            }
          })
        }
        if (this.changeWorkList.length === 0) {
          Toast("暂无数据")
          return
        }
        this.isShowSelect1 = false
      },
      onClear() {
        this.searchValue = ""
        this.searchType = ""
      },
      onClose() {
        this.searchShow = false
      },
      pageClick() {
        this.isShowSelect1 = false
        this.isShowSelect = false
      }
    }

  }
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"
  .work-order {
    height 100%
  }

  .table-zindex {
    position relative
    z-index 10
  }
</style>
