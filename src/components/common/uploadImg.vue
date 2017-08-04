<template>
  <div class="uploadImg">
    <div class="line-X" v-show="src === null && !isShowPro"></div>
    <div class="line-Y" v-show="src === null && !isShowPro"></div>
    <transition name="fide">
      <div class="img_wrap" v-show="src">
        <img @click="$showImg(src)" :src="src">
      </div>
    </transition>
    <input @change="previewImg"
           v-show="src === null" class="imgInput" ref="imgInput" type="file"
           accept="image/png,image/jpeg,image/jpg,image/bmp">
    <div class="close" @click="close" v-show="src !== null && !isShowPro">
      <span class="span_x"></span>
      <span class="span_y"></span>
    </div>
    <div class="progress" v-show="isShowPro">
      <mu-circular-progress mode="determinate" :size="60" :strokeWidth="4" :value="value"/>
    </div>
  </div>
</template>
<script>
  import common from '../../common/httpService'
  export default {
    props: {
      keyName: {
        type: String,
        default: 'intention',
      },
      params: {
        type: Object,
        default: () => ({})
      }
    },
    data(){
      return {
        key: '',
        src: null,
        size: 0,
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
        this.$refs.imgInput.value = null;
      },
      //预览图片
      previewImg(event){
        let _self = this
        let input = event.target
        //判断input中有文件 并且第一个文件不为空
        if (input.files && input.files[0]) {
          //限制图片上传大小
          if (input.files[0].size > 3036000) {
            this.$message({
              showClose: false,
              message: '图片大小在3M以内'
            })
          } else {
            //创建一个文件读取对象
            let reader = new FileReader()
            //文件读取对象 读取完毕后
            reader.onload = function (e) {
              //图片大小 大于200kb压缩
              if (e.total > 204800) {
                let img = new Image()
                img.src = e.target.result;
                img.onload = () => {
                  _self.compress(img)
                }
              } else {
                //不压缩 直接上传
                _self.size = e.total
                _self.uploadImg(e.target.result)
              }

            }
            reader.readAsDataURL(input.files[0])
          }
        }
      },
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
      //上传图片
      uploadImg(file){
        file = file.split(',')[1];
        this.getToken().then((result) => {
          let xhr = new XMLHttpRequest();
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              let suc = JSON.parse(xhr.response);
              if (suc.key) {
                let url = `${result.biz_result.url}/${suc.key}`
                this.$emit('postUrl', {url: url, params: this.params})
                this.isShowPro = false
                this.value = 0
                this.src = url
                this.$refs.imgInput.value = null
              }
            } else {
              this.isShowPro = false
              this.value = 0
              this.src = null
              this.$refs.imgInput.value = ''
            }
          }
          let url = `http://upload.qiniu.com/putb64/${this.size}`
          xhr.open("POST", url, true)
          xhr.setRequestHeader("Content-Type", "application/octet-stream")
          xhr.setRequestHeader("Authorization", `UpToken ${result.biz_result.token}`)
          //监听上传进度
          xhr.upload.onprogress = (event) => {
            this.value = Math.floor(event.loaded / event.total * 100)
            console.log(this.value)
          };
          this.isShowPro = true
          xhr.send(file)
        })
      },
      //图片压缩
      compress (img) {
        let cvs = document.createElement('canvas')
        let ctx = cvs.getContext('2d')
        cvs.width = img.width
        cvs.height = img.height

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.closePath();
        ctx.save();
        // 默认是 image/png 在type为 image/jpeg或 image/webp时可以从 0 到 1 的区间内选择图片的质量 img.src.split(';')[0].split(':')[1]
        let baseUrl = cvs.toDataURL('image/jpeg', .92)

        //**dataURL to blob** 数据流的转换
        function dataURLtoBlob(dataurl) {
          var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
          }
          return new Blob([u8arr], {type: mime});
        }

        //**blob to dataURL**
//        function blobToDataURL(blob, callback) {
//          var a = new FileReader();
//          a.onload = function (e) { callback(e.target.result); }
//          a.readAsDataURL(blob);
//        }

        let compressedImageBlob = dataURLtoBlob(baseUrl)
        this.size = compressedImageBlob.size
        this.uploadImg(baseUrl)
      }
    }
  }
</script>
<style scoped lang="less">
  .uploadImg {
    height: 100%;
    width: 100%;
    padding: 5px;
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .img_wrap {
      height: 100%;
      width: 100%;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      img {
        max-width: 100%;
        border: 0;
        outline: none;
        display: block;
        border-color: transparent;
      }
    }
    .line-X, .line-Y {
      width: 30px;
      height: 4px;
      background-color: #909090;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      border-radius: 2px;
    }
    .line-Y {
      height: 30px;
      width: 4px;
    }
    .imgInput {
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
    .progress {
      height: 100%;
      width: 100%;
      background-color: rgba(255, 255, 255, .3);
      border-radius: 5px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
    }
  }

  .fide-enter-active {
    transition: opacity .5s;
  }

  .fide-enter {
    opacity: 0;
  }
</style>
