import axios from 'axios'

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000, // Ошибка, если сервер не ответил за 5 сек
    headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

export default api