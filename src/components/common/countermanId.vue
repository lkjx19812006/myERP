<style scoped lang="less">
  .appbar-search-field {
    margin-top: 20px;
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

  .cancel {
    height: 100%;
  }

  .list-enter-active {
    transition: all .6s;
  }

  .list-enter {
    transform: translate3d(480px, 0, 0);
  }
</style>
<template>
  <slidePage class="countermanId">
    <mu-appbar slot="header" class="header">
      <mu-icon-button slot="left" @click="subStep">
        <i class="iconfont icon-zuoyoujiantouicon-defuben1 fz16"></i>
      </mu-icon-button>
      <div class="search">
        <mu-text-field class="appbar-search-field"
                       :hintText="$t('message.enter_salesman')"
                       hintTextClass="hintTextClass"
                       inputClass="inputClass"
                       fullWidth/>
      </div>
      <!--取消按钮-->
      <div class="cancel" slot="right">
        <mu-flat-button slot="cancel" color="white" :label="$t('message.cancel')"/>
      </div>
    </mu-appbar>
    <div slot="content">
      <transition-group name="list" tag="div">
        <div class="item" v-for="item,index in listData" :key="item.id">
          <div class="detail" @click="nextStep({nowData:item.lowerList,item:item})">
            <span>{{item.name}}</span>
            <span v-show="item.lowerList.length > 0"><i class="iconfont icon-zuoyoujiantouicon-defuben fz14"></i></span>
          </div>
          <mu-divider/>
        </div>
      </transition-group>
    </div>
  </slidePage>
</template>
<script>
  import slidePage from './slidePage.vue'
  import common from '../../common/httpService'
  export default{
    props: {
      before: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        listData: [],
        stepArr: []
      }
    },
    components: {
      slidePage
    },
    mounted(){
      this.getCountermanList();
    },
    methods: {
      getCountermanList(){
        function countList() {
        }

        let url = common.urlCommon + common.apiUrl.most;
        let body = {
          biz_module: 'orgService',
          biz_method: 'queryOrgList'
        };
        common.commonPost(url, body).then((suc) => {
          this.listData = suc.biz_result.list[0].lowerList
          this.stepArr.push(this.listData)
        }, (err) => {
        })
      },
      nextStep(obj){
        if (obj.nowData.length > 0 && !this.before) {
          this.listData = obj.nowData
          this.stepArr.push(obj.nowData)
        } else {
          this.$emit('selected', obj.item)
        }
      },
      subStep(){
        if (this.stepArr.length >= 2) {
          this.listData = this.stepArr[this.stepArr.length - 2];
          this.stepArr.pop()
        } else {
          this.$router.back()
        }
      }
    },
  }
</script>
