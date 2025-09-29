<template>
  <div class="container mx-auto px-4 py-12 min-h-[60vh] flex justify-center">
    <div class="max-w-md w-full p-8 bg-white rounded-2xl shadow-2xl border border-gray-100">
      <h1 class="text-3xl font-extrabold mb-6 text-[#4A3F35] text-center">
        {{ isLogin ? 'Acesso ao Bug Café' : 'Crie sua Conta' }} 🔑
      </h1>

      <!-- Alternar entre Login e Cadastro -->
      <div class="flex justify-center mb-8">
        <button 
          @click="isLogin = true"
          :class="{'bg-amber-700 text-white': isLogin, 'bg-gray-200 text-gray-600': !isLogin}"
          class="px-6 py-2 rounded-l-lg font-semibold transition duration-300"
        >Login</button>
        <button 
          @click="isLogin = false"
          :class="{'bg-amber-700 text-white': !isLogin, 'bg-gray-200 text-gray-600': isLogin}"
          class="px-6 py-2 rounded-r-lg font-semibold transition duration-300"
        >Cadastro</button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="flex flex-col">
          <label for="email" class="text-sm font-medium mb-1 text-gray-700">Email:</label>
          <input 
            type="email" 
            id="email" 
            v-model="email" 
            required 
            class="p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
          >
        </div>
        
        <div class="flex flex-col">
          <label for="password" class="text-sm font-medium mb-1 text-gray-700">Senha:</label>
          <input 
            type="password" 
            id="password" 
            v-model="password" 
            required 
            class="p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
          >
        </div>

        <div v-if="!isLogin" class="flex flex-col">
          <label for="name" class="text-sm font-medium mb-1 text-gray-700">Nome:</label>
          <input 
            type="text" 
            id="name" 
            v-model="name" 
            required 
            class="p-3 border border-gray-300 rounded-lg focus:ring-amber-500 focus:border-amber-500 transition duration-150"
          >
        </div>
        
        <button 
          type="submit" 
          class="w-full px-6 py-3 mt-6 bg-amber-700 text-white font-extrabold rounded-lg hover:bg-amber-800 transition duration-300 shadow-lg"
        >
          {{ isLogin ? 'Entrar' : 'Cadastrar' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isLogin = ref(true); // Alterna entre Login (true) e Cadastro (false)
const email = ref('');
const password = ref('');
const name = ref('');

const handleSubmit = () => {
    if (isLogin.value) {
        // Lógica de Login: Enviar email e password para o backend
        console.log('Tentativa de Login:', email.value);
    } else {
        // Lógica de Cadastro: Enviar email, password e name para o backend
        console.log('Tentativa de Cadastro:', email.value, name.value);
    }
    // Após o sucesso, redirecionar para a Home
    // router.push({ name: 'home' }); 
};
</script>
