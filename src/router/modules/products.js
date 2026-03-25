import { isAuthenticated } from './auth'
export const cartRoutes = [
    {
        'path': '/products',
        'name': 'products',
        component: () => import('../../views/Products/Catalog.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('../../views/Products/Cart.vue'),
        beforeEnter: isAuthenticated
    },
    {
        path: '/order',
        name: 'order',
        component: () => import('../../views/Products/Order.vue'),
        beforeEnter: isAuthenticated
    }
]