import Vue from 'vue'
import Router from 'vue-router'
import Post from '@/components/Post.vue'
import About from '@/components/About.vue'
import CreateListView from '@/components/views/CreateListView.js'
import Archive from '@/components/Archive.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'posts',
      component: CreateListView({
        name: 'posts',
        query: {}
      })
    },
    {
      path: '/posts/:path',
      name: 'post',
      component: Post
    },
    {
      path: '/archive',
      name: 'archive',
      component: Archive
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
