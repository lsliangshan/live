<template>
  <div class="profile_index_container">
    <div v-if="loginInfo.token">
      <div class="gap_12"></div>
      <div class="person_info_container"
           data-path="/profile/detail"
           @click="navTo">
        <div class="avatar_container pen"
             :style="{width: calcToRealPx(150) + 'px', height: calcToRealPx(150) + 'px'}">
          <img class="avatar_img"
               :src="loginInfo.headIcon || (loginInfo.gender == 1 ? assets.maleAvatar : assets.femaleAvatar)">
        </div>
        <div class="center_info_container pen"
             :style="{width: calcToRealPx(450) + 'px', height: calcToRealPx(150) + 'px'}">
          <div class="nickname_container"
               v-text="loginInfo.nickname || ''"></div>
          <div class="description_container"
               v-text="'Vue使用者'"></div>
        </div>
        <div class="right_info_container pen"
             :style="{width: calcToRealPx(150) + 'px', height: calcToRealPx(150) + 'px'}">
          <span class="qrcode_icon">
            <svg>
              <use xlink:href="#qrcode"></use>
            </svg>
          </span>
          <x-icon type="ios-arrow-right"
                  size="16"
                  class="icon_color_normal"></x-icon>
        </div>
      </div>

      <div class="gap_24"></div>

      <div class="main_operation_items">
        <group gutter="0px">
          <div class="main_operation_item"
               v-for="(op, index) in operationItems"
               :key="index">
            <div class="main_operation_item_inner"
                 :class="'main_operation_item_inner_' + index">
              <div class="main_operation_item_label"
                   v-text="op.text"></div>
              <x-icon type="ios-arrow-right"
                      size="16"
                      class="icon_color_normal"></x-icon>
            </div>
          </div>
        </group>
      </div>
    </div>

    <div v-if="!loginInfo.token"
         class="unlogin_container">
      <p class="unlogin_tips">登录后可发布新的文章，收藏感兴趣的文章</p>
    </div>

    <div class="gap_24"></div>

    <div class="bottom_btns">
      <x-button type="warn"
                :plain="true"
                @click.native="logout"
                v-if="loginInfo.token">退出登录</x-button>
      <x-button type="primary"
                @click.native="goToLogin"
                text="登录"
                v-else></x-button>
    </div>
  </div>
</template>
<style scoped>
.icon_color_normal {
  fill: #999999;
}
.profile_index_container {
  width: 100%;
  height: 100%;
}
.person_info_container {
  width: 100%;
  /*padding: 5px 0;*/
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.person_info_container:active {
  background-color: #f5f5f5;
}
.avatar_container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.avatar_img {
  border-radius: 8px;
  overflow: hidden;
  width: 70%;
  height: 70%;
  border: 1px solid #f5f5f5;
}
.center_info_container {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
.nickname_container {
  width: 90%;
  font-size: 15px;
  font-weight: bold;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.description_container {
  width: 90%;
  font-size: 12px;
  color: #999999;
  font-weight: 200;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.right_info_container {
  padding-right: 10px;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
}
.qrcode_icon {
  width: 24px;
  height: 24px;
}
.qrcode_icon svg {
  width: 24px;
  height: 24px;
}

.main_operation_items {
  width: 100%;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  /*margin-top: 24px;*/
  background-color: #ffffff;
}
.main_operation_item_label {
  height: 36px;
  display: flex;
  align-items: center;
  border: none;
}
.main_operation_item {
  padding: 0 10px 0 15px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.main_operation_item:active {
  background-color: #f5f5f5;
}
.main_operation_item_inner {
  width: 100%;
  height: 100%;
  padding: 10px 0 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f5f5f5;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.main_operation_item_inner_0 {
  border-top: none;
}

.bottom_btns {
  width: 100%;
  padding: 0 30px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.unlogin_container {
  width: 100%;
  margin-top: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.unlogin_tips {
  font-size: 14px;
  color: #999999;
}
</style>
<script>
import * as types from '../../../store/mutation-types'
import { XImg, Group, Cell, XButton } from 'vux'
export default {
  name: 'profile',
  data () {
    return {
      operationItems: [
        {
          text: '我的经验',
          value: '',
          pathName: ''
        },
        {
          text: '我的收藏',
          value: '',
          pathName: ''
        },
        {
          text: '我的浏览',
          value: '',
          pathName: ''
        }
      ]
    }
  },
  computed: {
    assets () {
      return this.$store.state.assets
    },
    loginInfo () {
      return this.$store.state.loginInfo
    }
  },
  created () {
    // alert('created')
  },
  methods: {
    logout () {
      this.$store.commit(types.CACHE_LOGIN_DATA, {})
      this.$vux.toast.show({
        type: 'text',
        text: '您已经退出登录'
      })
    },
    goToLogin () {
      this.$router.push({
        name: 'Login'
      })
    },
    navTo (evt) {
      this.$router.push({
        path: evt.target.dataset.path
      })
    }
  },
  components: {
    XImg,
    Group,
    Cell,
    XButton
  }
}
</script>
