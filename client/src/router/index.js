import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList.vue'
import Post from '@/components/Post.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostList
    },
    {
      path: '/posts/:id',
      name: 'post',
      component: Post
    }
  ]
})
