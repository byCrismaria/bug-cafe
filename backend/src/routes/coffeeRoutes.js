const express = require('express');
const router = express.Router();
const coffeeController = require('../controllers/coffeeController');

// Define a rota GET para os cafés clássicos
router.get('/classic-coffees', coffeeController.getClassicCoffees);

// Define a rota GET para os cafés mais famosos
router.get('/most-famous', coffeeController.getMostFamous);

module.exports = router;