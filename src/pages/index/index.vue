<template>
  <div class="home">
    <my-footer :active="0"></my-footer>
  </div>
</template>

<script>
  import myFooter from "@/components/my-footer/index.vue"
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
