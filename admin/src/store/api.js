import axios from 'axios'

const prefix = 'http://localhost:3000/api'

export default {
  login: (conditions) => {
    console.log(conditions)
    return axios.post(`${prefix}/admin/login`, { params: conditions })
  },
  register: (conditions) => {
    console.log(conditions)
    return axios.post(`${prefix}/admin/register`, { params: conditions })
  }
}
