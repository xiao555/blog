import Vue from 'vue'

export default {
  SET_LISTS: (state, { model, data }) => {
    if (model == 'articles') {
      data.sort((a, b) => {
        let x = a.createTime.replace('-', '');
        let y = b.createTime.replace('-', '');
        return parseInt(y) - parseInt(x);
      })
      state.lists[model] = data
      data.forEach(post => {
        if (post) {
          Vue.set(state.posts, post.path, post)
        }
      })
    } else {
      state.lists[model] = data
    }
  },
  SET_POST: (state, { data }) => {
    Vue.set(state.posts, data.path, data)
  }
}
