/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = function(knex) {
  // Deleta todos os dados existentes nas tabelas na ordem correta
  return knex('order_item_customizations').del()
    .then(function () {
      return knex('customization_options').del();
    })
    .then(function () {
      return knex('order_items').del();
    })
    .then(function () {
      return knex('orders').del();
    })
    .then(function () {
      return knex('products').del();
    })
    .then(function () {
      return knex('users').del();
    })
    .then(function () {
      // Insere os dados de produtos
      return knex('products').insert([
        {
          name: 'Espresso Tradicional',
          price: 6.00,
          stock_quantity: 50,
          is_customizable: false
        },
        {
          name: 'Café Filtrado (Coado)',
          price: 5.00,
          stock_quantity: 100,
          is_customizable: false
        },
        {
          name: 'Cappuccino Italiano',
          price: 9.50,
          stock_quantity: 40,
          is_customizable: false
        },
        {
          name: 'Latte Macchiato',
          price: 10.00,
          stock_quantity: 35,
          is_customizable: false
        },
        {
          name: 'Mocha Especial',
          price: 12.00,
          stock_quantity: 25,
          is_customizable: false
        },
        {
          name: 'Café Base (Personalizado)',
          price: 8.00,
          stock_quantity: 999,
          is_customizable: true
        }
      ]);
    })
    .then(function () {
      // Insere os dados de opções de personalização
      return knex('customization_options').insert([
        { category: 'Tamanho', name: 'Pequeno', additional_price: 0.00 },
        { category: 'Tamanho', name: 'Médio', additional_price: 1.50 },
        { category: 'Tamanho', name: 'Grande', additional_price: 2.50 },
        { category: 'Leite', name: 'Integral', additional_price: 0.00 },
        { category: 'Leite', name: 'Desnatado', additional_price: 0.00 },
        { category: 'Leite', name: 'Vegetal (Amêndoa)', additional_price: 1.00 }
      ]);
    });
};
