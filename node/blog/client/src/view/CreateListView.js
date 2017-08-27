import PostList from './PostList.vue'

export default function createListView ({ model, query }) {
  return {
    name: `list-view`,
    asyncData ({ store }) {
      return store.dispatch('FETCH_LISTS', { model, query })
    },
    title: () => {
      return 'Home'
    },
    render (h) {
      return h(PostList, { props: { model, query }})
    }
  }
}
