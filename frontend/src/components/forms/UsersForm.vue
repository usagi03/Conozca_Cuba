<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-4 w-500">
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('users.table.username') }}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.user_name" >
          <span class="mt-1 px-2 text-red-600 font-sans text-sm">{{ store.errorUser }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectPassword" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('users.table.password') }}</label>
          <input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectPassword" v-model="newObject.user_password" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorPass }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectRol" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('users.table.role') }}</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectRol" v-model="newObject.role">
            <option value="Administrador">Administrador</option>
            <option value="Agente de ventas">Agente de ventas</option>
            <option value="Gerente">Gerente</option>
          </select> 
          <span class="text-red-600 font-sans text-sm">{{ store.errorRol }}</span>
        </div> 
     </form>
    </div> 
    </template>
    <script>
    import { useFormsStore } from '@/stores/forms';
       export default{
        props:{
          editObject: Object,
        },
        
        setup(){
           const store = useFormsStore();
           return{
             store,
            }
        },
    
        data() {
          return {
            newObject:{
                id: '',
                user_name: '',
                user_password: '',
                role: ''
            },
            errorUser: '',
            errorPass: '',
            errorRol: '',
          }
        },
    
        methods: {
          value(){
            console.log(this.newObject)
            this.$emit('value', this.newObject);
          },
          
        },
       
        mounted(){
        if(this.store.position != -1){
          this.newObject = this.editObject;
        }
        this.value();
        },
        
    }
    </script>