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

var app = new Vue({
  el: '#app', //html中的根元素的ID
  // render: function(create){return create(App)}
  store,
  render: create => create(App), //渲染组件App
  //实例路由 实现按需加载
  router: router,
})
