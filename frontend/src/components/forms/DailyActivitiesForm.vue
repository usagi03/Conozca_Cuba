<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-4 w-800 h-96">
        <div class="mb-4 ">
          <label for="newObjectType" class="label">{{$t('dailyActivities.table.type')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectType" v-model="newObject.type" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorType_activity }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectDay" class="label">{{$t('dailyActivities.table.day')}}</label>
          <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectDay" v-model="newObject.day" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorDay_activity }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectTime" class="block text-gray-700 text-sm font-bold mb-2">{{$t('dailyActivities.table.time')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectTime" v-model="newObject.time"> 
          <span class="text-red-600 font-sans text-sm">{{ store.errorTime_activity }}</span>
        </div> 
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('dailyActivities.table.province')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectProvince" v-model="newObject.province"> 
          <span class="text-red-600 font-sans text-sm">{{ store.errorProvince_activity }}</span>
        </div> 
        <div class="mb-4">
          <label for="newObjectCost" class="block text-gray-700 text-sm font-bold mb-2">{{$t('dailyActivities.table.cost')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCost" v-model="newObject.cost"> 
          <span class="text-red-600 font-sans text-sm">{{ store.erroCost_activity }}</span>
        </div> 
        <div class="mb-4">
          <label for="newObjectRecarg" class="block text-gray-700 text-sm font-bold mb-2">{{$t('dailyActivities.table.recar')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectRecarg" v-model="newObject.recarg"> 
          <span class="text-red-600 font-sans text-sm">{{ store.errorSurcharge_activity }}</span>
        </div> 
        <div class="mb-4 col-span-3">
          <label for="newObjectDescription" class="block text-gray-700 text-sm font-bold mb-2">{{$t('dailyActivities.table.description')}}</label>
          <textarea class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectDescription" v-model="newObject.description"></textarea>
          <span class="text-red-600 font-sans text-sm">{{ store.errorDescription_activity }}</span>
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
                type_activity: '',
                day_activity: '',
                time_activity: 0,
                cost_activity: 0,
                province_activity: '',
                description_activity: '',
                surcharge_activity: 0
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