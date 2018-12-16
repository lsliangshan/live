export default [
  {
    path: '/profile/detail',
    name: 'ProfileDetail',
    meta: {
      title: '个人信息',
      index: 2
    },
    components: {
      HomeRouter: () => import('../components/pages/profile/detail/Index.vue')
    }
  }
]
