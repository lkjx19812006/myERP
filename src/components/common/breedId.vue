<style lang="less" scoped>
  @import '../../assets/css/base.less';

  .appbar-search-field {
    margin-top: 20px;
  }

  .cancel {
    height: 100%;
  }

  .item_wrap {
    font-size: 16px;
    padding: 8px;
    background-color: #f0f0f0;
    .item {
      margin-bottom: 10px;
      padding: 5px 10px;
      border-radius: 2px;
      .detail {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        .tit {
          flex: 0 0 auto;
          width: 130px;
          color: #333;
        }
        .info {
          flex: 1;
          color: #666;
        }

      }
    }
    .itemActive {
      background-color: @color;
      .detail {
        .tit, .info {
          color: #fff;
        }
      }
    }
  }

  .list-enter-active, .list-leave-active {
    transition: all .3s;
  }

  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translate3d(0, 30px, 0);
  }
</style>
<template>
  <slidePage class="breedId">
    <mu-appbar slot="header" class="header">
      <div class="close" slot="left">
        <slot name="close"></slot>
      </div>
      <div class="search">
        <mu-text-field class="appbar-search-field"
                       :hintText="$t('message.please_enter_the_breedName')"
                       hintTextClass="hintTextClass"
                       inputClass="inputClass"
                       fullWidth
                       @input="getBreedList"
                       v-model="keyWord"
        />
      </div>
      <!--取消按钮-->
      <div class="cancel" slot="right">
        <mu-flat-button @click="clear()" slot="cancel" color="white" :label="$t('message.cancel')"/>
      </div>
    </mu-appbar>
    <div class="item_wrap" slot="content">
      <transition-group name="list" tag="div" v-if="breedList.length > 0">
        <mu-paper v-for="item in breedList" :key="item.breedId" :zDepth="2">
          <div class="item" :class="{'itemActive':item.show}" @click="selected(item)">
            <div class="detail">
              <span class="tit">品名：</span>
              <span class="info">{{item.breedName}}</span>
            </div>
            <div class="detail">
              <span class="tit">English Name：</span>
              <span class="info">{{item.ename}}</span>
            </div>
          </div>
        </mu-paper>
      </transition-group>
    </div>
  </slidePage>
</template>
<script>
  import common from '../../common/httpService'
  import slidePage from './slidePage.vue'
  export default {
    data(){
      return {
        timer: '',
        keyWord: '',
        breedList: []
      }
    },
    components: {
      slidePage
    },
    methods: {
      //取消按钮 清除搜索框
      clear(){
        this.keyWord = '';
        this.breedList = [];
      },
      //选中的项目
      selected(item){
        this.breedList.forEach((item) => {
          item.show = false;
        })
        item.show = true;
        this.$emit('getBreedId', item);
      },
      //关键字获取品名
      getBreedList(keyWord){
        let pattern = /^[A-Za-z\u4e00-\u9fa5]+$/;
        if (!pattern.test(keyWord)) {
          return;
        }
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          common.commonPost(common.urlCommon + common.apiUrl.most, {
            biz_module: 'searchKeywordService',
            biz_method: 'querySearchKeywordBreed',
            biz_param: {
              keyWord: keyWord,
              pn: 1,
              pSize: 20
            }
          }).then((suc) => {
            suc.biz_result.list.forEach((item) => {
              item.show = false;
            })
            this.breedList = suc.biz_result.list;
          }).catch((err) => {
            this.breedList = [];
          });
        }, 300);
      }
    }
  }
</script>
