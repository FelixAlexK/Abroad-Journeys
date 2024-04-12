import axios from 'axios'

export const http = axios.create({
  baseURL: 'http://localhost:8080/api/v1'
})

export const login = async (email: string, password: string) => {
  return await http.post('/auth/login', {
    email: email,
    password: password
  })
}
