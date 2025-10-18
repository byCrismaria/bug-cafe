import axios from 'axios';

// Defina a URL base do seu servidor backend aqui
const API_BASE_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

function handleResponse(response) {
  if (response.data.status === 'success') {
    return response.data.data;
  }
  // Caso o backend não use um status 'success', mas retorne um erro em 2xx
  throw new Error(response.data.message || 'Ocorreu um erro na API.');
}

/**
 * Obtém os headers de autenticação e o cartId para o payload, se necessário.
 * @returns {object} { headers, cartId, token }
 */
function getAuthDetails() {
  const token = localStorage.getItem('authToken');
  let cartId = localStorage.getItem('cartId');

  // Se não há token e nem cartId, gera um novo ID de convidado
  if (!token && !cartId) {
    // Gera um ID único para o carrinho do convidado
    cartId = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('cartId', cartId);
  }

  // Configura o header de Autorização apenas se houver token
  const headers = token ? { 'Authorization': `Bearer ${token}` } : {};

  return { headers, cartId, token };
}

const apiService = {
  // --- Funções referentes ao Carrinho ---
  /**
   * Busca os itens do carrinho.
   * Endpoint: GET /api/cart/
   */
  async fetchCart() {
    const { headers, cartId, token } = getAuthDetails();

    const params = cartId ? { cartId } : {};

    try {
      // Se for convidado, passamos o cartId como query param para melhor compatibilidade.
      const url = token ? '/cart/' : `/cart/?cartId=${cartId}`;

      const response = await api.get(url, { headers });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro ao buscar carrinho:', error);
      // Se o backend retornar 404/400 (que pode ser mapeado para um erro na API), 
      // ou se a mensagem do backend indicar carrinho vazio, retorna vazio.
      const msg = error.response?.data?.message || '';
      if (error.response?.status === 404 || msg.includes("vazio")) {
        return { items: [], total: 0 };
      }
      throw new Error(error.response?.data?.message || error.message || 'Erro ao carregar o carrinho.');
    }
  },

  /**
   * Adiciona um item clássico ao carrinho.
   * Endpoint: POST /api/cart/add-classic
   */
  async addToCartClassic(productId, quantity = 1) {
    const { headers, cartId, token } = getAuthDetails();
    let payload = { productId, quantity };

    // Se for convidado, adiciona o cartId ao corpo da requisição
    if (!token) {
      payload.cartId = cartId;
    }

    try {
      const response = await api.post('/cart/add-classic', payload, { headers });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro ao adicionar item clássico ao carrinho:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erro ao adicionar item ao carrinho.');
    }
  },

  /**
   * Atualiza a quantidade de um item do carrinho.
   * Endpoint: PUT /api/cart/items/:itemId
   */
  async updateCartItemQuantity(orderItemId, newQuantity) {
    const { headers, cartId, token } = getAuthDetails();
    let payload = { newQuantity };

    // Se for convidado, adiciona o cartId ao corpo da requisição
    if (!token) {
      payload.cartId = cartId;
    }

    try {
      const response = await api.put(`/cart/items/${orderItemId}`, payload, { headers });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro ao atualizar quantidade do item:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erro ao atualizar item do carrinho.');
    }
  },

  /**
   * Remove um item do carrinho.
   * Endpoint: DELETE /api/cart/items/:itemId
   */
  async removeCartItem(orderItemId) {
    const { headers, cartId, token } = getAuthDetails();

    let data = {};
    if (!token) {
      data.cartId = cartId; 
    }

    try {
      const response = await api.delete(`/cart/items/${orderItemId}`, { headers, data });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro ao remover item do carrinho:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erro ao remover item do carrinho.');
    }
  },

  /**
   * Simula a ação de checkout.
   * Endpoint: POST /api/checkout/
   */
  async checkoutCart() {
    const { headers, cartId, token } = getAuthDetails();
    let payload = {};

    if (!token) {
      payload.cartId = cartId;
    }

    try {
      const response = await api.post('/checkout/', payload, { headers });
      return handleResponse(response);
    } catch (error) {
      console.error('Erro ao finalizar o checkout:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erro ao finalizar o pedido.');
    }
  },

  // --- Funções de Produto ---

  async getClassicCoffees() {
    try {
      const response = await api.get('/classic-coffees');
      return handleResponse(response);
    } catch (error) {
      console.error('Erro ao buscar cafés clássicos:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erro ao buscar produtos.');
    }
  },

  async getMostFamousCoffees() {
    try {
      const response = await api.get('/most-famous');
      return handleResponse(response);
    } catch (error) {
      console.error('Erro ao buscar cafés mais famosos:', error);
      throw new Error(error.response?.data?.message || error.message || 'Erro ao buscar produtos.');
    }
  },
};

export default apiService;