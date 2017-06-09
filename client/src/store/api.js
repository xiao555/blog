import axios from 'axios'
import LRU from 'lru-cache'
import config from '../../config'

const isProd = process.env.NODE_ENV === 'production'

const prefix = isProd ? config.prod.api : config.dev.api

let cache = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 30 // 30 min
})

export default {
  blog: (model, query) => {
    const target = `${prefix}/${model}`
    let key = target + "/?"
    if (query.hasOwnProperty('status')) key += 'status=' + query.status + '&'
    if (query.hasOwnProperty('path')) key += 'path=' + query.path + '&'
    if (cache.has(key)) {
      return Promise.resolve(cache.get(key))
    }
    return axios.get(target, { params: query }).then((response) => {
      const result = response.data
      cache.set(key, result)
      return result
    })
  },
  admin: {
    axios: axios,
    login: (conditions) => {
      // console.log(conditions)
      return axios.post(`${prefix}/admin/login`, conditions).then(res => {
        return res.data
      })
    },
    fetchList: (model) => {
      return axios.get(`${prefix}/${model}s/`).then(res => {
        const result = res.data
        // console.log(result)
        return result
      })
    },
    fetchPost: (model, conditions) => {
      return axios.get(`${prefix}/${model}s/`, { params: conditions }).then(res => {
        const result = res.data
        // console.log(result)
        return result
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
