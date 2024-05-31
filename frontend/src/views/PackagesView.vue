<template>
    <div>
     <h1 class="header">{{this.$t('packages.title')}}</h1> 
    </div>
    <DataTable :data="data" :showModal="showModal" @openModal="openModal" :headers="[this.$t('packages.table.name'), this.$t('packages.table.days'),this.$t('packages.table.nights'),this.$t('packages.table.persons'), this.$t('packages.table.travel_cost'), this.$t('packages.table.hotel'), this.$t('packages.table.activity'),this.$t('packages.table.transport'), this.$t('packages.table.profit')]" 
    @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit"
    @closeAddEdit="close">
      <template #formComponent>
        <PackagesForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import PackagesForm from '@/components/forms/PackagesForm.vue';
import Servicies from '@/services/Servicies';
import Validation from '@/assets/validation';
  export default{
    components:{
      DataTable,
      PackagesForm
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
        //headers: ['Nombre', '# de Días', '# de Noches', '# de Personas', '$ Total Hotel','$ Viaje Hotel - Aeropuerto', '$ Transporte', '$ Total Paquete', '% de Ganancia', ''],
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
            this.postPackage()
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          //this.data.splice(this.store.position, 1, newObject)
          this.patchPackage(this.edit)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deletePackage(newObject)
      },
      obtenerEdit(newObject){
        this.allData.map(element =>{
          
          if(element.id_package === newObject.id){
            console.log(element)
            this.edit = {
              "id": element.id_package,
              "id_contract": element.contract.id_contract,
              "promotional_name": element.promotional_name,
              "days_count": element.days_count,
              "nights_count": element.nights_count,
              "pax_count": element.pax_count,
              "hotel_airport_ride_cost": element.hotel_airport_ride_cost,
              "percent_profit": element.percent_profit,
              
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
            this.store.errorDays_count = v.validRequiered(object.days_count)
            this.store.errorNights_count = v.validRequiered(object.nights_count)
            this.store.errorPax_count = v.validRequiered(object.pax_count)
            this.store.errorHotel_airport_ride_cost = v.validRequiered(object.hotel_airport_ride_cost)
            this.store.errorPercent_profit = v.validRequiered(object.percent_profit)
            this.store.errorContract = v.validRequiered(object.id_contract)
            this.store.errorPromotional_name = v.validRequiered(object.promotional_name)

           
             
            if(this.store.errorDays_count === '' && this.store.errorNights_count  === '' &&
             this.store.errorPercent_profit  === '' && this.store.errorPax_count === '' && 
             this.store.errorHotel_airport_ride_cost === '' && this.store.errorContract  === '' &&
             this.store.errorPromotional_name === ''){
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
          getPackages: async function(){
            try {
              const getRooms = new Servicies();
              this.allData = await getRooms.get('http://localhost:3080/packages');
              
              this.data = this.allData.map(element => {
            return {
              "id": element.id_package,
              "id_contract": element.contract.id_contract,
              "promotional_name": element.promotional_name,
              "days_count": element.days_count,
              "nights_count": element.nights_count,
              "pax_count": element.pax_count,
              "hotel_airport_ride_cost": element.hotel_airport_ride_cost,
              "name_hotel": element.contract.acommodation.hotel.name_hotel,
              "type_activity": element.contract.activity.type_activity,
              "license_plate": element.contract.transportation.vehicle.license_plate,
              "percent_profit": element.percent_profit,
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postPackage: async function(){
            const post = new Servicies();
            const hotel = {
              "promotional_name": this.edit.promotional_name,
              "days_count": this.edit.days_count,
              "nights_count": this.edit.nights_count,
              "pax_count": this.edit.pax_count,
              "hotel_airport_ride_cost": this.edit.hotel_airport_ride_cost,
              "percent_profit": this.edit.percent_profit,
              "contract": this.edit.id_contract
            }
            console.log(hotel);
            await post.post(hotel, 'http://localhost:3080/packages');
          this.getPackages()
          },
          patchPackage: async function(data){
            const patch = new Servicies();
           const user = {
              "promotional_name": data.promotional_name,
              "days_count": data.days_count,
              "nights_count": data.nights_count,
              "pax_count": data.pax_count,
              "hotel_airport_ride_cost": data.hotel_airport_ride_cost,
              "percent_profit": data.percent_profit,
              "contract": data.id_contract,
            }
            await patch.patch(user,'http://localhost:3080/packages/', data.id)
            this.getPackages()
          },
          deletePackage: async function(data){
            const deletePackage = new Servicies();
            await deletePackage.delete('http://localhost:3080/packages/', data.id)
            this.getPackages()
          }
    },
    
    mounted(){
      this.getPackages()
    }
  }
  </script>