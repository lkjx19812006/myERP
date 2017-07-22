<style lang="less" scoped>
  @import '../../assets/css/base.less';

  .search {
    width: 100%;
    .content_wrap {
      width: 100%;
      padding: 0 10px;
      border-bottom: 1px solid #dbdbdb;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-between;
      background-color: #ebebeb;
    }
    .contentFixed {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
    }
    .demo-flat-button {
      flex: 0 0 auto;
      margin: 5px 0;
      margin-right: 5px;
    }
  }

  .mu-drawer {
    padding-top: 30px;
    padding-bottom: 36px;
    .title {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-indent: 20px;
      color: #909090;
      background-color: #e0e0e0;

    }
    .mu-list {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
    }
    .bottom {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .raised-button {
        flex: 1;
        border-radius: 0;
      }
      .reset {
        background-color: #ebebeb;
        color: @color;
      }

    }
  }

  .search_fixed {
    height: 56px;
    margin-bottom: 10px;
  }


</style>
<template>
  <div ref="search" class="search">
    <div ref="content" class="content_wrap" :class="{'contentFixed':fixed}">
      <mu-raised-button label="今日报价" class="demo-flat-button" primary/>
      <mu-raised-button label="本周报价" class="demo-flat-button" primary/>
      <!--点击展开更多-->
      <mu-raised-button label="更多搜索" class="demo-flat-button" @click="toggle()"/>
    </div>
    <mu-drawer class="mu-drawer" :docked="false" right :open="open" @close="toggle()">
      <div class="title">
        筛选
      </div>
      <mu-list class="mu-list">
        <mu-list-item title="Menu Item 1"/>
        <mu-list-item title="Menu Item 2"/>
        <mu-list-item title="Menu Item 3"/>
        <div style="background-color: pink; height: 1200px;">

        </div>
      </mu-list>
      <div class="bottom">
        <mu-raised-button label="重置" class="raised-button reset" primary/>
        <mu-raised-button label="完成" class="raised-button" @click="toggle()" primary/>
      </div>
    </mu-drawer>
  </div>
</template>
<script>
  export default {
    props: {
      //后期通过配置httpParams参数控制 控件的显示与隐藏
      httpParams: {
        type: 'Object',
        default: null
      }
    },
    data(){
      return {
        fixed: false,
        open: false,
      }
    },
    mounted(){
      //监听滚动变化
      //屏幕宽度 只获取一次
      let screen = document.body.clientWidth;
      let _self = this;
      window.onscroll = function () {
        //得到被卷去的头部高度
        let scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
        //动态拿到content_wrap的高度设置给search
        //设置搜索头高度
        let contentHeight = _self.$refs.content.offsetHeight;
        _self.$refs.search.style.height = contentHeight + 'px';
        //宽屏下头部高度是64 所以处理一次宽的
        if (scrolltop > 56) {
          _self.fixed = true;
        } else if (scrolltop <= 56) {
          _self.fixed = false;
        }
      }
    },
    methods: {
      toggle(){
        this.open = !this.open;
      }
    }
  }
</script>
