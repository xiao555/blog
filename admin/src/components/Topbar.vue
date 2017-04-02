<template>
  <div class="topbar">
    <div class="login">{{ user }}
    <ul class="login-list slidedown">
        <li class="item">修改密码</li>
        <li class="item">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'topbar',
    data () {
      return {
        user: '',
        isActive: true
      }
    },
    methods: {
    },
    beforeMount () {
      this.user = this.$store.state.user.name || '未登录'
    }
  }
</script>

<style lang="stylus">
  @import '../assets/css/topbar.styl'
</style>
