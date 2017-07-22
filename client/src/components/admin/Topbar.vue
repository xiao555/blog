<template>
  <div class="topbar">
    <div id="menu" class="topbar-menu-icon" @click='toggleMenuActive'><i class="fa fa-bars" aria-hidden="true"></i>
    </div>
    <div id="sidebar-menu" class="topbar-menu-icon" @click='toggleSidebarActive'><i class="fa fa-chevron-left left" aria-hidden="true"></i><i class="fa fa-chevron-right right" aria-hidden="true"></i>
    </div>
    <ul class="topbar-menu">
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
    <div class="login">{{ user }}
      <ul class="login-list slidedown">
        <li class="item" @click="logout">Logout</li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'topbar',
    data () {
      return {
        user: window.localStorage.getItem('username'),
        isActive: true,
        archieve: '',
        path: ''
      }
    },
    methods: {
      toggleMenuActive (event) {
        document.querySelector('.topbar-menu').classList.toggle('active')
      },
      toggleSidebarActive (event) {
        document.querySelector("#sidebar-menu").classList.toggle('active')
        document.querySelector(".sidebar").classList.toggle('active')
        document.querySelector("#admin").classList.toggle('active')
      },
      toggleActive (e) {
        let arr = document.getElementsByClassName('active')
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i] !== e.target) arr[i].classList.remove('active')
        }
        document.getElementById('menu').classList.toggle('active')
        e.target.classList.toggle('active')
      },
      logout () {
        this.$router.replace({ name: 'login' })
      }
    },
    beforeMount () {
    }
  }
</script>

<style lang="stylus">
#admin
  .topbar
    clearfix()
    height 50px
    border-bottom 1px solid grey-light
    position fixed
    top 0
    width 100%
    margin 0 -20px
    z-index 1
    background-color #f7f7f7
    text-align center
    .login
      position fixed
      top 0
      right 0
      line-height 50px
      float right
      width 100px
      cursor pointer
      &:after
        content "\F0DD"
        display inline-block
        font normal normal normal 14px/1 FontAwesome
        font-size inherit
        padding-bottom 8px
        margin-left 10px
        vertical-align middle
      &:hover
        &:after
          content "\f0de"
          padding-top 15px
        ul
          display block
    .login-list
      margin 0
      padding 0
      display none
      position absolute
      top 55px
      right 5px
      border 1px solid grey-light
      box-shadow 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
      z-index 5
      background-color  white
      .item
        line-height 30px
        margin 5px 0
        width 100px
        cursor pointer
        &:hover
          background-color blue-grey
      &:hover
        display block
      &:before
        display block
        position absolute
        width 100%
        content ' '
        height 10px
        top -10px
    .topbar-menu-icon
      float left
      width 50px
      height 50px
      line-height 50px
      cursor pointer
      &:hover
        opacity .7
      &:nth-of-type(1)
        display none
      &:nth-of-type(2)
        .right
          display none
        &.active
          .left
            display none
          .right
            display inline-block
      @media mq-mobile
        &:nth-of-type(1)
          display block
        &:nth-of-type(2)
          display none
    .topbar-menu
      position absolute
      width 100%
      max-height 0
      overflow hidden
      transition max-height 0.3s ease
      margin-top 50px
      z-index 9
      padding-left 0
      a
        color rgba(255,255,255,.5)
      &.active
        max-height 250px
      .router-link-active
        color #fff
      .item
        text-align left
        background-color grey-darken
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

</style>
