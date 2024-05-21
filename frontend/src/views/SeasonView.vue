<template>
    <div>
     <h1 class="header">Temporadas</h1> 
    </div>
    <DataTable :data="data" :headers="headers" @add-new-object="addNewObject" @confirm="deleteElement"@valueEdit="obtenerEdit">
      <template #formComponent>
        <SeasonForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import SeasonForm from '@/components/forms/SeasonForm.vue';
  export default{
    components:{
      DataTable,
      SeasonForm
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
        headers: ['Nombre', 'Fecha Inicio', 'Fecha Fin'],
        data: [ 
            {'name': 'Alta', 'Fecha Inicio': '1/07/24', 'Fecha Fin':'31/08/24'},
            {'name': 'Baja','Fecha Inicio': '1/10/24', 'Fecha Fin':'31/01/25'}
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