import axios from 'axios'

const isProd = process.env.NODE_ENV === 'production'

const prefix = isProd ? 'http://138.197.195.144:3000/api' : 'http://localhost:3000/api'

export default {
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
      console.log(result)
      return result
    })
  },
  fetchPost: (model, conditions) => {
    return axios.get(`${prefix}/${model}s/`, { params: conditions }).then(res => {
      const result = res.data
      console.log(result)
      return result
    })
  },
  update: (model, data) => {
    return axios.put(`${prefix}/${model}s/${data._id}`, data).then(res => {
      const result = res.data
      console.log(`update ${model}`, result)
      return result
    })
  },
  create: (model, data) => {
    return axios.post(`${prefix}/${model}s/`, data).then(res => {
      const result = res.data
      console.log(`create ${model}`, result)
      return result
    })
  },
  delete: (model, data) => {
    return axios.delete(`${prefix}/${model}s/${data._id}`).then(res => {
      const result = res.data
      console.log(`delete ${model}`, result)
      return result
    })
  }
}
