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

export const addItemRequest = async (productId) => {
    try {
        const response = await api.post(`cart/${productId}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const removeItemRequest = async (productId) => {
    try {
        const response = await api.delete(`cart/${productId}`)
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
