<template>
  <div class="sidebar">
    <div class="logo">
      <img :src="header" alt="logo">
    </div>
    <ul class="sidebar-menu">
      <li class="item">
        <div class="single" :class="{ active: archieve == 'dashboard'}" @click='toggleActive'><router-link :to="{ name: 'dashboard' }"><i class="fa fa-home" aria-hidden="true"></i>首页</router-link></div>
      </li>
      <li class="item">
        <div class="title" @click='toggleActive' :class="{ active: archieve == 'post'}"><i class="fa fa-file" aria-hidden="true"></i>文章管理</div>
        <ul class="submenu">
          <router-link :to="{ name: 'postList' }"><li class="subitem" :class="{ active: path == '/admin/post/list'}">文章列表</li></router-link>
          <router-link :to="{ name: 'createPost' }"><li class="subitem" :class="{ active: path == '/admin/post/create'}">添加文章</li></router-link>
        </ul>
      </li>
      <li class="item">
        <div class="single" :class="{ active: archieve == 'category'}" @click='toggleActive'><router-link :to="{ name: 'category' }"><i class="fa fa-archive" aria-hidden="true"></i>分类管理</router-link></div>
      </li>
      <!-- <li class="item"><div class="single" :class="{ active: archieve == 'system'}" @click='toggleActive'><i class="fa fa-cog" aria-hidden="true"></i>系统设置</div></li> -->
    </ul>
  </div>
</template>

<script>
  import config from '../../../config'
  export default {
    name: 'sidebar',
    data () {
      return {
        archieve: '',
        path: '',
        header: config.headerImg
      }
    },
    methods: {
      toggleActive: (e) => {
        let arr = document.querySelectorAll('.sidebar-menu .active')
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i] !== e.target) arr[i].classList.remove('active')
        }
        e.target.classList.toggle('active')
      }
    },
    beforeMount () {
      const archieve = this.$route.path.split('/').slice(0, 3)
      this.archieve = archieve[2]
      this.path = this.$route.path
    }
  }
</script>

<style lang="stylus">
#admin
  .sidebar
    position fixed
    top 0
    left 0
    bottom 0
    width 140px
    color white
    float left
    height 100%
    background-color grey-darken
    transition width .3s ease
    &.active
      width 35px
      overflow hidden
      .logo svg
        width 80%
        margin-left 10%
      .sidebar-menu .item
        .title, .single
          padding-left 10px
        .title.active + .submenu
          max-height 0
    .logo
      margin-top 10px
      margin-bottom 10px
      img
        display block
        margin 0 auto
        width 60%
        border-radius 50%

    .sidebar-menu
      width 140px
      padding-left 0
      a
        color rgba(255,255,255,.5)
      .router-link-active
        color #fff
      .item
        text-align left
        .title
          padding-left 20px
          line-height 50px
          position relative
          cursor pointer
          color rgba(255,255,255,.5)
          &:hover
            background-color #4fc3f7
            color #fff
          i
            margin-right 10px
          &:after
            content "\f107"
            display inline-block
            position absolute
            right 10px
            top 17px
            font normal normal normal 14px/1 FontAwesome
            font-size inherit
          &.active
            color white
          &.active:after
            content "\f106"
          &.active +.submenu
            max-height 100px
        .single
          text-align left
          padding-left 20px
          line-height 50px
          position relative
          cursor pointer
          a
            color rgba(255,255,255,.5)
            &.router-link-active
              color #fff
          &:hover
            background-color #4fc3f7
            a
              color #fff
          i
            margin-right 10px
        .submenu
          padding-left 0
          overflow hidden
          max-height 0
          transition max-height 0.3s ease
          .subitem
            line-height 50px
            padding-left 45px
            cursor pointer
            &:hover
              background-color #4fc3f7
              color #fff
    @media mq-mobile
      display none
</style>
