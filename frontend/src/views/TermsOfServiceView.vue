<template>
  <v-container class="py-12">
    <v-responsive class="mx-auto" max-width="800">
      <div class="text-center mb-10">
        <h1 class="text-h3 font-weight-bold text-grey-darken-4 mb-4">Termos de Serviço</h1>
        <v-divider class="mx-auto mb-6" style="max-width: 80px; border-color: #b45309;" thickness="3" />
      </div>

      <v-card elevation="2" rounded="lg" class="pa-8 mb-8">
        <p class="text-body-1 text-grey-darken-2 mb-4">
          Estes são os Termos de Serviço do Bug Café. Ao utilizar nosso site, você concorda com os seguintes termos:
        </p>
        <v-list density="compact" class="bg-transparent">
          <v-list-item prepend-icon="mdi-check-circle-outline" class="text-body-2 text-grey-darken-2">
            O Bug Café é um projeto fictício para fins de estudo e prática de testes (QA).
          </v-list-item>
          <v-list-item prepend-icon="mdi-check-circle-outline" class="text-body-2 text-grey-darken-2">
            Os dados cadastrados neste site são utilizados apenas para demonstração.
          </v-list-item>
          <v-list-item prepend-icon="mdi-check-circle-outline" class="text-body-2 text-grey-darken-2">
            Nenhuma transação financeira real é processada nesta plataforma.
          </v-list-item>
        </v-list>
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