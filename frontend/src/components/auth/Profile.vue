<template>
  <v-container class="py-8" fluid data-testid="profile-page">
    <v-overlay :model-value="loading" class="d-flex align-center justify-center" persistent data-testid="profile-loading">
      <v-progress-circular indeterminate color="#b45309" size="64" />
    </v-overlay>
    <div v-if="!loading" data-testid="profile-content">

      <div class="text-h4 font-weight-bold mb-6" data-testid="profile-title"> Meu Perfil</div>

      <!-- Informações da Conta -->
      <v-card class="mb-6" elevation="2" rounded="md" data-testid="profile-info-card">
        <v-row align="center" class="px-6 py-6">
          <v-avatar color="#b45309" size="96" class="mr-6" data-testid="profile-points-avatar">
            <span class="text-h4 font-weight-bold">{{ user.points }}</span>
          </v-avatar>
          <div>
            <div class="text-h6 font-weight-medium" data-testid="profile-user-name">{{ user.name }}</div>
            <div class="text-body-2 text-grey-darken-1" data-testid="profile-user-email">{{ user.email }}</div>
            <div class="mt-2 text-body-2 text-grey-darken-2" data-testid="profile-points-text">Você acumulou <b>{{ user.points }}</b> pontos!</div>
          </div>
        </v-row>
      </v-card>

      <!-- Meus Pontos e Recompensas -->
      <v-card class="mb-6" elevation="2" rounded="md" data-testid="profile-rewards-card">
        <v-row align="center" justify="space-between" class="px-6 py-4">
          <div class="text-h6 font-weight-bold" data-testid="profile-rewards-title">Meus Pontos</div>
        </v-row>
        <div class="px-6 pb-4">
          <div class="text-subtitle-1 font-weight-medium mb-2" data-testid="profile-rewards-subtitle">Recompensas Disponíveis:</div>
          <v-list density="compact">
            <v-list-item data-testid="profile-reward-50">
              <span class="font-weight-bold">50 Pontos</span> = 1 Café Filtrado Grátis
            </v-list-item>
            <v-list-item data-testid="profile-reward-100">
              <span class="font-weight-bold">100 Pontos</span> = 1 Cappuccino Grande
            </v-list-item>
            <v-list-item data-testid="profile-reward-150">
              <span class="font-weight-bold">150 Pontos</span> = 1 Combo (Café + Pão de Queijo)
            </v-list-item>
          </v-list>
        </div>
        <v-row align="center" class="px-6 pb-6">
          <v-btn color="#b45309" data-testid="profile-redeem-button">
            Resgatar Pontos
          </v-btn>
        </v-row>
      </v-card>

      <!-- Histórico de Pedidos com Expansion Panels -->
      <div class="mb-6" rounded="md" data-testid="profile-orders-section">
        <div class="text-h6 font-weight-bold mb-4 px-2" data-testid="profile-orders-title">Histórico de Pedidos</div>
        <v-expansion-panels data-testid="profile-orders-panels">
          <v-expansion-panel v-for="order in orders" :key="order.order_id"
            :title="`Pedido #${order.order_id} - ${formatDate(order.created_at)}`"
            :data-testid="`profile-order-${order.order_id}`">
            <template #text>
              <div :data-testid="`profile-order-content-${order.order_id}`">
                <span class="font-weight-medium">Itens:</span>
                <ul class="pl-4 mb-2">
                  <li v-for="item in order.items" :key="item.order_item_id" :data-testid="`profile-order-item-${item.order_item_id}`">
                    {{ item.quantity }}x {{ item.product_name }}
                  </li>
                </ul>
                <div class="text-body-1 font-weight-bold mb-2" :data-testid="`profile-order-total-${order.order_id}`">
                  Total: {{ formatPrice(order.total_price) }}
                </div>
                <v-btn color="#b45309" @click="showOrderDetails(order)" :data-testid="`profile-order-details-button-${order.order_id}`">
                  Ver Detalhes
                </v-btn>
              </div>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- Modal de detalhes do pedido -->
      <v-dialog v-model="detailsDialog" max-width="600" data-testid="order-details-dialog">
        <v-card data-testid="order-details-card">
          <v-card-title data-testid="order-details-title">Detalhes do Pedido #{{ selectedOrder?.order_id }}</v-card-title>
          <v-card-text data-testid="order-details-content">
            <div v-if="selectedOrder">
              <div class="mb-2" data-testid="order-details-date">Data: {{ formatDate(selectedOrder.created_at) }}</div>
              <v-list density="compact">
                <v-list-item v-for="item in selectedOrder.items" :key="item.order_item_id" :data-testid="`order-details-item-${item.order_item_id}`">
                  <div>
                    <span class="font-weight-bold">{{ item.product_name }}</span>
                    <span> - {{ item.quantity }}x</span>
                    <span> ({{ formatPrice(item.subtotal) }})</span>
                    <span v-if="item.is_customizable && item.customizations && item.customizations.length">
                      <br>
                      <span class="text-caption text-grey-darken-1">Personalizações:</span>
                      <span v-for="(custom, i) in item.customizations" :key="i">
                        {{ custom.category }}: {{ custom.name }}<span v-if="i < item.customizations.length - 1">, </span>
                      </span>
                    </span>
                  </div>
                </v-list-item>
              </v-list>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="#b45309" @click="detailsDialog = false" data-testid="order-details-close-button">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import apiService from '../../services/apiService.js';
import { useCart } from '../../composables/useCart';
import { formatPrice } from '../../utils/formatters.js';

const { cartState, loadCart } = useCart();
const detailsDialog = ref(false);
const selectedOrder = ref(null);

const user = ref({
  name: '',
  email: '',
  points: 0,
});

const orders = ref([]);

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

function showOrderDetails(order) {
  selectedOrder.value = order;
  detailsDialog.value = true;
}

const loading = ref(true);
onMounted(() => {
  loadCart(); 
  
  (async () => {
    try {
      const data = await apiService.fetchProfile();
      const profile = data.profile;
      user.value.name = profile.full_name;
      user.value.email = profile.email;
      user.value.points = profile.points_balance;
      orders.value = data.orderHistory;
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
      user.value.name = 'Erro ao carregar';
      user.value.email = '';
      user.value.points = 0;
      orders.value = [];
    } finally {
      loading.value = false;
    }
  })();
});
</script>