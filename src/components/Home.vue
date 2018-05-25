<template>
  <div class="home_container">
    <div style="height: 100%;" body-padding-bottom="53px">
      <!--<ls-scroll class="main_scroll_container" :options="scrollOptions">-->
        <router-view name="ContentRouter"></router-view>
      <!--</ls-scroll>-->
      <div class="bottom_tabbars_container" slot="bottom">
        <main-tabbars></main-tabbars>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .home_container {
    width: 100%;
    height: 100%;
  }
  .main_scroll_container {
    width: 100%;
    height: 100%;
  }
  .bottom_tabbars_container {
    width: 100%;
    height: 53px;
  }
</style>
<script>
  import { ViewBox } from 'vux'
  export default {
    name: 'Home',
    data () {
      return {
        scrollOptions: {
          scrollbar: false
        }
      }
    },
    components: {
      MainTabbars: () => import('./MainTabbars.vue'),
      LsScroll: () => import('./plugins/LsScroll/LsScroll.vue'),
      ViewBox
    }
  }
</script>
