import Vue from 'vue'
import Vuex from 'vuex'
import fetch from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    articles: [],
    blog: {},
    tags: [],
    categorys: [],
    siteInfo: {
      siteUrl: 'https://xiao555.com.cn/'
    }
  },
  actions: {
    FETCH_VALUE: ({ commit, state, dispatch }, { model, query }) => {
      return fetch(model, query).then(value => {
        commit('SET_VALUE', { model, value })
        return Promise.resolve(value)
      })
    },
    FETCH_BLOG: ({ commit, state, dispatch }, { model, query, callback }) => {
      return fetch(model, query).then(blog => {
        commit('SET_VALUE', blog[0])
        return Promise.resolve(blog[0])
      })
    }
  },
  mutations: {
    SET_VALUE: (state, { key, value }) => {
      Vue.set(state, key, value)
    }
  },
  getters: {
    articles (state) {
      return state.articles
    },
    blog (state) {
      return state.blog
    },
    tags (state) {
      return state.tags
    },
    siteInfo (state) {
      return state.siteInfo
    }
  }
})

export default store
