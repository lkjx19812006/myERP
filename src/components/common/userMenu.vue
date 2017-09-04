<style lang="less" scoped>
  @import '../../../static/css/base.less';

  .userInfo {
    .userTitle {
      text-align: center;
    }
    .demo-paper {
      height: 80px;
      width: 80px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin: 10px auto;
    }
    .item {
      padding: 0 20px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      font-size: 16px;
      margin-top: 15px;
      .tit {
        flex: 0 0 auto;
        width: 80px;
        text-align: left;
        color: @color;
      }
      .info {
        flex: 1;
        text-align: center;
      }
      .mu-raised-button {
        margin-top: 15px;
      }
    }
    .btn {
      flex-direction: column;
    }
  }
</style>
<template>
  <div class="userInfo">
    <mu-drawer :docked="false" width="240px" right :open="open" @close="close">
      <mu-appbar class="userTitle" :title="$t('message.userInfo')"/>
      <mu-list>
        <mu-paper class="demo-paper" circle :zDepth="4">
          <img src="../../../static/images/userImg.png">
        </mu-paper>
        <div class="item">
          <mu-select-field @change="changeLanguage" v-model="language" fullWidth>
            <mu-menu-item value="zh_CN" title="中文"/>
            <mu-menu-item value="en" title="English"/>
          </mu-select-field>
        </div>
        <div class="item">
          <span class="tit">{{$t('message.userName')}}：</span>
          <span class="info">{{user.name}}</span>
        </div>
        <mu-divider shallowInset/>
        <div class="item">
          <span class="tit">{{$t('message.job')}}：</span>
          <span class="info">{{user.position}}</span>
        </div>
        <mu-divider shallowInset/>
        <div class="item">
          <span class="tit">{{$t('message.mobile')}}：</span>
          <span class="info">{{user.mobile}}</span>
        </div>
        <mu-divider shallowInset/>
        <div class="item btn">
          <mu-raised-button v-show="false" label="修改信息" class="demo-raised-button" primary fullWidth/>
          <mu-raised-button v-show="false" label="修改密码" class="demo-raised-button" primary fullWidth/>
          <mu-raised-button @click="showDialog" :label="$t('message.logout')" class="demo-raised-button" primary
                            fullWidth>
            <i class="iconfont icon-guanbi"></i>
          </mu-raised-button>
        </div>
      </mu-list>
    </mu-drawer>

  </div>
</template>

<script>
  import common from '../../common/httpService'
  export default {
    props: {
      open: '',
    },
    computed: {
      user(){
        return this.$store.state.user.user;
      },
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
    data () {
      return {}
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
      close () {
        this.$emit('closeUser')
      },
      showDialog(){
        this.$emit('closeUser')
        this.$dialog(this.$t('message.logout') + '?').then(() => {
          window.localStorage.KEY = '';
          window.localStorage.SID = '';
          common.KEY = '';
          common.SID = '';
          this.$router.push('/login');
        }).catch(() => {

        })
      }
    }
  }
</script>
