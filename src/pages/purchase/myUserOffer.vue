<style scoped lang="less">
  .myUserOffer {

  }
</style>
<template>
  <div class="myUserOffer">
    <!--项目-->
    <listItem :key="itemData.id" :itemData="itemData" v-for="itemData in listData"/>
    <!--分页-->
    <pagination :total="total" @pageChange="pageChange"/>
  </div>
</template>
<script>
  import listItem from '../../components/purchase/listItem.vue';
  import common from '../../common/httpService'
  import pagination from '../../components/common/pagination.vue'
  export default{
    props: {},
    data(){
      return {
        listData: [],
        total: 0
      }
    },
    components: {
      listItem,
      pagination
    },
    created(){
      this.getHttp();
    },
    methods: {
      getHttp(page){
        let loading = this.$loading(true);
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'erpIntentionOfferService',
          biz_method: 'queryMySendOffer',
          biz_param: {
            page: page,
            pageSize: 15
          }
        };
        url = common.addSID(url);
        console.log(url);
        body.version = common.version;
        let localTime = new Date().getTime();
        body.time = localTime + common.difTime;
        body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
        common.commonPost(url, body).then((suc) => {
          loading.visible = false;
          this.listData = suc.biz_result.list;
          this.total = suc.biz_result.total;
        }, (err) => {
          loading.visible = false;
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      },
      pageChange(page){
        this.getHttp(page);
      }
    },
  }
</script>
