import api from "@/utils/axios";

export const getCartRequest = async () => {
    try {
        const response = await api.get('cart')
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}