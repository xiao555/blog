<template>
  <main class="login">
    <div class="error" v-if="error">{{ message }}</div>
    <div class="success" v-else-if="success">{{ message }}</div>
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
          <input type="checkbox" v-model='form.remeber'><label class="checkbox" for="remember">Remeber Me</label>
        </div>
        <div class="item">
          <button class="submit login" type="button" @click="onSubmit">Login</button>
        </div>
      </form>
    </div>
    <div class="panel new">
      New to here? <router-link :to="{ name: 'register' }">Create a account.</router-link>
    </div>
  </main>
</template>

<script>
import api from '../store/api'

export default {
  name: 'login',
  data () {
    return {
      title: 'Sign in',
      form: {
        name: '',
        password: ''
      },
      remeber: false,
      message: '',
      success: false,
      error: false
    }
  },
  methods: {
    onSubmit () {
      api.login(this.form).then(res => {
        if (res.data.status === 'no') {
          this.error = true
          this.message = 'Login faild, please check your name and password'
        } else if (res.data.status === 'yes') {
          this.success = true
          this.message = 'Welcome Back'
          this.$store.dispatch('FETCH_USER', res.data.user).then(() => {
            // this.$router.push({ path: '/dashboard' })
          })
        }
      }).catch(err => console.error(err))
    }
  },
  beforeMount () {
    console.log(this.$store.state)
    this.form.name = this.$store.state.register.name || ''
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '../assets/css/login.styl'
</style>
