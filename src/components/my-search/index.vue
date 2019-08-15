<template>
  <div class="my-search">
    <van-popup :show="show" position="top" custom-class="popup-class" @close="onClose">
      <van-search :value="value" placeholder="请输入搜索关键词" @search="onSearch" @clear="onClear" />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: "my-search",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      value: String
    },
    methods: {
      onClose() {
        this.$emit('close')
      },
      onSearch() {
        this.$emit('search',this.value)
      },
      onClear() {
        this.$emit('onClear')
      }
    }
  }
</script>

<style scoped>

</style>
