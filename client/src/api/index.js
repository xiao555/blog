import axios from 'axios'
import LRU from 'lru-cache'
import config from '../../config'

const fs = require('fs');
const articles = JSON.parse(fs.readFileSync(resolve('../../articles.json'), 'utf-8'));


const isProd = process.env.NODE_ENV === 'production'

const prefix = isProd ? config.prod.api : config.dev.api

let cache = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 30 // 30 min
})

const api = {
  view: (type, key) => {
    const condition = type === 'blog' ? `?path=${key}` : ''
    return axios.post(`${prefix}/view/${type}${condition}`).then(res => {
    })
  },
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

export default {
  state,
  ...api,
  FETCH_VALUE: ({ model, query }) => {
    return api.blog(model, query).then(value => {
      return Promise.resolve(value)
    })
  },
  FETCH_BLOG: ({ model, query, callback }) => {
    return api.blog(model, query).then(blog => {
      return Promise.resolve(blog[0])
    })
  },
  FETCH_LIST: (model, forced = false) => {
    // if (!forced && state[model] && state[model].length) return state[model]
    return api.admin.fetchList(model).then(res => {
      return Promise.resolve(res)
    })
  },
  FETCH_POST: ({ model, conditions }) => {
    // if (state.post && state.post.path === conditions.path) return state.pos
    return api.admin.fetchPost(model, conditions).then(res => {
      return Promise.resolve(res[0])
    })
  },

}
