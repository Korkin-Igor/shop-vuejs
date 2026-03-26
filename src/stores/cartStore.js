import {defineStore} from "pinia";
import {ref} from "vue";
import {getCartRequest} from "@/utils/api/cart";
import api from "@/utils/axios";

export const useCartStore = defineStore('cart', () => {
    const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);

    async function getCart() {
        try {
            const response = await getCartRequest()
            cart.value = response?.data || [];
            localStorage.setItem('cart', JSON.stringify(cart.value))
            return cart.value; // Добавили возврат данных
        } catch (error) {
            cart.value = [];
            localStorage.removeItem('cart');
            throw error;
        }
    }

    async function addItem(productId) {
        try {
            await api.post(`cart/${productId}`)
            await getCart()
        } catch (error) {
            throw error;
        }
    }

    async function removeItem(productId) {
        try {
            await api.delete(`cart/${productId}`)
            await getCart()
        } catch (error) {
            console.error("Ошибка удаления:", error)
        }
    }

    function clearCart() {
        cart.value = []
        localStorage.removeItem('cart')
    }

    return {
        cart,
        getCart,
        addItem,
        removeItem,
        clearCart,
    }
})
