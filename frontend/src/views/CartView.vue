<template>
  <div> 
    <v-container class="py-2" fluid>      
      <section id="shoppingcartview" class="pa-6 ">
      <ShoppingCartView />
      </section>      
      <!-- <section id="maispedidos" class="pa-6">
        <h2 class="text-h4 font-weight-bold text-center mb-8 text-primary ">Mais Pedidos da semana</h2>
        <MostFamousCoffees />
      </section>  -->     
    </v-container>
  </div>
</template>

<script setup>
import ShoppingCartView from '../components/home/ShoppingCartView.vue';
//import MostFamousCoffees from '../components/home/MostFamousCoffees.vue';
</script>
<style>

</style>