<style lang="less" scoped>
  @import '../../assets/css/base.less';

  .listItem {
    margin-bottom: 20px;
    padding: 10px 5px;
    .mu-paper {
      font-size: 16px;
      > div {
        padding: 5px 0;
        padding: 10px;
      }
      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .breedName {
          color: @color;
        }

      }
      .price {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
</style>
<template>
  <div class="listItem">
    <mu-paper class="demo-paper" :zDepth="2">
      <div class="title">
        <span class="time">{{itemData.otime}}</span>
        <span class="breedName">{{itemData.breedName}}</span>
      </div>
      <mu-divider/>
      <div class="customer">
        <div>
          <span>报价客户：</span>
          <span class="customerName">{{itemData.offerCustomerName}}</span>
        </div>
        <div style="padding: 5px 0">
          <span>联系方式：</span>
          <a type="tel" class="customerPhone">{{itemData.offerCustomerPhone}}</a>
        </div>
      </div>
      <mu-divider/>
      <div class="price">
        <div>
          <span>报价：</span>
          <span style="color: #F38300">{{itemData.price}}</span>
        </div>
        <div>
          <span>库存：</span>
          <span>{{itemData.number}}（{{itemData.unit | idToUnit}}）</span>
        </div>
      </div>
      <mu-divider/>
      <div class="description">
        <span>备注信息：</span>
        <span>{{itemData.description}}</span>
      </div>
      <mu-divider/>
      <div>
        <mu-flat-button label="按钮1"/>
        <mu-flat-button label="按钮1"/>
        <mu-flat-button label="按钮1"/>
      </div>
    </mu-paper>
  </div>
</template>
<script>
  export default {
    props: {
      itemData: {
        type: Object,
        default: {}
      }
    },
    data(){
      return {}
    }
  }
</script>
