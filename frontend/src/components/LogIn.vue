<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <!--
    This example requires updating your template:

    ```
    <html class="h-full bg-white">
    <body class="h-full">
    ```
  -->

  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>


    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm p-4 rounded-md shadow-indigo-500 shadow-[0px_0px_10px_-2px_rgba(0,0,0,0.3)] ">
      <form class="space-y-6" action="/home" method="POST" @submit.prevent="auth">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Usuario</label>
          <div class="mt-2">
            <input ref="user" id="email" name="email" v-model="username" type="text" autocomplete="email" 
            class="block w-full rounded-md border-2 border-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:border-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Introduzca el nombre de usuario" />
          </div>
            <span v-if="store.usernameError" class="mt-1 px-2 text-red-600 font-sans text-sm">{{ userError }}</span>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Contraseña</label>
          </div>
          <div class="mt-2">
            <input ref="password" id="password" name="password" v-model="password" type="password" autocomplete="current-password"  
            class="block w-full rounded-md border-2 border-gray-100 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:caret-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Introduzca su contraseña" />
          </div>
            <span v-if="store.passwordError" class="mt-1 px-2 text-red-600 font-sans text-sm">{{passError}}</span>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
          >Sign in</button>
        </div>
      </form>

     
    </div>
  </div>
</template>
<script>
import { useAuthStore } from '@/stores/auth';
import AuthService from '../services/AuthServices.js';
export default{
  setup(){
    const store = useAuthStore();
    return{
      store,
    }
  },
  data(){
    return{
      username: "",
      password: "",
      userError: "",
      passError: "",
    }
  },
  methods:{
    validarUsuario(){
      if(this.username === ''){
        this.store.usernameError = true;
        this.userError = "Por favor introduzca un usuario";
        this.$refs.user.classList.add('border-red-500', 'border-2');
        this.$refs.user.classList.remove('border-0', 'border-gray-100');
      } else {
        this.store.usernameError = false;
        this.$refs.user.classList.remove('border-red-500', 'border-2');
        this.$refs.user.classList.add('border-0', 'border-gray-100');
      }
      
      return this.store.usernameError;
    },
    validarContrasenna(){
      if(this.password === ''){
        this.store.passwordError = true;
        this.passError = "Por favor introduzca una contraseña";
        this.$refs.password.classList.add('border-red-500', 'border-2');
        this.$refs.password.classList.remove('border-0', 'border-gray-100');
      } else {
        this.store.passwordError = false;
        this.$refs.password.classList.remove('border-2', 'border-red-500');
        this.$refs.password.classList.add('border-0', 'border-gray-100');
      }
      return this.store.passwordError;
    },
    validarCampos(){
      let ok = false;
      this.validarUsuario();
      this.validarContrasenna();
      if(!this.store.passwordError && !this.store.usernameError){
        ok=true;
        
      }
      return ok;
    },
    auth: async function() {
      const auth = new AuthService()
      const success = await auth.login(this.username, this.password)
      if(success && this.validarCampos()){
        this.$router.push({name: 'home'})
        alert('Exito')
      } else{
        alert('error')
      }
    }
  }
}
</script>
