<style lang="less" scoped>
  .myUserOffer {

  }
</style>
<template>
  <div class="myUserOffer">
    <search :more='true' v-on:reset="resetHttp" v-on:search="searchHttp"/>
  </div>
</template>
<script>
  import search from '../../components/common/search.vue'
  export default {
    data(){
      return {}
    },
    components: {
      search
    },
    methods: {
      //重置
      resetHttp(){
        this.active = '';
        this.httpParams = {
          page: 1,
          pageSize: 15,
          startTime: '',
          endTime: '',
          fullname: '',
          userPhone: '',
        }
        this.getHttp();
      },
      //搜索
      searchHttp(){
        this.getHttp();
      }
    }
  }
</script>
