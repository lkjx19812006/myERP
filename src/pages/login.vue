<style scoped lang="less">
  @import '../../static/css/base.less';

  .login {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .title {
      margin-top: 50px;
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
      .submit {
        margin-bottom: 50px;
      }
    }
  }
</style>
<template>
  <div class="login">
    <div class="login_wrap">
      <div class="title">
        <h1>{{$t('message.title')}} V1.0</h1>
      </div>
      <div class="item">
        <mu-select-field @change="changeLanguage" v-model="language" fullWidth>
          <mu-menu-item value="zh_CN" title="中文"/>
          <mu-menu-item value="en" title="English"/>
        </mu-select-field>
      </div>
      <div class="item">
        <mu-text-field v-model="username" :hintText="$t('message.userName')" :errorText="msgUser" fullWidth/>
      </div>
      <div class="item">
        <mu-text-field v-model="password" :hintText="$t('message.passWord')" type="password" :errorText="msgPWS"
                       fullWidth/>
      </div>
      <div class="item submit">
        <mu-raised-button @click="submit" :label="$t('message.submit')" class="demo-raised-button" primary
                          fullWidth/>
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
        username: '',
        msgUser: '',
        password: '',
        msgPWS: '',
      }
    },
    computed: {
      language(){
        //设置默认 语言环境
        if (common.language) {
          this.$root.$i18n.locale = common.language;
          return common.language;
        }
        this.$root.$i18n.locale = 'zh_CN';
        return 'zh_CN';
      }
    },
    methods: {
      changeLanguage(val){
        //写入本地 进行全局切换 保存全局语言环境配置
        switch (val) {
          case 'zh_CN':
            window.localStorage.language = 'zh_CN';
            common.language = 'zh_CN';
            this.$root.$i18n.locale = 'zh_CN';
            break;
          case 'en':
            window.localStorage.language = 'en';
            common.language = 'en';
            this.$root.$i18n.locale = 'en'
            break;
        }
      },
      submit(){
        //校验用户名和用户密码
        if (this.username === '' || this.password === '') {
          this.msgUser = this.username === '' ? this.$t('message.account_or_password') : '';
          this.msgPWS = this.password === '' ? this.$t('message.account_or_password') : '';
          return;
        }
        //提交数据
        let _self = this;
        //登录信息
        var body = {
          biz_param: {
            no: this.username,
            password: this.password
          }
        }
        //登录地址
        var url = common.urlCommon + common.apiUrl.login;
        let loading = this.$loading(true);
        common.commonPost(url, body).then((response) => {
          window.localStorage.KEY = response.biz_result.KEY;
          window.localStorage.SID = response.biz_result.SID;
          common.KEY = window.localStorage.KEY;
          common.SID = window.localStorage.SID;
          //导航列表权限
          //window.localStorage.menus = JSON.stringify(response.biz_result.menus);
          //common.menus = filterMenus(JSON.parse(window.localStorage.menus));
          _self.setCookie('KEY', common.KEY);
          _self.setCookie('SID', common.SID);
          common.getDate(
            function () {
              let url = common.urlCommon + common.apiUrl.most
              let body = {
                biz_module: 'userService',
                biz_method: 'getCmsUserInfo'
              }
              _self.$store.dispatch('getUserInfor', {
                body: body,
                path: url
              }).then(() => {
                //成功跳转
                loading.visible = false;
                _self.$router.push('/home');
              }, () => {
                loading.visible = false;
                _self.$router.push('/login');
              });
            }
          );
        }, (err) => {
          loading.visible = false;
          //登录出错时的信息
          this.$message({
            type: 'error',
            message: err.msg
          });
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
