import api from '../api'
export default {
  FETCH_LISTS: ({ commit, state }, { model, query, force = false }) => {
    return api.fetch(model, query, force).then(data => {
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
