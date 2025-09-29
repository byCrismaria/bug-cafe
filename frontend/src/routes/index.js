import { createRouter, createWebHistory } from 'vue-router';
// Importa todas as VIEWS (páginas) usando o alias '@/views/'
import HomeView from '../views/HomeView.vue'; 
import MonteSeuCafeView from '../views/MonteSeuCafeView.vue'; 
import CartView from '../views/CartView.vue';
import AuthView from '../views/AuthView.vue';    // Nova página de Login/Cadastro

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
      component: CartView // URL: /carrinho
    },
    {
      path: '/login-cadastro',
      name: 'auth',
      component: AuthView // URL: /login-cadastro
    }
  ]
});

export default router;
