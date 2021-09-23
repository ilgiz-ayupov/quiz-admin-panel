<template>
  <div id="app">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <Nav />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
export default {
  name: "App",
  components: {
    Header,
    Nav,
  },
};
</script>

<style>
</style>
