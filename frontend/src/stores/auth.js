import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    usernameError: false,
    passwordError: false,
    role: '',
    username: ''
  }),
  persist: {
    storage: sessionStorage,
    paths: ['token','role','username']
  },
  getters: {},

  actions: {
    isActive() {
      this.isAuth = true
    },
   clearToken(){
    this.token = '';
   }
    }
})
