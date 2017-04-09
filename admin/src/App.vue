<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from './store/api'

export default {
  name: 'app',
  data () {
    return {}
  },
  beforeMount () {
    const axios = api.axios
    axios.interceptors.request.use((config) => {
      const token = window.localStorage.getItem('token')

      if (axios.method === 'get' && axios.url.indexOf('/api/user') === -1) {
        return config
      }

      if (token !== null && token !== 'undefined') {
        config.headers['authorization'] = token
      }

      return config
    }, (error) => Promise.reject(error))
  }
}
</script>

<style lang='stylus'>
@import './assets/css/index.styl'
@import '~/font-awesome/css/font-awesome.css'
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
