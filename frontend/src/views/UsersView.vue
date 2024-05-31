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
        data: [],
        allData: [],
        exists: false
      }
    },
    methods:{
      openModal(){
        this.showModal = true;
      },
      addNewObject(){
         if(this.valid(this.edit)){
          console.log(this.store.position)
          if(this.store.position === -1){
          this.postUser()
          this.showModal = false;
          this.active = false;
        } else {
          this.patchUser(this.edit)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
        
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deleteUser(newObject)
        // const index = this.data.indexOf(newObject);
        // console.log(index);
        // this.data.splice(index, 1);
      },
      obtenerEdit(newObject){
        this.allData.map(element =>{
          
          if(element.id_user === newObject.id){
            
            this.edit = {
              "id": element.id_user,
              "user_name": element.user_name,
              "user_password": element.user_password,
              "role": element.role.name_role
            } 
            console.log(this.edit)
          }
        });
        
        this.showModal = true;
      },
      obtener(newObject){
        console.log(newObject)
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
            this.store.errorRol = v.validRequiered(object.role);

            this.allData.map(element => {
              if(this.edit.user_name === element.user_name){
                alert('El nombre de usuario ya existe');
                this.exists = true;
              } else{
                this.exists = false;
              }
            })
            
            if(this.store.errorUser === '' && this.store.errorPass === '' &&
             this.store.errorRol === '' && this.exists === false){
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
          async getUsers(){
            try {
              const getUsers = new Servicies();
              this.allData = await getUsers.get('http://localhost:3080/users');
              
              this.data = this.allData.map(element => {
            return {
              "id": element.id_user,
              "user_name": element.user_name,
              "role": element.role.name_role    
            }
             
           });
           console.log(this.data); 
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          async postUser(){
            const postUser = new Servicies();
            const user = {
                user_name: this.edit.user_name,
                user_password: this.edit.user_password,
                role: this.edit.role
            };

            await postUser.post(user, 'http://localhost:3080/users');
            this.getUsers();
          },
          async patchUser(userData){
            console.log(userData)
            const patchUser = new Servicies();
           const user = {
                user_name: userData.user_name,
                user_password: userData.user_password,
                role: userData.role
            }
            await patchUser.patch(user,'http://localhost:3080/users/', userData.id);
            this.getUsers()
          },
          async deleteUser(data){
            const deleteUser = new Servicies();
            await deleteUser.delete('http://localhost:3080/users/', data.id);
            this.getUsers()
          }
    },
    mounted(){
      this.getUsers()
    },
    updated(){
    }
  }

  </script>