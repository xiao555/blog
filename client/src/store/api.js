import axios from 'axios'
import LRU from 'lru-cache'

const prefix = 'http://localhost:3000/api'

let cache = LRU({
  max: 1000,
  maxAge: 1000 * 60 * 30 // 30 min
})

export default function (model, query) {
  const target = `${prefix}/${model}`
  const key = target
  // console.log(target, query)
  // if (cache.has(key)) {
  //   return Promise.resolve(cache.get(key))
  // }
  return axios.get(target, { params: query }).then((response) => {
    const result = response.data
    cache.set(key, result)
    return result
  })
}

