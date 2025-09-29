<template>
  <div class="container mx-auto px-4 py-12 min-h-[60vh]">
    <h1 class="text-4xl font-extrabold mb-8 text-[#4A3F35] border-b pb-4">Seu Carrinho de Compras</h1>
    
    <div v-if="cart.length === 0" class="text-center py-16 bg-white rounded-xl shadow-lg">
      <p class="text-xl text-gray-600 mb-4">Seu carrinho está vazio.</p>
      <RouterLink 
        to="/" 
        class="inline-block px-6 py-3 bg-amber-700 text-white font-semibold rounded-lg hover:bg-amber-800 transition duration-300 shadow-md"
      >
        Voltar para o Menu
      </RouterLink>
    </div>

    <div v-else>
      <!-- LISTA DE ITENS DO CARRINHO (A ser desenvolvida) -->
      <ul class="space-y-4">
        <li v-for="item in cart" :key="item.id" class="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <div>
            <p class="font-bold text-lg text-amber-700">{{ item.name }}</p>
            <p class="text-sm text-gray-500">{{ item.details }}</p>
          </div>
          <span class="font-bold text-lg">{{ formatPrice(item.price) }}</span>
        </li>
      </ul>


      <div class="mt-8 p-6 bg-gray-50 rounded-xl shadow-inner max-w-sm ml-auto">
        <div class="flex justify-between font-semibold text-xl mb-4">
          <span>Subtotal:</span>
          <span class="text-amber-700">{{ formatPrice(totalPrice) }}</span>
        </div>
        <button 
          @click="checkout" 
          class="w-full px-6 py-3 bg-green-600 text-white font-extrabold rounded-lg hover:bg-green-700 transition duration-300 shadow-xl"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';


const props = defineProps({
    cart: {
        type: Array,
        default: () => []
    }
});

const totalPrice = computed(() => {
    return props.cart.reduce((sum, item) => sum + item.price, 0);
});

const formatPrice = (price) => `R$ ${price.toFixed(2).replace('.', ',')}`;

const checkout = () => {
    // Aqui o backend de Pagamento/Pedido
    console.log('Iniciando checkout...');
};
</script>
