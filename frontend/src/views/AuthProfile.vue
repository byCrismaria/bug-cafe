<template>
  <v-app>
    <HeroBanner />    
    <v-container class="py-12">      
      <v-row>
        <v-col cols="12" class="pa-6">
          <Profile />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script setup>
import HeroBanner from '../components/home/HeroBanner.vue';
import Profile from '../components/auth/Profile.vue';

</script>

<style>
/* Estilos globais - coloque no seu arquivo principal de CSS */
body {
  font-family: 'Inter', sans-serif;
  color: #4A3F35; 
}
</style>