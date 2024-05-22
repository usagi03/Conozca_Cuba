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
      <a
        class="md:block text-left md:pb-2 text-white text-lg mr-0 inline-block whitespace-nowrap uppercase font-bold p-4 px-0"
        
      >
        Conozca Cuba
      </a>
      <!-- User -->
      <UserDropdown class="px-14 pt-4"/>
      <span class="text-center text-white font-semibold leading-6 pt-4">username</span>
      <hr class="mt-4 " />
      
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
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
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
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/hoteles"
              ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
              <HotelIcon/>
              <span class="ml-4">Alojamientos</span></a
            > 
            </div>
          </li>
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/vehiculos"
              ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
              <CarIcon/>
              <span class="ml-4">Transporte</span></a
            > 
            </div>
          </li>
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/home"
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
              href="/home"
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
          <li class="items-center">
            <div class="hover:border-indigo-300 bg-transparent hover:border-2 rounded-3xl h-10">
             <a
              class="inline-flex items-center font-semibold leading-6 text-white hover:text-gray-300 text-lg py-1"
              href="/home"
              ><i class="fas fa-tv opacity-75 mr-2 text-sm"></i>
              <LogoutIcon/>
              <span class="ml-4">Cerrar Sesión</span></a
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
import HomeIcon from '../icons/HomeIcon.vue';
import HotelIcon from '../icons/HotelIcon.vue';
import LogoutIcon from '../icons/LogoutIcon.vue';
import PkyIcon from '../icons/PkyIcon.vue';
import UsersIcon from '../icons/UsersIcon.vue';
import UserDropdown from './UserDropdown.vue';

export default {
  data() {
    return {
      collapseShow: "hidden"
    };
  },
  methods: {
    toggleCollapseShow: function(classes) {
      this.collapseShow = classes;
    }
  },
  components: {
    HomeIcon,
    UsersIcon,
    HotelIcon,
    CarIcon,
    ActivityIcon,
    ContractIcon,
    PkyIcon,
    LogoutIcon,
    UserDropdown
}
};
</script>
