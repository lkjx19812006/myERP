<style lang="less" scoped>
  .menu {
    .mu-appbar {
      text-align: center;
    }
  }
</style>
<template>
  <div class="menu">
    <mu-drawer :docked="false" width="80%" left :open="open" @close="close">
      <mu-appbar title="菜单导航"/>
      <mu-list :value="value" @change="handleChange">
        <mu-list-item title="采购单管理" toggleNested :open="false">
          <mu-list-item @click="close" to="/purchase/example" value="/purchase/example" title="例子1" slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" to="/purchase/example2" value="/purchase/example2" title="例子2" slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" to="/purchase/myUserOffer" value="/purchase/myUserOffer" title="我的供应商报价"
                        slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" :value="2" title="部门供应商报价" slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" :value="3" title="我的采购单" slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" :value="4" title="部门采购单" slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" :value="5" title="全部采购单" slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" :value="6" title="采购单报价专区" slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" to="/purchase/myReceivedOffer" value="/purchase/myReceivedOffer" title="我收到的报价"
                        slot="nested">
          </mu-list-item>
          <mu-list-item @click="close" :value="8" title="收到的全部报价" slot="nested">
          </mu-list-item>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
</template>

<script>
  export default {
    props: {
      open: '',
    },
    data () {
      return {
        value: 1,
      }
    },
    watch: {
      '$route'(){
        //路由变化关闭菜单
        this.$emit('closeMenu');
      }
    },
    methods: {
      handleChange(val){
        this.value = val
      },
      close() {
        this.$emit('closeMenu');
      },
    }
  }
</script>
