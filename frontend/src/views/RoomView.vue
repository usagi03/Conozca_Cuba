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
            this.postRooms()
            this.data.push(this.edit);
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.data.splice(this.store.position, 1, newObject)
          this.patchRooms(newObject, this.store.position)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deleteRooms(newObject)
        const index = this.data.indexOf(newObject);
        console.log(index);
        this.data.splice(index, 1);
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
              const res = await getRooms.get('http://localhost:3080/rooms');
              console.log(this.data);
              res.map(element => {
            const user = {
              
               "room_number": element.room_number,
               "room_type": element.room_type,
               "room_cost": element.room_cost,
               "plan": element.plan.plan_type, 
               "room_surcharge": element.room_surcharge
                
            }
              this.data.push(user)
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
            postRoom.post(room, 'http://localhost:3080/rooms');
          },
          patchRooms: async function(data, index){
            const patchRoom = new Servicies();
            const res = await patchRoom.get('http://localhost:3080/rooms');
            let id = '';
            let count = -1;
            res.map(element => {
             count++
              if(index === count) {
                id = element.id_room;
                console.log(element.id_room)
              }
              
           });
           console.log(id)
           const user = {
              "room_number": data.room_number.toString(),
               "room_type": data.room_type,
               "room_cost": data.room_cost,
               "plan": data.plan, 
               "room_surcharge": data.room_surcharge
            }
            patchRoom.patch(user,'http://localhost:3080/rooms/', id)
          },
          deleteRooms: async function(data){
            const deleteUser = new Servicies();
            const res = await deleteUser.get('http://localhost:3080/rooms');
            let id = '';
            res.map(element => {
              if(element.room_number === data.room_number) {
                id = element.id_room;
              }
           });
           deleteUser.delete('http://localhost:3080/rooms/',id)
          }
    },
    mounted(){
      this.getRooms()
    }
  }
  </script>