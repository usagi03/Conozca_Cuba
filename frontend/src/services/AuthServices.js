import { ref } from 'vue'
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

           const response = await res.json()

           if('error' in response){
            this.error = 'Login Failed'
            return false;
           } else {
            this.jwt = response.data.access_token
            return true
           }
        } catch(error){
            console.log(error)
        }
    }
}