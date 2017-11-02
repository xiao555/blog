<template>
  <footer>
    <div class="copyright">Xiao555 @ 2017 <a href="http://www.miitbeian.gov.cn/" style="color: #706aa1">陕ICP备17008921号</a></div>
  </footer>
</template>

<script type="text/javascript">
  export default {
    name: 'footer'
  }
</script>

<style lang="stylus">
#blog
  footer
    max-width 800px
    padding 50px 0
    margin 0 auto
    width calc(100% - 400px)
    .social-links
      text-align center
      padding 0
      li
        display inline-block
        margin 0 20px
        a
          color #333
          opacity .5
          &:hover
            opacity 1
    .copyright
      margin-top 30px
      text-align center
      font-weight 700
      font-size 10px
    @media mq-tablet
      width calc(100% - 240px)
      margin-left 200px
    @media mq-mobile
      width 100%
      margin-left 0
</style>
