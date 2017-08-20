import PostView from './PostView.vue'

export default function createPostView ({ post }) {
  let id = post === '' ? '' : post
  return {
    name: `post-view`,

    asyncData ({ store, route: { params: { path }}}) {
      id = post === '' ? path : post
      return store.dispatch('FETCH_POST', { path: id })
    },

    render (h) {
      return h(PostView, { props: { id }})
    }
  }
}
