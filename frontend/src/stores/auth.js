
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
 state: () => ({
    isAuth: false,
    usernameError: false,
    passwordError: false,
 }),

 getters: {
    
 },

 actions: {
    isActive(){
      this.isAuth = true;
    }
 }

})
