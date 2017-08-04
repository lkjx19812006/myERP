<template>
  <div class="uploadFile" ref="upload">
    <img class="img_svg" src="./upload.svg">
    <span>{{$t('message.file_upload')}}</span>
    <input @change="previewFile"
           class="fileInput" ref="file" type="file">
    <div class="progress" v-show="isShowPro">
      <div class="pro_wrap" ref="progress">
        <div class="progress_line">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../../common/httpService'
  export default {
    props: {
      keyName: {//传输方向
        type: String,
        default: 'intention',
      },
      postDataUrl: {//默认传输地址 七牛
        type: String,
        default: 'http://upload.qiniu.com'
      },
      format: {//默认格式
        type: Array,
        default: () => (['.xls', '.xlsx'])
      },
      fileSize: {//默认大小 2M
        type: Number,
        default: 204800
      },
      params: {
        type: Object,
        default: () => ({})
      }
    },
    data(){
      return {
        key: '',//上传到服务器的名字
        fileName: '',//文件本身的名字
        isShowPro: false,
        value: 0//进度条的值
      }
    },
    created(){
      this.getToken()
    },
    methods: {
      close(){
        //清除路径 并告诉父元素 我清除了路径 清除 input 的value值 让其可以重复上传一张图片
        this.src = null;
        this.$refs.file.value = null;
      },
      //预览图片
      previewFile(event){
        let input = event.target
        //判断input中有文件 并且第一个文件不为空
        if (input.files && input.files[0]) {
          if (input.files[0].size > this.fileSize) {
            this.$message({
              type: 'info',
              message: `${this.$t('message.file_too_large')} < ${this.fileSize / 1024} M`
            })
            return
          }
          //判断文件格式
          if (!this.validateFormat(input.files[0].name)) {
            this.$refs.file.value = ''
            //上传了不同格式的文件 待处理信息
            this.$message({
              type: 'info',
              message: `${this.$t('message.file_format_error')}${this.format}`
            })
            return;
          }
          this.fileName = input.files[0].name
          this.getKey(input.files[0].name)
          this.uploadFile(input.files[0])
        }
      },
      //获取七牛token
      getToken(){
        return new Promise((resolve, reject) => {
          let url = common.urlCommon + common.apiUrl.most
          let body = {
            biz_module: 'filesService',
            biz_method: 'getQiNiuToken',
            biz_param: {
              bucketName: this.keyName
            }
          }
          common.commonPost(url, body).then((suc) => {
            resolve(suc)
          }, (err) => {
            reject(err)
          })
        })
      },
      //校验文件格式
      validateFormat(fileName){
        return this.format.every(item => {
          return fileName.includes(item)
        })
      },
      //上传
      uploadFile(file){
        if (this.postDataUrl.includes('http://upload.qiniu.com')) {
          //七牛的服务器
          this.getToken().then((result) => {
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                //构建返回数据
                let obj = {
                  url: '',
                  params: this.params,
                  status: 200,
                  name: this.fileName
                }
                if (xhr.status === 200 && xhr.response !== '') {
                  let suc = JSON.parse(xhr.response);
                  if (suc.key) {
                    let url = `${result.biz_result.url}/${suc.key}`
                    obj.url = url
                    this.$emit('postUrl', obj)
                    this.isShowPro = false
                    this.value = 0
                    this.src = url
                    this.$refs.file.value = null
                  }
                } else {
                  obj.status = xhr.status
                  this.$emit('postUrl', obj)
                  this.isShowPro = false
                  this.value = 0
                  this.src = null
                  this.$refs.file.value = ''
                }
              }
            }
            let url = this.postDataUrl
            xhr.open("POST", url, true)
            //获取按钮的框度
            let btnWidth = this.$refs.upload.offsetWidth
            //progress 进度条宽度
            let progressWidth = 0
            this.$refs.progress.style.width = 0

            xhr.upload.onprogress = (event) => {
              //动态设置进度条框度
              progressWidth = Math.floor(event.loaded / event.total * btnWidth)
              this.$refs.progress.style.width = `${progressWidth}px`
            };
            let formData = new FormData()
            formData.append('key', this.key)
            formData.append('token', result.biz_result.token)
            formData.append('file', file)
            this.isShowPro = true
            xhr.send(formData)
          })
        }
      },
      getKey(fileName){
        if (fileName) {
          let nameArr = fileName.split('.')
          let suffix = nameArr[nameArr.length - 1]
          let random = Math.floor(Math.random() * 100000000000)
          this.key = `${new Date().getTime()}${random}.${suffix}`
        } else {
          this.key = ''
        }
      }

    }
  }
</script>
<style scoped lang="less">
  .uploadFile {
    font-size: 14px;
    color: #666;
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .img_svg {
      width: 14px;
      margin-right: 12px;
    }
    .progress {
      height: 100%;
      width: 100%;
      border-radius: 4px;
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background-color: #fff;
      div {
        height: 100%;
      }
      .pro_wrap {
        width: 0px;
        position: absolute;
        left: 0px;
        top: 0px;
        background-color: rgba(33, 150, 234, 1);
        .progress_line {
          width: 10px;
          position: absolute;
          left: 0px;
          top: 0px;
          background: -webkit-linear-gradient(left, rgba(255, 249, 246, .2), rgba(255, 255, 255, .4), rgba(255, 249, 246, .2));
          box-shadow: 0 0 30px #fff;
          animation: scan .5s 0s infinite;
        }
        @keyframes scan {
          0% {
            left: 0;
          }
          100% {
            left: 100%;
          }
        }
      }
    }
    .fileInput {
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;
      cursor: pointer;
    }

    .close {
      height: 25px;
      width: 25px;
      background-color: #a0a0a0;
      position: absolute;
      top: -8px;
      right: -8px;
      border-radius: 50%;
      transform: rotate(45deg);
      .span_x, .span_y {
        display: block;
        width: 20px;
        height: 2px;
        background-color: #fff;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        border-radius: 1px;
      }
      .span_y {
        width: 2px;
        height: 20px;
      }
    }
  }

  .fide-enter-active {
    transition: opacity .5s;
  }

  .fide-enter {
    opacity: 0;
  }
</style>
