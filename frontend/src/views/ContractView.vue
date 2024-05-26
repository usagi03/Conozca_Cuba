<template>
    <div>
     <h1 class="header">{{this.$t('contracts.title')}}</h1> 
    </div>
    <DataTable 
    :data="data" 
    :headers="[this.$t('contracts.table.dateStart'), this.$t('contracts.table.dateEnd'), this.$t('contracts.table.dateConc'), this.$t('contracts.table.description'), this.$t('contracts.table.activitie'), this.$t('contracts.table.housing'), this.$t('contracts.table.transport')]" 
    @add-new-object="addNewObject" 
    @confirm="deleteElement"
    @valueEdit="obtenerEdit"
    >
    <template #formComponent>
      <ContractForm @value="obtener" :editObject="edit"/>
    </template>
        
     
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
import ContractForm from '@/components/forms/ContractForm.vue';
  export default{
    components:{
    DataTable,
    ContractForm
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
        //headers: ['Fecha de Inicio', 'Fecha de Fin', 'Fecha de Concilación', 'Descripción', 'No. Actividad', 'No. Alojamiento', 'No. Transportación'],
        data: [ {},
            {}
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
  