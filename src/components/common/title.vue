<style lang="less" scoped>
  @import '../../../static/css/base.less';

  .myTitle {
    width: 100%;
    padding: 5px;
    border-left: 3px solid @color;
    color: @color;
    text-indent: 5px;
  }
</style>
<template>
  <div class="myTitle" :style="{'font-size':fontSize,'font-weight':fontWeight,'color':color}">
    {{title}}
  </div>
</template>
<script>
  export default {
    data(){
      return {}
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      fontSize: {
        type: Number,
        default: 16
      },
      fontWeight: {
        type: Number,
        default: 400
      },
      color: {
        type: String,
        default: ''
      }
    }
  }
</script>
