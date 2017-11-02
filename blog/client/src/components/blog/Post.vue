<template>
  <article class="post">
    <div class="toc">
      <h2>文章目录</h2>
      <div class="content" v-html="blog.toc"></div>
      <div class="toggle" v-on:click="toggleMenu">文章目录</div>
    </div>
    <div class="header">
      <h2 class="title">{{ blog.title }}</h2>
      <div class="meta">
        <div class="date">{{ blog.createTime }}  •  {{ blog.category }}</div>
      </div>
    </div>
    <div class="markdown-body" v-html="blog.content"></div>
    <div class="backTop">
      <a id="back" v-on:click="backToTop">Back</a>
    </div>
  </article>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import config from '../../../config'
  import api from '@/api'

  export default {
    name: 'post',
    metaInfo() {
      return {
        title: this.blog.title,
        titleTemplate: config.titleTemplate
      }
    },
    data () {
      return {
        blog: {},
        backToTop: () => {
          document.documentElement.scrollTop = document.body.scrollTop = 0
        },
        toggleMenu: () => {
          document.querySelector('.toc').classList.toggle('show')
        }
      }
    },
    computed: {
      ...mapGetters([
        'siteInfo'
      ]),
      siteURL () {
        return this.siteInfo.siteUrl
      },
    },
    beforeMount () {
      api.FETCH_BLOG({
        model: 'articles',
        query: {
          path: this.$route.params.path
        }
      }).then(res => {
        this.blog = res
      }).catch(err => console.log(err))
    },
    mounted() {
      api.view('blog', this.$route.params.path)
      window.addEventListener('scroll',(e) => {
        // 过滤没有backTop的页面
        if (document.querySelector('.backTop')) {
          window.scrollY > 0
          ? document.querySelector('.backTop').classList.add('show')
          : document.querySelector('.backTop').classList.remove('show')
        }
      })
    }
  }
</script>
