<template>
  <div class="mt-2">
   <form class="grid grid-cols-3 gap-4 w-800">
      <div class="mb-4 ">
        <label  class="block text-gray-700 text-sm font-bold mb-3">{{$t('housing.table.hotel')}}</label>
        <select class="shadow overflow-x-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  size="5" v-model="newObject.hotel" >
        <template v-for="(item, key) in this.itemsHotels" :key="key">
          <option v-if="key != 'id'" :value="item.id" >{{ item.info }}</option>
        </template>
           
        </select>
        
        <span class="text-red-600 font-sans text-sm">{{ store.errorHotel }}</span>
      </div>
      
      <div class="mb-4">
        <label  class="block text-gray-700 text-sm font-bold mb-3">{{$t('housing.table.room')}}</label>
        <select class="shadow overflow-x-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  size="5" v-model="newObject.room" >
        <template v-for="(item, key) in this.itemsRooms" :key="key">
          <option v-if="key != 'id'" :value="item.id" >{{ item.info }}</option>
        </template>
          
        </select>
        <span class="text-red-600 font-sans text-sm">{{ store.errorRoom }}</span>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-3">{{$t('housing.table.season')}}</label>
        <select class="shadow overflow-x-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" size="5" v-model="newObject.season" >
        <template v-for="(item, key) in this.itemsSeason" :key="key">
          <option v-if="key != 'id'" :value="item.id" >{{ item.info }}</option>
        </template>
          
        </select>
        <span class="text-red-600 font-sans text-sm">{{ store.errorSeason }}</span>
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
            
              room: 0,
              hotel: 0,
              season: 0,
          },
          itemsRooms: [],
          itemsSeason:[],
          itemsHotels: []
        }
      },
  
      methods: {
        value(){
          console.log(this.newObject)
          this.$emit('value', this.newObject);
        },
        async getHotel(){
          const gets = new Servicies();
          try{
          const res = await gets.get('http://localhost:3080/hotels');
          this.itemsHotels = res.map(element => {
          return {
            "id": element.id_hotel,
            "info": element.name_hotel,
          }
         });
          } catch (error) {
          console.error("Error fetching users:", error);
         }
        },
        async getRoom(){
          const gets = new Servicies();
          try{
          const res = await gets.get('http://localhost:3080/rooms');
          this.itemsRooms = res.map(element => {
          return {
            "id": element.id_room,
            "info": element.room_number,
          }
         });
          } catch (error) {
          console.error("Error fetching users:", error);
         }
        },
        async getSeason(){
          const gets = new Servicies();
          try{
          const res = await gets.get('http://localhost:3080/seasons');
          this.itemsSeason = res.map(element => {
          return {
            "id": element.id_season,
            "info": element.name_season
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
      this.getHotel()
      this.getRoom()
      this.getSeason()
      }
  }
  </script>