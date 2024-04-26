<template>
  <DataTable 
  :data="data" 
  :headers="headers" 
  @add-new-object="addNewObject" 
  @confirm="deleteElement"
  @valueEdit="obtenerEdit"
>
  <template #formComponent>
    {{ this.edit }}
    <UserForm @value="obtener" :editObject="edit"/>
  </template>
      
   
  </DataTable>
</template>
<script>
import DataTable from '@/components/DataTable.vue';
import { useFormsStore } from '@/stores/forms';
import UserForm from '@/components/UserForm.vue';
export default{
  components:{
    DataTable,
    UserForm,
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
      headers: ['Nombre', 'Apellidos', 'Edad', 'Teléfono'],
      data: [
          {'name': 'Julio', 'lastname': 'Martinez', 'age': 18, 'phone': '76900831' },
          {'name': 'Camila', 'lastname': 'Martin', 'age': 22, 'phone': '76904831' }
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
  mounted(){

  }
}
</script>
