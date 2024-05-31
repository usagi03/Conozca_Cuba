<template>
    <div>
     <h1 class="header">{{this.$t('dailyActivities.title')}}</h1> 
    </div>
    <DataTable :data="data" :showModal="showModal" @openModal="openModal"
    :headers="[this.$t('dailyActivities.table.type'), this.$t('dailyActivities.table.day'),this.$t('dailyActivities.table.time'),this.$t('dailyActivities.table.province'), this.$t('dailyActivities.table.cost'),this.$t('dailyActivities.table.recar'), this.$t('dailyActivities.table.description')]" 
    @add-new-object="addNewObject" @confirm="deleteElement" 
    @valueEdit="obtenerEdit" @closeAddEdit="close">
      <template #formComponent>
        <DailyActivitiesForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  import DailyActivitiesForm from '@/components/forms/DailyActivitiesForm.vue';
import Servicies from '@/services/Servicies';
import Validation from '@/assets/validation';
  export default{
    components:{
      DataTable,
      DailyActivitiesForm
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
        //headers: ['Tipo', 'Día', 'Tiempo', 'Provincia', 'Costo', 'Recargo', 'Descripción'],
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
            this.postActivity()
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.patchActivity(newObject)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deleteActivity(newObject)
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
           
            this.store.errorType_activity = v.validRequiered(object.type_activity)
            this.store.errorDay_activity = v.validRequiered(object.day_activity)
            this.store.errorTime_activity = v.validRequiered(object.time_activity)
            this.store.erroCost_activity = v.validRequiered(object.cost_activity)
            this.store.errorProvince_activity = v.validRequiered(object.province_activity)
            this.store.errorDescription_activity = v.validRequiered(object.description_activity)
            this.store.errorSurcharge_activity = v.validRequiered(object.surcharge_activity)

            this.allData.map(element => {
              if(this.edit.type_activity === element.type_activity && this.store.position === -1){
                alert('La actividad ya existe');
                this.exists = true;
              } else{
                this.exists = false;
              }
            })

            if(this.store.errorType_activity === '' && this.store.errorDay_activity  === '' && 
             this.store.errorTime_activity === '' && this.store.erroCost_activity === '' && 
             this.store.errorProvince_activity === '' && this.store.errorDescription_activity === '' &&
            this.store.errorSurcharge_activity === '' && this.exists === false){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorType_activity = ''
            this.store.errorDay_activity = ''
            this.store.errorTime_activity = ''
            this.store.erroCost_activity = ''
            this.store.errorProvince_activity = ''
            this.store.errorDescription_activity = ''
            this.store.errorSurcharge_activity = ''
          },
          getActivity: async function(){
            try {
              const getPlan = new Servicies();
              this.allData = await getPlan.get('http://localhost:3080/activities');
              this.data = this.allData.map(element => {
            return {
              
              "id": element.id_activity,
              "type_activity": element.type_activity,
              "day_activity": element.day_activity,
              "time_activity": element.time_activity,
              "province_activity": element.province_activity,
              "cost_activity": element.cost_activity,
              "surcharge_activity": element.surcharge_activity,
              "description_activity": element.description_activity,
                
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postActivity: async function(){
            const postActivity = new Servicies();
            const plan = {
              "type_activity": this.edit.type_activity,
              "day_activity": this.edit.day_activity,
              "time_activity": this.edit.time_activity,
              "province_activity": this.edit.province_activity,
              "cost_activity": this.edit.cost_activity,
              "surcharge_activity": this.edit.surcharge_activity,
              "description_activity": this.edit.description_activity
            }
            console.log(plan);
            await postActivity.post(plan, 'http://localhost:3080/activities');
            this.getActivity()
          },
          patchActivity: async function(data){
            const patchActivity = new Servicies();
           const user = {
            "type_activity": data.type_activity,
              "day_activity": data.day_activity,
              "time_activity": data.time_activity,
              "province_activity": data.province_activity,
              "cost_activity": data.cost_activity,
              "surcharge_activity": data.surcharge_activity,
              "description_activity": data.description_activity,
            }
            await patchActivity.patch(user,'http://localhost:3080/activities/', data.id)
          this.getActivity()
          },
          deleteActivity: async function(data){
            const deleteActivity = new Servicies();
             
            
          await deleteActivity.delete('http://localhost:3080/activities/',data.id)
          this.getActivity()
          }
    },
    mounted(){
      this.getActivity()
    },
  }
  </script>