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
        commit('SET_BLOG', { blog })
        callback && callback()
        return Promise.resolve()
      })
    }
    // FETCH_INFO: async ({ commit, state, dispatch }, { tags, achieve }) => {
    //   const promise = tags.map( tag => {
    //     return new Promise( async resolve => {
    //       const tag = await fetch('tags', tag)
    //       resolve(tag)
    //     })
    //   }
    // }
  },
  mutations: {
    SET_POSTS: (state, { posts }) => {
      Vue.set(state, 'posts', posts)
    },
    SET_BLOG: (state, { blog }) => {
      Vue.set(state, 'blog', blog)
      console.log('blog', blog)
    }
  },
  getters: {
    posts (state) {
      return state.posts
    },
    blog (state) {
      return state.blog
    },
    siteInfo (state) {
      return state.siteInfo
    }
  }
})

export default store
