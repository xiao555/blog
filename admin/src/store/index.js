import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {},
    register: {}
  },
  actions: {
    FETCH_USER: ({ commit, state }, user) => {
      return commit('SET_USER', user)
    },
    FETCH_REGISTER: ({ commit, state }, user) => {
      return commit('SET_REGISTER', user)
    },
    FETCH_CACHE: ({ commit, state }, form) => {
      console.log(state.register)
      if (state.register.name) {
        form.name = state.register.name
      }
      return
    }
  },
  mutations: {
    SET_USER: (state, user) => {
      Vue.set(state, 'user', user)
    },
    SET_REGISTER: (state, user) => {
      Vue.set(state, 'register', user)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    register (state) {
      return state.register
    }
  }
})

export default store
