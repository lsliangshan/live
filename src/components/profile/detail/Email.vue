<template>
  <div class="detail_email_container">
    <div class="detail_email_header">
      <span>修改邮箱</span>
      <a class="save_btn" href="javascript: void(0)" v-if="saveAvailable" @click="modifyValue">保存</a>
      <a class="save_btn disabled" href="javascript: void(0)" v-else>保存</a>
    </div>
    <group gutter="0px" class="detail_email_inner">
      <x-input placeholder="请输入您的邮箱"
               class="email_input"
               autofocus="autofocus"
               v-model="value"></x-input>
    </group>
  </div>
</template>
<style scoped lang="less">
  .detail_email_container {
    width: 100%;
    height: 100%;
  }
  .detail_email_header {
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
  .detail_email_inner{
    width: 100%;
    height: calc(100% - 44px);
    padding: 5px 10px;
    box-sizing: border-box;
  }
  .email_input {
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
  import { Group, XInput } from 'vux'
  export default {
    name: 'DetailEmail',
    props: {
      info: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        cacheValue: this.info,
        value: ''
      }
    },
    created () {
      this.value = this.cacheValue
    },
    computed: {
      saveAvailable () {
        // 是否可以保存，内容变化则能保存
        return (this.value.trim() !== this.cacheValue.trim())
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
      }
    },
    components: {
      Group,
      XInput
    }
  }
</script>
