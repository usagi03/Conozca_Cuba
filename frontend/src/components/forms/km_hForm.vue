<template>
    <div class="mt-2">
     <form class="grid grid-cols-4 gap-4 w-500">
        <div class="mb-4 col-span-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('km/h.table.description')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.description" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorPlan_type }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('km/h.table.recorrido')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.route_km_cost_cost" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorDescription_tm }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mt-3">{{$t('km/h.table.hours_cost')}}</label>
          <input type="number" class="shadow appearance-none mt-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.hours_cost" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorHours_cost }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('km/h.table.km_extras')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.extra_km_cost" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorExtra_km_cost }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">C{{$t('km/h.table.hours_extras')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.extras_hours_cost" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorExtras_hours_cost }}</span>
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
             type_transp_model: "km_hours_cost",
             description_tm: '',
             route_km_cost: 0,
             hours_cost: 0,
             extra_km_cost: 0,
             extras_hours_cost: 0
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