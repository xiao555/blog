import axios from 'axios'

const prefix = 'http://localhost:3000/api'

export default {
  axios: axios,
  login: (conditions) => {
    // console.log(conditions)
    return axios.post(`${prefix}/admin/login`, conditions)
  },
  register: (conditions) => {
    // console.log(conditions)
    return axios.post(`${prefix}/admin/register`, conditions)
  },
  fetchList: (model) => {
    console.log(model)
    return axios.get(`${prefix}/${model}s/`).then(res => {
      const result = res.data
      console.log(result)
      return result
    })
  }
}
