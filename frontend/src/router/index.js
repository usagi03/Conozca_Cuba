import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LogIn
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/home/hoteles',
      name: 'hoteles',
      component: LogIn
    },
  ]
})

export default router
