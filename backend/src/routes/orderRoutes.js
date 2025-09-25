const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

// rota para finalizar um pedido
router.post('/checkout', protect, orderController.checkout);

module.exports = router;