import Vue from 'vue'
import App from './App.vue'

import router from './router/index.js'
import store from './store/index.js'
import * as filters from './filters/index.js'

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
//原型扩展 全局方法 message
Vue.prototype.$message = message;

Vue.prototype.$loading = loading;

Vue.prototype.$showImg = showImg;

import './assets/iconfont/iconfont.css'
import './assets/css/main.css'

var app = new Vue({
  el: '#app', //html中的根元素的ID
  // render: function(create){return create(App)}
  store,
  render: create => create(App), //渲染组件App
  //实例路由 实现按需加载
  router: router,
})
