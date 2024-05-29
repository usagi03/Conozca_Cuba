<template>
    <div>
     <h1 class="header">{{this.$t('seasons.title')}}</h1> 
    </div>
    <DataTable :data="data" :showModal="showModal" @openModal="openModal"
    :headers="[this.$t('seasons.table.name'),this.$t('seasons.table.dateStart'), this.$t('seasons.table.dateEnd')]" 
    @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit" 
    @closeAddEdit="close"
    >
      <template #formComponent>
        <SeasonForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import SeasonForm from '@/components/forms/SeasonForm.vue';
import Validation from '@/assets/validation';
import Servicies from '@/services/Servicies';
  export default{
    components:{
      DataTable,
      SeasonForm
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
        headers: ['Nombre', 'Fecha Inicio', 'Fecha Fin'],
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
            this.postSeasons()
            this.data.push(this.edit);
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.data.splice(this.store.position, 1, newObject)
          this.patchSeasons(newObject, this.store.position)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        const index = this.data.indexOf(newObject);
        this.deleteSeasons(newObject)
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
            this.store.errorName_season = v.validRequiered(object.name_season)
            this.store.errorStart_season = v.validRequiered(object.start_season)
            this.store.errorEnd_season = v.validRequiered(object.end_season)
            this.store.errorDescription = v.validRequiered(object.description_season)

            if(this.store.errorName_season === '' && this.store.errorStart_season === '' && 
            this.store.errorEnd_season === '' && this.store.errorDescription === ''){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorName_season = '',
            this.store.errorStart_season = '',
            this.store.errorEnd_season = '',
            this.store.errorDescription = ''
          },
          getSeasons: async function(){
            try {
              const getSeasons = new Servicies();
              const res = await getSeasons.get('http://localhost:3080/seasons');
              console.log(this.data);
              res.map(element => {
            const season = {
              
              
              "name_season": element.name_hotel,
              "start_season": element.start_season,
              "end_season": element.end_season,
              
                
            }
              this.data.push(season)
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postSeasons: async function(){
            const postSeasons = new Servicies();
            const hotel = {
              "name_season": this.edit.name_hotel,
              "start_season": this.edit.start_season,
              "end_season": this.edit.end_season,
              "description_season": this.edit.description_season
            }
            console.log(hotel);
            postSeasons.post(hotel, 'http://localhost:3080/seasons');
          },
          patchSeasons: async function(data, index){
            const patchSeasons = new Servicies();
            const res = await patchSeasons.get('http://localhost:3080/seasons');
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
            patchSeasons.patch(user,'http://localhost:3080/seasons/', id)
          },
          deleteSeasons: async function(data){
            const deleteSeasons = new Servicies();
            const res = await deleteSeasons.get('http://localhost:3080/seasons');
            let id = '';
            res.map(element => {
              if(element.name_hotel === data.name_hotel) {
                id = element.id_hotel;
              }
           });
           deleteSeasons.delete('http://localhost:3080/seasons/',id)
          }
    },
    mounted(){
      this.getSeasons()
    },
  }
  </script>