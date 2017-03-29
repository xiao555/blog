<template>
  <main class="register">
    <div class="error" v-if="error">{{ message }}</div>
    <div class="success" v-else-if="success">{{ message }}</div>
    <h1 class="title">{{ title }}</h1>
    <div class="panel">
      <form :model="form">
        <div class="item">
          <label for="email">Email</label>
          <input type="email" id="email" :model="form.email">
        </div>
        <div class="item">
          <label for="name">Username</label>
          <input type="text" id="name" :model="form.name">
        </div>
        <div class="item">
          <label for="password">Password</label>
          <input type="password" id="password" :model="form.password">
        </div>
        <div class="item">
          <label for="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" :model="confirm_password">
        </div>
        <div class="item">
          <button class="submit register" type="button" @click="onSubmit">Register</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import api from '../store/api'

export default {
  name: 'register',
  data () {
    return {
      title: 'Sign up',
      form: {
        name: '',
        email: '',
        password: '',
        admin: true
      },
      confirm_password: '',
      message: '',
      success: false,
      error: false
    }
  },
  methods: {
    onSubmit () {
      api.register(this.form).then(res => {
        if (res.data.status === 'no') {
          this.error = true
          this.message = 'Register faild, please check your name, email and password'
        } else if (res.data.status === 'yes') {
          this.success = true
          this.message = 'Registration success'
          // this.$router.push({ path: '/dashboard' })
        }
      }).catch(err => console.error(err))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
@import '../assets/css/register.styl'
</style>
