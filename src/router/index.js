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
}, {
  path: '/purchase/myUserOffer',
  component: resolve => require(['../pages/purchase/myUserOffer.vue'], resolve)
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
//百度统计pv
// router.afterEach(route => {
//     _hmt.push(['_trackPageview', route.path]);
// });
// router.beforeEach((to, from, next) => {
//   // ...
//   console.log(to, from);
// })
// router.beforeEach((to, from, next) => {
//     console.log(to, from);
//     let toPath = to.path
//     let fromPath = from.path
//     console.log(`to: ${toPath} from: ${fromPath}`)
//     if (toPath.replace(/[^/]/g, '').length > 1) {
//         router.app.isIndex = false
//     } else {
//         let depath = toPath === '/' || toPath === '/invite' || toPath === '/rank'
//         router.app.isIndex = depath ? 0 : 1
//     }
//     next()
// })

export default router;
