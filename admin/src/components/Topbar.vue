<template>
  <div class="topbar">
    <div id="menu" class="topbar-menu-icon" @click='toggleMenuActive'><i class="fa fa-bars" aria-hidden="true"></i>
    </div>
    <ul class="topbar-menu">
      <router-link :to="{ name: 'dashboard' }"><li class="item single"><i class="fa fa-home" aria-hidden="true"></i>首页</li></router-link>
      <li class="item">
        <div class="title" @click='toggleActive' :class="{ active: archieve == 'post'}"><i class="fa fa-file" aria-hidden="true"></i>文章管理</div>
        <ul class="submenu">
          <router-link :to="{ name: 'postList' }"><li class="subitem" :class="{ active: path == '/post/list'}">文章列表</li></router-link>
          <router-link :to="{ name: 'createPost' }"><li class="subitem" :class="{ active: path == '/post/create'}">添加文章</li></router-link>
        </ul>
      </li>
      <li class="item">
        <div class="title"  @click='toggleActive' :class="{ active: archieve == 'archieve'}"><i class="fa fa-archive" aria-hidden="true"></i>分类管理</div>
        <ul class="submenu">
          <li class="subitem">分类列表</li>
          <li class="subitem">添加分类</li>
        </ul>
      </li>
      <li class="item">
        <div class="title"  @click='toggleActive' :class="{ active: archieve == 'tag'}"><i class="fa fa-tag" aria-hidden="true"></i>标签管理</div>
        <ul class="submenu">
          <li class="subitem">标签列表</li>
          <li class="subitem">添加标签</li>
        </ul>
      </li>
      <li class="item single"><div class="single" :class="{ active: archieve == 'user'}" @click='toggleActive'><i class="fa fa-user" aria-hidden="true"></i>用户设置</div></li>
      <li class="item single"><div class="single" :class="{ active: archieve == 'system'}" @click='toggleActive'><i class="fa fa-cog" aria-hidden="true"></i>系统设置</div></li>
    </ul>
    <div class="login">{{ user }}
      <ul class="login-list slidedown">
        <li class="item">修改密码</li>
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
        user: '',
        isActive: true
      }
    },
    methods: {
      toggleMenuActive (event) {
        document.querySelector('#menu').classList.toggle('active')
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
        this.$store.state.user = {}
        this.$router.replace({ name: 'login' })
      }
    },
    beforeMount () {
      this.user = this.$store.state.user.name || '未登录'
    }
  }
</script>

<style lang="stylus">
@import '../assets/css/topbar.styl'
</style>
