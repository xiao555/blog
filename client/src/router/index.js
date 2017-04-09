import Vue from 'vue'
import Router from 'vue-router'
import PostList from '@/components/PostList.vue'
import Post from '@/components/Post.vue'
import TagList from '@/components/TagList.vue'
import Tag from '@/components/Tag.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'posts',
      component: PostList
    },
    {
      path: '/posts/:path',
      name: 'post',
      component: Post
    },
    {
      path: '/tags',
      name: 'tags',
      component: TagList
    },
    {
      path: '/tags/:tagName',
      name: 'tag',
      component: Tag
    }
  ]
})
