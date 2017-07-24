<style scoped lang="less">
  @import './assets/css/base.less';

  .App {
    .mu-back-top {
      .back_btn {
        padding: 0;
        margin: 0;
        background-color: @color;
        opacity: .7;
        color: #fff;
      }
    }
  }
</style>
<template>
  <div class="App">
    <headerView v-show="validateRoute"></headerView>
    <router-view class="view"></router-view>
    <mu-back-top class="mu-back-top" :bottom="120" :right="10">
      <mu-icon-button class="back_btn">
        <i class="iconfont icon-shangla1"></i>
      </mu-icon-button>
    </mu-back-top>
  </div>
</template>
<script>
  import headerView from './components/common/header.vue'

  export default {
    data() {
      return {
        transitionName: ''
      }
    },
    computed: {
      validateRoute(){
        if (this.$route.path === '/' || this.$route.path === '/login')return false;
        return true;
      }
    },
    components: {
      headerView
    }
  }
</script>
