<template>
  <v-slide-group
    class="pa-2"
    show-arrows
  >
    <v-slide-group-item
      v-for="coffee in mostFamous"
      :key="coffee.name"
    >
      <v-card
        elevation="5"
        class="ma-3 overflow-hidden d-flex flex-row justify-space-between"
        width="500" 
        min-width="280"        
        variant="flat"

      >
        <v-img 
          :src="coffee.image || getPlaceholderImage(coffee.name, { width: 200, height: 200, bgColor: '6D4C41' })" 
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
            :loading="loadingId === coffee.id"
            :disabled="loadingId === coffee.id"
          >
            Adicionar ao Carrinho
          </v-btn> 		
          </div>
        </div>
      </v-card>
    </v-slide-group-item>
  </v-slide-group>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCart } from '../../composables/useCart.js';
import { useSnackbar } from '../../composables/useSnackbar.js';
import apiService from '../../services/apiService.js';
import { formatPrice, getPlaceholderImage } from '../../utils/formatters.js';

const { addClassicToCart } = useCart();
const { showSnackbar } = useSnackbar();

const mostFamous = ref([]);
const loadingId = ref(null);

const fetchMostFamous = async () => {
  try {
    const data = await apiService.getMostFamousCoffees();
    mostFamous.value = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Erro ao buscar os cafés mais famosos:", error);
    showSnackbar("Não foi possível carregar os cafés mais famosos.", "error");
  }
};

const addToCart = async (coffeeId) => {
  loadingId.value = coffeeId;
  try {
    const successMessage = await addClassicToCart(coffeeId, 1);
    const coffeeName = mostFamous.value.find(c => c.id === coffeeId)?.name || 'Item';
    showSnackbar(successMessage || `${coffeeName} adicionado com sucesso!`, 'success');
  } catch (error) {
    console.error('Erro ao adicionar item ao carrinho:', error);
    const errorMessage = error.response?.data?.message || 'Não foi possível adicionar o item.';
    showSnackbar(`Erro: ${errorMessage}`, 'error');
  } finally {
    loadingId.value = null;
  }
};

onMounted(() => {
  fetchMostFamous();
});
</script>

<style scoped>

</style>


