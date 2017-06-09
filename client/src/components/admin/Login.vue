<template>
  <main class="login">
    <div class="error" :class="{ active: error}" >{{ message }}</div>
    <div class="success" :class="{ active: success}" >{{ message }}</div>
    <h1 class="title">{{ title }}</h1>
    <div class="panel sign-form">
      <form :model="form">
        <div class="item">
          <label for="username">Username</label>
          <input type="text" id="username" v-model='form.name' required>
        </div>
        <div class="item">
          <label for="password">Password</label>
          <input type="password" id="password" v-model='form.password' required>
        </div>
        <div class="item">
          <input type="checkbox" id="remember" v-model='remember'><label class="checkbox" for="remember">Remeber Me</label>
        </div>
        <div class="item">
          <button class="submit login" type="button" @click="onSubmit">Login</button>
        </div>
      </form>
    </div>
    <!-- <div class="panel new">
      New to here? <router-link :to="{ name: 'register' }">Create a account.</router-link>
    </div> -->
  </main>
</template>

<script>
import api from '@/store/api'

export default {
  name: 'login',
  data () {
    return {
      title: 'Sign in',
      form: {
        name: '',
        password: ''
      },
      remember: false,
      message: '',
      success: false,
      error: false
    }
  },
  methods: {
    onSubmit () {
      this.success = this.error = false
      api.admin.login(this.form).then(res => {
        if (res.status === 'fail') {
          this.error = true
          this.message = 'Login faild, please check your name and password'
          setTimeout(() => {
            this.error = this.success = false
          }, 2000)
        } else if (res.status === 'success') {
          this.success = true
          this.message = 'Welcome Back'
          window.localStorage.setItem('token', res.token)
          this.remember && window.localStorage.setItem('username', this.form.name)
          !this.remember && window.localStorage.removeItem('username')
          this.$store.state.user = res.user
          setTimeout(() => {
            this.$router.push({ path: '/admin/dashboard' })
          }, 1000)
        }
      }).catch(err => console.error(err))
    }
  },
  beforeMount () {
    // console.log(this)
    this.form.name = window.localStorage.getItem('username') ? window.localStorage.getItem('username') : ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
#admin
  main.login
    text-align center
    width 80%
    max-width 300px
    margin 0 auto
    padding-top 100px
    a
      color #ff9800
      &:hover
        background-color #ff9800
        color white
        padding 5px
        border-radius 5px
        font-weight 500
    .title
      text-align center
      font-size 32px
      font-weight 300
      letter-spacing -0.5px

  .success
    padding 12px
    text-align center
    color #4F8A10
    background-color #DFF2BF
  .error
    padding 12px
    text-align center
    color #D8000C
    background-color #FFBABA
</style>
