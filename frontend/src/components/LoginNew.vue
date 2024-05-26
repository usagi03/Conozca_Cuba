<template>

<div class="flex items-center min-h-screen p-6 bg-indigo-300">
      <div
        class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl"
      >
        <div class="flex flex-col overflow-y-auto md:flex-row">
          <div class="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              class="object-cover w-full h-full"
              src="@/assets/fondo-4.png"
            />
          </div>
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            
            <div class="w-full">
              <img class="h-20 mx-auto w-30 mb-10" src="@/assets/conozcocuba.png" alt="Your Company">
              <h1
                class="mb-4 text-xl font-semibold text-gray-700 "
              >
                Bienvenido inicie sesión con su cuenta
              </h1>
              <label class="block text-sm">
                <span class="block text-sm font-medium leading-6 text-gray-900">Usuario</span>
                <input
                  class="block w-full mt-1 text-sm rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                  placeholder="Introduzca el nombre de usuario"
                  ref="user" id="user" name="user" v-model="username"
                  type="text"
                />
              </label>
              <span v-if="store.usernameError" class="mt-1 px-2 text-red-600 font-sans text-sm">{{ userError }}</span>
              <label class="block mt-4 text-sm">
                <span class="block text-sm font-medium leading-6 text-gray-900">Contraseña</span>
                <input
                  class="block w-full mt-1 text-sm rounded-md focus:border-purple-400 focus:outline-none focus:shadow-outline-purple form-input"
                  placeholder="Introduzca su contraseña"
                  ref="password" id="password" name="password" v-model="password"
                  type="password"
                />
              </label>
              <span v-if="store.passwordError" class="mt-1 px-2 text-red-600 font-sans text-sm">{{passError}}</span>

              <!-- You should use a button here, as the anchor is only used for the example  -->
              <button
                class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                type="submit" @click="auth"
              >
                Inicia Sesion
              </button>
            </div>
          </div>
          
        </div>
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
      
      const valido = this.validarCampos();
      if(valido){
        const success = await auth.login(this.username, this.password)
        if(success){
         this.$router.push({name: 'home'})
        alert('Exito') 
        } else {
        alert('error')  
        } 
      } 
    }
  }
}
</script>