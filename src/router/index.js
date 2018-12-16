import Vue from 'vue'
import Router from 'vue-router'
import PageRoutes from './PageRoutes.js'
import FullPageRoutes from './FullPageRoutes.js'

Vue.use(Router)

export const HomeRoutes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '首页'
    },
    components: {
      HomeRouter: () => import('../components/Home.vue')
    },
    redirect: '/index',
    children: PageRoutes
  },
  ...FullPageRoutes
]

export const LoginRouter = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      index: 9
    },
    components: {
      HomeRouter: () => import('../components/pages/login/Index.vue')
    }
  }
]

export const page404 = {
  path: '/*',
  name: 'NotFound',
  meta: {
    title: 'oooooooops...',
    index: 9
  },
  components: {
    HomeRouter: () => import('../components/pages/error/404.vue')
  }
}

export default new Router({
  mode: 'history',
  routes: [...HomeRoutes, ...LoginRouter, page404]
})
