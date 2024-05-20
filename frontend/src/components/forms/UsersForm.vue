<template>
    <div class="mt-2">
     <form>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.name" >
        </div>
        <div class="mb-4">
          <label for="newObjectPassword" class="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
          <input type="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectPassword" v-model="newObject.password" >
        </div>
        <div class="mb-4">
          <label for="newObjectRol" class="block text-gray-700 text-sm font-bold mb-2">Rol</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectRol" v-model="newObject.rol">
            <option>Administrador</option>
            <option>Gestor de venta</option>
            <option>Gerente</option>
          </select> 
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
                name: '',
                password: '',
                rol: '',
            },
          }
        },
    
        methods: {
          value(){
            console.log(this.newObject)
            this.$emit('value', this.newObject);
          }
        },
       
        mounted(){
        if(this.store.position != -1){
          this.newObject = this.editObject;
        }
        this.value();
        }
    }
    </script>