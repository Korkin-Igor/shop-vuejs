import api from "@/utils/axios";

export const loginRequest = async (userData) => {
    try {
        const { data } = await api.post('/login', userData);
        return data?.data?.user_token;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

export const registerRequest = async (userData) => {
    try {
        const { data } = await api.post('/signup', userData);
        return data?.data?.user_token
    } catch (error) {
        console.log(error)
        return error;
    }
}