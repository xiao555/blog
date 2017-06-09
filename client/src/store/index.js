import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'
import config from '../../config'

const isProd = process.env.NODE_ENV === 'production'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // blog
    articles: [],
    blog: {},
    tags: [],
    categorys: [],
    // admin
    category: [],
    tag: [],
    article: [],
    post: {},
    siteInfo: isProd ? config.prod.siteInfo : config.dev.siteInfo
  },
  actions: {
    FETCH_VALUE: ({ commit, state, dispatch }, { model, query }) => {
      return api.blog(model, query).then(value => {
        commit('SET_VALUE', { model, value })
        return Promise.resolve(value)
      })
    },
    FETCH_BLOG: ({ commit, state, dispatch }, { model, query, callback }) => {
      return api.blog(model, query).then(blog => {
        commit('SET_VALUE', blog[0])
        return Promise.resolve(blog[0])
      })
    },
    FETCH_LIST: ({ commit, state }, model, forced = false) => {
      if (!forced && state[model] && state[model].length) return state[model]
      return api.admin.fetchList(model).then(res => {
        commit('SET_VALUE', {model, res})
        return Promise.resolve(res)
      })
    },
    FETCH_POST: ({ commit, state }, { model, conditions }) => {
      if (state.post && state.post.path === conditions.path) return state.pos
      return api.admin.fetchPost(model, conditions).then(res => {
        commit('SET_VALUE', { model, res })
        return Promise.resolve(res[0])
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
