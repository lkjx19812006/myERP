<style lang="less" scoped>
  @import '../../../static/css/base.less';

  .pagination {
    width: 100%;
    min-height: 77px;
    position: relative;
    .top-open {
      min-height: 20px;
      border-top: 1px solid #dbdbdb;
      width: 100%;
      background-color: #f0f0f0;
      poistion: absolute;
      left: 0;
      top: 10px;
      .iconfont {
        position: absolute;
        top: -2px;
        left: 50%;
        width: 24px;
        height: 24px;
        line-height: 24px;
        font-size: 18px;
        transform: translate(-50%);
        text-align: center;
        color: #909090;
      }
      .item_wrap {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
        padding: 20px 0;
        .demo-raised-button {
          margin: 5px;
        }
      }
    }
    .pagination-content {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #dbdbdb;
      .mu-flat-button {
        flex: 0 0 auto;
      }
      .select {
        flex: 1;
        text-align: center;
        margin: 0;
        margin-top: 8px;
        .mu-text-field-content {
          padding: 0;
        }
        .item {
          padding: 0 10px;
        }
      }
    }
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    transition: all 500ms cubic-bezier(0.215, 0.61, 0.355, 1);
  }

</style>
<template>
  <div class="pagination">
    <div class="top-open" v-if="pageSize">
      <i class="iconfont icon-shangla" @click="tragger"/>
      <transition name="slide">
        <div class="item_wrap" v-if="showSize">
          <mu-raised-button @click="pageSizeChange(item)" v-for="item,index in pageSize" :key="index"
                            :label="item + '/' + $t('message.page')"
                            class="demo-raised-button"/>
        </div>
      </transition>
    </div>
    <div class="pagination-content">
      <mu-flat-button :disabled="page === 1" @click="prePage" class="demo-flat-button" primary>
        <i class="iconfont icon-zuoyoujiantouicon-defuben1"></i>
        <span>{{$t('message.previous_page')}}</span>
      </mu-flat-button>
      <mu-select-field @change="selectChange" v-model="page" class="select" :maxHeight="200">
        <mu-menu-item class="item" v-for="item, index in list" :key="index" :title="item.title" :value="item.page"/>
      </mu-select-field>
      <mu-flat-button :disabled="page >= total" @click="nextPage" class="demo-flat-button"
                      labelPosition="before"
                      primary>
        <span>{{$t('message.next_page')}}</span>
        <i class="iconfont icon-zuoyoujiantouicon-defuben"></i>
      </mu-flat-button>
    </div>
  </div>
</template>
<script>
  export default {
    //该组件接收五个属性 page当前页 total总数页 pageSize分页大小 pageSizeChange分页大小改变  pageChange当前页改变 函数
    props: {
      page: {
        type: Number,
        default: 1//默认当前页为第一页
      },
      total: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Array,
        default: null,
      },
      pageChange: {
        type: Function,
        default: null
      }
    },
    data(){
      return {
        showSize: false,//控制是否显示改变每页大小
      }
    },
    computed: {
      list(){
        //定义当前选择的值
        let arr = [];
        if (this.total === 0)  return [{page: 1, title: 1 + this.$t('message.page')}];
        //小于5时 都返回1-10页
        let total = 10;
        if (this.total < 10) total = this.total//每次走10页 小于10页 走显示当前页
        let count = 1; // 从1开始计数
        //当前页 大于5时 要截取遍历的数字
        if (this.page > 5) {
          count = this.page - 5;
          let nowNum = this.page + 4;
          total = nowNum > this.total ? this.total : nowNum;
        }

        //处理数据 每次只截取当前页的前后10页的数据作为展示 全部展示太慢
        for (let i = count - 1; i < total; i++) {
          let obj = {
            page: i + 1,
            title: (i + 1) + '/' + this.total + this.$t('message.page')
          }
          arr.push(obj);
        }
        return arr;
      }
    },

    methods: {
      //点击改变分页大小
      tragger(){
        this.showSize = !this.showSize;
      },
      //选择时改变
      selectChange(val){
        this.senParent(val);
      },
      //上一页
      prePage(){
        let page = this.page - 1;
        this.senParent(page);
      },
      //下一页
      nextPage(){
        let page = this.page + 1;
        this.senParent(page);
      },
      //发送信息个父组件
      senParent(val){
        this.$emit('pageChange', val);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      pageSizeChange(val){
        this.$emit('pageSizeChange', val);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  }
</script>
