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

<style lang="stylus">
article
  border-bottom 1px dotted #aaa
  padding-top 40px
  padding-bottom 20px
  .header, .footer
    margin-bottom 10px
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
</style>
