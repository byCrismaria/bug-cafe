<template>
  <v-app :style="{ background: '#F9F6F2' }">
    <AppHeader :cartCount="cartState.items.length" />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />

    <!-- Snackbar Global -->
    <v-snackbar v-model="snackbarState.visible" :timeout="3000" :color="snackbarState.color" location="top right" variant="elevated">
      {{ snackbarState.text }}
      <template v-slot:actions>
        <v-btn icon="mdi-close" variant="text" @click="snackbarState.visible = false"></v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue';
import AppHeader from './components/common/AppHeader.vue';
import AppFooter from './components/common/AppFooter.vue';
import { useCart } from './composables/useCart.js';
import { useSnackbar } from './composables/useSnackbar.js';

const { cartState, loadCart } = useCart();
const { snackbarState } = useSnackbar();
onMounted(loadCart);
</script>

<style>

body {
  font-family: 'Inter', sans-serif;
  color: #4A3F35; 
}
</style>