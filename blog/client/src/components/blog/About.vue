<template>
  <article class="post about">
    <div class="toc">
      <h2>文章目录</h2>
      <div class="content" v-html="blog.toc"></div>
    </div>
    <div class="header">
      <h2 class="title">{{ blog.title }}</h2>
      <div class="meta">
        <div class="date">{{ blog.createTime }}</div>
      </div>
    </div>
    <div class="markdown-body" v-html="blog.content"></div>
  </article>
</template>

<script type="text/javascript">
  import config from '../../../config'
  import api from '@/api'

  export default {
    name: 'about',
    metaInfo: {
      title: 'About',
      titleTemplate: config.titleTemplate
    },
    data() {
      return {
        blog: {}
      }
    },
    beforeMount() {
      api.FETCH_BLOG({
        model: 'articles',
        query: {
          path: 'about'
        }
      }).then(res => {
        this.blog = res
      }).catch(err => console.log(err))
    },
    mounted() {
      api.view('blog', 'about')
    }
  }
</script>

<style lang="stylus">
#blog
  .about
    .markdown-body li
      list-style-type decimal
</style>
