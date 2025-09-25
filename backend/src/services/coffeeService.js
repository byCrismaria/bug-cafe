const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

const getClassicCoffees = async () => {
    const coffees = await db('products').where({ is_customizable: false }).select('product_id', 'name', 'price', 'stock_quantity');
    
    // Formatar a resposta (lógica de negócio)
    const formattedResponse = coffees.map(coffee => ({
        id: coffee.product_id,
        name: coffee.name,
        price: coffee.price,
        is_available: coffee.stock_quantity > 0
    }));

    return formattedResponse;
};

const getMostFamous = async () => {
    // Encontra os 5 itens mais vendidos nos últimos 7 dias, unindo as tabelas para obter os detalhes dos produtos
    const mostFamous = await db('order_items')
        .join('orders', 'order_items.order_id', 'orders.order_id')
        .select('product_id', db.raw('SUM(quantity) as total_sold'))
        .where('orders.order_date', '>=', db.raw('NOW() - INTERVAL \'7 days\''))
        .groupBy('product_id')
        .orderBy('total_sold', 'desc')
        .limit(5);

    // Se houver dados, busque os detalhes dos produtos
    if (mostFamous.length > 0) {
        const famousIds = mostFamous.map(item => item.product_id);
        const famousProducts = await db('products').whereIn('product_id', famousIds).select('name', 'description');
        return famousProducts;
    }

    return [];
};

module.exports = {
    getClassicCoffees,
    getMostFamous
};