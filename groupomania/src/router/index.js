import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Login from '../components/Login.vue';
import Signup from '../components/Signup.vue';
import NewPost from '../components/NewPost.vue';
import AllPost from '../components/AllPost.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path:'/login',
    name: 'login',
    component: Login

  },
  {
    path:'/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/new',
    name: 'NewPost',
    component: NewPost
  },
  {
    path: '/',
    name: 'getPosts',
    component: AllPost

  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound,
    meta:{
      title: '404 Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
