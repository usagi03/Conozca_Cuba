<template>
    <div>
     <h1 class="header">{{this.$t('rooms.title')}}</h1> 
    </div>
    <DataTable :showModal="showModal" @openModal="openModal" 
    :data="data" :headers="[this.$t('rooms.table.number'), this.$t('rooms.table.type'), this.$t('rooms.table.cost'),this.$t('rooms.table.meal_plan'), this.$t('rooms.table.plus')]" 
    @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit"
    @closeAddEdit="close">
      <template #formComponent>
        <RoomForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import RoomForm from '@/components/forms/RoomForm.vue';
import Servicies from '@/services/Servicies';
import Validation from '@/assets/validation';
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
        //headers: ['Numero', 'Tipo', 'Costo', 'Plan Alimenticio', 'Recargo'],
        data: [],
        showModal: false,
        active: false,
        allData: [],
        exists: false
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
            this.postRooms()
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          //this.data.splice(this.store.position, 1, newObject)
          this.patchRooms(newObject)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deleteRooms(newObject)
      },
      obtenerEdit(newObject){
        this.edit = newObject;
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
            this.store.errorNumber = v.validRequiered(object.room_number)
            this.store.errorType = v.validRequiered(object.room_type)
            this.store.errorCost = v.validRequiered(object.room_cost)
            this.store.errorMeal = v.validRequiered(object.plan)
            this.store.errorPlus = v.validRequiered(object.room_surcharge)
            if(this.store.errorNumber === '' && this.store.errorType === '' && this.store.errorCost === '' &&
            this.store.errorMeal === '' && this.store.errorPlus === ''){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorNumber = ''
            this.store.errorType = ''
            this.store.errorCost = ''
            this.store.errorMeal = ''
            this.store.errorPlus = ''
          },
          getRooms: async function(){
            try {
              const getRooms = new Servicies();
              this.allData = await getRooms.get('http://localhost:3080/rooms');
              console.log(this.data);
              this.data = this.allData.map(element => {
            return {
               "id": element.id_room,
               "room_number": element.room_number,
               "room_type": element.room_type,
               "room_cost": element.room_cost,
               "plan": element.plan.plan_type, 
               "room_surcharge": element.room_surcharge
                
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postRooms: async function(){
            const postRoom = new Servicies();
            const room = {
              "room_number": this.edit.room_number.toString(),
               "room_type": this.edit.room_type,
               "room_cost": this.edit.room_cost,
               "plan": this.edit.plan, 
               "room_surcharge": this.edit.room_surcharge
            }
            console.log(room);
            await postRoom.post(room, 'http://localhost:3080/rooms');
          this.getRooms()
          },
          patchRooms: async function(data){
            const patchRoom = new Servicies();

           const user = {
              "room_number": data.room_number.toString(),
               "room_type": data.room_type,
               "room_cost": data.room_cost,
               "plan": data.plan, 
               "room_surcharge": data.room_surcharge
            }
            await patchRoom.patch(user,'http://localhost:3080/rooms/', data.id)
          this.getRooms()
          },
          deleteRooms: async function(data){
            const deleteUser = new Servicies();
            
           await deleteUser.delete('http://localhost:3080/rooms/', data.id)
          this.getRooms()
          }
    },
    mounted(){
      this.getRooms()
    }
  }
  </script>