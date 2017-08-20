<template>
  <div id="admin">
    <main>
      <div class="error" :class="{ active: error}" >{{ message }}</div>
      <div class="success" :class="{ active: success}" >{{ message }}</div>
      <sidebar></sidebar>
      <div class="content">
        <topbar></topbar>
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
import Sidebar from '../components/admin/Sidebar.vue'
import Topbar from '../components/admin/Topbar.vue'
import api from '@/api'

export default {
  name: 'admin-dashboard',

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

  beforeMount () {
    const axios = api.admin.axios
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
  },

  created () {
    this.$on('message', (type, message) => {
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

<style lang='stylus'>
#admin
  &.active
    .content
      margin-left 35px
  li
    list-style none

  a,button,select
    text-decoration none
    &:focus
      outline none
  main
    clearfix()
    overflow-y auto

  .content
    position relative
    padding 50px 20px
    height 100%
    margin-left 140px
    overflow-y auto
    transition all .3s ease
    @media mq-mobile
      margin 0






  h1,.add-new
    display inline-block
    vertical-align middle
    margin 10px 0
  .add-new
    padding 4px 8px
    border 1px solid #ccc
    border-radius 3px
    background-color #f7f7f7
    font-size 13px
    font-weight 600
    color #0073aa
    margin-left 10px
    cursor pointer
    &:hover
      color #fff
      background-color #0073aa

  .user .item
    margin 10px 0
    label
      display inline-block
      width 100px
    input
      padding 5px 10px

  .user button
    border 1px solid button-border
    box-shadow 0 1px 0 button-shadow
    border-radius 3px
    background-color button-bg
    padding 2px 10px
    cursor pointer
    opacity .7
    &:hover
      opacity 1

</style>
