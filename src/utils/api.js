import api from "@/utils/axios";

export const loginRequest = async (user) => {
    try {
        const { data } = await api.post('/login', user);
        return data.data.user_token;

    } catch (error) {
        // Ошибка пробросится в стор автоматически
        console.error("API Error:", error);
        throw error;
    }
};