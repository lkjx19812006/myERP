<style scoped lang="less">
  .appbar-search-field {
    margin-top: 20px;
  }

  .cancel {
    height: 100%;
  }
</style>
<template>
  <slidePage class="countermanId">
    <mu-appbar slot="header" class="header">
      <div class="close" slot="left">
        <slot name="close"></slot>
      </div>
      <div class="search">
        <mu-text-field class="appbar-search-field"
                       :hintText="$t('message.enter_salesman')"
                       hintTextClass="hintTextClass"
                       inputClass="inputClass"
                       fullWidth/>
      </div>
      <!--取消按钮-->
      <div class="cancel" slot="right">
        <mu-flat-button slot="cancel" color="white" :label="$t('message.cancel')"/>
      </div>
    </mu-appbar>
  </slidePage>
</template>
<script>
  import slidePage from './slidePage.vue'
  import common from '../../common/httpService'
  // /crm/api/v1/org/
  export default{
    data(){
      return {}
    },
    components: {
      slidePage
    },
    mounted(){
      this.getCountermanList();
    },
    methods: {
      getCountermanList(){

      }
    },


  }
</script>
