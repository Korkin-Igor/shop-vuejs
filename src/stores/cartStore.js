import {defineStore} from "pinia";
import {ref} from "vue";
import {getCartRequest} from "@/utils/api/cart";

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

    async function addItem() {
        try {

        } catch (error) {
            throw error;
        }
    }

    async function removeItem() {

    }

    function clearCart() {
        cart.value = []
        localStorage.removeItem('cart')
    }

    return {
        cart,
        addItem,
        removeItem,
        clearCart,
    }
})