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
        active: false,
        allData: [],
        exists: false
      }
    },
    methods:{
      openModal(){
        this.showModal = true;
      },
      addNewObject(){
        console.log(this.edit)
         if(this.valid(this.edit)){
          console.log(this.store.position)
          if(this.store.position === -1){
            this.postRooms()
          this.showModal = false;
          this.active = false;
        } else {
          //this.data.splice(this.store.position, 1, newObject)
          this.patchRooms(this.edit)
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
        this.allData.map(element =>{
          
          if(element.id_hotel === newObject.id){
            
            this.edit = {
              "id": element.id_hotel,
              "name_hotel": element.name_hotel,
              "chain_hotel": element.chain_hotel,
              "category_hotel": element.category_hotel,
              "address_hotel": element.address_hotel,
              "province_hotel": element.province_hotel,
              "date_hotel": element.date_hotel,
              "phone": element.phone,
              "fax": element.fax,
              "distance_to_city": element.distance_to_city,
              "distance_to_airport": element.distance_to_airport,
              "email": element.email,
              "floor_count": element.floor_count,
              "business_model": element.business_model,
              "location_hotel": element.location_hotel
            } 
            console.log(this.edit)
          }
        });
        
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

            this.allData.map(element => {
              if(this.edit.name_hotel === element.name_hotel  ){
                alert('El hotel ya existe');
                this.exists = true;
              } else{
                this.exists = false;
              }
            })

            if(this.store.errorNameH === '' && this.store.errorChain === '' && this.store.errorCategory === '' &&
            this.store.errorAddress === '' && this.store.errorProvince === '' && this.store.errorDate === '' &&
            this.store.errorPhone === '' && this.store.errorFax === '' && this.store.errorCity === '' &&
            this.store.errorAirport === '' && this.store.errorEmail === '' && this.store.errorFloor === '' &&
            this.store.errorBusiness === '' && this.store.errorLocation === '' && this.exists === false){
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
              this.allData = await getRooms.get('http://localhost:3080/hotels');
              
              this.data = this.allData.map(element => {
            return {
              "id": element.id_hotel,
              "name_hotel": element.name_hotel,
              "chain_hotel": element.chain_hotel,
              "category_hotel": element.category_hotel,
              "address_hotel": element.address_hotel,
              "province_hotel": element.province_hotel,
            }
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
              "date_hotel": this.edit.date_hotel,
              "phone": this.edit.phone,
              "fax": this.edit.fax,
              "distance_to_city": this.edit.distance_to_city,
              "distance_to_airport": this.edit.distance_to_airport,
              "email": this.edit.email,
              "floor_count": this.edit.floor_count,
              "business_model": this.edit.business_model,
              "location_hotel": this.edit.location_hotel
            }
            console.log(hotel);
            postRoom.post(hotel, 'http://localhost:3080/hotels');
          },
          patchRooms: async function(data){
            const patchRoom = new Servicies();
           const user = {
            "name_hotel": data.name_hotel,
              "chain_hotel": data.chain_hotel,
              "category_hotel": data.category_hotel,
              "address_hotel": data.address_hotel,
              "province_hotel": data.province_hotel,
            }
            await patchRoom.patch(user,'http://localhost:3080/hotels/', data.id)
            this.getRooms()
          },
          deleteRooms: async function(data){
            const deleteUser = new Servicies();
            await deleteUser.delete('http://localhost:3080/hotels/',data.id)
            this.getRooms()
          }
    },
    
    mounted(){
      this.getRooms()
    }
  }
  </script>