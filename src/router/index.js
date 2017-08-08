import Vue from 'vue';
import vueRouter from 'vue-router';
Vue.use(vueRouter);

//配置路由
let routes = [{
  path: '*',
  component: resolve => require(['../pages/login.vue'], resolve)
}, {
  path: '/',
  component: resolve => require(['../pages/login.vue'], resolve)
}, {
  path: '/login',
  component: resolve => require(['../pages/login.vue'], resolve)
}, {
  path: '/home',
  component: resolve => require(['../pages/home.vue'], resolve)
},{
  path: '/purchase/example',
  component: resolve => require(['../pages/purchase/example.vue'], resolve)
},{
  path: '/purchase/example2',
  component: resolve => require(['../pages/purchase/example2.vue'], resolve)
}, {
  path: '/purchase/myUserOffer',
  component: resolve => require(['../pages/purchase/myUserOffer.vue'], resolve)
},{
  path: '/purchase/myReceivedOffer',
  component: resolve => require(['../pages/purchase/myReceivedOffer.vue'], resolve)
}]
var router = new vueRouter({
  mode: 'history',
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true,
  linkActiveClass: "myactive",
  routes: routes
});

export default router;
