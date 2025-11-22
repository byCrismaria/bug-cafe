<template>
  <v-app :style="{ background: '#F9F6F2' }">
    <AppHeader :cartCount="cartState.items.length" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from './components/common/AppHeader.vue';
import AppFooter from './components/common/AppFooter.vue';
import { useCart } from './composables/useCart.js';

const { cartState, loadCart } = useCart();
onMounted(loadCart);
</script>

<style>

body {
  font-family: 'Inter', sans-serif;
  color: #4A3F35; 
}
</style>