<template>
  <div class="home_container">
    <div class="main_scroll_container">
      <!--<ls-scroll class="main_scroll_container" :options="scrollOptions">-->
      <keep-alive>
        <transition name="content-router-transition"
                    enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
          <router-view class="content_router"
                       :key="$route.pathname"
                       name="ContentRouter"></router-view>
        </transition>
      </keep-alive>
      <!--<router-view name="ContentRouter" v-if="!$route.meta.keepAlive"></router-view>-->
      <!--</ls-scroll>-->

    </div>
    <div class="bottom_tabbars_container"
         slot="bottom">
      <main-tabbars></main-tabbars>
    </div>
  </div>
</template>
<style scoped lang="less">
.home_container {
  width: 100%;
  height: 100%;
}
.main_scroll_container {
  width: 100%;
  height: calc(~"100% - 51px");
}
.bottom_tabbars_container {
  width: 100%;
  height: 53px;
  box-sizing: border-box;
  border-top: 1px solid #f0f0f0;
  background-color: transparent;
}
</style>
<script>
export default {
  name: 'home',
  components: {
    MainTabbars: () => import('./MainTabbars.vue')
  },
  data () {
    return {}
  }
}
</script>
