<template>
    <div>
     <h1 class="header">{{this.$t('contracts.title')}}</h1> 
    </div>
    <DataTable 
    :data="data" 
    :headers="[this.$t('contracts.table.dateStart'), this.$t('contracts.table.dateEnd'), this.$t('contracts.table.dateConc'), this.$t('contracts.table.description'), this.$t('contracts.table.activitie'), this.$t('contracts.table.housing'), this.$t('contracts.table.transport')]" 
    :showModal="showModal" 
    @openModal="openModal"
    @add-new-object="addNewObject" 
    @confirm="deleteElement"
    @valueEdit="obtenerEdit"
    @closeAddEdit="close"
    >
    <template #formComponent>
      <ContractForm @value="obtener" :editObject="edit"/>
    </template>
        
     
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
import ContractForm from '@/components/forms/ContractForm.vue';
import Servicies from '@/services/Servicies';
import Validation from '@/assets/validation';
  export default{
    components:{
    DataTable,
    ContractForm
},
    setup(){
         const store = useFormsStore();
         const date = new Validation();
         return{
           store,
           date
          }
        },
    data(){
      return{
        edit: {},
        //headers: ['Fecha de Inicio', 'Fecha de Fin', 'Fecha de Concilación', 'Descripción', 'No. Actividad', 'No. Alojamiento', 'No. Transportación'],
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
          if(this.store.position === -1){
            this.postContracts()
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.patchContracts(this.edit)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deleteContracts(newObject)
      },
      obtenerEdit(newObject){
        this.allData.map(element =>{
          
          if(element.id_contract === newObject.id){
            console.log(element)
            this.edit = {
              "id": element.id_contracts,
              "start_contract": this.date.convertDateFormat(element.start_contract),
              "end_contract": this.date.convertDateFormat(element.end_contract),
              "resolution_contract": this.date.convertDateFormat(element.resolution_contract),
              "description_contract": element.description_contract,
              "id_housing": element.acommodation.id_acommodation,
              "id_activity": element.activity.id_activity,
              "id_transportation": element.transportation.id_transportation,
            }
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
            this.store.errorStart_contract = v.validRequiered(object.start_contract)
            this.store.errorEnd_contract = v.validRequiered(object.end_contract)
            this.store.errorResolution_contract = v.validRequiered(object.resolution_contract)
            this.store.errorDescription_contract = v.validRequiered(object.description_contract)
            this.store.errorTransportation = v.validRequiered(object.id_transportation)
            this.store.errorAcommodation = v.validRequiered(object.id_housing)
            this.store.errorActivity = v.validRequiered(object.id_activity)
             
            if(this.store.errorStart_contract === '' && this.store.errorActivity  === '' &&
             this.store.errorEnd_contract  === '' && this.store.errorResolution_contract === '' && 
             this.store.errorDescription_contract === '' && this.store.errorTransportation  === '' &&
             this.store.errorAcommodation === ''){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorStart_contract = '',
            this.store.errorEnd_contract = '',
            this.store.errorResolution_contract= '',
            this.store.errorDescription_contract= '',
            this.store.errorTransportation= '',
            this.store.errorAcommodation= '',
            this.store.errorActivity = ''
          },
          getContracts: async function(){
            try {
              const getRooms = new Servicies();
              this.allData = await getRooms.get('http://localhost:3080/contracts');
              
              this.data = this.allData.map(element => {
            return {
              "id": element.id_contract,
              "description_contract": element.description_contract,
              "start_contract": this.date.convertDateFormat(element.start_contract),
              "end_contract": this.date.convertDateFormat(element.end_contract),
              "resolution_contract": this.date.convertDateFormat(element.resolution_contract),
              "type_activity": element.activity.type_activity,
              "name_hotel": element.acommodation.hotel.name_hotel,
              "license_plate": element.transportation.vehicle.license_plate,
              "id_housing": element.acommodation.id_acommodation,
              "id_activity": element.activity.id_activity,
              "id_transportation": element.transportation.id_transportation,
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postContracts: async function(){
            const post = new Servicies();
            const hotel = {
              "start_contract": this.edit.start_contract,
              "end_contract": this.edit.end_contract,
              "resolution_contract": this.edit.resolution_contract,
              "description_contract": this.edit.description_contract,
              "id_housing": this.edit.id_acommodation,
              "id_activity": this.edit.id_activity,
              "id_transportation": this.edit.id_transportation,
            }
            console.log(hotel);
            await post.post(hotel, 'http://localhost:3080/contracts');
          this.getContracts()
          },
          patchContracts: async function(data){
            const patch = new Servicies();
           const user = {
              "start_contract": data.start_contract,
              "end_contract": data.end_contract,
              "resolution_contract": data.resolution_contract,
              "description_contract": data.description_contract,
              "id_housing": data.id_acommodation,
              "id_activity": data.id_activity,
              "id_transportation": data.id_transportation,
            }
            await patch.patch(user,'http://localhost:3080/contracts/', data.id)
            this.getContracts()
          },
          deleteContracts: async function(data){
            const deletePackage = new Servicies();
            await deletePackage.delete('http://localhost:3080/contracts/', data.id)
            this.getContracts()
          }
    },
    
    mounted(){
      this.getContracts()
    }
  }
  </script>
  