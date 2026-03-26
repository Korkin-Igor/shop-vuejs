import api from "@/utils/axios";

export const getOrdersRequest = async () => {
    try {
        const response = await api.get('order');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createOrderRequest = async () => {
    try {
        const response = await api.post('order');
        return response.data;
    } catch (error) {
        throw error;
    }
};
