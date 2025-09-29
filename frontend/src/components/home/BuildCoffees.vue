<template>
  <v-container class="py-12" fluid>
    <v-responsive class="mx-auto" max-width="1200">

      <v-alert v-if="isLoading" type="info" variant="tonal" class="mb-4">
        Carregando opções de customização...
      </v-alert>
      <v-alert v-if="fetchError" type="error" variant="tonal" class="mb-4">
        Erro ao carregar opções. Tente novamente mais tarde.
      </v-alert>

      <v-row class="mb-10" justify="center" v-if="!isLoading && !fetchError">
        <v-col cols="12" md="6">
          <v-card elevation="5" rounded="xl" class="pa-6 pa-md-8">
            
            <h2 class="text-h6 font-weight-semibold text-primary mb-4">1. Escolha sua Base</h2>
            <v-radio-group v-model="selectedBase" mandatory class="mb-6">
              <v-row>
                <v-col v-for="base in baseOptions" :key="base.value" cols="auto" class="py-0">
                  <v-radio 
                    :label="`${base.label} (${formatPrice(base.price)})`" 
                    :value="base.value"
                    color="#b45309" 
                  ></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>
            
            <v-divider class="my-6"></v-divider>

            <h2 class="text-h6 font-weight-semibold text-primary mb-4">2. Escolha o Tamanho</h2>
            <v-radio-group v-model="selectedSize" mandatory class="mb-6">
              <v-row>
                <v-col v-for="size in sizeOptions" :key="size.value" cols="auto" class="py-0">
                  <v-radio 
                    :label="`${size.label} ${size.price > 0 ? formatPrice(size.price, true) : ''}`" 
                    :value="size.value"
                    color="#b45309" 
                  ></v-radio>
                </v-col>
              </v-row>
            </v-radio-group>

            <v-divider class="my-6"></v-divider>

            <v-row>
              <v-col cols="12" sm="6">
                <h2 class="text-h6 font-weight-semibold text-primary mb-4">3. Adicione Sabores</h2>
                <v-checkbox 
                  v-for="flavor in flavorOptions" 
                  :key="flavor.value"
                  v-model="selectedFlavors"
                  :label="`${flavor.label} ${formatPrice(flavor.price, true)}`"
                  :value="flavor.value"
                  color="#b45309" 
                  density="compact"
                  hide-details
                ></v-checkbox>
              </v-col>
              
              <v-col cols="12" sm="6">
                <h2 class="text-h6 font-weight-semibold text-primary mb-4">4. Leite e Outros Extras</h2>
                <v-radio-group v-model="selectedExtra" mandatory class="mt-0 pt-0">
                  <v-radio 
                    v-for="extra in extraOptions" 
                    :key="extra.value"
                    :label="`${extra.label} ${extra.price > 0 ? formatPrice(extra.price, true) : ''}`"
                    :value="extra.value"
                    color="#b45309" 
                    density="compact"
                    hide-details
                  ></v-radio>
                </v-radio-group>
              </v-col>
            </v-row>
          </v-card>
        </v-col>

        <v-col cols="12" md="5">
          <v-card elevation="5" rounded="xl" class="pa-6 pa-md-8 d-flex flex-column" height="100%">
            <h2 class="text-h6 font-weight-semibold text-primary mb-6">Resumo do Pedido</h2>
            
            <div class="flex-grow-1 mb-8">
              <v-list density="compact" class="bg-transparent">
                <v-list-item class="px-0">
                  <v-list-item-title class="font-weight-medium">Base:</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedBase || 'Selecione uma Base' }}</v-list-item-subtitle>
                </v-list-item>
                <v-list-item class="px-0">
                  <v-list-item-title class="font-weight-medium">Tamanho:</v-list-item-title>
                  <v-list-item-subtitle>{{ selectedSize || 'Selecione um Tamanho' }}</v-list-item-subtitle>
                </v-list-item>
                
                <div v-if="orderSummaryDetails.length > 0" class="mt-4">
                  <p class="font-weight-medium mb-1">Adicionais:</p>
                  <v-list-item v-for="(detail, index) in orderSummaryDetails" :key="index" class="px-0 pl-4 text-caption">
                    <v-list-item-subtitle>{{ detail }}</v-list-item-subtitle>
                  </v-list-item>
                </div>
                <p v-else class="text-grey-darken-1 italic text-sm mt-4">Nenhum adicional selecionado.</p>
              </v-list>
            </div>

            <div class="mt-auto pt-6 border-t border-grey-lighten-2">
              <div class="d-flex justify-space-between align-center text-h5 font-weight-bold text-primary mb-4">
                <span>TOTAL</span>
                <span id="order-total">{{ formatPrice(currentPrice) }}</span>
              </div>
              <v-btn 
                block 
                size="large"
                color="#b45309" 
                class="font-weight-bold text-white"
                :disabled="!selectedBase || !selectedSize"
                @click="addCustomCoffee"
              >
                Adicionar ao Carrinho
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// --- PROPS & EMITS ---
const emit = defineEmits(['add-to-cart']);

