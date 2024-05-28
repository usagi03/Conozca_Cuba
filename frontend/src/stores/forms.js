
import { defineStore } from 'pinia'

export const useFormsStore = defineStore('forms', {
 state: () => ({
    position: -1,
    lang: 'es',
    user:{
      errorUser: '',
      errorPass: '',
      errorRol: '',
    },
    rooms:{
      errorNumber:'',
      errorType: '',
      errorCost: '',
      errorMeal: '',
      errorPlus: ''
    },
    hotels:{
      errorNameH: '',
      errorChain: '',
      errorCategory: '',
      errorAddress: '',
      errorProvince: '',
    }
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
