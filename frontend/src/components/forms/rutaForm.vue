<template>
    <div class="mt-2">
     <form class="grid grid-cols-2 gap-4 w-96">
        <div class="mb-4 col-span-2">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.description" >
        </div>
        <div class="mb-4 col-span-2">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Descripción del recorrido</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.descriptionRoute" >
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Costo del Recorrido</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.costRoute" >
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Costo por ida y vuelta</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.costIdayvuelta" >
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
                descriptionRoute: '',
                costRoute: '',
                costIdayvuelta: '',
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