<template>
<div class="grid mt-2 mr-4  gap-4  grid-cols-3 grid-row-2">
                    <div class="">
                       <label class="label">Nombre</label>
                       <input type="text" class="input-text-password-email"/> 
                    </div>
                    <div class="">
                      <label class="label">Escoge el formato</label>
                      <select class="select tracking-wide" >
                        <option value="excel" class=""> <span >Excel</span></option>
                        <option value="pdf">PDF</option>
                      </select>  
                    </div>
                    <div class="col-span-3" hidden>
                        <label class="label">Escoja la ruta</label>
                        <input type="text" class="input-text-password-email"/>
                    </div> 
</div>

</template>
<script>
 export default {
      data(){
       return{
         
        }
      },
      methods:{
          
      },
 }
</script>