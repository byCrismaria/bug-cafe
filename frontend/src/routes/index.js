import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import MonteSeuCafeView from '../views/MonteSeuCafeView.vue';
import CartView from '../views/CartView.vue';
import AuthView from '../views/AuthView.vue';
import AuthProfile from '../views/AuthProfile.vue';
import AboutView from '../views/AboutView.vue';
import TermsOfServiceView from '../views/TermsOfServiceView.vue';
import ContactView from '../views/ContactView.vue';
import ResetPasswordView from '../views/ResetPasswordView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/monte-seu-cafe',
      name: 'build-coffee',
      component: MonteSeuCafeView
    },
    {
      path: '/carrinho',
      name: 'cart',
      component: CartView
    },
    {
      path: '/login-cadastro',
      name: 'auth',
      component: AuthView
    },
    {
      path: '/profile',
      name: 'Profile',
      component: AuthProfile,
      meta: { 
        requiresAuth: true 
      }
    },
    {
      path: '/about',
      name: 'About',
      component: AboutView
    },
    {
      path: '/terms',
      name: 'TermsOfService',
      component: TermsOfServiceView
    },
    {
      path: '/contact',
      name: 'Contact',
      component: ContactView
    },
    {
      path: '/reset-senha',
      name: 'ResetPassword',
      component: ResetPasswordView
    },
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login-cadastro');
  } else {
    next();
  }
});

export default router;
