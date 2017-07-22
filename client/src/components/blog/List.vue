<template>
  <div class="list">
    <article v-for="post in articles">
      <div class="header">
        <h2><router-link :to="{ name:'post', params:{ path: post.path } }" >{{ post.title }}</router-link></h2>
        <h4 class="date">{{ post.createTime }}  •  {{ post.category }}</h4>
      </div>
      <div class="excerpt" v-html="post.excerpt"></div>
      <div class="footer">
        <router-link class="readmore" :to="{ name:'post', params:{ path: post.path } }" >阅读全文</router-link>
      </div>
    </article>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: 'list',
    data () {
      return {
        articles: []
      }
    },
    beforeMount () {
      const query = {
        status: 'Published'
      }
      api.FETCH_VALUE({
        model: 'articles',
        query: query
      }).then(res => {
        this.articles = res
      }).catch(err => console.log(err))
    }
  }
</script>
