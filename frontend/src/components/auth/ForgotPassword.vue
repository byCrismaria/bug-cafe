<template>
  <v-dialog v-model="dialog" max-width="440" persistent>
    <template #activator="{ props }">
      <a v-bind="props" class="text-caption text-decoration-none text-amber-darken-3 cursor-pointer">
        Esqueceu sua senha?
      </a>
    </template>

    <v-card rounded="lg" class="pa-2">
      <v-card-title class="text-h6 font-weight-bold text-brown-darken-3 pt-4 px-6">
        Recuperar senha
      </v-card-title>

      <v-card-text class="px-6">
        <!-- Sucesso -->
        <v-alert
          v-if="success"
          type="success"
          variant="tonal"
          rounded="lg"
          class="mb-4"
          icon="mdi-email-check-outline"
        >
          {{ successMessage }}
        </v-alert>

        <!-- Formulário -->
        <template v-if="!success">
          <p class="text-body-2 text-grey-darken-2 mb-4">
            Informe o e-mail cadastrado. Enviaremos um link para você criar uma nova senha.
          </p>

          <v-form ref="form" @submit.prevent="handleSubmit">
            <v-text-field
              v-model="email"
              density="compact"
              placeholder="seu@email.com"
              prepend-inner-icon="mdi-email-outline"
              variant="outlined"
              color="amber-darken-3"
              :rules="[rules.required, rules.email]"
              :disabled="loading"
              class="mb-2"
            />

            <v-btn
              type="submit"
              color="#b45309"
              size="large"
              variant="flat"
              block
              :loading="loading"
              class="text-white font-weight-bold mb-2"
            >
              Enviar link de recuperação
            </v-btn>
          </v-form>
        </template>
      </v-card-text>

      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn variant="text" color="grey-darken-1" @click="close">
          {{ success ? 'Fechar' : 'Cancelar' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue';
import apiService from '../../services/apiService.js';

const dialog = ref(false);
const email = ref('');
const loading = ref(false);
const success = ref(false);
const successMessage = ref('');
const form = ref(null);

const rules = {
  required: (v) => !!v || 'Campo obrigatório.',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail inválido.',
};

const handleSubmit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  try {
    const result = await apiService.forgotPassword(email.value);
    successMessage.value = result.message;
    success.value = true;
  } catch (error) {
    // Mesmo em erro, mostramos mensagem genérica (segurança)
    successMessage.value = 'Se o e-mail estiver cadastrado, você receberá as instruções em breve.';
    success.value = true;
  } finally {
    loading.value = false;
  }
};

const close = () => {
  dialog.value = false;
  // Reset após fechar
  setTimeout(() => {
    email.value = '';
    success.value = false;
    successMessage.value = '';
  }, 300);
};
</script>

<style scoped>
.text-brown-darken-3 { color: #4A3F35; }
.cursor-pointer { cursor: pointer; }
</style>
