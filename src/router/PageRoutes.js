export default [
  {
    path: '/index',
    redirect: '/articles'
  },
  {
    path: '/news',
    name: 'NewsIndex',
    meta: {
      title: '新闻',
      index: 1
    },
    components: {
      ContentRouter: () => import('../components/pages/news/Index.vue')
    }
  },
  {
    path: '/articles',
    name: 'ArticlesIndex',
    meta: {
      title: '文章列表',
      index: 1
    },
    components: {
      ContentRouter: () => import('../components/pages/articles/Index.vue')
    }
  },
  {
    path: '/profile',
    name: 'ProfileIndex',
    meta: {
      title: '个人中心',
      index: 1
    },
    components: {
      ContentRouter: () => import('../components/pages/profile/Index.vue')
    }
  }
]
