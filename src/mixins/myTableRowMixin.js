var myTableRowMixin = {
  data: function() {
    return {
      isShowSelect: true
    }
  },
  onShow() {
    this.isShowSelect = false  // 全部状态都隐藏
  },
  methods: {
    pageClick(e) {
      console.log('mixin')
      // 空白处点击隐藏
      this.isShowSelect = false
    }
  }
}

export default myTableRowMixin
