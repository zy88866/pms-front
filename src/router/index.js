import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =new Router({
  mode: 'history', //后端支持可开
  routes: [
  {
      path:'/',
      name: 'Layout',
      component: resolve => require(['@/pages/layout/Layout.vue'], resolve)
    },
  {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/pages/login'],resolve)
    }
  //   {
  //     path: '*', //当路由不匹配时跳转
  //     redirect: '/404'
  // }
  ]
})

   // 在渲染该组件的对应路由被 confirm 前调用
router.beforeEach((to,from,next) =>{
  if(sessionStorage.getItem("token")!==null || to.path==="/login"){
      next();
  }else{
    next({
      path: '/login',
      query: {redirect: to.fullpath}
    })
  }
})

// const routers = [ {
//   path: '/home1',
//   name: 'Login',
//   component: Login,
//   meta:{
//       title: '登陆',
//       icon: 'logo'
//   }
// }]
// router.addRoutes(routers)
export default router;


