<style lang="less" scoped>
  .refresh {
    position: fixed;
    bottom: 170px;
    right: 10px;
    opacity: .7;
    .demo-float-button {
      height: 48px;
      width: 48px;
    }
  }
</style>
<template>
  <!--刷新按钮-->
  <div class="refresh">
    <mu-float-button @click="refresh" mini class="demo-float-button">
      <i class="iconfont icon-shuaxin"></i>
    </mu-float-button>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    methods: {
      refresh(){
        this.$emit('click')
      }
    }
  }
</script>
