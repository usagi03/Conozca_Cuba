<template>
  <div v-if="this.$route.name != 'Login'">
    <Dashboard>
        <main>
         <div >
        <RouterView />
         </div>
        </main>
    </Dashboard>
  </div>
  <div v-else>
    <RouterView/>
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router';
import Dashboard from "@/views/Dashboard.vue"

</script>
