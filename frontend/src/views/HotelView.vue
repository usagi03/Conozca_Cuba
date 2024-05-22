<template>
    <div>
     <h1 class="header">Hoteles</h1> 
    </div>
    <DataTable :data="data" :headers="headers" @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit">
      <template #formComponent>
        <HotelForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import HotelForm from '@/components/forms/HotelForm.vue';
  export default{
    components:{
      DataTable,
      HotelForm
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
        headers: ['Nombre', 'Cadena', 'Categoría', 'Dirección', 'Provincia'],
        data: [ 
            {'name': 'Melia Habana', 'Cadena': 'Melia', 'Categoria':'5', 'Dirección':'Avenida 3ra', 'Provincia':'La Habana'},
            {'name': 'Jibacoa', 'Cadena': 'Memories', 'Categoria':'4', 'Dirección':'Santa Cruz del Norte', 'Provincia':'Mayabeque'}
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