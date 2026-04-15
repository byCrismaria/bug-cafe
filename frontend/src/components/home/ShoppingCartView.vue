<template>
  <v-responsive class="mx-auto" max-width="1200">
    <v-card elevation="5" rounded="xl" class="pa-6 pa-md-8">
      <h2 class="text-h4 font-weight-bold text-brown-darken-3 mb-2">Seu Carrinho</h2>

      <v-divider class="mb-2"></v-divider>

      <div v-if="isLoading" class="text-center py-10">
        <v-progress-circular indeterminate color="amber-darken-3"></v-progress-circular>
        <p class="text-subtitle-1 mt-4 text-grey-darken-1">Carregando seu carrinho...</p>
      </div>

      <!-- Lista de Itens do Carrinho -->
      <div v-else-if="cartData.items.length > 0">
        <div v-for="item in cartData.items" :key="item.itemId"
          class="d-flex flex-column flex-md-row align-start align-md-center justify-space-between pb-4 border-b">
          <!-- Detalhes do Item e Imagem (Lado Esquerdo) -->
          <div class="d-flex align-center ga-4 w-100 w-md-50 mb-6 mb-md-0">
            <v-img :src="item.image || getPlaceholderImage(item.name)" :alt="item.name" cover width="80" height="80"
              class="rounded-lg flex-shrink-0" />

            <div class="flex-grow-1 mr-4 pa-6">
              <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">{{ item.name }}</div>
              <div v-if="item.is_customizable && item.customizations && item.customizations.length"
                class="text-caption text-grey-darken-1 mt-1">
                <span v-for="(custom, idx) in item.customizations" :key="idx" class="mr-1">
                  {{ custom.name }} ({{ custom.category }}){{ idx < item.customizations.length - 1 ? ',' : '' }} </span>
              </div>
              <p v-else-if="item.description" class="text-caption text-grey-darken-1 mt-1">{{ item.description }}</p>


              <!-- Preço Unitário (Mobile/Tablet) -->
              <div class="d-flex d-md-none mt-2">
                <span class="text-body-2 text-grey-darken-1 mr-2">Preço:</span>
                <span class="text-subtitle-1 font-weight-bold text-grey-darken-4">{{ formatPrice(item.unit_price)
                }}</span>
              </div>
            </div>

            <!-- Preço Unitário (Desktop) -->
            <div class="d-none d-md-flex flex-column align-center ml-auto mr-8">
              <span class="text-caption text-grey-darken-1">Preço Unitário:</span>
              <span class="text-subtitle-1 font-weight-bold text-grey-darken-4">{{ formatPrice(item.unit_price)
              }}</span>
            </div>
          </div>

          <!-- Controles de Quantidade, Subtotal e Remoção (Lado Direito) -->
          <div class="d-flex align-center justify-space-between w-100 w-md-auto">

            <v-progress-circular v-if="item.isUpdating" indeterminate size="24" color="amber-darken-3"
              class="mr-4"></v-progress-circular>

            <!-- Controles de Quantidade -->
            <div class="d-flex align-center border rounded-xl overflow-hidden mr-4">
              <v-btn size="small" icon="mdi-minus" variant="flat" color="grey-lighten-3"
                @click="updateCartItemQuantity(item.order_item_id, - 1)" />
              <span class="px-3 text-subtitle-1 font-weight-medium text-center" style="min-width: 40px;">
                {{ item.quantity }}
              </span>
              <v-btn size="small" icon="mdi-plus" variant="flat" color="grey-lighten-3"
                @click="updateCartItemQuantity(item.order_item_id, + 1)" />
            </div>

            <!-- Subtotal do Item -->
            <span class="text-h6 font-weight-bold text-amber-darken-3 mr-4" style="min-width: 70px;">
              {{ formatPrice(item.subtotal) }}
            </span>

            <!-- Botão de Remover -->
            <v-btn icon="mdi-trash-can-outline" variant="plain" color="red-darken-2"
              @click="removeItem(item.order_item_id)" :disabled="item.isUpdating" :loading="item.isUpdating" />
          </div>

        </div>
      </div>

      <!-- Carrinho Vazio -->
      <div v-else class="text-center py-10">
        <v-icon size="60" color="grey-lighten-1" class="mb-4">mdi-coffee-off</v-icon>
        <h3 class="text-h6 text-grey-darken-1">Seu carrinho está vazio. Adicione um café!</h3>
        <v-btn to="/" color="amber-darken-3" variant="flat" class="mt-4" size="large" rounded="xl">
          Voltar à Loja
        </v-btn>
      </div>

      <!-- Rodapé e Sumário (Visível se houver itens) -->
      <div v-if="cartData.items.length > 0" class="d-flex flex-column flex-md-row justify-end mt-8">
        <!-- Coluna do Sumário -->
        <!-- Adicionada margem inferior mb-6 para mobile -->
        <div class="text-grey-darken-1 text-body-2 w-100 w-md-50 mb-6 mb-md-0" style="max-width: 360px;">
          <div class="d-flex justify-space-between align-center mb-2">
            <span>Subtotal do Pedido:</span>
            <span class="font-weight-medium text-grey-darken-4">{{ formatPrice(cartData.subtotal) }}</span>
          </div>
          <div class="d-flex justify-space-between align-center mb-2">
            <span>Taxas e Impostos (Est.):</span>
            <span class="font-weight-medium text-grey-darken-4">{{ formatPrice(cartData.taxes) }}</span>
          </div>
          <v-divider class="my-4"></v-divider>
          <div class="d-flex justify-space-between align-center font-weight-bold text-h6">
            <span>TOTAL:</span>
            <span class="text-amber-darken-3">{{ formatPrice(cartData.total) }}</span>
          </div>
        </div>

        <!-- Botão de Checkout -->
        <!-- Adicionada margem esquerda ml-md-8 para desktop para separar do sumário -->
        <div class="flex-shrink-0 mt-0 ml-md-8">
          <v-btn class="text-white font-weight-medium px-6 py-3 rounded-xl elevation-4"
            color="#b45309" size="x-large" variant="flat" block @click="showCheckoutDialog = true"
            :disabled="isCheckingOut">
            Continuar para Pagamento
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-responsive>

  <!-- Dialog de Confirmação de Checkout -->
  <v-dialog v-model="showCheckoutDialog" max-width="440" persistent>
    <v-card rounded="lg" class="pa-2">
      <v-card-title class="text-h6 font-weight-bold pt-4 px-6">
        Confirmar Pedido
      </v-card-title>
      <v-card-text class="px-6">
        Deseja finalizar o pedido no valor de <strong>{{ formatPrice(cartData.total) }}</strong>?
      </v-card-text>
      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn variant="text" color="grey-darken-1" @click="showCheckoutDialog = false" :disabled="isCheckingOut">Cancelar</v-btn>
        <v-btn color="#b45309" variant="flat" class="text-white" @click="checkout" :loading="isCheckingOut">Confirmar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog de Confirmação de Remoção -->
  <v-dialog v-model="showRemoveDialog" max-width="400">
    <v-card rounded="lg" class="pa-2">
      <v-card-title class="text-h6 font-weight-bold pt-4 px-6">
        Remover item
      </v-card-title>
      <v-card-text class="px-6">
        Deseja remover este item do carrinho?
      </v-card-text>
      <v-card-actions class="px-6 pb-4">
        <v-spacer />
        <v-btn variant="text" color="grey-darken-1" @click="showRemoveDialog = false">Cancelar</v-btn>
        <v-btn color="red-darken-2" variant="flat" class="text-white" @click="confirmRemoveItem">Remover</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import apiService from '../../services/apiService.js';
