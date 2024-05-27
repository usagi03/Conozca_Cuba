import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth';
// eslint-disable-next-line no-unused-vars
export default class AuthService {

    constructor(){
         this.jwt = ref('')
         this.error = ref('')
    }

    getJwt(){
        return this.jwt;
    }

    async login(username, password){
        try{
           const res = await fetch('http://localhost:3080/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
           })
           console.log(username)
           console.log(password)
           const store = useAuthStore();
           const response = await res.json();
           console.log(response)
           if(response.message === 'username is wrong' || response.message === 'password is wrong'){
            this.error = 'Login Failed'
            return false;
           } else {
            this.jwt = response;
            store.token = response.token;
            store.username = response.username;
            store.role = response.rol;
            console.log(store.token)
            return true
           }
        } catch(error){
            console.log(error)
        }
    }
}