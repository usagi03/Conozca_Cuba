<template>
    <div>
     <h1 class="header">Vehículos</h1> 
    </div>
    <DataTable :data="data" :headers="headers" @add-new-object="addNewObject" @confirm="deleteElement"@valueEdit="obtenerEdit">
      <template #formComponent>
        <VehiclesForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import VehiclesForm from '@/components/forms/VehiclesForm.vue';
  export default{
    components:{
      DataTable,
      VehiclesForm
  },
    setup(){
         const store = useFormsStore();
         return{
           store,
          }
        },
    data(){
      return{
        edit: {},
        headers: ['Matrícula', 'Marca', 'Año', 'Capacidad Equipaje', 'Capacidad Sin Equipaje', 'Capacidad Total'],
        data: [ 
            {'Matrícula': '123-HD12', 'Marca': 'Hyundai', 'Año':'2013', 'Capacidad Equipaje':'4', 'Capacidad Sin Equipaje':'6', 'Capacidad Total':'6'},
            {'Matrícula': '214-TP72', 'Marca': 'Hyundai', 'Año':'2015', 'Capacidad Equipaje':'16', 'Capacidad Sin Equipaje':'20', 'Capacidad Total':'22'}
        ],
      }
    },
    methods:{
      addNewObject(newObject){
        console.log(newObject)
        if(this.store.position === -1){
          this.data.push(this.edit);
        } else {
          console.log(newObject)
          this.data.splice(this.store.position, 1, newObject)
          this.store.isUpdate(-1);
        }
      },
      deleteElement(newObject){
        console.log(newObject)
        const index = this.data.indexOf(newObject);
        console.log(index);
        this.data.splice(index, 1);
      },
      obtenerEdit(newObject){
        this.edit = newObject
      },
      obtener(newObject){
        this.edit = newObject;
      }
    },
  }
  </script>