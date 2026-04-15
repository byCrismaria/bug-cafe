<template>
  <div>
    <HeroBanner />    
    <v-container class="py-12">      
      <v-row>
        <v-col cols="12" class="pa-6">
          <LoginRegistration />
        </v-col>
        <v-col cols="12" class="pa-6">
          <h2 class="text-h4 font-weight-bold text-center mb-8 text-primary">
            Mais Pedidos da semana
          </h2>
          <MostFamousCoffees />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import HeroBanner from '../components/home/HeroBanner.vue';
import LoginRegistration from '../components/auth/LoginRegistration.vue';
import MostFamousCoffees from '../components/home/MostFamousCoffees.vue';
</script>

<style scoped>
</style>