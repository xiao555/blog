<template>
  <div id="app">
    <div class="header-mask">
      <div class="violet"></div>
      <div class="indigo"></div>
      <div class="blue"></div>
      <div class="green"></div>
    </div>
    <sidebar></sidebar>
    <topbar></topbar>
    <main>
      <router-view></router-view>
    </main>
    <footer-component></footer-component> 
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Topbar from './components/Topbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  data () {
    return {}
  },
  components: {
    Sidebar,
    Topbar,
    FooterComponent: Footer
  }
}
</script>

<style lang="stylus">
@import './assets/css/main.styl'
@import './assets/css/markdown.styl'
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
