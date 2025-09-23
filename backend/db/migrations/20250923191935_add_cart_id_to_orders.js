/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('orders', function(table) {
    table.string('cart_id').nullable(); // Permite que a coluna seja nula para usuários logados
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.table('orders', function(table) {
    table.dropColumn('cart_id');
  });
};
