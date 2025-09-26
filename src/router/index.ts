import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from './auth'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    ...authRoutes,

    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/usuarios',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/salas',
      name: 'rooms',
      component: () => import('../views/RoomsView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/reservas',
      name: 'bookings',
      component: () => import('../views/BookingsView.vue'),
      meta: { requiresAuth: true }
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/Error404View.vue'),
    },

  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.initAuth()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
})

export default router
