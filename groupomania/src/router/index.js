import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';
import Login from '../views/Login.vue';

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
    name: 'Login',
    component: Login

  },
  {
    path: '/myprofile',
    name: 'Profile',
    component: () => import('../views/Profile.vue')

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
