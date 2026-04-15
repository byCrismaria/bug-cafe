const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Bug Café API',
      version: '1.0.0',
      description: 'API do sistema de e-commerce Bug Café - Sistema de cafeteria com carrinho, autenticação e programa de fidelidade',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Token JWT obtido no login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            user_id: {
              type: 'integer',
              description: 'ID do usuário',
            },
            full_name: {
              type: 'string',
              description: 'Nome completo do usuário',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário',
            },
            points_balance: {
              type: 'integer',
              description: 'Saldo de pontos de fidelidade',
            },
          },
        },
        Coffee: {
          type: 'object',
          properties: {
            coffee_id: {
              type: 'integer',
              description: 'ID do café',
            },
            name: {
              type: 'string',
              description: 'Nome do café',
            },
            description: {
              type: 'string',
              description: 'Descrição do café',
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Preço do café',
            },
            image_url: {
              type: 'string',
              description: 'URL da imagem do café',
            },
          },
        },
        OrderItem: {
          type: 'object',
          properties: {
            order_item_id: {
              type: 'integer',
              description: 'ID do item do pedido',
            },
            product_name: {
              type: 'string',
              description: 'Nome do produto',
            },
            quantity: {
              type: 'integer',
              description: 'Quantidade',
            },
            unit_price: {
              type: 'number',
              format: 'float',
              description: 'Preço unitário',
            },
            subtotal: {
              type: 'number',
              format: 'float',
              description: 'Subtotal do item',
            },
            is_customizable: {
              type: 'boolean',
              description: 'Se o item é personalizável',
            },
            customizations: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  name: {
                    type: 'string',
                    description: 'Nome da personalização',
                  },
                  category: {
                    type: 'string',
                    description: 'Categoria da personalização',
                  },
                },
              },
            },
          },
        },
        Cart: {
          type: 'object',
          properties: {
            cart_id: {
              type: 'integer',
              description: 'ID do carrinho',
            },
            user_id: {
              type: 'integer',
              description: 'ID do usuário',
            },
            items: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/OrderItem',
              },
            },
            total: {
              type: 'number',
              format: 'float',
              description: 'Total do carrinho',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              description: 'Status da resposta (error)',
            },
            message: {
              type: 'string',
              description: 'Mensagem de erro',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
