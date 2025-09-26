import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
});

export default {
  getClassicCoffees() {
    // Corresponde ao endpoint GET /api/classic-coffees
    return api.get('/classic-coffees');
  },
  getMostFamousCoffees() {
    // Corresponde ao endpoint GET /api/most-famous
    return api.get('/most-famous');
  },
  addToCart(productId, quantity) {
    // Corresponde ao endpoint POST /api/cart/add-classic
    // O token de autorização precisa ser configurado globalmente ou passado aqui
    return api.post('/cart/add-classic', { productId, quantity }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}` // Exemplo de como obter o token
      }
    });
  }
};