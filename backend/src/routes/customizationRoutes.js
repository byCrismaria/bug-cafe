const express = require('express');
const router = express.Router();
const customizationController = require('../controllers/customizationController');

// Define a rota GET para obter as opções de personalização
router.get('/', customizationController.getCustomizationOptions);

module.exports = router;