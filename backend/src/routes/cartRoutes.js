const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define a rota POST para adicionar um café clássico ao carrinho
router.post('/add-classic', cartController.addClassicCoffeeToCart);

module.exports = router;