<template>
  <main>
    <div class="error" :class="{ active: error}" >{{ message }}</div>
    <div class="success" :class="{ active: success}" >{{ message }}</div>
    <sidebar></sidebar>
    <topbar></topbar>
    <div class="content">
      <router-view></router-view>
    </div>
  </main>
</template>

<script>
  import Sidebar from './Sidebar.vue'
  import Topbar from './Topbar.vue'

  export default {
    name: 'main',
    data () {
      return {
        title: '',
        error: false,
        success: false,
        message: ''
      }
    },
    components: {
      Sidebar,
      Topbar
    },
    created () {
      this.$on('message', (type, message) => {
        console.log('on message')
        this.error = this.success = false
        this[type] = true
        this.message = message.indexOf('Token') === -1 ? message : message + ', Please re-login'
        setTimeout(() => {
          this.error = this.success = false
        }, 2000)
      })
    }
  }

</script>
