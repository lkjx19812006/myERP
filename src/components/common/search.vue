<style lang="less" scoped>
  @import '../../../static/css/base.less';

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

  .mu-drawer {
    padding-top: 30px;
    padding-bottom: 36px;
    width: 80%;
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
  }

  .search_fixed {
    height: 56px;
    margin-bottom: 10px;
  }

  .demo-icon-button {
    height: 36px;
    .iconfont {
      color: #909090;
    }
  }

</style>
<template>
  <div ref="search" class="search">
    <div ref="content" class="content_wrap" :class="{'contentFixed':fixed}">
      <!--头部快捷按钮插槽-->
      <slot name="topAction"></slot>
      <!--点击展开更多-->
      <mu-icon-button v-if="more" icon="more_vert" class="demo-icon-button" @click="toggle()">
        <i class="iconfont icon-gengduo"></i>
      </mu-icon-button>
    </div>
    <mu-drawer class="mu-drawer" :docked="false" right :open="open" @close="toggle()">
      <div class="title">
        {{$t('message.filter')}}
      </div>
      <mu-list class="mu-list">
        <!--搜索内容列插槽-->
        <slot name="contAction"></slot>
      </mu-list>
      <div class="bottom">
        <mu-raised-button :label="$t('message.reset')" class="raised-button reset" @click="resetHttp()"/>
        <mu-raised-button :label="$t('message.confirm')" class="raised-button" @click="searchHttp()" primary/>
      </div>
    </mu-drawer>
  </div>
</template>
<script>
  export default {
    props: {
      //后期通过配置httpParams参数控制 控件的显示与隐藏
      more: false,
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
      },
      //重置搜索条件
      resetHttp(){
        this.toggle();
        this.$emit('reset');
      },
      //搜索
      searchHttp(){
        this.toggle();
        this.$emit('search');
      }
    }
  }
</script>
