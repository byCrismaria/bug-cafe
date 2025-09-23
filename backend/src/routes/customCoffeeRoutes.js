const express = require('express');
const router = express.Router();
const customCoffeeController = require('../controllers/customCoffeeController');

router.post('/add-custom', customCoffeeController.addCustomCoffeeToCart);

module.exports = router;