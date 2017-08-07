<style lang="less" scoped>
  .address {
    .header {
      text-align: center;
      font-size: 16px;
      .cancel {
        height: 100%;
      }
    }
    .item {
      .detail {
        padding: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .list-enter-active {
    transition: all .3s;
  }

  .list-enter {
    opacity: 0;
    transform: translate3d(480px, 0, 0);
  }
</style>
<template>
  <slidePage ref="slide" class="address">
    <mu-appbar slot="header" class="header" title="选择地区">
      <div class="back" slot="left">
        <mu-icon-button @click="subStep">
          <i class="iconfont icon-zuoyoujiantouicon-defuben1 fz16"></i>
        </mu-icon-button>
      </div>
      <!--取消按钮-->
      <div class="cancel" slot="right">
        <mu-flat-button slot="cancel" color="white" :label="$t('message.confirm')"/>
      </div>
    </mu-appbar>
    <div slot="content">
      <transition-group name="list" tag="div">
        <div class="item" v-for="item in nowStep" :key="item">
          <div class="detail" @click="addStep">
            <span>{{item}}</span>
            <span><i class="iconfont icon-zuoyoujiantouicon-defuben fz14"></i></span>
          </div>
          <mu-divider/>
        </div>
      </transition-group>
    </div>
  </slidePage>
</template>
<script>
  import slidePage from './slidePage.vue'
  let step1 = ['1', '2', '3', '4', '5']
  export default {
    data(){
      return {
        step1: ['1', '2', '3', '4', '5'],
        step2: ['1-1', '2-1', '3-1', '4-1', '5-1'],
        step3: ['1-1-1', '2-1-1', '3-1-1', '4-1-1', '5-1-1'],
        step4: ['1-1-1-1', '2-1-1-1', '3-1-1-1', '4-1-1-1', '5-1-1-1'],
        step5: ['1-1-1-1-1', '2-1-1-1-1', '3-1-1-1-1', '4-1-1-1-1', '5-1-1-1-1'],
        step: 1,
        nowStep: step1
      }
    },
    components: {
      slidePage
    },
    mounted(){
    },
    methods: {
      subStep(){
        this.step--;
        if (this.step >= 1) {
          this.countStep();
        } else {
          this.$router.back()
          this.step = 1
        }
      },
      addStep(){
        if (this.step < 5) {
          this.step++;
          this.countStep();
        }
      },
      countStep(){
        switch (this.step) {
          case 0:
            break;
          case 1:
            this.nowStep = this.step1;
            break;
          case 2:
            this.nowStep = this.step2;
            break;
          case 3:
            this.nowStep = this.step3;
            break;
          case 4:
            this.nowStep = this.step4;
            break;
          case 5:
            this.nowStep = this.step5;
            break;
        }
      }
    }

  }
</script>
