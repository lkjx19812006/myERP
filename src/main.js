import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'
import store from './store/index.js'
import * as filters from './filters/index.js'

//国际化
import i18n from './i18n/index'

//注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css'


Vue.use(MuseUI)

import message  from './commonCOM/message/message'
import loading  from './commonCOM/loading/loading'
import showImg  from './commonCOM/showImg/showImg'
import dialog from './commonCOM/dialog/dialog'
//原型扩展 全局方法
Vue.prototype.$message = message;
Vue.prototype.$loading = loading;
Vue.prototype.$showImg = showImg;
Vue.prototype.$dialog = dialog;

import './assets/iconfont/iconfont.css'
import './assets/css/base.less'
import './assets/css/main.css'

var app = new Vue({
  el: '#app', //html中的根元素的ID
  // render: function(create){return create(App)}
  i18n,
  store,
  render: create => create(App), //渲染组件App
  //实例路由 实现按需加载
  router: router,
})
