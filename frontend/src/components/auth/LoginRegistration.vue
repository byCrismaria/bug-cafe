<template>
  <v-container class="py-8">
    <v-card class="mx-auto pa-8" elevation="8" max-width="1200" rounded="lg">
      <v-row>
        <!-- Coluna de Boas-vindas -->
        <v-col cols="12" md="4" class="pr-md-4">
          <div class="text-center text-md-start">

            <h2 class="text-h5 font-weight-bold text-brown-darken-3 mb-4">
              Bem-vindo(a) ao Bug Café!
            </h2>

            <v-alert color="amber-lighten-3" icon="mdi-coffee-to-go-outline" variant="tonal" class="rounded-lg mb-4">
              <div class="font-weight-medium text-brown-darken-3">
                Cadastre-se e acumule pontos!
              </div>
              <p class="text-caption text-grey-darken-3 mt-1 mb-0">
                A cada R$10 gastos, você ganha 1 ponto. Troque seus pontos por
                cafés grátis e descontos exclusivos!
              </p>
            </v-alert>

            <div class="text-medium-emphasis text-body-2 mb-2">
              <v-icon icon="mdi-star-circle" color="#b45309" class="mr-2"></v-icon>
              Programa de fidelidade exclusivo
            </div>
            <div class="text-medium-emphasis text-body-2">
              <v-icon icon="mdi-gift" color="#b45309" class="mr-2"></v-icon>
              Ofertas personalizadas
            </div>
          </div>
        </v-col>

        <!-- Coluna de Login -->
        <v-col cols="12" md="4" class="px-md-2">
          <v-card variant="flat" color="grey-lighten-5" class="pa-4 rounded-lg h-100">
            <h3 class="text-h6 font-weight-semibold mb-4 text-brown-darken-3">
              Login
            </h3>

            <v-form @submit.prevent="handleLogin" ref="loginForm">
              <v-text-field v-model="loginData.email" density="compact" placeholder="Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined" color="amber-darken-3"
                :rules="[rules.required, rules.email]" class="mb-3"></v-text-field>

              <div class="text-subtitle-2 text-medium-emphasis d-flex align-center justify-space-between mb-2">
                Password
                <a class="text-caption text-decoration-none text-amber-darken-3" href="#" rel="noopener noreferrer">
                  Esqueceu sua senha?
                </a>
              </div>

              <v-text-field v-model="loginData.password" :append-inner-icon="showPass.login ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPass.login ? 'text' : 'password'" density="compact" placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" color="amber-darken-3"
                :rules="[rules.required]" @click:append-inner="showPass.login = !showPass.login"
                class="mb-4"></v-text-field>

              <v-btn type="submit" color="#b45309" size="large" variant="flat" block :loading="isLoading.login"
                class="text-white font-weight-bold">
                Entrar
              </v-btn>
            </v-form>
          </v-card>
        </v-col>

        <!-- Coluna de Cadastro -->
        <v-col cols="12" md="4" class="pl-md-4">
          <v-card variant="flat" color="grey-lighten-5" class="pa-4 rounded-lg h-100">
            <h3 class="text-h6 font-weight-semibold mb-4 text-brown-darken-3">
              Cadastro
            </h3>

            <v-form @submit.prevent="handleRegister" ref="registerForm">
              <v-text-field v-model="registerData.fullName" density="compact" placeholder="Nome completo"
                prepend-inner-icon="mdi-account-outline" variant="outlined" color="amber-darken-3"
                :rules="[rules.required]" class="mb-3"></v-text-field>

              <v-text-field v-model="registerData.email" density="compact" placeholder="Email address"
                prepend-inner-icon="mdi-email-outline" variant="outlined" color="amber-darken-3"
                :rules="[rules.required, rules.email]" class="mb-3"></v-text-field>

              <v-text-field v-model="registerData.password"
                :append-inner-icon="showPass.register ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPass.register ? 'text' : 'password'" density="compact" placeholder="Password"
                prepend-inner-icon="mdi-lock-outline" variant="outlined" color="amber-darken-3"
                :rules="[rules.required, rules.min, rules.passwordSecurity]"
                @click:append-inner="showPass.register = !showPass.register" class="mb-3"></v-text-field>

              <v-text-field v-model="registerData.confirmPassword"
                :append-inner-icon="showPass.confirm ? 'mdi-eye-off' : 'mdi-eye'"
                :type="showPass.confirm ? 'text' : 'password'" density="compact" placeholder="Confirm password"
                prepend-inner-icon="mdi-lock-check-outline" variant="outlined" color="amber-darken-3"
                :rules="[rules.required, rules.passwordMatch]"
                @click:append-inner="showPass.confirm = !showPass.confirm" class="mb-4"></v-text-field>

              <v-checkbox v-model="registerData.receiveNews" label="Aceito receber novidades e promoções"
                density="compact" color="#b45309" class="mt-0"></v-checkbox>

              <v-btn type="submit" color="#b45309" size="large" variant="flat" block :loading="isLoading.register"
                class="text-white font-weight-bold">
                Cadastrar
              </v-btn>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-snackbar v-model="snackbar.visible" :timeout="3000" :color="snackbar.color" location="top right"
      variant="elevated">
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn icon="mdi-close" variant="text" @click="snackbar.visible = false"></v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '../../services/apiService.js';

