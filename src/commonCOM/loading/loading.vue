<style lang="less" scoped>
  .loading {
    position: fixed;
    z-index: 20170721;
    top: 56px;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
  }

  @media screen and (min-width: 480px) {
    .loading {
      top: 64px;
    }
  }
</style>
<template>
  <transition>
    <div :style="{'background-color': 'rgba(255, 255, 255,'+ opacity + ')'}" class="loading" v-show="visible">
      <mu-circular-progress :size="60" :strokeWidth="3"/>
    </div>
  </transition>
</template>
<script>
  export default {
    data(){
      return {
        visible: false,
        opacity: 1
      }
    },
    watch: {
      visible(newVisible){
        //监听变化 当传入值为false时 删除自己 通过父元素
        if (!newVisible) {
          this.$el.parentNode.removeChild(this.$el)
        }
      }
    }
  }
</script>
