<template>
    <div class="mt-2">
     <form>
        <div class="mb-4">
          <label for="newObjectType" class="block text-gray-700 text-sm font-bold mb-2">Tipo</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectType" v-model="newObject.type" >
        </div>
        <div class="mb-4">
          <label for="newObjectDay" class="block text-gray-700 text-sm font-bold mb-2">Día</label>
          <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectDay" v-model="newObject.day" >
        </div>
        <div class="mb-4">
          <label for="newObjectTime" class="block text-gray-700 text-sm font-bold mb-2">Tiempo</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectTime" v-model="newObject.time"> 
        </div> 
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">Provincia</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectProvince" v-model="newObject.province"> 
        </div> 
        <div class="mb-4">
          <label for="newObjectCost" class="block text-gray-700 text-sm font-bold mb-2">Costo</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCost" v-model="newObject.cost"> 
        </div> 
        <div class="mb-4">
          <label for="newObjectRecarg" class="block text-gray-700 text-sm font-bold mb-2">Recargo</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectRecarg" v-model="newObject.recarg"> 
        </div> 
        <div class="mb-4">
          <label for="newObjectDescription" class="block text-gray-700 text-sm font-bold mb-2">Descripción</label>
          <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectDescription" v-model="newObject.description"></textarea>
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
                type: '',
                day: '',
                time: '',
                province: '',
                cost: '',
                recarg: '',
                description: '',
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