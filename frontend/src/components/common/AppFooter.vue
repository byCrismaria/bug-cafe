<template>
  <v-footer class="py-8 mt-14" color="grey-darken-3" :absolute="false" data-testid="app-footer">
    <v-container>
      <div class="d-flex flex-column flex-md-row justify-space-between align-center w-100">

        <div class="mb-4 mb-md-0">
          <ul class="d-flex text-subtitle-1">
            <li class="list-item mx-3">
              <router-link to="/about" class="text-white text-decoration-none hover-link" data-testid="footer-link-about">Sobre Nós</router-link>
            </li>
            <li class="list-item mx-3">
              <router-link to="/contact" class="text-white text-decoration-none hover-link" data-testid="footer-link-contact">Contato</router-link>
            </li>
            <li class="list-item mx-3">
              <router-link to="/terms" class="text-white text-decoration-none hover-link" data-testid="footer-link-terms">Termos de Serviço</router-link>
            </li>
          </ul>
        </div>

        <div class="d-flex">
          <v-btn icon variant="plain" href="#" class="text-grey-lighten-2 mx-2" data-testid="footer-social-instagram">
            <v-icon size="24">mdi-instagram</v-icon>
          </v-btn>

          <v-btn icon variant="plain" href="#" class="text-grey-lighten-2 mx-2" data-testid="footer-social-twitter">
            <v-icon size="24">mdi-twitter</v-icon>
          </v-btn>

        </div>
      </div>

      <div class="text-center text-caption mt-6 text-grey-lighten-1" data-testid="footer-copyright">
        © {{ new Date().getFullYear() }} Bug Café. Todos os direitos reservados.
      </div>

    </v-container>
  </v-footer>
</template>

<script setup>
// Sem script necessário para este componente
</script>

<style scoped>
/* Remove o marcador de lista (list-style: none) */
.list-item {
  list-style-type: none;
}

/* Estilo customizado para hover, simulando o efeito do protótipo */
.hover-link {
  color: #c0c0c0;
  /* Cor padrão, simulando text-gray-300 */
  transition: color 0.3s ease;
}

.hover-link:hover {
  color: #ffffff;
  /* Cor no hover */
}

/* Garante que os ícones fiquem brancos no hover, como os links */
.v-btn.text-grey-lighten-2:hover .v-icon {
  color: #ffffff !important;
}
</style>