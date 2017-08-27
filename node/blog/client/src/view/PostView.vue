<template>
  <article class="post">
    <div class="toc">
      <h2>文章目录</h2>
      <div class="content" v-html="post.toc"></div>
      <div class="toggle" v-on:click="toggleMenu">文章目录</div>
    </div>
    <div class="header">
      <h2 class="title">{{ post.title }}</h2>
      <div class="meta">
        <div class="date">{{ post.createTime }}  •  {{ post.category }}</div>
      </div>
    </div>
    <div class="markdown-body" v-html="post.content"></div>
    <div class="backTop">
      <a id="back" v-on:click="backToTop">Back</a>
    </div>
  </article>
</template>

<script type="text/javascript">
  import config from '../../config'

  export default {
    name: 'post-view',

    props: {
      id: String
    },

    data () {
      return {
        post: this.$store.state.posts[this.$route.params.path] || {}
      }
    },

    methods: {
      backToTop: () => {
        document.documentElement.scrollTop = document.body.scrollTop = 0
      },
      toggleMenu: () => {
        document.querySelector('.toc').classList.toggle('show')
      }
    },

    computed: {
      siteURL () {
        return config.siteInfo.siteUrl
      },
    },

    title () {
      return this.id === 'about' ? 'About' : this.post.title
    },

    beforeMount () {
      if (this.id === 'about') {
        this.$route.params.path = 'about'
      }
      this.$store.dispatch('FETCH_LISTS', {
        model: 'articles',
        query: { path: this.$route.params.path }
      }).then(() => {
        this.post = this.$store.state.posts[this.$route.params.path]
      })
    },

    mounted() {
      this.$store.dispatch('VIEW_POST', { path: this.$route.params.path })
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

<style lang="stylus">
article
  border-bottom 1px dotted #aaa
  padding-top 40px
  padding-bottom 20px
  .header, .footer
    margin-bottom 10px
  .backTop
    position fixed
    right 2px
    bottom 40px
    opacity 0
    transition all .3s ease-out
    &.show
      opacity 1
    a
      color blue
      font-weight bolder
      transition all .3s ease-out
      cursor pointer
      &:hover
        color topmenu
  .toc
    position fixed
    width calc((100% - 800px) / 2 - 20px)
    min-width 180px
    right 10px
    top 10px
    margin 5px
    border 1px solid borderGray
    padding 5px
    a
      color link-blue
      &:hover
        color link-green
    h2
      font-size 18px
      border-bottom 1px solid borderGray
    ul#toc
      padding-left 0
      margin 0
      max-height 300px
      overflow-y auto
      ul
        padding-left 20px
    .toggle
      display none
      position absolute
      width 30px
      top 0
      left -35px
      background-color green
      color white
      padding 5px
      cursor pointer
      border-radius 5px
      transition all .3s ease-out
      &:hover
        background-color blue
    @media mq-below-desktop
      background-color white
      top 160px
      transform translateX(100% + 10px)
      transition all .3s ease-out
      &.show
        transform translateX(0)
      .toggle
        display block

  h2
    margin 0
    font-size 30px
    font-weight bolder
    color title
    a
      font-size 30px
      color title
      transition all .3s ease-out
      &:hover
        color blue
    @media mq-mobile
      font-size 26px
      a
        font-size 26px
  .date
    display inline-block
    margin 0
    font-family Meta
    font-size 12px
    font-weight 300
    position relative
  .readmore
    padding 8px 15px
    color white
    font-family 'Hiragino Sans GB'
    font-weight 600
    &:after
      content " »"
      display inline-block
      width 0
      height 100%
      line-height 15px
      vertical-align middle
      overflow hidden
      transition all .15s ease-in
    &:nth-child(2n+1)
      background-color violet
    &:nth-child(2n)
      background-color indigo
    &:hover
      background-color blue
      &:after
        width 16px
        padding-left 5px

$color-bg = #FFFFFF
$color-code-bg = #F7F7F7
$color-border = #DDDDDD
$color-border-top = #CCCCCC
$color-bottom-line = #EEEEEE
$color-lgray = #777777
$color-dgray = $color-border
$color-tag-a = #4078C0
$color-tag-tr = #F8F8F8
$color-font = #333333
$color-img-shadow = #555555

.margin-tb-zero
    margin-top: 0
    margin-bottom: 0

.markdown-body
  font-family: "Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  font-size: 16px
  color: $color-font
  line-height: 1.6
  word-wrap: break-word
  background: $color-bg

  & > *:first-child
    margin-top: 0 !important

  & > *:last-child
    margin-bottom: 0 !important

  *
    box-sizing: border-box

  h1,h2,h3,h4,h5,h6
    margin-top: 1em
    margin-bottom: 16px
    font-weight: bold
    line-height: 1.4

  p,blockquote,ul,ol,dl,table,pre
    margin-top: 0
    margin-bottom: 16px

  h1
    margin: 0.67em 0
    padding-bottom: 0.3em
    font-size: 2.25em
    line-height: 1.2
    border-bottom: 1px solid $color-bottom-line

  h2
    padding-bottom: 0.3em
    font-size: 1.75em
    line-height: 1.225
    border-bottom: 1px solid $color-bottom-line

  h3
    font-size: 1.5em
    line-height: 1.43

  h4
    font-size: 1.25em

  h5
    font-size: 1em

  h6
    font-size: 1em
    color: $color-lgray

  ol,ul
    padding-left: 2em

    ol
      list-style-type: lower-roman
      @extend .margin-tb-zero
    ul
      list-style-type: circle
      @extend .margin-tb-zero

      ol
        @extend .margin-tb-zero

      ul
        list-style-type: square
        @extend .margin-tb-zero

  ol
    list-style-type: decimal

  ul
    list-style-type: disc

  blockquote
    margin-left: 0
    margin-right: 0
    padding: 0 15px
    color: $color-lgray
    border-left: 4px solid $color-dgray

  table
    display: block
    width: 100%
    overflow: auto
    word-break: normal
    word-break: keep-all
    border-collapse: collapse
    border-spacing: 0

    tr
      background-color: $color-bg
      border-top: 1px solid $color-border-top

      &:nth-child(2n)
        background-color: $color-tag-tr

    th,td
      padding: 6px 13px
      border: 1px solid $color-border

  pre
    word-wrap: normal
    padding: 16px
    overflow: auto
    font-size: 85%
    line-height: 1.45
    background-color: $color-code-bg
    border-radius: 3px

    code
      display: inline
      max-width: initial
      padding: 0
      margin: 0
      overflow: initial
      font-size: 100%;
      line-height: inherit
      word-wrap: normal
      white-space: pre;
      border: 0
      border-radius: 3px
      background-color: transparent

      &:before, &:after
          content: normal

  code
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    padding: 0
    padding-top: 0.2em
    padding-bottom: 0.2em
    margin: 0
    font-size: 85%
    background-color: rgba(0,0,0,0.04)
    border-radius: 3px
    color: link-green
    font-weight: bolder

    &:before, &:after
        letter-spacing: -0.2em
        content: "\00a0"

  a
    text-decoration: none
    background: transparent
    color indigo
    font-weight 800
    cursor pointer
    &:hover
        opacity .7

  img
    max-width: 100%
    max-height: 100%
    border-radius: 4px;
    box-shadow: 0 0 10px $color-img-shadow

  strong
    font-weight: bold

  em
    font-style: italic

  del
    text-decoration: line-through

.task-list-item
  list-style-type: none

  input
    font: 13px / 1.4 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
    margin: 0 0.35em 0.25em -1.6em
    vertical-align: middle

  input[disabled]
    cursor: default

  input[type="checkbox"]
    box-sizing: border-box
    padding: 0

  input[type="radio"]
    box-sizing: border-box
    padding: 0


/*

Atom One Dark by Daniel Gamage
Original One Dark Syntax theme from https://github.com/atom/one-dark-syntax

base:    #282c34
mono-1:  #abb2bf
mono-2:  #818896
mono-3:  #5c6370
hue-1:   #56b6c2
hue-2:   #61aeee
hue-3:   #c678dd
hue-4:   #98c379
hue-5:   #e06c75
hue-5-2: #be5046
hue-6:   #d19a66
hue-6-2: #e6c07b

*/

.hljs {
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  color: #abb2bf;
  background: #282c34;
}

.hljs-comment,
.hljs-quote {
  color: #5c6370;
  font-style: italic;
}

.hljs-doctag,
.hljs-keyword,
.hljs-formula {
  color: #c678dd;
}

.hljs-section,
.hljs-name,
.hljs-selector-tag,
.hljs-deletion,
.hljs-subst {
  color: #e06c75;
}

.hljs-literal {
  color: #56b6c2;
}

.hljs-string,
.hljs-regexp,
.hljs-addition,
.hljs-attribute,
.hljs-meta-string {
  color: #98c379;
}

.hljs-built_in,
.hljs-class .hljs-title {
  color: #e6c07b;
}

.hljs-attr,
.hljs-variable,
.hljs-template-variable,
.hljs-type,
.hljs-selector-class,
.hljs-selector-attr,
.hljs-selector-pseudo,
.hljs-number {
  color: #d19a66;
}

.hljs-symbol,
.hljs-bullet,
.hljs-link,
.hljs-meta,
.hljs-selector-id,
.hljs-title {
  color: #61aeee;
}

.hljs-emphasis {
  font-style: italic;
}

.hljs-strong {
  font-weight: bold;
}

.hljs-link {
  text-decoration: underline;
}

</style>
