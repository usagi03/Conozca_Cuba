<template>
    <div>
     <h1 class="header">{{this.$t('dailyActivities.title')}}</h1> 
    </div>
    <DataTable :data="data" :headers="[this.$t('dailyActivities.table.type'), this.$t('dailyActivities.table.day'),this.$t('dailyActivities.table.time'),this.$t('dailyActivities.table.province'), this.$t('dailyActivities.table.cost'),this.$t('dailyActivities.table.recar'), this.$t('dailyActivities.table.description')]" @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit">
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