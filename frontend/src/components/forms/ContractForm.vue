<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-4 w-800">
        <div class="mb-4 col-span-3">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('contracts.table.description') }}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.description_contract" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorDescription_contract }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('contracts.table.dateStart') }}</label>
          <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.start_contract" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorStart_contract }}</span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">{{ $t('contracts.table.dateEnd') }}</label>
          <input type="date"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model ="newObject.end_contract" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorEnd_contract }}</span>
         
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2">{{ $t('contracts.table.dateConc') }}</label>
          <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.resolution_contract" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorResolution_contract }}</span>
        </div>
        <div class="mb-4 ">
          <label  class="block text-gray-700 text-sm font-bold mb-3">{{$t('contracts.table.transport')}}</label>
          <select class="shadow overflow-x-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  size="5" v-model="newObject.id_transportation" >
          <template v-for="(item, key) in this.itemsTransportation" :key="key">
            <option v-if="key != 'id'" :value="item.id" >{{ item.info }}</option>
          </template>
             
          </select>
          
          <span class="text-red-600 font-sans text-sm">{{ store.errorTransportation }}</span>
        </div>
        
        <div class="mb-4">
          <label  class="block text-gray-700 text-sm font-bold mb-3">{{$t('contracts.table.housing')}}</label>
          <select class="shadow overflow-x-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  size="5" v-model="newObject.id_housing" >
          <template v-for="(item, key) in this.itemsHousing" :key="key">
            <option v-if="key != 'id'" :value="item.id" >{{ item.info }}</option>
          </template>
            
          </select>
          <span class="text-red-600 font-sans text-sm">{{ store.errorAcommodation }}</span>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-3">{{$t('contracts.table.activitie')}}</label>
          <select class="shadow overflow-x-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="5" v-model="newObject.id_activity" >
          <template v-for="(item, key) in this.itemsActivities" :key="key">
            <option v-if="key != 'id'" :value="item.id" >{{ item.info }}</option>
          </template>
            
          </select>
          <span class="text-red-600 font-sans text-sm">{{ store.errorActivity }}</span>
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
              id: 0,
              start_contract: '',
              end_contract: '',
              resolution_contract: '',
              description_contract: '',
                id_housing: 0,
                id_transportation: 0,
                id_activity: 0,
            },
            itemsHousing: [],
            itemsActivities:[],
            itemsTransportation: []
          }
        },
    
        methods: {
          value(){
            console.log(this.newObject)
            this.$emit('value', this.newObject);
          },
          async getActivities(){
            const gets = new Servicies();
            try{
            const res = await gets.get('http://localhost:3080/activities');
            this.itemsActivities = res.map(element => {
            return {
              "id": element.id_activity,
              "info": element.type_activity + ', ' + element.day_activity + ', ' + element.cost_activity,
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          async getHousings(){
            const gets = new Servicies();
            try{
            const res = await gets.get('http://localhost:3080/acommodations');
            this.itemsHousing = res.map(element => {
            return {
              "id": element.id_acommodation,
              "info": element.hotel.name_hotel + ', ' + element.room.room_number + ', ' + element.season.name_season,
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          async getTransportation(){
            const gets = new Servicies();
            try{
            const res = await gets.get('http://localhost:3080/transportations');
            this.itemsTransportation = res.map(element => {
            return {
              "id": element.id_transportation,
              "info": element.transportation_model.type_transp_model + ', ' + element.vehicle.license_plate + ', ' + element.borrower,
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          }
        },
       
        mounted(){
        if(this.store.position != -1){
          this.newObject = this.editObject;
        }
        this.value();
        this.getActivities()
        this.getHousings()
        this.getTransportation()
        }
    }
    </script>