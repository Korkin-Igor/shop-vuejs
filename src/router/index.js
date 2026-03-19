import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const ifNotAuthenticated = () => {
  const auth = useAuthStore()
  if (!auth.isAuthenticated) return true
  return '/'
}

const ifAuthenticated = () => {
  const auth = useAuthStore()
  if (auth.isAuthenticated) return true
  return '/login'
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      // Ленивая загрузка: компонент подгрузится только при переходе
      component: () => import('../views/Login.vue'),
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    }
  ]
})

export default router
