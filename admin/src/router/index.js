import Vue from 'vue/dist/vue.min'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import Dashboard from '@/components/Dashboard'
import Main from '@/components/Main'
import NewPost from '@/components/NewPost'
// import PostList from '@/components/PostList'
import PostList from '@/components/post/List.vue'

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
          component: NewPost
        }
      ]
    }
  ]
})