import { useCart } from '../../composables/useCart.js';
import { useSnackbar } from '../../composables/useSnackbar.js';
import { formatPrice, getPlaceholderImage as getPlaceholderBase } from '../../utils/formatters.js';

const router = useRouter();
const { cartState, removeItemFromCart, loadCart } = useCart();
const { showSnackbar } = useSnackbar();

const getPlaceholderImage = (name) => getPlaceholderBase(name, { width: 80, height: 80, bgColor: 'd7ccc8', textColor: '4A3F35' });

// --- Constantes e Variáveis Reativas ---
const TAX_RATE = 0.05; // 5% de taxa de imposto/serviço

const isLoading = ref(true);
const isCheckingOut = ref(false);
const showCheckoutDialog = ref(false);
const showRemoveDialog = ref(false);
const pendingRemoveId = ref(null);

// Estrutura do Carrinho adaptada ao retorno da API
const cartData = reactive({
  items: [],
  total: 0,
  subtotal: 0,
  taxes: 0,
});

/** Calcula subtotal e impostos baseado no total da API. */
const calculateTotals = (totalFromApi) => {
  const total = parseFloat(totalFromApi) || 0;
  cartData.total = total;
  const subtotal = total / (1 + TAX_RATE);
  const taxes = total - subtotal;

  cartData.subtotal = parseFloat(subtotal.toFixed(2));
  cartData.taxes = parseFloat(taxes.toFixed(2));
};

// --- Lógica de Carregamento ---

