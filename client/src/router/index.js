import Vue from 'vue'
import Router from 'vue-router'
import Blog from '@/view/Blog.vue'
import Post from '@/components/blog/Post.vue'
import About from '@/components/blog/About.vue'
import List from '@/components/blog/List.vue'
import Archive from '@/components/blog/Archive.vue'

import Admin from '@/view/Admin.vue'
import Login from '@/components/admin/Login.vue'
import Dashboard from '@/components/admin/Dashboard.vue'
import Category from '@/components/admin/Category.vue'
import PostList from '@/components/admin/post/List.vue'
import Edit from '@/components/admin/post/Edit.vue'
import Main from '@/components/admin/Main.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Blog,
      children: [
        {
          path: '/',
          name: 'posts',
          component: List
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
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: '/admin/',
          name: 'login',
          component: Login
        },
        {
          path: '/admin/dashboard',
          component: Main,
          children: [
            {
              path: '/',
              name: 'dashboard',
              component: Dashboard
            }
          ]
        },
        {
          path: '/admin/',
          component: Main,
          children: [
            {
              path: 'category',
              name: 'category',
              component: Category
            }
          ]
        },
        {
          path: '/admin/post',
          component: Main,
          children: [
            {
              path: 'list',
              name: 'postList',
              component: PostList
            },
            {
              path: 'create',
              name: 'createPost',
              component: Edit
            },
            {
              path: 'edit/:path',
              name: 'editPost',
              component: Edit
            }
          ]
        }
      ]
    }
  ]
})
