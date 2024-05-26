
import { defineStore } from 'pinia'

export const useFormsStore = defineStore('auth', {
 state: () => ({
    position: -1,
    lang: 'es'
 }),

 getters: {
    
 },

 actions: {
    isUpdate(index){
      this.position = index;
    },
    setLocale(l){
      this.lang = l;
    }
 }

})
