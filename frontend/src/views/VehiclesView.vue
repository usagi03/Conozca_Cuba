<template>
    <div>
     <h1 class="header">{{this.$t('vehicles.title')}}</h1> 
    </div>
    <DataTable :data="data" :showModal="showModal" @openModal="openModal"
     :headers="[this.$t('vehicles.table.plate'),this.$t('vehicles.table.brand'),this.$t('vehicles.table.luggage_capacity'), this.$t('vehicles.table.luggage_without'),this.$t('vehicles.table.total'), this.$t('vehicles.table.year')]"
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
        this.deleteVehicles(newObject)
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
            this.allData.map(element => {
              if(this.edit.license_plate === element.license_plate){
                alert('La matrícula ya existe');
                this.exists = true;
              } else{
                this.exists = false;
              }
            });
            if(this.store.errorPlate === '' && this.store.errorBrand === '' &&
            this.store.errorLuggage_capacity === '' && this.store.errorWith_luggage_capacity === '' &&
            this.store.errorTotal_capacity === '' && this.store.errorYear_build ==='' && this.exists === false){
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
              this.allData = await getVehicles.get('http://localhost:3080/vehicles');
              
              this.data = this.allData.map(element => {
            return {
              "id": element.id_vehicle,
              "license_plate": element.license_plate,
              "brand": element.brand,
              "luggage_capacity": element.luggage_capacity,
              "with_luggage_capacity": element.with_luggage_capacity,
              "total_capacity": element.total_capacity,
              "year_build": element.year_build
            }
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
            await postVehicles.post(vehicle, 'http://localhost:3080/vehicles');
            this.getVehicles()
          },
          patchVehicles: async function(data){
            const patchVehicles = new Servicies();
           const user = {
            "license_plate": data.license_plate,
              "brand": data.brand,
              "luggage_capacity": data.luggage_capacity,
              "with_luggage_capacity": data.with_luggage_capacity,
              "total_capacity": data.total_capacity,
              "year_build": data.year_build  
          }
            await patchVehicles.patch(user,'http://localhost:3080/vehicles/', data.id)
            this.getVehicles()
          },
          deleteVehicles: async function(data){
            const deleteVehicles = new Servicies();
            await deleteVehicles.delete('http://localhost:3080/vehicles/',data.id)
            this.getVehicles()
          }
    },
    mounted(){
      this.getVehicles()
    },
  }
  </script>