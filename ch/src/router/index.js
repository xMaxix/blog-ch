// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/h.vue'),
      },
      {
        path: 'login',
        name: 'Log In',
        component: () =>import('@/views/LogIn.vue')
      },
      {
        path: 'signup',
        name: 'Sign Up',
        component: () =>import('@/views/SignUp.vue')
      },
      {
        path: 'howto',
        name: 'Tutorial',
        component: () => import('@/views/Home.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
