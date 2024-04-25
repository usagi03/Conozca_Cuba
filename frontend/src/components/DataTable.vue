<template>
    
<div class="relative overflow-x-auto sm:rounded-b-xl">
    <div class="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative mt-1">
            <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon/>
            </div>
            <input type="text" id="table-search" class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for items">
        </div>
        <div class="relative" >
            <button  class="inline-flex items-center text-gray-500 bg-white border border-green-300 focus:outline-none hover:bg-green-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 " 
            type="button"> 
            <AddIcon/>
            Añadir nuevo</button>
        </div>
    </div>
    <div class="relative overflow-x-auto border sm:rounded-xl shadow-md">
    <table class="w-full text-sm text-left  rtl:text-right  text-gray-500">
        <thead class="text-xs text-white uppercase bg-indigo-500">
            <tr>
                <th scope="col" class="px-6 py-3" v-for="head in headers" :key="head">{{ head }}</th>
                <th scope="col" class="px-6 py-3"></th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b  hover:bg-indigo-100" v-for="items in data" :key="items">
                <td v-for="item in items" :key="item" class="px-6 py-4">
                    {{ item }}
                </td>
                <td class="px-6 py-4">
                    <div class="relative flex">
                        <div class="px-3">
                           <EditIcon/>  
                        </div>
                        <div>
                           <DeleteIcon/> 
                        </div>
                      
                        
                    </div>
                </td>
            </tr>
            
        </tbody>
    </table>
    </div>
    
</div>

</template>
<script>
import AddIcon from './icons/AddIcon.vue';
import SearchIcon from '@/components/icons/SearchIcon.vue';
import EditIcon from './icons/EditIcon.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
    export default {
        components:{
        SearchIcon,
        AddIcon,
        EditIcon,
        DeleteIcon,
        },
        props:{
            headers: Array,
            data: Array,
        },
        data(){
            return{
                
            }
        }
    }
</script>