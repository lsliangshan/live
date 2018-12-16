<template>
  <div class="login_container">
    <div class="bg_image"
         :style="{backgroundImage: 'url(https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=797016050,588323013&fm=27&gp=0.jpg)'}">
      <!--<div class="bg_image" :style="{backgroundImage: 'url(' + appSettings.bg + ')'}">-->
    </div>
    <transition name="fade">
      <div class="login_form_container"
           v-if="action === 'login'">
        <group gutter="0px"
               class="login_form_inner">
          <div class="login_form_header">登录</div>
          <div class="gap_12"></div>
          <!--<x-input type="text" label-width="70px"-->
          <!--title="用户名"-->
          <!--placeholder="请输入用户名"-->
          <!--required-->
          <!--class="login_input"-->
          <!--:is-type="noEmpty"-->
          <!--v-model="loginFormData.username"-->
          <!--@on-click-error-icon="showError"-->
          <!--&gt;</x-input>-->
          <!--<x-input type="password" label-width="70px"-->
          <!--title="密码"-->
          <!--placeholder="请输入密码"-->
          <!--required-->
          <!--class="login_input"-->
          <!--:is-type="validatePassword"-->
          <!--v-model="loginFormData.password"-->
          <!--@on-click-error-icon="showError"-->
          <!--&gt;</x-input>-->
          <div class="form_item">
            <svg>
              <use xlink:href="#author"></use>
            </svg>
            <input type="text"
                   class="custom_input"
                   placeholder="用户名"
                   v-model="loginFormData.username" />
          </div>
          <div class="gap_12"></div>
          <div class="form_item">
            <svg>
              <use xlink:href="#password"></use>
            </svg>
            <input type="password"
                   class="custom_input"
                   placeholder="密码"
                   v-model="loginFormData.password" />
          </div>
          <div class="gap_24"></div>

          <!--<x-button class="custom_button" :disabled="!canLogin" @click.native="login">-->
          <!--<inline-loading v-if="canLogin && isLoggingIn"></inline-loading>-->
          <!--登录-->
          <!--</x-button>-->
          <div class="form_bottom">
            <button class="custom_button"
                    @click="login">登录</button>
          </div>

          <div class="gap_12"></div>

          <div class="bottom_tips_container">
            <!--<span>忘记密码</span>-->
            <span data-type="registry"
                  @click="goTo">还没有账号？去注册</span>
          </div>
        </group>
      </div>
    </transition>
    <transition name="fade">
      <div class="login_form_container"
           v-if="action === 'registry'">
        <group gutter="0px"
               class="login_form_inner">
          <div class="login_form_header">注册</div>
          <div class="gap_12"></div>
          <!--<x-input type="text" label-width="70px"-->
          <!--title="手机号"-->
          <!--placeholder="请输入手机号"-->
          <!--required-->
          <!--class="login_input"-->
          <!--:is-type="validatePhonenum"-->
          <!--v-model="registryFormData.phonenum"-->
          <!--@on-click-error-icon="showError"-->
          <!--&gt;</x-input>-->
          <!--<x-input type="password" label-width="70px"-->
          <!--title="密码"-->
          <!--placeholder="请输入密码"-->
          <!--required-->
          <!--class="login_input"-->
          <!--:is-type="validatePassword"-->
          <!--v-model="registryFormData.password"-->
          <!--@on-click-error-icon="showError"-->
          <!--&gt;</x-input>-->
          <!--<x-input type="password" label-width="70px"-->
          <!--title="确认密码"-->
          <!--placeholder="请再次输入密码"-->
          <!--required-->
          <!--class="login_input"-->
          <!--:is-type="noEmpty"-->
          <!--:equal-with="registryFormData.password"-->
          <!--v-model="registryFormData.rePassword"-->
          <!--@on-click-error-icon="showError"-->
          <!--&gt;</x-input>-->
          <div class="form_item">
            <svg>
              <use xlink:href="#author"></use>
            </svg>
            <input type="text"
                   class="custom_input"
                   placeholder="手机号"
                   v-model="registryFormData.phonenum" />
          </div>
          <div class="gap_12"></div>
          <div class="form_item">
            <svg>
              <use xlink:href="#password"></use>
            </svg>
            <input type="password"
                   class="custom_input"
                   placeholder="密码"
                   v-model="registryFormData.password" />
          </div>
          <div class="gap_12"></div>
          <div class="form_item">
            <svg>
              <use xlink:href="#repassword"></use>
            </svg>
            <input type="password"
                   class="custom_input"
                   placeholder="确认密码"
                   v-model="registryFormData.rePassword" />
          </div>
          <div class="gap_24"></div>

          <!--<x-button type="primary" :disabled="!canRegistry" @click.native="registry">-->
          <!--<inline-loading v-if="canRegistry && isRegistering"></inline-loading>-->
          <!--注册-->
          <!--</x-button>-->
          <div class="form_bottom">
            <button class="custom_button"
                    @click="registry">注册</button>
          </div>

          <div class="gap_12"></div>

          <div class="registry_bottom_tips_container">
            <span data-type="login"
                  @click="goTo">已有账号？去登录</span>
          </div>
        </group>
      </div>
    </transition>
  </div>
