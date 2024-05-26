<template>
    <div>
     <h1 class="header">{{this.$t('km.title')}}</h1> 
    </div>
    
    <DataTable 
    :data="data" 
    :headers="[this.$t('km.table.description'),this.$t('km.table.km_cost'),this.$t('km.table.km_idayvuelta'),this.$t('km.table.wait_cost')]" 
    @add-new-object="addNewObject" 
    @confirm="deleteElement"
    @valueEdit="obtenerEdit"
    >
    <template #formComponent>
      <KmForm @value="obtener" :editObject="edit"/>
    </template>
        
     
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
import KmForm from '@/components/forms/kmForm.vue';
  export default{
    components:{
    DataTable,
    KmForm
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
        //headers: ['Descripción', 'Costo por KM', 'Costo por KM ida y vuelta', 'Costo por horas de espera',''],
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
  