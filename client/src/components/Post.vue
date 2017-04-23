<template>
  <article class="post">
    <div class="header">
      <h2 class="title">{{ blog.title }}</h2>
      <div class="meta">
        <div class="date">{{ blog.createTime }}  •  {{ blog.category }}</div>
      </div>
    </div>
    <div class="markdown-body">
      <vue-markdown :source="source"></vue-markdown>
    </div>
  </article>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import VueMarkdown from 'vue-markdown'

  export default {
    name: 'post',
    data () {
      return {
        blog: {},
        source: ''
      }
    },
    components: {
      VueMarkdown
    },
    computed: {
      ...mapGetters([
        'siteInfo'
      ]),
      siteURL () {
        return this.siteInfo.siteUrl
      }
    },
    beforeMount () {
      this.$store.dispatch('FETCH_BLOG', {
        model: 'articles',
        query: {
          path: this.$route.params.path
        }
      }).then(res => {
        this.blog = res
        this.source = res.content
      }).catch(err => console.log(err))
    }
  }
</script>
