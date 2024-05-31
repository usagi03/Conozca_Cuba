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
import { useAuthStore } from '@/stores/auth.js'
import AcommodationsView from '@/views/AcommodationsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LogInView,
      meta: {
        requiredAuth: false,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiredAuth: true,
        role: 'admin,gerente,agente de ventas,cliente'
      }
    },
    {
      path: '/pruebas',
      name: 'prueba',
      component: PruebaInputs,
      meta: {
        requiredAuth: true,
        role: 'admin,gerente,agente de ventas,cliente'
      }
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: UsersView,
      meta: {
        requiredAuth: true,
        role: 'Administrador'
      }
    },
    {
      path: '/actividades',
      name: 'actividades_diarias',
      component: DailyActivitiesView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/hoteles',
      name: 'hoteles',
      component: HotelView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/habitaciones',
      name: 'habitaciones',
      component: RoomView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/temporadas',
      name: 'temporadas',
      component: SeasonView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/vehiculos',
      name: 'vehiculos',
      component: VehiclesView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/paquetes',
      name: 'paquetes',
      component: PackagesView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/km_cost',
      name: 'km',
      component: KmView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/hours_cost',
      name: 'hours',
      component: Km_hView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/route_cost',
      name: 'route',
      component: RutaView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/contratos',
      name: 'contracts',
      component: ContractView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      path: '/mealplans',
      name: 'mealplans',
      component: MealPlanView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    },
    {
      patch: '/alojamientos',
      name: 'alojamientos',
      component: AcommodationsView,
      meta: {
        requiredAuth: true,
        role: 'Administrador,Gerente,Agente de ventas'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const needAuth = to.meta.requiredAuth
  //const allowedRoles = to.meta.role.split(',')
  console.log(auth.token);
  if (needAuth && auth.token === '') {
    console.log('aqui')
    next('/')
  } else {
    console.log("aculla")
    next()
  }
})

export default router
