<template>
  <div class="publish_container">
    <div class="publish_inner" :class="{unlogin: !loginInfo.token}">
      发布文章
    </div>

    <transition name="fade">
      <div class="unlogin_mask_container" v-if="pageLoaded && !loginInfo.token">
        <p>未登录不能发布新文章</p>
        <div class="btns">
          <a class="goto_login_btn" href="javascript: void(0)" @click="gotoLogin">登录</a>
          <a class="goto_registry_btn" href="javascript: void(0)" @click="gotoRegistry">注册</a>
        </div>
      </div>
    </transition>
  </div>
</template>
<style scoped lang="less">
  .publish_container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .publish_inner {
    width: 100%;
    height: 100%;
    background-color: darkcyan;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .publish_inner.unlogin {
    filter: blur(2px);
  }

  .unlogin_mask_container {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #f5f5f5;
    transition-delay: .4s;
  }
  .btns {
    margin-top: 15px;
  }
  .goto_registry_btn, .goto_login_btn {
    color: @tabbar-text-active-color;
    margin: 0 10px;
  }
</style>
<script>
  import { XButton } from 'vux'
  export default {
    name: 'PublishIndex',
    data () {
      return {
        pageLoaded: false
      }
    },
    computed: {
      loginInfo () {
        return this.$store.state.loginInfo
      }
    },
    created () {
      this.$nextTick(() => {
        this.pageLoaded = true
      })
    },
    methods: {
      gotoLogin () {
        this.pageLoaded = false
        this.$router.push({
          name: 'Login'
        })
      },
      gotoRegistry () {
        this.pageLoaded = false
        this.$router.push({
          name: 'Login',
          query: {
            t: 'r'
          }
        })
      }
    },
    watch: {
      '$route' (val) {
        if (val.name === 'PublishIndex') {
          this.pageLoaded = true
        }
      }
    },
    components: {
      XButton
    }
  }
</script>
