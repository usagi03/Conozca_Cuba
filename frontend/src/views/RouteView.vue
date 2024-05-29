<template>
    <div>
     <h1 class="header">{{this.$t('route.title')}}</h1> 
    </div>
    
    <DataTable 
    :data="data" :showModal="showModal" @openModal="openModal"
    :headers="[this.$t('route.table.description'), this.$t('route.table.description_route'), this.$t('route.table.route_cost'),this.$t('route.table.idayvuelta_cost'),]" 
    @add-new-object="addNewObject" 
    @confirm="deleteElement"
    @valueEdit="obtenerEdit"
    @closeAddEdit="close"
    >
    <template #formComponent>
      <RutaForm @value="obtener" :editObject="edit"/>
    </template>
        
     
    </DataTable>
  </template>
  <script>
  import DataTable from '@/components/DataTable.vue';
  import { useFormsStore } from '@/stores/forms';
import RutaForm from '@/components/forms/rutaForm.vue';
import Servicies from '@/services/Servicies';
import Validation from '@/assets/validation';
  export default{
    components:{
    DataTable,
    RutaForm
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
        //headers: ['Descripción', 'Descripción del recorrido', 'Costo por recorrido', 'Costo por ida y vuelta'],
        data: [],
        showModal: false
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
            this.postRoute()
            this.data.push(this.edit);
          this.showModal = false;
          this.active = false;
        } else {
          console.log(newObject)
          this.data.splice(this.store.position, 1, newObject)
          this.patchRoute(newObject, this.store.position)
          this.showModal = false;
          this.store.isUpdate(-1);
        } 
      }
      },
      deleteElement(newObject){
        console.log(newObject)
        const index = this.data.indexOf(newObject);
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
          postRoute: async function(){
            const postRoute = new Servicies();
            const plan = {
              "plan_type": this.edit.plan_type,
              "plan_cost": this.edit.plan_cost
            }
            console.log(plan);
            postRoute.post(plan, 'http://localhost:3080/meal_plans');
          },
          patchRoute: async function(data, index){
            const patchRoute = new Servicies();
            const res = await patchRoute.get('http://localhost:3080/meal_plans');
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
            patchRoute.patch(user,'http://localhost:3080/meal_plans/', id)
          },
          deleteRoute: async function(data){
            const deleteRoute = new Servicies();
            const res = await deleteRoute.get('http://localhost:3080/meal_plans');
            let id = '';
            res.map(element => {
              if(element.name_hotel === data.name_hotel) {
                id = element.id_hotel;
              }
           });
           deleteRoute.delete('http://localhost:3080/meal_plans/',id)
          }
    },
    mounted(){
      this.getPlan()
    },
  }
  </script>
  