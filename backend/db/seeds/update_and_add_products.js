/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  // 1. Atualiza as descrições dos cafés clássicos já existentes
  await knex('products').where({ name: 'Espresso Tradicional' }).update({
    description: 'Intenso, encorpado e aromático, perfeito para quem aprecia o café em sua essência.'
  });
  await knex('products').where({ name: 'Café Filtrado (Coado)' }).update({
    description: 'Clássico e suave, preparado no método tradicional que realça os sabores.'
  });
  await knex('products').where({ name: 'Cappuccino Italiano' }).update({
    description: 'Combinação equilibrada de café, leite vaporizado e espuma cremosa.'
  });
  await knex('products').where({ name: 'Latte Macchiato' }).update({
    description: 'Leite vaporizado delicadamente marcado com uma dose de espresso.'
  });
  await knex('products').where({ name: 'Mocha Especial' }).update({
    description: 'Espresso com leite vaporizado e toque de chocolate, finalizado com chantilly.'
  });

  // 2. Insere os novos sabores. O Knex fará o tratamento de IDs.
  await knex('products').insert([
    {
      name: 'Caramelo Salgado Latte',
      description: 'Um latte cremoso com calda artesanal de caramelo salgado, que equilibra o doce e o salgado em um gole aconchegante.',
      price: 11.00,
      stock_quantity: 45,
      is_customizable: false
    },
    {
      name: 'Amêndoas & Mel Espresso',
      description: 'Espresso suave adoçado naturalmente com mel e finalizado com essência de amêndoas, trazendo notas delicadas e sofisticadas.',
      price: 9.00,
      stock_quantity: 50,
      is_customizable: false
    },
    {
      name: 'Choco-Especiarias Mocha',
      description: 'Mocha envolvente com chocolate meio amargo e um toque de canela e noz-moscada, ideal para dias frios ou para quem busca algo diferente.',
      price: 12.50,
      stock_quantity: 30,
      is_customizable: false
    }
  ]);
};
