<template>
    <div>
     <h1 class="header">{{this.$t('km/h.title')}}</h1> 
    </div>
    
    <DataTable 
    :data="data" 
    :headers="[this.$t('km/h.table.description'), this.$t('km/h.table.recorrido'), this.$t('km/h.table.hours_cos'), this.$t('km/h.table.km_extras'),this.$t('km/h.table.hours_extras')]" 
    @add-new-object="addNewObject" 
    @confirm="deleteElement"
    @valueEdit="obtenerEdit"
    >
    <template #formComponent>
      <Km_hForm @value="obtener" :editObject="edit"/>
    </template>
        
     
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
import Km_hForm from '@/components/forms/km_hForm.vue';
  export default{
    components:{
    DataTable,
    Km_hForm
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
        //headers: ['Descripción', 'Costo del recorrido por km', 'Costo por horas', 'Costo por km extras', 'Costo por horas extra',''],
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
  