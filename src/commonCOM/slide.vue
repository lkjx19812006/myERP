<style lang="less" scoped>
  .slide {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .slide-item {
      /*让所有的图片放在最右侧*/
      position: absolute;
      left: 0;
      transform: translate3d(100%, 0, 0);
      top: 0;
      height: 100%;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      img {
        display: block;
        margin: auto;
        max-width: 100%;
      }
    }
    .indicator {
      font-size: 16px;
      line-height: 32px;
      width: 100%;
      text-align: center;
      position: absolute;
      bottom: 50px;
      left: 0;
      color: #fff;
    }
  }
</style>
<template>
  <div ref="wrap" class="slide"
       v-if="imgList.length > 0"
       v-on:touchstart="touchstart"
       v-on:touchmove="touchmove"
       v-on:touchend="touchend">
    <div :ref="'item' + index" class="slide-item" v-for="item,index in imgList">
      <img :src="item">
    </div>
    <!--指示器 当前页/总页数-->
    <div class="indicator">
      <span>{{this.center + 1}} / {{this.imgList.length}} </span>
    </div>
  </div>
</template>
<script>
  /*
   * 1.该组件具有实现图片左右滑动功能
   * 2.传入 图片数组 images
   * 3.指示器的位置 当前页/总页数
   * **/
  export default {
    props: {
      imgList: {
        type: Array,
        default: () => ([])
      },
      activeIndex: {
        type: Number,
        default: 0
      }
    },
    data(){
      return {
        wrapWidth: 0,//盒子宽度
        count: 1,
        pageX: 0,//页面点击最初的x值
        pageY: 0,//页面点击最初的y值
        nowPageX: '',//移动时 实时的x值
        nowPageY: '',//移动时 实时的y值
        endX: 0,//结束时的位置x
        endY: 0,//结束的位置y
        directionX: 1,//x方向 1向右 -1向左
        directionY: 1,//y方向 暂时不做处理
        right: 0,//定义三个下标 左
        center: 0,//定义三个下标 中
        left: 0//定义三个下标 右
      }
    },
    mounted(){
      //获取外面盒子宽度 最少三张图片
      if (this.imgList.length > 0) {
        this.wrapWidth = this.$refs.wrap.offsetWidth;
        //初始化图片位置
        this.initIndex()

        switch (this.imgList.length) {
          case 1:
            this.$refs['item' + this.center][0].style.transform = 'translate3d(0, 0, 0)';
            break;
          case 2:
            this.$refs['item' + this.center][0].style.transform = 'translate3d(0, 0, 0)';
            this.$refs['item' + this.left][0].style.transform = 'translate3d(100%, 0, 0)';
            break;
          default:
            this.$refs['item' + this.right][0].style.transform = 'translate3d(-100%, 0, 0)';
            this.$refs['item' + this.center][0].style.transform = 'translate3d(0, 0, 0)';
            this.$refs['item' + this.left][0].style.transform = 'translate3d(100%, 0, 0)';
            break;
        }
      }
    },
    methods: {
      //初始化下标
      initIndex(){
        switch (this.activeIndex) {
          case 0:
            this.right = this.imgList.length - 1;
            this.center = 0;
            this.left = 1;
            break;
          case this.imgList.length - 1:
            this.right = this.imgList.length - 2;
            this.center = this.imgList.length - 1;
            this.left = 0;
            break;
          default:
            this.right = this.activeIndex - 1;
            this.center = this.activeIndex;
            this.left = this.activeIndex + 1;
            break;
        }
      },
      touchstart(event){
        //记录当前点击位置
        this.pageX = event.changedTouches[0].pageX;
        this.pageY = event.changedTouches[0].pageY;
      },
      touchmove(event){
        //关闭所有动画
        switch (this.imgList.length) {
          case 1:
            this.$refs['item' + this.center][0].style.transition = "";
            break;
          case 2:
            this.$refs['item' + this.center][0].style.transition = "";
            this.$refs['item' + this.left][0].style.transition = "";
            break;
          default:
            this.$refs['item' + this.right][0].style.transition = "";
            this.$refs['item' + this.center][0].style.transition = "";
            this.$refs['item' + this.left][0].style.transition = "";
            break;
        }
        let nowPageX = event.changedTouches[0].pageX;
        //确定方向
        this.directionX = nowPageX - this.pageX >= 0 ? 1 : -1;
        //确定移动距离
        let x = '';
        switch (this.directionX) {
          case 1:
            x = (nowPageX - this.pageX) * this.directionX;
            break;
          case -1:
            x = (this.pageX - nowPageX) * this.directionX;
            break;
        }
        //移动
        this.moveX(x)
      },
      touchend(event){
        //移动结束时 记录当前轮播图滑动的位置
        this.endX = this.endX + event.changedTouches[0].pageX - this.pageX;
        //判断 滑动的距离 滑动大于10px时 让其显示下一张 或者上一张
        if (Math.abs(event.changedTouches[0].pageX - this.pageX) > 30) {
          switch (this.imgList.length) {
            case 1:
              this.endX = 0;
              this.$refs['item' + this.center][0].style.transform = 'translate3d(0, 0, 0)';
              this.$refs['item' + this.center][0].style.transition = 'all .3s';
              break;
            case 2:
              //只有两张图片时 让其只能实现显示下一张
              //确定方向
              this.$refs['item' + this.center][0].style.transition = 'all .3s';
              this.$refs['item' + this.center][0].style.transform = 'translate3d(-100%, 0, 0)';
              //开启动画
              this.$refs['item' + this.left][0].style.transition = 'all .3s';
              this.$refs['item' + this.left][0].style.transform = 'translate3d(0, 0, 0)';
              let sum = this.center
              this.center = this.left;
              this.left = sum;
              this.endX = 0;
              break;
            default:
              this.directionX > 0 ? this.showUp() : this.showNext();
              break;
          }
        } else {
          //还原位置
          this.endX = 0;
          switch (this.imgList.length) {
            case 1:
              this.$refs['item' + this.center][0].style.transform = 'translate3d(0, 0, 0)';
              this.$refs['item' + this.center][0].style.transition = 'all .3s';
              break;
            case 2:
              this.$refs['item' + this.center][0].style.transition = 'all .3s';
              this.$refs['item' + this.left][0].style.transition = 'all .3s';
              this.$refs['item' + this.center][0].style.transform = 'translate3d(0, 0, 0)';
              this.$refs['item' + this.left][0].style.transform = 'translate3d(100%, 0, 0)';
              break;
            default:
              this.$refs['item' + this.right][0].style.transition = 'all .3s';
              this.$refs['item' + this.center][0].style.transition = 'all .3s';
              this.$refs['item' + this.left][0].style.transition = 'all .3s';
              this.$refs['item' + this.right][0].style.transform = 'translate3d(-100%, 0, 0)';
              this.$refs['item' + this.center][0].style.transform = 'translate3d(0, 0, 0)';
              this.$refs['item' + this.left][0].style.transform = 'translate3d(100%, 0, 0)';
              break;
          }
        }
      },
      //x方向移动
      moveX(x){
        x = x + this.endX;
        if (!this.wrapWidth) this.wrapWidth = this.$refs.wrap.offsetWidth;
        switch (this.imgList.length) {
          case 1:
            this.$refs['item' + this.center][0].style.transform = 'translate3d(' + x + 'px, 0, 0)';
            break;
          case 2:
            this.$refs['item' + this.center][0].style.transform = 'translate3d(' + x + 'px, 0, 0)';
            this.$refs['item' + this.left][0].style.transform = 'translate3d(' + (this.wrapWidth * 1.1 + x) + 'px, 0, 0)';
            break;
          default:
            this.$refs['item' + this.right][0].style.transform = 'translate3d(' + (x - this.wrapWidth * 1.1) + 'px, 0, 0)';
            this.$refs['item' + this.center][0].style.transform = 'translate3d(' + x + 'px, 0, 0)';
            this.$refs['item' + this.left][0].style.transform = 'translate3d(' + (this.wrapWidth * 1.1 + x) + 'px, 0, 0)';
            break;
        }
      },
      //显示上一张
      showUp(){
        //开启动画
        this.$refs['item' + this.right][0].style.transition = 'all .3s';
        this.$refs['item' + this.right][0].style.transform = 'translate3d(0, 0, 0)';
        //开启动画
        this.$refs['item' + this.center][0].style.transition = 'all .3s';
        this.$refs['item' + this.center][0].style.transform = 'translate3d(100%, 0, 0)';

        this.$refs['item' + this.left][0].style.transform = 'translate3d(-100%, 0, 0)';
        this.endX = 0;
        this.left = this.center;
        this.center = this.right;
        this.right--;
        if (this.right < 0) {
          this.right = this.imgList.length - 1;
        }
      },
      //显示下一张
      showNext(){
        this.$refs['item' + this.right][0].style.transform = 'translate3d(100%, 0, 0)';
        //开启动画
        this.$refs['item' + this.center][0].style.transition = 'all .3s';
        this.$refs['item' + this.center][0].style.transform = 'translate3d(-100%, 0, 0)';
        //开启动画
        this.$refs['item' + this.left][0].style.transition = 'all .3s';
        this.$refs['item' + this.left][0].style.transform = 'translate3d(0, 0, 0)';
        this.endX = 0;
        this.right = this.center;
        this.center = this.left;
        this.left++;
        if (this.left > this.imgList.length - 1) {
          this.left = 0;
        }
      }
    }
  }
</script>
