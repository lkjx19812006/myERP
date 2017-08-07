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
    .formData {
      .title {
        padding: 5px;
      }
      .detail {
        padding: 0 13px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .tit {
          flex: 0 0 auto;
          width: 80px;
          line-height: 40px;
        }
        .inputClass {
          flex: 1;
        }
      }
    }
  }


</style>
<template>
  <div class="myUserOffer">
    <!--搜索头-->
    <search :more='true' v-on:reset="resetHttp" v-on:search="searchHttp">
      <mu-raised-button slot="topAction" :label="$t('message.today_offer')" :primary="active === 'today' "
                        class="demo-flat-button"
                        @click="searchTime('today')"/>
      <mu-raised-button slot="topAction" :label="$t('message.week_offer')" :primary="active === 'tswk' "
                        class="demo-flat-button"
                        @click="searchTime('tswk')"/>
      <mu-raised-button slot="topAction" :label="$t('message.breed_name')"
                        class="demo-flat-button"
                        @click="isShowBreed = !isShowBreed"/>
      <mu-raised-button slot="topAction" :label="$t('message.salesman')"
                        class="demo-flat-button"
                        @click="$router.push(`${$route.path}?page=salesman`)"/>
      <mu-raised-button slot="topAction" :label="$t('message.address')"
                        class="demo-flat-button"
                        @click="$router.push(`${$route.path}?page=address`)"/>
      <!--用户信息-->
      <div class="searchItem" slot="contAction">
        <span>{{$t('message.customer_info')}}：</span>
        <mu-text-field v-model="httpParams.fullname" :hintText="$t('message.customerName')"/>
        <mu-text-field v-model="httpParams.userPhone" :hintText="$t('message.customerPhone')"/>
      </div>
      <!--报价时间-->
      <div class="searchItem" slot="contAction">
        <span>{{$t('message.quatiton_time')}}：</span>
        <!--日期时间国际化-->
        <mu-date-picker :dateTimeFormat="language==='zh_CN'?zhCNDateFormat:enDateFormat"
                        @change="timeChange"
                        v-model="httpParams.startTime"
                        container="dialog"
                        :okLabel="$t('message.confirm')"
                        :cancelLabel="$t('message.cancel')"
                        :hintText="$t('message.start_time')"/>
        <mu-date-picker :disabled="httpParams.startTime === ''"
                        :dateTimeFormat="language==='zh_CN'?zhCNDateFormat:enDateFormat"
                        v-model="httpParams.endTime"
                        :minDate="httpParams.startTime"
                        container="dialog"
                        :okLabel="$t('message.confirm')"
                        :cancelLabel="$t('message.cancel')"
                        :hintText="$t('message.end_time')"/>
      </div>
    </search>
    <!--获取breedId组件-->
    <breedId v-show="isShowBreed" v-on:getBreedId="getBreedId">
      <mu-icon-button slot="close" @click="isShowBreed = !isShowBreed">
        <i class="iconfont icon-close fz18"></i>
      </mu-icon-button>
    </breedId>
    <!--获取业务员信息组件-->
    <countermanId v-show="pathHash.page === 'salesman'" @selected="counterSelect"/>
    <!--选择地区组件-->
    <myAddress v-show="pathHash.page === 'address'" @close="isShowAddress = false"/>
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
    <pagination :total="pages"
                :page="httpParams.page"
                :pageSize="[15, 20, 30]"
                @pageSizeChange="pageSizeChange"
                @pageChange="pageChange"/>
    <!--详情页组件-->
    <slidePage v-show="pathHash.page === 'listInfo' ">
      <mu-appbar slot="header" class="mu-appbar" title="报价详情">
        <mu-icon-button slot="left" @click="$router.back()">
          <i class="iconfont icon-close fz18"></i>
        </mu-icon-button>
      </mu-appbar>
      <offerInfo slot="content" :detail="detail">
        <mu-raised-button
          slot="action"
          style="margin: 10px 0;"
          label="生成订单"
          class="demo-raised-button"
          @click="showOrderInfo()"
          primary fullWidth/>
      </offerInfo>
    </slidePage>
    <!--订单组件-->
    <slidePage v-show="pathHash.page === 'offer'">
      <mu-appbar slot="header" class="mu-appbar" title="生成订单">
        <mu-icon-button slot="left" @click="$router.back()">
          <i class="iconfont icon-close fz18"></i>
        </mu-icon-button>
      </mu-appbar>
      <div class="formData" slot="formData">
        <div class="title">
          <myTitle title="商品信息"/>
        </div>
        <div class="detail">
          <span class="tit">商品标题</span>
          <mu-text-field class="inputClass" v-model="orderInfo.breedName"/>
        </div>
        <div class="detail">
          <span class="tit">品种名称</span>
          <mu-text-field class="inputClass" v-model="orderInfo.breedName"/>
        </div>
        <div class="detail">
          <span class="tit">数量</span>
          <mu-text-field class="inputClass" v-model="orderInfo.number"/>
        </div>
        <div class="detail">
          <span class="tit">单位</span>
          <mu-text-field class="inputClass" v-model="orderInfo.number"/>
        </div>
        <div class="detail">
          <span class="tit">成本价</span>
          <mu-text-field class="inputClass" v-model="orderInfo.number"/>
        </div>
        <div class="detail">
          <span class="tit">质量</span>
          <mu-text-field multiLine :rowsMax="3" class="inputClass" v-model="orderInfo.quality"/>
        </div>
        <div class="detail">
          <span class="tit">产地</span>
          <mu-text-field class="inputClass" v-model="orderInfo.number"/>
        </div>
        <div class="detail">
          <span class="tit">规格</span>
          <mu-text-field class="inputClass" v-model="orderInfo.spec"/>
        </div>
      </div>
    </slidePage>
    <!--刷新按钮-->
    <div class="refresh">
      <mu-float-button @click="refresh" mini class="demo-float-button">
        <i class="iconfont icon-shuaxin"></i>
      </mu-float-button>
    </div>
  </div>
