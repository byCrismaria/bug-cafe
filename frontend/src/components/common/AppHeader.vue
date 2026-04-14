<template>
  <v-app-bar flat color="white" height="64" style="backdrop-filter: blur(8px);" class="app-header">
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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <RouterLink to="/carrinho" class="text-decoration-none">
              <v-btn v-bind="attrs" v-on="on" icon variant="text" class="text-grey-darken-1"
                :disabled="cartCount === 0">
                <v-badge :content="cartCount" color="red" dot floating offset-y="-10" v-if="cartCount > 0">
                  <v-icon>mdi-cart</v-icon>
                </v-badge>
                <v-icon v-else>mdi-cart</v-icon>
              </v-btn>
            </RouterLink>
          </template>
          <span v-if="cartCount === 0">Adicione itens ao carrinho para acessá-lo.</span>
        </v-tooltip>

        <RouterLink v-if="!isAuthenticated" to="/login-cadastro" class="text-decoration-none">
          <v-btn color="primary" size="small" class="font-weight-medium ms-2 d-none d-sm-flex">
            Login
          </v-btn>
        </RouterLink>
        <RouterLink v-else to="/profile" class="text-decoration-none">
          <v-btn color="primary" size="small" class="font-weight-medium ms-2 d-none d-sm-flex">
            <v-icon start>mdi-account-circle</v-icon>
            {{ userName }}
          </v-btn>
        </RouterLink>

        <v-btn icon variant="text" class="ms-2">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </div>

      <!-- Espaçador ÚNICO: Empurra a Navegação para o centro e as Ações Desktop para a direita -->
      <v-spacer class="d-none d-md-block"></v-spacer>

      <!-- 3. NAVEGAÇÃO CENTRALIZADA (Desktop) -->
      <div class="d-none d-md-flex align-center ga-6">

        <RouterLink to="/" v-slot="{ href, navigate }">
          <v-btn variant="text" :href="href" @click="navigate"
            class="nav-link text-subtitle-1 text-grey-darken-1">Home</v-btn>
        </RouterLink>

        <RouterLink to="/monte-seu-cafe" v-slot="{ href, navigate }">
          <v-btn variant="text" :href="href" @click="navigate" class="nav-link text-subtitle-1 text-grey-darken-1">
            Monte seu Café</v-btn>
        </RouterLink>
      </div>

      <!-- Espaçador 2 (Para manter a Navegação Centralizada em Desktop) -->
      <v-spacer class="d-none d-md-block"></v-spacer>

      <!-- 4. AÇÕES DESKTOP (Direita) -->
      <div class="d-none d-md-flex align-center ga-4">

        <!-- Botão Carrinho com Rótulo (Desktop) -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <RouterLink to="/carrinho" v-slot="{ href, navigate, isActive }">
              <v-btn v-bind="attrs" v-on="on" variant="text" @click="navigate" :class="[
                'nav-link',
                'text-subtitle-1',
                isActive ? 'text-brown-darken-3' : 'text-grey-darken-1'
              ]" :color="isActive ? 'brown-darken-3' : undefined" :disabled="cartCount === 0">
                Carrinho
                <v-badge :content="cartCount" :model-value="cartCount > 0" color="red" inline class="ml-1">
                  <v-icon right>mdi-cart</v-icon>
                </v-badge>
              </v-btn>
            </RouterLink>
          </template>
          <span v-if="cartCount === 0">Adicione itens ao carrinho para acessá-lo.</span>
        </v-tooltip>

        <template v-if="isAuthenticated">
          <RouterLink to="/profile" class="text-decoration-none">
            <v-btn variant="text" class="text-grey-darken-1 nav-link">
              <v-icon start>mdi-account-circle</v-icon>
              {{ userName }}
            </v-btn>
          </RouterLink>
          <v-btn variant="text" class="text-grey-darken-1 nav-link" @click="handleLogout">
            Sair
          </v-btn>
        </template>
        <template v-else>
          <RouterLink to="/login-cadastro" class="text-decoration-none">
            <v-btn variant="text" class="text-grey-darken-1 nav-link">
              Login / Cadastro
            </v-btn>
          </RouterLink>
        </template>

      </div>

    </v-container>
  </v-app-bar>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router';
import { useAuth } from '../../composables/useAuth.js';

defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
});

const router = useRouter();
const { isAuthenticated, userName, logout } = useAuth();

const handleLogout = () => {
  logout();
  router.push('/');
};
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
  color: #B8860B !important;
  /* Cor amber para ativo */
}

/* Garante que o texto do RouterLink não tenha sublinhado */
.text-decoration-none {
  text-decoration: none !important;
}
</style>
