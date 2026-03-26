import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {loginRequest, registerRequest} from "@/utils/api";
import {useCartStore} from "@/stores/cartStore";

export const useAuthStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('token') || '');
    const isAuthenticated = computed(() => !!token.value);

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
        const cartStore = useCartStore()
        cartStore.clearCart()

        token.value = '';
        localStorage.removeItem('token');
    }

    return {
        token,
        isAuthenticated,
        login,
        register,
        logout,
    };
});
