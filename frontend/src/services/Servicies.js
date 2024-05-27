//import { useAuthStore } from '@/stores/auth';
// eslint-disable-next-line no-unused-vars
export default class Servicies {

    async get(URL){
        try{
           const res = await fetch(URL)
           const response = await res.json();
           const data = []
           response.map(element => {
            const user = {
              "user_name": element.user_name,
            "user_password": element.user_password,
            "nombre_role": element.role.name_role    
            }
              data.push(user)
           });
           console.log(data)
           return data;
        } catch(error){
            console.log(error)
        }
    }
    async postUser(username, password, rol){
        try{
           const res = await fetch('http://localhost:3080/auth/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: username,
                user_password: password,
                role: rol
            })
           })
           
           const response = await res.json();
           console.log(response)
           if (!response.ok) {
            throw new Error(`HTTP error status: ${response.status}`);
          }
        } catch(error){
            console.log(error)
        }
    }
}