import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes, ifAuthenticated } from './modules/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...authRoutes,
  ]
})

export default router
