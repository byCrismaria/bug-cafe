const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const {optionalAuth } = require('../middleware/authMiddleware');

// Aplica o middleware 'protect' a TODAS as rotas que vêm depois.
router.use(optionalAuth);

/**
 * @swagger
 * /api/cart/add-classic:
 *   post:
 *     summary: Adicionar café clássico ao carrinho
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
 *               - coffeeId
 *               - quantity
 *             properties:
 *               coffeeId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 2
 *     responses:
 *       201:
 *         description: Item adicionado ao carrinho com sucesso
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
 *         description: Erro ao adicionar item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/add-classic', cartController.addClassicCoffeeToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obter carrinho do usuário
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Carrinho retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       404:
 *         description: Carrinho não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', cartController.getCart);

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   put:
 *     summary: Atualizar quantidade de item no carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item do carrinho
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 example: 3
 *     responses:
 *       200:
 *         description: Quantidade atualizada com sucesso
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
 *       400:
 *         description: Erro ao atualizar quantidade
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/items/:itemId', cartController.adjustQuantity);

/**
 * @swagger
 * /api/cart/items/{itemId}:
 *   delete:
 *     summary: Remover item do carrinho
 *     tags: [Carrinho]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do item do carrinho
 *     responses:
 *       200:
 *         description: Item removido com sucesso
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
 *       400:
 *         description: Erro ao remover item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/items/:itemId', cartController.removeItem);

module.exports = router;