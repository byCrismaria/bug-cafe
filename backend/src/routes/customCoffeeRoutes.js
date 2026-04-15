const express = require('express');
const router = express.Router();
const customCoffeeController = require('../controllers/customCoffeeController');
const { optionalAuth } = require('../middleware/authMiddleware');

/**
 * @swagger
 * /api/custom-coffee/add-custom:
 *   post:
 *     summary: Adicionar café personalizado ao carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - baseId
 *               - sizeId
 *               - flavorId
 *               - extras
 *               - quantity
 *             properties:
 *               baseId:
 *                 type: integer
 *                 example: 1
 *               sizeId:
 *                 type: integer
 *                 example: 2
 *               flavorId:
 *                 type: integer
 *                 example: 1
 *               extras:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [3, 4]
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *     responses:
 *       201:
 *         description: Café personalizado adicionado ao carrinho com sucesso
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
 *                 data:
 *                   $ref: '#/components/schemas/OrderItem'
 *       400:
 *         description: Erro ao adicionar café personalizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/add-custom', optionalAuth, customCoffeeController.addCustomCoffeeToCart);

module.exports = router;