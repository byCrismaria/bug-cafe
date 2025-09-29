<template>
  <div> 
    <v-container class="py-6" fluid>      
      <section id="buildcoffee" class="pa-2 ">
         <div class="mb-10 text-center">
            <h1 class="text-h3 font-weight-bold mb-2 text-primary">Monte Seu Café </h1>
            <p class="text-h6 text-grey-darken-1">Crie a bebida perfeita, do seu jeito.</p>
        </div>
        <BuildCoffees />
      </section>      
      <section id="maispedidos" class="pa-6">
        <h2 class="text-h4 font-weight-bold text-center mb-8 text-primary ">Mais Pedidos da semana</h2>
        <MostFamousCoffees />
      </section>      
    </v-container>
  </div>
</template>

<script setup>
import BuildCoffees from '../components/home/BuildCoffees.vue';

//import ClassicCoffeesCarousel from '../components/home/ClassicCoffeesCarousel.vue';
import MostFamousCoffees from '../components/home/MostFamousCoffees.vue';

</script>
<style>

body {
  font-family: 'Inter', sans-serif;
  color: #4A3F35; 
}

</style>