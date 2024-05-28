
import { defineStore } from 'pinia'

export const useFormsStore = defineStore('forms', {
 state: () => ({
    position: -1,
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
      errorDate: '',
      errorPhone: '',
      errorFax: '',
      errorCity: '',
      errorAirport: '',
      errorEmail: '',
      errorFloor: '',
      errorBusiness: '',
      errorLocation: '' 
    },
    seasons:{
      errorName_season: '',
      errorStart_season: '',
      errorEnd_season: '',
      errorDescription: ''
      },
      km:{
        errorPlate: '',
        errorBrand: '',
        errorLuggage_capacity: '',
        errorWith_luggage_capacity: '',
        errorTotal_capacity: '',
        errorYear_build: ''
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
