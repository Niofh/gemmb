<template>
  <div class="monitor">
    监控页
    <my-footer :active="1" />
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer"
  export default {
    components:{
      'my-footer':myFooter
    },
    data() {
      return {};
    }

  };
</script>

<style lang="stylus" scoped>
  @import "~@/assets/stylus/common.styl"

</style>
