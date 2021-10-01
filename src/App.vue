<template>
  <div id="app">
    <Header />
    <div class="container-fluid">
      <div class="row">
        <Nav />

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="chartjs-size-monitor">
            <div class="chartjs-size-monitor-expand"><div class=""></div></div>
            <div class="chartjs-size-monitor-shrink"><div class=""></div></div>
          </div>
          <router-view />
        </main>
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
