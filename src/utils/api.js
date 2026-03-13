const API = import.meta.env.VITE_APP_API;

export const loginRequest = async (user) => {
    try {
        const response = await fetch(`${API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        });

        if (!response.ok) {
            throw new Error('Ошибка авторизации');
        }

        const result = await response.json();

        return result.data.user_token;

    } catch (error) {
        // Ошибка пробросится в стор автоматически
        console.error("API Error:", error);
        throw error;
    }
};