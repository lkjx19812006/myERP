<style scoped lang="less">
  @import '../../assets/css/base.less';

  .myUserOffer {
    .demo-raised-button {
      margin-right: 10px;
      padding: 0 5px;
    }
    .searchItem {
      width: 100%;
      padding: 5px;
      font-size: 16px;
    }
    .refresh {
      position: fixed;
      bottom: 170px;
      right: 10px;
      opacity: .7;
      .demo-float-button {
        height: 48px;
        width: 48px;
      }
    }
  }

  .slide-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
  }
</style>
<template>
  <div class="myUserOffer">
    <!--搜索头-->
    <search :more='true' v-on:reset="resetHttp" v-on:search="searchHttp">
      <mu-raised-button slot="topAction" label="今日报价" :primary="active === 'today' " class="demo-flat-button"
                        @click="searchTime('today')"/>
      <mu-raised-button slot="topAction" label="本周报价" :primary="active === 'tswk' " class="demo-flat-button"
                        @click="searchTime('tswk')"/>
      <!--用户信息-->
      <div class="searchItem" slot="contAction">
        <span>用户信息：</span>
        <mu-text-field v-model="httpParams.fullname" hintText="请输入会员名"/>
        <mu-text-field v-model="httpParams.userPhone" hintText="请输入会员手机"/>
      </div>
      <!--报价时间-->
      <div class="searchItem" slot="contAction">
        <span>报价时间：</span>
        <mu-date-picker @change="timeChange" v-model="httpParams.startTime" container="dialog" hintText="请选择开始时间"/>
        <mu-date-picker v-model="httpParams.endTime" :minDate="httpParams.startTime" container="dialog"
                        hintText="请选择结束时间"/>
      </div>
    </search>
    <!--栏目列-->
    <listItem :key="itemData.id" :itemData="itemData" v-for="itemData in listData">
      <!--通过未具名slot 分发 并将遍历到的值传递给详情组件显示-->
      <mu-raised-button class="demo-raised-button" @click="showInfo(itemData)">
        <i class="iconfont icon-jsearch fz16 mr5"></i>
        <span>查看详情</span>
      </mu-raised-button>
      <mu-raised-button class="demo-raised-button" @click="showOrderInfo(itemData)" primary>
        <span>生成订单</span>
      </mu-raised-button>
    </listItem>
    <!--分页-->
    <pagination :total="total"
                :page="httpParams.page"
                :pageSize="[15, 20, 30]"
                @pageSizeChange="pageSizeChange"
                @pageChange="pageChange"/>
    <!--详情页组件-->
    <offerInfo v-show="showOffer" :detail="detail">
      <mu-appbar slot="header" class="mu-appbar" title="报价详情">
        <mu-icon-button slot="left" @click="showOffer = false">
          <i class="iconfont icon-close fz18"></i>
        </mu-icon-button>
      </mu-appbar>
      <!--这里连接到生成订单模块-->
      <mu-raised-button style="margin-top: 20px;" slot="action" label="生成订单"
                        class="demo-raised-button" @click="showOrder = true" primary fullWidth/>
    </offerInfo>
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
    <!--刷新按钮-->
    <div class="refresh">
      <mu-float-button @click="refresh" mini class="demo-float-button">
        <i class="iconfont icon-shuaxin"></i>
      </mu-float-button>
    </div>
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
        timer: "",//定义动画时间,
        active: '',
        httpParams: {
          page: 1,
          pageSize: 15,
          startTime: '',
          endTime: '',
          fullname: '',
          userPhone: '',
        }
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
      //显示详情页组件
      showInfo(itemData){
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        this.$store.dispatch('setScrollTop', scrolltop);
        this.detail = itemData;
        this.showOffer = true;
      },
      //显示订单页组件
      showOrderInfo(itemData){
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        this.$store.dispatch('setScrollTop', scrolltop);
        this.orderInfo = itemData;
        this.showOrder = true;
      },
      getHttp(){
        let loading = this.$loading({
          visible: true,
          opacity: 1
        });
        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'erpIntentionOfferService',
          biz_method: 'queryMySendOffer',
          biz_param: this.httpParams
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
        })
      },
      //改变页码
      pageChange(page){
        this.httpParams.page = page;
        this.getHttp();
      },
      //改变分页大小
      pageSizeChange(pageSize){
        this.httpParams.pageSize = pageSize;
        this.httpParams.page = 1;
        this.getHttp;
      },
      //刷新
      refresh(){
        this.getHttp();
      },
      //搜索部分 时间搜索 今日本周切换
      searchTime(param){
        this.active = param;
        switch (param) {
          case 'today':
            let start = new Date();
            let end = new Date(start.getTime() + 86400000);
            //只获取年月日
            this.httpParams.startTime = this.constructor.filter('formatBirth')(start);
            this.httpParams.endTime = this.constructor.filter('formatBirth')(end);
            console.log(this.httpParams);
            break;
          case 'tswk':
            let nowTime = new Date();
            let nowWeek = nowTime.getDay();
            var start = '';
            var end = '';
            //获取今天是周几 0周天 6是周6
            switch (nowWeek) {
              case 0:
                end = new Date()
                start = new Date(end.getTime() - 86400000 * 6);
                break;
              default:
                let time = new Date();
                start = new Date(time.getTime() - 86400000 * (nowWeek - 1))
                end = new Date(start.getTime() + 86400000 * (9 - nowWeek));
                break;
            }
            this.httpParams.startTime = this.constructor.filter('formatBirth')(start);
            this.httpParams.endTime = this.constructor.filter('formatBirth')(end);
            console.log(this.httpParams);
            break;
        }
        ;
        this.getHttp();
      },
      //手动确定时间
      timeChange(val){
        //取消按钮选中状态
        this.active = '';
      },
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
    },
  }
</script>
