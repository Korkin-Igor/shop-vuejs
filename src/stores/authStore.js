import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {loginRequest} from "@/utils/api";

export const useAuthStore = defineStore('auth', () => {
    // --- State ---
    const token = ref(localStorage.getItem('myAppToken') || '');

    // --- Getters ---
    const isAuthenticated = computed(() => !!token.value);

    // --- Actions ---
    async function login(userData) {
        try {
            // Предполагаем, что loginRequest возвращает Promise с токеном
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

    function logout() {
        token.value = '';
        localStorage.removeItem('token');
    }

    return { token, isAuthenticated, login, logout };
});
