import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '@/components/LogIn.vue'
import EjemploView from '@/views/EjemploView.vue'
import PruebaInputs from '@/views/PruebaInputs.vue'
import UsersView from '@/views/UsersView.vue'
import DailyActivitiesView from '@/views/DailyActivitiesView.vue'
import HotelView from '@/views/HotelView.vue'
import RoomView from '@/views/RoomView.vue'
import SeasonView from '@/views/SeasonView.vue'
import VehiclesView from '@/views/VehiclesView.vue'
import PackagesView from '@/views/PackagesView.vue'

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
      name: 'prueba',
      component: PruebaInputs
    },
    {
      path: '/usuario',
      name: 'usuario',
      component: UsersView
    },
    {
      path: '/actividades',
      name: 'actividades_diarias',
      component: DailyActivitiesView
    },
    {
      path: '/hoteles',
      name: 'hoteles',
      component: HotelView
    },
    {
      path: '/habitaciones',
      name: 'habitaciones',
      component: RoomView
    },
    {
      path: '/temporadas',
      name: 'temporadas',
      component: SeasonView
    },
    {
      path: '/vehiculos',
      name: 'vehiculos',
      component: VehiclesView
    },
    {
      path: '/paquetes',
      name: 'paquetes',
      component: PackagesView
    },
  ]
})

export default router
