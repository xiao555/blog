import Vue from 'vue'

export default {
  SET_LISTS: (state, { model, data }) => {
    state.lists[model] = data
    if (model == 'articles') {
      data.forEach(post => {
        if (post) {
          Vue.set(state.posts, post.path, post)
        }
      })
    }
  },
  SET_POST: (state, { data }) => {
    Vue.set(state.posts, data.path, data)
  }
}
