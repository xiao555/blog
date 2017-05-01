// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue/dist/vue.min'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})

export {
  app,
  router,
  store
}

