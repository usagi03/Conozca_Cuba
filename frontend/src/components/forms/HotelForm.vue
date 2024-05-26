<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-4">
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.name" >
        </div>
        <div class="mb-4">
          <label for="newObjectChain" class="block text-gray-700 text-sm font-bold mb-2">Cadena</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectChain" v-model="newObject.chain" >
        </div>
        <div class="mb-4">
          <label for="newObjectCategory" class="block text-gray-700 text-sm font-bold mb-2">Categoría</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCategory" v-model="newObject.category">
             <option>1</option>
             <option>2</option>
             <option>3</option>
             <option>4</option>
             <option>5</option>
          </select>
        </div> 
        <div class="mb-4 col-span-2">
          <label for="newObjectAddress" class="block text-gray-700 text-sm font-bold mb-2">Dirección</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectAddress" v-model="newObject.address">
        </div> 
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">Provincia</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectProvince" v-model="newObject.province"> 
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
                chain: '',
                category: '',
                address: '',
                province: '',
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