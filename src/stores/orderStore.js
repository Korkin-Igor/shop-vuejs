import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from "@/utils/axios";
import { useCartStore } from "./cartStore";

export const useOrderStore = defineStore('order', () => {
    const orders = ref([]);
    const cartStore = useCartStore();

    async function fetchOrders() {
        try {
            const response = await api.get('order');
            orders.value = response.data.data;
        } catch (error) {
            throw error;
        }
    }

    async function createOrder() {
        try {
            const response = await api.post('order');
            cartStore.clearCart();
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { orders, fetchOrders, createOrder };
});
