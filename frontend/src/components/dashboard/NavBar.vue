<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-2"
  >
    <div
      class="w-full items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <div></div>
      
      <ul
        class="flex items-center flex-shrink-0 space-x-6"
      >
      <li>
        <LanguagesChange/>
      </li>
      <li>
        <user-dropdown-component></user-dropdown-component>
      </li>
      
        
      </ul>
    </div>
  </nav>

  <!-- End Navbar -->
</template>
<script>
import UserDropdownComponent from "@/components/dashboard/UserDropdown.vue";
import LanguagesChange from "./LanguagesChange.vue";
export default {
  components: {
    UserDropdownComponent,
    LanguagesChange
}
};
</script>
