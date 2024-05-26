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
           const res = await fetch('https://fakestoreapi.com/users', {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
           })
           const store = useAuthStore();
           const response = await res.text();

           if(response === 'username or password is incorrect'){
            this.error = 'Login Failed'
            return false;
           } else {
            this.jwt = response;
            store.token = response;
            return true
           }
        } catch(error){
            console.log(error)
        }
    }
}