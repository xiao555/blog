<template>
  <div class="user">
    <h1>User</h1>
    <div class="item">
      <label for="name">Username</label>
      <input type="text" id="name" v-model='user.name'>
    </div>
    <div class="item">
      <label for="email">Email</label>
      <input type="text" id="email" v-model='user.email'>
    </div>
    <div class="item">
      <label for="password">Password</label>
      <input type="text" id="password" v-model='user.password'>
    </div>
    <button @click='update'>Update</button>
  </div>
</template>

<script type="text/javascript">
  import api from '../store/api'
  import { mapGetters } from 'vuex'
  export default {
    name: 'user',
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    methods: {
      update () {
        api.update('user', this.user).then(res => {
          if (res.status === 'fail') {
            return this.$parent.$emit('message', 'error', res.message)
          } else {
            this.$parent.$emit('message', 'success', 'Update Success')
          }
          this.user = res
        }).catch(err => console.log(err))
      }
    }
  }
</script>