//* Sincroniza os dados do carrinho global com o local. */
const syncCartData = () => {
  cartData.items = cartState.items.map(item => ({
    ...item,
    itemId: item.order_item_id,
    isUpdating: false,
    unit_price: parseFloat(item.unit_price),
    quantity: parseInt(item.quantity),
    subtotal: parseFloat(item.subtotal),
  }));
  calculateTotals(cartState.total || 0);
};

/** Carrega os dados do carrinho do backend. */
const loadCartItens = async () => {
  isLoading.value = true;
  try {

    // Obtém o cartId dinamicamente do localStorage
    const cartId = localStorage.getItem('cartId');
    const userId = localStorage.getItem('authToken') ? 'Usuário Logado' : null;

    if (!cartId && !userId) {
      throw new Error('Nenhum cartId ou userId encontrado. Faça login ou inicie uma sessão como convidado.');
    }

    const response = await apiService.getCart(userId, cartId);

    // Mapeia os itens para a estrutura esperada
    const data = response?.data || response;
    cartData.items = Array.isArray(data.items) ? data.items.map(item => ({
      ...item,
      itemId: item.order_item_id,
      isUpdating: false,
      unit_price: parseFloat(item.unit_price),
      quantity: parseInt(item.quantity),
      subtotal: parseFloat(item.subtotal),
    })) : [];

    calculateTotals(data.total || 0);

  } catch (error) {
    // Inicializa o carrinho vazio em caso de erro
    cartData.items = [];
    calculateTotals(0);
    showSnackbar(error.message || 'Não foi possível carregar seu carrinho.', 'error');
  } finally {
    isLoading.value = false;
  }
}; 

const updateCartItemQuantity = async (orderItemId, change) => {
  const item = cartData.items.find(item => item.order_item_id === orderItemId);
  if (!item) return;

  const newQuantity = item.quantity + change;

  if (newQuantity < 1) {
    removeItem(orderItemId);
    return;
  }

  item.isUpdating = true;

  try {
    console.log(`Atualizando item ${orderItemId} para quantidade ${newQuantity}`)
    const result = await apiService.updateCartItemQuantity(orderItemId, newQuantity);
    console.log('Resposta da atualização:', result);

    await loadCartItens();

    showSnackbar('Quantidade atualizada com sucesso!', 'success');
  } catch (error) {
    console.error('Erro ao atualizar quantidade:', error);

    // Se for erro de estoque insuficiente, mostra mensagem específica
    if (error.message.includes('Estoque insuficiente') || error.message.includes('indisponível')) {
      showSnackbar(error.message, 'error');
    } else if (error.message.includes('Quantidade deve ser maior que zero.')) {
      pendingRemoveId.value = orderItemId;
      showRemoveDialog.value = true;
    } else {
      showSnackbar('Erro ao atualizar quantidade. Tente novamente.', 'error');
    }

    // Recarrega o carrinho para sincronizar
    await loadCartItens();
  } finally {
    item.isUpdating = false;
  }
};


const removeItem = async (orderItemId) => {
  const item = cartData.items.find(item => item.order_item_id === orderItemId);
  if (!item) return;

  item.isUpdating = true;

  try {
    // Chama a função centralizada do useCart.js
    await removeItemFromCart(orderItemId);
    showSnackbar('Item removido do carrinho', 'success');
    await loadCart(); // Atualiza o carrinho após remoção
    syncCartData();
  } catch (error) {
    console.error('Erro ao remover item:', error);
    showSnackbar(error.message || 'Erro ao remover item. Tente novamente.', 'error');
    await loadCart();
  } finally {
    item.isUpdating = false;
  }
};

const confirmRemoveItem = async () => {
  showRemoveDialog.value = false;
  if (pendingRemoveId.value) {
    await removeItem(pendingRemoveId.value);
    pendingRemoveId.value = null;
  }
};

/** Checkout */
const checkout = async () => {
  isCheckingOut.value = true;
  try {
    await apiService.checkoutCart();
    showCheckoutDialog.value = false;
    showSnackbar('Pedido finalizado com sucesso!', 'success');
    
    // Limpa o carrinho local
    cartData.items = [];
    calculateTotals(0);
    
    // Redireciona para home via router (sem reload)
    setTimeout(() => {
      router.push('/');
    }, 2000);
  } catch (error) {
    console.error('Erro no checkout:', error);
    showCheckoutDialog.value = false;
    showSnackbar(error.message || 'Erro ao finalizar pedido. Tente novamente.', 'error');
  } finally {
    isCheckingOut.value = false;
  }
};

onMounted(() => {
  loadCartItens();
});
</script>

<style scoped>
/* Nenhum estilo scoped para evitar conflito com o container pai */
</style>
