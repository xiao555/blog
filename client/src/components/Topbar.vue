<template>
  <div class="topbar">
    <ul>
      <li><router-link class="link" :to="{ path: '/' }"><i class="fa fa-home" aria-hidden="true"></i>首页</router-link></li>
      <li><router-link class="link" :to="{ name: 'categorys' }"><i class="fa fa-leaf" aria-hidden="true"></i>分类</router-link></li>
      <li><router-link class="link" :to="{ name: 'tags' }"><i class="fa fa-tags" aria-hidden="true"></i>标签</router-link></li>
      <li><router-link class="link" :to="{ name: 'about' }"><i class="fa fa-user" aria-hidden="true"></i>关于</router-link></li>
      <!-- <li v-for="item in categorys">
        <router-link :to="{ name: 'categorys', params:{ category: item.name }}"><i class="fa fa-leaf" aria-hidden="true"></i>{{item.name}}</router-link>
      </li> -->
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'topbar',
  data () {
    return {
      categorys: []
    }
  },
  beforeMount () {
    this.$store.dispatch('FETCH_VALUE', {
      model: 'categorys'
    }).then(res => {
      this.categorys = res
    }).catch(err => console.log(err))
  }
}
</script>

<style lang="stylus">
@import '../assets/css/topbar.styl'
</style>
