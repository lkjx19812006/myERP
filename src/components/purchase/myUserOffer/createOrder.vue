<style lang="less" scoped>
  @import '../../../assets/css/base.less';

  .createOrder {
    font-size: 16px;
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding-top: 56px;
    box-sizing: border-box;
    background-color: pink;
    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .demo-paper {
      height: 100%;
      width: 100%;
      padding: 5px;
      overflow-x: hidden;
      overflow-y: scroll;
    }
  }
  .inputClass {
    text-align: center;
  }


</style>
<template>
  <div class="createOrder">
    <div class="title">
      <slot name="header"></slot>
    </div>
    <mu-paper class="demo-paper" :zDepth="2">
      <slot name="formData"></slot>
    </mu-paper>
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
  }
</script>
