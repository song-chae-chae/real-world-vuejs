<template>
  <div id="app">
    <rw-header></rw-header>
    <router-view />
    <rw-footer></rw-footer>
  </div>
</template>
<script>
import RwFooter from "./components/layouts/rw-footer/RWFooter.vue";
import RwHeader from "./components/layouts/rw-header/RWHeader.vue";
export default {
  components: {RwHeader, RwFooter},
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
