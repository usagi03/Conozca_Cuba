<template>
    <div class="mt-2">
     <form class="grid grid-cols-2 gap-4 w-500">
        <div class="mb-4">
          <label for="newObjectName" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('mealplan.table.plan_type') }}</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectName" v-model="newObject.plan_type" >
          <span class="text-red-600 font-sans text-sm">{{ store.errorPlan_type }}</span>
        </div>
        <div class="mb-4">
          <label for="newObjectStartDate" class="block text-gray-700 text-sm font-bold mb-2">{{ $t('mealplan.table.plan_cost') }}</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectStartDate" v-model="newObject.plan_cost" >
          <span class="text-red-600 font-sans text-sm">{{  store.errorPlan_cost }}</span>
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
                plan_type: '',
                plan_cost: 0
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