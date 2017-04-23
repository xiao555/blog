<template>
  <div class="list">
    <article v-for="post in articles">
      <div class="header">
        <h2><router-link :to="{ name:'post', params:{ path: post.path } }" >{{ post.title }}</router-link></h2>
        <h4 class="date">{{ post.createTime }}  •  {{ post.category }}</h4>
      </div>
      <vue-markdown :source="post.excerpt"></vue-markdown>
      <div class="footer">
        <router-link class="readmore" :to="{ name:'post', params:{ path: post.path } }" >阅读全文</router-link>
      </div>
    </article>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'list',
    props: ['options'],
    data () {
      return {
        articles: []
      }
    },
    components: {
      VueMarkdown
    },
    beforeMount () {
      const query = {
        status: 'Published'
      }
      if (this.options.query.hasOwnProperty('name')) {
        query[this.options.query.name] = this.$route.params[this.options.query.value]
      }
      console.log('query', query)
      this.$store.dispatch('FETCH_VALUE', {
        model: 'articles',
        query: query
      }).then(res => {
        this.articles = res
      }).catch(err => console.log(err))
    }
  }
</script>
