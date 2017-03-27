import Vue from 'vue'
import Vuex from 'vuex'
import fetch from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    posts: [],
    blog: {},
    tags: [],
    achieves: [],
    siteInfo: {
      siteUrl: 'http://localhost:8080'
    }
  },
  actions: {
    FETCH_POSTS: ({ commit, state, dispatch }, { model, query, callback }) => {
      return fetch(model, query).then(posts => {
        commit('SET_POSTS', { posts })
        callback && callback()
        console.log(posts)
        return Promise.resolve()
      })
    },
    FETCH_BLOG: ({ commit, state, dispatch }, { model, query, callback }) => {
      return fetch(model, query).then(blog => {
        console.log(query)
        commit('SET_BLOG', blog[0])
        callback && callback()
        return Promise.resolve()
      })
    },
    FETCH_TAGS: ({ commit, state, dispatch }, { model, query, callback }) => {
      return fetch(model, query).then(tags => {
        commit('SET_TAGS', { tags })
        callback && callback()
        return Promise.resolve()
      })
    }
  },
  mutations: {
    SET_POSTS: (state, { posts }) => {
      Vue.set(state, 'posts', posts)
    },
    SET_BLOG: (state, blog) => {
      Vue.set(state, 'blog', blog)
      console.log('blog', blog)
    },
    SET_TAGS: (state, { tags }) => {
      Vue.set(state, 'tags', tags)
      console.log('tags', tags)
    }
  },
  getters: {
    posts (state) {
      return state.posts
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
