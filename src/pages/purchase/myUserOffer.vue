<style scoped lang="less">
  .myUserOffer {

  }
</style>
<template>
  <div class="myUserOffer">
    <!--搜索头-->
    <search/>
    <!--项目-->
    <listItem :key="itemData.id" :itemData="itemData" v-for="itemData in listData"/>
    <!--分页-->
    <pagination :total="total" :pageSize="[15, 20, 30]" @pageSizeChange="pageSizeChange" @pageChange="pageChange"/>
  </div>
</template>
<script>
  import search from '../../components/purchase/search.vue'
  import listItem from '../../components/purchase/listItem.vue'
  import pagination from '../../components/common/pagination.vue'
  import common from '../../common/httpService'
  export default{
    props: {},
    data(){
      return {
        listData: [],
        total: 0
      }
    },
    components: {
      search,
      listItem,
      pagination
    },
    created(){
      this.getHttp();
    },
    methods: {
      getHttp(page, pageSize){
        let loading = this.$loading({
          visible: true,
          opacity: 1
        });
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'erpIntentionOfferService',
          biz_method: 'queryMySendOffer',
          biz_param: {
            page: page || 1,
            pageSize: pageSize || 15
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
          //成功的msg
//          this.$message({
//            type: 'success',
//            message: suc.msg
//          })
        }, (err) => {
          loading.visible = false;
          //失败的msg
//          this.$message({
//            type: 'error',
//            message: err.msg
//          })
        })
      },
      pageChange(page){
        this.getHttp(page);
      },
      pageSizeChange(pageSize){
        this.getHttp(1, pageSize);
//        alert(pageSize);
      }
    },
  }
</script>
