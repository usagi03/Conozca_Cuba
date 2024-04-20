<template>
  <NavBar v-if="this.$route.name != 'Login'"/>
  <main>
    <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <RouterView />
    </div>
  </main>
  
</template>
<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

</script>
