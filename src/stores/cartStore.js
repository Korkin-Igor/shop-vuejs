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
        } catch (error) {
            cart.value = [];
            localStorage.removeItem('cart');
            throw error;
        }
    }

    async function addItem(productId) {
        try {
            const response = await api.post(`cart/${productId}`)
            cart.value = await getCart()
            localStorage.setItem('cart', JSON.stringify(cart.value))
        } catch (error) {
            throw error;
        }
    }

    async function removeItem() {
        try {
            cart.value = cart.value.filter(item => item.id !== productId);
        } catch (error) {

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