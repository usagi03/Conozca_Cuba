<template>
    <div>
     <h1 class="header">{{this.$t('mealplan.title')}}</h1> 
    </div>
    <DataTable :data="data" :showModal="showModal" @openModal="openModal"
    :headers="[this.$t('mealplan.table.plan_type'),this.$t('mealplan.table.plan_cost')]" 
    @add-new-object="addNewObject" @confirm="deleteElement" @valueEdit="obtenerEdit" 
    @closeAddEdit="close"
    >
      <template #formComponent>
        <MealPlanForm @value="obtener" :editObject="edit"/>
      </template>
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
  
import Validation from '@/assets/validation';
import Servicies from '@/services/Servicies';
import MealPlanForm from '@/components/forms/MealPlanForm.vue'
  export default{
    components:{
      DataTable,
      MealPlanForm,
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
            this.postPlan()
            
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          //this.data.splice(this.store.position, 1, newObject)
          this.patchPlan(newObject)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        this.deletePlan(newObject)
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
            
            this.store.errorPlan_type = v.validRequiered(object.plan_type)
            this.store.errorPlan_cost = v.validRequiered(object.plan_cost)
            this.allData.map(element => {
              if(this.edit.plan_type === element.plan_type){
                alert('La temporada ya existe');
                this.exists = true;
              } else{
                this.exists = false;
              }
            });
            console.log(this.store.errorPlan_type) 
            console.log(this.store.errorPlan_cost)
            console.log(this.exists)
            if(this.store.errorPlan_type === '' &&  this.store.errorPlan_cost === '' && this.exists === false){
              ok = true;
            }
            console.log(ok)
            return ok; 
          },
          resetErrors(){
            this.store.errorPlan_type = ''
            this.store.errorPlan_cost = ''
          },
          getPlan: async function(){
            try {
              const getPlan = new Servicies();
              this.allData = await getPlan.get('http://localhost:3080/meal_plans');
              this.data = this.allData.map(element => {
            return {
              
              "id": element.id_plan,
              "plan_type": element.plan_type,
              "plan_cost": element.plan_cost
              
                
            }
           });
            } catch (error) {
            console.error("Error fetching users:", error);
           }
          },
          postPlan: async function(){
            const postSeasons = new Servicies();
            const plan = {
              "plan_type": this.edit.plan_type,
              "plan_cost": this.edit.plan_cost
            }
            console.log(plan);
            await postSeasons.post(plan, 'http://localhost:3080/meal_plans');
            this.getPlan()
          },
          patchPlan: async function(data){
            const patchSeasons = new Servicies();
          const user = {
            "plan_type": data.plan_type,
            "plan_cost": data.plan_cost
            }
            await patchSeasons.patch(user,'http://localhost:3080/meal_plans/', data.id)
           this.getPlan()
          },
          deletePlan: async function(data){
            const deletePlan = new Servicies();
            
           await deletePlan.delete('http://localhost:3080/meal_plans/',data.id)
           this.getPlan()
          }
    },
    mounted(){
      this.getPlan()
    },
  }
  </script>