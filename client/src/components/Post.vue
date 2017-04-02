<template>
  <div class="post">
    <h1 class="title">{{ blog.title }}</h1>
    <div class="meta">
      <div class="date">{{ blog.createTime }}</div>
    </div>
    <div class="entry-content" v-html="blog.content"></div>
    <p>本文链接：<a :href="siteURL + '/#/posts/' + blog.path">{{siteURL}}/#/posts/{{blog.path}}</a></p>
    <div class="post-info">
      <p>发表于<i>{{blog.createTime}}</i>
        添加在分类{{blog.category}}下, 并被添加「
        <router-link v-for="tag in blog.tags" 
          :to="{name:'tag', params: { tagName: tag }}" 
          :data-tag="tag"> 
          <code class="notebook">{{tag}}</code>
        </router-link>」标签，最后修改于{{blog.lastEditTime}}
      </p>
    </div>
  </div>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'

  function fetchBlog (store, { path, query, params }, callback) {
    console.log(query, params)
    return store.dispatch('FETCH_BLOG', {
      model: 'articles',
      query: {
        path: params.path
      },
      callback
    })
  }
  export default {
    name: 'post',
    computed: {
      ...mapGetters([
        'blog',
        'siteInfo'
      ]),
      siteURL () {
        return this.siteInfo.siteUrl
      }
    },
    beforeMount () {
      fetchBlog(this.$store, this.$route)
    }
  }
</script>
