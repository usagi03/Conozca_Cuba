<template>
  <DataTable :data="data" :headers="headers"/>
</template>
<script>
import DataTable from '@/components/DataTable.vue';
export default{
  components:{
    DataTable,
  },
  data(){
    return{
      headers: ['Nombre', 'Apellidos', 'Edad', 'Teléfono'],
      data: [
          {'Nombre': 'Julio', 'Apellidos': 'Martinez', 'Edad': 18, 'Telefono': '76900831' },
          {'Nombre': 'Camila', 'Apellidos': 'Martin', 'Edad': 22, 'Telefono': '76904831' }
      ],

    }
  }
}
</script>
