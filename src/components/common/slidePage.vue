<!--该组件只提供一个 左右滑动的效果壳 具体里面的内容通过slot 分发完成-->
<template>
  <transition name="fade" mode="in-out">
    <div class="slidePage">
      <div class="title">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot name="content"></slot>
        <slot name="formData"></slot>
        <slot name="action"></slot>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {},
    data(){
      return {}
    }
  }
</script>
<style lang="less" scoped>
  @import '../../assets/css/base.less';

  .slidePage {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding-top: 56px;
    box-sizing: border-box;

    .title {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
    .content {
      height: 100%;
      width: 100%;
      background-color: #fff;
      overflow-x: hidden;
      overflow-y: auto;
    }
  }

  .color {
    color: @color;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all .6s cubic-bezier(0.075, 0.82, 0.165, 1);
  }

  .fade-enter, .fade-leave-to {
    transform: translate3d(480px, 0, 0);;
  }

  @media screen and(min-width: 480px) {
    .slidePage {
      padding-top: 64px;
    }
  }
</style>
