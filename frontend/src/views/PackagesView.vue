<template>
    <div>
     <h1 class="header">{{this.$t('packages.title')}}</h1> 
    </div>
    <DataTable :data="data" :headers="[this.$t('packages.table.name'), this.$t('packages.table.days'),this.$t('packages.table.nights'),this.$t('packages.table.persons'), this.$t('packages.table.hotel_cost'), this.$t('packages.table.hotel_travel'),this.$t('packages.table.transport'), this.$t('packages.table.package'), this.$t('packages.table.profit')]" @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit">
      <template #formComponent>
        <PackagesForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import PackagesForm from '@/components/forms/PackagesForm.vue';
  export default{
    components:{
      DataTable,
      PackagesForm
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
        //headers: ['Nombre', '# de Días', '# de Noches', '# de Personas', '$ Total Hotel','$ Viaje Hotel - Aeropuerto', '$ Transporte', '$ Total Paquete', '% de Ganancia', ''],
        data: [ 
            {'eeee' : 'grfdsagfd'} ,
            {'eeee' : 'grfdsagfd'} ,
            
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