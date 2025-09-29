<template>
  <v-app-bar 
    flat 
    color="white"
    height="64" 
    style="backdrop-filter: blur(8px);" 
    class="app-header" 
  >
    <v-container class="d-flex align-center fill-height pa-0 px-4">
      
      <!-- 1. LOGO/LINK HOME -->
      <RouterLink to="/" class="text-decoration-none">
        <div class="text-h6 font-weight-bold flex-grow-0 text-grey-darken-4 hover:text-amber-700 transition">
          <span class="mr-2">🐞</span> Bug Café
        </div>
      </RouterLink>

      <v-spacer class="d-md-none"></v-spacer>
      
      <!-- 2. AÇÕES MOBILE/SMALL SCREENS (DIREITA) -->
      <div class="d-flex align-center d-md-none ms-2">
        
        <!-- Botão Carrinho (Mobile) -->
        <RouterLink to="/carrinho" class="text-decoration-none">
            <v-btn icon variant="text" class="text-grey-darken-1">
              <v-badge :content="cartCount" color="red" dot floating offset-y="-10" v-if="cartCount > 0">
                <v-icon>mdi-cart</v-icon>
              </v-badge>
              <v-icon v-else>mdi-cart</v-icon>
            </v-btn>
        </RouterLink>

        <!-- Botão Login/Cadastro (Mobile - Oculto em telas menores que 'sm') -->
        <RouterLink to="/login-cadastro" class="text-decoration-none">
            <v-btn color="primary" size="small" class="font-weight-medium ms-2 d-none d-sm-flex">
              Login
            </v-btn>
        </RouterLink>
        
        <!-- Ícone Menu Hamburger (Você pode implementar um Drawer aqui) -->
        <v-btn icon variant="text" class="ms-2">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>

      <!-- Espaçador ÚNICO: Empurra a Navegação para o centro e as Ações Desktop para a direita -->
      <v-spacer class="d-none d-md-block"></v-spacer> 
      
      <!-- 3. NAVEGAÇÃO CENTRALIZADA (Desktop) -->
      <div class="d-none d-md-flex align-center ga-6">
        
        <!-- Nota: Removemos os links âncora (#classicos, #mais-pedidos) e focamos nas rotas principais. -->
        <RouterLink to="/" v-slot="{ href, navigate }">
          <v-btn variant="text" :href="href" @click="navigate" class="nav-link text-subtitle-1 text-grey-darken-1">Início</v-btn>
        </RouterLink>

        <RouterLink to="/monte-seu-cafe" v-slot="{ href, navigate }">
          <v-btn variant="text" :href="href" @click="navigate" class="nav-link text-subtitle-1 text-grey-darken-1">Monte seu Café</v-btn>
        </RouterLink>
      </div>

      <!-- Espaçador 2 (Para manter a Navegação Centralizada em Desktop) -->
      <v-spacer class="d-none d-md-block"></v-spacer>

      <!-- 4. AÇÕES DESKTOP (Direita) -->
      <div class="d-none d-md-flex align-center ga-4">
          
        <!-- Botão Carrinho com Rótulo (Desktop) -->
        <RouterLink to="/carrinho" class="text-decoration-none text-grey-darken-1">
          <v-btn variant="text" class="text-grey-darken-1 nav-link">
            Carrinho
            <v-badge :content="cartCount" color="red" dot floating offset-y="-10" v-if="cartCount > 0">
              <v-icon right>mdi-cart</v-icon>
            </v-badge>
            <v-icon right v-else>mdi-cart</v-icon>
          </v-btn>
        </RouterLink>
        
        <!-- Botão Login/Cadastro (Desktop) -->
        <RouterLink to="/login-cadastro" class="text-decoration-none">
          <v-btn color="amber-700" class="font-weight-medium text-white">
            Login / Cadastro
          </v-btn>
        </RouterLink>

      </div>

    </v-container>
  </v-app-bar>
</template>

<script setup>
// Importamos o RouterLink para uso no template
import { RouterLink } from 'vue-router';
// 1. O cartCount agora é uma PROP que vem do App.vue
defineProps({
    cartCount: {
        type: Number,
        default: 0
    }
}); 
</script>

<style scoped>
.app-header {
  position: sticky !important;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); 
}
/* Estilo para links ativos, se o Vuetify não sobrescrever */
.router-link-active .nav-link,
.router-link-exact-active .nav-link {
    color: #B8860B !important; /* Cor amber para ativo */
}

/* Garante que o texto do RouterLink não tenha sublinhado */
.text-decoration-none {
    text-decoration: none !important;
}
</style>
