<template>
    <div>
     <h1 class="header">{{this.$t('km/h.title')}}</h1> 
    </div>
    
    <DataTable 
    :data="data" :showModal="showModal" @openModal="openModal"
    :headers="[this.$t('km/h.table.description'), this.$t('km/h.table.recorrido'), this.$t('km/h.table.hours_cos'), this.$t('km/h.table.km_extras'),this.$t('km/h.table.hours_extras')]" 
    @add-new-object="addNewObject" 
    @confirm="deleteElement"
    @valueEdit="obtenerEdit"
    @closeAddEdit="close"
    >
    <template #formComponent>
      <Km_hForm @value="obtener" :editObject="edit"/>
    </template>
        
     
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
import Km_hForm from '@/components/forms/km_hForm.vue';
import Servicies from '@/services/Servicies';
import Validation from '@/assets/validation';
  export default{
    components:{
    DataTable,
    Km_hForm
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
        //headers: ['Descripción', 'Costo del recorrido por km', 'Costo por horas', 'Costo por km extras', 'Costo por horas extra',''],
        data: [],
        showModal: false,
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
            this.postKmH()
            this.data.push(this.edit);
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.data.splice(this.store.position, 1, newObject)
          this.patchKmH(newObject, this.store.position)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        const index = this.data.indexOf(newObject);
        this.deleteKmH(newObject)
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
            
            this.store.errorPlan_type = v.validRequiered(object.plan_type)
            this.store.errorPlan_cost = v.validRequiered(object.plan_cost)

            if(this.store.errorPlan_type === '' &&  this.store.errorPlan_cost === ''){
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
              const res = await getPlan.get('http://localhost:3080/meal_plans');
              console.log(this.data);
              res.map(element => {
            const season = {
              
              
              "plan_type": element.plan_type,
              "plan_cost": element.plan_cost
              
                
            }
              this.data.push(season)
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
            postSeasons.post(plan, 'http://localhost:3080/meal_plans');
          },
          patchPlan: async function(data, index){
            const patchSeasons = new Servicies();
            const res = await patchSeasons.get('http://localhost:3080/meal_plans');
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
            "plan_type": data.plan_type,
            "plan_cost": data.plan_cost
            }
            patchSeasons.patch(user,'http://localhost:3080/meal_plans/', id)
          },
          deletePlan: async function(data){
            const deletePlan = new Servicies();
            const res = await deletePlan.get('http://localhost:3080/meal_plans');
            let id = '';
            res.map(element => {
              if(element.name_hotel === data.name_hotel) {
                id = element.id_hotel;
              }
           });
           deletePlan.delete('http://localhost:3080/meal_plans/',id)
          }
    },
    mounted(){
      this.getPlan()
    },
  }
  </script>
  