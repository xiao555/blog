<template>
    <article>
      <div class="header">
        <h2><router-link :to="'/posts/' + post.path" >{{ post.title }}</router-link></h2>
        <h4 class="date">{{ post.createTime }}  •  {{ post.category }}</h4>
      </div>
      <div class="excerpt" v-html="post.excerpt"></div>
      <div class="footer">
        <router-link class="readmore" :to="'/posts/' + post.path" >阅读全文</router-link>
      </div>
    </article>
  </div>
</template>

<script>
  import api from '@/api'

  export default {
    name: 'post-list-item',
    props: ['post']
  }
</script>
