<style scoped lang="less">
  @import '../assets/css/base.less';

  .login {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .title {
      margin-bottom: 50px;
      h1 {
        text-align: center;
        padding: 0;
        margin: 0;
        font-size: 20px;
        margin-top: 15px;
        color: @color;
      }
    }
    .login_wrap {
      flex: 0 0 100%;
      padding: 0 25px;
      .item {
        margin-bottom: 20px;
      }
    }
  }
</style>
<template>
  <div class="login">
    <div class="login_wrap">
      <div class="title">
        <h1>药材买卖网移动ERP V1.0</h1>
      </div>
      <div class="item">
        <mu-select-field v-model="langType" fullWidth>
          <mu-menu-item :value="1" title="中文"/>
          <mu-menu-item :value="2" title="English"/>
        </mu-select-field>
      </div>
      <div class="item">
        <mu-text-field v-model="username" hintText="请输入用户名称" :errorText="msgUser" fullWidth/>
      </div>
      <div class="item">
        <mu-text-field v-model="password" hintText="请输入用户密码" type="password" :errorText="msgPWS" fullWidth/>
      </div>
      <div class="item">
        <mu-raised-button @click="submit" label="登录" class="demo-raised-button" primary fullWidth/>
      </div>
    </div>
  </div>
</template>
<script>
  import common from '../common/httpService.js'
  export default {
    name: 'login_view',
    data() {
      return {
        langType: 1,
        username: '',
        msgUser: '',
        password: '',
        msgPWS: '',
      }
    },
    methods: {
      submit(){
        let loading = this.$loading(true);
        //校验用户名和用户密码
        if (this.username === '' || this.password === '') {
          this.msgUser = this.username === '' ? '请输入用户名' : '';
          this.msgPWS = this.password === '' ? '请输入用户密码' : '';
          return;
        }
        //提交数据
        let _self = this;
        this.$store.dispatch('login', {
          body: {
            biz_param: {
              no: this.username,
              password: this.password
            }
          },
          path: common.urlCommon + common.apiUrl.login
        }).then((response) => {
          window.localStorage.KEY = response.biz_result.KEY;
          window.localStorage.SID = response.biz_result.SID;
          window.localStorage.menus = JSON.stringify(response.biz_result.menus);
          common.KEY = window.localStorage.KEY;
          common.SID = window.localStorage.SID;
          //导航列表权限
//          common.menus = filterMenus(JSON.parse(window.localStorage.menus));
          _self.setCookie('KEY', common.KEY);
          _self.setCookie('SID', common.SID);
          common.getDate(
            function () {
              let url = common.urlCommon + common.apiUrl.most
              let body = {
                biz_module: 'userService',
                biz_method: 'getCmsUserInfo'
              }
              url = common.addSID(url);
              body.version = 1;
              body.time = Date.parse(new Date()) + parseInt(common.difTime);
              body.sign = common.getSign('biz_module=' + body.biz_module + '&biz_method=' + body.biz_method + '&time=' + body.time);
              _self.$store.dispatch('getUserInfor', {
                body: body,
                path: url
              }).then(() => {
                loading.visible = false;
                _self.$router.push('/home');
              }, () => {
              });
            }
          );
        }, (err) => {

        });
      },
      clearCookie(name) {
        this.setCookies(name, "", -1);
      },
      getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1);
          if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
      },
      setCookie(name, value) {
        var Days = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + "; path=/";
      },
    }
  }
</script>
