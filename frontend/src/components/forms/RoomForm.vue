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
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('rooms.table.meal_plan')}}</label>
          <select class="shadow overflow-x-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName"  v-model="newObject.id_contract" >
          <template v-for="(item, key) in this.itemsPlan" :key="key">
            <option :value="item.plan" >{{ item.plan }}</option>
          </template>
            
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
    import Servicies from '@/services/Servicies';
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
            itemsPlan:[]
          }
        },
    
        methods: {
          value(){
            console.log(this.newObject)
            this.$emit('value', this.newObject);
          },
          getPlan: async function(){
            try {
              const getPlan = new Servicies();
              const res = await getPlan.get('http://localhost:3080/meal_plans');
              this.itemsPlan = res.map(element => {
            return {
              "plan": element.plan_type,
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
        },
       
        mounted(){
        if(this.store.position != -1){
          this.newObject = this.editObject;
        }
        this.value();
        this.getPlan()
        }
    }
    </script>