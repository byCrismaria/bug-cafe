/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('customization_options').del(); // Limpa a tabela antes de popular
  await knex('customization_options').insert([
    // Bases
    { category: 'Base', name: 'Espresso', additional_price: 0.00 },
    { category: 'Base', name: 'Filtrado', additional_price: 0.00 },
    { category: 'Base', name: 'Descafeinado', additional_price: 0.00 },
    // Tamanhos
    { category: 'Tamanho', name: 'Pequeno', additional_price: 0.00 },
    { category: 'Tamanho', name: 'Medio', additional_price: 2.00 },
    { category: 'Tamanho', name: 'Grande', additional_price: 4.00 },
    // Sabores / Xaropes
    { category: 'Sabor', name: 'Baunilha', additional_price: 1.50 },
    { category: 'Sabor', name: 'Caramelo', additional_price: 1.50 },
    { category: 'Sabor', name: 'Avela', additional_price: 1.50 },
    { category: 'Sabor', name: 'Chocolate', additional_price: 1.50 },
    { category: 'Sabor', name: 'Menta', additional_price: 1.50 },
    // Aditivos
    { category: 'Aditivo', name: 'Chantilly', additional_price: 2.00 },
    { category: 'Aditivo', name: 'Calda de Chocolate', additional_price: 1.50 },
    { category: 'Aditivo', name: 'Canela em Po', additional_price: 0.50 },
    // Tipos de Leite
    { category: 'Tipo de Leite', name: 'Integral', additional_price: 0.00 },
    { category: 'Tipo de Leite', name: 'Desnatado', additional_price: 0.00 },
    { category: 'Tipo de Leite', name: 'Leite de Amendoas', additional_price: 3.00 },
    { category: 'Tipo de Leite', name: 'Leite de Soja', additional_price: 2.50 },
    { category: 'Tipo de Leite', name: 'Leite de Aveia', additional_price: 2.50 }
  ]);
};
