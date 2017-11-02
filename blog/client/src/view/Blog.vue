<template>
  <div id="blog">
    <div class="header-mask">
      <div class="violet"></div>
      <div class="indigo"></div>
      <div class="blue"></div>
      <div class="green"></div>
    </div>
    <sidebar></sidebar>
    <main>
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </main>
    <footer-component></footer-component>
  </div>
</template>

<script>
import Sidebar from '../components/blog/Sidebar.vue'
import Footer from '../components/blog/Footer.vue'

export default {
  name: 'blog',

  components: {
    Sidebar,
    FooterComponent: Footer
  }
}
</script>

<style lang="stylus">
li
  list-style none

.markdown-body li
  list-style inherit

a
  text-decoration none

h1, .entry-content
  text-align center

.violet
  background violet
.indigo
  background indigo
.blue
  background blue
.green
  background green

.header-mask
  overflow hidden
  position fixed
  top 0
  width 100%
  height 8px
  z-index 999
  > div
    height 8px
    width 25%
    float left

main
  margin 0 auto
  width calc(100% - 400px)
  max-width 800px
  @media mq-tablet
    width calc(100% - 240px)
    margin-left 200px
  @media mq-mobile
    width 80%

.list .excerpt
  margin-bottom 10px
</style>
