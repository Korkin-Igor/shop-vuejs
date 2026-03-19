import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {loginRequest, registerRequest} from "@/utils/api";

export const useAuthStore = defineStore('auth', () => {
    // --- State ---
    const token = ref(localStorage.getItem('myAppToken') || '');

    // --- Getters ---
    const isAuthenticated = computed(() => !!token.value);

    // --- Actions ---
    async function login(userData) {
        try {
            const receivedToken = await loginRequest(userData);
            token.value = receivedToken;
            localStorage.setItem('token', receivedToken);

            return receivedToken;
        } catch (error) {
            token.value = '';
            localStorage.removeItem('token');
            throw error; // Пробрасываем ошибку дальше для обработки в UI
        }
    }

    async function register(userData) {
        try {
            const receivedToken = await registerRequest(userData)
            token.value = receivedToken;
            localStorage.setItem('token', receivedToken);
            return receivedToken;
        } catch (error) {
            token.value = '';
            localStorage.removeItem('token');
            throw error;
        }
    }

    function logout() {
        token.value = '';
        localStorage.removeItem('token');
    }

    return {
        token,
        isAuthenticated,
        login,
        register,
        logout
    };
});
