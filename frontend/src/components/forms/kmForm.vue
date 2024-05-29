<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-4 w-96">
        <div class="mb-4 col-span-3">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('km.table.description')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.description_tm" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorDescription_km }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mt-3">{{$t('km.table.km_cost')}}</label>
          <input type="number" class="shadow appearance-none border mt-4 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.km_cost" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorKm_cost }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('km.table.km_idayvuelta')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.full_ride_km_cost" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorFull_ride_km_cost }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('km.table.wait_cost')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.waiting_hours_cost" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorWaiting_hours_cost }}</span>
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
                type_transp_model: 'km_cost',
                description_tm: '',
               km_cost: '',
              full_ride_km_cost: '',
              waiting_hours_cost: ''
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