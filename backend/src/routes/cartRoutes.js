const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');


// Aplica o middleware 'protect' a TODAS as rotas que vêm depois.
router.use(protect);

router.post('/add-classic', cartController.addClassicCoffeeToCart);
router.get('/', cartController.getCart);
router.post('/adjust', cartController.adjustQuantity);
router.post('/remove', cartController.removeItem);

module.exports = router;