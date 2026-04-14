const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { optionalAuth } = require('../middleware/authMiddleware');

// rota para finalizar um pedido (logado ou guest)
router.post('/checkout', optionalAuth, orderController.checkout);

module.exports = router;