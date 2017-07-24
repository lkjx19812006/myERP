<style scoped lang="less">
  .myUserOffer {
    .demo-raised-button {
      margin-right: 10px;
      padding: 0 5px;
    }

  }

</style>
<template>
  <div class="myUserOffer">
    <!--搜索头-->
    <search ref="search"/>
    <!--项目-->
    <listItem :key="itemData.id" :itemData="itemData" v-for="itemData in listData">
      <!--通过slot 分发 并将遍历到的值传递给详情组件显示-->
      <mu-raised-button class="demo-raised-button" @click="showInfo(itemData)">
        <i class="iconfont icon-jsearch fz16 mr5"></i>
        <span>查看详情</span>
      </mu-raised-button>
      <mu-raised-button class="demo-raised-button" @click="showOrderInfo(itemData)" primary>
        <span>生成订单</span>
      </mu-raised-button>
    </listItem>
    <!--分页-->
    <pagination :total="total" :pageSize="[15, 20, 30]" @pageSizeChange="pageSizeChange" @pageChange="pageChange"/>
    <!--详情页组件-->
    <transition name="fade">
      <offerInfo v-show="showOffer" :detail="detail">
        <mu-appbar slot="header" class="mu-appbar" title="报价详情">
          <mu-icon-button slot="left" @click="showOffer = false">
            <i class="iconfont icon-close fz18"></i>
          </mu-icon-button>
        </mu-appbar>
        <!--这里连接到生成订单模块-->
        <mu-raised-button style="width: 100%; margin-top: 20px;" slot="action" label="生成订单"
                          class="demo-raised-button" @click="showOrder = true" primary/>
      </offerInfo>
    </transition>
    <!--订单组件-->
    <transition name="fade">
      <createOrder v-show="showOrder">
        <mu-appbar slot="header" class="mu-appbar" title="生成订单">
          <mu-icon-button slot="left" @click="showOrder = false">
            <i class="iconfont icon-close fz18"></i>
          </mu-icon-button>
        </mu-appbar>
      </createOrder>
    </transition>
  </div>
</template>
<script>
  import search from '../../components/purchase/search.vue'
  import listItem from '../../components/purchase/listItem.vue'
  import pagination from '../../components/common/pagination.vue'
  import offerInfo from '../../components/purchase/myUserOffer/offerInfo.vue'
  import createOrder from  '../../components/purchase/myUserOffer/createOrder.vue'
  import common from '../../common/httpService'
  export default{
    props: {},
    data(){
      return {
        listData: [],
        showOffer: false,
        detail: {},
        showOrder: false,
        orderInfo: {},
        total: 0,
        timer: "",//定义动画时间
      }
    },
    watch: {
      //监听变化 改变window的内容高度 并动态设置即可 实现滚动企换
      showOffer(newVal){
        if (!newVal) {
          this.bodyAuto();
        } else {
          this.clearTime();
        }
      },
      showOrder(newVal){
        if (!newVal && this.showOffer === false) {
          this.bodyAuto();
        } else {
          this.clearTime();
        }
      }
    },
    computed: {
      scrollTop(){
        return this.$store.state.common.scrollTop;
      }
    },
    components: {
      search,
      listItem,
      pagination,
      offerInfo,
      createOrder
    },
    created(){
      this.getHttp();
    },
    methods: {
      //切换body高度为100vh 防止滚动
      clearTime(){
        clearTimeout(this.timer);
        this.timer = setTimeout(function () {
          document.body.style.height = '100vh';
        }, 300);
      },
      //切换body高度为自适应 让其滚动到记录位置
      bodyAuto(){
        document.body.style.height = 'auto';
        document.body.scrollTop = this.scrollTop;
        document.documentElement.scrollTop = this.scrollTop;
      },
      showInfo(itemData){
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        this.$store.dispatch('setScrollTop', scrolltop);
        this.detail = itemData;
        this.showOffer = true;
      },
      showOrderInfo(itemData){
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        this.$store.dispatch('setScrollTop', scrolltop);
        this.orderInfo = itemData;
        this.showOrder = true;
      },
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
