<template>
<div>
    <div>
        <button class="rounded-md focus:outline-none focus:bg-gray-100"
        v-on:click="toggleDropdown($event)"
        ref="btnDropdownRef"
      >
            <div class="flex hover:bg-gray-100 h-8 w-14 px-1 items-center hover:rounded-lg">
               <WorldIcon/>
               <DownIcon/> 
            </div>
      </button>
      </div>
      <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow
      }"
      style="min-width: 8rem"
    >
      <a
        href="#pablo"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Español
      </a>
      <hr class="mx-4 " />
      <a
        href="#pablo"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Ingles
      </a>
    </div>
</div>
</template>
<script>
import DownIcon from '../icons/DownIcon.vue';
import WorldIcon from '../icons/WorldIcon.vue';

import { createPopper } from "@popperjs/core";

export default {
  data() {
    return {
      dropdownPopoverShow: false
    };
  },
  methods: {
    toggleDropdown: function(event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-end"
        });
      }
    }
  },
    components: { WorldIcon, DownIcon }
}
</script>