// import Vue from 'vue/dist/vue.min'
import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    category: [],
    tag: [],
    article: [],
    post: {},
    siteInfo: {
      postUrl: 'https://xiao555.com.cn/posts/'
    }
  },
  actions: {
    FETCH_LIST: ({ commit, state }, model, forced = false) => {
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
