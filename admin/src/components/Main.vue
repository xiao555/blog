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
