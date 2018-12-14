<template>
  <div id="app"
       @touchstart="touchstart"
       @touchend="touchend">
    <div class="home_router_container">
      <transition :name="transitionName"
                  :css="cssFlag">
        <navigation>
          <router-view name="HomeRouter"
                       class="Router"></router-view>
        </navigation>
      </transition>
    </div>

    <all-svg></all-svg>

    <loading v-model="isLoading"></loading>
  </div>
</template>

<script>
import { Loading } from 'vux'
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-left',
      isBack: false,
      navigationType: '',
      isTouchMove: false,
      touchMoveTimeout: null,
      initialized: false,
      point: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    },
    cssFlag () {
      if (this.navigationType === 'forward' || this.navigationType === 'back') {
        return !this.isTouchMove
      } else {
        return false
      }
    }
  },
  created () {
    // this.$http.get('http://grayconfig.zhaopin.com/grayconfig/cmsappversion/getVersionGroup').then(({data}) => {
    //   console.log('........', data)
    // })
  },
  mounted () {
    const that = this
    this.$navigation.on('forward', (to, from) => {
      // alert('forward')
      that.navigationType = 'forward'
      that.transitionName = 'slide-left'
    })
    this.$navigation.on('back', (to, from) => {
      // alert('back')
      that.navigationType = 'back'
      that.transitionName = 'slide-right'
    })
  },
  methods: {
    touchstart (e) {
      this.point = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    touchend (e) {
      this.isTouchMove = (Math.abs(e.changedTouches[0].clientX - this.point.x) > Math.abs(e.changedTouches[0].clientY - this.point.y))
      this.point = {
        x: 0,
        y: 0
      }
    }
  },
  watch: {
    '$route' (to, from) {
      if (!from.meta.index || (to.meta.index === from.meta.index)) {
        this.transitionName = ''
      }
      setTimeout(() => {
        this.isTouchMove = false
      }, 1)
    }
  },
  components: {
    AllSvg: () => import('./components/svgs.vue'),
    Loading
  }
}
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
* {
  margin: 0;
  padding: 0;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}
*:not(input, textarea) {
  -webkit-touch-callout: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
html,
body {
  height: 100%;
}
body {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background-color: #fbf9fe;
}
#app {
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #fbf9fe;
}
.home_router_container {
  width: 100%;
  height: 100%;
  /*height: calc(~"100% - 53px");*/
}
a {
  text-decoration: none;
}
.weui-cells:after {
  border-bottom: 1px solid #f5f5f5 !important;
}
.weui-cells:before {
  border-top: none !important;
}

.gap_12 {
  width: 100%;
  height: 12px;
}
.gap_24 {
  width: 100%;
  height: 24px;
}
.gap_30 {
  width: 100%;
  height: 30px;
}
.pen {
  pointer-events: none;
}
.ml8 {
  margin-left: 8px;
}
.custom_active:active {
  opacity: 0.7;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  /*opacity: 0;*/
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  /*opacity: 0;*/
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  /*opacity: 0;*/
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  /*opacity: 0;*/
  transform: translate3d(-100%, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.comment_input .weui-textarea {
  min-height: 36px;
  max-height: 120px;
  padding-top: 7px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /*line-height: 36px;*/
  background-color: transparent;
}

.search_container .weui-search-bar {
  padding: 8px 10px;
  background-color: #ffffff;
}
.search_container .weui-search-bar:after {
  border-bottom: none;
}
.search_container .weui-search-bar:before {
  border-top: none !important;
}
.search_container .weui-search-bar__box .weui-search-bar__input {
  height: 30px;
  /*line-height: 30px;*/
}
.search_container .weui-search-bar__box .weui-icon-search {
  line-height: 30px;
  padding: 4px 0;
}
.search_container .weui-search-bar__box .weui-icon-clear {
  padding: 4px 10px;
}
.search_container .weui-search-bar__label {
  display: flex;
  align-items: center;
  justify-content: center;
}
.search_container .weui-search-bar__cancel-btn {
  line-height: 38px;
}

.weui-tabbar {
  background-color: #ffffff !important;
}
.weui-tabbar:before {
  border-top: none !important;
}
</style>
