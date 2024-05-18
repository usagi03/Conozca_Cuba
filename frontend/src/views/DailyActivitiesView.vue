<template>
    <div>
     <h1 class="header">Actividades Diarias</h1> 
    </div>
    <DataTable :data="data" :headers="headers" @add-new-object="addNewObject" @confirm="deleteElement"@valueEdit="obtenerEdit">
      <template #formComponent>
        <DailyActivitiesForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import DailyActivitiesForm from '@/components/forms/DailyActivitiesForm.vue';
  export default{
    components:{
      DataTable,
      DailyActivitiesForm
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
        headers: ['Tipo', 'Día', 'Tiempo', 'Provincia', 'Costo', 'Recargo', 'Descripción'],
        data: [ 
            {'Tipo': 'recrearse', 'Día': '27/9/2024', 'Tiempo':'un mes', 'Provincia':'La Habana', 'Costo':'100', 'Recargo':'10', 'Descripción':'Viaje muy bonito y elegante'},
            {'Tipo': 'cantar', 'Día': '30/9/2024', 'Tiempo':'un día', 'Provincia':'Artemisa', 'Costo':'50', 'Recargo':'5', 'Descripción':'Experiencia única e inigualable'}
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