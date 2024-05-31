<template>
    
<div class="relative overflow-x-auto sm:rounded-b-xl">
    <div class="px-1 py-1 flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label for="table-search" class="sr-only">{{ $t('data_table.search') }}</label>
         
        <div class="relative mt-1">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon/>
            </div>
            <input type="text" v-model="searchQuery" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" :placeholder="$t('data_table.search')">
        </div>
        <div v-if="permisions()" class="relative" >
            <button @click="openModalAdd" class="w-full inline-flex items-center text-white bg-green-600 border border-transparent shadow-sm focus:outline-none hover:bg-green-700 font-medium rounded-md text-base px-3 py-1.5 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm " 
            type="button"> 
            <AddIcon/>
            {{ $t('data_table.addNew') }}
          </button>
          
        </div>
    </div>
    <div class="relative overflow-x-auto max-h-100 border sm:rounded-xl shadow-md">
    <table class="w-full text-sm text-left overflow-y-auto rtl:text-right text-gray-500 ">
        <thead class="text-xs text-white uppercase bg-indigo-500">
            <tr>
                <th scope="col" class="px-6 py-3" v-for="head in headers" :key="head">{{ head }}</th>
                <th scope="col" class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b  hover:bg-indigo-100" v-for="(items, index) in filteredData" :key="items">
              <template v-for="(item, key) in items" :key="key">
                <td  v-if="!key.startsWith('id', 0)" class="px-6 py-4">
                    {{ item }}
                </td>
              </template>  
                
                <td class="px-6 py-4" v-if="permisions()">
                    <div class="relative flex">
                        <div class="px-3">
                           <EditIcon @click="editObject(index)"/>  
                        </div>
                        <div>
                           <DeleteIcon @click="openConfirm(index)"/> 
                        </div>  
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
    </div>


<!-- Modal -->
<div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" @click.self="preventClose" aria-modal="true">
 <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeAddEdit"></div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              {{msg}} 
            </h3>
            <div class="mt-2">
              <slot name="formComponent"></slot>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button @click="closeAddEdit" type="button" class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
          {{ $t('modals.cancel') }}
        </button>
        <button @click="addNewObject" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
          {{ $t('modals.save') }}
        </button>
      </div>
    </div>
 </div>
</div>
<ConfirmDelete :isOpen="showConfirmDelete" @confirm="confirmDelete" @close="closeConfirm"/>
<ExportModal :isOpen="exportModal" @export="exportData" @close="exportModal = false"/>    
</div>

</template>
<script>
import AddIcon from './icons/AddIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import EditIcon from './icons/EditIcon.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import {useFormsStore} from '@/stores/forms.js';
import ConfirmDelete from '@/components/ConfirmDelete.vue';

import ExportModal from './ExportModal.vue';
import { useAuthStore } from '@/stores/auth';

    export default {
        components:{
    SearchIcon,
    AddIcon,
    EditIcon,
    DeleteIcon,
    ConfirmDelete,
    ExportModal
},
        setup(){
       const store = useFormsStore();
       const user = useAuthStore()
       return{
         store,
         user
        }
      },
        props:{
            headers: Array,
            data: Array,
            showModal: Boolean,
        },
        data(){
            return{
                searchQuery: '',
                showConfirmDelete: false,
                newObject: {},
                msg: '',
                exportModal: false,
            }
        },
        computed:{
            filteredData() {
              return !this.searchQuery ? this.data : this.data.filter(item => 
              Object.values(item).some(value => value.toString().toLowerCase().includes(this.searchQuery.toLowerCase()))
             );
            },
        },
        methods:{
          openModalAdd(){
            this.$emit('openModal')
            this.msg = 'Añadir'
          },
            addNewObject() {
             this.$emit('add-new-object', this.newObject);
           },
           editObject(item){
            this.store.isUpdate(item);
            console.log(item);
            console.log(this.data[this.store.position]);
            this.newObject = Object.assign({}, this.data[this.store.position]);
            this.$emit('valueEdit', this.newObject);
            this.msg = 'Modifica'
           },
           openConfirm(index){
            this.showConfirmDelete = true;
            this.newObject = this.data[index];
            console.log(this.newObject);
           },
           confirmDelete(){
            this.$emit('confirm', this.newObject)
            this.showConfirmDelete = false;
           },
           closeConfirm(){
            this.showConfirmDelete = false;
           },
           closeAddEdit(){
            this.$emit('closeAddEdit')
            if(this.store.position != -1){
              this.store.isUpdate(-1);  
            }
           },
           obtener(newObject){
           console.log(newObject)
           this.newObject = newObject;
           console.log(this.newObject)
          },
          permisions(){
            let ok = false;
            if (this.user.role === 'Administrador'){
              ok=true
            } else if(this.user.role === 'Agente de ventas'){
              if(this.$route.name === 'paquetes' 
            || this.$route.name === 'contratos'){
              ok = true;
            } 
            }
           
            
            
            
            return ok;
          }
        }
    }
</script>