</template>
<style>
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
}
.bg_image {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  -webkit-transform: scale(1.1);
  -moz-transform: scale(1.1);
  -ms-transform: scale(1.1);
  -o-transform: scale(1.1);
  transform: scale(1.1);
  background-size: cover;
  background-attachment: fixed;
  background-position: 50% 50%;
  -webkit-filter: blur(5px); /* Chrome, Opera */
  -moz-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}
.login_form_container {
  position: absolute;
  width: 90%;
  /*height: 200px;*/
  top: 100px;
  /*left: 5%;*/
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.6);
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
  /*border-bottom: 1px solid #fafafa;*/
  color: rgba(255, 255, 255, 1);
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
}
.bottom_tips_container {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  /*background-color: #fafafa;*/
}
.weui-cell:before {
  border-top: none;
}
.login_form_container .weui-cells {
  background-color: transparent;
}

.login_container .form_item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.login_container .form_item svg {
  width: 26px;
  height: 26px;
  fill: rgba(255, 255, 255, 0.8);
}
.login_container .custom_input {
  display: inline-block;
  width: calc(100% - 40px);
  margin-left: 10px;
  height: 26px;
  line-height: 1.5;
  padding: 4px 7px;
  font-size: 13px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 200;
  background-color: transparent;
  background-image: none;
  position: relative;
  cursor: text;
  transition: border 0.2s ease-in-out, background 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
}
.custom_input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.login_form_container .form_bottom {
  display: flex;
  align-items: center;
  justify-content: center;
}
.login_container .custom_button {
  width: 30%;
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  border-radius: 4px;
  background-color: transparent;
  color: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.login_container .custom_button:active {
  background-color: rgba(255, 255, 255, 0.1);
}
.login_container .weui-cells:after {
  height: 0 !important;
  border-bottom: none !important;
}
</style>
<script>
import { Group, XInput, XButton, InlineLoading } from 'vux'
import * as types from '../../../store/mutation-types'
import { ValidateUtil, StorageUtil } from '../../../utils/index'
export default {
  name: 'LoginOrRegistry',
  data () {
    return {
      action: 'login',
      validatePhonenum: ValidateUtil.validatePhonenum,
      validatePassword: ValidateUtil.validatePassword,
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
      requestInfo: this.$store.state.requestInfo,
      localStorageKeys: this.$store.state.localStorageKeys,
      loginFormData: {
        username: '',
        password: ''
      },
      registryFormData: {
        phonenum: '',
        password: '',
        rePassword: ''
      },
      isLoggingIn: false, // 正在登录中
      isRegistering: false // 正在注册中
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
      return (this.validatePhonenum(this.registryFormData.phonenum).valid && this.registryFormData.password.trim() !== '' && (this.registryFormData.password === this.registryFormData.rePassword))
    }
  },
  created () {
    this.$nextTick(() => {
      this.action = this.initAction()
    })
  },
  methods: {
    initAction () {
      let _type = this.$route.query.t
      let _action = this.$route.name.toLowerCase()
      if (_type) {
        switch (String(_type)) {
          case 'r':
          case '2':
            _action = 'registry'
            break
          default:
            break
        }
      }
      return _action
    },
    async login () {
      if (!this.isLoggingIn) {
        this.isLoggingIn = true
        let loginData = await this.$store.dispatch(types.AJAX2, {
          baseUrl: this.requestInfo.baseUrl,
          url: this.requestInfo.login,
          data: this.loginFormData
        })
        this.isLoggingIn = false
        if (loginData.status === 200) {
          // 登录成功
          this.$vux.toast.show({
            type: 'text',
            text: '登录成功'
          })
          this.$store.commit(types.CACHE_LOGIN_DATA, loginData.data)
          this.$router.back()
        } else {
          // 登录失败
          StorageUtil.removeItem(this.$store.state.localStorageKeys.userInfo)
          this.$store.commit(types.CACHE_LOGIN_DATA, {})
          this.$vux.toast.show({
            type: 'text',
            text: loginData.message || '登录失败'
          })
        }
      }
    },
    async registry () {
      if (!this.isRegistering) {
        this.isRegistering = true
        let registryData = await this.$store.dispatch(types.AJAX2, {
          baseUrl: this.requestInfo.baseUrl,
          url: this.requestInfo.registry,
          data: {
            phonenum: this.registryFormData.phonenum,
            password: this.registryFormData.password
          }
        })
        this.isRegistering = false
        if (registryData.status === 200) {
          // 注册成功
          this.$vux.toast.show({
            type: 'text',
            text: '注册成功'
          })
          this.action = 'login'
        } else {
          // 注册失败
          this.$vux.toast.show({
            type: 'text',
            text: registryData.message || '注册失败'
          })
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
    XButton,
    InlineLoading
  }
}
</script>
