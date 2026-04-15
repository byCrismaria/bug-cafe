const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { optionalAuth } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/orders/checkout:
 *   post:
 *     summary: Finalizar pedido (checkout)
 *     tags: [Pedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Pedido finalizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "Pedido finalizado com sucesso"
 *                 data:
 *                   type: object
 *                   properties:
 *                     order_id:
 *                       type: integer
 *                     total_price:
 *                       type: number
 *                       format: float
 *                     points_earned:
 *                       type: integer
 *       400:
 *         description: Erro ao finalizar pedido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/checkout', optionalAuth, orderController.checkout);

module.exports = router;