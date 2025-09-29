const express = require('express');
const router = express.Router();
const customCoffeeController = require('../controllers/customCoffeeController');
const { optionalAuth } = require('../middleware/authMiddleware');


router.post('/add-custom', optionalAuth, customCoffeeController.addCustomCoffeeToCart);

module.exports = router;