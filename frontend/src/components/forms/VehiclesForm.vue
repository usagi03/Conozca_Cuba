<template>
    <div class="mt-2">
     <form>
        <div class="mb-4">
          <label for="newObjectMat" class="block text-gray-700 text-sm font-bold mb-2">Matrícula</label>
          <input type="text" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectMat" v-model="newObject.mat" >
        </div>
        <div class="mb-4">
          <label for="newObjectMarc" class="block text-gray-700 text-sm font-bold mb-2">Marca</label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectMarc" v-model="newObject.marc" >
            <option>Hyundai</option>
            <option>Mercedez</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="newObjectYear" class="block text-gray-700 text-sm font-bold mb-2">Año</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectYear" v-model="newObject.year"> 
        </div> 
        <div class="mb-4">
          <label for="newObjectCapacity" class="block text-gray-700 text-sm font-bold mb-2">Capacidad Equipaje</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCapacity" v-model="newObject.capacity"> 
        </div> 
        <div class="mb-4">
          <label for="newObjectCapacityWithout" class="block text-gray-700 text-sm font-bold mb-2">Capacidad Sin Equipaje</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCapacityWithout" v-model="newObject.capacityWithout"> 
        </div> 
        <div class="mb-4">
          <label for="newObjectCapacityTotal" class="block text-gray-700 text-sm font-bold mb-2">Capacidad Total</label>
          <input type="number" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="newObjectCapacityTotal" v-model="newObject.capacityTotal"> 
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
                mat: '',
                marc: '',
                year: '',
                capacity: '',
                capacityWithout: '',
                capacityTotal: '',
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