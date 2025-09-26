<template>
  <v-app :style="{ background: '#F9F6F2' }">
    <AppHeader />
    
    <v-main>
      <HeroBanner />
      
      <v-container class="py-12">
        
        <section id="classicos" class="pa-6">
          <h2 class="text-h4 font-weight-bold text-center mb-8 text-primary">Nossos Clássicos</h2>
          <ClassicCoffeesCarousel />
        </section>
        
        <section id="maispedidos" class="pa-6">
          <h2 class="text-h4 font-weight-bold text-center mb-8 text-primary ">Mais Pedidos da semana</h2>
          <MostFamousCoffees />
        </section>
        
      </v-container>
      
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script setup>
import AppHeader from './components/common/AppHeader.vue';
import HeroBanner from './components/home/HeroBanner.vue';
import ClassicCoffeesCarousel from './components/home/ClassicCoffeesCarousel.vue';
import MostFamousCoffees from './components/home/MostFamousCoffees.vue';
import AppFooter from './components/common/AppFooter.vue';


</script>

<style>
/* Estilos globais se necessário */

body {
  font-family: 'Inter', sans-serif;
  color: #4A3F35; 
}

</style>