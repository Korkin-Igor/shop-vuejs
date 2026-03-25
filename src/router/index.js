import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes, ifAuthenticated } from './modules/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    {
      'path': '/products',
      'name': 'products',
      component: () => import('../views/Products/Catalog.vue')
    }
  ]
})

export default router
