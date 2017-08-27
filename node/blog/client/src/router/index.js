import Vue from 'vue'
import Router from 'vue-router'
//
// import Post from '@/components/blog/Post.vue'
// import About from '@/components/blog/About.vue'
// // import List from '@/components/blog/List.vue'
// import Archive from '@/components/blog/Archive.vue'
//
// import Admin from '@/view/Admin.vue'
// import Login from '@/components/admin/Login.vue'
// import Dashboard from '@/components/admin/Dashboard.vue'
// import Category from '@/components/admin/Category.vue'
// import PostList from '@/components/admin/post/List.vue'
// import Edit from '@/components/admin/post/edit.vue'
// import Main from '@/components/admin/Main.vue'

const createListView = id => () => import('../view/CreateListView').then(m => m.default(id))
const createPostView = id => () => import('../view/CreatePostView').then(m => m.default(id))
const Blog = () => import('../view/Blog.vue')
const Archive = () => import('../view/ArchiveView.vue')
const Admin = () => import('@/view/Admin.vue')
const Login = () => import('@/components/admin/Login.vue')
const Dashboard = () => import('@/components/admin/Dashboard.vue')
const Category = () => import('@/components/admin/Category.vue')
const List = () => import('@/components/admin/post/List.vue')
const Edit = () => import('@/components/admin/post/Edit.vue')

Vue.use(Router)

export function createRouter () {
  return new Router({
    mode: 'history',
    // scrollBehavior: () => ({ y: 0 }), // 切换路由时回到顶部
    routes: [
      { path: '/', component: Blog, children: [
        { path: '/:page(\\d+)?', component: createListView({
            model: 'articles',
            query: { status: 'Published' }
          })
        },
        { path: '/posts/:path', component: createPostView({
            post: '',
          })
        },
        { path: '/archive', component: Archive },
        { path: '/about', component: createPostView({
            post: 'about',
          })
        },
      ]},
      { path: '/admin/login', component: Login },
      { path: '/admin', component: Admin, children: [
        { path: '/admin/', component: Dashboard },
        { path: '/admin/category', component: Category },
        { path: '/admin/post/list', component: List },
        { path: '/admin/post/create', component: Edit },
        { path: '/admin/post/edit/:path', component: Edit },
      ]}
    ]
  })
}
// default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/admin',
//       component: Admin,
//       children: [
//         {
//           path: '/admin/',
//           name: 'login',
//           component: Login
//         },
//         {
//           path: '/admin/dashboard',
//           component: Main,
//           children: [
//             {
//               path: '/',
//               name: 'dashboard',
//               component: Dashboard
//             }
//           ]
//         },
//         {
//           path: '/admin/',
//           component: Main,
//           children: [
//             {
//               path: 'category',
//               name: 'category',
//               component: Category
//             }
//           ]
//         },
//         {
//           path: '/admin/post',
//           component: Main,
//           children: [
//             {
//               path: 'list',
//               name: 'postList',
//               component: PostList
//             },
//             {
//               path: 'create',
//               name: 'createPost',
//               component: Edit
//             },
//             {
//               path: 'edit/:path',
//               name: 'editPost',
//               component: Edit
//             }
//           ]
//         }
//       ]
//     }
//   ]
// })
