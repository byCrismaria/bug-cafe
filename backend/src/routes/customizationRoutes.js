const express = require('express');
const router = express.Router();
const customizationController = require('../controllers/customizationController');

/**
 * @swagger
 * /api/customizations:
 *   get:
 *     summary: Listar opções de personalização de café
 *     tags: [Produtos]
 *     responses:
 *       200:
 *         description: Lista de opções de personalização retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 bases:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price_modifier:
 *                         type: number
 *                 sizes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price_modifier:
 *                         type: number
 *                 flavors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price_modifier:
 *                         type: number
 *                 extras:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price_modifier:
 *                         type: number
 */
router.get('/', customizationController.getCustomizationOptions);

module.exports = router;