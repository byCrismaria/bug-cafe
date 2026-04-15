const express = require('express');
const router = express.Router();
const coffeeController = require('../controllers/coffeeController');

/**
 * @swagger
 * /api/classic-coffees:
 *   get:
 *     summary: Listar cafés clássicos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de cafés clássicos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coffee'
 */
router.get('/classic-coffees', coffeeController.getClassicCoffees);

/**
 * @swagger
 * /api/most-famous:
 *   get:
 *     summary: Listar cafés mais famosos
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de cafés mais famosos retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coffee'
 */
router.get('/most-famous', coffeeController.getMostFamous);

module.exports = router;