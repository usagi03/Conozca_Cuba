<template>
    <div class="mt-2">
     <form>
        <div class="mb-4">
          <label for="newObjectNum" class="block text-gray-700 text-sm font-bold mb-2">Número</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectNum" v-model="newObject.num" >
        </div>
        <div class="mb-4">
          <label for="newObjectType" class="block text-gray-700 text-sm font-bold mb-2">Tipo</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectType" v-model="newObject.type" >
            <option>Sencilla</option>
            <option>Doble</option>
            <option>Triple</option>
            <option>Suit</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="newObjectCost" class="block text-gray-700 text-sm font-bold mb-2">Costo</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCost" v-model="newObject.cost">
        </div> 
        <div class="mb-4">
          <label for="newObjectMealPlan" class="block text-gray-700 text-sm font-bold mb-2">Plan Alimenticio</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectMealPlan" v-model="newObject.mealPlan">
            <option>Desayuno</option>
            <option>Almuerzo-Cena</option>
            <option>Desayuno-Cena</option>
            <option>Desayuno-Almuerzo</option>
          </select>
        </div> 
        <div class="mb-4">
          <label for="newObjectRecarg" class="block text-gray-700 text-sm font-bold mb-2">Recargo</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectRecarg" v-model="newObject.recarg"> 
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
                num: '',
                type: '',
                cost: '',
                mealPlan: '',
                recarg: '',
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