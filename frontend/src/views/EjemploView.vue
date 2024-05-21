<template>
  <div>
   <h1 class="header">Ejemplo de Pantalla</h1> 
  </div>
  
  <!--Componente de la tabla
  :data = se le pasa un arreglo donde se cnuentra o debe encontrar la data mostrar
  :headers = son los encabezados de la tabla
  las demas funciones copialas y pegalas originalmente que son 
  para capturar información entre componentes
  -->
  <DataTable 
  :data="data" 
  :headers="headers" 
  @add-new-object="addNewObject" 
  @confirm="deleteElement"
  @valueEdit="obtenerEdit"
  >
  <!-- Aqui es donde va el componente, igual las funciones 
    y eventos que tiene los copias exactamente igual y 
    copia tambien los methods que le corresponden-->
  <template #formComponent>
    <EjemploForm @value="obtener" :editObject="edit"/>
  </template>
      
   
  </DataTable>
</template>
<script>
import DataTable from '@/components/DataTable.vue';
import { useFormsStore } from '@/stores/forms';
import EjemploForm from '@/components/forms/EjemploForm.vue';
export default{
  components:{
    DataTable,
    EjemploForm
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
      headers: ['Nombre', 'Apellidos', 'Edad', 'Teléfono'],
      data: [ //este arreglo originalmente debe estar vacio, que es donde se captura los GET de las tablas.
          {'name': 'Julio', 'lastname': 'Martinez', 'age': 18, 'phone': '76900831' },
          {'name': 'Camila', 'lastname': 'Martin', 'age': 22, 'phone': '76904831' }
      ],
    }
  },
  methods:{
    addNewObject(newObject){
      console.log(newObject)
      if(this.store.position === -1){
        this.data.push(this.edit);
      } else {
        console.log(newObject)
        this.data.splice(this.store.position, 1, newObject)
        this.store.isUpdate(-1);
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
    },
    obtener(newObject){
      this.edit = newObject;
    }
  },
}
</script>
