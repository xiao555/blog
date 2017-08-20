import api from '../api'
export default {
  FETCH_LISTS: ({ commit, state }, { model, query }) => {
    return api.fetch(model, query).then(data => {
      const type = model.toUpperCase()
      commit('SET_LISTS', { model, data })
    })
  },
  FETCH_POST: ({ commit, state }, { query }) => {
    return api.fetch('articles', query).then(res => {
      const data = res[0]
      commit('SET_POST', { data })
    })
  },
  VIEW_POST: ({ commit, state }, { path }) => {
    return api.view(path)
  }
}
