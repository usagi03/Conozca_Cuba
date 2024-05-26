<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-indigo-400 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
  >
    <div
      class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
    >
      <!-- Toggler -->
      
      <!-- Brand -->
      
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="h-20 mx-auto w-50" src="@/assets/logo en blanco.png" alt="Your Company">
      <hr class="mx-3 mt-3"/>
      </div>
      
      <!-- Collapse -->
      <div
        class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        
        <!-- Form -->
        
        <!-- Navigation -->
        <ul class="md:flex-col md:min-w-full flex flex-col list-none ">
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border rounded-3xl h-10">
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/home"
              ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
              <HomeIcon/>
              <span class="ml-4">Inicio</span></a
            > 
            </div>
          </li>
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/usuarios"
              ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
              <UsersIcon/>
              <span class="ml-4">Usuarios</span></a
            > 
            </div>
          </li>
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
              <button class="rounded-md focus:outline-none "
              @click="togglePagesMenu('housing')"
                aria-haspopup="true">
            <div class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1 px-2">
              <HotelIcon/>
              <span class="ml-4">Alojamiento</span> 
              <DownIcon v-if="!housing" class="ml-6"/>
              <TopIcon v-else class="ml-6"/>
            </div>
            </button>
            </div>
            <template v-if="housing || this.$route.name == 'hoteles' || this.$route.name == 'temporadas'
            || this.$route.name == 'habitaciones'">
                <ul
                  x-transition:enter="transition-all ease-in-out duration-300"
                  x-transition:enter-start="opacity-25 max-h-0"
                  x-transition:enter-end="opacity-100 max-h-xl"
                  x-transition:leave="transition-all ease-in-out duration-300"
                  x-transition:leave-start="opacity-100 max-h-xl"
                  x-transition:leave-end="opacity-0 max-h-0"
                  class="p-2 mt-2 mb-2 space-y-2 overflow-hidden text-sm font-medium text-white rounded-md shadow-inner bg-indigo-500 "
                  aria-label="submenu"
                >
                  <li
                    class="px-2 py-1 transition-colors duration-150"
                  >
                    <a class="w-full" href="/hoteles">
                      Hoteles
                    </a>
                  </li>
                  <li
                    class="px-2 py-1 transition-colors duration-150"
                  >
                    <a class="w-full" href="/temporadas">
                      Temporadas
                    </a>
                  </li>
                  <li
                    class="px-2 py-1 transition-colors duration-150"
                  >
                    <a class="w-full" href="/habitaciones">
                      Habitaciones
                    </a>
                  </li>
                </ul>
              </template>
          </li>
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
              <button class="rounded-md focus:outline-none "
              @click="togglePagesMenu('transport')"
                aria-haspopup="true">
            <div class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1 px-2">
              <CarIcon/>
              <span class="ml-4">Transporte</span> 
              <DownIcon v-if="!transport" class="ml-9"/>
              <TopIcon v-else class="ml-8"/>
            </div>
            </button>
            </div>
            <template v-if="transport || this.$route.name == 'vehiculos' || this.$route.name == 'modelosTransporte'">
                <ul
                  x-transition:enter="transition-all ease-in-out duration-300"
                  x-transition:enter-start="opacity-25 max-h-0"
                  x-transition:enter-end="opacity-100 max-h-xl"
                  x-transition:leave="transition-all ease-in-out duration-300"
                  x-transition:leave-start="opacity-100 max-h-xl"
                  x-transition:leave-end="opacity-0 max-h-0"
                  class="p-2 mt-2 mb-2 space-y-2 overflow-hidden text-sm font-medium text-white rounded-md shadow-inner bg-indigo-500 "
                  aria-label="submenu"
                >
                  <li
                    class="px-2 py-1 transition-colors duration-150"
                  >
                    <a class="w-full" href="/km_cost">
                      Costo por KM
                    </a>
                  </li>
                  <li
                    class="px-2 py-1 transition-colors duration-150"
                  >
                    <a class="w-full" href="/hours_cost">
                      Costo por KM/H
                    </a>
                  </li>
                  <li
                    class="px-2 py-1 transition-colors duration-150"
                  >
                    <a class="w-full" href="/route_cost">
                      Costo por Ruta
                    </a>
                  </li>
                  <li
                    class="px-2 py-1 transition-colors duration-150"
                  >
                    <a class="w-full" href="/vehiculos">
                      Vehículos
                    </a>
                  </li>
                </ul>
              </template>
          </li>
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/actividades"
              ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
              <ActivityIcon/>
              <span class="ml-4">Actividades</span></a
            > 
            </div>
          </li>
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/contratos"
              ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
              <ContractIcon/>
              <span class="ml-4">Contratos</span></a
            > 
            </div>
          </li>
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/paquetes"
              ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
              <PkyIcon/>
              <span class="ml-4">Paquetes</span></a
            > 
            </div>
          </li>
          
        </ul>
        
      </div>
    </div>
  </nav>
</template>
<script>
import ActivityIcon from '../icons/ActivityIcon.vue';
import CarIcon from '../icons/CarIcon.vue';
import ContractIcon from '../icons/ContractIcon.vue';
import DownIcon from '../icons/DownIcon.vue';
import HomeIcon from '../icons/HomeIcon.vue';
import HotelIcon from '../icons/HotelIcon.vue';
import PkyIcon from '../icons/PkyIcon.vue';
import UsersIcon from '../icons/UsersIcon.vue';
import TopIcon from '../icons/TopIcon.vue';


export default {
  data() {
    return {
      collapseShow: "hidden",
      housing: false,
      transport: false, 
    };
  },
  methods: {
    toggleCollapseShow: function(classes) {
      this.collapseShow = classes;
    },
    togglePagesMenu(nombre) {
      if(nombre === 'housing'){
        this.housing = !this.housing
      } else if(nombre === 'transport'){
        this.transport = !this.transport
      }
      
    },
  },
  components: {
    HomeIcon,
    UsersIcon,
    HotelIcon,
    CarIcon,
    ActivityIcon,
    ContractIcon,
    PkyIcon,
    DownIcon,
    TopIcon,
}
};
</script>
