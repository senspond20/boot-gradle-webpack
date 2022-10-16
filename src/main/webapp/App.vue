<template>
  <div id="root">
    <Logos></Logos>
    <h1>Vue.js + Spring Boot</h1>
    <main>
      <router-view></router-view>
    </main>
    <router-link to="/">Home</router-link>
    <router-link to="/media">Media</router-link>
  </div>
</template>
<style>
h1{
  color: rebeccapurple;
  font-size: 16px;
}
h2{
  color:red
}
</style>
<script>
  // import Test from "./pages/Test.vue"
  // Test();

</script>