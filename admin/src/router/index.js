// import Vue from 'vue/dist/vue.min'
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/Main'
import Edit from '@/components/post/edit'
// import PostList from '@/components/PostList'
import PostList from '@/components/post/List'
import Category from '@/components/Category'
import Tag from '@/components/Tag'
import User from '@/components/User'
// import CreateListView from '@/view/CreateListView'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/dashboard',
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
      path: '/post',
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
        },
        {
          path: 'category',
          name: 'category',
          component: Category
        },
        {
          path: 'tag',
          name: 'tag',
          component: Tag
        },
        {
          path: 'user',
          name: 'user',
          component: User
        }
      ]
    }
  ]
})
