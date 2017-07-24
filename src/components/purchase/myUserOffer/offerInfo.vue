<style lang="less" scoped>
  @import '../../../assets/css/base.less';

  .offerInfo {
    position: fixed;
    z-index: 99;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding-top: 56px;
    box-sizing: border-box;
    background-color: pink;
    .title {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
    }
    .demo-paper {
      height: 100%;
      width: 100%;
      padding: 5px;
      overflow-x: hidden;
      overflow-y: scroll;
      .detail {
        font-size: 16px;
        padding: 5px;
        line-height: 24px;
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
  }

  .color {
    color: @color;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s, left .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
    left: 320px;
  }

  @media screen and(min-width: 480px) {
    .offerInfo {
      padding-top: 64px;
    }
  }
</style>
<template>
  <div class="offerInfo">
    <div class="title">
      <slot name="header"></slot>
    </div>
    <mu-paper class="demo-paper" :zDepth="2">
      <div class="detail">
        <span class="tit">报价时间：</span>
        <span class="inof">{{detail.otime}}</span>
      </div>
      <mu-divider/>
      <div class="detail">
        <span class="tit">药材名称：</span>
        <span class="info color">{{detail.breedName}}</span>
      </div>
      <mu-divider/>
      <div class="detail">
        <span class="tit">报价客户：</span>
        <span class="info color">{{detail.offerCustomerName}}</span>
      </div>
      <div class="detail">
        <span class="tit">联系方式：</span>
        <a type="tel" class="info">{{detail.offerCustomerPhone}}</a>
      </div>
      <div class="detail">
        <span class="tit">所属交易员：</span>
        <span class="info color">{{detail.offerEmployeeName}}</span>
      </div>
      <mu-divider/>
      <div class="detail">
        <span class="tit">报价价格：</span>
        <span class="info" style="color: #F83a00">{{detail.price}}</span>
      </div>
      <mu-divider/>
      <div class="detail">
        <span class="tit">库存数量：</span>
        <span class="info color">{{detail.number}}（{{detail.unit | idToUnit}}）</span>
      </div>
      <mu-divider/>
      <!--这里存放报价的资源图片 没列最多3个-->
      <div class="detail img_wrap">
        <div class="img_item" @click="$showImg(item)" v-for="item in imgList">
          <img :src="item">
        </div>
      </div>
      <mu-divider/>
      <div>
        <slot name="action"></slot>
      </div>
    </mu-paper>
  </div>
</template>
<script>
  let imgList = [
    'http://test.image.yaocaimaimai.com/FgKAe3aDfMPpcltLH-EfD07wFQkC',
    'http://test.image.yaocaimaimai.com/FgZNelOY4QZmggGprLX-bnA2luAO',
    'http://test.image.yaocaimaimai.com/Fvl4rzSwuJ7yh1R6BR4L9R-E1avH?imageslim',
    'http://test.image.yaocaimaimai.com/FsmZGsrgTvMdrSO8Cnvv4do_q1oC?imageslim',
    'http://test.image.yaocaimaimai.com/FvJWAqAY_Bho5DUpV1U36FBB9zgI?imageslim'
  ]
  export default {
    props: {
      detail: {
        type: Object,
        default: null
      }
    },
    data(){
      return {
        imgList: imgList
      }
    }
  }
</script>
