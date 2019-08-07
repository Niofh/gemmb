<template>
  <div class="work-order">
    工单页
    <my-footer :active="2" />
  </div>
</template>

<script>
  import myFooter from "../../components/my-footer"
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
