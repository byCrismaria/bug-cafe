<template>
  <v-container class="py-12">
    <v-responsive class="mx-auto" max-width="800">
      <div class="text-center mb-10">
        <h1 class="text-h3 font-weight-bold text-grey-darken-4 mb-4">Contato</h1>
        <v-divider class="mx-auto mb-6" style="max-width: 80px; border-color: #b45309;" thickness="3" />
      </div>

      <v-card elevation="2" rounded="lg" class="pa-8 mb-8">
        <v-row>
          <v-col cols="12" sm="6">
            <div class="d-flex align-center mb-4">
              <v-icon color="#b45309" class="mr-3">mdi-email-outline</v-icon>
              <div>
                <div class="text-body-2 text-grey-darken-1">E-mail</div>
                <a href="mailto:contato@bugcafe.com" class="text-body-1 font-weight-medium text-decoration-none" style="color: #b45309;">contato@bugcafe.com</a>
              </div>
            </div>
          </v-col>
          <v-col cols="12" sm="6">
            <div class="d-flex align-center mb-4">
              <v-icon color="#b45309" class="mr-3">mdi-phone-outline</v-icon>
              <div>
                <div class="text-body-2 text-grey-darken-1">Telefone</div>
                <a href="tel:+5511999999999" class="text-body-1 font-weight-medium text-decoration-none" style="color: #b45309;">+55 11 99999-9999</a>
              </div>
            </div>
          </v-col>
        </v-row>
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