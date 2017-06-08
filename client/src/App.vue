<template>
  <div id="app">
    <div class="header-mask">
      <div class="violet"></div>
      <div class="indigo"></div>
      <div class="blue"></div>
      <div class="green"></div>
    </div>
    <sidebar></sidebar>
    <main>
      <router-view></router-view>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  metaInfo: {
    title: 'Home',
    titleTemplate: "%s | Xiao555's Blog"
  },
  data () {
    return {}
  },
  components: {
    Sidebar,
    FooterComponent: Footer
  }
}
</script>

<style lang="stylus">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
