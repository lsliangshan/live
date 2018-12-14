<template>
  <div class="pwa_container">
    PWA
    <a href="/">Home</a>
  </div>
</template>
<style scoped>
.pwa_container {
  background-color: darkcyan;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 28px;
}
.pwa_container a {
  text-decoration: none;
  margin-left: 10px;
}
</style>
<script>
export default {
  name: 'pwa',
  data () {
    return {}
  }
}
</script>
