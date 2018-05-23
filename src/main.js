// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store'
import App from './App'
import * as filters from './filters'
import mixins from './mixins'
import VueNavigation from 'vue-navigation'
import utils from './utils/index'
import { WechatPlugin, AjaxPlugin, ToastPlugin } from 'vux'

Vue.use(WechatPlugin)

Vue.use(AjaxPlugin)

Vue.use(ToastPlugin, { width: 'auto' })

sync(store, router)

Vue.use(VueNavigation, {router, store, moduleName: 'navigation', keyName: 'rqq'})

router.beforeEach((to, from, next) => {
  // store.commit('UPDATE_LOADING_STATUS', {isLoading: true})
  // const _state = router.app.$options.store.state
  if (to.meta && to.meta.title) {
    utils.kit.title(to.meta.title)
  }
  // if (to.name !== 'Login') {
  //   next({
  //     replace: true,
  //     name: 'Login'
  //   })
  // }
  next()
})

router.afterEach(to => {
  setTimeout(() => {
    // store.commit('UPDATE_LOADING_STATUS', {isLoading: false})
  }, 800)
})

FastClick.attach(document.body)

Vue.config.productionTip = false

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
