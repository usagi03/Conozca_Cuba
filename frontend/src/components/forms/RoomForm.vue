<template>
    <div class="mt-2">
     <form class="grid grid-cols-6 gap-4 w-96">
        <div class="mb-4 col-span-2">
          <label for="newObjectType" class="block text-gray-700 text-sm font-bold mb-2">{{$t('rooms.table.type')}}</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectType" v-model="newObject.room_type" >
            <option>Sencilla</option>
            <option>Doble</option>
            <option>Triple</option>
            <option>Suit</option>
          </select>
          <span class="text-red-600 font-sans text-sm">{{ store.errorType }}</span>
        </div> 
        <div class="mb-4 col-span-4">
          <label for="newObjectMealPlan" class="block text-gray-700 text-sm font-bold mb-2">{{$t('rooms.table.meal_plan')}}</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectMealPlan" v-model="newObject.plan">
            <option value="Solo desayuno">Solo desayuno</option>
            <option value="Todo incluído">Almuerzo-Cena</option>
            <option value="Solo alojamiento">Solo alojamiento</option>
          </select>
          <span class="text-red-600 font-sans text-sm">{{ store.errorMeal }}</span>
        </div>
        <div class="mb-4 col-span-2">
          <label for="newObjectNum" class="block text-gray-700 text-sm font-bold mb-2">{{$t('rooms.table.number')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectNum" v-model="newObject.room_number" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorNumber }}</span>
        </div>
        <div class="mb-4 col-span-2">
          <label for="newObjectCost" class="block text-gray-700 text-sm font-bold mb-2">{{$t('rooms.table.cost')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCost" v-model="newObject.room_cost">
          <span class="text-red-600 font-sans text-sm">{{ store.errorCost }}</span>
        </div>
        <div class="mb-4 col-span-2">
          <label for="newObjectRecarg" class="block text-gray-700 text-sm font-bold mb-2">{{$t('rooms.table.plus')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectRecarg" v-model="newObject.room_surcharge">
          <span class="text-red-600 font-sans text-sm">{{ store.errorPlus }}</span> 
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
               room_number: '',
               room_type: '',
               room_cost: 0,
               room_surcharge: 0,
              plan: '',
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