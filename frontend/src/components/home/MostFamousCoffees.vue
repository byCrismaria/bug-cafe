<template>
  <v-slide-group
    class="pa-2"
    show-arrows
  >
    <v-slide-group-item
      v-for="coffee in mostFamous"
      :key="coffee.name"
      v-slot="{}"
    >
      <v-card
        elevation="5"
        class="ma-3 overflow-hidden d-flex flex-row justify-space-between"
        width="500" 
        min-width="320"        
        variant="flat"

      >
        <v-img 
          :src="coffee.image || getPlaceholderImage(coffee.name)" 
          :alt="coffee.name" 
          width="150" 
          class="flex-shrink-0"
          cover 
          />
        
        <div class="pa-4 flex-grow-1 d-flex flex-column justify-space-between">
          <div>
            <div class="text-h6 font-weight-bold mb-2">{{ coffee.name }}</div>
            <div class="text-caption text-grey-darken-1 mb-4">{{ coffee.description }}</div>
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
        </div>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>

  <!-- Snackbar para notificações -->
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
import { ref, onMounted, reactive 	} from 'vue';
import { useCart } from '../../composables/useCart.js';
import axios from 'axios';

const { addClassicToCart } = useCart();

const mostFamous = ref([]);
const API_URL = '/api/most-famous';

const snackbar = reactive({
  visible: false,
  text: '',
  color: 'success'
});

const showSnackbar = (text, color = 'info') => {
  snackbar.text = text;
  snackbar.color = color;
  snackbar.visible = true;
};

const getPlaceholderImage = (name) => {
    const text = name.split(' ')[0].toUpperCase().substring(0, 5);
    return `https://placehold.co/200x200/6D4C41/FFFFFF?text=${text}`;
};


// Função para buscar os dados da API
const fetchMostFamous = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data && response.data.status === 'success') {
      mostFamous.value = response.data.data;
    }
  } catch (error) {
    console.error("Erro ao buscar os cafés mais famosos:", error);
    showSnackbar("Não foi possível carregar os cafés mais famosos.", "error");
  }
};

/* // Função para adicionar ao carrinho (reutilizando a lógica do outro componente)
const addToCart = async (coffeeId) => {

    const token = localStorage.getItem('authToken');
    let cartId = localStorage.getItem('cartId');

    const authData = {};

    if (token) {
        authData.token = token;
    } else {
        if (!cartId) {
            cartId = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            localStorage.setItem('cartId', cartId);
        }
        authData.cartId = cartId;
    }

    try {
        const headers = authData.token ? { 'Authorization': `Bearer ${authData.token}` } : {};
        const body = { productId: coffeeId, quantity: 1 };
        if (authData.cartId) { body.cartId = authData.cartId; }

        const response = await axios.post('/api/cart/add-classic', body, { headers });
        
        if (response.data.status === 'success') {
          const coffeeName = mostFamous.value.find(c => c.id === coffeeId)?.name || 'Item';
          const successMessage = response.data.message || `${coffeeName} adicionado com sucesso!`;
          showSnackbar(successMessage, 'success');
        }
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        const errorMessage = error.response?.data?.message || 'Não foi possível adicionar o item.';
        showSnackbar(`Erro: ${errorMessage}`, 'error');
    }
}; */

const addToCart = async (coffeeId) => {
  try {
    const successMessage = await addClassicToCart(coffeeId, 1);
    const coffeeName = mostFamous.value.find(c => c.id === coffeeId)?.name || 'Item';
    showSnackbar(successMessage || `${coffeeName} adicionado com sucesso!`, 'success');
  } catch (error) {
    console.error('Erro ao adicionar item ao carrinho:', error);
    const errorMessage = error.response?.data?.message || 'Não foi possível adicionar o item.';
    showSnackbar(`Erro: ${errorMessage}`, 'error');
  }
};

onMounted(() => {
  fetchMostFamous();
});
</script>

<style scoped>

</style>


