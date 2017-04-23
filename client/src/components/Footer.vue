<template>
  <footer>
    <ul class="social-links">
      <li><a href="https://github.com/xiao555" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a></li>
      <li><a href="http://www.linkedin.com/in/%E7%9D%BF%E6%AD%A6-%E5%BC%A0-4932b5100/"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
      <li><a href="mailto: zhangruiwu32@gmail.com"><i class="fa fa-envelope-o" aria-hidden="true"></i></a></li>
    </ul>
    <div class="copyright">Xiao555 @ 2017</div>
  </footer>
</template>

<script type="text/javascript">
  export default {
    name: 'footer'
  }
</script>

<style lang="stylus"> 
footer
  padding 50px 0 
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
</style>
