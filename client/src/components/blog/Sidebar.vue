<template>
  <div class="sidebar">
    <div class="inner">
      <a class="logo" href="/">
        <div class="header" style="background-image: url('/public/header.jpg'); background-size: cover;"></div>
      </a>
      <h1>
        <a href="/">Xiao555</a>
      </h1>
      <p class="desc">Web Developer</p>
      <nav>
        <ul>
          <li><router-link class="link" :to="{ path: '/' }">Home<span>/</span></router-link></li>
          <li><router-link class="link" :to="{ name: 'archive' }">Archive<span>/</span></router-link></li>
          <li><router-link class="link" :to="{ name: 'about' }">About</router-link></li>
        </ul>
      </nav>
      <div class="links">
        <a :href="links.github" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a>
        <a :href="links.weibo" target="_blank"><i class="fa fa-weibo" aria-hidden="true"></i></a>
        <a :href="links.zhihu" target="_blank">
          <svg width="20" height="20" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g class="transform-group"><g transform="scale(0.015625, 0.015625)"><path d="M546.870613 564.616533c0 0-0.283307-76.15488-24.490667-76.15488l-168.727893 0c5.614933-87.37792 7.07584-166.372693 7.07584-236.909227l164.99712 0c0 0 6.345387-72.758613-27.661653-71.922347L212.657493 179.63008c11.236693-42.304853 25.381547-85.992107 42.30144-131.15392 0 0-77.615787 0-104.075947 69.61152-10.922667 28.740267-42.594987 139.13088-98.99008 251.92448 19.008853-2.030933 81.814187-3.761493 118.807893-71.604907 6.8096-18.940587 8.106667-21.469867 16.56832-46.854827l93.07136 0c0 33.839787 0.488107 80.59904-2.286933 136.97024 0 53.69856-1.563307 78.721707-3.126613 99.938987L106.30144 488.461653c-37.860693 0-50.182827 76.15488-50.182827 76.15488l211.531093 0c-14.144853 160.764587-90.29632 294.751573-228.447573 401.906347 22.531413 22.521173 134.925653-0.822613 164.478293-30.50496 0 0 74.113707-67.341653 114.742613-223.330987 53.541547 62.078293 98.686293 117.077333 135.379627 164.98688 16.92672 22.59968 38.079147 46.544213 38.079147 46.544213s26.108587-88.808107-3.416747-131.05152c-24.439467-28.78464-91.112107-107.24352-119.268693-135.482027l-46.5408 38.079147c14.08-45.069653 22.551893-88.845653 25.388373-131.150507L546.870613 564.61312 546.870613 564.616533zM589.17888 869.003947l75.54048 0.023893 24.203947 84.52096c0 0 115.841707-84.52096 136.144213-84.52096 20.30592 0 79.346347-0.023893 79.346347-0.023893l80.387413 0L984.80128 167.458133 589.17888 167.458133 589.17888 869.003947 589.17888 869.003947zM669.569707 243.6096l234.847573 0 0 549.259947-90.09152 0-91.409067 58.453333-14.94016-58.344107-38.406827-0.105813L669.569707 243.6096 669.569707 243.6096z"></path></g></g></svg>
        </a>
        <a :href="links.email" target="_blank"><i class="fa fa-envelope-o" aria-hidden="true"></i></a>
        <a :href="links.rss" target="_blank"><i class="fa fa-rss-square" aria-hidden="true"></i></a>
      </div>

    </div>
  </div>
</template>

<script type="text/javascript">
import config from '../../../config'
export default {
  name: 'sidebar',
  data () {
    return {
      links: config.links
    }
  }
}
</script>

<style lang="stylus">
hoverblue()
  &:hover
    color blue
#blog
  .sidebar
    position fixed
    top 0
    left 0
    bottom 0
    width calc((100% - 800px) / 2)
    min-width 200px
    .inner
      padding 70px 10%
      .logo
        display block
        margin 0 auto
        width 160px
        height 160px
        border-radius 50%
        div
          width 100%
          height 100%
          border-radius 50%
      h1
        margin-bottom 0
        a
          color indigo
          hoverblue()
      .links
        text-align center
        a
          display inline-block
          width 20px
          height 20px
          color indigo
          hoverblue()
          svg
            width 14px
            height 14px
            fill indigo
            &:hover
              fill blue
      p
        text-align center
        margin-top 0
        color indigo
      nav
        ul
          padding-left 0
          text-align center
        li
          font-size 12px
          display inline-block
          a
            color violet
            hoverblue()
          span
            margin 0 5px
    @media mq-mobile
      position relative
      bottom auto
      width 100%
      background-color lavender
</style>
