<template>
  <v-app :style="{ background: '#F9F6F2' }">
    <AppHeader />
    <v-main>
      <router-view />
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from './components/common/AppHeader.vue';
import AppFooter from './components/common/AppFooter.vue';
</script>

<style>

body {
  font-family: 'Inter', sans-serif;
  color: #4A3F35; 
}
</style>