
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
 state: () => ({
    token: '',
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
