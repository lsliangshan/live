import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const ProfilePages = [
  {
    path: '/profile/detail',
    name: 'ProfileDetail',
    meta: {
      title: '个人信息',
      index: 2
    },
    components: {
      HomeRouter: () => import('../components/profile/Detail.vue')
    }
  },
  {
    path: '/profile/detail/headicon',
    name: 'DetailHeadIcon',
    meta: {
      title: '头像',
      index: 3
    },
    components: {
      HomeRouter: () => import('../components/profile/detail/HeadIcon.vue')
    }
  }
]

export const HomeRouter = {
  path: '/',
  name: 'Home',
  meta: {
    title: 'experiences',
    index: 1
  },
  components: {
    HomeRouter: () => import('../components/Home.vue')
  },
  children: [
    {
      path: '/publish',
      redirect: '/publish/index'
    },
    {
      path: '/publish/index',
      name: 'PublishIndex',
      meta: {
        title: '发布经验',
        index: 1
      },
      components: {
        ContentRouter: () => import('../components/publish/Index.vue')
      }
    },
    {
      path: '/article',
      redirect: '/article/index'
    },
    {
      path: '/article/index',
      name: 'ArticleIndex',
      meta: {
        title: '经验列表',
        index: 1
      },
      components: {
        ContentRouter: () => import('../components/article/Index.vue')
      }
    },
    {
      path: '/profile',
      redirect: '/profile/index'
    },
    {
      path: '/profile/index',
      name: 'ProfileIndex',
      meta: {
        title: '个人中心',
        index: 1
      },
      components: {
        ContentRouter: () => import('../components/profile/Index.vue')
      }
    }
  ]
}

export const LoginRouter = [
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      index: 9
    },
    components: {
      HomeRouter: () => import('../components/pages/Login.vue')
    }
  }
]

export const page404 = {
  path: '/*',
  name: 'NotFound',
  meta: {
    title: 'oooooooops...'
  },
  components: {
    HomeRouter: () => import('../components/pages/P404.vue')
  }
}

export default new Router({
  mode: 'history',
  routes: [
    HomeRouter,
    ...ProfilePages,
    ...LoginRouter,
    page404
  ]
})
