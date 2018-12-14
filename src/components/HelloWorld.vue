<template>
  <div class="hello">
    <a href="/pwa">{{ msg }}</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Enkel ui 1111'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100%;
  height: 100%;
  background-color: lightblue;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.hello a {
  color: rgb(10, 81, 15);
  text-decoration: none;
  font-size: 28px;
}
.hello img {
  max-width: 500px;
}
.btn {
  padding: 4px 10px;
  background-color: transparent;
  border: 1px solid rgb(10, 81, 15);
  color: rgb(10, 81, 15);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
