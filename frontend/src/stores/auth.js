
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
 state: () => ({
    token: '',
    usernameError: false,
    passwordError: false,
    role: '',
 }),

 getters: {
    
 },

 actions: {
    isActive(){
      this.isAuth = true;
    }
 }

})