// --- ESTADO DA API ---
const baseOptions = ref([]);
const sizeOptions = ref([]);
const flavorOptions = ref([]);
const extraOptions = ref([]); 

const isLoading = ref(true);
const fetchError = ref(false);

// --- ESTADO DE SELEÇÃO (Reativo) ---
const selectedBase = ref(null);
const selectedSize = ref(null);
const selectedFlavors = ref([]); // Checkboxes
const selectedExtra = ref(null); // Radio


// --- LÓGICA DE FETCH DA API ---

/**
 * Mapeia as opções da API para o formato do componente (label, value, price, option_id).
 * Usa additional_price como o preço de cada item.
 */
const mapApiOptions = (apiOptions) => apiOptions.map(item => {
    return {
        label: item.name,
        value: item.name,
        price: item.additional_price || 0, // Agora usa o valor correto do backend
        option_id: item.option_id
    };
});

const fetchCustomizations = async () => {
    isLoading.value = true;
    fetchError.value = false;
    try {
        const response = await axios.get('/api/customizations');
        const data = response.data.data;

        // 1. Base (Agora carrega o preço base diretamente)
        baseOptions.value = mapApiOptions(data.Base || []);
        
        // 2. Tamanho (Adicional de preço)
        sizeOptions.value = mapApiOptions(data.Tamanho || []);
        
        // 3. Sabor (Adicional de preço)
        flavorOptions.value = mapApiOptions(data.Sabor || []);
        
        // 4. Extras (Combinação de Tipo de Leite e Aditivo)
        const tipoDeLeite = mapApiOptions(data['Tipo de Leite'] || []);
        const aditivos = mapApiOptions(data.Aditivo || []);
        extraOptions.value = [...tipoDeLeite, ...aditivos];

        // 5. Configurar Seleções Iniciais (Defaults)
        if (baseOptions.value.length > 0) {
            selectedBase.value = baseOptions.value[0].value;
        }
        if (sizeOptions.value.length > 0) {
            selectedSize.value = sizeOptions.value[0].value;
        }
        if (extraOptions.value.length > 0) {
            // Seleciona o primeiro 'Tipo de Leite' como padrão (ex: Integral)
            selectedExtra.value = tipoDeLeite[0]?.value || extraOptions.value[0].value;
        }
        
    } catch (error) {
        console.error("Erro ao buscar personalizações:", error);
        fetchError.value = true;
    } finally {
        isLoading.value = false;
    }
};

onMounted(fetchCustomizations);

// --- FUNÇÕES UTILITÁRIAS ---
const formatPrice = (price, isModifier = false) => {
    // Formata o preço para R$ X,XX
    const formatted = `R$ ${price.toFixed(2).replace('.', ',')}`;
    // Adiciona "+" se for um modificador positivo
    return isModifier && price > 0 ? `+ ${formatted}` : formatted;
};

// --- PROPRIEDADES COMPUTADAS (A LÓGICA DO RESUMO) ---

