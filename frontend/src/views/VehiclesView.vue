<template>
    <div>
     <h1 class="header">{{this.$t('vehicles.title')}}</h1> 
    </div>
    <DataTable :data="data" :showModal="showModal" @openModal="openModal"
     :headers="[this.$t('vehicles.table.plate'),this.$t('vehicles.table.brand'),this.$t('vehicles.table.year'),this.$t('vehicles.table.luggage_capacity'), this.$t('vehicles.table.luggage_without'),this.$t('vehicles.table.total')]"
    @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit"
    @closeAddEdit="close"
    >
      <template #formComponent>
        <VehiclesForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import VehiclesForm from '@/components/forms/VehiclesForm.vue';
import Validation from '@/assets/validation';
import Servicies from '@/services/Servicies';
  export default{
    components:{
      DataTable,
      VehiclesForm
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
        //headers: ['Matrícula', 'Marca', 'Año', 'Capacidad Equipaje', 'Capacidad Sin Equipaje', 'Capacidad Total'],
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
            this.postVehicles()
            this.data.push(this.edit);
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.data.splice(this.store.position, 1, newObject)
          this.patchVehicles(newObject, this.store.position)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        const index = this.data.indexOf(newObject);
        //this.deleteVehicles(newObject)
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
            this.store.errorPlate = v.validRequiered(object.license_plate)
            this.store.errorBrand = v.validRequiered(object.brand)
            this.store.errorLuggage_capacity = v.validRequiered(object.luggage_capacity)
            this.store.errorWith_luggage_capacity = v.validRequiered(object.with_luggage_capacity)
            this.store.errorTotal_capacity = v.validRequiered(object.total_capacity)
            this.store.errorYear_build = v.validRequiered(object.year_build)

            if(this.store.errorName_season === '' && this.store.errorPlate === '' && this.store.errorBrand === '' &&
            this.store.errorLuggage_capacity === '' && this.store.errorWith_luggage_capacity === '' &&
            this.store.errorTotal_capacity === '' && this.store.errorYear_build ===''){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorPlate = '',
            this.store.errorBrand = '',
            this.store.errorLuggage_capacity = '',
            this.store.errorWith_luggage_capacity = '',
            this.store.errorTotal_capacity = '',
            this.store.errorYear_build = ''
          },
          getVehicles: async function(){
            try {
              const getVehicles = new Servicies();
              const res = await getVehicles.get('http://localhost:3080/vehicles');
              console.log(this.data);
              res.map(element => {
            const vehicle = {
              
              "license_plate": element.license_plate,
              "brand": element.brand,
              "luggage_capacity": element.luggage_capacity,
              "with_luggage_capacity": element.with_luggage_capacity,
              "total_capacity": element.total_capacity,
              "year_build": element.year_build
              
                
            }
              this.data.push(vehicle)
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postVehicles: async function(){
            const postVehicles = new Servicies();
            const vehicle = {
              "license_plate": this.edit.license_plate,
              "brand": this.edit.brand,
              "luggage_capacity": this.edit.luggage_capacity,
              "with_luggage_capacity": this.edit.with_luggage_capacity,
              "total_capacity": this.edit.total_capacity,
              "year_build": this.edit.year_build
            }
            console.log(vehicle);
            postVehicles.post(vehicle, 'http://localhost:3080/vehicles');
          },
          patchVehicles: async function(data, index){
            const patchVehicles = new Servicies();
            const res = await patchVehicles.get('http://localhost:3080/vehicles');
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
            "name_season": data.name_hotel,
              "start_season": data.start_season,
              "end_season": data.end_season,
              "description_season": data.description_season
            }
            patchVehicles.patch(user,'http://localhost:3080/vehicles/', id)
          },
          deleteVehicles: async function(data){
            const deleteVehicles = new Servicies();
            const res = await deleteVehicles.get('http://localhost:3080/vehicles');
            let id = '';
            res.map(element => {
              if(element.name_hotel === data.name_hotel) {
                id = element.id_hotel;
              }
           });
           deleteVehicles.delete('http://localhost:3080/vehicles/',id)
          }
    },
    mounted(){
      this.getVehicles()
    },
  }
  </script>