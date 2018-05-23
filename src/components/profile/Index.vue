<template>
  <div class="profile_container">
    个人中心
    <x-button type="primary" text="登录" @click.native="navToLogin"></x-button>
  </div>
</template>
<style scoped>
  .profile_container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
<script>
  import { XButton } from 'vux'
  export default {
    name: 'ProfileIndex',
    data () {
      return {}
    },
    methods: {
      navToLogin () {
        this.$router.push({
          name: 'Login'
        })
      }
    },
    components: {
      XButton
    }
  }
</script>