// 1. Cálculo do Preço Total
const currentPrice = computed(() => {
    let total = 0;
    // Adiciona o preço da Base (preço base)
    const baseItem = baseOptions.value.find(o => o.value === selectedBase.value);
    if (baseItem) total += baseItem.price;

    // Adiciona o preço do Tamanho (adicional)
    const sizeItem = sizeOptions.value.find(o => o.value === selectedSize.value);
    if (sizeItem) total += sizeItem.price;

    // Preço dos Sabores (Checados)
    selectedFlavors.value.forEach(flavorValue => {
        const flavorItem = flavorOptions.value.find(o => o.value === flavorValue);
        if (flavorItem) total += flavorItem.price;
    });

    // Preço do Extra (Tipo de Leite ou Aditivo)
    const extraItem = extraOptions.value.find(o => o.value === selectedExtra.value);
    if (extraItem) total += extraItem.price;

    return total;
});

// 2. Detalhes para o Resumo (Sem alteração, pois a lógica de preço adicional está correta)
const orderSummaryDetails = computed(() => {
    const details = [];
    
    // Tamanho (se tiver preço adicional)
    const sizeItem = sizeOptions.value.find(o => o.value === selectedSize.value);
    if (sizeItem && sizeItem.price > 0) {
        details.push(`${selectedSize.value}: ${formatPrice(sizeItem.price, true)}`);
    }

    // Leite/Extra (se tiver preço adicional)
    const extraItem = extraOptions.value.find(o => o.value === selectedExtra.value);
    if (extraItem && extraItem.price > 0) {
        details.push(`${extraItem.label}: ${formatPrice(extraItem.price, true)}`);
    }
    
    // Sabores
    selectedFlavors.value.forEach(flavorValue => {
        const flavorItem = flavorOptions.value.find(o => o.value === flavorValue);
        if (flavorItem) {
            details.push(`${flavorItem.label}: ${formatPrice(flavorItem.price, true)}`);
        }
    });

    return details;
});

const addCustomCoffee = async () => {

    // 1. Monta o objeto do café personalizado (lógica que já estava correta)
    const base = baseOptions.value.find(o => o.value === selectedBase.value);
    const size = sizeOptions.value.find(o => o.value === selectedSize.value);
    const extra = extraOptions.value.find(o => o.value === selectedExtra.value);

    const customCoffee = {
        name: `Café Personalizado (${selectedBase.value})`,
        customizationIds: [
            base?.option_id, 
            size?.option_id, 
            extra?.option_id, 
            ...selectedFlavors.value.map(v => flavorOptions.value.find(o => o.value === v)?.option_id)
        ].filter(id => id !== undefined)
    };

    console.log(`Adicionando café personalizado ao carrinho.`);
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
        
        const body = { 
            customizations: customCoffee.customizationIds 
        };

        if (authData.cartId) {
          body.cartId = authData.cartId;
        }

        const response = await axios.post('/api/custom-coffee/add-custom', body, { headers });

        if (response.data.status === 'success') {
            showSnackbar(`${customCoffee.name} adicionado com sucesso!`, 'success');
        }
    } catch (error) {
        console.error('Erro ao adicionar item personalizado ao carrinho:', error);
        const errorMessage = error.response?.data?.message || 'Não foi possível adicionar o item personalizado.';
        showSnackbar(`Erro: ${errorMessage}`, 'error');
    }
};

/**
 * Adiciona um café personalizado ao carrinho, usando o array de IDs de customização.
 * * @param {object} customCoffee - O objeto do café personalizado emitido pelo BuildCoffees.vue.
 * @param {array} customCoffee.customizationIds - O array de IDs de opção (base, tamanho, sabores, etc.).
 * @param {string} customCoffee.name - Nome para o feedback do usuário.
 */

</script>

<style scoped>
.text-primary {
  color: #4A3F35; 
}

.v-container {
    max-width: none !important;
}

.v-radio-group .v-radio, .v-checkbox {
    margin-bottom: 0px; 
    padding-top: 0px; 
}
</style>