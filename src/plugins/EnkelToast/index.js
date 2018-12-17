import Toast from './Index.vue'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const ToastPlugin = Vue.extend(Toast)

      $vm = new ToastPlugin({
        el: document.createElement('div')
      })

      document.body.appendChild($vm.$el)
    }

    if (!Vue.$Enkel) {
      Vue.$Enkel = {}
    }

    let shownTimeout

    let toast = {
      show (opts) {
        if ($vm.shown) {
          clearTimeout(shownTimeout)
        }
        Object.assign($vm, {
          message: 'enkel toast',
          position: 'top',
          showMask: false,
          duration: 1500,
          type: 'primary',
          closable: false
        }, options || {}, opts, {
            shown: true
          })

        if (opts && (opts.duration != 0)) {
          shownTimeout = setTimeout(() => {
            this.hide()
          }, (opts && opts.duration) || (options && options.duration) || 1500)
        }
      },
      hide () {
        $vm.shown = false
      }
    }

    Vue.$Enkel.toast = toast

    Vue.mixin({
      created () {
        this.$Enkel = this.$Enkel || Vue.$Enkel
        this.$Enkel.toast = Vue.$Enkel.toast
      }
    })
  }
}