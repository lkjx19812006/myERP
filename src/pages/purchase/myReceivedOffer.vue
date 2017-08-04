<style scoped lang="less">
  .myReceivedOffer {
    width: 100%;

    .img_upload_wrap {
      height: 200px;
      width: 200px;
      background-color: #f0f0f0;
      border: 1px dashed #d0d0d0;
      border-radius: 5px;
      margin: 100px auto;
    }
  }
</style>
<template>
  <!--我收到的报价-->
  <div class="myReceivedOffer">
    <div class="img_upload_wrap">
      <uploadImg @postUrl="getPostUrl"/>
    </div>
  </div>
</template>
<script>
  import uploadImg from  '../../components/common/uploadImg.vue'
  export default {
    data(){
      return {}
    },
    components: {
      uploadImg
    },
    methods: {
      getPostUrl(params){
        console.log(params.url);
      }
    }
  }
</script>
