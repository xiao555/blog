<template>
  <article class="post about">
    <div class="toc">
      <h2>文章目录</h2>
      <div class="content" v-html="toc"></div>
    </div>
    <div class="header">
      <h2 class="title">{{ blog.title }}</h2>
      <div class="meta">
        <div class="date">{{ blog.createTime }}</div>
      </div>
    </div>
    <div class="markdown-body" v-html="content"></div>
  </article>
</template>

<script type="text/javascript">
  import marked from 'marked'
  import uslug from 'uslug'
  import config from '../../../config'

  export default {
    name: 'about',
    metaInfo: {
      title: 'About',
      titleTemplate: config.titleTemplate
    },
    data() {
      return {
        blog: {},
        content: '',
        toc: ''
      }
    },
    beforeMount() {
      function renderMD(str) {
        const renderer = new marked.Renderer()
        let headings = []
        renderer.heading = (text, level) => {
          const escapedText = uslug(text)
          const duplicateIndex = headings.map(({ text }) => text).indexOf(escapedText)
          let duplicateText = undefined
          if (duplicateIndex === -1) {
            headings.push({
              id: escapedText,
              text: text,
              count: 0,
              level: level
            })
          } else {
            headings[duplicateIndex].count++
            duplicateText = `${escapedText}-${headings[duplicateIndex].count}`
          }
          return `<h${level} id="${duplicateText || escapedText}">${text}</h${level}>\n`
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
          path: 'about'
        }
      }).then(res => {
        this.blog = res
        let article = renderMD(res.content)
        this.content = article.content
        this.toc = article.toc
      }).catch(err => console.log(err))
    }
  }
</script>

<style lang="stylus">
#blog
  .about
    .markdown-body li
      list-style-type decimal
</style>
