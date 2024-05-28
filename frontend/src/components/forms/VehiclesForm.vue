<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-5 w-500">
        <div class="mb-4">
          <label for="newObjectMat" class="block text-gray-700 text-sm font-bold mb-2">{{$t('vehicles.table.plate')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectMat" v-model="newObject.license_plate" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorPlate }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectMarc" class="block text-gray-700 text-sm font-bold mb-2">{{$t('vehicles.table.brand')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectMat" v-model="newObject.brand" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorBrand }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectYear" class="block text-gray-700 text-sm font-bold mb-2">{{$t('vehicles.table.year')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectYear" v-model="newObject.year_build"> 
          <span class="text-red-600 font-sans text-sm">{{ store.errorYear_build }}</span>
        </div> 
        <div class="mb-4">
          <label for="newObjectCapacity" class="block text-gray-700 text-sm font-bold mb-2">{{$t('vehicles.table.luggage_capacity')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCapacity" v-model="newObject.luggage_capacity"> 
          <span class="text-red-600 font-sans text-sm">{{ store.errorLuggage_capacity }}</span>
        </div> 
        <div class="mb-4">
          <label for="newObjectCapacityWithout" class="block text-gray-700 text-sm font-bold mb-2">{{$t('vehicles.table.luggage_without')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCapacityWithout" v-model="newObject.with_luggage_capacity"> 
          <span class="text-red-600 font-sans text-sm">{{ store.errorWith_luggage_capacity }}</span>
        </div> 
        <div class="mb-4">
          <label for="newObjectCapacityTotal" class="block text-gray-700 text-sm font-bold mb-2">{{$t('vehicles.table.total')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCapacityTotal" v-model="newObject.total_capacity"> 
          <span class="text-red-600 font-sans text-sm">{{ store.errorTotal_capacity }}</span>
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
              license_plate: '',
              brand: '',
              luggage_capacity: 0,
              with_luggage_capacity: 0,
              total_capacity: 0,
              year_build: 0
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