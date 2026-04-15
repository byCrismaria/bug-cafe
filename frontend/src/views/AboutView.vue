<template>
  <v-container class="py-12">
    <v-responsive class="mx-auto" max-width="800">
      <div class="text-center mb-10">
        <h1 class="text-h3 font-weight-bold text-grey-darken-4 mb-4">Sobre Nós</h1>
        <v-divider class="mx-auto mb-6" style="max-width: 80px; border-color: #b45309;" thickness="3" />
      </div>

      <v-card elevation="2" rounded="lg" class="pa-8 mb-8">
        <p class="text-body-1 text-grey-darken-2 mb-4">
          Bem-vindo ao <strong>Bug Café</strong>! Somos apaixonados por café e tecnologia. Nosso objetivo é oferecer
          a melhor experiência para os amantes de café, com opções clássicas e personalizadas.
        </p>
        <p class="text-body-1 text-grey-darken-2">
          Cada xícara é preparada com ingredientes selecionados e muito carinho — porque todo bom código
          merece uma pausa perfeita.
        </p>
      </v-card>

      <div class="text-center">
        <v-btn to="/" color="#b45309" variant="flat" size="large" rounded="xl" class="text-white">
          Voltar à Página Inicial
        </v-btn>
      </div>
    </v-responsive>
  </v-container>
</template>

<script setup>
</script>

<style scoped>
</style>