const router = useRouter();
const loginForm = ref(null);
const registerForm = ref(null);

const isLoading = reactive({
  login: false,
  register: false,
});

const showPass = reactive({
  login: false,
  register: false,
  confirm: false,
});

const snackbar = reactive({
  visible: false,
  text: '',
  color: 'success'
});

const loginData = reactive({
  email: '',
  password: '',
});

const registerData = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  receiveNews: false,
});

// Funções de feedback
const showSnackbar = (message, color = 'success') => {
  snackbar.text = message;
  snackbar.color = color;
  snackbar.visible = true;
};

// Funções de Validação
const rules = reactive({
  required: (v) => !!v || 'Campo obrigatório.',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail deve ser válido.',
  min: (v) => v.length >= 8 || 'Mínimo de 8 caracteres.',
  passwordSecurity: (v) =>
    /(?=.*[a-zA-Z])(?=.*\d).{8,}/.test(v) ||
    'Deve conter letras e números.',
  passwordMatch: (v) => v === registerData.password || 'As senhas não coincidem.',
});

// --- Lógica de Login ---
const handleLogin = async () => {
  const { valid } = await loginForm.value.validate();
  if (!valid) return;

  isLoading.login = true;
  try {
    const result = await apiService.login(loginData.email, loginData.password);

    if (result.status === 'success' && result.data) {
      const token = result.data.token;
      const message = result.message || 'Login realizado com sucesso.';

      // Salva o token
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', result.data.name); // Opcional: salvar nome do usuário

      showSnackbar(message, 'success');

      // Limpa o cartId local
      localStorage.removeItem('cartId');

      // Redireciona para a página inicial
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } else {
      throw new Error(result.message || 'Erro no login');
    }

  } catch (error) {
    console.error('Erro no login:', error);

    const errorMessage = error.message.includes("E-mail ou senha inválidos")
      ? "E-mail ou senha incorretos. Por favor, tente novamente."
      : error.message || "Ocorreu um erro no login. Tente novamente.";

    showSnackbar(errorMessage, 'error');
  } finally {
    isLoading.login = false;
  }
};

// --- Lógica de Cadastro ---
const handleRegister = async () => {
  const { valid } = await registerForm.value.validate();
  if (!valid) return;

  if (registerData.password !== registerData.confirmPassword) {
    showSnackbar("As senhas digitadas não são iguais. Por favor, verifique.", 'error');
    return;
  }

  isLoading.register = true;
  try {
    const result = await apiService.register(
      registerData.fullName,
      registerData.email,
      registerData.password,
      registerData.confirmPassword
    );

    console.log('Resposta do registro:', result);

    if (result.status === 'success') {
      const message = result.message || 'Cadastro realizado com sucesso. Bem-vindo(a)!';

      showSnackbar(message, 'success');

      // Limpa o formulário de registro
      registerData.fullName = '';
      registerData.email = '';
      registerData.password = '';
      registerData.confirmPassword = '';
      registerData.receiveNews = false;

      // Foca no formulário de login
      setTimeout(() => {
        loginData.email = registerData.email;
        if (registerForm.value) registerForm.value.reset();
      }, 1000);

    } else {
      throw new Error(result.message || 'Erro no cadastro');
    }

  } catch (error) {
    console.error('Erro no cadastro:', error);

    let displayMessage = error.message || "Ocorreu um erro no cadastro. Tente novamente.";
    if (error.message.includes("Este e-mail já está cadastrado")) {
      displayMessage = "Este e-mail já está em uso. Tente outro ou faça login.";
    } else if (error.message.includes("As senhas não coincidem")) {
      displayMessage = "As senhas não coincidem. Por favor, verifique.";
    } else if (error.message.includes("senha deve ter no mínimo 8 caracteres")) {
      displayMessage = "A senha deve ter no mínimo 8 caracteres, incluindo letras e números.";
    } else if (error.message.includes("Todos os campos obrigatórios")) {
      displayMessage = "Todos os campos obrigatórios devem ser preenchidos.";
    }

    showSnackbar(displayMessage, 'error');
  } finally {
    isLoading.register = false;
  }
};
</script>

<style scoped>
.text-brown-darken-3 {
  color: #4A3F35;
}

.h-100 {
  height: 100%;
}
</style>