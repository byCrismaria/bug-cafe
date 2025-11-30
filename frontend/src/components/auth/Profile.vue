<template>
  <v-container class="py-8" fluid>
    <v-overlay :model-value="loading" class="d-flex align-center justify-center" persistent>
      <v-progress-circular indeterminate color="#b45309" size="64" />
    </v-overlay>
    <div v-if="!loading"> 

      <div class="text-h4 font-weight-bold mb-6"> Meu Perfil</div>

      <!-- Informações da Conta -->
      <v-card class="mb-6" elevation="2" rounded="md">
        <v-row align="center" class="px-6 py-6">
          <v-avatar color="#b45309" size="96" class="mr-6">
            <span class="text-h4 font-weight-bold">{{ user.points }}</span>
          </v-avatar>
          <div>
            <div class="text-h6 font-weight-medium">{{ user.name }}</div>
            <div class="text-body-2 text-grey-darken-1">{{ user.email }}</div>
            <div class="mt-2 text-body-2 text-grey-darken-2">Você acumulou <b>{{ user.points }}</b> pontos!</div>
          </div>
        </v-row>
      </v-card>

      <!-- Meus Pontos e Recompensas -->
      <v-card class="mb-6" elevation="2" rounded="md">
        <v-row align="center" justify="space-between" class="px-6 py-4">
          <div class="text-h6 font-weight-bold">Meus Pontos</div>
        </v-row>
        <div class="px-6 pb-4">
          <div class="text-subtitle-1 font-weight-medium mb-2">Recompensas Disponíveis:</div>
          <v-list density="compact">
            <v-list-item>
              <span class="font-weight-bold">50 Pontos</span> = 1 Café Filtrado Grátis
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">100 Pontos</span> = 1 Cappuccino Grande
            </v-list-item>
            <v-list-item>
              <span class="font-weight-bold">150 Pontos</span> = 1 Combo (Café + Pão de Queijo)
            </v-list-item>
          </v-list>
        </div>
        <v-row align="center" class="px-6 pb-6">
          <v-btn color="#b45309">
            Resgatar Pontos
          </v-btn>
        </v-row>
      </v-card>

      <!-- Histórico de Pedidos com Expansion Panels -->
      <div class="mb-6" rounded="md">
        <div class="text-h6 font-weight-bold mb-4 px-2">Histórico de Pedidos</div>
        <v-expansion-panels>
          <v-expansion-panel v-for="order in orders" :key="order.order_id"
            :title="`Pedido #${order.order_id} - ${formatDate(order.created_at)}`">
            <template #text>
              <div>
                <span class="font-weight-medium">Itens:</span>
                <ul class="pl-4 mb-2">
                  <li v-for="item in order.items" :key="item.order_item_id">
                    {{ item.quantity }}x {{ item.product_name }}
                  </li>
                </ul>
                <div class="text-body-1 font-weight-bold mb-2">
                  Total: {{ formatPrice(order.total_price) }}
                </div>
                <v-btn color="#b45309" @click="showOrderDetails(order)">
                  Ver Detalhes
                </v-btn>
              </div>
            </template>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>

      <!-- Modal de detalhes do pedido -->
      <v-dialog v-model="detailsDialog" max-width="600">
        <v-card>
          <v-card-title>Detalhes do Pedido #{{ selectedOrder?.order_id }}</v-card-title>
          <v-card-text>
            <div v-if="selectedOrder">
              <div class="mb-2">Data: {{ formatDate(selectedOrder.created_at) }}</div>
              <v-list density="compact">
                <v-list-item v-for="item in selectedOrder.items" :key="item.order_item_id">
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
            <v-btn color="#b45309" @click="detailsDialog = false">Fechar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useCart } from '../../composables/useCart';

const { cartState, loadCart } = useCart();
const detailsDialog = ref(false);
const selectedOrder = ref(null);

const user = ref({
  name: '',
  email: '',
  points: 0,
});

const orders = ref([]);

function formatPrice(value) {
  return 'R$ ' + Number(value).toFixed(2).replace('.', ',');
}

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
      const token = localStorage.getItem('authToken');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.get('/api/profile', { headers });

      if (response.data.status === 'success') {
        const profile = response.data.data.profile;
        user.value.name = profile.full_name;
        user.value.email = profile.email;
        user.value.points = profile.points_balance;
        orders.value = response.data.data.orderHistory;
      }
    } catch (error) {
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