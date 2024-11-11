import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PageHome.vue'),
    },
    {
      path: '/service-details/:serviceId',
      name: 'serviceDetails',

      component: () => import('../views/ServiceDetails.vue'),
    },
  ],
})

export default router
