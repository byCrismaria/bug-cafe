const knex = require('knex');
const knexConfig = require('../../knexfile');
const db = knex(knexConfig.development);

const findOrCreateOrder = async (trx, userId, cartId) => {
    let order;
    if (userId) {
        order = await trx('orders').where({ user_id: userId, status: 'Pendente' }).first();
    } else if (cartId) {
        order = await trx('orders').where({ user_id: null, status: 'Pendente', cart_id: cartId }).first();
    }

    if (!order) {
        const newOrderData = {
            user_id: userId || null,
            total_price: 0,
            status: 'Pendente',
            cart_id: cartId
        };
        const [insertedOrder] = await trx('orders').insert(newOrderData).returning('*');
        order = insertedOrder;
    }

    return order;
};

const addCustomCoffeeToCart = async (userId, cartId, customizationIds) => {
    // A transação agora é iniciada aqui, na camada de serviço, para encapsular toda a lógica.
    return db.transaction(async (trx) => {

        const customCoffeeProduct = await trx('products')
            .where({ is_customizable: true })
            .first();

        if (!customCoffeeProduct) {
            throw new Error("O produto base para cafés personalizados não foi encontrado no banco de dados.");
        }

        // 1. Encontra ou cria o pedido dentro da transação
        const order = await findOrCreateOrder(trx, userId, cartId);

        // 2. Busca todas as opções de personalização do banco
        const customizations = await trx('customization_options').whereIn('option_id', customizationIds);

        // 3. Calcula o preço total do item personalizado
        let totalPrice = 0;
        const base = customizations.find(opt => opt.category === 'Base');
        const tamanho = customizations.find(opt => opt.category === 'Tamanho');

        if (!base || !tamanho) {
            throw new Error("A base e o tamanho são obrigatórios para montar um café personalizado.");
        }

        totalPrice += parseFloat(base.additional_price) + parseFloat(tamanho.additional_price);

        const additionalOptions = customizations.filter(opt => opt.category !== 'Base' && opt.category !== 'Tamanho');
        additionalOptions.forEach(opt => {
            totalPrice += parseFloat(opt.additional_price);
        });

        console.log(`Preço final calculado: ${totalPrice}`);

        // 4. Adiciona o item ao carrinho (tabela order_items)
        const orderItem = {
            order_id: order.order_id,
            product_id: customCoffeeProduct.product_id, // ID do 'Café Personalizado' encontrado dinamicamente
            quantity: 1,
            unit_price: totalPrice,
            subtotal: totalPrice
        };
        const [orderItemId] = await trx('order_items').insert(orderItem).returning('*');

        // 5. Adiciona as personalizações (tabela order_item_customizations)
        const customizationsToInsert = customizationIds.map(id => ({
            order_item_id: orderItemId.order_item_id,
            option_id: id
        }));
        await trx('order_item_customizations').insert(customizationsToInsert);

        // 6. Atualiza o preço total do pedido
        const newTotal = await trx('order_items').sum('subtotal as total').where({ order_id: order.order_id }).first();
        await trx('orders').where({ order_id: order.order_id }).update({ total_price: newTotal.total });

        return {
            item_id: orderItemId.order_item_id
        };
    });
};

module.exports = {
    addCustomCoffeeToCart
};