<template>
  <div class="login_container" :style="{backgroundImage: 'url(' + appSettings.bg + ')'}">
    <div class="login_form_container">
      <group gutter="0px" class="login_form_inner">
        <div class="login_form_header">登录</div>
        <div class="gap_12"></div>
        <x-input type="text" label-width="70px"
                 title="用户名"
                 placeholder="请输入用户名"
                 required
                 class="login_input"
                 v-model="loginFormData.username"
                 @on-click-error-icon="showError"
        ></x-input>
        <x-input type="password" label-width="70px"
                 title="密码"
                 placeholder="请输入密码"
                 required
                 class="login_input"
                 v-model="loginFormData.password"
                 @on-click-error-icon="showError"
        ></x-input>

        <div class="gap_24"></div>

        <x-button type="primary" text="登录"></x-button>

        <div class="gap_12"></div>

        <div class="bottom_tips_container">
          <span>忘记密码</span>
          <span>还没有账号？去注册</span>
        </div>
      </group>
    </div>
  </div>
</template>
<style scoped>
  .gap_12 {
    width: 100%;
    height: 12px;
  }
  .gap_24 {
    width: 100%;
    height: 24px;
  }
  .login_container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-size: cover;
    background-attachment: fixed;
    background-position: 50% 50%;
  }
  .login_form_container {
    position: absolute;
    width: 90%;
    /*height: 200px;*/
    top: 100px;
    /*left: 5%;*/
    background-color: #ffffff;
    border-radius: 5px;
    overflow: hidden;
  }
  .login_form_inner {
    width: 100%;
    height: 100%;
    padding: 10px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .login_form_header {
    width: 100%;
    height: 36px;
    border-bottom: 1px solid #fafafa;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bottom_tips_container {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: #999999;
  }
  .login_input {
    background-color: #fafafa;
  }
  .weui-cell:before {
    border-top: none;
  }
</style>
<script>
  import { Group, XInput, XButton } from 'vux'
  export default {
    name: 'Login',
    data () {
      return {
        loginFormData: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      appSettings () {
        return this.$store.state.appSettings
      }
    },
    methods: {
      showError (msg) {
        this.$vux.toast.show({
          type: 'text',
          text: msg
        })
      }
    },
    components: {
      Group,
      XInput,
      XButton
    }
  }
</script>
