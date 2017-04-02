import List from '../components/List.vue'

export default function (options) {
  return {
    name: `${options.name}-list-view`,
    preFetch (store) {
      return store.dispatch('FETCH_LIST', options)
    },
    render (h) {
      return h(List, { props: { options: options } })
    }
  }
}
