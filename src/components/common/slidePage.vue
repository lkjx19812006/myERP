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
  //动画开始完成后固定body 高度
  //离开动画开始前 释放 body 高度
  //点击的时候记录在vuex中 暂时先放这里 有滚动问题再处理
  export default {
    props: {},
    computed: {
      scrollTop(){
        return this.$store.state.common.scrollTop;
      },
    },
    data(){
      return {}
    },
    methods: {
      //切换body高度为100vh 防止滚动
      clearTime(){
        clearTimeout(this.timer);
        //获取屏幕的高度
        this.timer = setTimeout(function () {
          document.body.style.height = '100vh';
        }, 600);
      },
      //切换body高度为自适应 让其滚动到记录位置
      bodyAuto(){
        document.body.style.height = 'auto';
        document.body.scrollTop = this.scrollTop;
        document.documentElement.scrollTop = this.scrollTop;
      },
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../static/css/base.less';

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
    transition: all .7s;
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
