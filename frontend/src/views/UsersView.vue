<template>
    <div>
     <h1 class="header">{{$t('users.title')}}</h1> 
    </div>
    <DataTable :showModal="showModal" @openModal="openModal" :data="data" :headers="[this.$t('users.table.username'), this.$t('users.table.password'), this.$t('users.table.role')]" 
    @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit"
    @closeAddEdit="close">
      <template #formComponent>
        <UsersForm @value="obtener" @valid="valid" :editObject="edit" :active="active"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import UsersForm from '@/components/forms/UsersForm.vue';
import Validation from '@/assets/validation';
import Servicies from '@/services/Servicies'
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
        valided: false,
        showModal: false,
        active: false,
        //headers: [this.$t('users.table.username'), this.$t('users.table.password'), this.$t('users.table.role')],
        data: [ 
            // {'name': 'Julio', 'password': 'julito1234', 'rol':'Administrador'},
            // {'name': 'Camila','password': 'camila12345', 'rol':'Gerente'}
        ],
      }
    },
    methods:{
      openModal(){
        this.showModal = true;
      },
      addNewObject(newObject){
        console.log(this.edit)
         if(this.valid(this.edit)){
          if(this.store.position === -1){
          this.data.push(this.edit);
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.data.splice(this.store.position, 1, newObject)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
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
        this.showModal = true;
      },
      
      obtener(newObject){
        this.edit = newObject;
      },
      close(){
        this.showModal = false;
        this.active = false;
        this.resetErrors();
      },
      valid(object){
            const v = new Validation()
            let ok = false;
            this.store.errorUser = v.validRequiered(object.name);
            this.store.errorPass = v.validRequiered(object.password);
            this.store.errorRol = v.validRequiered(object.rol);
            if(this.store.errorUser === '' && this.store.errorPass === '' && this.store.errorRol === ''){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorUser = '';
            this.store.errorPass = '';
            this.store.errorRol = '';
          },
          getUsers: async function(){
            try {
              const getUsers = new Servicies();
              const res = await getUsers.get('http://localhost:3080/users');
              console.log(this.data);
              this.data = res
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          // postUser(object.user, object.password, object.){
          //   const post
          // }
    },
    mounted(){
      this.getUsers()
    }
  }
  </script>