<style lang="less" scoped>
</style>
<template>
  <div class="dialog_wrap">
    <mu-dialog :open="dialog" :title="title" @close="close">
      {{message}}
      <mu-flat-button slot="actions" @click="click(false)" primary label="取消" v-if="type !== 'alert'"/>
      <mu-flat-button slot="actions" primary @click="click(true)" label="确定"/>
    </mu-dialog>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        type: 'cofirm',
        message: '',
        dialog: true,
        title: '提示信息',
        selected: '',
      }
    },
    watch: {
      dialog(newVal){
        if (!newVal) {
          this.$el.parentNode.removeChild(this.$el)
        }
      }
    },
    methods: {
      open () {
        this.dialog = true
      },
      click (val) {
        this.selected = val;
        this.dialog = false
      },
      close(){
        if (this.type !== 'alert') {
          this.dialog = false
        }
      }
    }
  }
</script>
