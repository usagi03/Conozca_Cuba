<template>
    <div>
     <h1 class="header">Usuarios</h1> 
    </div>
    <DataTable :data="data" :headers="headers" @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit">
      <template #formComponent>
        <UsersForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import UsersForm from '@/components/forms/UsersForm.vue';
  export default{
    components:{
      DataTable,
      UsersForm
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
        headers: ['Nombre', 'Contraseña', 'Rol'],
        data: [ 
            {'name': 'Julio', 'password': 'julito1234', 'rol':'Administrador'},
            {'name': 'Camila','password': 'camila12345', 'rol':'Gerente'}
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