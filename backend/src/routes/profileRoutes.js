const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware'); 

// Rota protegida para obter o perfil do usuário e histórico de pedidos
router.get('/', protect, profileController.getProfile);

module.exports = router;