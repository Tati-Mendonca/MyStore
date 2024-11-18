import axios from 'axios'

const api = axios.create({
  baseURL: 'https://newstore-3btz.onrender.com',
})

export default api
