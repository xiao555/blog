<template>
  <div class="sidebar">
    <div class="header">
      <div class="button"></div>
      <div class="rainbowBar">
        <div class="green"></div>
        <div class="blue"></div>
        <div class="indigo"></div>
        <div class="violet"></div>
      </div>
      <div class="content">
        <a class="name" href="/">Xiao 555</a>
        <div class="social"><a class="github" href="https://github.com/xiao555" target="_blank">Github</a>|
        <a class="facebook" href="https://www.facebook.com/profile.php?id=100009127309661" target="_blank">Facebook</a>

        </div>
        <div>
          <a class="email" href="mailto: zhangruiwu32@gmail.com">zhangruiwu32@gmail.com</a>
        </div>
      </div>
    </div>
    <div class="nav">
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'sidebar',
  data () {
    return {
      achieves: []
    }
  },
  beforeMount () {
    this.$store.dispatch('FETCH_VALUE', {
      model: 'articles',
      query: {
        status: 'Published'
      }
    }).then(res => {
      this.articles = res
    }).catch(err => console.log(err))
  }
}
</script>

<style lang="stylus">
@import '../assets/css/sidebar.styl'
</style>
