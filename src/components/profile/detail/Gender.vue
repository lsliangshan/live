<template>
  <div class="detail_gender_container">
    <div class="detail_gender_header">
      <span>修改性别</span>
      <a class="save_btn" href="javascript: void(0)" v-if="saveAvailable" @click="modifyValue">保存</a>
      <a class="save_btn disabled" href="javascript: void(0)" v-else>保存</a>
    </div>
    <group gutter="0px" class="detail_gender_inner">
      <!--<x-input placeholder="请输入您的姓名"-->
               <!--class="gender_input"-->
               <!--autofocus="autofocus"-->
               <!--v-model="value"-->
               <!--:required="true"-->
               <!--:is-type="validategender"-->
               <!--@on-click-error-icon="showError"></x-input>-->
      <radio v-model="value" :options="genders"></radio>
    </group>
  </div>
</template>
<style scoped lang="less">
  .detail_gender_container {
    width: 100%;
    height: 100%;
  }
  .detail_gender_header {
    position: relative;
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;

  }
  .detail_gender_inner{
    width: 100%;
    height: calc(100% - 44px);
    padding: 5px 10px;
    box-sizing: border-box;
  }
  .gender_input {
    background-color: #fafafa;
  }
  .save_btn {
    position: absolute;
    right: 10px;
    top: 0;
    padding: 0 8px;
    height: 44px;
    color: @tabbar-text-active-color;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .save_btn.disabled {
    color: @calendar-disabled-font-color;
  }
</style>
<script>
  import { Group, Radio } from 'vux'
  export default {
    name: 'DetailGender',
    props: {
      info: {
        type: Number,
        default: -1
      },
      name: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        cacheValue: this.info,
        value: '',
        assets: this.$store.state.assets,
        genders: [
          {
            icon: this.$store.state.assets.maleAvatar || '',
            key: 1,
            value: '男'
          },
          {
            icon: this.$store.state.assets.femaleAvatar || '',
            key: 2,
            value: '女'
          }
        ]
      }
    },
    created () {
      this.value = this.cacheValue
    },
    computed: {
      saveAvailable () {
        // 是否可以保存，内容变化则能保存
        return (this.value !== this.cacheValue)
      }
    },
    methods: {
      modifyValue () {
        this.$emit('modify', {
          name: this.name,
          value: this.value
        })
        this.cacheValue = this.value
        this.$router.back()
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
      Radio
    }
  }
</script>
