/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
  return knex.schema
    .createTable('users', table => {
      table.increments('user_id').primary();
      table.string('full_name', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password_hash', 255).notNullable();
      table.integer('points_balance').defaultTo(0);
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('products', table => {
      table.increments('product_id').primary();
      table.string('name', 100).notNullable().unique();
      table.text('description');
      table.decimal('price', 10, 2).notNullable();
      table.integer('stock_quantity').notNullable().defaultTo(0);
      table.string('image_url', 255);
      table.boolean('is_customizable').defaultTo(false);
    })
    // Adicione aqui as outras tabelas
    .createTable('customization_options', table => {
        table.increments('option_id').primary();
        table.string('category', 50).notNullable();
        table.string('name', 100).notNullable();
        table.decimal('additional_price', 10, 2).defaultTo(0.00);
    })
    .createTable('orders', table => {
        table.increments('order_id').primary();
        table.integer('user_id').unsigned();
        table.timestamp('order_date').defaultTo(knex.fn.now());
        table.decimal('total_price', 10, 2).notNullable();
        table.string('status', 50).defaultTo('Pendente');
        table.foreign('user_id').references('user_id').inTable('users');
    })
    .createTable('order_items', table => {
        table.increments('order_item_id').primary();
        table.integer('order_id').unsigned().notNullable();
        table.integer('product_id').unsigned().notNullable();
        table.integer('quantity').notNullable();
        table.decimal('unit_price', 10, 2).notNullable();
        table.decimal('subtotal', 10, 2).notNullable();
        table.foreign('order_id').references('order_id').inTable('orders');
        table.foreign('product_id').references('product_id').inTable('products');
    })
    .createTable('order_item_customizations', table => {
        table.integer('order_item_id').unsigned().notNullable();
        table.integer('option_id').unsigned().notNullable();
        table.primary(['order_item_id', 'option_id']);
        table.foreign('order_item_id').references('order_item_id').inTable('order_items');
        table.foreign('option_id').references('option_id').inTable('customization_options');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('order_item_customizations')
    .dropTableIfExists('order_items')
    .dropTableIfExists('orders')
    .dropTableIfExists('customization_options')
    .dropTableIfExists('products')
    .dropTableIfExists('users');
};