</template>
<script>
  import {enDateFormat, dateTimeFormat} from '../../filters/index'
  import search from '../../components/purchase/search.vue'
  import listItem from '../../components/purchase/listItem.vue'
  import pagination from '../../components/common/pagination.vue'
  import slidePage from '../../components/common/slidePage.vue'
  import offerInfo from '../../components/purchase/myUserOffer/offerInfo.vue'

  import breedId from '../../components/common/breedId.vue'
  import countermanId from '../../components/common/countermanId.vue'
  import myAddress from '../../components/common/address.vue'
  import myTitle from '../../components/common/title.vue'
  import common from '../../common/httpService'
  export default{
    props: {},
    data(){
      return {
        enDateFormat: enDateFormat,
        zhCNDateFormat: dateTimeFormat,
        listData: [],
        showOffer: false,
        detail: {},
        showOrder: false,
        orderInfo: {},
        isShowBreed: false,
        isShowCounterman: false,
        isShowAddress: false,
        pages: 0,
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
      $route(newVal) {
        if (newVal.query !== {}) {
          this.bodyAuto();
        } else {
          this.clearTime();
        }
      },
//      isShowBreed(newVal){
//        if (!newVal) {
//          this.bodyAuto();
//        } else {
//          this.clearTime();
//        }
//      },
//      isShowCounterman(newVal){
//        if (!newVal) {
//          this.bodyAuto();
//        } else {
//          this.clearTime();
//        }
//      },
//      showOrder(newVal){
//        if (!newVal && this.showOffer === false) {
//          this.bodyAuto();
//        } else {
//          this.clearTime();
//        }
//      }
    },
    computed: {
      pathHash(){
        if (this.$route.query !== {}) {
          console.log(this.$route.query)
          return this.$route.query
        }
        return {}
      },
      scrollTop(){
        return this.$store.state.common.scrollTop;
      },
      language(){
        return common.language;
      }
    },
    components: {
      search,
      listItem,
      pagination,
      slidePage,
      offerInfo,
      breedId,
      countermanId,
      myAddress,
      myTitle
    },
    created(){
      console.log(this.$router)
//      this.getHttp();
    },
    methods: {
      counterSelect(item){
        console.log(item)
      },
      getBreedId(val){
        //返回值中有 breedId
        this.isShowBreed = !this.isShowBreed;
      },
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
        //储存 滚动高度
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        this.$store.dispatch('setScrollTop', scrolltop);
        this.$router.push(`${this.$route.path}?page=listInfo`);

        this.detail = itemData;
        this.orderInfo = itemData;
        this.showOffer = true;
      },
      //显示订单页组件
      showOrderInfo(itemData){
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        this.$store.dispatch('setScrollTop', scrolltop);
        this.$router.push(`${this.$route.path}?page=offer`);
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
          biz_param: common.filterFormData(this.httpParams)
        };
        common.commonPost(url, body).then((suc) => {
          loading.visible = false;
          this.listData = suc.biz_result.list;
          this.pages = suc.biz_result.pages;
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
        this.getHttp();
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
            var time = new Date();
            var nowWeek = time.getDay();
            console.log(nowWeek);
            var start = '';
            var end = '';
            //获取今天是周几 0周天 6是周6
            switch (nowWeek) {
              case 0:
                end = time
                start = new Date(end.getTime() - 86400000 * 6);
                break;
              case 1:
                start = new Date(time.getTime());
                end = new Date(start.getTime() + 86400000 * 6);
                break;
              default:
                start = new Date(time.getTime() - 86400000 * (nowWeek - 1))
                end = new Date(time.getTime() + 86400000 * (7 - nowWeek));
                break;
            }
            this.httpParams.startTime = this.constructor.filter('formatBirth')(start);
            this.httpParams.endTime = this.constructor.filter('formatBirth')(end);
            console.log(this.httpParams);
            break;
        }
        this.httpParams.page = 1;
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
