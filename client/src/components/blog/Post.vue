<template>
  <article class="post">
    <div class="toc">
      <h2>文章目录</h2>
      <div class="content" v-html="toc"></div>
      <div class="toggle" v-on:click="toggleMenu">文章目录</div>
    </div>
    <div class="header">
      <h2 class="title">{{ blog.title }}</h2>
      <div class="meta">
        <div class="date">{{ blog.createTime }}  •  {{ blog.category }}</div>
      </div>
    </div>
    <div class="markdown-body" v-html="content"></div>
    <div class="backTop">
      <a id="back" v-on:click="backToTop">Back</a>
    </div>
  </article>
</template>

<script type="text/javascript">
  import { mapGetters } from 'vuex'
  import marked from 'marked'
  import uslug from 'uslug'
  import config from '../../../config'
  import api from '../../store/api'

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
        content: '',
        toc: '',
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
      function renderMD(str) {
        const renderer = new marked.Renderer()
        let headings = []
        renderer.heading = (text, level) => {
          const escapedText = uslug(text)
          headings.push({
            id: escapedText,
            text: text,
            count: 0,
            level: level
          })
          return `<h${level} id="${escapedText}">${text}</h${level}>\n`
        }

        // Synchronous highlighting with highlight.js
        marked.setOptions({
          highlight: function (code) {
            return require('highlight.js').highlightAuto(code).value;
          }
        })

        let result =  marked(str, { renderer: renderer })
        let toc = "<ul id='toc'>\n"
        let currLevel = headings[0].level
        for (let i = 0; i < headings.length; i++) {
          if (headings[i].level == currLevel) {
            toc += `<li><a href="#${headings[i].id}">${headings[i].text}</a>\n`
          } else if (headings[i].level > currLevel) {
            toc += `<ul><li><a href="#${headings[i].id}">${headings[i].text}</a>\n`
          } else {
            toc += `</ul>\n<li><a href="#${headings[i].id}">${headings[i].text}</a>\n`
          }
          currLevel = headings[i].level
        }
        toc += "</ul>"
        return {
          toc: toc,
          content: result
        }
        // return marked(str)
        // console.log(marked(markdownString));
      }
      this.$store.dispatch('FETCH_BLOG', {
        model: 'articles',
        query: {
          path: this.$route.params.path
        }
      }).then(res => {
        this.blog = res
        let article = renderMD(res.content)
        this.content = article.content
        this.toc = article.toc
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
