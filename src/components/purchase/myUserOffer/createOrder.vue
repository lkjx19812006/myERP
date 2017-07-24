<style lang="less" scoped>
  .createOrder {
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
      position: fixed;
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
      .detail {
        height: 2000px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s, left .4s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    left: 320px;
  }
</style>
<template>
  <div class="createOrder">
    <div class="title">
      <slot name="header"></slot>
    </div>
    <mu-paper class="demo-paper" :zDepth="2">
      <div class="detail">
        <span class="tit">报价时间：</span>
        <!--<span class="inof">{{detail}}</span>-->
      </div>
    </mu-paper>
  </div>
</template>
<script>
  export default {
    props: {
      formData: {
        type: Object,
        default: null
      }
    },
    data(){
      return {}
    },
  }
</script>
