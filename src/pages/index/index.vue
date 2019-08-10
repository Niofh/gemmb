<template>
  <div class="home">

    <div class="header">{{i18n.devicesSummary}}</div>
    <div class="progress-list">
      <my-progress :bg-color="bgColor" :critical="10" :total="60" right-text="1/60">
        Critical
      </my-progress>
      <my-progress :bg-color="bgColor" right-text="1/10" :warning="1" :total="10">
        Warning
      </my-progress>
      <my-progress :bg-color="bgColor" right-text="1/10" :minor="1" :total="10">
        Minor
      </my-progress>
      <my-progress :bg-color="bgColor" right-text="1/10" :major="1" :total="10">
        Major
      </my-progress>
      <my-progress :bg-color="bgColor" :critical="2"
                   :warning="2"
                   :minor="2"
                   :major="2"
                   right-text="1/10"
                   :total="10">
        Normal
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
      }
    },
    data() {
      return {
        bgColor: "#0CC808"
      }
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
      }
    }

  }
</script>


<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"


</style>
