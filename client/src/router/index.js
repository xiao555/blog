import Vue from 'vue'
import Router from 'vue-router'
// import PostList from '@/components/PostList.vue'
import CategoryList from '@/components/CategoryList.vue'
import Post from '@/components/Post.vue'
import TagList from '@/components/TagList.vue'
// import Tag from '@/components/Tag.vue'
import About from '@/components/About.vue'
import CreateListView from '@/components/views/CreateListView.js'

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
      path: '/tags',
      name: 'tags',
      component: TagList
    },
    {
      path: '/tags/:tagName',
      name: 'tag',
      component: CreateListView({
        name: 'tags',
        query: {
          name: 'tags',
          value: 'tagName'
        }
      })
    },
    {
      path: '/categorys',
      name: 'categorys',
      component: CategoryList
    },
    {
      path: '/categorys/:category',
      name: 'category',
      component: CreateListView({
        name: 'categorys',
        query: {
          name: 'category',
          value: 'category'
        }
      })
    },
    {
      path: '/aboutme',
      name: 'about',
      component: About
    }
  ]
})
