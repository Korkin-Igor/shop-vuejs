import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getProductsRequest } from "@/utils/api";

export const productsStore = defineStore('products', () => {
    const products = ref(['']);

    async function getProducts(){
        try {
            const receivedProducts = await getProductsRequest();
            products.value = receivedProducts;
            return receivedProducts;
        } catch (error) {
            return error;
        }
    }

    return {
        getProducts
    }
})