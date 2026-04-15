const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const { protect } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Obter perfil do usuário e histórico de pedidos
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 profile:
 *                   $ref: '#/components/schemas/User'
 *                 orderHistory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       order_id:
 *                         type: integer
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       total_price:
 *                         type: number
 *                         format: float
 *                       items:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/OrderItem'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', protect, profileController.getProfile);

module.exports = router;