const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {optionalAuth } = require('../middleware/authMiddleware');


// Aplica o middleware 'protect' a TODAS as rotas que vêm depois.
router.use(optionalAuth);

router.post('/add-classic', cartController.addClassicCoffeeToCart);
router.get('/', cartController.getCart);
router.post('/adjust', cartController.adjustQuantity);
router.post('/remove', cartController.removeItem);

module.exports = router;