<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 w-full z-10 bg-blue-500 md:flex-row md:flex-nowrap md:justify-start flex items-center p-2"
  >
    <div
      class="w-full items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <!-- Brand -->
      <div></div>
      <!-- Form -->
      
      <!-- User -->
      <ul
        class="flex-col md:flex-row list-none items-center hidden md:flex"
      >
        <user-dropdown-component></user-dropdown-component>
      </ul>
    </div>
  </nav>

  <!-- End Navbar -->
</template>
<script>
import UserDropdownComponent from "@/components/dashboard/UserDropdown.vue";
export default {
  components: {
    UserDropdownComponent
  }
};
</script>
