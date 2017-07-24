<style lang="less" scoped>
  .header {
    height: 56px;
  }

  @media screen and (min-width: 480px) {
    .header {
      height: 64px;
    }
  }

</style>
<template>
  <div class="header">
    <mu-appbar>
      <mu-icon-button @click="openMenu = !openMenu" slot="left">
        <i class="iconfont icon-caidan"></i>
      </mu-icon-button>
      <mu-icon-button @click="openUserMenu = !openUserMenu" slot="right">
        <i class="iconfont icon-yonghu"></i>
      </mu-icon-button>
    </mu-appbar>
    <!--左边菜单-->
    <menuView :open="openMenu" v-on:closeMenu="closeMenu"/>
    <!--右边导航-->
    <userMenu :open="openUserMenu" v-on:closeUser="closeUser"/>
  </div>
</template>
<script>
  import menuView from './menu.vue'
  import userMenu from './userMenu.vue'
  export default {
    props: {},
    data(){
      return {
        openMenu: false,
        openUserMenu: false,
      }
    },
    components: {
      menuView,
      userMenu
    },
    methods: {
      //关闭菜单栏
      closeMenu(){
        this.openMenu = false;
      },
      //关闭用户栏
      closeUser(){
        this.openUserMenu = false;
      },
      //返回到上一页
      back(){
        window.history.back(-1);
      }
    }
  }
</script>
