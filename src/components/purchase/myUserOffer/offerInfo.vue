<style lang="less" scoped>
  @import '../../../assets/css/base.less';

  .demo-paper {
    padding: 5px;
    overflow-x: hidden;
    overflow-y: scroll;
    .detail {
      font-size: 16px;
      padding: 8px 10px;
      line-height: 24px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .color {
        color: #333;
      }
      .color_default {
        color: @color;
      }
    }
    .img_wrap {
      width: 100%;
      padding: 0;
      padding-top: 5px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
      .img_item {
        flex: 0 0 auto;
        width: 33.33333%;
        padding: 2px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        height: 80px;
        margin-bottom: 4px;
        img {
          width: 100%;

        }
      }

    }
  }
</style>
<template>
  <mu-paper slot="content" class="demo-paper" :zDepth="2">
    <div class="detail">
        <span class="tit">报价时间：</span>
        <span class="inof">{{detail.otime}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">供应商ID：</span>
      <span class="inof">{{detail.offerCustomer}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">供应商名称：</span>
      <span class="info color">{{detail.offerCustomerName}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">报价业务员：</span>
      <span class="info color">{{detail.offerEmployeeName}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">求购业务员：</span>
      <span class="info color">{{detail.buyEmployeeName}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">求购客户ID：</span>
      <span class="info color">{{detail.buyCustomer}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">求购客户：</span>
      <span class="info color">{{detail.buyCustomerName}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <div>
        <span class="tit">品种：</span>
        <span class="info color">{{detail.breedName}}</span>
      </div>
      <div>
        <span>产地：</span>
        <span class="info color">{{detail.location}}</span>
      </div>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">规格：</span>
      <span class="info color">{{detail.spec}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">审核状态：</span>
      <span class="info color">{{detail.offerCustomerName}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">审核原因：</span>
      <span class="info color">{{detail.offerCustomerName}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">报价来源/客户端：</span>
      <span class="info color">{{detail.source}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">药材名称：</span>
      <span class="info color">{{detail.breedName}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">是否采纳：</span>
      <span class="info color">{{detail.breedName}}</span>
    </div>
    <mu-divider/>
    <div class="detail">
      <span class="tit">原因：</span>
      <a type="tel" class="info">{{detail.offerCustomerPhone}}</a>
    </div>
    <mu-divider/>
    <div class="detail">
      <slot name="action"></slot>
    </div>
  </mu-paper>
</template>
<script>
  import slidePage from '../../common/slidePage.vue'
  export default {
    props: {
      detail: {
        type: Object,
        default: null
      }
    },
    components: {
      slidePage
    },
    data(){
      return {}
    }
  }
</script>
