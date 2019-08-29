<template>
  <div class="my-search">
    <van-popup :show="show" position="top" custom-class="popup-class" @close="onClose">
      <van-search
        :value="value"
        :use-action-slot="true"
        placeholder="请输入搜索关键词"
        @change="onChange"
        @search="onSearch" @clear="onClear">
        <view slot="action" @click="onSearch">搜索</view>
      </van-search>
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

    },
    data() {
      return {
        value: ''
      }
    },
    methods: {
      onClose() {
        this.$emit('close')
      },
      onChange(e) {
        this.value = e.mp.detail
        this.$emit('change',e.mp.detail)
      },
      onSearch(e) {
        console.log(this.value)
        this.$emit('search', this.value)
      },
      onClear() {
        this.$emit('clear')

      }
    }
  }
</script>

<style scoped>

</style>
