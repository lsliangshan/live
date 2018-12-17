<template>
  <div class="enkel-toast"
       :class="type">
    <popup v-model="shown"
           :position="position"
           :show-mask="showMask">
      <div class="popup_container">
        <slot>
          <div class="default_toast_content"
               :style="{paddingRight: closable ? '0' : '12px'}">{{message}}</div>
        </slot>
        <div class="close_container"
             @click="hide"
             v-if="closable">
          <!-- <span class="vux-close"></span> -->
          <x-icon type="ios-close-empty"
                  class="close_icon"
                  size="30"></x-icon>
        </div>
      </div>
    </popup>
  </div>
</template>
<style scoped lang="less">
.popup_container {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.default_toast_content {
  width: calc(~"100% - 50px");
  font-size: 13px;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
}
.close_container {
  width: 50px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.enkel-toast.primary .close_icon {
  fill: @theme-primary-text;
}
.enkel-toast.success .close_icon {
  fill: @theme-success-text;
}
.enkel-toast.error .close_icon {
  fill: @theme-error-text;
}
.enkel-toast.warning .close_icon {
  fill: @theme-warning-text;
}
.enkel-toast.info .close_icon {
  fill: @theme-info-text;
}

.enkel-toast.primary .popup_container {
  background-color: @theme-primary-bg;
  color: @theme-primary-text;
}
.enkel-toast.success .popup_container {
  background-color: @theme-success-bg;
  color: @theme-success-text;
}
.enkel-toast.error .popup_container {
  background-color: @theme-error-bg;
  color: @theme-error-text;
}
.enkel-toast.warning .popup_container {
  background-color: @theme-warning-bg;
  color: @theme-warning-text;
}
.enkel-toast.info .popup_container {
  background-color: @theme-info-bg;
  color: @theme-info-text;
}
</style>
<script>
import { TransferDom, Popup } from 'vux'
export default {
  name: 'Toast',
  components: {
    Popup
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      shown: false,
      position: 'top',
      showMask: false,
      message: '提示',
      duration: 1500,
      type: 'primary',
      closable: false
    }
  },
  created () {
    if (['top', 'bottom'].indexOf(this.position) < 0) {
      this.position = 'top'
    }
  },
  methods: {
    hide () {
      this.shown = false
    }
  }
}
</script>
