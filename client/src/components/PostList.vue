<template>
  <div class="postlist">
    <article v-for="post in posts">
      <div class="header">
        <h2><router-link :to="{ name:'post', params:{ id: post._id } }" >{{ post.title }}</router-link></h2>
        <h4 class="date">{{ post.createTime }}</h4>
      </div>
      <p v-html="post.excerpt"></p>
      <router-link :to="{ name:'post', params:{ id: post._id } }" >继续阅读</router-link>

    </article >
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  function fetchPosts (store, { path, query, params }, callback) {
    // if (path !== '/') {
    //   return Promise.resolve()
    // }

    return store.dispatch('FETCH_POSTS', {
      model: 'articles',
      query,
      callback
    })
  }

  export default {
    name: 'post-list',
    computed: {
      ...mapGetters([
        'posts'
      ])
    },
    preFetch: fetchPosts,
    beforeMount () {
      fetchPosts(this.$store, this.$route)
    }
  }

</script>
