import {useAuthStore} from "@/stores/authStore";

const isNotAuthenticated = () => {
    const auth = useAuthStore()
    if (!auth.isAuthenticated) return true
    return '/'
}

export const isAuthenticated = () => {
    const auth = useAuthStore()
    if (auth.isAuthenticated) return true
    return '/login'
}

export const authRoutes = [
    {
        path: '/login',
        name: 'login',
        // Ленивая загрузка: компонент подгрузится только при переходе
        component: () => import('../../views/Auth/Login.vue'),
        beforeEnter: isNotAuthenticated
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../../views/Auth/Register.vue'),
        beforeEnter: isNotAuthenticated
    },
]
