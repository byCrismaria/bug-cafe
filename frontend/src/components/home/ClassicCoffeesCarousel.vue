<template>
  <v-slide-group
    class="pa-2"
    show-arrows
    data-testid="classic-coffees-slide-group"
  >
    <v-slide-group-item
      v-for="coffee in classicCoffees"
      :key="coffee.id"
    >
      <v-card
        elevation="5"
        class="ma-3 pa-4 d-flex flex-column justify-space-between"
        width="270"
        height="95%"
        min-width="270"
        :data-testid="`classic-coffee-card-${coffee.id}`"
      >
        <v-img
          :src="getPlaceholderImage(coffee.name)"
          :alt="coffee.name"
          height="140"
          cover
          class="rounded-lg mb-4"
          :data-testid="`classic-coffee-image-${coffee.id}`"
        ></v-img>

        <v-card-text class="text-center pa-0 flex-grow-1" style="min-height: 80px;">
          <div class="text-h6 font-weight-bold text-darken-3" :data-testid="`classic-coffee-name-${coffee.id}`">{{ coffee.name }}</div>

          <div class="text-caption pa-0 flex-grow-1 text-grey-darken-1 mb-2" :data-testid="`classic-coffee-description-${coffee.id}`">{{ coffee.description }}</div>
        </v-card-text>

        <div class="text-h5 font-weight-bold text-darken-3 mb-2 text-center " :data-testid="`classic-coffee-price-${coffee.id}`">
            {{ formatPrice(coffee.price) }}
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
          :data-testid="`classic-coffee-add-button-${coffee.id}`"
         >
          Adicionar ao Carrinho
        </v-btn>
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

const classicCoffees = ref([]);
const loadingId = ref(null);

const fetchClassicCoffees = async () => {
    try {
        const data = await apiService.getClassicCoffees();
        classicCoffees.value = Array.isArray(data) ? data : [];
    } catch (error) {
        console.error("Erro na requisição dos Cafés Clássicos:", error.message);
    }
};

const addToCart = async (coffeeId) => {
  loadingId.value = coffeeId;
  try {
    const successMessage = await addClassicToCart(coffeeId, 1);
    showSnackbar(successMessage || 'Item adicionado com sucesso!', 'success');
  } catch (error) {
    const errorMessage = error.response?.data?.message || 'Não foi possível adicionar o item.';
    showSnackbar(`Erro: ${errorMessage}`, 'error');
  } finally {
    loadingId.value = null;
  }
};

onMounted(() => {
    fetchClassicCoffees();
});
</script>

