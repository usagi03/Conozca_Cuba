<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#pablo"
      v-on:click="toggleDropdown($event)"
      ref="btnDropdownRef"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white  inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            src="@/assets/user.jpg"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow
      }"
      style="min-width: 8rem"
    >
    <span class="text-sm py-2 px-10 font-normal block w-full whitespace-nowrap bg-transparent ">
      username
    </span>
    <hr class="mx-4 " />
      <a
        href="#pablo"
        class="text-sm py-2 px-4 font-normal flex w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Cerrar Sesión
        <LogoutIcon/>
      </a>
    </div>
  </div>
</template>
<script>
import { createPopper } from "@popperjs/core";
import LogoutIcon from "../icons/LogoutIcon.vue";

export default {
    data() {
        return {
            dropdownPopoverShow: false
        };
    },
    methods: {
        toggleDropdown: function (event) {
            event.preventDefault();
            if (this.dropdownPopoverShow) {
                this.dropdownPopoverShow = false;
            }
            else {
                this.dropdownPopoverShow = true;
                createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
                    placement: "bottom-end"
                });
            }
        }
    },
    components: { LogoutIcon }
};
</script>
