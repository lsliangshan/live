<template>
  <div class="login_container" :style="{backgroundImage: 'url(' + appSettings.bg + ')'}">
    <transition name="fade">
      <div class="login_form_container" v-if="action === 'login'">
        <group gutter="0px" class="login_form_inner">
          <div class="login_form_header">登录</div>
          <div class="gap_12"></div>
          <x-input type="text" label-width="70px"
                   title="用户名"
                   placeholder="请输入用户名"
                   required
                   class="login_input"
                   :is-type="noEmpty"
                   v-model="loginFormData.username"
                   @on-click-error-icon="showError"
          ></x-input>
          <x-input type="password" label-width="70px"
                   title="密码"
                   placeholder="请输入密码"
                   required
                   class="login_input"
                   :is-type="noEmpty"
                   v-model="loginFormData.password"
                   @on-click-error-icon="showError"
          ></x-input>

          <div class="gap_24"></div>

          <x-button type="primary" text="登录" :disabled="!canLogin"></x-button>

          <div class="gap_12"></div>

          <div class="bottom_tips_container">
            <span>忘记密码</span>
            <span data-type="registry" @click="goTo">还没有账号？去注册</span>
          </div>
        </group>
      </div>
    </transition>
    <transition name="fade">
      <div class="login_form_container" v-if="action === 'registry'">
        <group gutter="0px" class="login_form_inner">
          <div class="login_form_header">注册</div>
          <div class="gap_12"></div>
          <x-input type="text" label-width="70px"
                   title="用户名"
                   placeholder="请输入用户名"
                   required
                   class="login_input"
                   :is-type="noEmpty"
                   v-model="registryFormData.username"
                   @on-click-error-icon="showError"
          ></x-input>
          <x-input type="password" label-width="70px"
                   title="密码"
                   placeholder="请输入密码"
                   required
                   class="login_input"
                   :is-type="noEmpty"
                   v-model="registryFormData.password"
                   @on-click-error-icon="showError"
          ></x-input>
          <x-input type="password" label-width="70px"
                   title="确认密码"
                   placeholder="请再次输入密码"
                   required
                   class="login_input"
                   :is-type="noEmpty"
                   :equal-with="registryFormData.password"
                   v-model="registryFormData.rePassword"
                   @on-click-error-icon="showError"
          ></x-input>

          <div class="gap_24"></div>

          <x-button type="primary" text="注册" :disabled="!canRegistry"></x-button>

          <div class="gap_12"></div>

          <div class="registry_bottom_tips_container">
            <span data-type="login" @click="goTo">已有账号？去登录</span>
          </div>
        </group>
      </div>
    </transition>
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

  .registry_bottom_tips_container {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 13px;
    color: #999999;
  }

  .login_input {
    background-color: #fafafa;
  }
  .weui-cell:before {
    border-top: none;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
</style>
<script>
  import { Group, XInput, XButton } from 'vux'
  export default {
    name: 'LoginOrRegistry',
    data () {
      return {
        action: 'login',
        noEmpty (val) {
          let _val = val || ''
          if (!_val || (_val.trim() === '')) {
            return {
              valid: false,
              msg: '不能为空'
            }
          } else {
            return {
              valid: true
            }
          }
        },
        loginFormData: {
          username: '',
          password: ''
        },
        registryFormData: {
          username: '',
          password: '',
          rePassword: ''
        },
        isLoggingIn: false // 正在登录中
      }
    },
    computed: {
      appSettings () {
        return this.$store.state.appSettings
      },
      canLogin () {
        return (this.loginFormData.username.trim() !== '' && this.loginFormData.password.trim() !== '')
      },
      canRegistry () {
        return (this.registryFormData.username.trim() !== '' && this.registryFormData.password.trim() !== '' && (this.registryFormData.password === this.registryFormData.rePassword))
      }
    },
    created () {
      this.$nextTick(() => {
        this.action = this.$route.name.toLowerCase()
      })
    },
    methods: {
      login (evt) {
        const that = this
        if (!that.isLoggingIn) {
          that.isLoggingIn = true
          if (that.loginFormData.username.trim() === '') {

          }
        }
      },
      goTo (evt) {
        this.action = evt.target.dataset.type.toLowerCase()
        switch (this.action) {
          case 'login':
            this.setTitle('登录')
            break
          case 'registry':
            this.setTitle('注册')
            break
          default:
            break
        }
      },
      setTitle (title) {
        document.title = title
      },
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
