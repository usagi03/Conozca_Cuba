<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-4 w-500">
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.name')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.name_hotel" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorNameH }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectChain" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.chain')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectChain" v-model="newObject.chain_hotel" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorChain }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectCategory" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.category')}}</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCategory" v-model="newObject.category_hotel">
             <option value="1 estrella">1 estrella</option>
             <option value="2 estrellas">2 estrellas</option>
             <option value="3 estrellas">3 estrellas</option>
             <option value="4 estrellas">4 estrellas</option>
             <option value="5 estrellas">5 estrellas</option>
          </select>
          <span class="text-red-600 font-sans text-sm">{{ store.errorCategory }}</span>
        </div> 
        <div class="mb-4 col-span-2">
          <label for="newObjectAddress" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.direction')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectAddress" v-model="newObject.address_hotel">
          <span class="text-red-600 font-sans text-sm">{{ store.errorAddress }}</span>
        </div> 
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.province')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectProvince" v-model="newObject.province_hotel">
          <span class="text-red-600 font-sans text-sm">{{ store.errorProvince }}</span> 
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
              name_hotel: '',
              chain_hotel: '',
              category_hotel: '',
              address_hotel: '',
              province_hotel: '',
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