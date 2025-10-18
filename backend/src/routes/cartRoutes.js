const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {optionalAuth } = require('../middleware/authMiddleware');


// Aplica o middleware 'protect' a TODAS as rotas que vêm depois.
router.use(optionalAuth);

router.post('/add-classic', cartController.addClassicCoffeeToCart); // POST /cart/items - Adicionar item
router.get('/', cartController.getCart); // GET /cart - Obter carrinho
router.put('/items/:itemId', cartController.adjustQuantity); // PUT /cart/items/123 - Atualizar quantidade
router.delete('/items/:itemId', cartController.removeItem); // DELETE /cart/items/123 - Remover item

module.exports = router;