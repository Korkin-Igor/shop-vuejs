import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './modules/auth'
import { cartRoutes } from './modules/products'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    {
      'path': '/products',
      'name': 'products',
      component: () => import('../views/Products/Catalog.vue')
    },
    ...cartRoutes,
  ]
})

export default router
