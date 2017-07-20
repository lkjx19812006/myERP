<style lang="less" scoped>

</style>
<template>
  <div>
    <mu-appbar>
      <mu-icon-button icon="menu" @click="openMenu = !openMenu" slot="left"/>
      <mu-icon-button icon="account_box_white" @click="openUserMenu = !openUserMenu" slot="right"/>
    </mu-appbar>
    <menuView :open="openMenu" v-on:closeMenu="closeMenu"/>
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
      }
    }
  }
</script>
