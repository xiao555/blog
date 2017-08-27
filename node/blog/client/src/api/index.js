import axios from 'axios'
import LRU from 'lru-cache'
import config from '../../config'

const prefix =  config.api

const cache = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 30 // 30 min
})

function fetch (model, query = {}, force = false) {
  const target = `${prefix}/${model}`
  let key = target + "/?"
  if (query.hasOwnProperty('status')) key += 'status=' + query.status
  if (query.hasOwnProperty('path')) key += 'path=' + query.path
  if (force && cache && cache.has(key)) {
    return Promise.resolve(cache.get(key))
  } else {
    return new Promise((resolve, reject) => {
      axios.get(target, { params: query }).then(res => {
        cache && cache.set(key, res.data)
        resolve(res.data)
      }).catch(err => reject(err))
    })
  }
}

export default {
  fetch,
  view: (path) => {
    const url = `${prefix}/view/articles?path=${path}`
    return axios.post(url).catch(err => console.log('Post view fail'))
  },
  admin: {
    axios: axios,
    login: (conditions) => {
      // console.log(conditions)
      return axios.post(`${prefix}/admin/login`, conditions).then(res => {
        return res.data
      })
    },
    update: (model, data) => {
      return axios.put(`${prefix}/${model}s/${data._id}`, data).then(res => {
        const result = res.data
        // console.log(`update ${model}`, result)
        return result
      })
    },
    create: (model, data) => {
      return axios.post(`${prefix}/${model}s/`, data).then(res => {
        const result = res.data
        // console.log(`create ${model}`, result)
        return result
      })
    },
    delete: (model, data) => {
      return axios.delete(`${prefix}/${model}s/${data._id}`).then(res => {
        const result = res.data
        // console.log(`delete ${model}`, result)
        return result
      })
    }
  }
}
