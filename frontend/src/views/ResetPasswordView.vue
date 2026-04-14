<template>
  <v-container class="py-12 d-flex justify-center">
    <v-card class="pa-8 w-100" max-width="480" elevation="8" rounded="lg">

      <!-- Token inválido/ausente -->
      <div v-if="tokenInvalid" class="text-center">
        <v-icon size="64" color="error" class="mb-4">mdi-link-off</v-icon>
        <div class="text-h6 font-weight-bold mb-2">Link inválido ou expirado</div>
        <p class="text-body-2 text-grey-darken-2 mb-6">
          O link de redefinição é inválido ou já expirou.<br>
          Solicite um novo link na tela de login.
        </p>
        <v-btn color="#b45309" variant="flat" class="text-white" :to="'/login-cadastro'">
          Voltar ao login
        </v-btn>
      </div>

      <!-- Sucesso -->
      <div v-else-if="success" class="text-center">
        <v-icon size="64" color="success" class="mb-4">mdi-check-circle-outline</v-icon>
        <div class="text-h6 font-weight-bold mb-2">Senha redefinida!</div>
        <p class="text-body-2 text-grey-darken-2 mb-6">
          Sua senha foi atualizada com sucesso.<br>
          Faça login com sua nova senha.
        </p>
        <v-btn color="#b45309" variant="flat" class="text-white" :to="'/login-cadastro'">
          Ir para o login
        </v-btn>
      </div>

      <!-- Formulário -->
      <div v-else>
        <div class="text-h6 font-weight-bold text-brown-darken-3 mb-1">Nova senha</div>
        <p class="text-body-2 text-grey-darken-2 mb-6">
          Crie uma senha com pelo menos 8 caracteres, incluindo letras e números.
        </p>

        <v-form ref="form" @submit.prevent="handleSubmit">
          <v-text-field
            v-model="password"
            :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showPassword ? 'text' : 'password'"
            density="compact"
            label="Nova senha"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            color="amber-darken-3"
            :rules="[rules.required, rules.min, rules.security]"
            @click:append-inner="showPassword = !showPassword"
            class="mb-3"
          />

          <v-text-field
            v-model="confirmPassword"
            :append-inner-icon="showConfirm ? 'mdi-eye-off' : 'mdi-eye'"
            :type="showConfirm ? 'text' : 'password'"
            density="compact"
            label="Confirmar nova senha"
            prepend-inner-icon="mdi-lock-check-outline"
            variant="outlined"
            color="amber-darken-3"
            :rules="[rules.required, rules.match]"
            @click:append-inner="showConfirm = !showConfirm"
            class="mb-4"
          />

          <v-alert v-if="errorMessage" type="error" variant="tonal" rounded="lg" class="mb-4" density="compact">
            {{ errorMessage }}
          </v-alert>

          <v-btn
            type="submit"
            color="#b45309"
            size="large"
            variant="flat"
            block
            :loading="loading"
            class="text-white font-weight-bold"
          >
            Redefinir senha
          </v-btn>
        </v-form>
      </div>

    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import apiService from '../services/apiService.js';

const route = useRoute();

const token = ref('');
const tokenInvalid = ref(false);
const password = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirm = ref(false);
const loading = ref(false);
const success = ref(false);
const errorMessage = ref('');
const form = ref(null);

const rules = {
  required: (v) => !!v || 'Campo obrigatório.',
  min: (v) => v.length >= 8 || 'Mínimo de 8 caracteres.',
  security: (v) => /(?=.*[a-zA-Z])(?=.*\d).{8,}/.test(v) || 'Deve conter letras e números.',
  match: (v) => v === password.value || 'As senhas não coincidem.',
};

onMounted(() => {
  token.value = route.query.token || '';
  if (!token.value) tokenInvalid.value = true;
});

const handleSubmit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  loading.value = true;
  errorMessage.value = '';

  try {
    await apiService.resetPassword(token.value, password.value, confirmPassword.value);
    success.value = true;
  } catch (error) {
    errorMessage.value = error.message;
    // Se o token foi rejeitado pelo backend, mostra tela de link inválido
    if (error.message.includes('inválido') || error.message.includes('expirado')) {
      tokenInvalid.value = true;
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.text-brown-darken-3 { color: #4A3F35; }
</style>
