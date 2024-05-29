<template>
    <div class="mt-2">
     <form class="grid grid-cols-2 gap-4 w-96">
        <div class="mb-4 col-span-2">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('route.table.description')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.description" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorDescription_tm }}</span>
        </div>
        <div class="mb-4 col-span-2">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('route.table.description_route')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.descriptionRoute" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorDescription_route }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('route.table.route_cost')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.costRoute" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorRoute_cost }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('route.table.idayvuelta_cost')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.costIdayvuelta" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorFull_ride_cost }}</span>
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
              type_transp_model: "route",
              description_tm: '',
              description_route: '',
              route_cost: 0,
              full_ride_cost: 0
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