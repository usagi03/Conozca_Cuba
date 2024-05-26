<template>
  <div >
    <sidebar-component></sidebar-component>
    <div class="relative md:ml-64 bg-blueGray-100">
      <NavBar/>
      <!-- Header -->
      <div class="relative  pb-32 pt-12">
        <div class="px-4 mx-auto w-full">
          <div>
            <RouterView/>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/dashboard/NavBar.vue";
import SidebarComponent from "@/components/dashboard/Sidebar.vue";
import { RouterView } from "vue-router";
export default {
  name: "dashboard-page",
  components: {
    //NavbarComponent,
    SidebarComponent,
    RouterView,
    NavBar
},
  data() {
    return {
      date: new Date().getFullYear()
    }
  }
};
</script>
