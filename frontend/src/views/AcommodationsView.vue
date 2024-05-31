<template>
    <div>
     <h1 class="header">{{this.$t('housing.title')}}</h1> 
    </div>
    <DataTable :data="data" :showModal="showModal" @openModal="openModal"
    :headers="[this.$t('housing.table.hotel'), this.$t('housing.table.room'), this.$t('housing.table.season')]" 
    @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit" 
    @closeAddEdit="close"
    >
      <template #formComponent>
        <AcommodationsForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  
import Validation from '@/assets/validation';
import Servicies from '@/services/Servicies';
import AcommodationsForm from '@/components/forms/AcommodationsForm.vue';
  export default{
    components:{
    DataTable,
    AcommodationsForm
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
        //headers: ['Nombre', 'Fecha Inicio', 'Fecha Fin'],
        data: [],
        showModal: false,
        active: false,
        allData: [],
        exists: true
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
            this.postAcommodation()
            
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          //this.data.splice(this.store.position, 1, newObject)
          this.patchAcommodation(newObject)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deleteAcommodation(newObject)
      },
      obtenerEdit(newObject){
        this.allData.map(element =>{
          
          if(element.id_acommodation === newObject.id){
            console.log(element)
            this.edit = {
              "id": element.id_acommodation,
              "hotel": element.hotel.id_hotel,
              "room": element.room.id_room,
              "season": element.season.id_season
              
            }
          }
        });
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
            
            this.store.erroRoom = v.validRequiered(object.room)
            this.store.errorSeason = v.validRequiered(object.season)
            this.store.errorHotel = v.validRequiered(object.hotel)           

            if(this.store.erroRoom === '' && this.store.errorSeason  === '' && this.store.errorHotel === ''){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorPlan_type = ''
            this.store.errorPlan_cost = ''
          },
          getAcommodation: async function(){
            try {
              const getPlan = new Servicies();
              this.allData = await getPlan.get('http://localhost:3080/acommodations');
              this.data = this.allData.map(element => {
            return {
              
              "id": element.id_acommodation,
              "hotel": element.hotel.name_hotel,
              "room": element.room.room_number,
              "season": element.season.name_season
                
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postAcommodation: async function(){
            const postSeasons = new Servicies();
            const plan = {
              "hotel": this.edit.hotel,
              "room": this.edit.room,
              "season": this.edit.season
            }
            console.log(plan);
            await postSeasons.post(plan, 'http://localhost:3080/acommodations');
            this.getAcommodation()
          },
          patchAcommodation: async function(data){
            const patchSeasons = new Servicies();
          const user = {
              "hotel": data.hotel,
              "room": data.room,
              "season": data.season
            }
            await patchSeasons.patch(user,'http://localhost:3080/acommodations/', data.id)
           this.getAcommodation()
          },
          deleteAcommodatio: async function(data){
            const deletePlan = new Servicies();
            
           await deletePlan.delete('http://localhost:3080/acommodations/',data.id)
           this.getAcommodation()
          }
    },
    mounted(){
      this.getAcommodation()
    },
  }
  </script>