<style lang="less" scoped>
  .myUserOffer {

  }
</style>
<template>
  <div class="myUserOffer">
    <!--头部搜索-->
    <search :more='true'
            v-on:reset="resetHttp"
            v-on:search="searchHttp">
      <mu-raised-button slot="topAction"
                        :label="$t('message.today_offer')"
                        :primary="active === 'today' "
                        class="demo-flat-button"
                        @click="searchTime('today')"/>
      <mu-raised-button slot="topAction"
                        :label="$t('message.week_offer')"
                        :primary="active === 'tswk' "
                        class="demo-flat-button"
                        @click="searchTime('tswk')"/>
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
    <!--栏目列-->
    <offerListItem @click="linkTo(itemData)" :key="itemData.id" :itemData="itemData" v-for="itemData in listData">
    </offerListItem>
    <!--分页-->
    <pagination :total="pages"
                :page="httpParams.page"
                :pageSize="[15, 20, 30]"
                @pageSizeChange="pageSizeChange"
                @pageChange="pageChange"/>
    <!--刷新组件-->
    <refresh @click="refresh"/>
    <!--详情页组件-->
    <slidePage v-show="pathHash.page === 'listInfo' ">
      <mu-appbar slot="header" class="mu-appbar" title="报价详情">
        <mu-icon-button slot="left" @click="$router.back()">
          <i class="iconfont icon-close fz18"></i>
        </mu-icon-button>
      </mu-appbar>
      <offerInfo slot="content" :detail="infoData">
        <mu-raised-button
          slot="action"
          style="margin: 10px 0;"
          label="生成订单"
          class="demo-raised-button"
          @click="showOrderInfo()"
          primary fullWidth/>
      </offerInfo>
    </slidePage>
  </div>
</template>
<script>
  import {enDateFormat, dateTimeFormat} from '../../filters/index'
  import search from '../../components/common/search.vue'
  import offerListItem from '../../components/common/offerListItem.vue'
  import refresh from '../../components/common/refresh.vue'
  import pagination from '../../components/common/pagination.vue'
  import slidePage from '../../components/common/slidePage.vue'
  import offerInfo from '../../components/purchase/myUserOffer/offerInfo.vue'
  import common from '../../common/httpService'
  export default {
    data(){
      return {
        enDateFormat: enDateFormat, //日期时间英文
        zhCNDateFormat: dateTimeFormat,//日期时间中文
        listData: [],
        active: '', //今天或者本周按钮状态
        pages: 1,//分页总数
        httpParams: {
          page: 1,
          pageSize: 15,
          startTime: '',
          endTime: '',
          fullname: '',
          userPhone: '',
          source: ''
        },
        infoData: {},
        timer: ''
      }
    },
    computed: {
      pathHash(){
        if (this.$route.query !== {}) {
          console.log(this.$route.query)
          return this.$route.query
        }
        return {}
      },
      language(){
        return common.language;
      }
    },
    components: {
      search, offerListItem, refresh, pagination, slidePage, offerInfo
    },
    mounted(){
      if (!this.$store.state.plus.plus.os) {
        // 监听plusready事件
        document.addEventListener("plusready", () => {
          switch (window.plus.os.name) {
            case "Android":
              alert('Android')
              // Android平台: plus.android.*
              break;
            case "iOS":
              alert('ios')
              // iOS平台: plus.ios.*
              break;
            default:
              alert('其他123')
              // 其它平台
              break;
          }
          this.$store.dispatch('setMyPlus', window.plus)
        }, false);
      } else {

      }
      this.getHttp()
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
        this.getHttp()
      },
      getHttp(){
        let url = common.urlCommon + common.apiUrl.most
        let body = {
          biz_module: 'erpIntentionOfferService',
          biz_method: 'queryMySendOffer',
          biz_param: common.filterFormData(this.httpParams),
        }
        common.commonPost(url, body).then(suc => {
          this.listData = suc.biz_result.list
          this.pages = suc.biz_result.pages
        }, err => {
          this.listData = []
          this.$message({
            visible: true,
            message: err.msg
          })
        })
      },
      linkTo(itemData){
        //储存 滚动高度
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        this.$store.dispatch('setScrollTop', scrolltop);
        //赋值详情页数据
        this.infoData = itemData
        this.$router.push(`${this.$route.path}?page=listInfo`)
      },
      refresh(){
        this.getHttp()
      },
      //分页大小改变
      pageSizeChange(pageSize){
        this.httpParams.pageSize = pageSize
        this.getHttp()
      },
      //当前页改变
      pageChange(page){
        this.httpParams.page = page
        this.getHttp()
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
      timeChange(){
        //取消按钮选中状态
        this.active = '';
      },
    }
  }
</script>
