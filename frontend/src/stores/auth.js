
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
 state: () => ({
    token: '',
    usernameError: false,
    passwordError: false,
    role: '',
    username: '',
 }),

 getters: {
    
 },

 actions: {
    isActive(){
      this.isAuth = true;
    }
 }

})
