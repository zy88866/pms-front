import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/index.vue'

Vue.use(Router)

const router =new Router({
  mode: 'history', //后端支持可开
  routes: [
  {
      path:'/',
      name: 'Layout',
      component: resolve => require(['@/pages/layout/Layout.vue'], resolve),
    },
  //   {
  //     path: '*', //当路由不匹配时跳转
  //     redirect: '/404'
  // }
  ]
})

   // 在渲染该组件的对应路由被 confirm 前调用
router.beforeEach((to,from,next) =>{
    console.log(to);
    console.log(from);
    if(to.path!=="/home1"){
        next({
          path: '/home1',
          query: {redirect: to.fullpath}
        })
    }else{
      next();
    }
})

const routers = [ {
  path: '/home1',
  name: 'Login',
  component: Login,
  meta:{
      title: '登陆',
      icon: 'logo'
  }
}]
router.addRoutes(routers)
export default router;


