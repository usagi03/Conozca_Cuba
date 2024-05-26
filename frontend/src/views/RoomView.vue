<template>
    <div>
     <h1 class="header">{{this.$t('rooms.title')}}</h1> 
    </div>
    <DataTable :data="data" :headers="[this.$t('rooms.table.number'), this.$t('rooms.table.type'), this.$t('rooms.table.cost'),this.$t('rooms.table.meal_plan'), this.$t('rooms.table.plus')]" @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit">
      <template #formComponent>
        <RoomForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import RoomForm from '@/components/forms/RoomForm.vue';
  export default{
    components:{
      DataTable,
      RoomForm
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
        headers: ['Numero', 'Tipo', 'Costo', 'Plan Alimenticio', 'Recargo'],
        data: [ 
            {'Numero': '113', 'Tipo': 'Sencilla', 'Costo':'100', 'Plan Alimenticio':'Almuerzo-Cena', 'Recargo':'70'},
            {'Numero': '215', 'Tipo': 'Suit', 'Costo':'600', 'Plan Alimenticio':'Almuerzo-Cena', 'Recargo':'100'}
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