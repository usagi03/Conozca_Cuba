<template>
    <div>
     <h1 class="header">{{this.$t('hotels.title')}}</h1> 
    </div>
    <DataTable :data="data" :showModal="showModal" @openModal="openModal" :headers="[this.$t('hotels.table.name'),this.$t('hotels.table.chain'),this.$t('hotels.table.category'),this.$t('hotels.table.direction'),this.$t('hotels.table.province')]"
     @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit"
     @closeAddEdit="close">
      <template #formComponent>
        <HotelForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import HotelForm from '@/components/forms/HotelForm.vue';
import Servicies from '@/services/Servicies';
import Validation from '@/assets/validation';
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
        //headers: ['Nombre', 'Cadena', 'Categoría', 'Dirección', 'Provincia'],
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
        const index = this.data.indexOf(newObject);
        console.log(index);
        this.data.splice(index, 1);
      },
      obtenerEdit(newObject){
        this.edit = newObject
        this.showModal = true
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
            this.store.errorNameH = v.validRequiered(object.name_hotel)
            this.store.errorChain = v.validRequiered(object.chain_hotel)
            this.store.errorCategory = v.validRequiered(object.category_hotel)
            this.store.errorAddress = v.validRequiered(object.address_hotel)
            this.store.errorProvince = v.validRequiered(object.province_hotel)
            this.store.errorDate = v.validRequiered(object.date_hotel)
            this.store.errorPhone = v.validRequiered(object.phone)
            this.store.errorFax = v.validRequiered(object.fax)
            this.store.errorCity = v.validRequiered(object.distance_to_city)
            this.store.errorAirport = v.validRequiered(object.distance_to_airport)
            this.store.errorEmail = v.validRequiered(object.email)
            this.store.errorFloor = v.validRequiered(object.floor_count)
            this.store.errorBusiness = v.validRequiered(object.business_model)
            this.store.errorLocation = v.validRequiered(object.location_hotel) 
            if(this.store.errorNameH === '' && this.store.errorChain === '' && this.store.errorCategory === '' &&
            this.store.errorAddress === '' && this.store.errorProvince === '' && this.store.errorDate === '' &&
            this.store.errorPhone === '' && this.store.errorFax === '' && this.store.errorCity === '' &&
            this.store.errorAirport === '' && this.store.errorEmail === '' && this.store.errorFloor === '' &&
            this.store.errorBusiness === '' && this.store.errorLocation === ''){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorNameH = ''
            this.store.errorChain = ''
            this.store.errorCategory = ''
            this.store.errorAddress = ''
            this.store.errorProvince = ''
            this.store.errorDate = ''
            this.store.errorPhone = ''
            this.store.errorFax = ''
            this.store.errorCity = ''
            this.store.errorAirport = ''
            this.store.errorEmail = ''
            this.store.errorFloor = ''
            this.store.errorBusiness = ''
            this.store.errorLocation = ''
          },
          getRooms: async function(){
            try {
              const getRooms = new Servicies();
              const res = await getRooms.get('http://localhost:3080/hotels');
              console.log(this.data);
              res.map(element => {
            const user = {
              
              "name_hotel": element.name_hotel,
              "chain_hotel": element.chain_hotel,
              "category_hotel": element.category_hotel,
              "address_hotel": element.address_hotel,
              "province_hotel": element.province_hotel,
    
                
            }
              this.data.push(user)
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postRooms: async function(){
            const postRoom = new Servicies();
            const hotel = {
              "name_hotel": this.edit.name_hotel,
              "chain_hotel": this.edit.chain_hotel,
              "category_hotel": this.edit.category_hotel,
              "address_hotel": this.edit.address_hotel,
              "province_hotel": this.edit.province_hotel,
            }
            console.log(hotel);
            postRoom.post(hotel, 'http://localhost:3080/hotels');
          },
          patchRooms: async function(data, index){
            const patchRoom = new Servicies();
            const res = await patchRoom.get('http://localhost:3080/hotels');
            let id = '';
            let count = -1;
            res.map(element => {
             count++
              if(index === count) {
                id = element.id_hotel;
                console.log(element.id_hotel)
              }
              
           });
           console.log(id)
           const user = {
            "name_hotel": data.name_hotel,
              "chain_hotel": data.chain_hotel,
              "category_hotel": data.category_hotel,
              "address_hotel": data.address_hotel,
              "province_hotel": data.province_hotel,
            }
            patchRoom.patch(user,'http://localhost:3080/hotels/', id)
          },
          deleteRooms: async function(data){
            const deleteUser = new Servicies();
            const res = await deleteUser.get('hhttp://localhost:3080/hotels');
            let id = '';
            res.map(element => {
              if(element.name_hotel === data.name_hotel) {
                id = element.id_hotel;
              }
           });
           deleteUser.delete('http://localhost:3080/hotels/',id)
          }
    },
    mounted(){
      this.getRooms()
    }
  }
  </script>