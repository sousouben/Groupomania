import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Profile from "@/views/Profile.vue";
import Infos from '../views/Infos.vue';
import Message from '../views/Message.vue';

const routes = [  
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    props: true
  },
  {
    path: '/about',
    name: 'About',    
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },  
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: () => import('../components/NotFound.vue'),
    meta: {
      title: '404 Not Found'
    }    
  },
  {
    path: '/infos',
    name: 'Infos',
    component: Infos
  },
  {
    path: '/message',
    name: 'Message',
    component: Message
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
