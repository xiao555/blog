<template>
  <main>
    <sidebar></sidebar>
    <topbar></topbar>
    <div class="content">
      <router-view ></router-view>
    </div>
  </main>
</template>

<script>
  import Sidebar from './Sidebar.vue'
  import Topbar from './Topbar.vue'

  export default {
    name: 'main',
    components: {
      Sidebar,
      Topbar
    }
  }

</script>

<style lang="stylus">
.content
  margin-left 200px
  padding-top 50px
  height 100%
</style>
