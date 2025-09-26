<template>
  <!-- v-app-bar permanece com os estilos de cor, altura e blur -->
  <v-app-bar 
    flat 
    color="white"                 
    height="64" 
    style="backdrop-filter: blur(8px);"  
    class="app-header"           
  >
    <!-- v-container para centralizar o conteúdo e limitar a largura (container mx-auto) -->
    <v-container class="d-flex align-center fill-height pa-0 px-4">
      
      <div class="text-h6 font-weight-bold flex-grow-0 text-grey-darken-4">
        <span class="mr-2">🐞</span> Bug Café
      </div>

      <div class="d-flex align-center d-md-none ms-2">
        </div>

      <div class="d-flex align-center d-md-none ms-2">
        <!-- Botão Carrinho -->
        <v-btn icon variant="text" href="#" class="text-grey-darken-1">
          <v-badge :content="cartCount" color="red" dot floating offset-y="-10" v-if="cartCount > 0">
            <v-icon>mdi-cart</v-icon>
          </v-badge>
          <v-icon v-else>mdi-cart</v-icon>
        </v-btn>

        <!-- Botão Login/Cadastro (Mobile/Small Screens) -->
        <v-btn color="primary" size="small" class="font-weight-medium ms-2 d-sm-none">
          Login
        </v-btn>
        
        <v-btn icon variant="text" class="ms-2">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>

      <!-- Espaçador ÚNICO: Empurra a Navegação para o centro e as Ações Desktop para a direita -->
      <v-spacer></v-spacer> 
      
      <!-- 3. Navegação (Centralizada no Desktop) -->
      <div class="d-none d-md-flex align-center ga-6">
        <!-- GA-6 (gap 24px) simula o space-x-8 do protótipo -->
        <v-btn variant="text" href="#inicio" class="text-subtitle-1 text-grey-darken-1">Início</v-btn>
        <v-btn variant="text" href="#classicos" class="text-subtitle-1 text-grey-darken-1">Nossos Clássicos</v-btn>
        <v-btn variant="text" href="#mais-pedidos" class="text-subtitle-1 text-grey-darken-1">Mais Pedidos</v-btn>
        <v-btn variant="text" href="#monte" class="text-subtitle-1 text-grey-darken-1">Monte seu Café</v-btn>
      </div>

      <!-- Espaçador 2 (Para manter a Navegação Centralizada em Desktop) -->
      <v-spacer class="d-none d-md-block"></v-spacer>

      <!-- 4. Ações Desktop (Direita) - Este bloco substitui as ações mobile -->
      <div class="d-none d-md-flex align-center ga-4">
         <!-- Botão Carrinho com rótulo, simulando o protótipo -->
        <v-btn variant="text" href="#" class="text-grey-darken-1" >
          Carrinho
          <v-badge :content="cartCount" color="red" dot floating offset-y="-10" v-if="cartCount > 0">
            <v-icon right>mdi-cart</v-icon>
          </v-badge>
          <v-icon right v-else>mdi-cart</v-icon>
        </v-btn>
        
        <v-btn 
          color="primary" class="font-weight-medium">
          Login / Cadastro
        </v-btn>
      </div>

    </v-container>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue';

const cartCount = ref(2); 
</script>

<style scoped>
/* Estilo customizado para replicar o comportamento sticky top-0 e a sombra (shadow-sm) */
.app-header {
  position: sticky !important;
  top: 0;
  z-index: 50;
  /* Simula shadow-sm do Tailwind */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
}
</style>