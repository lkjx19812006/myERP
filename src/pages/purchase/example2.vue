<style scoped lang="less">
  .myReceivedOffer {
    width: 100%;

    .img_upload_wrap {
      height: 100px;
      width: 240px;
      background-color: #f0f0f0;
      border: 1px dashed #d0d0d0;
      border-radius: 5px;
      margin: 100px auto;
    }
    .file_upload_wrap {
      height: 36px;
      width: 150px;
      border: 1px solid #d0d0d0;
      border-radius: 5px;
      margin: 50px auto;
    }
  }
</style>
<template>
  <!--我收到的报价-->
  <div class="myReceivedOffer">
    <div class="img_upload_wrap">
      <uploadImg @postUrl="getPostUrl" :params="{index:1}"/>
    </div>
    <div class="file_upload_wrap">
      <uploadFile @postUrl="getUrlList"/>
    </div>
    <div class="fileList">
      <div class="item" v-for="item in fileUrlList">
        <span>{{item.name}}</span>
        <a :href="item.url">下载地址</a>
      </div>
    </div>
  </div>
</template>
<script>
  import uploadImg from  '../../components/common/uploadImg.vue'
  import uploadFile from '../../components/common/uploadFile.vue'
  export default {
    data(){
      return {
        fileUrlList: []
      }
    },
    components: {
      uploadImg,
      uploadFile
    },
    methods: {
      getPostUrl(params){
        console.log(params);
      },
      getUrlList(params){
        this.fileUrlList = [...this.fileUrlList, params]
        console.log(params)
      }
    }
  }
</script>
