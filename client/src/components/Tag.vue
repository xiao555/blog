<template>
  <main class="tag">
    <h1 class="title">Posts with tag: {{ tag }}</h1>
    <article v-for="post in posts">
      <div class="header">
        <h2><router-link :to="{ name:'post', params:{ id: post._id } }" >{{ post.title }}</router-link></h2>
        <h4 class="date">{{ post.createTime }}</h4>
      </div>
      <p v-html="post.excerpt"></p>
      <router-link :to="{ name:'post', params:{ id: post._id } }" >继续阅读</router-link>
    </article >
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'

  function fetchPosts (store, { path, query, params }, callback) {
    return store.dispatch('FETCH_POSTS', {
      model: 'articles',
      query: {
        tags: params.tagName,
        isPublic: true
      },
      callback
    })
  }

  export default {
    name: 'tag',
    computed: {
      ...mapGetters([
        'posts'
      ]),
      tag () {
        return this.$route.params.tagName
      }
    },
    preFetch: fetchPosts,
    beforeMount () {
      fetchPosts(this.$store, this.$route)
    }
  }

</script>
