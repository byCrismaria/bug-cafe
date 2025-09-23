const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

//Encontra um carrinho 'Pendente' ou cria um novo
const findOrCreateOrder = async (trx, userId, cartId) => {
    let order;
    if (userId) {
        // Busca um carrinho 'Pendente' para o usuário logado
        order = await trx('orders').where({ user_id: userId, status: 'Pendente' }).first();
    } else if (cartId) {
        // Busca um carrinho 'Pendente' para o convidado
        order = await trx('orders').where({ user_id: null, status: 'Pendente', cart_id: cartId }).first();
    }

    // Se o carrinho não existe, cria um novo
    if (!order) {
        const newOrderData = {
            user_id: userId || null,
            total_price: 0,
            status: 'Pendente',
            cart_id: cartId // Para identificar carrinhos de convidados
        };
        const [insertedOrder] = await trx('orders').insert(newOrderData).returning('*');
        order = insertedOrder;
    }
    
    return order;
};


const addClassicCoffeeToCart = async (productId, quantity = 1, userId, cartId) => {

    return db.transaction(async (trx) => {
        // 1. Verificar se o produto existe e tem estoque suficiente (RF06)
        const product = await trx('products').where({ product_id: productId, is_customizable: false }).first();

        if (!product) {
            throw new Error("O produto não foi encontrado.");
        }

        if (product.stock_quantity < quantity) {
            throw new Error(`O item ${product.name} está temporariamente indisponível.`);
        }

        if (userId) {
            const userExists = await trx('users').where({ user_id: userId }).first();
            if (!userExists) {
                throw new Error("O usuário informado não existe, tente novamente.");
            }
        }

        // 2. Reutiliza a função findOrCreateOrder para encontrar ou criar o carrinho (tabela orders)
        const order = await findOrCreateOrder(trx, userId, cartId);    
        
        // 3. Adicionar o item ao carrinho (tabela order_items)
        const orderItem = {
            order_id: order.order_id,
            product_id: productId,
            quantity: quantity,
            unit_price: product.price,
            subtotal: product.price * quantity // RF30
        };

        const [orderItemId] = await trx('order_items').insert(orderItem).returning('order_item_id');

        // 4. Atualizar o estoque (RF06)
        await trx('products').where({ product_id: productId }).decrement('stock_quantity', quantity);

        // 5. Atualizar o preço total do pedido
        const newTotal = await trx('order_items').sum('subtotal as total').where({ order_id: order.order_id }).first();
        await trx('orders').where({ order_id: order.order_id }).update({ total_price: newTotal.total });

        // Retorna o ID do item adicionado
        return orderItemId;
    });
};


module.exports = {
    addClassicCoffeeToCart
};