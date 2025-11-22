
import axios from 'axios';
import { reactive } from 'vue';
import apiService from '../services/apiService.js';

const cartState = reactive({
    items: [],
    total: 0,
});

const loadCart = async () => {
    try {
        const response = await apiService.fetchCart();
        const apiData = response?.data?.data || response?.data || response;

        cartState.items = Array.isArray(apiData.items) ? apiData.items : [];
        cartState.total = apiData.total || 0;
    } catch (error) {
        console.error('Erro ao carregar o carrinho:', error);
        cartState.items = [];
        cartState.total = 0;
    }
};

// Função para adicionar um item ao carrinho
const addItemToCart = async (customCoffee) => {
    try {
        const token = localStorage.getItem('authToken');
        let cartId = localStorage.getItem('cartId');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const body = {
            customizations: customCoffee.customizationIds,
        };

        if (!token) {
            if (!cartId) {   // Se não houver um cartId de convidado, crie um
                cartId = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                localStorage.setItem('cartId', cartId);
            }
            body.cartId = cartId; // Adiciona o cartId ao corpo da requisição APENAS para convidados
        }

        const response = await axios.post('/api/custom-coffee/add-custom', body, { headers });

        if (response.data.status === 'success') {
            // Atualiza o estado global do carrinho, se necessário
            await loadCart();
            return response.data.message;
        } else {
            throw new Error(response.data.message || 'Ocorreu um erro inesperado ao adicionar o item.');
        }
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        throw error;
    }
};

//função para adicionar clássico ao carrinho
const addClassicToCart = async (productId, quantity = 1) => {
    if (!productId) {
        showSnackbar('ID do café clássico inválido.', 'error');
        return;
    }
    try {
        const token = localStorage.getItem('authToken');
        let cartId = localStorage.getItem('cartId');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        const body = { productId, quantity };

        if (!token) {
            if (!cartId) {
                cartId = `guest-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
                localStorage.setItem('cartId', cartId);
            }
            body.cartId = cartId;
        }

        const response = await axios.post('/api/cart/add-classic', body, { headers });

        if (response.data.status === 'success') {
            await loadCart();
            return response.data.message;
        } else {
            throw new Error(response.data.message || 'Erro ao adicionar clássico ao carrinho.');
        }
    } catch (error) {
        console.error('Erro ao adicionar clássico ao carrinho:', error);
        throw error;
    }
};

const removeItemFromCart = async (orderItemId) => {
    try {
        const token = localStorage.getItem('authToken');
        let cartId = localStorage.getItem('cartId');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // Para convidados, envie o cartId no corpo
        const config = { headers };
        let body = {};
        if (!token && cartId) {
            body.cartId = cartId;
            config.data = body;
        }

        const response = await axios.delete(`/api/cart/items/${orderItemId}`, config);

        if (response.data.status === 'success') {
            await loadCart();
            return response.data.message;
        } else {
            throw new Error(response.data.message || 'Erro ao remover item.');
        }
    } catch (error) {
        console.error('Erro ao remover item do carrinho:', error);
        throw error;
    }
};



export const useCart = () => {
    return {
        cartState,
        loadCart,
        addItemToCart,
        addClassicToCart,
        removeItemFromCart,
    };
};