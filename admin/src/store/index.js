import Vue from 'vue/dist/vue.min'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    register: {},
    list: []
  },
  actions: {
    FETCH_USER: ({ commit, state }, user) => {
      return commit('SET_USER', user)
    },
    FETCH_REGISTER: ({ commit, state }, user) => {
      return commit('SET_REGISTER', user)
    },
    FETCH_LIST: ({ commit, state }, options) => {
      return api.fetchList(options.model).then(res => {
        commit('SET_LIST', res)
        return Promise.resolve(res)
      })
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      Vue.set(state, 'user', user)
    },
    SET_REGISTER: (state, user) => {
      Vue.set(state, 'register', user)
    },
    SET_LIST: (state, list) => {
      Vue.set(state, 'list', list)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    register (state) {
      return state.register
    },
    list (state) {
      return state.list
    }
  }
})

export default store
