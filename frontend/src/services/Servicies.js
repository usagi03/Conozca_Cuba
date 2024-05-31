import { useAuthStore } from '@/stores/auth'
// eslint-disable-next-line no-unused-vars
export default class Servicies {
  async get(URL) {
    try {
      const res = await fetch(URL)
      const response = await res.json()
      const data = []
      //    response.map(element => {
      //     const user = {
      //       "id_user": element.id_user,
      //       "user_name": element.user_name,
      //       "user_password": element.user_password,
      //       "nombre_role": element.role.name_role
      //     }
      //       data.push(user)
      //    });
      console.log(data)
      return response
    } catch (error) {
      console.log(error)
    }
  }
  async post(data, URL) {
    const auth = useAuthStore()
    try {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        },
        body: JSON.stringify(data)
      })

      const response = await res.json()
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async patch(data, URL, id) {
    const auth = useAuthStore()
    try {
      console.log(id)
      const res = await fetch(URL + id, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        },
        body: JSON.stringify(data)
      })

      const response = await res.json()
      console.log(response)
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`)
      }
    } catch (error) {
      console.log(error)
    }
  }
  async delete(URL, id) {
    const auth = useAuthStore
    try {
      const res = await fetch(URL + id, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + auth.token
        }
      })
      const response = await res.json()
      if (!res.ok) {
        throw new Error(`HTTP error status: ${res.status}`)
      }

      console.log(response)
      return response
    } catch (error) {
      console.log(error)
    }
  }
}
