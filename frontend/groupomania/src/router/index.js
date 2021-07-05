import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/NotFound.vue'

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
