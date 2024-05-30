<template>
    <div class="mt-2">
     <form class="grid grid-cols-5 gap-3 w-550">
        <div class="mb-4 col-span-5">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('packages.table.name')}}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.promotional_name" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorPromotional_name }}</span>
        </div>
          <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mt-3">{{$t('packages.table.days')}}</label>
          <input type="number" class="shadow appearance-none mt-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.days_count" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorDays_count }}</span>
        </div>
          
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mt-3">{{$t('packages.table.nights')}}</label>
          <input type="number" class="shadow appearance-none mt-4 border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.nights_count" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorNights_count }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('packages.table.persons')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.pax_count" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorPax_count }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{$t('packages.table.travel_cost')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.hotel_airport_ride_cost" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorHotel_airport_ride_cost }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-3">{{$t('packages.table.profit')}}</label>
          <input type="number" class="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.percent_profit" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorPercent_profit }}</span>
        </div>
        <div class="mb-4 col-span-5">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-3">{{$t('packages.table.contract')}}</label>
          <select class="shadow overflow-x-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" size="5" v-model="newObject.id_contract" >
          <template v-for="(item, key) in this.items" :key="key">
            <option v-if="key != 'id'" :value="item.id" >{{ item.info }}</option>
          </template>
            
          </select>
          <span class="text-red-600 font-sans text-sm">{{ store.errorContract }}</span>
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
              id: '',
              promotional_name: '',
              days_count: 0,
              nights_count: 0,
              pax_count: 0,
              hotel_airport_ride_cost: 0,
              percent_profit: 0,
              id_contract: 0,
            },
            items: []
          }
        },
    
        methods: {
          value(){
            console.log(this.newObject)
            this.$emit('value', this.newObject);
          },
          async getContracts(){
            const gets = new Servicies();
            try{
            const res = await gets.get('http://localhost:3080/contracts');
            this.items = res.map(element => {
            return {
              "id": element.id_contract,
              "info": element.acommodation.hotel.name_hotel + ', ' + element.activity.type_activity + ', ' + element.transportation.vehicle.license_plate,
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
        this.getContracts()
        
        }
        
      }
    </script>