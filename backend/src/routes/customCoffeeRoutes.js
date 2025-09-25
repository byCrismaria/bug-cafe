const express = require('express');
const router = express.Router();
const customCoffeeController = require('../controllers/customCoffeeController');
const { protect } = require('../middleware/authMiddleware');

router.post('/add-custom', protect, customCoffeeController.addCustomCoffeeToCart);

module.exports = router;