<template>
  <v-slide-group
    class="pa-2"
    show-arrows
  >
    <v-slide-group-item
      v-for="coffee in classicCoffees"
      :key="coffee.id"
      v-slot="{}" 
    >
      <v-card 
        elevation="5" 
        class="ma-3 pa-4 d-flex flex-column justify-space-between" 
        width="270"
        height="95%"
        min-width="270"
      >
        <v-img 
          :src="getPlaceholderImage(coffee.name)" 
          :alt="coffee.name" 
          height="140" 
          cover 
          class="rounded-lg mb-4"
        ></v-img>

        <v-card-text class="text-center pa-0 flex-grow-1" style="min-height: 80px;">
          <div class="text-h6 font-weight-bold text-darken-3">{{ coffee.name }}</div>
          
          <div class="text-caption pa-0 flex-grow-1 text-grey-darken-1 mb-2">{{ coffee.description }}</div> 
        </v-card-text>
        
        <div class="text-h5 font-weight-bold text-darken-3 mb-2 text-center ">
            {{ formatPrice(coffee.price) }}
        </div>

        <div class="mt-auto">
          <v-btn 
          block 
          color="#b45309" 
          class="mt-2"
          height="40"
          @click.stop="addToCart(coffee.id)"
         >
          Adicionar ao Carrinho
        </v-btn>
        </div>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>

  <v-snackbar
      v-model="snackbar.visible"
      :timeout="3000"
      :color="snackbar.color"
      location="top right"
      variant="elevated"
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="snackbar.visible = false"
        ></v-btn>
      </template>
    </v-snackbar>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useCart } from '../../composables/useCart.js';
import axios from 'axios';

const { addClassicToCart } = useCart(); 

const API_URL = '/api/classic-coffees';
const classicCoffees = ref([]);

const snackbar = reactive({
  visible: false,
  text: '',
  color: 'success'
});

// Função auxiliar para mostrar o snackbar
const showSnackbar = (text, color = 'info') => {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.visible = true;
};

const getPlaceholderImage = (name) => {
    const text = name.split(' ')[0].toUpperCase().substring(0, 5);
    const color = 'A1887F';
    return `https://placehold.co/400x300/${color}/FFFFFF?text=${text}`;
};

const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numericPrice);
};

const fetchClassicCoffees = async () => {
    try {
        const response = await axios.get(API_URL);
        const responseData = response.data;

        if (responseData && responseData.status && responseData.status.toLowerCase() === 'success' && Array.isArray(responseData.data)) {
            classicCoffees.value = responseData.data;
            console.log("Cafés Clássicos carregados com sucesso.");
        } else {
            console.error("Formato de resposta da API inválido ou status não é 'success'. Recebido:", responseData);
        }
    } catch (error) {
        console.error("Erro na requisição dos Cafés Clássicos:", error.message);
        if (error.response) {
             console.error("Detalhes do erro do servidor:", error.response.data);
        }
    }
};

/* const addToCart = async (coffeeId) => {

    const token = localStorage.getItem('authToken');
    let cartId = localStorage.getItem('cartId');

    // Objeto para os dados de autenticação
    const authData = {};

    if (token) {
        // Se o usuário está logado, usa o token
        authData.token = token;
    } else {
        // Se for convidado, verifica se já tem um ID
        if (!cartId) {
            // Se não tiver, cria um novo e salva
            cartId = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            localStorage.setItem('cartId', cartId);
        }
        authData.cartId = cartId;
    }

    try {
        const headers = authData.token ? { 'Authorization': `Bearer ${authData.token}` } : {};
        const body = { productId: coffeeId, quantity: 1 };

        // Adiciona o cartId ao corpo se não houver token
        if (authData.cartId) {
          body.cartId = authData.cartId;
        }

        const response = await axios.post('/api/cart/add-classic', body, { headers });

        if (response.data.status === 'success') {
          showSnackbar(response.data.message || 'Item adicionado com sucesso!', 'success');
        }
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        const errorMessage = error.response?.data?.message || 'Não foi possível adicionar o item.';
        showSnackbar(`Erro: ${errorMessage}`, 'error');
    }
}; */

const addToCart = async (coffeeId) => {
  console.log('coffeeId:', coffeeId); 
  try {
    const successMessage = await addClassicToCart(coffeeId, 1);
    showSnackbar(successMessage || 'Item adicionado com sucesso!', 'success');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Não foi possível adicionar o item.';
    showSnackbar(`Erro: ${errorMessage}`, 'error');
  }
};

onMounted(() => {
    fetchClassicCoffees();
});
</script>

