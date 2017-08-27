export default {
  activePosts (state) {

    const { lists, postsPerPage } = state
    const page = Number(state.route.params.page) || 1
    const start = (page - 1) * postsPerPage
    const end = page * postsPerPage
    if (lists['articles']) {
      return lists['articles'].slice(start, end)
    }
  }
}
