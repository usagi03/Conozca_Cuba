<template>
    <div class="mt-2">
     <form class="grid grid-cols-4 gap-4 w-800">
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
        <div class="mb-4">
          <label for="newObjectPrivince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.province')}}</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCategory" v-model="newObject.province_hotel">
            <option value="Pinar del Río">Pinar del Río</option>
            <option value="La Habana">La Habana</option>
            <option value="Mayabeque">Mayabeque</option>
            <option value="Matanzas">Matanzas</option>
            <option value="Cienfuegos">Cienfuegos</option>
            <option value="Villa Clara">Villa Clara</option>
            <option value="Sancti Spiritus">Sancti Spíritus</option>
            <option value="Ciego de Ávila">Ciego de Ávila</option>
            <option value="Camagüey">Camagüey</option>
            <option value="Las Tunas">Las Tunas</option>
            <option value="Granma">Granma</option>
            <option value="Holguin">Holguín</option>
            <option value="Santiago de Cuba">Santiago de Cuba</option>
            <option value="Guantanamo">Guantánamo</option>
            <option value="Isla de la Juventud">Isla de la Juventud</option>
          </select>
          <span class="text-red-600 font-sans text-sm">{{ store.errorProvince }}</span> 
        </div>  
        <div class="mb-4 col-span-3">
          <label for="newObjectAddress" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.direction')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectAddress" v-model="newObject.address_hotel">
          <span class="text-red-600 font-sans text-sm">{{ store.errorAddress }}</span>
        </div> 
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.email')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectEmail" v-model="newObject.email">
          <span class="text-red-600 font-sans text-sm">{{ store.errorEmail }}</span> 
        </div>
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.phone')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectPhone" v-model="newObject.phone">
          <span class="text-red-600 font-sans text-sm">{{ store.errorPhone }}</span> 
        </div>
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.fax')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectFax" v-model="newObject.fax">
          <span class="text-red-600 font-sans text-sm">{{ store.errorFax  }}</span> 
        </div>
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.distance_to_city')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectDistanceC" v-model="newObject.distance_to_city">
          <span class="text-red-600 font-sans text-sm">{{ store.errorCity  }}</span> 
        </div>
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.distance_to_airport')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectDistanceA" v-model="newObject.distance_to_airport">
          <span class="text-red-600 font-sans text-sm">{{ store.errorAirport }}</span> 
        </div>
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.floor_count')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectFloor" v-model="newObject.floor_count">
          <span class="text-red-600 font-sans text-sm">{{ store.errorFloor }}</span> 
        </div>
        <div class="mb-4">
          <label for="newObjectDate" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.date_hotel')}}</label>
          <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectDate" v-model="newObject.date_hotel">
          <span class="text-red-600 font-sans text-sm">{{ store.errorDate }}</span> 
        </div>
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.business_model')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectProvince" v-model="newObject.business_model">
          <span class="text-red-600 font-sans text-sm">{{ store.errorBusiness }}</span> 
        </div>
        <div class="mb-4">
          <label for="newObjectProvince" class="block text-gray-700 text-sm font-bold mb-2">{{$t('hotels.table.location_hotel')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectProvince" v-model="newObject.location_hotel">
          <span class="text-red-600 font-sans text-sm">{{ store.errorLocation }}</span> 
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
              date_hotel: '',
              phone: '',
              fax: '',
              distance_to_city: 0,
              distance_to_airport: 0,
              email: '',
              floor_count: 0,
              business_model: '',
              location_hotel: '' 
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