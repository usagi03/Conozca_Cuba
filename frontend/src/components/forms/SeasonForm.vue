<template>
    <div class="mt-2">
     <form class="grid grid-cols-3 gap-4 w-500">
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('seasons.table.name') }}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.name_season" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorName_season }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectStartDate" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('seasons.table.dateStart') }}</label>
          <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectStartDate" v-model="newObject.start_season" >
          <span class="text-red-600 font-sans text-sm">{{  store.errorStart_season }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectEndDate" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('seasons.table.dateEnd') }}</label>
          <input type="date" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectEndDate" v-model="newObject.end_season" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorEnd_season }}</span>
        </div>
        <div class="mb-4 col-span-3">
          <label for="newObjectEndDate" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('seasons.table.description') }}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectEndDate" v-model="newObject.description_season" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorDescription }}</span>
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
                name_season: '',
                start_season: '',
                end_season: '',
                description_season: '',
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