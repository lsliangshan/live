<template>
  <div class="container">
    <transition name="test-transition"
                enter-active-class="animated slideInUp"
                leave-active-class="animated fadeOut">
      <div v-if="show">Articles</div>
    </transition>
  </div>
</template>
<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
<script>
export default {
  name: 'articles',
  data () {
    return {
      show: false
    }
  },
  mounted () {
    setTimeout(() => {
      this.show = true
    }, 1000)
  }
}
</script>
