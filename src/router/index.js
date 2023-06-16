import { createRouter, createWebHistory } from 'vue-router'
import { computed } from "@vue/reactivity";
import auth from "../stores/auth";
import Home from '../views/home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/signup.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/about.vue')
    },
    {
      path: '/feature',
      name: 'feature',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/featurePage.vue'),
    },
    {
      path: '/feature/bmicalculator',
      name: 'bmicalculator',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/bmiCal.vue'),
    },
    {
      path: '/feature/bptracker',
      name: 'bptracker',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/bp.vue'),
    },
    {
      path: '/feature/weight-tracker',
      name: 'weight-tracker',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/weightTracker.vue'),
    },
    {
      path: '/feature/workout',
      name: 'workout',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/workout.vue'),
    },
    {
      path: '/:notFound',
      name: 'NotFound',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NotFound.vue'),
    }
  ]
});

router.beforeEach(async (to) => {
  const publicPages = ['/login'];
  const authReq = !publicPages.includes(to.path);
  const linkUrl = auth.state.returnUrl;

  

const user = computed(() => auth.state.user);

  if (authReq && !user){
    
    return '/login'
  }
});

export default router
