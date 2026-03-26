import axios from 'axios'
import router from "@/router";
import { useAuthStore } from "@/stores/authStore";

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    }
})

// Перехватчик ЗАПРОСОВ (добавляем токен перед отправкой)
api.interceptors.request.use(config => {
    const authStore = useAuthStore(); // Вызываем стор ВНУТРИ функции
    if (authStore.token) {
        config.headers.Authorization = `Bearer ${authStore.token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Перехватчик ОТВЕТОВ
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore(); // И здесь тоже внутри
            authStore.logout();
            router.replace({ name: 'login' });
        }
        return Promise.reject(error);
    }
);

export default api;
