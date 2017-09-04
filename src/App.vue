<style scoped lang="less">
  @import '../static/css/base.less';

  .App {
    .mu-back-top {
      .back_btn {
        padding: 0;
        margin: 0;
        background-color: @color;
        opacity: .7;
        color: #fff;
      }
    }
  }
</style>
<template>
  <div class="App">
    <headerView v-show="validateRoute"></headerView>
    <router-view class="view"></router-view>
    <mu-back-top class="mu-back-top" :bottom="120" :right="10">
      <mu-icon-button class="back_btn">
        <i class="iconfont icon-shangla1"></i>
      </mu-icon-button>
    </mu-back-top>
  </div>
</template>
<script>
  import headerView from './components/common/header.vue'

  export default {
    data() {
      return {
        transitionName: ''
      }
    },
    mounted(){
      mui.plusReady(function () {
//        alert("当前页面URL：" + plus.webview.currentWebview().getURL());
//        alert(`当前设备是：${plus.os.name}`)
      });
//      if (!this.$store.state.plus.plus.os) {
//        // 监听plusready事件
//        document.addEventListener("plusready", () => {
//          switch (window.plus.os.name) {
//            case "Android":
//              alert('Android')
//              // Android平台: plus.android.*
//              break;
//            case "iOS":
//              alert('ios')
//              // iOS平台: plus.ios.*
//              break;
//            default:
//              alert('其他123')
//              // 其它平台
//              break;
//          }
//          this.$store.dispatch('setMyPlus', window.plus).then(suc => {
//            let plus = suc.plus
//            // 监听点击消息事件
//            plus.push.addEventListener("click", function (msg) {
//              // 判断是从本地创建还是离线推送的消息
//              switch (msg.payload) {
//                case "LocalMSG":
//                  outSet("点击本地创建消息启动：");
//                  break;
//                default:
//                  outSet("点击离线推送消息启动：");
//                  break;
//              }
//              // 提示点击的内容
//              plus.ui.alert(msg.content);
//              // 处理其它数据
//              logoutPushMsg(msg);
//            }, false);
//            // 监听在线消息事件
//            plus.push.addEventListener("receive", function (msg) {
//              if (msg.aps) {  // Apple APNS message
//                outSet("接收到在线APNS消息：");
//              } else {
//                outSet("接收到在线透传消息：");
//              }
//              logoutPushMsg(msg);
//            }, false);
//          })
//        }, false);
//      }
    },
    computed: {
      validateRoute(){
        if (this.$route.path === '/' || this.$route.path === '/login')return false;
        return true;
      }
    },
    components: {
      headerView
    }
  }
</script>
