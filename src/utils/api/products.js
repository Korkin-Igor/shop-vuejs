import api from "@/utils/axios";

export const getProductsRequest = async () => {
    try {
        const response = await api.get('products')
        return response?.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}