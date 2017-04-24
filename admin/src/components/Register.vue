<template>
  <main class="register">
    <div class="error" :class="{ active: error}" >{{ message }}</div>
    <div class="success" :class="{ active: success}" >{{ message }}</div>
    <h1 class="title">{{ title }}</h1>
    <div class="panel">
      <form :model="form">
        <div class="item">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" required>
        </div>
        <div class="item">
          <label for="name">Username</label>
          <input type="text" id="name" v-model="form.name" required>
        </div>
        <div class="item">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" required>
        </div>
        <div class="item">
          <label for="confirm_password">Confirm Password</label>
          <input type="password" id="confirm_password" v-model="confirm_password" required>
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
      this.success = this.error = false
      const Reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (Reg.test(this.form.email) === false) {
        this.error = true
        this.message = 'Email invalid'
        setTimeout(() => {
          this.error = this.success = false
        }, 2000)
        return
      }
      if (this.form.name === '' || this.form.email === '' || this.form.password === '' || this.confirm_password === '') {
        this.error = true
        this.message = 'Please fill the form'
        setTimeout(() => {
          this.error = this.success = false
        }, 2000)
        return
      }
      if (this.confirm_password !== this.form.password) {
        this.error = true
        this.message = 'Password confirm fail'
        setTimeout(() => {
          this.error = this.success = false
        }, 2000)
        return
      }
      api.register(this.form).then(res => {
        console.log('register', res)
        if (res.data.status === 'fail') {
          this.error = true
          this.message = res.data.message || 'Register fail, please check your name, email and password'
          setTimeout(() => {
            this.error = this.success = false
          }, 2000)
        } else if (res.data.status === 'success') {
          this.success = true
          this.message = 'Registration success'
          this.$store.dispatch('FETCH_REGISTER', this.form).then(() => {
            setTimeout(() => {
              this.$router.push({ path: '/' })
            }, 2000)
          })
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
