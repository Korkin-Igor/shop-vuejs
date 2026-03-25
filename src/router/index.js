import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './modules/auth'
import {productsRoutes} from './modules/products'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
    {
      'path': '/',
      'name': 'main',
      redirect: { name: 'products' }
    },
    ...productsRoutes,
  ]
})

export default router
