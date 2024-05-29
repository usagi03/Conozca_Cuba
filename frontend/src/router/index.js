import { createRouter, createWebHistory } from 'vue-router'
import LogInView from '@/components/LoginNew.vue'
import HomeView from '@/views/HomeView.vue'
import PruebaInputs from '@/views/PruebaInputs.vue'
import UsersView from '@/views/UsersView.vue'
import DailyActivitiesView from '@/views/DailyActivitiesView.vue'
import HotelView from '@/views/HotelView.vue'
import RoomView from '@/views/RoomView.vue'
import SeasonView from '@/views/SeasonView.vue'
import VehiclesView from '@/views/VehiclesView.vue'
import PackagesView from '@/views/PackagesView.vue'
import KmView from '@/views/kmView.vue'
import Km_hView from '@/views/km_hView.vue'
import RutaView from '@/views/RouteView.vue'
import ContractView from '@/views/ContractView.vue'
import MealPlanView from '@/views/MealPlanView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LogInView
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pruebas',
      name: 'prueba',
      component: PruebaInputs
    },
    {
      path: '/usuarios',
      name: 'usuarios',
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
      component: RoomView,
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
    {
      path: '/km_cost',
      name: 'km',
      component: KmView
    },
    {
      path: '/hours_cost',
      name: 'hours',
      component: Km_hView
    },
    {
      path: '/route_cost',
      name: 'route',
      component: RutaView
    },
    {
      path: '/contratos',
      name: 'contracts',
      component: ContractView
    },
    {
      path: '/mealplans',
      name: 'mealplans',
      component: MealPlanView
    },
  ]
})

export default router
