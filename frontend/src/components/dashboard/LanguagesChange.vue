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
      <button
        @click="$i18n.locale = 'es'"
        class="text-sm rounded-lg focus:outline-none hover:bg-gray-100 w-20 h-8 my-2 mx-6 font-normal block whitespace-nowrap bg-transparent text-blueGray-700"
      >
        {{$t('languages.es')}}
      </button>
      <hr class="mx-4 " />
      <button
      @click="$i18n.locale = 'en'"
        class="text-sm font-normal focus:outline-none rounded-lg block hover:bg-gray-100 w-20 h-8 my-2 mx-6 whitespace-nowrap bg-transparent text-blueGray-700"
      >
      {{$t('languages.en')}}
      </button>
    </div>
</div>
</template>
<script>
import { useFormsStore } from '@/stores/forms';
import DownIcon from '../icons/DownIcon.vue';
import WorldIcon from '../icons/WorldIcon.vue';

import { createPopper } from "@popperjs/core";

export default {
  setup(){
           const store = useFormsStore();
           return{
             store,
            }
        },
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
    },
    
  },
    components: { WorldIcon, DownIcon }
}
</script>