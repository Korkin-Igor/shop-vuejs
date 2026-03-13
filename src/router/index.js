import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(), // Использует HTML5 History API для чистых URL
  routes: [
    {
      path: '/login',
      name: 'login',
      // Ленивая загрузка: компонент подгрузится только при переходе
      component: () => import('../views/Login.vue')
    }
  ]
})

export default router
