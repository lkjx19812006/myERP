<style lang="less" scoped>
  @import '../../assets/css/base.less';

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
        text-align: center;
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
    <mu-drawer :docked="false" width="200px" right :open="open" @close="close">
      <mu-appbar class="userTitle" title="用户信息"/>
      <mu-list>
        <mu-paper class="demo-paper" circle :zDepth="4">
          <img src="../../assets/images/userImg.png">
        </mu-paper>
        <div class="item">
          <span class="tit">姓名：</span>
          <span class="info">{{user.name}}</span>
        </div>
        <mu-divider shallowInset/>
        <div class="item">
          <span class="tit">职位：</span>
          <span class="info">{{user.position}}</span>
        </div>
        <mu-divider shallowInset/>
        <div class="item">
          <span class="tit">手机：</span>
          <span class="info">{{user.mobile}}</span>
        </div>
        <mu-divider shallowInset/>
        <div class="item btn">
          <mu-raised-button v-show="false" label="修改信息" class="demo-raised-button" primary fullWidth/>
          <mu-raised-button v-show="false" label="修改密码" class="demo-raised-button" primary fullWidth/>
          <mu-raised-button @click="showDialog" label="退出登录" class="demo-raised-button" primary fullWidth>
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
      }
    },
    data () {
      return {}
    },
    methods: {
      close () {
        this.$emit('closeUser')
      },
      showDialog(){
        this.$emit('closeUser')
        this.$dialog('确定退出登录？').then(() => {
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
