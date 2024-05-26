<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-4 w-96">
        <div class="mb-4 col-span-3">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.description" >
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mt-3">Costo por Km</label>
          <input type="number" class="shadow appearance-none border mt-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.costKM" >
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Costo por Km ida y vuelta</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.costKM_idayvuelta" >
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Costo por horas de espera</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.costHours" >
        </div>
        
        <!-- Agrega más campos según sea necesario -->
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
                description: '',
                costKM: '',
                costKM_idayvuelta: '',
                costHours: '',
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