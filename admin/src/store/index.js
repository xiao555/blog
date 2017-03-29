import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {}
  },

  actions: {
    FETCH_USER: ({ commit, state }, { user }) => {
      return commit('SET_USER', user)
    }
  },

  mutations: {
    SET_USER: (state, { user }) => {
      Vue.set(state, 'user', user)
    }
  },

  getters: {
    user (state) {
      return state.user
    }
  }
})

export default store
