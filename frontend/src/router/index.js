import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import EjemploView from '@/views/EjemploView.vue'
import PruebaInputs from '@/views/PruebaInputs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LogIn
    },
    {
      path: '/ejemploPantalla',
      name: 'ejemploPantalla',
      component: EjemploView
    },
    {
      path: '/pruebas',
      name: 'hoteles',
      component: PruebaInputs
    },
  ]
})

export default router
