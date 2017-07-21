<style lang="less" scoped>
  .pagination {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .mu-flat-button {
      flex: 0 0 auto;
    }
    .select {
      flex: 1;
      text-align: center;
      margin: 0;
      margin-top: 8px;
      .mu-text-field-content {
        padding: 0;
      }
      .item {
        padding: 0 10px;
      }
    }

  }
</style>
<template>
  <div class="pagination">
    <mu-flat-button :disabled="page === 1" @click="prePage" label="上一页" class="demo-flat-button" icon="chevron_left"
                    primary/>
    <mu-select-field @change="selectChange" v-model="page" class="select" :maxHeight="200">
      <mu-menu-item class="item" v-for="item, index in list" :key="index" :title="item.title" :value="item.page"/>
    </mu-select-field>
    <mu-flat-button :disabled="page === total" @click="nextPage" label="下一页" class="demo-flat-button"
                    labelPosition="before"
                    icon="chevron_right" primary/>
  </div>
</template>
<script>
  export default {
    //该组件接收两个属性 总数 和改变的page 函数
    props: {
      total: {
        type: Number,
        default: 1
      },
      pageChange: ''
    },
    computed: {
      list(){
        //定义当前选择的值
        let arr = [];
        if (this.total === 0)  return [{page: 1, title: '第1页'}];
        //小于5时 都返回1-10页
        let total = 10; //每次走10页
        let count = 1; // 从1开始计数
        //当前页 大于5时 要截取遍历的数字
        if (this.page > 5) {
          count = this.page - 5;
          let nowNum = this.page + 4;
          total = nowNum > this.total ? this.total : nowNum;
        }

        //处理数据 每次只截取当前页的前后10页的数据作为展示 全部展示太慢
        for (let i = count - 1; i < total; i++) {
          let obj = {
            page: i + 1,
            title: (i + 1) + '/' + this.total + '页'
          }
          arr.push(obj);
        }
        return arr;
      }
    },
    data(){
      return {
        page: 1,//默认当前页为第一页
      }
    },
    methods: {
      //选择时改变
      selectChange(val){
        this.senParent(val);
      },
      //上一页
      prePage(){
        this.page = this.page - 1;
        this.senParent(this.page);
      },
      //下一页
      nextPage(){
        this.page = this.page + 1;
        this.senParent(this.page);
      },
      //发送信息个父组件
      senParent(val){
        this.$emit('pageChange', val);
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
    }
  }
</script>
