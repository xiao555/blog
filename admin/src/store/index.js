// import Vue from 'vue/dist/vue.min'
import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    register: {},
    category: [],
    tag: [],
    article: [],
    post: {},
    siteInfo: {
      postUrl: 'http://localhost:8080/posts/'
    }
  },
  actions: {
    FETCH_USER: ({ commit, state }, user) => {
      return commit('SET_VALUE', 'user', user)
    },
    FETCH_REGISTER: ({ commit, state }, user) => {
      return commit('SET_VALUE', 'register', user)
    },
    FETCH_LIST: ({ commit, state }, model, forced = false) => {
      console.log('FETCH_LIST', model)
      if (!forced && state[model] && state[model].length) return state[model]
      return api.fetchList(model).then(res => {
        commit('SET_VALUE', model, res)
        return Promise.resolve(res)
      })
    },
    FETCH_POST: ({ commit, state }, { model, conditions }) => {
      if (state.post && state.post.path === conditions.path) return state.pos
      return api.fetchPost(model, conditions).then(res => {
        commit('SET_VALUE', 'post', res[0])
        return Promise.resolve(res[0])
      })
    }
  },
  mutations: {
    SET_VALUE: (state, model, value) => {
      Vue.set(state, model, value)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    register (state) {
      return state.register
    },
    article (state) {
      return state.article
    },
    category (state) {
      return state.category
    },
    tag (state) {
      return state.tag
    },
    post (state) {
      return state.post
    },
    siteInfo (state) {
      return state.siteInfo
    }
  }
})

export default store
