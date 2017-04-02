<template>
  <div class="sidebar">
    <div class="logo" v-html="logo"></div>
    <ul class="sidebar-menu">
      <li class="item"><div class="single" :class="{ active: archieve == 'dashboard'}" @click='toggleActive'><router-link :to="{ name: 'dashboard' }"><i class="fa fa-home" aria-hidden="true"></i>首页</router-link></div></li>
      <li class="item">
        <div class="title" @click='toggleActive' :class="{ active: archieve == 'post'}"><i class="fa fa-file" aria-hidden="true"></i>文章管理</div>
        <ul class="submenu">
          <li class="subitem" :class="{ active: path == '/post/list'}"><router-link :to="{ name: 'postList' }">文章列表</router-link></li>
          <li class="subitem">添加文章</li>
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
      <li class="item"><div class="single" :class="{ active: archieve == 'user'}" @click='toggleActive'><i class="fa fa-user" aria-hidden="true"></i>用户设置</div></li>
      <li class="item"><div class="single" :class="{ active: archieve == 'system'}" @click='toggleActive'><i class="fa fa-cog" aria-hidden="true"></i>系统设置</div></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        logo: require('./Logo.html'),
        archieve: '',
        path: ''
      }
    },
    methods: {
      toggleActive: (e) => {
        let arr = document.getElementsByClassName('active')
        for (var i = arr.length - 1; i >= 0; i--) {
          if (arr[i] !== e.target) arr[i].classList.remove('active')
        }
        e.target.classList.toggle('active')
      }
    },
    beforeMount () {
      const archieve = this.$route.path.split('/').slice(0, 3)
      this.archieve = archieve[1]
      this.path = this.$route.path
    }
  }
</script>

<style lang="stylus">
@import '../assets/css/sidebar.styl'
</style>
