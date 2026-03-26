import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useCartStore } from "./cartStore";
import {createOrderRequest, getOrdersRequest} from "@/utils/api/order";

export const useOrderStore = defineStore('order', () => {
    const orders = ref([]);
    const cartStore = useCartStore();

    async function getOrders() {
        try {
            const response = await getOrdersRequest();
            orders.value = response.data;
        } catch (error) {
            throw error;
        }
    }

    async function createOrder() {
        try {
            const response = await createOrderRequest();
            cartStore.clearCart();
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return { orders, getOrders, createOrder };
});
