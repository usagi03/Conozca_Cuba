
import { defineStore } from 'pinia'

export const useFormsStore = defineStore('auth', {
 state: () => ({
    position: -1,
 }),

 getters: {
    
 },

 actions: {
    isUpdate(index){
      this.position = index;
    }
 }

})
