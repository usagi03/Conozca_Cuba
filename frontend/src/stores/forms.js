
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
      vehicle:{
        errorPlate: '',
        errorBrand: '',
        errorLuggage_capacity: '',
        errorWith_luggage_capacity: '',
        errorTotal_capacity: '',
        errorYear_build: ''
      },
      mealplan:{
        errorPlan_type: '',
        errorPlan_cost: ''
      },
      contracts:{
        errorStart_contract: '',
        errorEnd_contract: '',
        errorResolution_contract: '',
        errorDescription_contract: '',
        errorTransportation: '',
        errorAcommodation: '',
        errorActivity: ''
      },
      activities:{
        errorType_activity: '',
        errorDay_activity: '',
        errorTime_activity: '',
        erroCost_activity: '',
        errorProvince_activity: '',
        errorDescription_activity: '',
        errorSurcharge_activity: ''
      },
      km:{
        
        errorDescription_km: '',
        errorKm_cost: '',
        errorFull_ride_km_cost: '',
        errorWaiting_hours_cost: ''
      },
      km_h:{
        errorDescription_tm: '',
        errorRoute_km_cost: '',
        errorHours_cost: '',
        errorExtra_km_cost: '',
        errorExtras_hours_cost: ''
      },
      route:{
        errorDescription_tm: '',
        errorDescription_route: '',
        errorRoute_cost: 0,
        errorFull_ride_cost: 0
      },
      housing:{
        erroRoom: '',
        errorSeason: '',
        errorHotel: ''
      },
      packages:{
        errorPromotional_name: '',
        errorDays_count: '',
        errorNights_count: '',
        errorPax_count: '',
        errorHotel_airport_ride_cost: '',
        errorPercent_profit: '',
        errorContract: ''
      },

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
