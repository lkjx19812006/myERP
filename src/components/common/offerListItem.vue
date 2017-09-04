<style lang="less" scoped>
  @import '../../../static/css/base.less';

  .listItem {
    padding: 10px 10px;
    .mu-paper {
      font-size: 16px;
      > div {
        padding: 10px 0;
        padding: 10px;
      }
      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .breedName {
          color: #333;
        }
      }
      .customer {
        .customerName {
          color: #333;
        }
        .customerPhone {
          margin-left: 10px;
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
  <div class="listItem" v-on:click="click">
    <mu-paper class="demo-paper" :zDepth="2">
      <div class="title">
        <span class="time">{{itemData.otime}}</span>
        <span class="breedName">{{itemData.breedName}}</span>
      </div>
      <mu-divider/>
      <div class="customer">
        <div>
          <span>报价供应商：</span>
          <span class="customerName">{{itemData.offerCustomerName}}</span>
          <a type="tel" class="customerPhone">{{itemData.offerCustomerPhone}}</a>
        </div>
      </div>
      <mu-divider/>
      <div class="price">
        <div>
          <span>报价：</span>
          <span style="color: #F38300">{{itemData.price}}</span>
        </div>
      </div>
      <mu-divider/>
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
    },
    methods: {
      click(){
        this.$emit('click')
      }
    }
  }
</script>
