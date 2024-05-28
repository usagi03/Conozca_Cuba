<template>
    <div>
     <h1 class="header">{{$t('users.title')}}</h1> 
    </div>
    <DataTable :showModal="showModal" @openModal="openModal" :data="data" :headers="[this.$t('users.table.username'), this.$t('users.table.role')]" 
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
        showModal: false,
        //headers: [this.$t('users.table.username'), this.$t('users.table.password'), this.$t('users.table.role')],
        data: [ 
            // {'name': 'Julio', 'password': 'julito1234', 'rol':'Administrador'},
            // {'name': 'Camila','password': 'camila12345', 'rol':'Gerente'}
        ],
        active: false
      }
    },
    methods:{
      openModal(){
        this.showModal = true;
      },
      addNewObject(newObject){
        console.log(this.edit)
         if(this.valid(this.edit)){
          console.log(this.store.position)
          if(this.store.position === -1){
            this.postUser()
            this.data.push(this.edit);
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.data.splice(this.store.position, 1, newObject)
          this.patchUser(newObject, this.store.position)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
        
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deleteUser(newObject)
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
            this.store.errorUser = v.validRequiered(object.user_name);
            this.store.errorPass = v.validRequiered(object.user_password);
            this.store.errorRol = v.validRequiered(object.nombre_role);
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
              res.map(element => {
            const user = {
              "user_name": element.user_name,
              "nombre_role": element.role.name_role    
            }
              this.data.push(user)
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postUser: async function(){
            const postUser = new Servicies();
            const user = {
                user_name: this.edit.user_name,
                user_password: this.edit.user_password,
                role: this.edit.nombre_role
            }
            console.log(user);
            postUser.post(user, 'http://localhost:3080/users');
          },
          patchUser: async function(userData, index){
            const patchUser = new Servicies();
            const res = await patchUser.get('http://localhost:3080/users');
            let id = '';
            let count = -1;
            res.map(element => {
             count++
              if(index === count) {
                id = element.id_user;
                console.log(element.id_user)
              }
              
           });
           console.log(id)
           const user = {
                user_name: userData.user_name,
                user_password: userData.user_password,
                role: userData.nombre_role
            }
            patchUser.patch(user,'http://localhost:3080/users/', id)
          },
          deleteUser: async function(data){
            const deleteUser = new Servicies();
            const res = await deleteUser.get('http://localhost:3080/users');
            let id = '';
            res.map(element => {
              if(element.user_name === data.user_name) {
                id = element.id_user;
              }
           });
           deleteUser.delete('http://localhost:3080/users/',id)
          }
    },
    mounted(){
      this.getUsers()
    },
    updated(){
    }
  }

  </script>