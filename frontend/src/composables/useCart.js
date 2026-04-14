
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

const addItemToCart = async (customCoffee) => {
    try {
        await apiService.addCustomCoffeeToCart(customCoffee.customizationIds);
        await loadCart();
    } catch (error) {
        console.error('Erro ao adicionar item ao carrinho:', error);
        throw error;
    }
};

const addClassicToCart = async (productId, quantity = 1) => {
    if (!productId) return;
    try {
        await apiService.addToCartClassic(productId, quantity);
        await loadCart();
    } catch (error) {
        console.error('Erro ao adicionar clássico ao carrinho:', error);
        throw error;
    }
};

const removeItemFromCart = async (orderItemId) => {
    try {
        await apiService.deleteCartItem(orderItemId);
        await loadCart();
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
