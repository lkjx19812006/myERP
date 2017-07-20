<style scoped lang="less">
  .App {

  }
</style>
<template>
  <div class="App">
    <headerView v-show="validateRoute"></headerView>
    <router-view class="view"></router-view>
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
