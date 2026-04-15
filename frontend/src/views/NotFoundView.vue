<template>
  <v-container class="py-16 text-center" data-testid="not-found-page">
    <v-icon size="120" color="grey-lighten-1" class="mb-6" data-testid="not-found-icon">mdi-coffee-off-outline</v-icon>
    <h1 class="text-h3 font-weight-bold text-grey-darken-3 mb-4" data-testid="not-found-code">404</h1>
    <p class="text-h6 text-grey-darken-1 mb-8" data-testid="not-found-message">Página não encontrada. Parece que este café não está no menu.</p>
    <v-btn to="/" color="#b45309" variant="flat" size="large" rounded="xl" class="text-white" data-testid="not-found-back-button">
      Voltar à Página Inicial
    </v-btn>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
</style>
